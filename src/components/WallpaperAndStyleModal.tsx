import React, { useState } from 'react';
import { 
  ColorPalette, 
  IconPack, 
  IconShape, 
  IconStyle, 
  LauncherSettings, 
  PlacedWidget, 
  ThemeMode, 
  Wallpaper, 
  WidgetType 
} from '../types/launcher';
import { 
  WALLPAPERS, 
  COLOR_PALETTES, 
  ICON_PACKS, 
  PRESET_THEMES, 
  ALL_APPS 
} from '../data/launcherData';
import { IconRenderer } from './IconRenderer';
import { 
  X, 
  Palette, 
  Sparkles, 
  Clock, 
  Grid, 
  Upload, 
  Check, 
  Package, 
  Sliders, 
  Download, 
  Layers, 
  Smartphone,
  Sun,
  Moon,
  Plus,
  Trash2
} from 'lucide-react';
import { 
  AnalogScallopClock, 
  StackedDigitalClock, 
  PixelGlanceWidget, 
  RetroFlipClock, 
  WorldClockDual, 
  BauhausClock, 
  TypographyClock, 
  RadialSecondsClock, 
  NeonCyberClock, 
  NeumorphicGlassClock 
} from './widgets/ClockWidgets';
import { 
  WeatherWidget, 
  MediaPlayerWidget, 
  BatteryDevicesWidget, 
  QuickNotesWidget, 
  GoogleSearchWidget 
} from './widgets/SystemWidgets';

interface WallpaperAndStyleModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: LauncherSettings;
  onUpdateSettings: (updater: (prev: LauncherSettings) => LauncherSettings) => void;
}

export const WallpaperAndStyleModal: React.FC<WallpaperAndStyleModalProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings
}) => {
  const [activeTab, setActiveTab] = useState<'wallpaper' | 'icons' | 'widgets' | 'layout' | 'packs'>('wallpaper');
  const [widgetFilter, setWidgetFilter] = useState<'all' | 'clocks' | 'system'>('clocks');
  const [customPackName, setCustomPackName] = useState('');
  const [customWallpaperInput, setCustomWallpaperInput] = useState('');

  if (!isOpen) return null;

  // 8 Shapes
  const shapes: { id: IconShape; label: string }[] = [
    { id: 'scallop', label: 'Petal Scallop' },
    { id: 'squircle', label: 'Squircle' },
    { id: 'circle', label: 'Circle' },
    { id: 'rounded-square', label: 'Rounded Square' },
    { id: 'teardrop', label: 'Teardrop' },
    { id: 'pebble', label: 'Pebble' },
    { id: 'hexagon', label: 'Hexagon' },
    { id: 'cylinder', label: 'Stadium' }
  ];

  // 7 Styles
  const styles: { id: IconStyle; label: string; desc: string }[] = [
    { id: 'themed', label: 'Material You Themed', desc: 'Monochrome glyphs tinted to wallpaper palette' },
    { id: 'vibrant', label: 'Vibrant Stock', desc: 'Original full-color brand icons' },
    { id: 'minimal', label: 'Minimalist Line', desc: 'Refined hairline wireframes on glass' },
    { id: 'dark', label: 'AMOLED Stealth', desc: 'Obsidian black surfaces with neon accents' },
    { id: 'pastel', label: 'Soft Pastel', desc: 'Gentle low-saturation tinted hues' },
    { id: 'retro', label: 'Retro 90s', desc: 'Chunky 8-bit aesthetic with drop shadows' },
    { id: 'metallic', label: 'Brushed Metal', desc: 'Sleek titanium and bronze gradients' }
  ];

  // Available widgets library
  const availableWidgets: {
    type: WidgetType;
    title: string;
    category: 'clocks' | 'system';
    size: '1x1' | '2x1' | '2x2' | '4x1' | '4x2';
    description: string;
    component: React.ReactNode;
  }[] = [
    {
      type: 'clock-analog-scalloped',
      title: 'Scalloped Analog Clock',
      category: 'clocks',
      size: '2x2',
      description: 'Iconic Android 14/15 4-petal flower shape with live ticking hands.',
      component: <AnalogScallopClock palette={settings.palette} />
    },
    {
      type: 'clock-digital-stacked',
      title: 'Stacked Typography Digital',
      category: 'clocks',
      size: '2x2',
      description: 'Bold stacked hours and minutes in Material You pill shape.',
      component: <StackedDigitalClock palette={settings.palette} />
    },
    {
      type: 'clock-pixel-glance',
      title: 'Pixel "At a Glance"',
      category: 'clocks',
      size: '4x1',
      description: 'Calendar notifications, live weather pill, and smart events.',
      component: <PixelGlanceWidget palette={settings.palette} />
    },
    {
      type: 'clock-retro-flip',
      title: 'Retro Split-Flap Clock',
      category: 'clocks',
      size: '4x2',
      description: 'Classic mechanical split-flap cards with AM/PM and weather.',
      component: <RetroFlipClock palette={settings.palette} />
    },
    {
      type: 'clock-world-dial',
      title: 'Dual World Clock',
      category: 'clocks',
      size: '4x2',
      description: 'Side-by-side local time and international cities.',
      component: <WorldClockDual palette={settings.palette} />
    },
    {
      type: 'clock-radial-seconds',
      title: 'Radial Seconds Gauge',
      category: 'clocks',
      size: '2x2',
      description: 'High-precision chronograph with sweeping 60s arc.',
      component: <RadialSecondsClock palette={settings.palette} />
    },
    {
      type: 'clock-bauhaus',
      title: 'Bauhaus Modernist Clock',
      category: 'clocks',
      size: '2x2',
      description: 'Avant-garde geometric hands and primary color quadrants.',
      component: <BauhausClock palette={settings.palette} />
    },
    {
      type: 'clock-typography',
      title: 'Editorial Words Clock',
      category: 'clocks',
      size: '2x2',
      description: 'Spelled-out textual hours and minutes with date strip.',
      component: <TypographyClock palette={settings.palette} />
    },
    {
      type: 'clock-neon-cyber',
      title: 'Neon 7-Segment Cyber',
      category: 'clocks',
      size: '4x2',
      description: 'Digital LED tube clock with flashing colons and sync telemetry.',
      component: <NeonCyberClock palette={settings.palette} />
    },
    {
      type: 'clock-neumorphic-glass',
      title: 'Frosted Glass Dial',
      category: 'clocks',
      size: '2x2',
      description: 'Luminous hour tick markers with continuous second hand.',
      component: <NeumorphicGlassClock palette={settings.palette} />
    },
    {
      type: 'weather-forecast',
      title: 'Weather Forecast Capsule',
      category: 'system',
      size: '2x2',
      description: 'Live condition, current temperature, and hourly timeline.',
      component: <WeatherWidget palette={settings.palette} />
    },
    {
      type: 'media-player',
      title: 'Material You Media Player',
      category: 'system',
      size: '2x2',
      description: 'Interactive playback, album art, and progress seek bar.',
      component: <MediaPlayerWidget palette={settings.palette} />
    },
    {
      type: 'battery-devices',
      title: 'Connected Devices Battery',
      category: 'system',
      size: '2x2',
      description: 'Phone, Pixel Watch, and Buds Pro battery indicators.',
      component: <BatteryDevicesWidget palette={settings.palette} />
    },
    {
      type: 'quick-notes',
      title: 'Keep Sticky Tasks',
      category: 'system',
      size: '2x2',
      description: 'Interactive checklists for tasks and quick reminders.',
      component: <QuickNotesWidget palette={settings.palette} />
    },
    {
      type: 'google-search',
      title: 'Google Pill Search',
      category: 'system',
      size: '4x1',
      description: 'Material You search bar with Voice Mic and Google Lens.',
      component: <GoogleSearchWidget palette={settings.palette} />
    }
  ];

  const handleAddWidget = (widgetDef: typeof availableWidgets[0]) => {
    const newWidget: PlacedWidget = {
      id: `w-${Date.now()}`,
      type: widgetDef.type,
      title: widgetDef.title,
      size: widgetDef.size
    };
    onUpdateSettings(prev => ({
      ...prev,
      widgets: [...prev.widgets, newWidget]
    }));
  };

  const handleRemoveWidget = (widgetId: string) => {
    onUpdateSettings(prev => ({
      ...prev,
      widgets: prev.widgets.filter(w => w.id !== widgetId)
    }));
  };

  const handleSelectWallpaper = (wp: Wallpaper) => {
    const matchingPalette = COLOR_PALETTES.find(p => p.id === wp.recommendedPaletteId) || COLOR_PALETTES[0];
    onUpdateSettings(prev => ({
      ...prev,
      wallpaper: wp,
      palette: matchingPalette
    }));
  };

  const handleAddCustomWallpaper = () => {
    if (!customWallpaperInput.trim()) return;
    const customWp: Wallpaper = {
      id: `custom-${Date.now()}`,
      name: 'Custom Wallpaper',
      category: 'Abstract',
      url: customWallpaperInput.trim(),
      type: 'image',
      recommendedPaletteId: 'deep-cobalt'
    };
    handleSelectWallpaper(customWp);
    setCustomWallpaperInput('');
  };

  const handleApplyPreset = (preset: typeof PRESET_THEMES[0]) => {
    onUpdateSettings(prev => ({
      ...prev,
      wallpaper: preset.wallpaper,
      palette: preset.palette,
      themeMode: preset.themeMode,
      iconShape: preset.iconShape,
      iconStyle: preset.iconStyle
    }));
  };

  const handleExportConfig = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(settings, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', 'aether_android_theme.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-md p-0 sm:p-4 animate-in fade-in duration-150">
      <div 
        className="w-full sm:max-w-2xl max-h-[90vh] bg-slate-900 border border-slate-800 text-slate-100 rounded-t-3xl sm:rounded-3xl flex flex-col shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div 
              className="w-9 h-9 rounded-2xl flex items-center justify-center text-white shadow-sm"
              style={{ backgroundColor: settings.palette.primary }}
            >
              <Palette size={18} />
            </div>
            <div>
              <h2 className="text-base font-bold text-white leading-tight">Wallpaper &amp; style</h2>
              <p className="text-xs text-slate-400">Stock Android Personalization Studio</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportConfig}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 transition-colors"
              title="Export theme configuration"
            >
              <Download size={14} /> Export
            </button>
            <button 
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 px-4 pt-2 border-b border-slate-800 overflow-x-auto no-scrollbar shrink-0 bg-slate-950/40">
          <button
            onClick={() => setActiveTab('wallpaper')}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-t-lg transition-colors whitespace-nowrap border-b-2 ${
              activeTab === 'wallpaper' 
                ? 'border-indigo-500 text-white bg-slate-800/60' 
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Palette size={14} /> Wallpaper &amp; Colors
          </button>

          <button
            onClick={() => setActiveTab('icons')}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-t-lg transition-colors whitespace-nowrap border-b-2 ${
              activeTab === 'icons' 
                ? 'border-indigo-500 text-white bg-slate-800/60' 
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles size={14} /> Icon Studio
          </button>

          <button
            onClick={() => setActiveTab('widgets')}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-t-lg transition-colors whitespace-nowrap border-b-2 ${
              activeTab === 'widgets' 
                ? 'border-indigo-500 text-white bg-slate-800/60' 
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Clock size={14} /> Widgets ({settings.widgets.length})
          </button>

          <button
            onClick={() => setActiveTab('packs')}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-t-lg transition-colors whitespace-nowrap border-b-2 ${
              activeTab === 'packs' 
                ? 'border-indigo-500 text-white bg-slate-800/60' 
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Package size={14} /> Icon Packs
          </button>

          <button
            onClick={() => setActiveTab('layout')}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-t-lg transition-colors whitespace-nowrap border-b-2 ${
              activeTab === 'layout' 
                ? 'border-indigo-500 text-white bg-slate-800/60' 
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Grid size={14} /> Presets &amp; Layout
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-6 no-scrollbar">

          {/* TAB 1: WALLPAPER & COLORS */}
          {activeTab === 'wallpaper' && (
            <div className="space-y-6">
              {/* Wallpaper Preview & Light/Dark Mode */}
              <div className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-2xl bg-slate-800/50 border border-slate-700/50">
                <div 
                  className="w-24 h-40 rounded-xl overflow-hidden shadow-lg border-2 border-white/20 shrink-0 bg-cover bg-center"
                  style={{
                    backgroundImage: settings.wallpaper.type === 'image' ? `url(${settings.wallpaper.url})` : settings.wallpaper.url
                  }}
                />
                <div className="flex-1 space-y-3 text-center sm:text-left">
                  <div>
                    <span className="text-[11px] font-semibold tracking-wider text-indigo-400 uppercase">Current Wallpaper</span>
                    <h3 className="text-base font-bold text-white">{settings.wallpaper.name}</h3>
                    <p className="text-xs text-slate-400">Material You extracts accent tones automatically from this backdrop.</p>
                  </div>

                  {/* Dark / Light Mode Switch */}
                  <div className="flex items-center gap-2 justify-center sm:justify-start">
                    <button
                      onClick={() => onUpdateSettings(prev => ({ ...prev, themeMode: 'dark' }))}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                        settings.themeMode === 'dark' 
                          ? 'bg-indigo-600 text-white shadow-sm' 
                          : 'bg-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      <Moon size={14} /> Dark Theme
                    </button>
                    <button
                      onClick={() => onUpdateSettings(prev => ({ ...prev, themeMode: 'light' }))}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                        settings.themeMode === 'light' 
                          ? 'bg-amber-600 text-white shadow-sm' 
                          : 'bg-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      <Sun size={14} /> Light Theme
                    </button>
                  </div>
                </div>
              </div>

              {/* Wallpaper Picker Grid */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Choose Wallpaper</h4>
                  <span className="text-xs text-slate-400">{WALLPAPERS.length} Curated Backdrops</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {WALLPAPERS.map((wp) => {
                    const isSelected = settings.wallpaper.id === wp.id;
                    return (
                      <div
                        key={wp.id}
                        onClick={() => handleSelectWallpaper(wp)}
                        className={`group relative aspect-[9/16] rounded-2xl overflow-hidden cursor-pointer border-2 transition-all duration-150 ${
                          isSelected ? 'border-indigo-500 scale-[1.02] shadow-lg shadow-indigo-500/20' : 'border-transparent hover:border-slate-600'
                        }`}
                      >
                        <div 
                          className="w-full h-full bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                          style={{
                            backgroundImage: wp.type === 'image' ? `url(${wp.url})` : wp.url
                          }}
                        />
                        <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                          <span className="text-[11px] font-semibold text-white truncate block">{wp.name}</span>
                        </div>
                        {isSelected && (
                          <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-indigo-500 text-white flex items-center justify-center shadow">
                            <Check size={12} strokeWidth={3} />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Custom Wallpaper Input */}
              <div className="p-3.5 rounded-2xl bg-slate-800/40 border border-slate-700/50 space-y-2">
                <span className="text-xs font-semibold text-slate-300 block">Custom Wallpaper Image URL</span>
                <div className="flex items-center gap-2">
                  <input 
                    type="url"
                    placeholder="https://images.example.com/wallpaper.jpg"
                    value={customWallpaperInput}
                    onChange={(e) => setCustomWallpaperInput(e.target.value)}
                    className="flex-1 px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                  <button
                    onClick={handleAddCustomWallpaper}
                    disabled={!customWallpaperInput.trim()}
                    className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-xs font-medium text-white transition-colors"
                  >
                    Apply
                  </button>
                </div>
              </div>

              {/* Material You Dynamic Palettes */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Dynamic Color Palettes</h4>
                  <span className="text-xs text-slate-400">Material You</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {COLOR_PALETTES.map((pal) => {
                    const isSelected = settings.palette.id === pal.id;
                    return (
                      <div
                        key={pal.id}
                        onClick={() => onUpdateSettings(prev => ({ ...prev, palette: pal }))}
                        className={`p-3 rounded-2xl cursor-pointer border-2 transition-all flex items-center justify-between ${
                          isSelected ? 'border-indigo-500 bg-slate-800 shadow-md' : 'border-slate-800 bg-slate-850 hover:border-slate-700'
                        }`}
                      >
                        <div className="space-y-1">
                          <span className="text-xs font-semibold text-white block">{pal.name}</span>
                          <div className="flex items-center gap-1">
                            {pal.previewColors.map((c, i) => (
                              <div key={i} className="w-4 h-4 rounded-full border border-black/20" style={{ backgroundColor: c }} />
                            ))}
                          </div>
                        </div>
                        {isSelected && <Check size={16} className="text-indigo-400 shrink-0" />}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ICON STUDIO */}
          {activeTab === 'icons' && (
            <div className="space-y-6">
              {/* Live Icon Interactive Preview */}
              <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700 flex flex-col items-center">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Live Icon Preview</span>
                <div className="flex items-center justify-center gap-4">
                  {ALL_APPS.slice(0, 4).map(app => (
                    <div key={app.id} className="flex flex-col items-center">
                      <IconRenderer 
                        app={app}
                        shape={settings.iconShape}
                        style={settings.iconStyle}
                        palette={settings.palette}
                        iconPackId={settings.activeIconPackId}
                        size={Math.round(52 * settings.iconScale)}
                      />
                      {settings.showLabels && (
                        <span className="text-[11px] font-medium text-slate-300 mt-1 truncate max-w-[56px] text-center">
                          {app.name}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* 1. Icon Shapes (Customizable without icon packs) */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Icon Shapes (8 Options)</h4>
                  <span className="text-xs text-indigo-400">Adaptive Mask</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {shapes.map((sh) => {
                    const isSelected = settings.iconShape === sh.id;
                    return (
                      <button
                        key={sh.id}
                        onClick={() => onUpdateSettings(prev => ({ ...prev, iconShape: sh.id }))}
                        className={`p-3 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all ${
                          isSelected ? 'border-indigo-500 bg-slate-800 shadow-md' : 'border-slate-800 bg-slate-850 hover:border-slate-700'
                        }`}
                      >
                        <div 
                          className={`w-9 h-9 flex items-center justify-center ${
                            sh.id === 'circle' ? 'shape-circle' :
                            sh.id === 'squircle' ? 'shape-squircle' :
                            sh.id === 'rounded-square' ? 'shape-rounded-square' :
                            sh.id === 'teardrop' ? 'shape-teardrop' :
                            sh.id === 'pebble' ? 'shape-pebble' :
                            sh.id === 'scallop' ? 'shape-scallop' :
                            sh.id === 'hexagon' ? 'shape-hexagon' : 'shape-cylinder'
                          }`}
                          style={{ backgroundColor: settings.palette.primary }}
                        >
                          <div className="w-3 h-3 rounded-full bg-white/80" />
                        </div>
                        <span className="text-xs font-medium text-slate-300">{sh.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. Icon Theming Styles */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Icon Finishes &amp; Theming (7 Styles)</h4>
                  <span className="text-xs text-indigo-400">Zero-Install Engine</span>
                </div>

                <div className="space-y-2">
                  {styles.map((st) => {
                    const isSelected = settings.iconStyle === st.id;
                    return (
                      <div
                        key={st.id}
                        onClick={() => onUpdateSettings(prev => ({ ...prev, iconStyle: st.id }))}
                        className={`p-3 rounded-2xl border-2 cursor-pointer flex items-center justify-between transition-all ${
                          isSelected ? 'border-indigo-500 bg-slate-800 shadow-md' : 'border-slate-800 bg-slate-850 hover:border-slate-700'
                        }`}
                      >
                        <div>
                          <span className="text-xs font-bold text-white block">{st.label}</span>
                          <span className="text-[11px] text-slate-400">{st.desc}</span>
                        </div>
                        {isSelected && <Check size={16} className="text-indigo-400 shrink-0" />}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 3. Icon Sizing & Label Toggles */}
              <div className="p-4 rounded-2xl bg-slate-850 border border-slate-800 space-y-4">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Ergonomics &amp; Labels</h4>
                
                {/* Scale Slider */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Icon Size Scale</span>
                    <span className="font-mono text-white">{Math.round(settings.iconScale * 100)}%</span>
                  </div>
                  <input 
                    type="range"
                    min={0.8}
                    max={1.25}
                    step={0.05}
                    value={settings.iconScale}
                    onChange={(e) => onUpdateSettings(prev => ({ ...prev, iconScale: Number(e.target.value) }))}
                    className="w-full accent-indigo-500 cursor-pointer h-2 bg-slate-700 rounded-lg appearance-none"
                  />
                </div>

                {/* Show Labels Toggle */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-700/60">
                  <div>
                    <span className="text-xs font-semibold text-white block">App Labels</span>
                    <span className="text-[11px] text-slate-400">Display names below icons on Home Screen</span>
                  </div>
                  <button
                    onClick={() => onUpdateSettings(prev => ({ ...prev, showLabels: !prev.showLabels }))}
                    className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                      settings.showLabels ? 'bg-indigo-600' : 'bg-slate-700'
                    }`}
                  >
                    <div 
                      className={`w-5 h-5 rounded-full bg-white transition-transform ${
                        settings.showLabels ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: WIDGETS CATALOG */}
          {activeTab === 'widgets' && (
            <div className="space-y-5">
              {/* Filter Tabs */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white">Interactive Widgets Library</h3>
                  <p className="text-xs text-slate-400">Huge choices of clocks, weather &amp; utility widgets</p>
                </div>

                <div className="flex items-center gap-1 p-1 bg-slate-800 rounded-xl">
                  <button
                    onClick={() => setWidgetFilter('all')}
                    className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors ${
                      widgetFilter === 'all' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    All ({availableWidgets.length})
                  </button>
                  <button
                    onClick={() => setWidgetFilter('clocks')}
                    className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors ${
                      widgetFilter === 'clocks' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Clocks (10)
                  </button>
                  <button
                    onClick={() => setWidgetFilter('system')}
                    className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors ${
                      widgetFilter === 'system' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    System
                  </button>
                </div>
              </div>

              {/* Active Home Screen Widgets Management */}
              {settings.widgets.length > 0 && (
                <div className="p-3.5 rounded-2xl bg-slate-850 border border-slate-800 space-y-2">
                  <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                    Active on Home Screen ({settings.widgets.length})
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {settings.widgets.map(w => (
                      <div 
                        key={w.id} 
                        className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-xs"
                      >
                        <span className="text-slate-200">{w.title}</span>
                        <span className="text-[10px] text-slate-400 font-mono">({w.size})</span>
                        <button 
                          onClick={() => handleRemoveWidget(w.id)}
                          className="text-rose-400 hover:text-rose-300 p-0.5"
                          title="Remove from home screen"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Widgets Catalog Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {availableWidgets
                  .filter(w => widgetFilter === 'all' || w.category === widgetFilter)
                  .map((widgetDef) => {
                    const isAlreadyAdded = settings.widgets.some(w => w.type === widgetDef.type);

                    return (
                      <div 
                        key={widgetDef.type}
                        className="p-4 rounded-2xl bg-slate-850 border border-slate-800 flex flex-col justify-between gap-3 hover:border-slate-700 transition-colors"
                      >
                        {/* Widget Header */}
                        <div className="flex items-start justify-between">
                          <div>
                            <span className="text-[10px] font-bold tracking-wider uppercase text-indigo-400 font-mono">
                              {widgetDef.size} · {widgetDef.category}
                            </span>
                            <h4 className="text-sm font-bold text-white mt-0.5">{widgetDef.title}</h4>
                            <p className="text-xs text-slate-400 mt-0.5">{widgetDef.description}</p>
                          </div>
                        </div>

                        {/* Live Widget Mini Preview Container */}
                        <div className="w-full min-h-[120px] max-h-[160px] p-2 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-center overflow-hidden">
                          <div className="w-full max-w-[220px]">
                            {widgetDef.component}
                          </div>
                        </div>

                        {/* Add Button */}
                        <button
                          onClick={() => handleAddWidget(widgetDef)}
                          className="w-full py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-xs font-semibold text-white flex items-center justify-center gap-1.5 transition-all shadow-sm"
                        >
                          <Plus size={15} /> Add to Home Screen
                        </button>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}

          {/* TAB 4: ICON PACKS INTEGRATION */}
          {activeTab === 'packs' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-bold text-white">Icon Packs Integration</h3>
                <p className="text-xs text-slate-400">
                  Switch between built-in curated icon packs or import your own custom icon pack.
                </p>
              </div>

              {/* Curated Packs List */}
              <div className="space-y-3">
                {ICON_PACKS.map((pack) => {
                  const isSelected = settings.activeIconPackId === pack.id;
                  return (
                    <div
                      key={pack.id}
                      onClick={() => onUpdateSettings(prev => ({ ...prev, activeIconPackId: pack.id }))}
                      className={`p-4 rounded-2xl border-2 cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 transition-all ${
                        isSelected ? 'border-indigo-500 bg-slate-800 shadow-md' : 'border-slate-800 bg-slate-850 hover:border-slate-700'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-white">{pack.name}</h4>
                          <span className="text-[10px] bg-slate-700 px-2 py-0.5 rounded text-slate-300 font-mono">
                            {pack.iconCount} icons
                          </span>
                        </div>
                        <p className="text-xs text-slate-400">{pack.description}</p>
                        <span className="text-[11px] text-slate-500 block">By {pack.author}</span>
                      </div>

                      <div className="flex items-center gap-3">
                        {isSelected ? (
                          <span className="px-3 py-1 rounded-full bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1">
                            <Check size={14} /> Active Pack
                          </span>
                        ) : (
                          <button className="px-3 py-1 rounded-full bg-slate-700 hover:bg-slate-600 text-xs font-medium text-slate-200">
                            Apply Pack
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Custom Icon Pack Creator & JSON Importer */}
              <div className="p-4 rounded-2xl bg-slate-850 border border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-indigo-400">
                  <Package size={16} />
                  <h4 className="text-xs font-bold uppercase tracking-wider">Custom Icon Pack Importer</h4>
                </div>
                <p className="text-xs text-slate-400">
                  Import third-party launcher icon packs via standard JSON schema or create a custom profile.
                </p>

                <div className="flex items-center gap-2">
                  <input 
                    type="text"
                    placeholder="Enter icon pack name (e.g., Nova Glass 3D)"
                    value={customPackName}
                    onChange={(e) => setCustomPackName(e.target.value)}
                    className="flex-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                  <button
                    onClick={() => {
                      if (!customPackName.trim()) return;
                      alert(`Icon pack "${customPackName}" registered successfully!`);
                      setCustomPackName('');
                    }}
                    className="px-3 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-medium text-white transition-colors"
                  >
                    Register Pack
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: PRESETS & LAYOUT */}
          {activeTab === 'layout' && (
            <div className="space-y-6">
              {/* 1-Click Curated Presets */}
              <div className="space-y-3">
                <div>
                  <h3 className="text-sm font-bold text-white">1-Click Presets</h3>
                  <p className="text-xs text-slate-400">Instant aesthetic transformations crafted by designers</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {PRESET_THEMES.map((preset) => (
                    <div
                      key={preset.id}
                      onClick={() => handleApplyPreset(preset)}
                      className="p-3.5 rounded-2xl bg-slate-850 border border-slate-800 hover:border-indigo-500 cursor-pointer transition-all flex flex-col justify-between gap-2 group"
                    >
                      <div>
                        <h4 className="text-xs font-bold text-white group-hover:text-indigo-400 transition-colors">
                          {preset.name}
                        </h4>
                        <p className="text-[11px] text-slate-400 mt-0.5">{preset.description}</p>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-[10px] text-slate-400">
                        <span className="capitalize">{preset.iconShape} · {preset.iconStyle}</span>
                        <span className="text-indigo-400 font-semibold group-hover:underline">Load Preset →</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Grid Density & Navigation Style */}
              <div className="p-4 rounded-2xl bg-slate-850 border border-slate-800 space-y-4">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Home Screen Grid &amp; Navigation</h4>
                
                {/* Grid Density */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold text-white block">Grid Density</span>
                    <span className="text-[11px] text-slate-400">Columns and rows per page</span>
                  </div>

                  <div className="flex items-center gap-1 p-1 bg-slate-800 rounded-lg">
                    {(['4x5', '5x5', '4x4'] as const).map((density) => (
                      <button
                        key={density}
                        onClick={() => onUpdateSettings(prev => ({ ...prev, gridDensity: density }))}
                        className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                          settings.gridDensity === density ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        {density}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Navigation Bar Type */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-800">
                  <div>
                    <span className="text-xs font-semibold text-white block">Navigation System</span>
                    <span className="text-[11px] text-slate-400">Gesture handle pill vs 3-button bar</span>
                  </div>

                  <div className="flex items-center gap-1 p-1 bg-slate-800 rounded-lg">
                    <button
                      onClick={() => onUpdateSettings(prev => ({ ...prev, navigationType: 'gestures' }))}
                      className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                        settings.navigationType === 'gestures' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Gesture Pill
                    </button>
                    <button
                      onClick={() => onUpdateSettings(prev => ({ ...prev, navigationType: '3-button' }))}
                      className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                        settings.navigationType === '3-button' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      3-Button
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between shrink-0">
          <span className="text-xs text-slate-400">Changes apply instantly to launcher</span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md active:scale-95 transition-all"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
