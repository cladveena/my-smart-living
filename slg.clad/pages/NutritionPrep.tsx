
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ChefHat, Clock, ShoppingCart, ListChecks, Store, Zap, Flame, CheckCircle2 } from 'lucide-react';

const NutritionPrep: React.FC = () => {
  return (
    <div className="min-h-screen bg-white pb-20 animate-in fade-in duration-500">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <Link to="/nutrition" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-emerald-600 mb-12 transition-colors">
          <ArrowLeft size={16} /> Back to Hub
        </Link>
        
        <header className="mb-20">
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 uppercase tracking-tighter mb-4">Meal Planning <span className="text-rose-500">Mastery</span></h1>
          <p className="text-xl text-slate-500 font-medium max-w-3xl leading-relaxed">
            Planning is the secret to eating healthy on a budget. No more "What's for dinner?" stress—just simple, organized fuel.
          </p>
        </header>

        {/* THE 4-STEP SYSTEM */}
        <section className="mb-24">
          <div className="flex items-center gap-4 mb-12">
            <div className="p-3 bg-slate-900 text-white rounded-2xl"><ListChecks size={24} /></div>
            <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">Your Action Plan</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                step: "01", 
                title: "Check Your Pantry", 
                desc: "Don't buy what you already have. Check for Dal, Rice, and Spices first.", 
                icon: Store,
                color: "bg-emerald-50 text-emerald-600"
              },
              { 
                step: "02", 
                title: "Pick Your Core 3", 
                desc: "Choose 3 grains, 3 proteins, and 3 veggies for the week to mix and match.", 
                icon: ChefHat,
                color: "bg-blue-50 text-blue-600"
              },
              { 
                step: "03", 
                title: "The Smart Shop", 
                desc: "Stick strictly to your list. Buy fresh for now, frozen for the end of the week.", 
                icon: ShoppingCart,
                color: "bg-amber-50 text-amber-600"
              },
              { 
                step: "04", 
                title: "The Power Hour", 
                desc: "Spend 60 mins on Sunday chopping veggies and pre-boiling eggs or dals.", 
                icon: Clock,
                color: "bg-rose-50 text-rose-600"
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 group hover:bg-white hover:shadow-xl transition-all duration-500">
                <div className={`w-14 h-14 ${item.color} rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform`}>
                   <item.icon size={24} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-300 block mb-2">Step {item.step}</span>
                <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-3">{item.title}</h3>
                <p className="text-sm text-slate-500 font-medium leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* PANTRY STAPLES */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
          <div className="bg-slate-900 p-12 md:p-16 rounded-[4rem] text-white shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none"><Store size={200} /></div>
             <div className="relative z-10">
                <h2 className="text-3xl font-black uppercase tracking-tighter mb-10 flex items-center gap-4">
                  <Store className="text-emerald-400" /> The Essential Pantry
                </h2>
                <p className="text-slate-400 font-medium mb-10">Keep these items at home for "Emergency Meals" that take less than 10 minutes to cook.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                   {[
                     { name: "Poha / Oats", use: "Instant breakfast bases." },
                     { name: "Moong Dal", use: "High protein, cooks in 10 mins." },
                     { name: "Paneer / Eggs", use: "Easy, versatile protein hits." },
                     { name: "Dahi (Curd)", use: "Instant probiotics, pairs with anything." },
                     { name: "Peanuts / Seeds", use: "Quick crunch and healthy fats." },
                     { name: "Whole Wheat / Rice", use: "Your steady energy base." }
                   ].map((staple, i) => (
                     <div key={i} className="p-4 bg-white/5 rounded-2xl border border-white/10">
                        <h4 className="font-black text-emerald-400 uppercase text-[11px] tracking-widest mb-1">{staple.name}</h4>
                        <p className="text-[10px] text-slate-400 font-medium">{staple.use}</p>
                     </div>
                   ))}
                </div>
             </div>
          </div>

          <div className="bg-rose-50 p-12 md:p-16 rounded-[4rem] border border-rose-100">
             <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter mb-10 flex items-center gap-4">
               <Zap className="text-rose-500" /> The 3x3 Hack
             </h2>
             <p className="text-slate-600 font-medium leading-relaxed mb-10">
               Simplify your life. Don't plan complex recipes—just choose 3 items from each category for your weekly rotation.
             </p>
             <div className="space-y-6">
                <div className="p-6 bg-white rounded-3xl border border-rose-200 shadow-sm">
                   <h4 className="text-[10px] font-black uppercase text-rose-500 tracking-widest mb-3">3 Grains (Pick any)</h4>
                   <p className="text-xs font-bold text-slate-700">Rice • Wheat Roti • Oats / Poha</p>
                </div>
                <div className="p-6 bg-white rounded-3xl border border-rose-200 shadow-sm">
                   <h4 className="text-[10px] font-black uppercase text-rose-500 tracking-widest mb-3">3 Proteins (Pick any)</h4>
                   <p className="text-xs font-bold text-slate-700">Dal (Lentils) • Eggs • Paneer / Soya</p>
                </div>
                <div className="p-6 bg-white rounded-3xl border border-rose-200 shadow-sm">
                   <h4 className="text-[10px] font-black uppercase text-rose-500 tracking-widest mb-3">3 Veggies (Pick any)</h4>
                   <p className="text-xs font-bold text-slate-700">Spinach • Onion/Tomato (Base) • Carrot / Beans</p>
                </div>
             </div>
          </div>
        </div>

        {/* QUICK PREP HACKS */}
        <section className="bg-slate-50 border border-slate-100 rounded-[4rem] p-12 md:p-20 shadow-sm">
           <div className="max-w-3xl">
              <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter mb-12 flex items-center gap-4">
                <Flame className="text-rose-500" /> Pre-Prep Shortcuts
              </h2>
              <div className="space-y-8">
                 {[
                   { title: "The 'Boil' Trick", desc: "Hard-boil 4-6 eggs on Sunday. Instant protein for breakfast or a quick snack during the week." },
                   { title: "One-Time Tadka", desc: "Make a big batch of Onion-Tomato-Ginger-Garlic base. Store it and add to any dal or veg for an instant meal." },
                   { title: "Soaking Strategy", desc: "Soak your pulses (dals) for 30 mins before cooking. It cuts the cooking time in half." },
                   { title: "Chop Once", desc: "Spend 20 mins chopping your onions and beans. Store in airtight boxes for up to 3 days." }
                 ].map((hack, i) => (
                   <div key={i} className="flex gap-6 items-start">
                      <div className="p-3 bg-white rounded-xl shadow-sm"><CheckCircle2 className="text-emerald-500" size={20} /></div>
                      <div>
                         <h4 className="font-black text-slate-900 uppercase text-xs tracking-widest mb-1">{hack.title}</h4>
                         <p className="text-sm text-slate-500 font-medium leading-relaxed">{hack.desc}</p>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </section>

        <div className="mt-20 p-10 bg-emerald-900 rounded-[4rem] text-white flex flex-col md:flex-row items-center gap-8 shadow-2xl">
           <ChefHat className="text-emerald-400 shrink-0" size={48} />
           <div>
              <h3 className="text-xl font-black uppercase tracking-tight mb-2">Ready to plan?</h3>
              <p className="text-emerald-100 text-sm leading-relaxed font-medium">
                Start with tomorrow. Pick just one meal you'll plan tonight. Once you see how much time it saves, you'll naturally want to plan the whole week!
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default NutritionPrep;
