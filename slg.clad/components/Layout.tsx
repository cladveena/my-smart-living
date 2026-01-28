
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { NAVIGATION_ITEMS, getIcon } from '../constants';
import { Leaf, Menu, X, ChevronRight, ShieldAlert, Info, ArrowLeft } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname.substring(1) || 'home';
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  const isNavItemActive = (itemId: string) => {
    if (itemId === 'home') return currentPath === 'home';
    return currentPath === itemId || currentPath.startsWith(`${itemId}/`);
  };

  const isHome = location.pathname === '/' || location.pathname === '';

  const handleBack = () => {
    // If we are at the home page or at the start of the history stack
    if (isHome || window.history.length <= 1) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-['Inter']">
      <nav className="sticky top-0 z-[100] bg-white/95 backdrop-blur-xl border-b border-slate-200/60 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center gap-6">
              {!isHome && (
                <button 
                  onClick={handleBack}
                  className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl transition-all flex items-center gap-2 group"
                  aria-label="Go back"
                >
                  <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                </button>
              )}
              <Link to="/" className="flex items-center gap-3 group transition-transform hover:scale-[1.01]">
                <div className="p-2.5 bg-emerald-600 rounded-2xl text-white shadow-lg shadow-emerald-100 ring-4 ring-emerald-500/5">
                  <Leaf size={24} strokeWidth={2.5} />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-black text-slate-900 tracking-tighter leading-none">SMART LIVING</span>
                  <span className="text-[9px] font-black uppercase tracking-[0.3em] text-emerald-600">The Guide</span>
                </div>
              </Link>
            </div>
            
            <div className="hidden xl:flex items-center gap-1">
              {NAVIGATION_ITEMS.map((item) => {
                const isActive = isNavItemActive(item.id);
                return (
                  <Link
                    key={item.id}
                    to={`/${item.id === 'home' ? '' : item.id}`}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-[12px] font-bold transition-all ${
                      isActive
                        ? 'bg-slate-900 text-white shadow-md'
                        : 'text-slate-500 hover:text-emerald-600 hover:bg-emerald-50'
                    }`}
                  >
                    <span className={isActive ? 'text-emerald-400' : 'text-slate-400'}>{getIcon(item.icon, 16)}</span>
                    <span className="uppercase tracking-widest">{item.label}</span>
                  </Link>
                );
              })}
            </div>

            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="xl:hidden p-3 text-slate-600 hover:bg-slate-100 rounded-2xl transition-all"
            >
              {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </nav>

      <div 
        className={`fixed inset-0 z-[90] bg-slate-900/20 backdrop-blur-sm transition-opacity duration-300 xl:hidden ${
          isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      <aside 
        className={`fixed top-0 right-0 z-[95] w-[300px] h-full bg-white shadow-2xl transition-transform duration-500 xl:hidden ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="p-8 border-b border-slate-100 flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Main Menu</span>
            <button onClick={() => setIsMenuOpen(false)} className="p-2 text-slate-400">
              <X size={20} />
            </button>
          </div>
          
          <div className="flex-grow overflow-y-auto p-6 space-y-2">
            {NAVIGATION_ITEMS.map((item) => {
              const isActive = isNavItemActive(item.id);
              return (
                <Link
                  key={item.id}
                  to={`/${item.id === 'home' ? '' : item.id}`}
                  className={`flex items-center justify-between p-4 rounded-2xl transition-all ${
                    isActive ? 'bg-emerald-50 text-emerald-700' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={isActive ? 'text-emerald-600' : 'text-slate-400'}>{getIcon(item.icon, 20)}</div>
                    <span className="text-[13px] font-black uppercase tracking-widest">{item.label}</span>
                  </div>
                  <ChevronRight size={16} className={isActive ? 'text-emerald-500' : 'text-slate-300'} />
                </Link>
              );
            })}
          </div>

          <div className="p-8 border-t border-slate-100 bg-slate-50/50">
            <div className="flex flex-col gap-1 text-center">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Smart Living Guide</span>
              <span className="text-[9px] text-slate-400 font-medium italic leading-relaxed">Educational platform for holistic wellness</span>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-grow relative">{children}</main>

      <footer className="bg-slate-900 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">
            
            {/* About Us Column */}
            <div className="lg:col-span-5 space-y-8">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-emerald-500 rounded-xl text-white">
                  <Leaf size={28} />
                </div>
                <div className="flex flex-col">
                  <h3 className="text-xl font-black uppercase tracking-tighter leading-none">Smart Living</h3>
                  <span className="text-[8px] font-black uppercase tracking-[0.3em] text-emerald-400">The Guide</span>
                </div>
              </div>
              <div className="space-y-6">
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400">About Us</h4>
                <p className="text-slate-400 text-sm leading-relaxed font-medium">
                  Smart Living Guide is a professional wellness platform designed specifically for the busy modern adult. Whether you're a student in a hostel, a bachelor in a PG, or a high-performing professional, we bridge the gap between complex health science and attainable daily reality.
                </p>
                <p className="text-slate-400 text-sm leading-relaxed font-medium">
                  Our mission is to replace "wellness perfectionism" with sustainable, evidence-based shifts that fit your actual schedule and budget.
                </p>
              </div>
            </div>
            
            {/* Navigation Column */}
            <div className="lg:col-span-3">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-8 text-emerald-400 border-b border-emerald-400/20 pb-4">Quick Navigation</h4>
              <ul className="grid grid-cols-1 gap-y-4 text-[12px] font-bold text-slate-400">
                {NAVIGATION_ITEMS.map(item => (
                  <li key={item.id}>
                    <Link to={`/${item.id === 'home' ? '' : item.id}`} className="hover:text-emerald-400 transition-colors uppercase tracking-[0.2em] flex items-center gap-2 group">
                      <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Professional Disclaimer Column */}
            <div className="lg:col-span-4">
              <div className="bg-white/5 p-10 rounded-[3rem] border border-white/10 relative overflow-hidden h-full">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                   <ShieldAlert size={100} />
                </div>
                <div className="relative z-10 space-y-6">
                  <div className="flex items-center gap-3 text-rose-400">
                    <ShieldAlert size={20} />
                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em]">Medical Disclaimer</h4>
                  </div>
                  <p className="text-slate-400 text-[11px] leading-relaxed italic font-medium">
                    The information provided on Smart Living Guide is for educational and awareness purposes only. It is not intended to be a substitute for professional medical advice, diagnosis, or treatment. 
                  </p>
                  <p className="text-slate-400 text-[11px] leading-relaxed italic font-medium">
                    Always seek the guidance of your physician or other qualified health professional with any questions regarding a medical condition. Never disregard professional medical advice because of something you have read here.
                  </p>
                  <div className="pt-4 flex items-center gap-3 text-emerald-400 text-[9px] font-black uppercase tracking-widest">
                    <Info size={14} /> Knowledge for Growth
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-slate-500 text-[10px] font-black uppercase tracking-[0.4em]">
              © {new Date().getFullYear()} Smart Living Guide. Professional Wellness Protocol.
            </div>
            <div className="flex gap-6 text-[9px] font-black uppercase tracking-widest text-slate-500">
              <span className="hover:text-emerald-400 cursor-pointer transition-colors">Privacy Policy</span>
              <span className="hover:text-emerald-400 cursor-pointer transition-colors">Terms of Service</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
