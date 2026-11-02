import React from 'react';
import { ColorPalette } from '../../types/launcher';
import { useCurrentTime, numberToWords } from './useCurrentTime';
import { CloudSun, Calendar as CalendarIcon, MapPin, Globe } from 'lucide-react';

interface ClockProps {
  palette: ColorPalette;
  onOpenApp?: (appId: string) => void;
}

/** 1. Iconic Android Scalloped / Petal Analog Clock */
export const AnalogScallopClock: React.FC<ClockProps> = ({ palette, onOpenApp }) => {
  const time = useCurrentTime();

  const secondDeg = time.seconds * 6;
  const minuteDeg = time.minutes * 6 + time.seconds * 0.1;
  const hourDeg = (time.hours % 12) * 30 + time.minutes * 0.5;

  return (
    <div 
      onClick={() => onOpenApp?.('clock')}
      className="relative w-full aspect-square flex items-center justify-center cursor-pointer transition-transform duration-150 active:scale-95 group"
    >
      {/* Scallop Petal Background Container */}
      <div 
        className="relative w-full h-full flex items-center justify-center shadow-lg transition-colors duration-300"
        style={{
          backgroundColor: palette.surfaceContainer,
          clipPath: `polygon(
            50% 0%, 65% 5%, 78% 14%, 86% 26%, 95% 38%, 98% 50%,
            95% 62%, 86% 74%, 78% 86%, 65% 95%, 50% 100%,
            35% 95%, 22% 86%, 14% 74%, 5% 62%, 2% 50%,
            5% 38%, 14% 26%, 22% 14%, 35% 5%
          )`,
          borderRadius: '35%'
        }}
      >
        {/* Subtle Dial Quadrant Markers */}
        <div className="absolute top-3 font-semibold text-xs tracking-wider" style={{ color: palette.primary }}>12</div>
        <div className="absolute right-3 font-semibold text-xs tracking-wider" style={{ color: palette.primary }}>3</div>
        <div className="absolute bottom-3 font-semibold text-xs tracking-wider" style={{ color: palette.primary }}>6</div>
        <div className="absolute left-3 font-semibold text-xs tracking-wider" style={{ color: palette.primary }}>9</div>

        {/* Center Pivot */}
        <div 
          className="absolute w-3 h-3 rounded-full z-20 shadow-sm"
          style={{ backgroundColor: palette.primary }}
        />

        {/* Hour Hand */}
        <div 
          className="absolute w-1.5 h-10 rounded-full origin-bottom z-10 transition-transform duration-100 shadow-sm"
          style={{
            backgroundColor: palette.primary,
            transform: `rotate(${hourDeg}deg) translateY(-50%)`,
            bottom: '50%'
          }}
        />

        {/* Minute Hand */}
        <div 
          className="absolute w-1 h-14 rounded-full origin-bottom z-10 transition-transform duration-100 shadow-sm"
          style={{
            backgroundColor: palette.primary,
            transform: `rotate(${minuteDeg}deg) translateY(-50%)`,
            bottom: '50%'
          }}
        />

        {/* Second Hand */}
        <div 
          className="absolute w-0.5 h-16 rounded-full origin-bottom z-10 transition-transform duration-75"
          style={{
            backgroundColor: palette.accent || '#ef4444',
            transform: `rotate(${secondDeg}deg) translateY(-50%)`,
            bottom: '50%'
          }}
        />
      </div>
    </div>
  );
};

/** 2. Bold Stacked Digital Clock (Android 14/15 Style) */
export const StackedDigitalClock: React.FC<ClockProps> = ({ palette, onOpenApp }) => {
  const time = useCurrentTime();
  const hourStr = time.hours.toString().padStart(2, '0');
  const minuteStr = time.minutes.toString().padStart(2, '0');

  return (
    <div 
      onClick={() => onOpenApp?.('clock')}
      className="w-full h-full p-4 rounded-3xl flex flex-col justify-between cursor-pointer transition-all duration-200 active:scale-95 shadow-md backdrop-blur-md"
      style={{
        backgroundColor: palette.surfaceContainer,
        color: palette.onSurface
      }}
    >
      <div className="flex items-center justify-between text-xs font-medium opacity-80">
        <span>{time.formattedDate}</span>
        <span className="flex items-center gap-1">
          <CloudSun size={14} style={{ color: palette.accent }} /> 72°F
        </span>
      </div>

      <div className="flex flex-col items-center justify-center my-auto leading-none select-none font-bold">
        <span 
          className="text-5xl tracking-tight transition-colors"
          style={{ color: palette.primary }}
        >
          {hourStr}
        </span>
        <span 
          className="text-5xl tracking-tight transition-colors mt-0.5"
          style={{ color: palette.secondary }}
        >
          {minuteStr}
        </span>
      </div>

      <div className="flex items-center justify-between text-[11px] pt-1 border-t border-black/5 dark:border-white/5 opacity-70">
        <span>Alarm: 07:00 AM</span>
        <span className="font-mono">{time.isPm ? 'PM' : 'AM'}</span>
      </div>
    </div>
  );
};

/** 3. Authentic Pixel "At a Glance" Widget */
export const PixelGlanceWidget: React.FC<ClockProps> = ({ palette, onOpenApp }) => {
  const time = useCurrentTime();

  return (
    <div 
      onClick={() => onOpenApp?.('calendar')}
      className="w-full px-3 py-2 flex flex-col justify-center cursor-pointer transition-transform active:scale-[0.98]"
    >
      {/* Row 1: Day & Date + Weather Pill */}
      <div className="flex items-center justify-between text-white drop-shadow-md">
        <div className="flex items-center gap-2">
          <CalendarIcon size={16} className="text-white/80" />
          <span className="text-sm font-semibold tracking-wide">
            {time.dayName}, {time.monthName} {time.dayNumber}
          </span>
        </div>

        <div 
          onClick={(e) => {
            e.stopPropagation();
            onOpenApp?.('weather');
          }}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium backdrop-blur-md bg-black/25 text-white border border-white/10"
        >
          <CloudSun size={14} className="text-amber-300" />
          <span>72°F Sunny</span>
        </div>
      </div>

      {/* Row 2: Pixel Smart Notification / Calendar Event */}
      <div className="mt-1 flex items-center gap-2 text-xs text-white/90 drop-shadow-sm font-medium">
        <span 
          className="w-2 h-2 rounded-full" 
          style={{ backgroundColor: palette.pillColor }}
        />
        <span>Coffee &amp; Strategy Sync · 11:30 AM (in 45m)</span>
      </div>
    </div>
  );
};

/** 4. Retro Split-Flap Clock (HTC / Vintage Android) */
export const RetroFlipClock: React.FC<ClockProps> = ({ palette, onOpenApp }) => {
  const time = useCurrentTime();
  const hour1 = Math.floor(time.hours12 / 10);
  const hour2 = time.hours12 % 10;
  const min1 = Math.floor(time.minutes / 10);
  const min2 = time.minutes % 10;

  return (
    <div 
      onClick={() => onOpenApp?.('clock')}
      className="w-full h-full p-3 rounded-3xl flex flex-col justify-between bg-black/80 backdrop-blur-md border border-white/10 text-white cursor-pointer shadow-lg active:scale-95 transition-all"
    >
      <div className="flex items-center justify-between text-[11px] text-zinc-400">
        <span className="tracking-wider uppercase font-semibold">Local Time</span>
        <span className="font-mono bg-zinc-800 px-1.5 py-0.5 rounded text-[10px] text-zinc-300">
          {time.isPm ? 'PM' : 'AM'}
        </span>
      </div>

      {/* Split Flap Cards */}
      <div className="flex items-center justify-center gap-1.5 my-auto">
        {/* Hours card */}
        <div className="flex gap-0.5">
          <div className="relative w-8 h-12 bg-zinc-900 rounded-lg flex items-center justify-center font-mono text-2xl font-bold border border-zinc-700/80 shadow-inner">
            <span style={{ color: palette.accent }}>{hour1}</span>
            <div className="absolute inset-x-0 top-1/2 h-[1px] bg-black/80" />
          </div>
          <div className="relative w-8 h-12 bg-zinc-900 rounded-lg flex items-center justify-center font-mono text-2xl font-bold border border-zinc-700/80 shadow-inner">
            <span style={{ color: palette.accent }}>{hour2}</span>
            <div className="absolute inset-x-0 top-1/2 h-[1px] bg-black/80" />
          </div>
        </div>

        <span className="text-xl font-bold text-zinc-500 animate-pulse">:</span>

        {/* Minutes card */}
        <div className="flex gap-0.5">
          <div className="relative w-8 h-12 bg-zinc-900 rounded-lg flex items-center justify-center font-mono text-2xl font-bold border border-zinc-700/80 shadow-inner">
            <span>{min1}</span>
            <div className="absolute inset-x-0 top-1/2 h-[1px] bg-black/80" />
          </div>
          <div className="relative w-8 h-12 bg-zinc-900 rounded-lg flex items-center justify-center font-mono text-2xl font-bold border border-zinc-700/80 shadow-inner">
            <span>{min2}</span>
            <div className="absolute inset-x-0 top-1/2 h-[1px] bg-black/80" />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between text-[10px] text-zinc-400 border-t border-zinc-800 pt-1">
        <span>{time.dayName}, {time.monthName} {time.dayNumber}</span>
        <span className="font-mono text-emerald-400">72°F High: 78°</span>
      </div>
    </div>
  );
};

/** 5. Dual Dial World Clock */
export const WorldClockDual: React.FC<ClockProps> = ({ palette, onOpenApp }) => {
  const time = useCurrentTime();
  
  // Tokyo offset (+17 hours or +9 from UTC)
  const tokyoHour = (time.hours + 13) % 24;
  const tokyoMinStr = time.minutes.toString().padStart(2, '0');
  const tokyoHourStr = tokyoHour.toString().padStart(2, '0');

  return (
    <div 
      onClick={() => onOpenApp?.('clock')}
      className="w-full h-full p-3 rounded-3xl flex flex-col justify-between cursor-pointer shadow-md transition-all active:scale-95"
      style={{
        backgroundColor: palette.surfaceContainer,
        color: palette.onSurface
      }}
    >
      <div className="flex items-center gap-1.5 text-xs font-semibold" style={{ color: palette.primary }}>
        <Globe size={14} />
        <span>World Clocks</span>
      </div>

      <div className="grid grid-cols-2 gap-2 my-1">
        {/* Local City */}
        <div className="p-2 rounded-2xl bg-white/60 dark:bg-black/20 flex flex-col">
          <div className="flex items-center justify-between text-[10px] opacity-75">
            <span className="font-medium truncate">Cupertino</span>
            <MapPin size={10} />
          </div>
          <span className="font-mono text-xl font-bold mt-1" style={{ color: palette.primary }}>
            {time.formattedTime}
          </span>
          <span className="text-[9px] opacity-60">{time.isPm ? 'PM' : 'AM'} · Today</span>
        </div>

        {/* Tokyo City */}
        <div className="p-2 rounded-2xl bg-white/60 dark:bg-black/20 flex flex-col">
          <div className="flex items-center justify-between text-[10px] opacity-75">
            <span className="font-medium truncate">Tokyo</span>
            <span className="text-[9px] font-mono text-emerald-600 dark:text-emerald-400">+13h</span>
          </div>
          <span className="font-mono text-xl font-bold mt-1" style={{ color: palette.secondary }}>
            {tokyoHourStr}:{tokyoMinStr}
          </span>
          <span className="text-[9px] opacity-60">{tokyoHour >= 12 ? 'PM' : 'AM'} · Tmrw</span>
        </div>
      </div>

      <div className="text-[10px] opacity-70 text-center font-medium">
        Tap to add or manage world cities
      </div>
    </div>
  );
};

/** 6. Bauhaus Geometric Modern Clock */
export const BauhausClock: React.FC<ClockProps> = ({ palette, onOpenApp }) => {
  const time = useCurrentTime();
  const minuteDeg = time.minutes * 6 + time.seconds * 0.1;
  const hourDeg = (time.hours % 12) * 30 + time.minutes * 0.5;

  return (
    <div 
      onClick={() => onOpenApp?.('clock')}
      className="relative w-full aspect-square p-2 flex items-center justify-center cursor-pointer transition-transform active:scale-95"
    >
      <div 
        className="w-full h-full rounded-full relative flex items-center justify-center shadow-lg border-2 border-black/10 overflow-hidden"
        style={{ backgroundColor: palette.surfaceContainer }}
      >
        {/* Geometric Quadrant Color Slices */}
        <div className="absolute top-0 right-0 w-1/2 h-1/2 opacity-25 rounded-tr-full" style={{ backgroundColor: palette.primary }} />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 opacity-20 rounded-bl-full" style={{ backgroundColor: palette.secondary }} />

        {/* Hour Hand (Geometric Wedge) */}
        <div 
          className="absolute w-2 h-10 origin-bottom z-10 transition-transform duration-150"
          style={{
            backgroundColor: palette.primary,
            transform: `rotate(${hourDeg}deg) translateY(-50%)`,
            bottom: '50%',
            clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)'
          }}
        />

        {/* Minute Hand (Sleek Circle pointer) */}
        <div 
          className="absolute w-1 h-14 origin-bottom z-10 transition-transform duration-100 flex flex-col items-center justify-start"
          style={{
            transform: `rotate(${minuteDeg}deg) translateY(-50%)`,
            bottom: '50%'
          }}
        >
          <div className="w-3 h-3 rounded-full mb-auto" style={{ backgroundColor: palette.secondary }} />
          <div className="w-0.5 h-full" style={{ backgroundColor: palette.secondary }} />
        </div>

        {/* Center Pivot Bauhaus Ring */}
        <div 
          className="w-4 h-4 rounded-full border-2 z-20"
          style={{ borderColor: palette.primary, backgroundColor: palette.accent }}
        />
      </div>
    </div>
  );
};

/** 7. Minimalist Typography Clock */
export const TypographyClock: React.FC<ClockProps> = ({ palette, onOpenApp }) => {
  const time = useCurrentTime();
  const hourWords = numberToWords(time.hours12);
  const minWords = time.minutes === 0 ? "O'CLOCK" : numberToWords(time.minutes);

  return (
    <div 
      onClick={() => onOpenApp?.('clock')}
      className="w-full h-full p-4 rounded-3xl flex flex-col justify-between cursor-pointer transition-all active:scale-95 shadow-md backdrop-blur-md"
      style={{
        backgroundColor: palette.surfaceContainer,
        color: palette.onSurface
      }}
    >
      <div className="flex items-center justify-between text-xs font-semibold tracking-wider opacity-75">
        <span>TIME</span>
        <span>{time.formattedDate}</span>
      </div>

      <div className="my-auto font-display font-bold leading-tight">
        <div className="text-xl sm:text-2xl tracking-tight" style={{ color: palette.primary }}>
          {hourWords}
        </div>
        <div className="text-xl sm:text-2xl tracking-tight mt-0.5" style={{ color: palette.secondary }}>
          {minWords}
        </div>
      </div>

      <div className="flex items-center justify-between text-[11px] font-mono opacity-65">
        <span>{time.isPm ? 'AFTERNOON' : 'MORNING'}</span>
        <span>{time.seconds.toString().padStart(2, '0')}s</span>
      </div>
    </div>
  );
};

/** 8. Radial Chrono Seconds Clock */
export const RadialSecondsClock: React.FC<ClockProps> = ({ palette, onOpenApp }) => {
  const time = useCurrentTime();
  const circumference = 2 * Math.PI * 40;
  const strokeDashoffset = circumference - (time.seconds / 60) * circumference;

  return (
    <div 
      onClick={() => onOpenApp?.('clock')}
      className="relative w-full aspect-square p-2 flex items-center justify-center cursor-pointer transition-transform active:scale-95"
    >
      <div 
        className="w-full h-full rounded-full relative flex items-center justify-center shadow-md p-2"
        style={{ backgroundColor: palette.surfaceContainer }}
      >
        <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
          {/* Track */}
          <circle 
            cx="50" 
            cy="50" 
            r="40" 
            stroke="currentColor" 
            strokeWidth="5" 
            fill="transparent" 
            className="opacity-15"
          />
          {/* Sweeping Seconds Arc */}
          <circle 
            cx="50" 
            cy="50" 
            r="40" 
            stroke={palette.primary} 
            strokeWidth="5" 
            fill="transparent" 
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-300"
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center select-none">
          <span className="font-mono text-2xl font-bold tracking-tight" style={{ color: palette.primary }}>
            {time.formattedTime}
          </span>
          <span className="text-[10px] font-mono tracking-widest font-semibold" style={{ color: palette.accent }}>
            :{time.seconds.toString().padStart(2, '0')} SEC
          </span>
          <span className="text-[9px] opacity-60 mt-0.5">{time.dayName}</span>
        </div>
      </div>
    </div>
  );
};

/** 9. Neon Cyber 7-Segment Digital Clock */
export const NeonCyberClock: React.FC<ClockProps> = ({ palette, onOpenApp }) => {
  const time = useCurrentTime();

  return (
    <div 
      onClick={() => onOpenApp?.('clock')}
      className="w-full h-full p-3 rounded-3xl bg-zinc-950 border border-zinc-800 text-zinc-100 flex flex-col justify-between cursor-pointer shadow-lg active:scale-95 transition-all"
    >
      <div className="flex items-center justify-between text-[10px] text-zinc-500 font-mono">
        <span className="tracking-widest">AETHER SYSTEM</span>
        <span className="text-emerald-400 font-bold animate-pulse">LIVE</span>
      </div>

      <div className="flex items-center justify-center font-mono select-none my-auto">
        <div 
          className="text-4xl sm:text-5xl font-black tracking-widest"
          style={{
            color: palette.secondary,
            textShadow: `0 0 15px ${palette.secondary}88`
          }}
        >
          {time.formattedTime}
        </div>
        <div 
          className="text-sm font-bold ml-1 self-start pt-1"
          style={{ color: palette.accent }}
        >
          {time.isPm ? 'PM' : 'AM'}
        </div>
      </div>

      <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 border-t border-zinc-800/80 pt-1">
        <span>{time.dayName} {time.monthName} {time.dayNumber}</span>
        <span style={{ color: palette.accent }}>SYNC: OK</span>
      </div>
    </div>
  );
};

/** 10. Neumorphic Glass Analog Clock */
export const NeumorphicGlassClock: React.FC<ClockProps> = ({ palette, onOpenApp }) => {
  const time = useCurrentTime();
  const minuteDeg = time.minutes * 6 + time.seconds * 0.1;
  const hourDeg = (time.hours % 12) * 30 + time.minutes * 0.5;
  const secondDeg = time.seconds * 6;

  return (
    <div 
      onClick={() => onOpenApp?.('clock')}
      className="relative w-full aspect-square flex items-center justify-center cursor-pointer transition-transform active:scale-95"
    >
      <div 
        className="w-full h-full rounded-full relative flex items-center justify-center backdrop-blur-xl bg-white/20 dark:bg-black/30 border border-white/30 shadow-2xl overflow-hidden"
      >
        {/* Subtle 12-hour tick lines */}
        {[...Array(12)].map((_, i) => (
          <div 
            key={i}
            className="absolute w-0.5 h-2 bg-white/40 rounded-full"
            style={{
              transform: `rotate(${i * 30}deg) translateY(-60px)`
            }}
          />
        ))}

        {/* Center Pivot */}
        <div 
          className="w-3 h-3 rounded-full z-20 border border-white/60 shadow"
          style={{ backgroundColor: palette.primary }}
        />

        {/* Hour Hand */}
        <div 
          className="absolute w-1.5 h-10 rounded-full origin-bottom z-10 shadow"
          style={{
            backgroundColor: '#ffffff',
            transform: `rotate(${hourDeg}deg) translateY(-50%)`,
            bottom: '50%'
          }}
        />

        {/* Minute Hand */}
        <div 
          className="absolute w-1 h-14 rounded-full origin-bottom z-10 shadow"
          style={{
            backgroundColor: '#ffffff',
            transform: `rotate(${minuteDeg}deg) translateY(-50%)`,
            bottom: '50%'
          }}
        />

        {/* Second Hand */}
        <div 
          className="absolute w-0.5 h-16 rounded-full origin-bottom z-10"
          style={{
            backgroundColor: palette.accent,
            transform: `rotate(${secondDeg}deg) translateY(-50%)`,
            bottom: '50%'
          }}
        />
      </div>
    </div>
  );
};
