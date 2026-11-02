import React, { useState } from 'react';
import { ColorPalette, ThemeMode } from '../types/launcher';
import { 
  Wifi, 
  Bluetooth, 
  Flashlight, 
  Moon, 
  Sun, 
  RotateCw, 
  Eye, 
  BatteryCharging, 
  Settings, 
  Power, 
  Volume2, 
  ChevronUp, 
  BellOff,
  Sliders
} from 'lucide-react';
import { useCurrentTime } from './widgets/useCurrentTime';

interface QuickSettingsShadeProps {
  isOpen: boolean;
  onClose: () => void;
  palette: ColorPalette;
  themeMode: ThemeMode;
  onToggleTheme: () => void;
  onOpenSettings: () => void;
  brightness: number;
  onBrightnessChange: (val: number) => void;
}

export const QuickSettingsShade: React.FC<QuickSettingsShadeProps> = ({
  isOpen,
  onClose,
  palette,
  themeMode,
  onToggleTheme,
  onOpenSettings,
  brightness,
  onBrightnessChange
}) => {
  const time = useCurrentTime();
  const [wifiOn, setWifiOn] = useState(true);
  const [bluetoothOn, setBluetoothOn] = useState(true);
  const [flashlightOn, setFlashlightOn] = useState(false);
  const [dndOn, setDndOn] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [nightLight, setNightLight] = useState(false);
  const [batterySaver, setBatterySaver] = useState(false);
  const [volume, setVolume] = useState(70);

  if (!isOpen) return null;

  return (
    <div 
      className="absolute inset-0 z-50 flex flex-col bg-slate-950/95 text-white backdrop-blur-2xl animate-in slide-in-from-top-full duration-200 overflow-y-auto no-scrollbar"
    >
      {/* Top Header Bar */}
      <div className="pt-8 px-6 pb-4 flex items-center justify-between border-b border-white/10">
        <div>
          <span className="font-mono text-2xl font-bold tracking-tight">
            {time.formattedTime}
          </span>
          <p className="text-xs text-white/60 font-medium">
            {time.formattedDate}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => {
              onClose();
              onOpenSettings();
            }}
            className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 active:scale-95 transition-all"
            title="Settings"
          >
            <Settings size={18} />
          </button>
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 active:scale-95 transition-all text-rose-400"
            title="Close Shade"
          >
            <ChevronUp size={20} />
          </button>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col gap-5">
        {/* Quick Settings Grid */}
        <div className="grid grid-cols-2 gap-2.5">
          {/* Internet */}
          <button
            onClick={() => setWifiOn(!wifiOn)}
            className="flex items-center gap-3 p-3.5 rounded-2xl transition-all text-left"
            style={{
              backgroundColor: wifiOn ? palette.primary : 'rgba(255,255,255,0.08)',
              color: wifiOn ? '#ffffff' : 'rgba(255,255,255,0.6)'
            }}
          >
            <Wifi size={20} />
            <div className="overflow-hidden">
              <span className="text-xs font-semibold block leading-tight truncate">Internet</span>
              <span className="text-[10px] opacity-80 block truncate">{wifiOn ? 'Pixel_5G_Home' : 'Disconnected'}</span>
            </div>
          </button>

          {/* Bluetooth */}
          <button
            onClick={() => setBluetoothOn(!bluetoothOn)}
            className="flex items-center gap-3 p-3.5 rounded-2xl transition-all text-left"
            style={{
              backgroundColor: bluetoothOn ? palette.primary : 'rgba(255,255,255,0.08)',
              color: bluetoothOn ? '#ffffff' : 'rgba(255,255,255,0.6)'
            }}
          >
            <Bluetooth size={20} />
            <div className="overflow-hidden">
              <span className="text-xs font-semibold block leading-tight truncate">Bluetooth</span>
              <span className="text-[10px] opacity-80 block truncate">{bluetoothOn ? 'Pixel Buds Pro' : 'Off'}</span>
            </div>
          </button>

          {/* Flashlight */}
          <button
            onClick={() => setFlashlightOn(!flashlightOn)}
            className="flex items-center gap-3 p-3.5 rounded-2xl transition-all text-left"
            style={{
              backgroundColor: flashlightOn ? palette.secondary : 'rgba(255,255,255,0.08)',
              color: flashlightOn ? '#ffffff' : 'rgba(255,255,255,0.6)'
            }}
          >
            <Flashlight size={20} />
            <div className="overflow-hidden">
              <span className="text-xs font-semibold block leading-tight truncate">Flashlight</span>
              <span className="text-[10px] opacity-80 block truncate">{flashlightOn ? 'On' : 'Off'}</span>
            </div>
          </button>

          {/* Dark / Light Theme Toggle */}
          <button
            onClick={onToggleTheme}
            className="flex items-center gap-3 p-3.5 rounded-2xl transition-all text-left"
            style={{
              backgroundColor: themeMode === 'dark' ? palette.primary : 'rgba(255,255,255,0.08)',
              color: '#ffffff'
            }}
          >
            {themeMode === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
            <div className="overflow-hidden">
              <span className="text-xs font-semibold block leading-tight truncate">Dark Theme</span>
              <span className="text-[10px] opacity-80 block truncate">{themeMode === 'dark' ? 'Active' : 'Light Mode'}</span>
            </div>
          </button>

          {/* Do Not Disturb */}
          <button
            onClick={() => setDndOn(!dndOn)}
            className="flex items-center gap-3 p-3.5 rounded-2xl transition-all text-left"
            style={{
              backgroundColor: dndOn ? palette.primary : 'rgba(255,255,255,0.08)',
              color: dndOn ? '#ffffff' : 'rgba(255,255,255,0.6)'
            }}
          >
            <BellOff size={20} />
            <div className="overflow-hidden">
              <span className="text-xs font-semibold block leading-tight truncate">Do Not Disturb</span>
              <span className="text-[10px] opacity-80 block truncate">{dndOn ? 'Priority only' : 'Off'}</span>
            </div>
          </button>

          {/* Auto-rotate */}
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className="flex items-center gap-3 p-3.5 rounded-2xl transition-all text-left"
            style={{
              backgroundColor: autoRotate ? palette.primary : 'rgba(255,255,255,0.08)',
              color: autoRotate ? '#ffffff' : 'rgba(255,255,255,0.6)'
            }}
          >
            <RotateCw size={20} />
            <div className="overflow-hidden">
              <span className="text-xs font-semibold block leading-tight truncate">Auto-rotate</span>
              <span className="text-[10px] opacity-80 block truncate">{autoRotate ? 'On' : 'Portrait'}</span>
            </div>
          </button>
        </div>

        {/* Sliders Container */}
        <div className="space-y-4 p-4 rounded-3xl bg-white/5 border border-white/5">
          {/* Brightness Slider */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs text-white/70">
              <span className="flex items-center gap-2">
                <Sun size={15} /> Display Brightness
              </span>
              <span className="font-mono">{brightness}%</span>
            </div>
            <input 
              type="range"
              min={30}
              max={100}
              value={brightness}
              onChange={(e) => onBrightnessChange(Number(e.target.value))}
              className="w-full accent-white cursor-pointer h-2 bg-white/20 rounded-lg appearance-none"
            />
          </div>

          {/* Media Volume Slider */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs text-white/70">
              <span className="flex items-center gap-2">
                <Volume2 size={15} /> Media Volume
              </span>
              <span className="font-mono">{volume}%</span>
            </div>
            <input 
              type="range"
              min={0}
              max={100}
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="w-full accent-white cursor-pointer h-2 bg-white/20 rounded-lg appearance-none"
            />
          </div>
        </div>

        {/* Notifications Section */}
        <div className="space-y-2 mt-auto">
          <div className="flex items-center justify-between text-xs text-white/60">
            <span>Notifications</span>
            <button className="text-[11px] hover:text-white transition-colors">Clear all</button>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/10 flex items-start gap-3 border border-white/5">
            <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
              <Sliders size={16} />
            </div>
            <div className="overflow-hidden flex-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-white">Aether Skin Engine</span>
                <span className="text-[10px] text-white/40">Just now</span>
              </div>
              <p className="text-xs text-white/70 mt-0.5">
                New Material You widgets &amp; clock shapes ready to customize.
              </p>
            </div>
          </div>
        </div>

        {/* Close grab bar */}
        <div 
          onClick={onClose}
          className="pt-2 pb-4 flex justify-center cursor-pointer"
        >
          <div className="w-12 h-1.5 rounded-full bg-white/30 hover:bg-white/60 transition-colors" />
        </div>
      </div>
    </div>
  );
};
