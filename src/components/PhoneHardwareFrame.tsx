import React from 'react';
import { Wifi, BatteryMedium, Signal, Sliders } from 'lucide-react';
import { useCurrentTime } from './widgets/useCurrentTime';

interface PhoneHardwareFrameProps {
  children: React.ReactNode;
  onPullQuickSettings: () => void;
  onVolumeUp: () => void;
  onVolumeDown: () => void;
  onPowerToggle: () => void;
  isScreenOn: boolean;
  isDeviceFrame: boolean;
  brightness: number;
}

export const PhoneHardwareFrame: React.FC<PhoneHardwareFrameProps> = ({
  children,
  onPullQuickSettings,
  onVolumeUp,
  onVolumeDown,
  onPowerToggle,
  isScreenOn,
  isDeviceFrame,
  brightness
}) => {
  const time = useCurrentTime();

  if (!isDeviceFrame) {
    // Fullscreen / Responsive Mode
    return (
      <div className="relative w-full h-full min-h-screen overflow-hidden flex flex-col bg-slate-950">
        {/* Fullscreen Status Bar */}
        <div 
          onClick={onPullQuickSettings}
          className="h-10 px-6 flex items-center justify-between text-white text-xs select-none z-30 cursor-pointer bg-black/30 backdrop-blur-md"
        >
          <span className="font-semibold font-mono tracking-tight">{time.formattedTime}</span>
          <div className="flex items-center gap-3">
            <Signal size={14} />
            <Wifi size={14} />
            <span className="font-mono text-[11px] font-semibold">84%</span>
            <BatteryMedium size={16} />
          </div>
        </div>

        <div className="relative flex-1 overflow-hidden" style={{ opacity: isScreenOn ? brightness / 100 : 0 }}>
          {children}
        </div>
      </div>
    );
  }

  // Device Frame Mode: Sleek Pixel 9 Pro Hardware Mockup
  return (
    <div className="relative flex items-center justify-center p-2 sm:p-4">
      {/* Hardware Buttons on the Right (Volume Up, Volume Down, Power) */}
      <div className="absolute right-0 top-32 flex flex-col gap-3 translate-x-2 z-10 hidden sm:flex">
        {/* Power Button */}
        <button
          onClick={onPowerToggle}
          title="Power / Sleep Screen"
          className="w-1.5 h-12 rounded-r-md bg-zinc-600 hover:bg-zinc-400 active:bg-zinc-300 transition-colors shadow"
        />
        {/* Volume Up */}
        <button
          onClick={onVolumeUp}
          title="Volume Up"
          className="w-1.5 h-14 rounded-r-md bg-zinc-600 hover:bg-zinc-400 active:bg-zinc-300 transition-colors shadow"
        />
        {/* Volume Down */}
        <button
          onClick={onVolumeDown}
          title="Volume Down"
          className="w-1.5 h-14 rounded-r-md bg-zinc-600 hover:bg-zinc-400 active:bg-zinc-300 transition-colors shadow"
        />
      </div>

      {/* Outer Aluminum Chassis */}
      <div 
        className="relative w-[370px] sm:w-[390px] h-[780px] rounded-[52px] p-3 shadow-2xl transition-all duration-300 border-4 border-zinc-700/80 bg-zinc-900"
        style={{
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.1), inset 0 0 0 2px rgba(0,0,0,0.8)'
        }}
      >
        {/* Inner Glass Display Bezel */}
        <div 
          className="relative w-full h-full rounded-[44px] overflow-hidden bg-black flex flex-col transition-opacity duration-200"
          style={{ opacity: isScreenOn ? brightness / 100 : 0.02 }}
        >
          {/* Status Bar with Punch-Hole Camera */}
          <div 
            onClick={onPullQuickSettings}
            className="h-10 px-6 flex items-center justify-between text-white text-xs select-none z-30 cursor-pointer hover:bg-white/5 transition-colors shrink-0"
            title="Click or drag to pull down Quick Settings"
          >
            {/* Left: Clock */}
            <span className="font-semibold font-mono tracking-tight text-[13px]">{time.formattedTime}</span>

            {/* Center: Punch-Hole Selfie Camera */}
            <div className="w-3.5 h-3.5 rounded-full bg-black border border-zinc-800 shadow-inner flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-950/80" />
            </div>

            {/* Right: Signals & Battery */}
            <div className="flex items-center gap-2 text-white/90">
              <Signal size={13} />
              <Wifi size={13} />
              <span className="font-mono text-[10px] font-semibold">84%</span>
              <BatteryMedium size={15} />
            </div>
          </div>

          {/* Screen Content Wrapper */}
          <div className="relative flex-1 overflow-hidden flex flex-col">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
