import React from 'react';
import { 
  Phone, 
  MessageSquare, 
  Globe, 
  Camera, 
  Image as ImageIcon, 
  Settings, 
  Music, 
  Play, 
  MapPin, 
  Clock, 
  CloudSun, 
  Folder, 
  FileText, 
  Calculator, 
  ShoppingBag, 
  Mail, 
  Calendar, 
  Users, 
  Mic, 
  CreditCard, 
  Heart, 
  Palette, 
  Terminal, 
  HardDrive,
  LucideIcon
} from 'lucide-react';
import { AppItem, ColorPalette, IconShape, IconStyle } from '../types/launcher';

interface IconRendererProps {
  app: AppItem;
  shape: IconShape;
  style: IconStyle;
  palette: ColorPalette;
  iconPackId?: string;
  size?: number;
  showBadge?: boolean;
}

const ICON_MAP: Record<string, LucideIcon> = {
  Phone,
  MessageSquare,
  Globe,
  Camera,
  Image: ImageIcon,
  Settings,
  Music,
  Play,
  MapPin,
  Clock,
  CloudSun,
  Folder,
  FileText,
  Calculator,
  ShoppingBag,
  Mail,
  Calendar,
  Users,
  Mic,
  CreditCard,
  Heart,
  Palette,
  Terminal,
  HardDrive
};

export const IconRenderer: React.FC<IconRendererProps> = ({
  app,
  shape,
  style,
  palette,
  iconPackId = 'pixel-pure',
  size = 52,
  showBadge = true
}) => {
  const IconComponent = ICON_MAP[app.iconName] || Globe;
  const glyphSize = Math.round(size * 0.52);

  // Determine shape class
  const shapeClass = (() => {
    switch (shape) {
      case 'circle': return 'shape-circle';
      case 'squircle': return 'shape-squircle';
      case 'rounded-square': return 'shape-rounded-square';
      case 'teardrop': return 'shape-teardrop';
      case 'pebble': return 'shape-pebble';
      case 'scallop': return 'shape-scallop';
      case 'hexagon': return 'shape-hexagon';
      case 'cylinder': return 'shape-cylinder';
      default: return 'shape-squircle';
    }
  })();

  // Determine styling based on icon pack override or style choice
  const isMinimalPack = iconPackId === 'minimalist-linea' || style === 'minimal';
  const isNeonPack = iconPackId === 'neon-aurora';
  const isPaperPack = iconPackId === 'papercraft-flat';
  const isRetroPack = iconPackId === 'retro-90s' || style === 'retro';

  // Compute container styles and glyph colors
  let containerStyle: React.CSSProperties = {};
  let glyphColor = '#ffffff';
  let strokeWidth = 2.0;

  if (isRetroPack) {
    containerStyle = {
      background: app.defaultBg,
      border: '2px solid #000000',
      boxShadow: '3px 3px 0px #000000',
      imageRendering: 'pixelated'
    };
    glyphColor = app.defaultColor;
    strokeWidth = 2.4;
  } else if (isNeonPack) {
    containerStyle = {
      background: 'linear-gradient(145deg, #09090b 0%, #18181b 100%)',
      border: `1.5px solid ${palette.secondary}`,
      boxShadow: `0 0 12px ${palette.secondary}44, inset 0 0 8px ${palette.primary}33`
    };
    glyphColor = palette.secondary;
    strokeWidth = 2.2;
  } else if (isMinimalPack) {
    containerStyle = {
      background: 'rgba(255, 255, 255, 0.12)',
      backdropFilter: 'blur(8px)',
      border: '1px solid rgba(255, 255, 255, 0.25)',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
    };
    glyphColor = '#ffffff';
    strokeWidth = 1.6;
  } else if (isPaperPack) {
    containerStyle = {
      background: app.defaultBg,
      boxShadow: '0 8px 16px -4px rgba(0,0,0,0.25), inset 0 2px 2px rgba(255,255,255,0.4)',
      border: '1px solid rgba(255,255,255,0.15)'
    };
    glyphColor = app.defaultColor;
    strokeWidth = 2.1;
  } else {
    // Standard icon styles
    switch (style) {
      case 'themed':
        // Material You Themed Icon: tonal background tinted with palette primary/container, with monochrome primary glyph
        containerStyle = {
          backgroundColor: palette.surfaceContainer,
          boxShadow: '0 3px 10px rgba(0, 0, 0, 0.12)'
        };
        glyphColor = palette.primary;
        break;

      case 'vibrant':
        // Stock full-colored authentic app icons
        containerStyle = {
          backgroundColor: app.defaultBg,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.18)'
        };
        glyphColor = app.defaultColor;
        break;

      case 'dark':
        // Deep obsidian container with glowing accent
        containerStyle = {
          background: 'linear-gradient(135deg, #1c1c1e 0%, #0c0c0e 100%)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          boxShadow: `0 4px 14px rgba(0,0,0,0.4), inset 0 1px 1px rgba(255,255,255,0.1)`
        };
        glyphColor = palette.accent;
        strokeWidth = 2.1;
        break;

      case 'pastel':
        containerStyle = {
          backgroundColor: `${app.defaultBg}33`,
          border: `1.5px solid ${app.defaultBg}66`,
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
        };
        glyphColor = app.defaultBg === '#ffffff' ? palette.primary : app.defaultBg;
        break;

      case 'metallic':
        containerStyle = {
          background: 'linear-gradient(135deg, #71717a 0%, #3f3f46 50%, #18181b 100%)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3), inset 0 1px 2px rgba(255,255,255,0.3)'
        };
        glyphColor = '#f4f4f5';
        strokeWidth = 1.9;
        break;

      default:
        containerStyle = {
          backgroundColor: palette.surfaceContainer
        };
        glyphColor = palette.primary;
    }
  }

  return (
    <div className="relative inline-flex items-center justify-center select-none" style={{ width: size, height: size }}>
      <div
        className={`w-full h-full flex items-center justify-center transition-all duration-200 cursor-pointer ${shapeClass}`}
        style={containerStyle}
      >
        <IconComponent 
          size={glyphSize} 
          color={glyphColor} 
          strokeWidth={strokeWidth} 
          className="transition-transform duration-150 active:scale-90"
        />
      </div>

      {/* Notification Count Badge */}
      {showBadge && app.notificationCount && app.notificationCount > 0 ? (
        <span 
          className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 flex items-center justify-center text-[10px] font-bold text-white rounded-full border-2 border-white/20 shadow-sm"
          style={{ backgroundColor: palette.accent || '#ef4444' }}
        >
          {app.notificationCount > 9 ? '9+' : app.notificationCount}
        </span>
      ) : null}
    </div>
  );
};
