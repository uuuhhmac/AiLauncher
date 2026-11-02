/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  AppItem, 
  IconShape, 
  IconStyle, 
  LauncherSettings, 
  PlacedWidget 
} from './types/launcher';
import { 
  DEFAULT_LAUNCHER_SETTINGS, 
  ALL_APPS, 
  WALLPAPERS, 
  PRESET_THEMES, 
  COLOR_PALETTES 
} from './data/launcherData';
import { IconRenderer } from './components/IconRenderer';
import { WidgetRenderer } from './components/widgets/WidgetRenderer';
import { QuickSettingsShade } from './components/QuickSettingsShade';
import { AppDrawer } from './components/AppDrawer';
import { WallpaperAndStyleModal } from './components/WallpaperAndStyleModal';
import { InteractiveAppModal } from './components/InteractiveAppModal';
import { PhoneHardwareFrame } from './components/PhoneHardwareFrame';
import { 
  Sparkles, 
  Palette, 
  Smartphone, 
  Monitor, 
  Volume2, 
  Sliders, 
  Check, 
  Maximize2, 
  Clock, 
  ChevronUp, 
  Layers, 
  Grid,
  Plus
} from 'lucide-react';

export default function App() {
  const [settings, setSettings] = useState<LauncherSettings>(DEFAULT_LAUNCHER_SETTINGS);
  const [isQuickSettingsOpen, setIsQuickSettingsOpen] = useState(false);
  const [isAppDrawerOpen, setIsAppDrawerOpen] = useState(false);
  const [isStyleModalOpen, setIsStyleModalOpen] = useState(false);
  const [activeApp, setActiveApp] = useState<AppItem | null>(null);
  
  // Hardware simulation states
  const [isScreenOn, setIsScreenOn] = useState(true);
  const [brightness, setBrightness] = useState(95);
  const [volume, setVolume] = useState(70);
  const [showVolumeHud, setShowVolumeHud] = useState(false);

  // Trigger volume HUD change
  const handleVolumeUp = () => {
    setVolume(prev => Math.min(100, prev + 10));
    setShowVolumeHud(true);
    setTimeout(() => setShowVolumeHud(false), 2000);
  };

  const handleVolumeDown = () => {
    setVolume(prev => Math.max(0, prev - 10));
    setShowVolumeHud(true);
    setTimeout(() => setShowVolumeHud(false), 2000);
  };

  const handlePowerToggle = () => {
    setIsScreenOn(prev => !prev);
  };

  const handleLaunchApp = (appId: string) => {
    if (appId === 'wallpaper-style') {
      setIsStyleModalOpen(true);
      return;
    }
    const app = ALL_APPS.find(a => a.id === appId) || null;
    setActiveApp(app);
  };

  const handleAddToHomeScreen = (appId: string) => {
    if (!settings.homeScreenAppIds.includes(appId)) {
      setSettings(prev => ({
        ...prev,
        homeScreenAppIds: [...prev.homeScreenAppIds, appId]
      }));
    }
  };

  const handleQuickClockSwap = (clockType: PlacedWidget['type'], title: string) => {
    setSettings(prev => {
      // Find and replace the primary clock widget or add it
      const filtered = prev.widgets.filter(w => !w.type.startsWith('clock-') || w.type === 'clock-pixel-glance');
      const newClock: PlacedWidget = {
        id: `w-clock-${Date.now()}`,
        type: clockType,
        title,
        size: clockType === 'clock-retro-flip' || clockType === 'clock-world-dial' || clockType === 'clock-neon-cyber' ? '4x2' : '2x2'
      };
      return {
        ...prev,
        widgets: [newClock, ...filtered]
      };
    });
  };

  const clockQuickPills: { id: PlacedWidget['type']; label: string }[] = [
    { id: 'clock-analog-scalloped', label: 'Petal Analog' },
    { id: 'clock-digital-stacked', label: 'Stacked Bold' },
    { id: 'clock-retro-flip', label: 'Retro Split-Flap' },
    { id: 'clock-world-dial', label: 'Dual World' },
    { id: 'clock-radial-seconds', label: 'Radial Gauge' },
    { id: 'clock-bauhaus', label: 'Bauhaus' },
    { id: 'clock-typography', label: 'Editorial Words' },
    { id: 'clock-neon-cyber', label: 'Neon Cyber' },
    { id: 'clock-neumorphic-glass', label: 'Glass Dial' }
  ];

  const shapes: { id: IconShape; label: string }[] = [
    { id: 'scallop', label: 'Petal' },
    { id: 'squircle', label: 'Squircle' },
    { id: 'circle', label: 'Circle' },
    { id: 'rounded-square', label: 'Rounded' },
    { id: 'teardrop', label: 'Teardrop' },
    { id: 'pebble', label: 'Pebble' },
    { id: 'hexagon', label: 'Hexagon' },
    { id: 'cylinder', label: 'Stadium' }
  ];

  const styles: { id: IconStyle; label: string }[] = [
    { id: 'themed', label: 'Material You' },
    { id: 'vibrant', label: 'Vibrant Stock' },
    { id: 'minimal', label: 'Minimalist Line' },
    { id: 'dark', label: 'AMOLED Stealth' },
    { id: 'pastel', label: 'Soft Pastel' },
    { id: 'retro', label: 'Retro 90s' },
    { id: 'metallic', label: 'Brushed Metal' }
  ];

  return (
    <div className={`min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans ${settings.themeMode}`}>
      {/* 1. Universal Top Bar Contract */}
      <header className="h-14 border-b border-slate-800 bg-slate-900/80 backdrop-blur-md px-4 sm:px-8 flex items-center justify-between gap-8 shrink-0 z-20">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-3 whitespace-nowrap shrink-0">
          <div 
            className="w-7 h-7 rounded-xl flex items-center justify-center text-white shadow-sm"
            style={{ backgroundColor: settings.palette.primary }}
          >
            <Sparkles size={16} />
          </div>
          <span className="text-base font-bold tracking-tight text-white">
            AetherOS
          </span>
          <span className="hidden sm:inline-block text-xs text-slate-500 font-mono">
            Android 15 Skin
          </span>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-400">
          <button 
            onClick={() => setIsStyleModalOpen(true)}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Wallpaper &amp; Colors
          </button>
          <button 
            onClick={() => setIsStyleModalOpen(true)}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Icon Studio
          </button>
          <button 
            onClick={() => setIsStyleModalOpen(true)}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Clock Widgets ({clockQuickPills.length})
          </button>
          <button 
            onClick={() => setIsStyleModalOpen(true)}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Icon Packs
          </button>
        </nav>

        {/* Zone 3: Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setSettings(prev => ({ ...prev, deviceFrame: !prev.deviceFrame }))}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 transition-colors"
            title="Toggle between Phone Frame and Fullscreen view"
          >
            {settings.deviceFrame ? <Monitor size={14} /> : <Smartphone size={14} />}
            <span>{settings.deviceFrame ? 'Fullscreen' : 'Phone Frame'}</span>
          </button>

          <button
            onClick={() => setIsStyleModalOpen(true)}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-white shadow-md active:scale-95 transition-all flex items-center gap-1.5"
            style={{ backgroundColor: settings.palette.primary }}
          >
            <Palette size={14} />
            <span>Customize Skin</span>
          </button>
        </div>
      </header>

      {/* 2. Main Studio Workspace Layout */}
      <main className="flex-1 flex flex-col lg:flex-row items-stretch overflow-hidden">
        
        {/* Left/Center Column: Interactive Android Device Canvas */}
        <div className="flex-1 flex items-center justify-center p-2 sm:p-6 bg-radial from-slate-900 to-slate-950 overflow-y-auto relative no-scrollbar">
          
          {/* Hardware Volume HUD popup */}
          {showVolumeHud && (
            <div className="absolute top-20 right-8 z-40 p-3 rounded-2xl bg-slate-900/90 border border-slate-700 backdrop-blur-md shadow-2xl flex items-center gap-3 text-white animate-in fade-in duration-100">
              <Volume2 size={18} style={{ color: settings.palette.primary }} />
              <div className="w-24 h-2 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all" style={{ width: `${volume}%`, backgroundColor: settings.palette.primary }} />
              </div>
              <span className="font-mono text-xs">{volume}%</span>
            </div>
          )}

          {/* Android Phone Hardware Chassis */}
          <PhoneHardwareFrame
            onPullQuickSettings={() => setIsQuickSettingsOpen(true)}
            onVolumeUp={handleVolumeUp}
            onVolumeDown={handleVolumeDown}
            onPowerToggle={handlePowerToggle}
            isScreenOn={isScreenOn}
            isDeviceFrame={settings.deviceFrame}
            brightness={brightness}
          >
            {/* Wallpaper Screen Background */}
            <div 
              className="absolute inset-0 bg-cover bg-center transition-all duration-300 select-none"
              style={{
                backgroundImage: settings.wallpaper.type === 'image' ? `url(${settings.wallpaper.url})` : settings.wallpaper.url
              }}
            />

            {/* Subtle Gradient Scrim for Top & Bottom text legibility */}
            <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/50 via-black/20 to-transparent pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/70 via-black/30 to-transparent pointer-events-none" />

            {/* Interactive Screen Layer */}
            <div className="relative flex-1 flex flex-col justify-between p-3.5 z-10 overflow-hidden">
              
              {/* Top Section: Placed Widgets Grid */}
              <div className="space-y-3 pt-1">
                {/* At a Glance or top widgets */}
                {settings.widgets
                  .filter(w => w.type === 'clock-pixel-glance')
                  .map(widget => (
                    <WidgetRenderer 
                      key={widget.id}
                      widget={widget}
                      palette={settings.palette}
                      onOpenApp={handleLaunchApp}
                    />
                  ))}

                {/* 4-column widget display area */}
                <div className="grid grid-cols-4 gap-2.5">
                  {settings.widgets
                    .filter(w => w.type !== 'clock-pixel-glance' && w.type !== 'google-search')
                    .map(widget => (
                      <WidgetRenderer 
                        key={widget.id}
                        widget={widget}
                        palette={settings.palette}
                        onOpenApp={handleLaunchApp}
                      />
                    ))}
                </div>
              </div>

              {/* Middle Section: Pinned Home Screen App Icons */}
              <div className="my-auto py-2">
                <div className={`grid ${settings.gridDensity === '5x5' ? 'grid-cols-5' : 'grid-cols-4'} gap-y-4 gap-x-1`}>
                  {settings.homeScreenAppIds.map(appId => {
                    const app = ALL_APPS.find(a => a.id === appId);
                    if (!app) return null;

                    return (
                      <div 
                        key={app.id}
                        onClick={() => handleLaunchApp(app.id)}
                        className="flex flex-col items-center group cursor-pointer transition-transform active:scale-90"
                      >
                        <IconRenderer 
                          app={app}
                          shape={settings.iconShape}
                          style={settings.iconStyle}
                          palette={settings.palette}
                          iconPackId={settings.activeIconPackId}
                          size={Math.round(48 * settings.iconScale)}
                        />
                        {settings.showLabels && (
                          <span className="text-[11px] font-medium text-white drop-shadow-md mt-1 truncate max-w-[62px] text-center">
                            {app.name}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Section: Google Search + Dock + Navigation */}
              <div className="space-y-3 pb-1">
                {/* Search Bar Widget */}
                {settings.widgets
                  .filter(w => w.type === 'google-search')
                  .map(widget => (
                    <WidgetRenderer 
                      key={widget.id}
                      widget={widget}
                      palette={settings.palette}
                      onOpenApp={handleLaunchApp}
                    />
                  ))}

                {/* Pinned App Dock (5 apps) */}
                <div className="p-2 rounded-3xl bg-black/35 backdrop-blur-xl border border-white/10 flex items-center justify-around shadow-lg">
                  {settings.dockAppIds.map(appId => {
                    const app = ALL_APPS.find(a => a.id === appId);
                    if (!app) return null;

                    return (
                      <div 
                        key={app.id}
                        onClick={() => handleLaunchApp(app.id)}
                        className="cursor-pointer transition-transform active:scale-90"
                      >
                        <IconRenderer 
                          app={app}
                          shape={settings.iconShape}
                          style={settings.iconStyle}
                          palette={settings.palette}
                          iconPackId={settings.activeIconPackId}
                          size={Math.round(46 * settings.iconScale)}
                          showBadge={false}
                        />
                      </div>
                    );
                  })}
                </div>

                {/* App Drawer Swipe-Up Indicator & Navigation Handle */}
                <div className="flex flex-col items-center gap-1 pt-1">
                  <button 
                    onClick={() => setIsAppDrawerOpen(true)}
                    className="flex items-center gap-1 text-[11px] font-medium text-white/70 hover:text-white transition-colors cursor-pointer"
                  >
                    <ChevronUp size={14} className="animate-bounce" />
                    <span>Swipe up for all apps</span>
                  </button>

                  {/* Android Navigation Bar */}
                  {settings.navigationType === 'gestures' ? (
                    <div 
                      onClick={() => setIsAppDrawerOpen(true)}
                      className="w-28 h-1 rounded-full bg-white/70 hover:bg-white transition-colors cursor-pointer my-1" 
                      title="Gesture Navigation Bar"
                    />
                  ) : (
                    <div className="w-full flex items-center justify-around py-1 text-white/70 text-xs">
                      <button onClick={() => setActiveApp(null)} className="p-1 hover:text-white">◀</button>
                      <button onClick={() => { setActiveApp(null); setIsAppDrawerOpen(false); }} className="p-1 hover:text-white">●</button>
                      <button onClick={() => setIsQuickSettingsOpen(true)} className="p-1 hover:text-white">■</button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Settings Pull-Down Shade Modal */}
            <QuickSettingsShade 
              isOpen={isQuickSettingsOpen}
              onClose={() => setIsQuickSettingsOpen(false)}
              palette={settings.palette}
              themeMode={settings.themeMode}
              onToggleTheme={() => setSettings(prev => ({ ...prev, themeMode: prev.themeMode === 'dark' ? 'light' : 'dark' }))}
              onOpenSettings={() => setIsStyleModalOpen(true)}
              brightness={brightness}
              onBrightnessChange={setBrightness}
            />

            {/* App Drawer Modal */}
            <AppDrawer 
              isOpen={isAppDrawerOpen}
              onClose={() => setIsAppDrawerOpen(false)}
              apps={ALL_APPS}
              shape={settings.iconShape}
              style={settings.iconStyle}
              palette={settings.palette}
              iconPackId={settings.activeIconPackId}
              onLaunchApp={handleLaunchApp}
              onAddToHomeScreen={handleAddToHomeScreen}
              homeScreenAppIds={settings.homeScreenAppIds}
            />

            {/* Functional App Modal (Calculator, Clock, Weather, Camera, etc.) */}
            <InteractiveAppModal 
              app={activeApp}
              onClose={() => setActiveApp(null)}
              palette={settings.palette}
              onOpenWallpaperStyle={() => setIsStyleModalOpen(true)}
            />
          </PhoneHardwareFrame>
        </div>

        {/* Right Column: Desktop Customization Studio Panel */}
        <div className="w-full lg:w-96 border-t lg:border-t-0 lg:border-l border-slate-800 bg-slate-900/60 p-5 flex flex-col gap-5 overflow-y-auto no-scrollbar shrink-0">
          
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-400 font-mono">Personalization Studio</span>
              <h2 className="text-base font-bold text-white">Skin Controls</h2>
            </div>
            <button
              onClick={() => setIsStyleModalOpen(true)}
              className="px-3 py-1 rounded-lg bg-indigo-600/20 text-indigo-400 hover:bg-indigo-600/30 text-xs font-semibold transition-colors"
            >
              Full Studio
            </button>
          </div>

          {/* 1. Quick Clock Style Cycler (Huge Choices of Widgets!) */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Clock size={14} className="text-indigo-400" /> Clock Widget Styles
              </span>
              <span className="text-[10px] text-slate-500 font-mono">1-Tap Swap</span>
            </div>

            <div className="grid grid-cols-3 gap-1.5">
              {clockQuickPills.map(cp => {
                const isActive = settings.widgets.some(w => w.type === cp.id);
                return (
                  <button
                    key={cp.id}
                    onClick={() => handleQuickClockSwap(cp.id, cp.label)}
                    className={`px-2 py-2 rounded-xl text-xs font-medium transition-all text-center truncate ${
                      isActive 
                        ? 'bg-indigo-600 text-white shadow-sm' 
                        : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-750'
                    }`}
                  >
                    {cp.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Quick Icon Shapes (Without Installing Icon Packs) */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Grid size={14} className="text-indigo-400" /> Icon Shapes
              </span>
              <span className="text-[10px] text-emerald-400 font-mono">Instant Mask</span>
            </div>

            <div className="grid grid-cols-4 gap-1.5">
              {shapes.map(sh => {
                const isSelected = settings.iconShape === sh.id;
                return (
                  <button
                    key={sh.id}
                    onClick={() => setSettings(prev => ({ ...prev, iconShape: sh.id }))}
                    className={`px-2 py-1.5 rounded-xl text-xs font-medium transition-all truncate text-center ${
                      isSelected 
                        ? 'bg-indigo-600 text-white shadow-sm' 
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {sh.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Quick Icon Styles (Theming Engine) */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles size={14} className="text-indigo-400" /> Icon Theming Finish
              </span>
            </div>

            <div className="grid grid-cols-2 gap-1.5">
              {styles.map(st => {
                const isSelected = settings.iconStyle === st.id;
                return (
                  <button
                    key={st.id}
                    onClick={() => setSettings(prev => ({ ...prev, iconStyle: st.id }))}
                    className={`px-3 py-2 rounded-xl text-xs font-medium transition-all text-left truncate flex items-center justify-between ${
                      isSelected 
                        ? 'bg-indigo-600 text-white shadow-sm' 
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <span className="truncate">{st.label}</span>
                    {isSelected && <Check size={13} className="shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. Curated 1-Click Presets */}
          <div className="space-y-2.5">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Layers size={14} className="text-indigo-400" /> Curated Theme Presets
            </span>

            <div className="space-y-2">
              {PRESET_THEMES.slice(0, 4).map(preset => (
                <div
                  key={preset.id}
                  onClick={() => {
                    setSettings(prev => ({
                      ...prev,
                      wallpaper: preset.wallpaper,
                      palette: preset.palette,
                      themeMode: preset.themeMode,
                      iconShape: preset.iconShape,
                      iconStyle: preset.iconStyle
                    }));
                  }}
                  className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 cursor-pointer transition-all flex items-center justify-between group"
                >
                  <div>
                    <h4 className="text-xs font-bold text-white group-hover:text-indigo-400 transition-colors">
                      {preset.name}
                    </h4>
                    <span className="text-[10px] text-slate-400 capitalize">
                      {preset.iconShape} · {preset.iconStyle}
                    </span>
                  </div>
                  <span className="text-[10px] text-indigo-400 font-semibold group-hover:underline">
                    Apply →
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Wallpaper Switcher */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Quick Wallpapers</span>
            <div className="grid grid-cols-4 gap-2">
              {WALLPAPERS.slice(0, 4).map(wp => (
                <div
                  key={wp.id}
                  onClick={() => {
                    const matchingPalette = COLOR_PALETTES.find(p => p.id === wp.recommendedPaletteId) || COLOR_PALETTES[0];
                    setSettings(prev => ({
                      ...prev,
                      wallpaper: wp,
                      palette: matchingPalette
                    }));
                  }}
                  className={`aspect-[9/16] rounded-xl overflow-hidden cursor-pointer border-2 transition-all ${
                    settings.wallpaper.id === wp.id ? 'border-indigo-500 scale-105 shadow-md' : 'border-transparent hover:border-slate-600'
                  }`}
                  style={{
                    backgroundImage: wp.type === 'image' ? `url(${wp.url})` : wp.url,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                />
              ))}
            </div>
          </div>

          {/* Big Action: Open Full Studio */}
          <button
            onClick={() => setIsStyleModalOpen(true)}
            className="w-full py-3 rounded-2xl text-xs font-bold text-white shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 mt-auto"
            style={{ backgroundColor: settings.palette.primary }}
          >
            <Sliders size={15} />
            <span>Open Advanced Studio Hub</span>
          </button>
        </div>
      </main>

      {/* 3. Full Android Wallpaper & Style Modal */}
      <WallpaperAndStyleModal 
        isOpen={isStyleModalOpen}
        onClose={() => setIsStyleModalOpen(false)}
        settings={settings}
        onUpdateSettings={setSettings}
      />
    </div>
  );
}
