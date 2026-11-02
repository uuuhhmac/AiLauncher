export type IconShape = 
  | 'squircle' 
  | 'circle' 
  | 'rounded-square' 
  | 'teardrop' 
  | 'pebble' 
  | 'scallop' 
  | 'hexagon' 
  | 'cylinder';

export type IconStyle = 
  | 'themed'       // Dynamic Material You (monochrome tinted on tonal container)
  | 'vibrant'      // Full original colored badges
  | 'minimal'      // Crisp outlines
  | 'dark'         // Obsidian surface with glowing accent
  | 'pastel'       // Soft muted tones
  | 'retro'        // 8-bit chunky style
  | 'metallic';    // Brushed bronze & metallic gradient

export type ThemeMode = 'light' | 'dark';

export interface ColorPalette {
  id: string;
  name: string;
  primary: string;
  secondary: string;
  surface: string;
  surfaceContainer: string;
  onSurface: string;
  accent: string;
  pillColor: string;
  previewColors: string[];
}

export interface AppItem {
  id: string;
  name: string;
  packageName: string;
  iconName: string;
  defaultBg: string;
  defaultColor: string;
  category: 'Google' | 'Productivity' | 'Social & Comms' | 'Media' | 'Tools';
  notificationCount?: number;
  customIconSvg?: string;
}

export interface IconPack {
  id: string;
  name: string;
  description: string;
  author: string;
  iconCount: number;
  previewIcons: string[];
  isCustom?: boolean;
}

export type WidgetType = 
  | 'clock-analog-scalloped'
  | 'clock-digital-stacked'
  | 'clock-pixel-glance'
  | 'clock-retro-flip'
  | 'clock-world-dial'
  | 'clock-bauhaus'
  | 'clock-typography'
  | 'clock-radial-seconds'
  | 'clock-neon-cyber'
  | 'clock-neumorphic-glass'
  | 'weather-forecast'
  | 'media-player'
  | 'battery-devices'
  | 'quick-notes'
  | 'google-search';

export interface PlacedWidget {
  id: string;
  type: WidgetType;
  title: string;
  size: '1x1' | '2x1' | '2x2' | '4x1' | '4x2';
}

export interface Wallpaper {
  id: string;
  name: string;
  category: 'Botanical' | 'Desert' | 'Minimalist' | 'Gradient' | 'Abstract';
  url: string;
  type: 'image' | 'gradient';
  recommendedPaletteId: string;
}

export interface LauncherSettings {
  wallpaper: Wallpaper;
  palette: ColorPalette;
  themeMode: ThemeMode;
  iconShape: IconShape;
  iconStyle: IconStyle;
  iconScale: number; // 0.8 to 1.25
  showLabels: boolean;
  activeIconPackId: string;
  gridDensity: '4x5' | '5x5' | '4x4';
  navigationType: 'gestures' | '3-button';
  deviceFrame: boolean;
  widgets: PlacedWidget[];
  homeScreenAppIds: string[];
  dockAppIds: string[];
}
