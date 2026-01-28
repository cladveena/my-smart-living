
import React from 'react';
import LayeredContent from '../components/LayeredContent';
import { Home, Wind, ShieldCheck, Sparkles } from 'lucide-react';

const HomeEnvironment: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 animate-in fade-in slide-in-from-bottom-10 duration-1000">
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tighter uppercase">Healthy Home & Environment</h1>
        <p className="text-xl text-slate-600 max-w-3xl font-medium">Your living space dictates your habits. Create a sanctuary for your health.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {[
          { icon: Wind, title: "Air Quality", desc: "Ventilation is key. Open windows daily to refresh indoor air.", color: "emerald" },
          { icon: ShieldCheck, title: "Kitchen Hygiene", desc: "Cross-contamination prevention and smart food storage.", color: "blue" },
          { icon: Sparkles, title: "Sustainable Living", desc: "Reducing waste and choosing non-toxic cleaning products.", color: "amber" }
        ].map((item, idx) => (
          <div key={idx} className={`bg-slate-50 p-6 rounded-3xl border border-slate-200 hover:shadow-xl transition-all group hover:-translate-y-1`}>
            <div className={`text-${item.color}-500 mb-4 group-hover:scale-110 transition-transform`}>
              <item.icon size={32} />
            </div>
            <h4 className="font-bold text-slate-900 mb-2">{item.title}</h4>
            <p className="text-sm text-slate-500">{item.desc}</p>
          </div>
        ))}
      </div>

      <LayeredContent 
        title="1. Creating a Healthy Living Space"
        simple={(
          <div className="space-y-4">
            <p className="text-slate-700 leading-relaxed font-medium">A clean home is a clean mind. For busy adults, focus on these 'Quick Wins' to maintain environmental hygiene:</p>
            <ul className="list-disc list-inside text-slate-600 space-y-3 font-medium">
              <li>Keep your bed made (Instant psychological win).</li>
              <li>Maintain clear surfaces in the kitchen and workspace.</li>
              <li>Incorporate house plants (Snake plants, Pothos) for air filtration.</li>
              <li>Define clear boundaries between "Work zones" and "Rest zones."</li>
            </ul>
          </div>
        )}
        medium={(
          <div className="space-y-8">
            <h5 className="font-black text-slate-800 uppercase text-sm tracking-widest">The 3 Pillars of Home Wellness</h5>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: "Light", desc: "Maximize natural light during day; shift to warm dim light 2 hours before sleep." },
                { label: "Clutter", desc: "Use the 'One-in One-out' rule for belongings to prevent accumulation." },
                { label: "Air", desc: "Use HEPA filters if living in high pollution areas; check humidity levels." }
              ].map((pill, i) => (
                <div key={i} className="p-6 bg-white border border-slate-100 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow">
                  <span className="font-black block text-sm uppercase tracking-tight text-slate-900 mb-2">{pill.label}</span>
                  <span className="text-xs text-slate-500 font-medium leading-relaxed">{pill.desc}</span>
                </div>
              ))}
            </div>
            <div className="aspect-video bg-slate-900 rounded-[2.5rem] flex items-center justify-center overflow-hidden group cursor-pointer">
               <div className="text-center group-hover:scale-105 transition-transform">
                 <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/20">
                   <Home className="text-white" size={24} />
                 </div>
                 <p className="text-white/60 font-black uppercase text-[10px] tracking-[0.3em]">Masterclass: PG/Hostel Efficiency</p>
               </div>
            </div>
          </div>
        )}
      />
      <style>{`
        .animate-in { animation: fadeIn 1s ease-out; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
};

export default HomeEnvironment;
