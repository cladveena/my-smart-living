
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, CheckCircle2, Dna, Droplets, ShieldCheck, Heart, 
  Info, Zap, Clock, Shield, AlertTriangle, Scale, Leaf, Egg, Fish, 
  Wheat, Beef, GlassWater, Flame, Eye, Sun, Moon
} from 'lucide-react';

const NutritionNutrients: React.FC = () => {
  const macros = [
    {
      name: "Carbohydrates",
      color: "amber",
      icon: Flame,
      summary: "Your body's main fuel source.",
      subtypes: [
        {
          title: "Quick Energy (Simple)",
          icon: Zap,
          role: "Gives you a fast boost. Great for a quick burst, but can lead to an 'energy crash' if eaten alone.",
          sources: ["🍎 Fruits", "🍯 Honey", "🍚 White Rice", "🥛 Dairy"],
          implication: "Best for immediate activity; pair with fiber to stay full."
        },
        {
          title: "Steady Energy (Complex)",
          icon: Clock,
          role: "Slow-burning fuel that keeps you full and energized for hours.",
          sources: ["🥣 Oats", "🌾 Brown Rice", "🍲 Millets", "🍠 Sweet Potato"],
          implication: "Crucial for steady focus and long-term satiety."
        }
      ]
    },
    {
      name: "Proteins",
      color: "rose",
      icon: Shield,
      summary: "The building blocks for repair.",
      subtypes: [
        {
          title: "Whole Proteins (Complete)",
          icon: CheckCircle2,
          role: "Contain all the essential 'bricks' your body needs to fix muscle and skin.",
          sources: ["🥚 Eggs", "🧀 Paneer", "🍲 Soya", "🍗 Chicken/Fish"],
          implication: "Highest efficiency for muscle repair and recovery."
        },
        {
          title: "Plant Power (Incomplete)",
          icon: Leaf,
          role: "Great for your heart but might miss a few bricks—easy to fix by mixing foods.",
          sources: ["🍲 Lentils", "🥜 Nuts", "🫘 Beans", "🌻 Seeds"],
          implication: "Mix Dal with Rice to create a 'complete' protein chain."
        }
      ]
    },
    {
      name: "Healthy Fats",
      color: "emerald",
      icon: Heart,
      summary: "Vital for your brain and hormones.",
      subtypes: [
        {
          title: "Heart Heroes (Unsaturated)",
          icon: ShieldCheck,
          role: "Liquid at room temp. Keeps your brain sharp and your heart happy.",
          sources: ["🥜 Walnuts", "🫒 Olive Oil", "🥑 Avocado", "🎃 Seeds"],
          implication: "Actively helps lower bad cholesterol levels."
        },
        {
          title: "Limit These (Saturated/Trans)",
          icon: AlertTriangle,
          role: "Solid at room temp. Fine in small amounts, but too much can be heavy on the heart.",
          sources: ["🧈 Butter", "🥥 Coconut Oil", "🍟 Fried Snacks", "🐄 Ghee"],
          implication: "Avoid Trans fats (found in long-life snacks) entirely."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white pb-20 animate-in fade-in duration-500">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <Link to="/nutrition" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-emerald-600 mb-12 transition-colors">
          <ArrowLeft size={16} /> Back to Nutrition
        </Link>
        
        <header className="mb-20">
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 uppercase tracking-tighter mb-4">Fueling Your <span className="text-emerald-600">Body</span></h1>
          <p className="text-xl text-slate-500 font-medium max-w-3xl leading-relaxed">
            Understanding what you eat is the first step to feeling better. Here’s a simple breakdown of the nutrients that keep you going.
          </p>
        </header>

        {/* Macronutrients Section */}
        <section className="mb-32">
          <div className="flex items-center gap-4 mb-12 border-b-4 border-slate-900 pb-4 w-fit">
            <Dna className="text-slate-900" size={32} />
            <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">1. The Big Three (Macros)</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {macros.map((macro, idx) => (
              <div key={idx} className="bg-slate-50 p-8 md:p-10 rounded-[3.5rem] border border-slate-100 flex flex-col group hover:bg-white hover:shadow-2xl transition-all duration-500">
                <div className={`w-14 h-14 bg-${macro.color}-50 text-${macro.color}-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <macro.icon size={28} />
                </div>
                <h3 className="text-2xl font-black text-slate-900 uppercase mb-2">{macro.name}</h3>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-8">{macro.summary}</p>
                
                <div className="space-y-8 flex-grow">
                   {macro.subtypes.map((sub, i) => (
                     <div key={i} className="space-y-3">
                       <div className="flex items-center gap-2">
                         <div className={`p-1.5 bg-${macro.color}-100 text-${macro.color}-600 rounded-lg`}>
                            <sub.icon size={14} />
                         </div>
                         <h4 className="font-black text-slate-800 text-sm uppercase tracking-tight">{sub.title}</h4>
                       </div>
                       <p className="text-[11px] text-slate-500 leading-relaxed font-medium">{sub.role}</p>
                       <div className="flex flex-wrap gap-2 py-2">
                         {sub.sources.map(src => (
                           <span key={src} className="px-2 py-1 bg-white text-[9px] font-bold text-slate-600 rounded-md border border-slate-100 shadow-sm">
                             {src}
                           </span>
                         ))}
                       </div>
                       <div className="text-[10px] text-slate-700 font-bold uppercase tracking-tighter bg-white/60 border border-slate-200 px-3 py-1.5 rounded-xl w-full">
                         <span className="text-slate-400 mr-1">Impact:</span> {sub.implication}
                       </div>
                     </div>
                   ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Micronutrients Section */}
        <section>
          <div className="flex items-center gap-4 mb-12 border-b-4 border-emerald-500 pb-4 w-fit">
            <ShieldCheck className="text-emerald-500" size={32} />
            <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">2. Vitamins & Minerals</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white p-12 rounded-[4rem] border-2 border-slate-100 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none text-emerald-500"><Zap size={120} /></div>
              <h3 className="text-xl font-black text-emerald-600 uppercase mb-8 flex items-center gap-3">
                <Heart size={20} /> Vital Vitamins
              </h3>
              <div className="space-y-6">
                {[
                  { v: "Vitamin A", i: Eye, b: "Sharp eyes and healthy skin.", s: "🥕 Carrots, 🥬 Spinach", color: "amber" },
                  { v: "B-Complex", i: Flame, b: "The energy-metabolism master.", s: "🫘 Beans, 🥚 Eggs", color: "blue" },
                  { v: "Vitamin C", i: Shield, b: "Immune defense and repair.", s: "🍊 Oranges, 🫑 Peppers", color: "rose" },
                  { v: "Vitamin D", i: Sun, b: "Strong bones and a happy mood.", s: "🥛 Milk, ☀️ Sunlight", color: "amber" }
                ].map((item, i) => (
                  <div key={i} className="flex gap-5 p-5 bg-slate-50/50 hover:bg-emerald-50 rounded-[2rem] transition-colors group">
                    <div className={`w-12 h-12 rounded-2xl bg-${item.color}-100 text-${item.color}-600 flex items-center justify-center shrink-0`}>
                      <item.i size={20} />
                    </div>
                    <div>
                      <h4 className="font-black text-slate-900 text-sm uppercase tracking-tight">{item.v}</h4>
                      <p className="text-[11px] text-slate-500 leading-relaxed mb-2 font-medium">{item.b}</p>
                      <div className="flex flex-wrap gap-2">
                        {item.s.split(', ').map(food => (
                          <span key={food} className="text-[9px] font-black uppercase text-emerald-600 bg-white border border-emerald-100 px-2 py-0.5 rounded-full">{food}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-900 p-12 rounded-[4rem] text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none text-emerald-400"><Droplets size={120} /></div>
              <h3 className="text-xl font-black text-emerald-400 uppercase mb-8 flex items-center gap-3">
                <Droplets size={20} /> Crucial Minerals
              </h3>
              <div className="space-y-6">
                {[
                  { m: "Iron", i: Zap, b: "Oxygen for your blood and energy.", s: "🥘 Lentils, 🥩 Lean Meat", color: "rose" },
                  { m: "Calcium", i: Shield, b: "Strong bones and muscles.", s: "🥛 Milk, 🥜 Almonds", color: "blue" },
                  { m: "Magnesium", i: Moon, b: "Relaxation and better sleep.", s: "🥜 Nuts, 🍫 Dark Choco", color: "emerald" },
                  { m: "Zinc", i: ShieldCheck, b: "Healing and cold-fighting.", s: "🫘 Chickpeas, 🌻 Seeds", color: "amber" }
                ].map((item, i) => (
                  <div key={i} className="flex gap-5 p-5 bg-white/5 hover:bg-white/10 rounded-[2rem] transition-colors group">
                    <div className={`w-12 h-12 rounded-2xl bg-${item.color}-500/20 text-${item.color}-400 flex items-center justify-center shrink-0`}>
                      <item.i size={20} />
                    </div>
                    <div>
                      <h4 className="font-black text-emerald-100 text-sm uppercase tracking-tight">{item.m}</h4>
                      <p className="text-[11px] text-slate-400 leading-relaxed mb-2 font-medium">{item.b}</p>
                      <div className="flex flex-wrap gap-2">
                        {item.s.split(', ').map(food => (
                          <span key={food} className="text-[9px] font-black uppercase text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">{food}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="mt-20 p-10 bg-blue-50 rounded-[4rem] border border-blue-100 flex items-start gap-6 shadow-sm">
           <Info className="text-blue-500 shrink-0 mt-1" size={24} />
           <div>
              <h4 className="text-lg font-black text-blue-900 uppercase tracking-tighter mb-2">Did you know?</h4>
              <p className="text-sm text-blue-800 font-medium leading-relaxed">
                Foods work better together! For example, squeezing a lemon (Vitamin C) on your spinach helps your body absorb the Iron much faster. Focus on a colorful plate to get all these benefits naturally.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default NutritionNutrients;
