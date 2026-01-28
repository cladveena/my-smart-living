
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Utensils, CheckCircle2, Info, Sparkles, Coffee, Sun, Moon } from 'lucide-react';

const NutritionPlate: React.FC = () => {
  return (
    <div className="min-h-screen bg-white pb-20 animate-in fade-in duration-500">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <Link to="/nutrition" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-emerald-600 mb-12 transition-colors">
          <ArrowLeft size={16} /> Back to Hub
        </Link>
        
        <header className="mb-20 text-center">
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 uppercase tracking-tighter mb-4">The Healthy Plate Guide</h1>
          <p className="text-xl text-slate-500 font-medium max-w-3xl mx-auto leading-relaxed">
            A practical tool for achieving nutritional balance and portion control without the need for constant tracking or weighing food.
          </p>
        </header>

        {/* The Visual Plate Section */}
        <div className="bg-slate-50 p-12 md:p-24 rounded-[5rem] border border-slate-100 shadow-inner flex flex-col items-center mb-24">
           <div className="relative mb-20 group">
              <div className="absolute inset-0 bg-emerald-500/10 rounded-full blur-[120px] group-hover:bg-emerald-500/20 transition-all duration-700"></div>
              <div className="relative w-80 h-80 md:w-[500px] md:h-[500px] rounded-full border-[25px] border-white shadow-3xl flex overflow-hidden ring-[15px] ring-slate-200/50">
                 {/* Vegetables Half */}
                 <div className="w-1/2 h-full bg-emerald-100 flex items-center justify-center p-8 border-r-8 border-white hover:bg-emerald-200 transition-colors">
                    <div className="text-center">
                       <div className="text-4xl md:text-6xl font-black text-emerald-900 mb-2">50%</div>
                       <div className="text-[10px] md:text-xs font-black text-emerald-700 uppercase tracking-[0.3em] leading-tight">VEGETABLES <br/>& SALADS</div>
                    </div>
                 </div>
                 {/* Right Side Quarters */}
                 <div className="w-1/2 h-full flex flex-col">
                    <div className="h-1/2 bg-amber-100 flex items-center justify-center p-4 border-b-8 border-white hover:bg-amber-200 transition-colors">
                       <div className="text-center">
                          <div className="text-2xl md:text-4xl font-black text-amber-900 mb-1">25%</div>
                          <div className="text-[8px] md:text-[10px] font-black text-amber-700 uppercase tracking-[0.2em]">PROTEIN <br/>SOURCES</div>
                       </div>
                    </div>
                    <div className="h-1/2 bg-blue-100 flex items-center justify-center p-4 hover:bg-blue-200 transition-colors">
                       <div className="text-center">
                          <div className="text-2xl md:text-4xl font-black text-blue-900 mb-1">25%</div>
                          <div className="text-[8px] md:text-[10px] font-black text-blue-700 uppercase tracking-[0.2em]">COMPLEX <br/>CARBOHYDRATES</div>
                       </div>
                    </div>
                 </div>
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full text-center">
              {[
                { 
                  title: "50% Fiber Foundation", 
                  desc: "Non-starchy vegetables add volume and nutrients without high caloric density. This promotes satiety and provides essential vitamins.",
                  color: "text-emerald-700",
                  bg: "bg-emerald-50",
                  items: ["Spinach", "Broccoli", "Peppers", "Cucumber", "Cauliflower"]
                },
                { 
                  title: "25% Protein Core", 
                  desc: "Protein is vital for muscle repair and long-term fullness. Aim for lean sources such as legumes, white meats, or egg whites.",
                  color: "text-amber-700",
                  bg: "bg-amber-50",
                  items: ["Chicken", "Lentils", "Paneer", "Fish", "Soya", "Eggs"]
                },
                { 
                  title: "25% Complex Energy", 
                  desc: "Carbohydrates provide steady energy for brain function. Focus on high-fiber options like brown rice, millets, or whole grains.",
                  color: "text-blue-700",
                  bg: "bg-blue-50",
                  items: ["Brown Rice", "Oats", "Sweet Potato", "Quinoa", "Whole Wheat"]
                }
              ].map((item, idx) => (
                <div key={idx} className={`${item.bg} p-10 rounded-[3rem] border border-white flex flex-col items-center`}>
                   <h3 className={`text-xl font-black uppercase tracking-tight ${item.color} mb-4`}>{item.title}</h3>
                   <p className="text-sm text-slate-500 leading-relaxed font-medium mb-8">{item.desc}</p>
                   <div className="flex flex-wrap justify-center gap-2">
                     {item.items.map(i => (
                       <span key={i} className="px-3 py-1 bg-white text-[10px] font-black uppercase tracking-widest text-slate-400 rounded-full border border-slate-100">
                         {i}
                       </span>
                     ))}
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* Meal Scenarios */}
        <section className="mb-24">
          <div className="flex items-center gap-4 mb-12">
            <div className="p-3 bg-slate-900 text-white rounded-2xl"><Sparkles size={24} /></div>
            <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">Meal Blueprint Examples</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              { icon: Coffee, time: "Breakfast", title: "The Morning Routine", color: "amber", desc: "Oats (Carb) + Scrambled Eggs (Protein) + Berries (Fiber Substitute)." },
              { icon: Sun, time: "Lunch", title: "The Workplace Meal", color: "emerald", desc: "Brown Rice (Carb) + Grilled Paneer (Protein) + Large Sautéed Mixed Veggies." },
              { icon: Moon, time: "Dinner", title: "The Recovery Plate", color: "blue", desc: "Sweet Potato (Carb) + Baked Fish/Lentils (Protein) + Steamed Broccoli/Salad." }
            ].map((scene, i) => (
              <div key={i} className="bg-white p-10 rounded-[3.5rem] border border-slate-100 shadow-xl group hover:-translate-y-2 transition-transform">
                <div className={`w-14 h-14 bg-${scene.color}-50 text-${scene.color}-600 rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:bg-${scene.color}-600 group-hover:text-white transition-all`}>
                  <scene.icon size={28} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 block mb-2">{scene.time}</span>
                <h4 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-4">{scene.title}</h4>
                <p className="text-sm text-slate-500 font-medium leading-relaxed italic">"{scene.desc}"</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-24">
           <div className="flex items-center gap-4 mb-12">
              <div className="p-3 bg-slate-900 text-white rounded-2xl"><Utensils size={24} /></div>
              <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">The Science of Proportional Eating</h2>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-10 bg-white border border-slate-100 rounded-[3rem] shadow-sm">
                 <h4 className="text-lg font-black text-slate-900 uppercase mb-4">Glycemic Management</h4>
                 <p className="text-slate-600 leading-relaxed text-sm">
                   By filling half the plate with vegetables, you naturally moderate the caloric density of the meal. This approach assists in stabilizing blood glucose levels and preventing insulin spikes that lead to energy crashes.
                 </p>
              </div>
              <div className="p-10 bg-white border border-slate-100 rounded-[3rem] shadow-sm">
                 <h4 className="text-lg font-black text-slate-900 uppercase mb-4">Satiety Control</h4>
                 <p className="text-slate-600 leading-relaxed text-sm">
                   Fiber-rich vegetables increase food volume without significantly increasing energy intake. This triggers stretch receptors in the stomach, sending signals of fullness to the brain earlier in the meal.
                 </p>
              </div>
           </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           <div className="lg:col-span-2 bg-white p-12 rounded-[4rem] border border-slate-100 shadow-xl">
              <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-8">Implementation Strategies</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 {[
                   "Use smaller plates to assist with psychological portion satisfaction.",
                   "Order 'Extra Vegetables' when dining out to maintain proportions.",
                   "Aim for at least three different colors of vegetables per plate.",
                   "Sequence your meal: Eat the fiber (veggies) first, then protein, then carbs.",
                   "Maintain hydration: Drink 300ml of water 15 minutes before the meal.",
                   "Avoid drinking sugary beverages with meals to prevent blood sugar spikes."
                 ].map((tip, i) => (
                   <div key={i} className="flex gap-4 items-start">
                      <CheckCircle2 className="text-emerald-500 shrink-0 mt-1" size={18} />
                      <span className="text-sm font-bold text-slate-700 leading-tight">{tip}</span>
                   </div>
                 ))}
              </div>
           </div>
           
           <div className="bg-slate-900 p-12 rounded-[4rem] text-white flex flex-col justify-center shadow-3xl">
              <div className="flex items-center gap-4 mb-6 text-emerald-400">
                 <Info size={32} />
                 <h4 className="text-xl font-black uppercase tracking-tighter">Professional Note</h4>
              </div>
              <p className="text-slate-400 leading-relaxed font-medium mb-8">
                "Healthy eating is not a state of perfection, but a habit of balance. The plate method is your fallback protocol for any social or work situation where nutritional control is challenging."
              </p>
              <div className="p-6 bg-white/5 rounded-3xl border border-white/10 text-xs font-black uppercase tracking-widest text-emerald-400 text-center">
                Protocol: Consistency over intensity.
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default NutritionPlate;
