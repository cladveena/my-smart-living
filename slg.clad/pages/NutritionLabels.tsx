import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, Search, Eye, AlertTriangle, ShieldCheck, Scale, 
  ArrowDown, Info, HelpCircle, CheckCircle2, FlaskConical, 
  X, Microscope, Beaker, Zap, Fingerprint, ExternalLink,
  Target, Calculator, Layers, ClipboardList, AlertCircle, Droplets
} from 'lucide-react';

interface GlossaryItem {
  name: string;
  role: string;
  category: 'Sweetener' | 'Preservative' | 'Emulsifier' | 'Flavor' | 'Color';
  tier: 'Primary' | 'Secondary' | 'Minor';
  description: string;
  commonUses: string[];
  healthImpact: string;
}

const GLOSSARY_DATA: GlossaryItem[] = [
  {
    name: "Maltodextrin",
    role: "Thickener / Sweetener",
    category: "Sweetener",
    tier: "Secondary",
    description: "A highly processed white powder usually made from corn, rice, potato starch, or wheat.",
    commonUses: ["Protein shakes", "Snack foods", "Salad dressings", "Instant puddings"],
    healthImpact: "Extremely high Glycemic Index (106-136). Can cause rapid blood sugar spikes and may alter gut bacteria composition."
  },
  {
    name: "Sodium Benzoate",
    role: "Preservative",
    category: "Preservative",
    tier: "Minor",
    description: "The sodium salt of benzoic acid, used to inhibit the growth of potentially harmful bacteria, mold, and other microbes.",
    commonUses: ["Carbonated drinks", "Fruit juices", "Pickles", "Salad dressings"],
    healthImpact: "When combined with Vitamin C (Ascorbic Acid), it can form Benzene, a known carcinogen. May increase hyperactivity in children."
  },
  {
    name: "Soy Lecithin",
    role: "Emulsifier",
    category: "Emulsifier",
    tier: "Secondary",
    description: "A fatty substance extracted from soybeans, used to keep oils and water mixed together.",
    commonUses: ["Chocolate", "Baked goods", "Infant formula", "Non-stick sprays"],
    healthImpact: "Generally safe, but mostly derived from genetically modified soy. Some studies suggest it may impact gut mucosal lining in high doses."
  },
  {
    name: "Carrageenan",
    role: "Thickener / Stabilizer",
    category: "Emulsifier",
    tier: "Secondary",
    description: "An additive derived from red seaweed, used to thicken and preserve foods and drinks.",
    commonUses: ["Almond milk", "Ice cream", "Cottage cheese", "Deli meats"],
    healthImpact: "Linked to digestive inflammation, bloating, and potential irritable bowel syndrome (IBS) triggers in sensitive individuals."
  },
  {
    name: "Aspartame",
    role: "Artificial Sweetener",
    category: "Sweetener",
    tier: "Minor",
    description: "A low-calorie artificial sweetener approximately 200 times sweeter than sucrose.",
    commonUses: ["Diet sodas", "Sugar-free gum", "Cereal", "Yogurt"],
    healthImpact: "Highly controversial. While deemed safe by many agencies, some researchers suggest links to metabolic disruption and altered appetite regulation."
  },
  {
    name: "MSG (Monosodium Glutamate)",
    role: "Flavor Enhancer",
    category: "Flavor",
    tier: "Minor",
    description: "The sodium salt of glutamic acid, an amino acid, used to enhance 'umami' or savory flavor.",
    commonUses: ["Frozen dinners", "Canned soups", "Fast food", "Seasoning blends"],
    healthImpact: "May cause 'MSG Symptom Complex' in sensitive individuals (headaches, sweating, flushing). Some evidence suggests it impacts neuro-signaling."
  }
];

const DECODING_FRAMEWORK = [
  {
    id: "serving",
    title: "Serving Size Logic",
    subtitle: "The Multiplication Trap",
    icon: Calculator,
    color: "emerald",
    protocol: "Always multiply the 'Per Serving' numbers by the 'Servings Per Container' to see the true nutritional cost of the entire pack.",
    detail: "Manufacturers often use unrealistically small serving sizes (e.g., 2 cookies) to make high calorie/sugar counts look manageable. If you plan to eat the whole bag, you must do the math yourself.",
    checkpoints: [
      "Check 'Servings Per Container' at the very top.",
      "Identify the weight of one serving (e.g., 28g).",
      "Multiply Calories/Sugar by the total servings."
    ]
  },
  {
    id: "sugar",
    title: "Sugar Saboteurs",
    subtitle: "Added vs. Natural",
    icon: FlaskConical,
    color: "rose",
    protocol: "Focus exclusively on 'Added Sugars'. Natural sugars in fruit/milk are usually packaged with fiber or protein which slows absorption.",
    detail: "Added sugars provide 'empty' calories that spike insulin and lead to energy crashes. Aim for less than 5g per serving for snacks, and avoid products where sugar is in the first 3 ingredients.",
    checkpoints: [
      "Target: < 5g Added Sugar per serving.",
      "Check for aliases: Maltodextrin, Corn Syrup, Dextrose.",
      "Ignore 'Natural' claims on the front of the pack."
    ]
  },
  {
    id: "dv",
    title: "The 5/20 Rule",
    subtitle: "% Daily Value Mastery",
    icon: Target,
    color: "blue",
    protocol: "The %DV tells you if a serving is high or low in a specific nutrient based on a 2,000-calorie diet.",
    detail: "This is the fastest way to screen a product. Look for 5% or less in 'Bad' nutrients (Sodium, Saturated Fat) and 20% or more in 'Good' nutrients (Fiber, Vitamin D, Iron).",
    checkpoints: [
      "5% or less = LOW (Good for Sodium/Sugar).",
      "20% or more = HIGH (Good for Fiber/Protein).",
      "Adjust based on your specific BMR and activity."
    ]
  },
  {
    id: "forensic",
    title: "Ingredient Forensic",
    subtitle: "The Grade 3 Test",
    icon: Microscope,
    color: "amber",
    protocol: "The shorter the list, the closer it is to real food. If a 3rd grader can't pronounce it, your body likely won't recognize it.",
    detail: "Ingredients are listed by weight. If the first three ingredients are refined grains, sugars, or industrial oils, the product is 'Ultra-Processed' and should be consumed sparingly.",
    checkpoints: [
      "First 3 ingredients define the product quality.",
      "Look for 'Whole' vs 'Refined' markers.",
      "Spot industrial markers: Lecithin, Gums, BHA/BHT."
    ]
  }
];

const NutritionLabels: React.FC = () => {
  const [selectedIngredient, setSelectedIngredient] = useState<GlossaryItem | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredGlossary = GLOSSARY_DATA.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white pb-20 animate-in fade-in duration-500 relative">
      
      {/* GLOSSARY MODAL */}
      {selectedIngredient && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white rounded-[3rem] shadow-3xl w-full max-w-2xl overflow-hidden relative border border-slate-100 animate-in zoom-in slide-in-from-bottom-8 duration-500">
            <button 
              onClick={() => setSelectedIngredient(null)}
              className="absolute top-8 right-8 p-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-slate-500 transition-colors z-10"
            >
              <X size={20} />
            </button>
            
            <div className="p-12 md:p-16">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl">
                  <Microscope size={32} />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500">{selectedIngredient.category} • Tier {selectedIngredient.tier}</span>
                  <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">{selectedIngredient.name}</h3>
                </div>
              </div>

              <div className="space-y-10">
                <section>
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
                    <Fingerprint size={12} /> Technical Profile
                  </h4>
                  <p className="text-slate-700 font-medium leading-relaxed">{selectedIngredient.description}</p>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <section className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-blue-600 mb-4 flex items-center gap-2">
                      <Zap size={12} /> Processing Roles
                    </h4>
                    <ul className="space-y-2">
                      {selectedIngredient.commonUses.map((use, i) => (
                        <li key={i} className="text-xs font-bold text-slate-600 flex gap-2 items-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-400" /> {use}
                        </li>
                      ))}
                    </ul>
                  </section>

                  <section className="bg-rose-50 p-6 rounded-3xl border border-rose-100">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-rose-600 mb-4 flex items-center gap-2">
                      <Beaker size={12} /> Clinical Impact
                    </h4>
                    <p className="text-xs font-bold text-rose-900 leading-relaxed italic">
                      {selectedIngredient.healthImpact}
                    </p>
                  </section>
                </div>

                <div className="pt-8 border-t border-slate-100 flex justify-between items-center">
                  <div className="text-[10px] text-slate-400 font-medium italic">Source: Peer-reviewed nutritional guidelines</div>
                  <button onClick={() => setSelectedIngredient(null)} className="px-8 py-3 bg-slate-900 text-white rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-emerald-600 transition-all">Close Entry</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-12">
        <Link to="/nutrition" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-emerald-600 mb-12 transition-colors">
          <ArrowLeft size={16} /> Back to Hub
        </Link>
        
        <header className="mb-20">
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 uppercase tracking-tighter mb-4">Decoding Food Labels</h1>
          <p className="text-xl text-slate-500 font-medium max-w-3xl leading-relaxed">
            The ingredient list is the most honest part of a food package. Learn to look past the marketing claims and understand exactly what you are consuming.
          </p>
        </header>

        {/* PROFESSIONAL DECODING FRAMEWORK */}
        <section className="mb-32">
          <div className="flex items-center gap-4 mb-12">
            <div className="p-3 bg-slate-900 text-white rounded-2xl"><Layers size={24} /></div>
            <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">Professional Decoding Framework</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {DECODING_FRAMEWORK.map((card) => (
              <div key={card.id} className="bg-slate-50 rounded-[4rem] border border-slate-100 overflow-hidden flex flex-col group hover:shadow-2xl hover:bg-white hover:-translate-y-2 transition-all duration-500">
                <div className="p-10 md:p-12 space-y-8 flex-grow">
                  <div className="flex justify-between items-start">
                    <div className={`p-5 rounded-3xl bg-${card.color}-50 text-${card.color}-600 group-hover:bg-${card.color}-600 group-hover:text-white transition-all shadow-sm`}>
                      <card.icon size={32} />
                    </div>
                    <span className={`text-[10px] font-black uppercase tracking-[0.3em] px-4 py-1.5 rounded-full bg-${card.color}-100 text-${card.color}-700`}>
                      {card.subtitle}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-4">{card.title}</h3>
                    <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm mb-6">
                      <span className={`text-[9px] font-black uppercase tracking-widest text-${card.color}-600 block mb-2`}>The Protocol</span>
                      <p className="text-sm font-bold text-slate-800 leading-relaxed">{card.protocol}</p>
                    </div>
                    <p className="text-sm text-slate-500 font-medium leading-relaxed">{card.detail}</p>
                  </div>

                  <div className={`pt-8 border-t border-${card.color}-100`}>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
                      <ClipboardList size={14} /> Grocery Checklist
                    </h4>
                    <div className="space-y-3">
                      {card.checkpoints.map((check, i) => (
                        <div key={i} className="flex gap-4 items-center bg-white/50 p-3 rounded-2xl border border-slate-100">
                          <CheckCircle2 size={16} className={`text-${card.color}-500 shrink-0`} />
                          <span className="text-[11px] font-bold text-slate-700">{check}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className={`bg-${card.color}-500 h-2 w-full mt-auto opacity-30 group-hover:opacity-100 transition-opacity`} />
              </div>
            ))}
          </div>

          <div className="mt-16 p-8 bg-rose-50 rounded-[3rem] border border-rose-100 flex items-start gap-6">
            <AlertCircle className="text-rose-500 shrink-0 mt-1" size={24} />
            <p className="text-sm text-rose-800 font-medium leading-relaxed">
              <strong>Forensic Alert:</strong> Manufacturers frequently update labels. Even if a product was 'clean' last month, always perform a quick 5-second check of the first three ingredients before adding it to your cart.
            </p>
          </div>
        </section>

        {/* ORDER OF WEIGHT VISUAL GUIDE */}
        <section className="mb-32" id="visual-guide">
          <div className="flex justify-between items-center mb-10">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-emerald-100 text-emerald-600 rounded-2xl"><Scale size={24} /></div>
              <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">The "Order of Weight" Visual Guide</h2>
            </div>
            <button 
              onClick={() => document.getElementById('glossary-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="hidden md:flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 px-5 py-2.5 rounded-xl hover:bg-emerald-100 transition-all"
            >
              Open Ingredient Library <ArrowDown size={14} />
            </button>
          </div>
          
          <div className="bg-slate-50 p-8 md:p-16 rounded-[4rem] border border-slate-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none text-slate-200">
              <ArrowDown size={300} />
            </div>
            
            <div className="max-w-4xl mx-auto">
              <p className="text-slate-600 font-medium text-center mb-16 text-lg">
                Ingredients are listed in descending order by weight. Hover over each rank to see its physiological impact and role.
              </p>
              
              <div className="space-y-6 relative">
                {/* Visual Scale Logic - Primary */}
                <div className="relative group">
                  <div className="flex items-center gap-6">
                    <div className="w-24 h-24 bg-emerald-600 text-white rounded-3xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform cursor-help">
                      <Scale size={32} strokeWidth={2.5} />
                    </div>
                    <div className="flex-grow h-24 bg-white rounded-3xl border-2 border-emerald-100 flex items-center px-8 shadow-sm group-hover:border-emerald-500 transition-colors">
                      <div>
                        <h4 className="font-black text-slate-900 uppercase text-sm tracking-tight flex items-center gap-2">
                          Primary Ingredient (70-90%) <HelpCircle size={14} className="text-emerald-400" />
                        </h4>
                        <p className="text-xs text-slate-500">The bulk of the product. Usually a whole grain, water, or milk.</p>
                      </div>
                    </div>
                  </div>
                  <div className="absolute left-0 -top-24 md:left-full md:top-0 md:ml-6 w-full md:w-64 bg-slate-900 text-white p-6 rounded-3xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20 shadow-2xl">
                    <h5 className="text-[10px] font-black uppercase text-emerald-400 mb-2 tracking-widest">Physiological Role</h5>
                    <p className="text-[11px] leading-relaxed">This ingredient determines the majority of the caloric density and fiber content. It forms the base of your nutritional intake for this meal.</p>
                  </div>
                </div>

                <div className="flex justify-center py-1">
                  <ArrowDown className="text-slate-200" size={32} strokeWidth={3} />
                </div>

                {/* Visual Scale Logic - Secondary */}
                <div className="relative group">
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 bg-blue-500 text-white rounded-3xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform cursor-help">
                      <FlaskConical size={28} strokeWidth={2.5} />
                    </div>
                    <div className="flex-grow h-20 bg-white rounded-3xl border-2 border-blue-50 flex items-center px-8 shadow-sm group-hover:border-blue-500 transition-colors">
                       <div>
                          <h4 className="font-black text-slate-900 uppercase text-sm tracking-tight flex items-center gap-2">
                            Secondary Support (5-20%) <HelpCircle size={14} className="text-blue-400" />
                          </h4>
                          <p className="text-xs text-slate-500">Flavorings, oils, or binders. Sugar often hides here!</p>
                       </div>
                    </div>
                  </div>
                  <div className="absolute left-0 -top-24 md:left-full md:top-0 md:ml-6 w-full md:w-64 bg-slate-900 text-white p-6 rounded-3xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20 shadow-2xl">
                    <h5 className="text-[10px] font-black uppercase text-blue-400 mb-2 tracking-widest">Impact Check</h5>
                    <p className="text-[11px] leading-relaxed">Ingredients in this tier can significantly alter the health profile. Watch for inflammatory oils (seed oils) or added sugars that spike insulin levels.</p>
                  </div>
                </div>

                <div className="flex justify-center py-1">
                  <ArrowDown className="text-slate-200" size={24} strokeWidth={3} />
                </div>

                {/* Visual Scale Logic - Minor */}
                <div className="relative group">
                  <div className="flex items-center gap-6 opacity-60 hover:opacity-100 transition-opacity">
                    <div className="w-16 h-16 bg-amber-500 text-white rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform cursor-help">
                      <Droplets size={24} strokeWidth={2.5} />
                    </div>
                    <div className="flex-grow h-16 bg-white rounded-3xl border-2 border-amber-50 flex items-center px-8 group-hover:border-amber-500 transition-all">
                       <div className="flex items-center gap-2">
                         <h4 className="font-black text-slate-900 uppercase text-xs tracking-tight">
                           Minor Additives ({"<"} 5%)
                         </h4>
                         <HelpCircle size={12} className="text-amber-400" />
                       </div>
                    </div>
                  </div>
                  <div className="absolute left-0 -top-24 md:left-full md:top-0 md:ml-6 w-full md:w-64 bg-slate-900 text-white p-6 rounded-3xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20 shadow-2xl">
                    <h5 className="text-[10px] font-black uppercase text-amber-400 mb-2 tracking-widest">The Fine Print</h5>
                    <p className="text-[11px] leading-relaxed">Contains preservatives, synthetic vitamins (fortification), and artificial colors. While small in quantity, cumulative exposure to some additives can affect gut microbiome health.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* INTERACTIVE INGREDIENT GLOSSARY */}
        <section className="mb-32" id="glossary-section">
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-blue-100 text-blue-600 rounded-2xl"><FlaskConical size={24} /></div>
              <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">Ingredient Forensic Library</h2>
            </div>
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="relative flex-grow w-full">
                <Search size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search additives (e.g., Maltodextrin, MSG)..." 
                  className="w-full pl-16 pr-8 py-5 bg-slate-50 border-none rounded-[2rem] text-sm font-bold text-slate-700 focus:ring-2 ring-blue-500/20"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 bg-slate-100 px-6 py-5 rounded-[2rem] shrink-0">
                {filteredGlossary.length} Entries Available
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGlossary.map((item, idx) => (
              <button 
                key={idx}
                onClick={() => setSelectedIngredient(item)}
                className="group p-8 bg-white border border-slate-100 rounded-[2.5rem] text-left hover:border-blue-500 hover:shadow-2xl hover:shadow-blue-500/10 transition-all flex flex-col items-start gap-4 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Fingerprint size={80} />
                </div>
                <div className="flex justify-between w-full items-start">
                  <div className="p-3 bg-slate-50 text-slate-900 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <Microscope size={20} />
                  </div>
                  <span className={`text-[8px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full ${
                    item.tier === 'Primary' ? 'bg-emerald-100 text-emerald-600' : 
                    item.tier === 'Secondary' ? 'bg-amber-100 text-amber-600' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {item.tier} Tier
                  </span>
                </div>
                <div>
                  <h4 className="font-black text-slate-900 uppercase text-xs tracking-widest mb-1">{item.name}</h4>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{item.role}</p>
                </div>
                <div className="mt-4 flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-blue-600">
                  Analyze Details <ExternalLink size={12} />
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Global Overview Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
           <div className="flex flex-col gap-8">
              <div className="relative group rounded-[4rem] overflow-hidden shadow-2xl border-8 border-white flex-grow h-[300px]">
                <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt="Label reading" />
                <div className="absolute inset-0 bg-blue-600/20 mix-blend-multiply"></div>
                <div className="absolute bottom-10 left-10 right-10 p-8 bg-white/95 backdrop-blur-md rounded-[2.5rem] shadow-2xl">
                   <h4 className="text-xl font-black text-slate-900 uppercase tracking-tighter mb-2">The Many Aliases of Sugar</h4>
                   <p className="text-[11px] text-slate-500 font-bold uppercase tracking-widest leading-relaxed">
                     Manufacturers use 50+ names for sugar. Watch for: Corn Syrup, Maltodextrin, Dextrose, Fruit Juice Concentrate, Maltose, Agave Nectar, Sucrose, and Cane Evaporated Juice.
                   </p>
                </div>
              </div>

              <div className="bg-emerald-900 p-10 rounded-[3.5rem] text-white shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                   <ShieldCheck size={120} />
                </div>
                <h4 className="text-lg font-black uppercase tracking-tighter mb-4 text-emerald-400">Golden Rule of Labeling</h4>
                <p className="text-sm text-slate-300 leading-relaxed italic mb-6">
                  "If the product has more than 5 ingredients or contains words a 3rd grader can't pronounce, it's likely an ultra-processed food designed for shelf-life, not your-life."
                </p>
                <div className="flex items-center gap-4">
                   <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center font-black text-xs">A.I</div>
                   <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">System Recommendation: Prioritize Unpackaged Produce</span>
                </div>
              </div>
           </div>

           <div className="bg-slate-900 p-12 md:p-20 rounded-[5rem] text-white shadow-3xl">
              <div className="max-w-4xl">
                 <div className="flex items-center gap-6 mb-12">
                    <div className="p-4 bg-amber-500 rounded-3xl text-slate-900 shadow-xl shadow-amber-500/20">
                      <AlertTriangle size={32} />
                    </div>
                    <h2 className="text-4xl font-black uppercase tracking-tighter">Toxicological Red Flags</h2>
                 </div>

                 <div className="grid grid-cols-1 gap-12">
                    <div className="space-y-4">
                       <h4 className="font-black text-emerald-400 uppercase text-xs tracking-[0.2em] mb-4 border-b border-emerald-400/20 pb-2">Ultra-Processed Markers</h4>
                       <p className="text-sm text-slate-400 leading-relaxed font-medium">
                         Watch for <span className="text-white">Emulsifiers</span> (Lecithin, Polysorbates) and <span className="text-white">Artificial Thickeners</span> (Carrageenan, Xanthan Gum). These can disrupt the protective mucosal lining of the gut and may trigger chronic low-grade inflammation.
                       </p>
                    </div>
                    <div className="space-y-4">
                       <h4 className="font-black text-emerald-400 uppercase text-xs tracking-[0.2em] mb-4 border-b border-emerald-400/20 pb-2">Chemical Preservatives</h4>
                       <p className="text-sm text-slate-400 leading-relaxed font-medium">
                         Avoid <span className="text-white">Sodium Nitrite</span> (found in processed meats) and <span className="text-white">BHA/BHT</span>. These chemicals are added to prevent oxidation and color loss but have been linked in various studies to endocrine disruption.
                       </p>
                    </div>
                    <div className="space-y-4">
                       <h4 className="font-black text-rose-400 uppercase text-xs tracking-[0.2em] mb-4 border-b border-rose-400/20 pb-2">Artificial Sweeteners</h4>
                       <p className="text-sm text-slate-400 leading-relaxed font-medium">
                         <span className="text-white">Aspartame, Sucralose, and Acesulfame K</span> might have zero calories, but they can negatively alter gut bacteria and maintain your psychological craving for hyper-sweet foods.
                       </p>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Toxicological Bottom Bar */}
        <section className="bg-slate-50 p-12 md:p-20 rounded-[5rem] border border-slate-100">
           <div className="max-w-4xl mx-auto">
              <div className="mt-0 p-8 bg-white rounded-[3rem] border border-slate-200 flex flex-col md:flex-row items-center gap-8 group">
                 <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center shrink-0 shadow-2xl group-hover:scale-110 transition-transform">
                    <ShieldCheck size={32} className="text-slate-900" />
                 </div>
                 <div>
                    <h5 className="font-black uppercase text-xs tracking-widest mb-2">Final Protocol: The Front is for Selling, The Back is for Telling</h5>
                    <p className="text-sm text-slate-400 italic font-medium">
                      "Ignore phrases like 'Natural', 'Healthy', or 'Good Source Of'. These are unregulated marketing terms. Your health is determined by the small black print on the back, not the colorful graphics on the front."
                    </p>
                 </div>
              </div>
           </div>
        </section>
      </div>
    </div>
  );
};

export default NutritionLabels;
