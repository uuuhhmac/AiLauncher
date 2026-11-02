import { AppItem, ColorPalette, IconPack, LauncherSettings, Wallpaper } from '../types/launcher';

export const WALLPAPERS: Wallpaper[] = [
  {
    id: 'botanical-monstera',
    name: 'Botanical Emerald',
    category: 'Botanical',
    url: '/src/assets/images/wallpaper_pixel_botanical_1793560370658.jpg',
    type: 'image',
    recommendedPaletteId: 'botanical-forest'
  },
  {
    id: 'warm-dunes',
    name: 'Sahara Golden Dunes',
    category: 'Desert',
    url: '/src/assets/images/wallpaper_warm_dunes_1793560385332.jpg',
    type: 'image',
    recommendedPaletteId: 'terracotta-sunrise'
  },
  {
    id: 'dark-minimal',
    name: 'Obsidian Flow',
    category: 'Minimalist',
    url: '/src/assets/images/wallpaper_dark_minimal_1793560398865.jpg',
    type: 'image',
    recommendedPaletteId: 'deep-cobalt'
  },
  {
    id: 'gradient-twilight',
    name: 'Twilight Horizon',
    category: 'Gradient',
    url: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 45%, #4338ca 75%, #0284c7 100%)',
    type: 'gradient',
    recommendedPaletteId: 'cyber-violet'
  },
  {
    id: 'gradient-mint',
    name: 'Aurora Mint',
    category: 'Gradient',
    url: 'linear-gradient(135deg, #064e3b 0%, #047857 40%, #10b981 75%, #34d399 100%)',
    type: 'gradient',
    recommendedPaletteId: 'botanical-forest'
  },
  {
    id: 'gradient-amber',
    name: 'Solar Amber',
    category: 'Gradient',
    url: 'linear-gradient(135deg, #7c2d12 0%, #c2410c 45%, #ea580c 70%, #f59e0b 100%)',
    type: 'gradient',
    recommendedPaletteId: 'terracotta-sunrise'
  },
  {
    id: 'gradient-graphite',
    name: 'Monochrome Slate',
    category: 'Minimalist',
    url: 'linear-gradient(180deg, #09090b 0%, #18181b 50%, #27272a 100%)',
    type: 'gradient',
    recommendedPaletteId: 'minimalist-graphite'
  }
];

export const COLOR_PALETTES: ColorPalette[] = [
  {
    id: 'botanical-forest',
    name: 'Forest Sage',
    primary: '#2d6a4f',
    secondary: '#52b788',
    surface: '#1b4332',
    surfaceContainer: '#d8f3dc',
    onSurface: '#081c15',
    accent: '#40916c',
    pillColor: '#74c69d',
    previewColors: ['#2d6a4f', '#52b788', '#d8f3dc', '#74c69d']
  },
  {
    id: 'terracotta-sunrise',
    name: 'Warm Terracotta',
    primary: '#c2410c',
    secondary: '#ea580c',
    surface: '#431407',
    surfaceContainer: '#ffedd5',
    onSurface: '#2d0600',
    accent: '#fb923c',
    pillColor: '#fed7aa',
    previewColors: ['#c2410c', '#ea580c', '#ffedd5', '#fb923c']
  },
  {
    id: 'deep-cobalt',
    name: 'Pixel Cobalt',
    primary: '#1d4ed8',
    secondary: '#3b82f6',
    surface: '#0f172a',
    surfaceContainer: '#dbeafe',
    onSurface: '#0b1329',
    accent: '#60a5fa',
    pillColor: '#bfdbfe',
    previewColors: ['#1d4ed8', '#3b82f6', '#dbeafe', '#60a5fa']
  },
  {
    id: 'cyber-violet',
    name: 'Lilac Amethyst',
    primary: '#7c3aed',
    secondary: '#a855f7',
    surface: '#2e1065',
    surfaceContainer: '#f3e8ff',
    onSurface: '#19043b',
    accent: '#c084fc',
    pillColor: '#e9d5ff',
    previewColors: ['#7c3aed', '#a855f7', '#f3e8ff', '#c084fc']
  },
  {
    id: 'minimalist-graphite',
    name: 'Stealth Graphite',
    primary: '#3f3f46',
    secondary: '#71717a',
    surface: '#18181b',
    surfaceContainer: '#e4e4e7',
    onSurface: '#09090b',
    accent: '#a1a1aa',
    pillColor: '#d4d4d8',
    previewColors: ['#3f3f46', '#71717a', '#e4e4e7', '#a1a1aa']
  },
  {
    id: 'meadow-citron',
    name: 'Sunlit Meadow',
    primary: '#4d7c0f',
    secondary: '#84cc16',
    surface: '#1a2e05',
    surfaceContainer: '#ecfccb',
    onSurface: '#0d1802',
    accent: '#a3e635',
    pillColor: '#d9f99d',
    previewColors: ['#4d7c0f', '#84cc16', '#ecfccb', '#a3e635']
  }
];

export const ALL_APPS: AppItem[] = [
  {
    id: 'phone',
    name: 'Phone',
    packageName: 'com.google.android.dialer',
    iconName: 'Phone',
    defaultBg: '#1e88e5',
    defaultColor: '#ffffff',
    category: 'Social & Comms',
    notificationCount: 2
  },
  {
    id: 'messages',
    name: 'Messages',
    packageName: 'com.google.android.apps.messaging',
    iconName: 'MessageSquare',
    defaultBg: '#4285f4',
    defaultColor: '#ffffff',
    category: 'Social & Comms',
    notificationCount: 4
  },
  {
    id: 'chrome',
    name: 'Chrome',
    packageName: 'com.android.chrome',
    iconName: 'Globe',
    defaultBg: '#ea4335',
    defaultColor: '#ffffff',
    category: 'Google'
  },
  {
    id: 'camera',
    name: 'Camera',
    packageName: 'com.google.android.GoogleCamera',
    iconName: 'Camera',
    defaultBg: '#202124',
    defaultColor: '#ffffff',
    category: 'Tools'
  },
  {
    id: 'photos',
    name: 'Photos',
    packageName: 'com.google.android.apps.photos',
    iconName: 'Image',
    defaultBg: '#ffffff',
    defaultColor: '#ea4335',
    category: 'Google'
  },
  {
    id: 'settings',
    name: 'Settings',
    packageName: 'com.android.settings',
    iconName: 'Settings',
    defaultBg: '#5f6368',
    defaultColor: '#ffffff',
    category: 'Tools'
  },
  {
    id: 'spotify',
    name: 'Spotify',
    packageName: 'com.spotify.music',
    iconName: 'Music',
    defaultBg: '#1ed760',
    defaultColor: '#000000',
    category: 'Media'
  },
  {
    id: 'youtube',
    name: 'YouTube',
    packageName: 'com.google.android.youtube',
    iconName: 'Play',
    defaultBg: '#ff0000',
    defaultColor: '#ffffff',
    category: 'Media'
  },
  {
    id: 'maps',
    name: 'Maps',
    packageName: 'com.google.android.apps.maps',
    iconName: 'MapPin',
    defaultBg: '#34a853',
    defaultColor: '#ffffff',
    category: 'Google'
  },
  {
    id: 'clock',
    name: 'Clock',
    packageName: 'com.google.android.deskclock',
    iconName: 'Clock',
    defaultBg: '#1a73e8',
    defaultColor: '#ffffff',
    category: 'Tools'
  },
  {
    id: 'weather',
    name: 'Weather',
    packageName: 'com.google.android.apps.weather',
    iconName: 'CloudSun',
    defaultBg: '#0288d1',
    defaultColor: '#ffffff',
    category: 'Tools'
  },
  {
    id: 'files',
    name: 'Files',
    packageName: 'com.google.android.apps.nbu.files',
    iconName: 'Folder',
    defaultBg: '#4285f4',
    defaultColor: '#ffffff',
    category: 'Productivity'
  },
  {
    id: 'keep',
    name: 'Keep Notes',
    packageName: 'com.google.android.keep',
    iconName: 'FileText',
    defaultBg: '#fbbc04',
    defaultColor: '#202124',
    category: 'Productivity'
  },
  {
    id: 'calculator',
    name: 'Calculator',
    packageName: 'com.google.android.calculator',
    iconName: 'Calculator',
    defaultBg: '#3c4043',
    defaultColor: '#8ab4f8',
    category: 'Tools'
  },
  {
    id: 'playstore',
    name: 'Play Store',
    packageName: 'com.android.vending',
    iconName: 'ShoppingBag',
    defaultBg: '#ffffff',
    defaultColor: '#00875f',
    category: 'Google'
  },
  {
    id: 'gmail',
    name: 'Gmail',
    packageName: 'com.google.android.gm',
    iconName: 'Mail',
    defaultBg: '#ffffff',
    defaultColor: '#ea4335',
    category: 'Google',
    notificationCount: 9
  },
  {
    id: 'calendar',
    name: 'Calendar',
    packageName: 'com.google.android.calendar',
    iconName: 'Calendar',
    defaultBg: '#1a73e8',
    defaultColor: '#ffffff',
    category: 'Productivity'
  },
  {
    id: 'contacts',
    name: 'Contacts',
    packageName: 'com.google.android.contacts',
    iconName: 'Users',
    defaultBg: '#1e88e5',
    defaultColor: '#ffffff',
    category: 'Social & Comms'
  },
  {
    id: 'recorder',
    name: 'Recorder',
    packageName: 'com.google.android.apps.recorder',
    iconName: 'Mic',
    defaultBg: '#d93025',
    defaultColor: '#ffffff',
    category: 'Tools'
  },
  {
    id: 'wallet',
    name: 'Wallet',
    packageName: 'com.google.android.apps.walletnfcrel',
    iconName: 'CreditCard',
    defaultBg: '#202124',
    defaultColor: '#8ab4f8',
    category: 'Productivity'
  },
  {
    id: 'health',
    name: 'Health Connect',
    packageName: 'com.google.android.apps.fitness',
    iconName: 'Heart',
    defaultBg: '#ea4335',
    defaultColor: '#ffffff',
    category: 'Productivity'
  },
  {
    id: 'wallpaper-style',
    name: 'Wallpaper & style',
    packageName: 'com.google.android.apps.wallpaper',
    iconName: 'Palette',
    defaultBg: '#137333',
    defaultColor: '#ffffff',
    category: 'Tools'
  },
  {
    id: 'terminal',
    name: 'Terminal',
    packageName: 'com.android.terminal',
    iconName: 'Terminal',
    defaultBg: '#121212',
    defaultColor: '#00ff66',
    category: 'Tools'
  },
  {
    id: 'drive',
    name: 'Drive',
    packageName: 'com.google.android.apps.docs',
    iconName: 'HardDrive',
    defaultBg: '#34a853',
    defaultColor: '#ffffff',
    category: 'Google'
  }
];

export const ICON_PACKS: IconPack[] = [
  {
    id: 'pixel-pure',
    name: 'Pixel Pure (Default)',
    description: 'Authentic Material You adaptive vector iconography matching Stock Android.',
    author: 'Aether Team',
    iconCount: 24,
    previewIcons: ['Phone', 'MessageSquare', 'Camera', 'Clock']
  },
  {
    id: 'minimalist-linea',
    name: 'Minimalist Linea',
    description: 'Ultra-thin, architectural outline glyphs on subtle glass surfaces.',
    author: 'Studio Mono',
    iconCount: 24,
    previewIcons: ['Globe', 'Music', 'Mail', 'Settings']
  },
  {
    id: 'neon-aurora',
    name: 'Neon Aurora',
    description: 'Vibrant neon luminescence with contrasting cyber dark backplates.',
    author: 'CyberLabs',
    iconCount: 24,
    previewIcons: ['Play', 'Calculator', 'CloudSun', 'Terminal']
  },
  {
    id: 'papercraft-flat',
    name: 'Papercraft Flat',
    description: 'Layered papercraft tactile style with soft directional drop shadows.',
    author: 'Origami Studio',
    iconCount: 24,
    previewIcons: ['Folder', 'Calendar', 'Heart', 'Palette']
  },
  {
    id: 'retro-90s',
    name: 'Retro 90s OS',
    description: 'Chunky nostalgic 8-bit and early GUI icon designs with pixel flair.',
    author: 'BitStream Arcade',
    iconCount: 24,
    previewIcons: ['HardDrive', 'Users', 'FileText', 'CreditCard']
  }
];

export const DEFAULT_LAUNCHER_SETTINGS: LauncherSettings = {
  wallpaper: WALLPAPERS[0],
  palette: COLOR_PALETTES[0],
  themeMode: 'dark',
  iconShape: 'scallop',
  iconStyle: 'themed',
  iconScale: 1.0,
  showLabels: true,
  activeIconPackId: 'pixel-pure',
  gridDensity: '4x5',
  navigationType: 'gestures',
  deviceFrame: true,
  widgets: [
    {
      id: 'w-glance',
      type: 'clock-pixel-glance',
      title: 'At a Glance',
      size: '4x1'
    },
    {
      id: 'w-clock',
      type: 'clock-analog-scalloped',
      title: 'Material You Clock',
      size: '2x2'
    },
    {
      id: 'w-weather',
      type: 'weather-forecast',
      title: 'Weather',
      size: '2x2'
    },
    {
      id: 'w-search',
      type: 'google-search',
      title: 'Search Bar',
      size: '4x1'
    }
  ],
  homeScreenAppIds: [
    'camera',
    'photos',
    'settings',
    'spotify',
    'keep',
    'calculator',
    'calendar',
    'wallpaper-style'
  ],
  dockAppIds: [
    'phone',
    'messages',
    'chrome',
    'camera',
    'playstore'
  ]
};

export const PRESET_THEMES = [
  {
    id: 'pixel-material-you',
    name: 'Pixel Material You',
    description: 'Classic Android 14/15 botanical look with scalloped themed icons.',
    wallpaper: WALLPAPERS[0],
    palette: COLOR_PALETTES[0],
    themeMode: 'dark' as const,
    iconShape: 'scallop' as const,
    iconStyle: 'themed' as const
  },
  {
    id: 'warm-terracotta-sunset',
    name: 'Warm Sunset Dunes',
    description: 'Golden hour sand dunes with warm pebble-shaped amber icons.',
    wallpaper: WALLPAPERS[1],
    palette: COLOR_PALETTES[1],
    themeMode: 'light' as const,
    iconShape: 'pebble' as const,
    iconStyle: 'themed' as const
  },
  {
    id: 'midnight-stealth',
    name: 'Obsidian AMOLED',
    description: 'Deep black organic architecture with glowing cobalt squircle icons.',
    wallpaper: WALLPAPERS[2],
    palette: COLOR_PALETTES[2],
    themeMode: 'dark' as const,
    iconShape: 'squircle' as const,
    iconStyle: 'dark' as const
  },
  {
    id: 'minimalist-mono',
    name: 'Minimalist Linea',
    description: 'Monochrome slate gradients with ultra-crisp outline icons and circle masks.',
    wallpaper: WALLPAPERS[6],
    palette: COLOR_PALETTES[4],
    themeMode: 'dark' as const,
    iconShape: 'circle' as const,
    iconStyle: 'minimal' as const
  },
  {
    id: 'playful-candy',
    name: 'Playful Meadow',
    description: 'Vibrant citron tones with rounded-square colorful original badges.',
    wallpaper: WALLPAPERS[4],
    palette: COLOR_PALETTES[5],
    themeMode: 'light' as const,
    iconShape: 'rounded-square' as const,
    iconStyle: 'vibrant' as const
  },
  {
    id: 'cyber-future',
    name: 'Cyber Violet 2077',
    description: 'Twilight horizon, neon glow style, and faceted hexagonal geometry.',
    wallpaper: WALLPAPERS[3],
    palette: COLOR_PALETTES[3],
    themeMode: 'dark' as const,
    iconShape: 'hexagon' as const,
    iconStyle: 'metallic' as const
  }
];
