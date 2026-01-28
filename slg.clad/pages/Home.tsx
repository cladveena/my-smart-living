
import React from 'react';
import { Link } from 'react-router-dom';
import { NAVIGATION_ITEMS, getIcon } from '../constants';
import { ArrowRight } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-500">
      {/* Hero Section */}
      <section className="relative bg-emerald-900 text-white overflow-hidden py-20">
        <div className="absolute inset-0 opacity-20 bg-[url('https://picsum.photos/1600/900?nature')] bg-cover bg-center"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
              Smarter Living, <br /><span className="text-emerald-400">Simpler Choices.</span>
            </h1>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              Tailored lifestyle and wellness guidance for busy bachelors, students, and hard-working adults. Build lasting habits without the complexity.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/healthy-living" className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-lg font-bold flex items-center gap-2 transition-all transform hover:scale-105">
                Explore The Guide <ArrowRight size={20} />
              </Link>
              <Link to="/ai-tools" className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 px-8 py-3 rounded-lg font-bold transition-all">
                Try AI Tools
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Nav Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 mb-20 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {NAVIGATION_ITEMS.slice(1).map((item) => (
            <Link 
              key={item.id} 
              to={`/${item.id}`}
              className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all border border-slate-100 group flex flex-col items-start"
            >
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl mb-4 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                {getIcon(item.icon, 28)}
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">{item.label}</h3>
              <p className="text-slate-500 text-sm mb-4 flex-grow">{item.description}</p>
              <span className="text-emerald-600 font-semibold text-sm flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Get Started <ArrowRight size={16} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Quick Mission */}
      <section className="bg-slate-50 py-20 border-y border-slate-200">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Designed for Your Reality</h2>
          <p className="text-slate-600 text-lg leading-relaxed">
            We know that "traditional" wellness advice often fails when you're living in a PG, commuting for 2 hours, or surviving on hostel food. Smart Living Guide focuses on <strong>attainable, realistic changes</strong> that fit your actual schedule.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
