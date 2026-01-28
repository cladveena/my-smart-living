
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Dna, Utensils, Search, ChefHat, 
  Ruler, ArrowRight, Sparkles 
} from 'lucide-react';

const Nutrition: React.FC = () => {
  const modules = [
    { 
      id: 'nutrients', 
      title: 'What’s in your food?', 
      desc: 'An easy guide to energy, repair, and the vitamins your body needs every day.', 
      icon: Dna, 
      color: 'bg-amber-500',
      img: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=400'
    },
    { 
      id: 'plate', 
      title: 'The Perfect Plate', 
      desc: 'Visual tips to balance your meals without counting calories or weighing food.', 
      icon: Utensils, 
      color: 'bg-emerald-500',
      img: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=400'
    },
    { 
      id: 'labels', 
      title: 'Reading Labels', 
      desc: 'Spot hidden sugars and learn what those long ingredient names actually mean.', 
      icon: Search, 
      color: 'bg-blue-500',
      img: 'https://images.unsplash.com/photo-1504470695779-75300268aa0e?auto=format&fit=crop&q=80&w=400'
    },
    { 
      id: 'prep', 
      title: 'Meal Planning', 
      desc: 'Save time and money by organizing your meals. No more "What should I eat?" stress.', 
      icon: ChefHat, 
      color: 'bg-rose-500',
      img: 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&q=80&w=400'
    },
    { 
      id: 'calculators', 
      title: 'Health Trackers', 
      desc: 'Simple tools to understand your weight, metabolism, and health risks.', 
      icon: Ruler, 
      color: 'bg-slate-700',
      img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=400'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 animate-in fade-in duration-700">
      <section className="bg-slate-900 pt-24 pb-32 px-4 relative overflow-hidden text-center">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6 backdrop-blur-md">
            <Sparkles size={14} className="text-emerald-400" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400">Your Nutrition Hub</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 uppercase tracking-tighter">
            Fuel Your <span className="text-emerald-400">Life</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto font-medium leading-relaxed">
            Eating well doesn't have to be complicated. We help you make smarter choices that fit your real life.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 -mt-16 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {modules.map((mod) => (
            <Link 
              key={mod.id} 
              to={`/nutrition/${mod.id}`}
              className="bg-white rounded-[2.5rem] shadow-xl border border-slate-100 overflow-hidden group hover:-translate-y-2 transition-all duration-500 flex flex-col"
            >
              <div className="h-56 overflow-hidden relative">
                <img src={mod.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={mod.title} />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                <div className={`absolute bottom-4 left-4 p-3 ${mod.color} text-white rounded-2xl shadow-lg`}>
                  <mod.icon size={20} />
                </div>
              </div>
              <div className="p-8 flex-grow">
                <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-3">{mod.title}</h3>
                <p className="text-sm text-slate-500 font-medium leading-relaxed mb-6">{mod.desc}</p>
                <div className="mt-auto flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-900 group-hover:text-emerald-600 transition-colors">
                  Learn More <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Nutrition;
