import React, { useState, useEffect } from 'react';
import { AppItem, ColorPalette } from '../types/launcher';
import { 
  X, 
  Play, 
  Pause, 
  RotateCcw, 
  Plus, 
  Trash2, 
  Camera, 
  Search, 
  Volume2, 
  Phone, 
  Delete,
  CloudSun,
  Wind,
  Droplets,
  Eye,
  CheckCircle2,
  Sliders
} from 'lucide-react';
import { useCurrentTime } from './widgets/useCurrentTime';

interface InteractiveAppModalProps {
  app: AppItem | null;
  onClose: () => void;
  palette: ColorPalette;
  onOpenWallpaperStyle?: () => void;
}

export const InteractiveAppModal: React.FC<InteractiveAppModalProps> = ({
  app,
  onClose,
  palette,
  onOpenWallpaperStyle
}) => {
  const time = useCurrentTime();

  // Calculator State
  const [calcInput, setCalcInput] = useState('0');
  const [calcPrev, setCalcPrev] = useState('');
  const [calcOp, setCalcOp] = useState<string | null>(null);

  // Stopwatch State
  const [stopwatchRunning, setStopwatchRunning] = useState(false);
  const [stopwatchTime, setStopwatchTime] = useState(0);
  const [stopwatchLaps, setStopwatchLaps] = useState<number[]>([]);

  useEffect(() => {
    let interval: any;
    if (stopwatchRunning) {
      interval = setInterval(() => {
        setStopwatchTime(prev => prev + 10);
      }, 10);
    }
    return () => clearInterval(interval);
  }, [stopwatchRunning]);

  // Notes State
  const [notes, setNotes] = useState([
    { id: 1, title: 'Android Skin Personalization Ideas', content: 'Explore 8-petal scalloped icons, custom icon pack imports, and split-flap retro clock widgets.' },
    { id: 2, title: 'Meeting with UI Design Guild', content: 'Present Material You dynamic tonal palettes and widget sizing standards.' }
  ]);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');

  // Dialer State
  const [dialerNumber, setDialerNumber] = useState('');
  const [callActive, setCallActive] = useState(false);

  // Camera State
  const [shutterFlash, setShutterFlash] = useState(false);
  const [capturedPhotos, setCapturedPhotos] = useState<string[]>([]);

  if (!app) return null;

  // Render App Contents based on app ID
  const renderContent = () => {
    switch (app.id) {
      case 'calculator': {
        const handleNum = (n: string) => {
          setCalcInput(prev => (prev === '0' ? n : prev + n));
        };
        const handleOp = (op: string) => {
          setCalcPrev(calcInput);
          setCalcInput('0');
          setCalcOp(op);
        };
        const handleEqual = () => {
          if (!calcOp || !calcPrev) return;
          const a = parseFloat(calcPrev);
          const b = parseFloat(calcInput);
          let res = 0;
          if (calcOp === '+') res = a + b;
          if (calcOp === '-') res = a - b;
          if (calcOp === '×') res = a * b;
          if (calcOp === '÷') res = b !== 0 ? a / b : 0;
          setCalcInput(res.toString());
          setCalcPrev('');
          setCalcOp(null);
        };
        const handleClear = () => {
          setCalcInput('0');
          setCalcPrev('');
          setCalcOp(null);
        };

        return (
          <div className="flex-1 flex flex-col justify-between p-4 bg-slate-950 text-white">
            <div className="text-right py-6">
              <div className="text-sm text-slate-500 font-mono h-6">{calcPrev} {calcOp}</div>
              <div className="text-4xl sm:text-5xl font-mono font-bold tracking-tight text-white">{calcInput}</div>
            </div>

            <div className="grid grid-cols-4 gap-2.5">
              <button onClick={handleClear} className="h-14 rounded-2xl bg-slate-800 text-rose-400 font-bold text-lg active:scale-95">AC</button>
              <button onClick={() => setCalcInput(prev => (parseFloat(prev) * -1).toString())} className="h-14 rounded-2xl bg-slate-800 text-slate-300 font-bold text-lg active:scale-95">±</button>
              <button onClick={() => setCalcInput(prev => (parseFloat(prev) / 100).toString())} className="h-14 rounded-2xl bg-slate-800 text-slate-300 font-bold text-lg active:scale-95">%</button>
              <button onClick={() => handleOp('÷')} className="h-14 rounded-2xl bg-indigo-600 text-white font-bold text-xl active:scale-95">÷</button>

              {['7', '8', '9'].map(n => (
                <button key={n} onClick={() => handleNum(n)} className="h-14 rounded-2xl bg-slate-900 text-white font-bold text-xl active:scale-95">{n}</button>
              ))}
              <button onClick={() => handleOp('×')} className="h-14 rounded-2xl bg-indigo-600 text-white font-bold text-xl active:scale-95">×</button>

              {['4', '5', '6'].map(n => (
                <button key={n} onClick={() => handleNum(n)} className="h-14 rounded-2xl bg-slate-900 text-white font-bold text-xl active:scale-95">{n}</button>
              ))}
              <button onClick={() => handleOp('-')} className="h-14 rounded-2xl bg-indigo-600 text-white font-bold text-xl active:scale-95">-</button>

              {['1', '2', '3'].map(n => (
                <button key={n} onClick={() => handleNum(n)} className="h-14 rounded-2xl bg-slate-900 text-white font-bold text-xl active:scale-95">{n}</button>
              ))}
              <button onClick={() => handleOp('+')} className="h-14 rounded-2xl bg-indigo-600 text-white font-bold text-xl active:scale-95">+</button>

              <button onClick={() => handleNum('0')} className="col-span-2 h-14 rounded-2xl bg-slate-900 text-white font-bold text-xl active:scale-95">0</button>
              <button onClick={() => !calcInput.includes('.') && handleNum('.')} className="h-14 rounded-2xl bg-slate-900 text-white font-bold text-xl active:scale-95">.</button>
              <button onClick={handleEqual} className="h-14 rounded-2xl bg-emerald-600 text-white font-bold text-xl active:scale-95">=</button>
            </div>
          </div>
        );
      }

      case 'clock': {
        const formatMs = (ms: number) => {
          const m = Math.floor(ms / 60000);
          const s = Math.floor((ms % 60000) / 1000);
          const centis = Math.floor((ms % 1000) / 10);
          return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}.${centis.toString().padStart(2, '0')}`;
        };

        return (
          <div className="flex-1 flex flex-col justify-between p-6 bg-slate-950 text-white">
            <div className="text-center space-y-2">
              <span className="text-xs uppercase font-mono tracking-widest text-slate-500">Stopwatch</span>
              <div className="font-mono text-5xl font-black tracking-tight" style={{ color: palette.secondary }}>
                {formatMs(stopwatchTime)}
              </div>
            </div>

            {/* Laps List */}
            <div className="flex-1 overflow-y-auto my-4 max-h-48 no-scrollbar space-y-1.5">
              {stopwatchLaps.map((lap, index) => (
                <div key={index} className="flex items-center justify-between px-4 py-2 rounded-xl bg-slate-900 text-xs font-mono">
                  <span className="text-slate-400">Lap {stopwatchLaps.length - index}</span>
                  <span className="font-bold text-white">{formatMs(lap)}</span>
                </div>
              ))}
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4 pt-4 border-t border-slate-900">
              <button
                onClick={() => {
                  if (stopwatchRunning) {
                    setStopwatchLaps([stopwatchTime, ...stopwatchLaps]);
                  } else {
                    setStopwatchTime(0);
                    setStopwatchLaps([]);
                  }
                }}
                className="w-14 h-14 rounded-full bg-slate-800 text-slate-200 flex items-center justify-center text-xs font-semibold active:scale-95"
              >
                {stopwatchRunning ? 'Lap' : <RotateCcw size={18} />}
              </button>

              <button
                onClick={() => setStopwatchRunning(!stopwatchRunning)}
                className="w-16 h-16 rounded-full flex items-center justify-center text-white shadow-lg active:scale-95"
                style={{ backgroundColor: stopwatchRunning ? '#ef4444' : palette.primary }}
              >
                {stopwatchRunning ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
              </button>
            </div>
          </div>
        );
      }

      case 'weather': {
        return (
          <div className="flex-1 p-6 bg-gradient-to-b from-sky-900 to-slate-950 text-white overflow-y-auto no-scrollbar space-y-6">
            <div className="text-center space-y-1">
              <h2 className="text-xl font-bold">San Francisco, CA</h2>
              <div className="text-6xl font-light tracking-tight mt-2">72°</div>
              <p className="text-sm text-sky-200">Mostly Sunny · High 75° / Low 58°</p>
            </div>

            {/* Hourly strip */}
            <div className="p-4 rounded-3xl bg-white/10 backdrop-blur-md border border-white/10">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-white/70 mb-3">Hourly Forecast</h4>
              <div className="flex items-center justify-between text-xs">
                {['Now', '12 PM', '2 PM', '4 PM', '6 PM'].map((h, i) => (
                  <div key={h} className="flex flex-col items-center gap-1.5">
                    <span className="opacity-70 text-[11px]">{h}</span>
                    <CloudSun size={20} className="text-amber-300" />
                    <span className="font-bold">{72 + i}°</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Weather Details Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-3">
                <Wind size={20} className="text-sky-300" />
                <div>
                  <span className="opacity-60 block">Wind Speed</span>
                  <span className="font-bold text-sm">9 mph NW</span>
                </div>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-3">
                <Droplets size={20} className="text-sky-300" />
                <div>
                  <span className="opacity-60 block">Humidity</span>
                  <span className="font-bold text-sm">48%</span>
                </div>
              </div>
            </div>
          </div>
        );
      }

      case 'camera': {
        const handleSnap = () => {
          setShutterFlash(true);
          setTimeout(() => setShutterFlash(false), 150);
          setCapturedPhotos(prev => [`Photo #${prev.length + 1}`, ...prev]);
        };

        return (
          <div className="flex-1 relative flex flex-col justify-between bg-black text-white overflow-hidden">
            {/* Viewfinder Sim */}
            <div className="flex-1 relative flex items-center justify-center bg-zinc-900">
              {shutterFlash && <div className="absolute inset-0 bg-white z-30" />}
              
              <div className="w-64 h-64 border border-white/20 rounded-3xl flex items-center justify-center relative">
                <div className="w-8 h-8 border-t-2 border-l-2 border-white absolute top-4 left-4" />
                <div className="w-8 h-8 border-t-2 border-r-2 border-white absolute top-4 right-4" />
                <div className="w-8 h-8 border-b-2 border-l-2 border-white absolute bottom-4 left-4" />
                <div className="w-8 h-8 border-b-2 border-r-2 border-white absolute bottom-4 right-4" />
                <span className="text-xs text-white/50 font-mono">Pixel Viewfinder · 1x</span>
              </div>
            </div>

            {/* Bottom Shutter Controls */}
            <div className="h-28 px-8 bg-black flex items-center justify-between border-t border-zinc-800 shrink-0">
              <div className="w-12 h-12 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-xs text-zinc-400">
                {capturedPhotos.length > 0 ? capturedPhotos.length : '0'}
              </div>

              {/* Shutter Button */}
              <button
                onClick={handleSnap}
                className="w-18 h-18 rounded-full border-4 border-white flex items-center justify-center active:scale-90 transition-transform"
              >
                <div className="w-14 h-14 rounded-full bg-white shadow-md" />
              </button>

              <div className="w-12" />
            </div>
          </div>
        );
      }

      case 'keep': {
        const handleAddNote = () => {
          if (!newNoteTitle.trim()) return;
          setNotes([
            { id: Date.now(), title: newNoteTitle.trim(), content: newNoteContent.trim() || 'No description' },
            ...notes
          ]);
          setNewNoteTitle('');
          setNewNoteContent('');
        };

        return (
          <div className="flex-1 p-5 bg-slate-950 text-white flex flex-col overflow-y-auto no-scrollbar space-y-4">
            {/* Add note card */}
            <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <input 
                type="text"
                placeholder="Title..."
                value={newNoteTitle}
                onChange={e => setNewNoteTitle(e.target.value)}
                className="w-full bg-transparent text-sm font-bold text-white placeholder-slate-500 focus:outline-none"
              />
              <textarea 
                placeholder="Take a note..."
                value={newNoteContent}
                onChange={e => setNewNoteContent(e.target.value)}
                rows={2}
                className="w-full bg-transparent text-xs text-slate-300 placeholder-slate-600 focus:outline-none resize-none"
              />
              <div className="flex justify-end">
                <button
                  onClick={handleAddNote}
                  disabled={!newNoteTitle.trim()}
                  className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-xs font-semibold text-white transition-colors"
                >
                  Save Note
                </button>
              </div>
            </div>

            {/* Notes List */}
            <div className="space-y-3">
              {notes.map(note => (
                <div key={note.id} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1 relative group">
                  <h4 className="text-sm font-bold text-white">{note.title}</h4>
                  <p className="text-xs text-slate-400">{note.content}</p>
                  <button 
                    onClick={() => setNotes(notes.filter(n => n.id !== note.id))}
                    className="opacity-0 group-hover:opacity-100 absolute top-3 right-3 text-rose-400 p-1"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      }

      case 'phone': {
        return (
          <div className="flex-1 flex flex-col justify-between p-6 bg-slate-950 text-white">
            <div className="text-center py-4">
              <span className="text-xs text-slate-500 font-mono tracking-wider">DIALPAD</span>
              <div className="text-3xl font-mono font-bold tracking-widest text-white mt-1 h-10 truncate">
                {dialerNumber || 'Enter number'}
              </div>
            </div>

            {/* Keypad */}
            <div className="grid grid-cols-3 gap-3 max-w-[280px] mx-auto w-full">
              {[
                { k: '1', sub: '' }, { k: '2', sub: 'ABC' }, { k: '3', sub: 'DEF' },
                { k: '4', sub: 'GHI' }, { k: '5', sub: 'JKL' }, { k: '6', sub: 'MNO' },
                { k: '7', sub: 'PQRS' }, { k: '8', sub: 'TUV' }, { k: '9', sub: 'WXYZ' },
                { k: '*', sub: '' }, { k: '0', sub: '+' }, { k: '#', sub: '' }
              ].map(item => (
                <button
                  key={item.k}
                  onClick={() => setDialerNumber(prev => prev + item.k)}
                  className="h-14 rounded-full bg-slate-900 hover:bg-slate-800 text-white flex flex-col items-center justify-center active:scale-95 transition-all"
                >
                  <span className="text-lg font-bold leading-tight">{item.k}</span>
                  {item.sub && <span className="text-[9px] text-slate-400 tracking-widest leading-none">{item.sub}</span>}
                </button>
              ))}
            </div>

            {/* Call / Delete Actions */}
            <div className="flex items-center justify-center gap-6 pt-4">
              <button
                onClick={() => setDialerNumber('')}
                className="w-12 h-12 rounded-full text-slate-400 hover:text-white flex items-center justify-center active:scale-95"
              >
                <Delete size={20} />
              </button>

              <button
                onClick={() => setCallActive(!callActive)}
                className={`w-16 h-16 rounded-full flex items-center justify-center text-white shadow-lg active:scale-95 transition-all ${
                  callActive ? 'bg-rose-600' : 'bg-emerald-600'
                }`}
              >
                <Phone size={24} />
              </button>

              <div className="w-12" />
            </div>
          </div>
        );
      }

      default: {
        return (
          <div className="flex-1 p-6 flex flex-col items-center justify-center text-center bg-slate-950 text-white space-y-4">
            <div 
              className="w-16 h-16 rounded-3xl flex items-center justify-center text-white shadow-lg"
              style={{ backgroundColor: palette.primary }}
            >
              <CheckCircle2 size={32} />
            </div>
            <div>
              <h3 className="text-lg font-bold">{app.name}</h3>
              <p className="text-xs text-slate-400 max-w-xs mt-1">
                Package: {app.packageName}
              </p>
            </div>
            <p className="text-xs text-slate-500 max-w-xs">
              This interactive application is active in your customized Android skin environment.
            </p>
            {app.id === 'wallpaper-style' && (
              <button
                onClick={() => {
                  onClose();
                  onOpenWallpaperStyle?.();
                }}
                className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold shadow-md active:scale-95 transition-all"
              >
                Open Personalization Studio
              </button>
            )}
          </div>
        );
      }
    }
  };

  return (
    <div className="absolute inset-0 z-50 flex flex-col bg-slate-950 text-white animate-in zoom-in-95 duration-150 overflow-hidden">
      {/* App Top Bar */}
      <div className="pt-8 px-5 pb-3 flex items-center justify-between border-b border-slate-800 bg-slate-900/80 backdrop-blur-md shrink-0">
        <div className="flex items-center gap-2.5">
          <div 
            className="w-7 h-7 rounded-lg flex items-center justify-center text-white"
            style={{ backgroundColor: palette.primary }}
          >
            <span className="text-xs font-bold">{app.name[0]}</span>
          </div>
          <span className="text-sm font-bold text-white">{app.name}</span>
        </div>

        <button 
          onClick={onClose}
          className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
        >
          <X size={16} />
        </button>
      </div>

      {/* App Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {renderContent()}
      </div>
    </div>
  );
};
