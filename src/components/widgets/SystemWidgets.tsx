import React, { useState } from 'react';
import { ColorPalette } from '../../types/launcher';
import { 
  CloudSun, 
  CloudRain, 
  Sun, 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  Smartphone, 
  Watch, 
  Headphones, 
  CheckSquare, 
  Square, 
  Plus, 
  Search, 
  Mic, 
  Camera
} from 'lucide-react';

interface WidgetProps {
  palette: ColorPalette;
  onOpenApp?: (appId: string) => void;
}

/** 1. Weather Forecast Widget */
export const WeatherWidget: React.FC<WidgetProps> = ({ palette, onOpenApp }) => {
  return (
    <div 
      onClick={() => onOpenApp?.('weather')}
      className="w-full h-full p-4 rounded-3xl flex flex-col justify-between cursor-pointer transition-all active:scale-95 shadow-md backdrop-blur-md"
      style={{
        backgroundColor: palette.surfaceContainer,
        color: palette.onSurface
      }}
    >
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-xs font-semibold opacity-75">San Francisco</h4>
          <div className="text-3xl font-bold tracking-tight mt-0.5" style={{ color: palette.primary }}>
            72°
          </div>
        </div>
        <CloudSun size={36} style={{ color: palette.accent }} />
      </div>

      <div className="flex items-center justify-between text-xs pt-1 border-t border-black/5 dark:border-white/5">
        <div className="flex flex-col items-center">
          <span className="text-[10px] opacity-60">Now</span>
          <Sun size={14} className="my-0.5 text-amber-400" />
          <span className="font-semibold text-[11px]">72°</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-[10px] opacity-60">2 PM</span>
          <CloudSun size={14} className="my-0.5 text-amber-500" />
          <span className="font-semibold text-[11px]">75°</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-[10px] opacity-60">5 PM</span>
          <CloudRain size={14} className="my-0.5 text-blue-400" />
          <span className="font-semibold text-[11px]">68°</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-[10px] opacity-60">8 PM</span>
          <Sun size={14} className="my-0.5 text-orange-400" />
          <span className="font-semibold text-[11px]">63°</span>
        </div>
      </div>
    </div>
  );
};

/** 2. Material You Media Player Widget */
export const MediaPlayerWidget: React.FC<WidgetProps> = ({ palette, onOpenApp }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [trackIndex, setTrackIndex] = useState(0);

  const playlist = [
    { title: 'Daydreaming', artist: 'Radiohead', album: 'A Moon Shaped Pool', duration: '6:24' },
    { title: 'Starboy', artist: 'The Weeknd', album: 'Starboy', duration: '3:50' },
    { title: 'Midnight City', artist: 'M83', album: 'Hurry Up, We\'re Dreaming', duration: '4:03' }
  ];

  const currentTrack = playlist[trackIndex];

  return (
    <div 
      onClick={() => onOpenApp?.('spotify')}
      className="w-full h-full p-4 rounded-3xl flex flex-col justify-between cursor-pointer transition-all active:scale-95 shadow-md backdrop-blur-md"
      style={{
        backgroundColor: palette.surfaceContainer,
        color: palette.onSurface
      }}
    >
      <div className="flex items-center gap-3">
        {/* Album Artwork */}
        <div 
          className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-md shrink-0"
          style={{ backgroundColor: palette.primary }}
        >
          <span className="text-white font-bold text-lg">♫</span>
        </div>
        <div className="overflow-hidden">
          <h4 className="text-sm font-bold truncate leading-tight" style={{ color: palette.primary }}>
            {currentTrack.title}
          </h4>
          <p className="text-xs opacity-75 truncate">{currentTrack.artist}</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full my-2">
        <div className="w-full h-1.5 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
          <div 
            className="h-full rounded-full transition-all duration-300" 
            style={{ width: '48%', backgroundColor: palette.accent }}
          />
        </div>
      </div>

      {/* Media Controls */}
      <div className="flex items-center justify-between pt-1">
        <button 
          onClick={(e) => {
            e.stopPropagation();
            setTrackIndex((prev) => (prev > 0 ? prev - 1 : playlist.length - 1));
          }}
          className="p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/5 active:scale-90"
        >
          <SkipBack size={18} />
        </button>

        <button 
          onClick={(e) => {
            e.stopPropagation();
            setIsPlaying(!isPlaying);
          }}
          className="w-10 h-10 rounded-full flex items-center justify-center text-white shadow-md active:scale-90 transition-transform"
          style={{ backgroundColor: palette.primary }}
        >
          {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
        </button>

        <button 
          onClick={(e) => {
            e.stopPropagation();
            setTrackIndex((prev) => (prev + 1) % playlist.length);
          }}
          className="p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/5 active:scale-90"
        >
          <SkipForward size={18} />
        </button>
      </div>
    </div>
  );
};

/** 3. Battery & Connected Devices Widget */
export const BatteryDevicesWidget: React.FC<WidgetProps> = ({ palette, onOpenApp }) => {
  return (
    <div 
      onClick={() => onOpenApp?.('settings')}
      className="w-full h-full p-4 rounded-3xl flex flex-col justify-between cursor-pointer transition-all active:scale-95 shadow-md backdrop-blur-md"
      style={{
        backgroundColor: palette.surfaceContainer,
        color: palette.onSurface
      }}
    >
      <div className="flex items-center justify-between text-xs font-semibold" style={{ color: palette.primary }}>
        <span>Devices Battery</span>
        <span className="text-[11px] opacity-75">All Connected</span>
      </div>

      <div className="grid grid-cols-3 gap-2 my-auto">
        {/* Phone */}
        <div className="flex flex-col items-center p-2 rounded-2xl bg-white/50 dark:bg-black/20 text-center">
          <Smartphone size={18} style={{ color: palette.primary }} />
          <span className="text-xs font-bold mt-1">84%</span>
          <span className="text-[9px] opacity-70">Pixel 9</span>
        </div>

        {/* Watch */}
        <div className="flex flex-col items-center p-2 rounded-2xl bg-white/50 dark:bg-black/20 text-center">
          <Watch size={18} style={{ color: palette.secondary }} />
          <span className="text-xs font-bold mt-1">62%</span>
          <span className="text-[9px] opacity-70">Watch 3</span>
        </div>

        {/* Buds */}
        <div className="flex flex-col items-center p-2 rounded-2xl bg-white/50 dark:bg-black/20 text-center">
          <Headphones size={18} style={{ color: palette.accent }} />
          <span className="text-xs font-bold mt-1">95%</span>
          <span className="text-[9px] opacity-70">Buds Pro</span>
        </div>
      </div>

      <div className="w-full bg-black/5 dark:bg-white/5 rounded-full h-1 overflow-hidden">
        <div className="h-full rounded-full" style={{ width: '84%', backgroundColor: palette.primary }} />
      </div>
    </div>
  );
};

/** 4. Quick Keep Notes Widget */
export const QuickNotesWidget: React.FC<WidgetProps> = ({ palette, onOpenApp }) => {
  const [todos, setTodos] = useState([
    { id: '1', text: 'Design new icon pack shapes', done: true },
    { id: '2', text: 'Test clock widget responsive sizing', done: false },
    { id: '3', text: 'Customize Material You themes', done: false }
  ]);

  const toggleTodo = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setTodos(todos.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  return (
    <div 
      onClick={() => onOpenApp?.('keep')}
      className="w-full h-full p-4 rounded-3xl flex flex-col justify-between cursor-pointer transition-all active:scale-95 shadow-md backdrop-blur-md"
      style={{
        backgroundColor: palette.surfaceContainer,
        color: palette.onSurface
      }}
    >
      <div className="flex items-center justify-between text-xs font-semibold" style={{ color: palette.primary }}>
        <span>Quick Tasks</span>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onOpenApp?.('keep');
          }}
          className="p-1 rounded-full hover:bg-black/10 dark:hover:bg-white/10"
        >
          <Plus size={14} />
        </button>
      </div>

      <div className="space-y-1.5 my-auto">
        {todos.map(todo => (
          <div 
            key={todo.id}
            onClick={(e) => toggleTodo(todo.id, e)}
            className="flex items-center gap-2 text-xs cursor-pointer hover:opacity-80 transition-opacity"
          >
            {todo.done ? (
              <CheckSquare size={14} style={{ color: palette.primary }} />
            ) : (
              <Square size={14} className="opacity-50" />
            )}
            <span className={`truncate ${todo.done ? 'line-through opacity-50' : 'font-medium'}`}>
              {todo.text}
            </span>
          </div>
        ))}
      </div>

      <div className="text-[10px] opacity-60 text-right">
        Keep Notes Sync · 2 left
      </div>
    </div>
  );
};

/** 5. Google Pill Search Widget */
export const GoogleSearchWidget: React.FC<WidgetProps> = ({ palette, onOpenApp }) => {
  return (
    <div 
      onClick={() => onOpenApp?.('chrome')}
      className="w-full h-13 px-4 rounded-full flex items-center justify-between cursor-pointer transition-all active:scale-[0.98] shadow-md border border-white/20 backdrop-blur-xl"
      style={{
        backgroundColor: `${palette.surfaceContainer}ee`,
        color: palette.onSurface
      }}
    >
      {/* Google "G" logo */}
      <div className="flex items-center gap-2.5">
        <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
          />
        </svg>
        <span className="text-sm font-medium opacity-65 truncate">Search web or apps...</span>
      </div>

      {/* Mic & Lens Action icons */}
      <div className="flex items-center gap-2">
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onOpenApp?.('recorder');
          }}
          className="p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/5 active:scale-90"
        >
          <Mic size={18} style={{ color: palette.primary }} />
        </button>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onOpenApp?.('camera');
          }}
          className="p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/5 active:scale-90"
        >
          <Camera size={18} style={{ color: palette.secondary }} />
        </button>
      </div>
    </div>
  );
};
