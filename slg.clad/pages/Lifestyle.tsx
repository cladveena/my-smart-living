import React from 'react';
import LayeredContent from '../components/LayeredContent';
import { 
  Moon, Sun, Smartphone, Download, 
  Sparkles, Zap, Battery, Clock, 
  ShieldCheck, ArrowRight,
  Coffee, Brain
} from 'lucide-react';

const Lifestyle: React.FC = () => {
  const colorMap: Record<string, string> = {
    indigo: "bg-indigo-50 text-indigo-600",
    rose: "bg-rose-50 text-rose-600",
    amber: "bg-amber-50 text-amber-600",
    emerald: "bg-emerald-50 text-emerald-600"
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20 animate-in fade-in duration-700">
      {/* Hero Section */}
      <section className="bg-slate-900 pt-24 pb-32 px-4 relative overflow-hidden text-center">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-6 backdrop-blur-md">
            <Sparkles size={14} className="text-indigo-400" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400">Habit Architecture</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 uppercase tracking-tighter">
            Smart <span className="text-indigo-400">Lifestyle</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto font-medium leading-relaxed">
            Optimizing your daily protocols for peak focus, restorative rest, and a life designed for sustainable energy.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 -mt-16 relative z-20">
        {/* Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {[
            { 
              icon: Moon, 
              title: "Sleep Hygiene", 
              desc: "Deep rest protocols: zero blue light, temperature control, and dark-room rituals.", 
              color: "indigo" 
            },
            { 
              icon: Smartphone, 
              title: "Digital Balance", 
              desc: "Reducing mental friction by setting boundaries with your mobile workspace.", 
              color: "rose" 
            },
            { 
              icon: Sun, 
              title: "Circadian Sync", 
              desc: "Using early morning sunlight to calibrate your internal biological clock.", 
              color: "amber" 
            }
          ].map((pill, idx) => (
            <div key={idx} className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-slate-100 group hover:-translate-y-2 transition-all duration-500">
              <div className={`p-4 rounded-2xl w-fit mb-8 group-hover:scale-110 transition-transform ${colorMap[pill.color] || 'bg-slate-50 text-slate-600'}`}>
                <pill.icon size={28} />
              </div>
              <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-3">{pill.title}</h3>
              <p className="text-sm text-slate-500 font-medium leading-relaxed">{pill.desc}</p>
            </div>
          ))}
        </div>

        {/* Detailed Guidelines */}
        <div className="space-y-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-slate-900 text-white rounded-2xl"><Brain size={24} /></div>
            <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">Protocol Deep-Dive</h2>
          </div>

          <LayeredContent 
            title="Daily Habits for High Performance"
            simple={(
              <div className="space-y-6">
                <p className="text-slate-600 font-medium leading-relaxed">Starting small is the only way to build habits that actually stick. Focus on these three "Anchors" first:</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    "💧 300ml water immediately upon waking.",
                    "🧘 5 minutes of focused breathing mid-day.",
                    "🌅 View sunlight within 30 mins of waking."
                  ].map((tip, i) => (
                    <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 font-bold text-xs text-slate-700 flex items-center">
                      {tip}
                    </div>
                  ))}
                </div>
              </div>
            )}
            medium={(
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-8 bg-emerald-50 rounded-[2.5rem] border border-emerald-100 space-y-4">
                  <div className="flex items-center gap-3 text-emerald-600">
                    <Zap size={20} />
                    <h5 className="font-black uppercase text-xs tracking-widest">The Morning Boost</h5>
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed font-medium">Hydration -> Sunlight -> High Protein Breakfast. Avoid checking emails for the first 30 minutes to own your attention.</p>
                </div>
                <div className="p-8 bg-indigo-50 rounded-[2.5rem] border border-indigo-100 space-y-4">
                  <div className="flex items-center gap-3 text-indigo-600">
                    <Battery size={20} />
                    <h5 className="font-black uppercase text-xs tracking-widest">The Evening Wind-down</h5>
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed font-medium">Warm light -> Digital sunset 1hr before bed -> Journaling. Lower your room temperature to 18-20°C for optimal sleep.</p>
                </div>
              </div>
            )}
            detailed={(
              <div className="prose max-w-none text-slate-700 space-y-6">
                 <div className="p-8 bg-slate-900 text-white rounded-[3rem] relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none"><ShieldCheck size={200} /></div>
                    <div className="relative z-10">
                       <h4 className="text-xl font-black uppercase text-emerald-400 mb-6">The "Atomic Habit" Framework</h4>
                       <p className="text-slate-400 font-medium leading-relaxed mb-6">
                          Sustainable habits are built through <strong>Habit Stacking</strong>. Attach your new goal to a current daily ritual. 
                          <em> "After I pour my first coffee (current), I will meditate for 2 minutes (new)."</em>
                       </p>
                       <div className="p-6 bg-white/5 rounded-3xl border border-white/10 text-xs italic font-medium">
                          "Managing Cortisol: Mid-day breaks are essential. A 10-minute walk reduces stress hormones significantly more than scrolling social media, which actually increases cognitive load."
                       </div>
                    </div>
                 </div>
              </div>
            )}
          />
        </div>

        {/* Download Section */}
        <div className="mt-20 bg-emerald-900 rounded-[4rem] p-12 md:p-20 text-white flex flex-col md:flex-row items-center justify-between gap-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none"><Download size={200} /></div>
          <div className="relative z-10 space-y-6 max-w-xl">
            <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter leading-none">Habit & Mood <br/><span className="text-emerald-400">Tracker Suite</span></h3>
            <p className="text-emerald-100/70 font-medium leading-relaxed">
              Take your growth offline. Download our professional printable templates to track your sleep, energy, and digital boundaries without screens.
            </p>
            <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400">
               <ShieldCheck size={16} /> Data-Driven Reflection
            </div>
          </div>
          <button className="relative z-10 flex items-center gap-3 bg-white text-slate-900 hover:bg-emerald-400 px-10 py-5 rounded-[2rem] font-black uppercase text-xs tracking-widest transition-all shadow-xl hover:scale-105">
            <Download size={20} /> Download PDF Pack
          </button>
        </div>
      </div>
    </div>
  );
};

export default Lifestyle;