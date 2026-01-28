
import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Activity, Moon, Shield, Heart, Sparkles, ArrowRight } from 'lucide-react';

const HealthyLiving: React.FC = () => {
  const foundations = [
    { 
      title: "Movement Essentials", 
      id: "fitness", 
      desc: "Daily steps, stretching, and simple strength training principles.", 
      icon: Activity, 
      color: "bg-blue-500",
      img: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=400"
    },
    { 
      title: "Sleep & Recovery", 
      id: "lifestyle", 
      desc: "Optimizing your environment for deep, restorative rest.", 
      icon: Moon, 
      color: "bg-indigo-500",
      img: "https://images.unsplash.com/photo-1541480601022-2308c0f02487?auto=format&fit=crop&q=80&w=400"
    },
    { 
      title: "Mental Hygiene", 
      id: "wellbeing", 
      desc: "Stress management and mindfulness for the modern workplace.", 
      icon: Heart, 
      color: "bg-rose-500",
      img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=400"
    },
    { 
      title: "Home Environment", 
      id: "home-environment", 
      desc: "Creating a living space that supports your health goals.", 
      icon: Shield, 
      color: "bg-emerald-500",
      img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=400"
    }
  ];

  return (
    <div className="min-h-screen bg-white animate-in fade-in duration-700">
      <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1545239351-ef35f43d514b?auto=format&fit=crop&q=80" className="w-full h-full object-cover brightness-[0.4]" alt="Healthy Living" />
        </div>
        <div className="relative z-10 text-center px-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-500/30 mb-6 backdrop-blur-md">
            <Leaf size={14} className="text-emerald-400" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400">Foundation Series</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none mb-4">Healthy <span className="text-emerald-400">Foundations</span></h1>
          <p className="text-slate-200 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">Simple habits, professional principles. Building a life you don't need a vacation from.</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {foundations.map((found) => (
            <Link 
              key={found.id} 
              to={`/${found.id}`}
              className="bg-slate-50 rounded-[4rem] overflow-hidden border border-slate-100 flex flex-col md:flex-row items-stretch group hover:bg-white hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
            >
              <div className="md:w-1/3 h-48 md:h-auto overflow-hidden">
                <img src={found.img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt={found.title} />
              </div>
              <div className="p-10 flex flex-col justify-center flex-grow">
                <div className={`w-12 h-12 ${found.color} text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                  <found.icon size={24} />
                </div>
                <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-2">{found.title}</h3>
                <p className="text-sm text-slate-500 font-medium mb-6 leading-relaxed">{found.desc}</p>
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-900 group-hover:text-emerald-600 transition-colors">
                  Open Module <ArrowRight size={16} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HealthyLiving;
