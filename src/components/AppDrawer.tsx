import React, { useState, useMemo } from 'react';
import { AppItem, ColorPalette, IconShape, IconStyle } from '../types/launcher';
import { IconRenderer } from './IconRenderer';
import { Search, X, ChevronDown, PlusCircle } from 'lucide-react';

interface AppDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  apps: AppItem[];
  shape: IconShape;
  style: IconStyle;
  palette: ColorPalette;
  iconPackId: string;
  onLaunchApp: (appId: string) => void;
  onAddToHomeScreen: (appId: string) => void;
  homeScreenAppIds: string[];
}

export const AppDrawer: React.FC<AppDrawerProps> = ({
  isOpen,
  onClose,
  apps,
  shape,
  style,
  palette,
  iconPackId,
  onLaunchApp,
  onAddToHomeScreen,
  homeScreenAppIds
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Google', 'Productivity', 'Social & Comms', 'Media', 'Tools'];

  const filteredApps = useMemo(() => {
    return apps.filter(app => {
      const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            app.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || app.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [apps, searchQuery, selectedCategory]);

  if (!isOpen) return null;

  return (
    <div 
      className="absolute inset-0 z-40 flex flex-col bg-slate-900/90 text-white backdrop-blur-2xl animate-in slide-in-from-bottom-full duration-200 overflow-hidden"
    >
      {/* Drawer Header & Grab Bar */}
      <div className="pt-3 pb-2 px-6 flex flex-col items-center border-b border-white/10 shrink-0">
        <button 
          onClick={onClose}
          className="w-12 h-1.5 rounded-full bg-white/30 hover:bg-white/60 transition-colors mb-3 cursor-pointer"
        />

        {/* Search Bar */}
        <div className="w-full relative flex items-center">
          <Search size={18} className="absolute left-3.5 text-white/50" />
          <input 
            type="text"
            placeholder="Search apps..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full py-2.5 pl-10 pr-9 bg-white/10 border border-white/10 rounded-full text-sm text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
            autoFocus
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3 p-1 rounded-full text-white/50 hover:text-white"
            >
              <X size={15} />
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="w-full flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className="px-3 py-1 text-xs font-medium rounded-full whitespace-nowrap transition-colors"
              style={{
                backgroundColor: selectedCategory === cat ? palette.primary : 'rgba(255,255,255,0.1)',
                color: selectedCategory === cat ? '#ffffff' : 'rgba(255,255,255,0.7)'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Apps Grid */}
      <div className="flex-1 overflow-y-auto p-4 no-scrollbar">
        {filteredApps.length === 0 ? (
          <div className="h-48 flex flex-col items-center justify-center text-center text-white/60">
            <p className="text-sm">No apps match "{searchQuery}"</p>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-y-5 gap-x-2">
            {filteredApps.map((app) => {
              const isPinnedOnHome = homeScreenAppIds.includes(app.id);

              return (
                <div 
                  key={app.id}
                  className="flex flex-col items-center group relative cursor-pointer"
                  onClick={() => {
                    onClose();
                    onLaunchApp(app.id);
                  }}
                >
                  <IconRenderer 
                    app={app}
                    shape={shape}
                    style={style}
                    palette={palette}
                    iconPackId={iconPackId}
                    size={48}
                  />
                  <span className="text-[11px] font-medium text-white/90 mt-1.5 text-center truncate max-w-[68px]">
                    {app.name}
                  </span>

                  {/* Add to home screen shortcut trigger */}
                  {!isPinnedOnHome && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToHomeScreen(app.id);
                      }}
                      className="opacity-0 group-hover:opacity-100 absolute -top-1 -right-1 p-0.5 bg-emerald-600 rounded-full text-white shadow-md transition-opacity"
                      title="Add to Home Screen"
                    >
                      <PlusCircle size={14} />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Bottom Dismiss Chevron */}
      <div className="p-2 border-t border-white/10 flex justify-center shrink-0">
        <button 
          onClick={onClose}
          className="flex items-center gap-1 text-xs text-white/60 hover:text-white transition-colors"
        >
          <ChevronDown size={16} /> Close drawer
        </button>
      </div>
    </div>
  );
};
