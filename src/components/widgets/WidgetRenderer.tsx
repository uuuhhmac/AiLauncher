import React from 'react';
import { ColorPalette, PlacedWidget } from '../../types/launcher';
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
} from './ClockWidgets';
import { 
  WeatherWidget, 
  MediaPlayerWidget, 
  BatteryDevicesWidget, 
  QuickNotesWidget, 
  GoogleSearchWidget 
} from './SystemWidgets';
import { X } from 'lucide-react';

interface WidgetRendererProps {
  widget: PlacedWidget;
  palette: ColorPalette;
  onOpenApp?: (appId: string) => void;
  isEditing?: boolean;
  onRemove?: (id: string) => void;
}

export const WidgetRenderer: React.FC<WidgetRendererProps> = ({
  widget,
  palette,
  onOpenApp,
  isEditing = false,
  onRemove
}) => {
  const renderWidgetContent = () => {
    switch (widget.type) {
      case 'clock-analog-scalloped':
        return <AnalogScallopClock palette={palette} onOpenApp={onOpenApp} />;
      case 'clock-digital-stacked':
        return <StackedDigitalClock palette={palette} onOpenApp={onOpenApp} />;
      case 'clock-pixel-glance':
        return <PixelGlanceWidget palette={palette} onOpenApp={onOpenApp} />;
      case 'clock-retro-flip':
        return <RetroFlipClock palette={palette} onOpenApp={onOpenApp} />;
      case 'clock-world-dial':
        return <WorldClockDual palette={palette} onOpenApp={onOpenApp} />;
      case 'clock-bauhaus':
        return <BauhausClock palette={palette} onOpenApp={onOpenApp} />;
      case 'clock-typography':
        return <TypographyClock palette={palette} onOpenApp={onOpenApp} />;
      case 'clock-radial-seconds':
        return <RadialSecondsClock palette={palette} onOpenApp={onOpenApp} />;
      case 'clock-neon-cyber':
        return <NeonCyberClock palette={palette} onOpenApp={onOpenApp} />;
      case 'clock-neumorphic-glass':
        return <NeumorphicGlassClock palette={palette} onOpenApp={onOpenApp} />;
      case 'weather-forecast':
        return <WeatherWidget palette={palette} onOpenApp={onOpenApp} />;
      case 'media-player':
        return <MediaPlayerWidget palette={palette} onOpenApp={onOpenApp} />;
      case 'battery-devices':
        return <BatteryDevicesWidget palette={palette} onOpenApp={onOpenApp} />;
      case 'quick-notes':
        return <QuickNotesWidget palette={palette} onOpenApp={onOpenApp} />;
      case 'google-search':
        return <GoogleSearchWidget palette={palette} onOpenApp={onOpenApp} />;
      default:
        return <AnalogScallopClock palette={palette} onOpenApp={onOpenApp} />;
    }
  };

  // Determine span class
  const colSpanClass = (() => {
    switch (widget.size) {
      case '4x1':
      case '4x2':
        return 'col-span-4';
      case '2x1':
      case '2x2':
        return 'col-span-2';
      case '1x1':
        return 'col-span-1';
      default:
        return 'col-span-2';
    }
  })();

  const heightClass = (() => {
    switch (widget.size) {
      case '4x1':
        return 'min-h-[58px]';
      case '4x2':
      case '2x2':
        return 'min-h-[148px] h-38';
      case '2x1':
        return 'min-h-[80px] h-20';
      case '1x1':
        return 'min-h-[64px] h-16';
      default:
        return 'min-h-[140px]';
    }
  })();

  return (
    <div className={`relative ${colSpanClass} ${heightClass} flex flex-col justify-center`}>
      {renderWidgetContent()}

      {/* Edit Mode Remove Pill */}
      {isEditing && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove?.(widget.id);
          }}
          className="absolute -top-2 -right-2 z-30 w-6 h-6 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-lg hover:bg-rose-600 transition-transform active:scale-90"
          title="Remove widget"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
};
