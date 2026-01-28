
import React from 'react';
import { Link } from 'react-router-dom';
import LayeredContent from '../components/LayeredContent';
import { Activity, Dumbbell, Ruler, Droplets, ArrowRight } from 'lucide-react';

const Fitness: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 animate-in fade-in duration-500">
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-4 uppercase tracking-tighter">Fitness & Movement</h1>
        <p className="text-xl text-slate-600 max-w-3xl font-medium">Movement is vital for physical and cognitive longevity. Keep your body functional.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
        <div className="col-span-1 lg:col-span-2 space-y-8">
          <LayeredContent 
            title="Simple Movement Principles"
            simple={(
              <div className="space-y-4">
                <p className="text-slate-600 leading-relaxed">Consistency in daily activity is more important than occasional high-intensity sessions. The goal is to minimize sedentary behavior.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <div className="bg-slate-50 p-6 rounded-2xl flex items-center gap-4 border border-slate-100">
                      <div className="p-3 bg-white text-emerald-500 rounded-xl shadow-sm"><Activity size={24} /></div>
                      <span className="font-bold text-slate-800 text-sm">Walk 7k-10k steps daily</span>
                   </div>
                   <div className="bg-slate-50 p-6 rounded-2xl flex items-center gap-4 border border-slate-100">
                      <div className="p-3 bg-white text-blue-500 rounded-xl shadow-sm"><Dumbbell size={24} /></div>
                      <span className="font-bold text-slate-800 text-sm">20 mins bodyweight routine</span>
                   </div>
                </div>
              </div>
            )}
            medium={(
              <div className="space-y-4">
                 <h5 className="font-black text-slate-900 uppercase text-xs tracking-widest">The Minimum Effective Dose</h5>
                 <p className="text-sm text-slate-600 leading-relaxed">Aim for 3 Strength sessions per week (Push-ups, Squats, Lunges) combined with at least 150 minutes of moderate aerobic activity per week.</p>
                 <div className="aspect-video bg-slate-900 rounded-[2.5rem] flex items-center justify-center border-4 border-slate-50 shadow-inner overflow-hidden relative group">
                    <img src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800" className="absolute inset-0 w-full h-full object-cover opacity-40 grayscale group-hover:scale-105 transition-transform duration-700" alt="Yoga" />
                    <div className="relative z-10 text-center">
                       <p className="text-white font-black uppercase text-[10px] tracking-[0.3em]">Module: Functional Flexibility</p>
                    </div>
                 </div>
              </div>
            )}
          />

          <div className="bg-blue-50 p-10 rounded-[3rem] border border-blue-100 shadow-sm">
             <h3 className="text-xl font-black mb-6 flex items-center gap-4 text-blue-900 uppercase tracking-tight">
               <Droplets className="text-blue-500" /> Hydration Protocol
             </h3>
             <p className="text-sm text-blue-700 mb-8 font-medium">Appropriate fluid intake is essential for joint lubrication and muscle function. Aim for 2.5 - 3.5 Liters daily.</p>
             <div className="flex gap-3 flex-wrap">
                {[1,2,3,4,5,6,7,8].map(i => (
                  <div key={i} className="w-12 h-12 rounded-2xl border-2 border-blue-200 bg-white flex items-center justify-center text-blue-500 font-black cursor-pointer hover:bg-blue-500 hover:text-white hover:border-blue-500 transition-all shadow-sm">
                    {i}
                  </div>
                ))}
             </div>
          </div>
        </div>

        {/* Health Metrics CTA */}
        <div className="lg:col-span-1">
          <Link to="/nutrition/calculators" className="group block bg-slate-900 p-10 rounded-[3rem] shadow-2xl relative overflow-hidden h-full flex flex-col justify-between hover:translate-y-[-4px] transition-all duration-500">
            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
              <Ruler size={200} />
            </div>
            <div className="relative z-10">
              <div className="p-4 bg-emerald-500 text-white rounded-2xl w-fit mb-8 shadow-xl shadow-emerald-500/20 group-hover:scale-110 transition-transform">
                <Ruler size={32} />
              </div>
              <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-4">Body Metrics <br/><span className="text-emerald-400">Analysis Lab</span></h3>
              <p className="text-slate-400 text-sm font-medium leading-relaxed mb-8">
                Access professional calculators for BMI, BMR, and Waist-to-Hip ratio to benchmark your physical baseline.
              </p>
            </div>
            <div className="relative z-10 flex items-center gap-3 text-xs font-black uppercase tracking-widest text-emerald-400 group-hover:translate-x-2 transition-transform">
              Launch Suite <ArrowRight size={18} />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Fitness;
