
import React from 'react';
import { BookOpen, Download, FileText, LayoutList, Users, User, Sparkles } from 'lucide-react';

const Resources: React.FC = () => {
  const downloadables = [
    { title: 'Weekly Meal Plan Template', icon: LayoutList, type: 'PDF', size: '1.2 MB' },
    { title: '31-Day Habit Tracker', icon: FileText, type: 'PDF', size: '800 KB' },
    { title: 'Grocery Smart Checklist', icon: BookOpen, type: 'PDF', size: '500 KB' },
    { title: 'Home Workout Guide', icon: FileText, type: 'PDF', size: '2.5 MB' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 animate-in fade-in duration-700">
      <div className="mb-12">
        <h1 className="text-4xl font-black text-slate-900 mb-4 uppercase tracking-tighter">Guides & Resources</h1>
        <p className="text-xl text-slate-600 max-w-3xl font-medium leading-relaxed">Take your wellness journey offline with our easy-to-follow meal blueprints and trackers.</p>
      </div>

      {/* MEAL BLUEPRINTS SECTION */}
      <section className="mb-24">
        <div className="flex items-center gap-4 mb-10">
          <div className="p-3 bg-emerald-600 text-white rounded-2xl"><Sparkles size={24} /></div>
          <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">Meal Blueprints</h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* BACHELOR PLAN */}
          <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl flex flex-col">
            <div className="flex items-center gap-4 mb-8">
               <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl"><User size={28} /></div>
               <div>
                  <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Bachelor / Student Plan</h3>
                  <p className="text-[10px] font-black uppercase text-emerald-600 tracking-widest">Low Effort • Single Induction/Kettle</p>
               </div>
            </div>
            <div className="space-y-6 flex-grow">
               <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                  <span className="text-[9px] font-black uppercase text-slate-400 block mb-2">Breakfast</span>
                  <p className="text-xs font-bold text-slate-700 leading-relaxed">Instant Poha with Peanuts OR Oats with Banana. (Takes 5 mins)</p>
               </div>
               <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                  <span className="text-[9px] font-black uppercase text-slate-400 block mb-2">Lunch (Office/Class)</span>
                  <p className="text-xs font-bold text-slate-700 leading-relaxed">Curd Rice with Pomegranate OR a quick Paneer Sandwich.</p>
               </div>
               <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                  <span className="text-[9px] font-black uppercase text-slate-400 block mb-2">Dinner</span>
                  <p className="text-xs font-bold text-slate-700 leading-relaxed">One-Pot Moong Dal Khichdi OR Scrambled Eggs with 2 Rotis.</p>
               </div>
            </div>
            <div className="mt-10 p-4 bg-emerald-50 rounded-2xl text-[10px] font-bold text-emerald-700 leading-relaxed">
              <span className="block mb-1 uppercase tracking-widest">Pro Tip:</span> 
              Keep a jar of roasted peanuts and seeds. Sprinkle them on everything for extra crunch and healthy fats!
            </div>
          </div>

          {/* FAMILY PLAN */}
          <div className="bg-slate-900 p-10 rounded-[3rem] text-white shadow-2xl flex flex-col">
            <div className="flex items-center gap-4 mb-8">
               <div className="p-4 bg-white/10 text-emerald-400 rounded-2xl"><Users size={28} /></div>
               <div>
                  <h3 className="text-2xl font-black uppercase tracking-tight">Busy Family Plan</h3>
                  <p className="text-[10px] font-black uppercase text-emerald-400 tracking-widest">Budget Friendly • Batch Cooking</p>
               </div>
            </div>
            <div className="space-y-6 flex-grow">
               <div className="p-5 bg-white/5 rounded-2xl border border-white/10">
                  <span className="text-[9px] font-black uppercase text-emerald-500 block mb-2">Breakfast</span>
                  <p className="text-xs font-bold text-slate-300 leading-relaxed">Veggie-loaded Upma OR Besan Chilla (make a batch for 2 days).</p>
               </div>
               <div className="p-5 bg-white/5 rounded-2xl border border-white/10">
                  <span className="text-[9px] font-black uppercase text-emerald-500 block mb-2">Lunch</span>
                  <p className="text-xs font-bold text-slate-300 leading-relaxed">Seasonal Veggie Sabzi + Dal + Rice. (Cook dal for 2 days at once).</p>
               </div>
               <div className="p-5 bg-white/5 rounded-2xl border border-white/10">
                  <span className="text-[9px] font-black uppercase text-emerald-500 block mb-2">Dinner</span>
                  <p className="text-xs font-bold text-slate-300 leading-relaxed">Roti + Leftover Sabzi OR a quick Mixed Veg Khichdi.</p>
               </div>
            </div>
            <div className="mt-10 p-4 bg-white/10 rounded-2xl text-[10px] font-bold text-emerald-400 leading-relaxed">
              <span className="block mb-1 uppercase tracking-widest">Batch Hack:</span> 
              Make a large 'Mother Gravy' (Onion-Tomato-Ginger base) on Sunday. Use it to make 10 different types of curries instantly!
            </div>
          </div>
        </div>
      </section>

      {/* DOWNLOADS GRID */}
      <div className="flex items-center gap-4 mb-10">
          <div className="p-3 bg-slate-900 text-white rounded-2xl"><Download size={24} /></div>
          <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">Printable Tools</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {downloadables.map((item, idx) => (
          <div key={idx} className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm flex items-center justify-between group hover:border-emerald-500 transition-all">
            <div className="flex items-center gap-6">
              <div className="p-4 bg-slate-50 rounded-2xl text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-500 transition-colors">
                <item.icon size={28} />
              </div>
              <div>
                <h4 className="font-black text-slate-800 uppercase text-xs tracking-widest">{item.title}</h4>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">{item.type} • {item.size}</p>
              </div>
            </div>
            <button className="p-4 bg-slate-900 text-white rounded-2xl hover:bg-emerald-600 transition-all shadow-lg group-hover:scale-105">
              <Download size={20} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Resources;
