
import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, Ruler, Activity, Target, AlertCircle, 
  Sparkles, ArrowRight, ShieldAlert, Heart, Zap,
  Scale
} from 'lucide-react';

const Calculators: React.FC = () => {
  const bmiRef = useRef<HTMLDivElement>(null);
  const bmrRef = useRef<HTMLDivElement>(null);
  const whrRef = useRef<HTMLDivElement>(null);

  const [bmiWeight, setBmiWeight] = useState<string>('');
  const [bmiHeight, setBmiHeight] = useState<string>('');
  const [bmiResult, setBmiResult] = useState<number | null>(null);

  const [bmrWeight, setBmrWeight] = useState<string>('');
  const [bmrHeight, setBmrHeight] = useState<string>('');
  const [bmrAge, setBmrAge] = useState<string>('');
  const [bmrGender, setBmrGender] = useState<'m' | 'f'>('m');
  const [bmrResult, setBmrResult] = useState<number | null>(null);

  const [waist, setWaist] = useState<string>('');
  const [hip, setHip] = useState<string>('');
  const [whrResult, setWhrResult] = useState<number | null>(null);

  const calculateBMI = () => {
    const w = parseFloat(bmiWeight);
    const h = parseFloat(bmiHeight) / 100;
    if (w && h) setBmiResult(Number((w / (h * h)).toFixed(1)));
  };

  const calculateBMR = () => {
    const w = parseFloat(bmrWeight);
    const h = parseFloat(bmrHeight);
    const a = parseFloat(bmrAge);
    if (w && h && a) {
      if (bmrGender === 'm') {
        setBmrResult(Math.round(88.362 + (13.397 * w) + (4.799 * h) - (5.677 * a)));
      } else {
        setBmrResult(Math.round(447.593 + (9.247 * w) + (3.098 * h) - (4.330 * a)));
      }
    }
  };

  const calculateWHR = () => {
    const w = parseFloat(waist);
    const h = parseFloat(hip);
    if (w && h) setWhrResult(Number((w / h).toFixed(2)));
  };

  const scrollTo = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20 animate-in fade-in duration-500">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-12">
           <Link to="/nutrition" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-emerald-600 transition-colors">
            <ArrowLeft size={16} /> Back to Nutrition
          </Link>
        </div>
        
        <header className="mb-20 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/5 border border-slate-900/10 mb-8 backdrop-blur-md">
            <Sparkles size={14} className="text-slate-900" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-900">Health Toolkit</span>
          </div>
          <h1 className="text-4xl md:text-7xl font-black text-slate-900 uppercase tracking-tighter mb-4 leading-none">Health <br/><span className="text-emerald-600">Trackers</span></h1>
          <p className="text-lg text-slate-500 font-medium leading-relaxed mb-16">
            Establishing a baseline is the first step toward improvement. Use these simple tools to understand your weight, metabolism, and body shape.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             {[
               { ref: bmiRef, icon: Ruler, label: "BMI", color: "emerald", desc: "Weight relative to height." },
               { ref: bmrRef, icon: Activity, label: "Metabolism", color: "blue", desc: "Energy you burn at rest." },
               { ref: whrRef, icon: Target, label: "Waist-to-Hip", color: "amber", desc: "Health risk by body shape." }
             ].map((cta, i) => (
               <button 
                 key={i}
                 onClick={() => scrollTo(cta.ref)} 
                 className="group p-8 bg-white border border-slate-200 rounded-[2.5rem] text-left hover:border-emerald-500 transition-all shadow-xl shadow-slate-200/50 flex flex-col items-start gap-4"
               >
                 <div className="p-4 bg-slate-50 text-slate-900 rounded-2xl group-hover:bg-emerald-600 group-hover:text-white transition-all">
                    <cta.icon size={28} />
                 </div>
                 <div>
                    <h4 className="font-black text-slate-900 uppercase text-xs tracking-widest mb-1">{cta.label}</h4>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{cta.desc}</p>
                 </div>
                 <div className="mt-4 text-[10px] font-black uppercase tracking-widest text-emerald-600 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                   Open Tracker <ArrowRight size={14} />
                 </div>
               </button>
             ))}
          </div>
        </header>

        <div className="space-y-48 mt-32">
          
          {/* BMI CALCULATOR */}
          <div ref={bmiRef} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
             <div className="space-y-6">
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl w-fit"><Ruler size={32} /></div>
                <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">Body Mass Index (BMI)</h2>
                <p className="text-slate-600 font-medium leading-relaxed">
                   A quick way to see if you're at a healthy weight for your height.
                </p>
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-4">
                  <div className="flex items-center gap-3 text-emerald-600">
                    <ShieldAlert size={18} />
                    <h4 className="text-[10px] font-black uppercase tracking-widest">Clinical Context</h4>
                  </div>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">
                    BMI is a primary indicator of <strong>Visceral Fat risks</strong>. While it doesn't know if your weight is muscle or fat, higher scores correlate strongly with adipose tissue around your organs, which increases pressure on your heart and can cause inflammation.
                  </p>
                </div>
             </div>
             <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-100 flex flex-col ring-8 ring-white">
                <div className="space-y-4 mb-8">
                  <input type="number" placeholder="Weight (kg)" className="w-full p-5 bg-slate-50 rounded-2xl border-none outline-none text-sm font-bold focus:ring-2 ring-emerald-500/20" value={bmiWeight} onChange={e => setBmiWeight(e.target.value)} />
                  <input type="number" placeholder="Height (cm)" className="w-full p-5 bg-slate-50 rounded-2xl border-none outline-none text-sm font-bold focus:ring-2 ring-emerald-500/20" value={bmiHeight} onChange={e => setBmiHeight(e.target.value)} />
                </div>
                <button onClick={calculateBMI} className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-emerald-600 transition-all">Check BMI</button>
                {bmiResult && (
                  <div className="mt-8 p-6 bg-emerald-50 rounded-3xl text-center border border-emerald-100 animate-in zoom-in duration-300">
                    <span className="text-[10px] uppercase font-black text-emerald-600 tracking-widest">Your Score</span>
                    <div className="text-5xl font-black text-emerald-900 mt-1">{bmiResult}</div>
                    <p className="text-xs font-bold text-emerald-700 mt-3 uppercase tracking-widest">
                      {bmiResult < 18.5 ? 'Underweight' : bmiResult < 25 ? 'Healthy Zone' : bmiResult < 30 ? 'Overweight' : 'Obese'}
                    </p>
                  </div>
                )}
             </div>
          </div>

          {/* BMR CALCULATOR */}
          <div ref={bmrRef} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
             <div className="lg:order-2 space-y-6">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl w-fit"><Activity size={32} /></div>
                <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">Basal Metabolic Rate (BMR)</h2>
                <p className="text-slate-600 font-medium leading-relaxed">
                   The number of calories your body burns just to keep you alive while you rest.
                </p>
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-4">
                  <div className="flex items-center gap-3 text-blue-600">
                    <Zap size={18} />
                    <h4 className="text-[10px] font-black uppercase tracking-widest">Metabolism & TDEE</h4>
                  </div>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">
                    BMR is the baseline for your <strong>Total Daily Energy Expenditure (TDEE)</strong>. By multiplying BMR by your activity level, you find your daily maintenance calories. Note: People with more <strong>Muscle Mass</strong> burn more at rest, as muscle is more metabolically active than fat.
                  </p>
                </div>
             </div>
             <div className="lg:order-1 bg-white p-10 rounded-[3rem] shadow-xl border border-slate-100 flex flex-col ring-8 ring-white">
                <div className="space-y-4 mb-8">
                  <div className="flex gap-2">
                    <button onClick={() => setBmrGender('m')} className={`flex-1 py-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${bmrGender === 'm' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-400'}`}>Male</button>
                    <button onClick={() => setBmrGender('f')} className={`flex-1 py-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${bmrGender === 'f' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-400'}`}>Female</button>
                  </div>
                  <input type="number" placeholder="Weight (kg)" className="w-full p-5 bg-slate-50 rounded-2xl border-none outline-none text-sm font-bold focus:ring-2 ring-blue-500/20" value={bmrWeight} onChange={e => setBmrWeight(e.target.value)} />
                  <input type="number" placeholder="Height (cm)" className="w-full p-5 bg-slate-50 rounded-2xl border-none outline-none text-sm font-bold focus:ring-2 ring-blue-500/20" value={bmrHeight} onChange={e => setBmrHeight(e.target.value)} />
                  <input type="number" placeholder="Age" className="w-full p-5 bg-slate-50 rounded-2xl border-none outline-none text-sm font-bold focus:ring-2 ring-blue-500/20" value={bmrAge} onChange={e => setBmrAge(e.target.value)} />
                </div>
                <button onClick={calculateBMR} className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-blue-600 transition-all">Check BMR</button>
                {bmrResult && (
                  <div className="mt-8 p-6 bg-blue-50 rounded-3xl text-center border border-blue-100 animate-in zoom-in duration-300">
                    <span className="text-[10px] uppercase font-black text-blue-600 tracking-widest">Base Burn</span>
                    <div className="text-4xl font-black text-blue-900 mt-1">{bmrResult} <span className="text-lg">kcal/day</span></div>
                  </div>
                )}
             </div>
          </div>

          {/* WHR CALCULATOR */}
          <div ref={whrRef} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
             <div className="space-y-6">
                <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl w-fit"><Target size={32} /></div>
                <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">Waist-to-Hip Ratio</h2>
                <p className="text-slate-600 font-medium leading-relaxed">
                   A superior way to track health risks compared to BMI as it focus on weight distribution.
                </p>
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-4">
                  <div className="flex items-center gap-3 text-amber-600">
                    <Heart size={18} />
                    <h4 className="text-[10px] font-black uppercase tracking-widest">Health Risks</h4>
                  </div>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">
                    Higher WHR scores are linked to <strong>Cardiovascular Disease</strong> and <strong>Type 2 Diabetes</strong>. <br/><br/>
                    <strong>Healthy Reference Zones:</strong><br/>
                    - Men: Below <strong>0.90</strong><br/>
                    - Women: Below <strong>0.85</strong><br/><br/>
                    Ratios above 1.0 (Men) or 0.86 (Women) indicate significantly higher health risks regardless of total weight.
                  </p>
                </div>
             </div>
             <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-100 flex flex-col ring-8 ring-white">
                <div className="space-y-4 mb-8">
                  <input type="number" placeholder="Waist size (cm)" className="w-full p-5 bg-slate-50 rounded-2xl border-none outline-none text-sm font-bold focus:ring-2 ring-amber-500/20" value={waist} onChange={e => setWaist(e.target.value)} />
                  <input type="number" placeholder="Hip size (cm)" className="w-full p-5 bg-slate-50 rounded-2xl border-none outline-none text-sm font-bold focus:ring-2 ring-amber-500/20" value={hip} onChange={e => setHip(e.target.value)} />
                </div>
                <button onClick={calculateWHR} className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-amber-600 transition-all">Check Ratio</button>
                {whrResult && (
                  <div className="mt-8 p-6 bg-amber-50 rounded-3xl text-center border border-amber-100 animate-in zoom-in duration-300">
                    <span className="text-[10px] uppercase font-black text-amber-600 tracking-widest">Your Ratio</span>
                    <div className="text-5xl font-black text-amber-900 mt-1">{whrResult}</div>
                    <p className="text-xs font-bold text-amber-700 mt-3 uppercase tracking-widest">
                      {whrResult < 0.85 ? 'Healthy Balance' : whrResult < 0.95 ? 'Moderate Risk' : 'High Alert'}
                    </p>
                  </div>
                )}
             </div>
          </div>

        </div>

        <div className="mt-32 p-10 bg-slate-900 text-white rounded-[4rem] flex flex-col md:flex-row items-center gap-8 border-t-8 border-emerald-500 shadow-2xl">
           <AlertCircle className="text-emerald-400 shrink-0" size={48} />
           <div>
              <h3 className="text-xl font-black uppercase tracking-tight mb-2">A Friendly Reminder</h3>
              <p className="text-slate-400 text-sm leading-relaxed font-medium">
                These calculations are tools for self-awareness, not a replacement for clinical advice. Individual factors like muscle density and genetics can shift your results. Always talk to a health pro for a full picture.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Calculators;
