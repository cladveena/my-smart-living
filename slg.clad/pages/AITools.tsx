import React, { useState, useRef, useEffect } from 'react';
import { suggestMeals, generateSmartGroceryList, analyzeLabel, generateHealthInsight, generateWeeklyMealPlan, LabelAnalysisResult, WeeklyMealPlan } from '../geminiService';
import { 
  Utensils, Search, Activity, ShoppingCart, 
  Sparkles, Trash2, Copy, CheckCircle2, 
  Wand2, Loader2, AlertTriangle, ListChecks,
  Upload, XCircle, FileSearch,
  Battery, Moon, Coffee, Droplets, Dumbbell, Zap, Heart,
  Clock, Gauge, ChevronRight, Plus, ChefHat, Wind,
  Layers, Shield, Cpu, Globe, ClipboardCheck,
  ZapOff, Eye, Scan, RotateCw, Settings2, Scale, FlaskConical, Filter,
  ArrowLeft, Type as TypeIcon, Info, Fingerprint, Microscope, ShieldCheck,
  ClipboardList, Beaker, Zap as ZapIcon, Target, FlameKindling, Milk, Scale as ScaleIcon,
  CalendarDays, UserCircle2, Users2, Timer
} from 'lucide-react';

type Day = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';
type MealType = 'Breakfast' | 'Lunch' | 'Dinner' | 'Snacks';

const DAYS: Day[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const MEAL_TYPES: MealType[] = ['Breakfast', 'Lunch', 'Dinner', 'Snacks'];

interface MealSuggestion {
  name: string;
  description: string;
  prepTime: string;
  difficulty: string;
  ingredients: string[];
  instructions: string[];
}

interface ManualIngredient {
  name: string;
  percentage: string;
}

const HEALTH_CATEGORIES = [
  { id: 'sleep', label: 'Sleep Quality', icon: Moon, options: ['Exhausted', 'Tired', 'Rested', 'Great'] },
  { id: 'energy', label: 'Energy Levels', icon: Battery, options: ['V. Low', 'Low', 'Mod', 'High'] },
  { id: 'food', label: 'Food Balance', icon: Coffee, options: ['Junk', 'Avg', 'Good', 'Clean'] },
  { id: 'water', label: 'Hydration', icon: Droplets, options: ['Dehyd', 'Poor', 'Avg', 'Good'] },
  { id: 'activity', label: 'Movement', icon: Dumbbell, options: ['Sedent', 'Light', 'Active', 'Pro'] },
  { id: 'stress', label: 'Stress', icon: Zap, options: ['Peak', 'High', 'Mod', 'Calm'] },
  { id: 'mood', label: 'Mood', icon: Heart, options: ['Down', 'Anx', 'Stable', 'Happy'] }
];

type MealCategory = 'no-cook' | 'available-ingredients' | 'less-than-5' | 'smoothies' | 'goal-based' | null;

const AITools: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'meal' | 'label' | 'health' | 'grocery' | 'planner' | null>('meal');
  const containerRef = useRef<HTMLDivElement>(null);

  // Meal Tool State & Caching
  const [mealCategory, setMealCategory] = useState<MealCategory>(null);
  const [mealGoal, setMealGoal] = useState<'weight-gain' | 'weight-loss' | null>(null);
  const [mealPref, setMealPref] = useState('');
  const [availableIngredients, setAvailableIngredients] = useState('');
  const [meals, setMeals] = useState<MealSuggestion[]>([]);
  const [loadingMeals, setLoadingMeals] = useState(false);
  const [mealCache, setMealCache] = useState<Record<string, MealSuggestion[]>>({});

  // Label Reader State
  const [labelText, setLabelText] = useState('');
  const [labelImage, setLabelImage] = useState<{ data: string, mimeType: string } | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [labelResult, setLabelResult] = useState<LabelAnalysisResult | null>(null);
  const [loadingLabel, setLoadingLabel] = useState(false);
  const [isPreprocessing, setIsPreprocessing] = useState(false);
  const [isEnhanced, setIsEnhanced] = useState(true);
  const [imageRotation, setImageRotation] = useState(0); 
  const [manualIngredients, setManualIngredients] = useState<ManualIngredient[]>([]);
  const [newIngredientName, setNewIngredientName] = useState('');
  const [newIngredientPercent, setNewIngredientPercent] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Health/Grocery State
  const [planner, setPlanner] = useState<Record<string, string>>({});
  const [groceryOutput, setGroceryOutput] = useState('');
  const [loadingGrocery, setLoadingGrocery] = useState(false);
  const [copied, setCopied] = useState(false);
  const [reflections, setReflections] = useState<Record<string, string>>({});
  const [healthInsight, setHealthInsight] = useState('');
  const [loadingHealth, setLoadingHealth] = useState(false);

  // Smart Meal Planner State
  const [plannerConfig, setPlannerConfig] = useState({
    diet: 'Balanced',
    skill: 'Basic',
    budget: 'Moderate',
    mealsPerDay: 3,
    people: 1,
    timeAvailable: 30
  });
  const [weeklyPlan, setWeeklyPlan] = useState<WeeklyMealPlan | null>(null);
  const [loadingPlanner, setLoadingPlanner] = useState(false);
  const [activePlannerDay, setActivePlannerDay] = useState(1);

  const preprocessImage = async (dataUrl: string, rotation: number): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return resolve(dataUrl.split(',')[1]);

        const MAX_WIDTH = 1600;
        let width = img.width;
        let height = img.height;
        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width;
          width = MAX_WIDTH;
        }

        const angleInRad = (rotation * Math.PI) / 180;
        const absCos = Math.abs(Math.cos(angleInRad));
        const absSin = Math.abs(Math.sin(angleInRad));
        const finalWidth = width * absCos + height * absSin;
        const finalHeight = width * absSin + height * absCos;
        canvas.width = finalWidth;
        canvas.height = finalHeight;

        ctx.translate(finalWidth / 2, finalHeight / 2);
        ctx.rotate(angleInRad);
        
        if (isEnhanced) {
          ctx.filter = 'grayscale(100%) contrast(1.8) brightness(1.1)';
        }

        ctx.drawImage(img, -width / 2, -height / 2, width, height);
        resolve(canvas.toDataURL('image/jpeg', 0.85).split(',')[1]);
      };
      img.src = dataUrl;
    });
  };

  useEffect(() => {
    if (imagePreview) {
      handleImageReprocess();
    }
  }, [imageRotation, isEnhanced]);

  const handleImageReprocess = async () => {
    if (!imagePreview) return;
    setIsPreprocessing(true);
    const processedBase64 = await preprocessImage(imagePreview, imageRotation);
    setLabelImage({ data: processedBase64, mimeType: 'image/jpeg' });
    setIsPreprocessing(false);
  };

  const handleMealSuggest = async () => {
    if (!mealCategory) return;
    
    const prefString = mealCategory === 'goal-based' 
      ? `${mealGoal || 'General Balance'} goal, ${mealPref}`
      : mealPref;
    
    const cacheKey = `${mealCategory}-${prefString}-${availableIngredients.trim().toLowerCase()}`;
    if (mealCache[cacheKey]) {
      setMeals(mealCache[cacheKey]);
      return;
    }

    setLoadingMeals(true);
    setMeals([]);
    try {
      const res = await suggestMeals(mealCategory, prefString, availableIngredients.trim());
      const fetchedMeals = res.meals || [];
      setMeals(fetchedMeals);
      setMealCache(prev => ({ ...prev, [cacheKey]: fetchedMeals }));
    } catch (error) {
      console.error(error);
    }
    setLoadingMeals(false);
  };

  const handleAnalyzeLabel = async () => {
    if (!labelText && !labelImage && manualIngredients.length === 0) return;
    setLoadingLabel(true);
    try {
      const res = await analyzeLabel(
        labelText || undefined, 
        labelImage || undefined, 
        manualIngredients
      );
      setLabelResult(res);
    } catch (error) {
      setLabelResult(null);
    }
    setLoadingLabel(false);
  };

  const handleHealthReflection = async () => {
    if (Object.keys(reflections).length < HEALTH_CATEGORIES.length) return;
    setLoadingHealth(true);
    try {
      const res = await generateHealthInsight(reflections);
      setHealthInsight(res);
    } catch (error) {
      console.error("Analysis error:", error);
    }
    setLoadingHealth(false);
  };

  const handleGenerateWeeklyPlan = async () => {
    setLoadingPlanner(true);
    try {
      const res = await generateWeeklyMealPlan(plannerConfig);
      setWeeklyPlan(res);
      setActivePlannerDay(1);
    } catch (error) {
      console.error("Planner error:", error);
    }
    setLoadingPlanner(false);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsPreprocessing(true);
      const reader = new FileReader();
      reader.onloadend = async () => {
        const rawDataUrl = reader.result as string;
        setImagePreview(rawDataUrl);
        setImageRotation(0); 
        const processedBase64 = await preprocessImage(rawDataUrl, 0);
        setLabelImage({ data: processedBase64, mimeType: 'image/jpeg' });
        setIsPreprocessing(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const addManualIngredient = () => {
    if (newIngredientName && newIngredientPercent) {
      setManualIngredients([...manualIngredients, { name: newIngredientName, percentage: newIngredientPercent }]);
      setNewIngredientName('');
      setNewIngredientPercent('');
    }
  };

  const removeManualIngredient = (index: number) => {
    setManualIngredients(manualIngredients.filter((_, i) => i !== index));
  };

  const handleGenerateGrocery = async () => {
    setLoadingGrocery(true);
    try {
      const plan = JSON.stringify(planner);
      const res = await generateSmartGroceryList(plan);
      setGroceryOutput(res);
    } catch (error) {
      console.error(error);
    }
    setLoadingGrocery(false);
  };

  const setRating = (catId: string, value: string) => {
    setReflections(prev => ({ ...prev, [catId]: value }));
  };

  return (
    <div ref={containerRef} className="max-w-7xl mx-auto px-4 py-12 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-black text-slate-900 uppercase tracking-tighter mb-2">AI Health & Utility <span className="text-emerald-600">Suite</span></h1>
          <p className="text-slate-500 font-medium">Professional-grade analysis tools for your daily wellness journey.</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-12">
        {[
          { id: 'meal', label: 'Meal Suggest', icon: ChefHat },
          { id: 'planner', label: 'AI Meal Planner', icon: CalendarDays },
          { id: 'label', label: 'Label Reader', icon: Scan },
          { id: 'health', label: 'Wellness Insight', icon: Heart },
          { id: 'grocery', label: 'Grocery Smart', icon: ShoppingCart }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-3 px-6 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all ${
              activeTab === tab.id ? 'bg-slate-900 text-white shadow-xl' : 'bg-white text-slate-400 hover:bg-slate-50 border border-slate-100'
            }`}
          >
            <tab.icon size={18} />
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'planner' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 animate-in slide-in-from-bottom-8 duration-700">
          <div className="lg:col-span-1">
            <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl space-y-8 sticky top-24">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                <Settings2 size={14} /> Plan Configuration
              </h3>
              
              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">Diet Type</label>
                  <select 
                    value={plannerConfig.diet}
                    onChange={(e) => setPlannerConfig({...plannerConfig, diet: e.target.value})}
                    className="w-full p-4 bg-slate-50 rounded-xl border-none outline-none text-xs font-bold focus:ring-2 ring-emerald-500/20"
                  >
                    <option>Balanced</option>
                    <option>Vegetarian</option>
                    <option>Non-Vegetarian</option>
                    <option>High Protein</option>
                    <option>Low Carb</option>
                  </select>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">Cooking Skill</label>
                  <select 
                    value={plannerConfig.skill}
                    onChange={(e) => setPlannerConfig({...plannerConfig, skill: e.target.value})}
                    className="w-full p-4 bg-slate-50 rounded-xl border-none outline-none text-xs font-bold focus:ring-2 ring-emerald-500/20"
                  >
                    <option>Beginner</option>
                    <option>Basic</option>
                    <option>Advanced</option>
                  </select>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">Budget Tier</label>
                  <select 
                    value={plannerConfig.budget}
                    onChange={(e) => setPlannerConfig({...plannerConfig, budget: e.target.value})}
                    className="w-full p-4 bg-slate-50 rounded-xl border-none outline-none text-xs font-bold focus:ring-2 ring-emerald-500/20"
                  >
                    <option>Economical</option>
                    <option>Moderate</option>
                    <option>Premium</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">Meals/Day</label>
                    <input 
                      type="number" min="1" max="5"
                      value={plannerConfig.mealsPerDay}
                      onChange={(e) => setPlannerConfig({...plannerConfig, mealsPerDay: parseInt(e.target.value)})}
                      className="w-full p-4 bg-slate-50 rounded-xl border-none outline-none text-xs font-bold focus:ring-2 ring-emerald-500/20"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">People</label>
                    <input 
                      type="number" min="1"
                      value={plannerConfig.people}
                      onChange={(e) => setPlannerConfig({...plannerConfig, people: parseInt(e.target.value)})}
                      className="w-full p-4 bg-slate-50 rounded-xl border-none outline-none text-xs font-bold focus:ring-2 ring-emerald-500/20"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">Time (mins/meal)</label>
                  <input 
                    type="number" step="5" min="10"
                    value={plannerConfig.timeAvailable}
                    onChange={(e) => setPlannerConfig({...plannerConfig, timeAvailable: parseInt(e.target.value)})}
                    className="w-full p-4 bg-slate-50 rounded-xl border-none outline-none text-xs font-bold focus:ring-2 ring-emerald-500/20"
                  />
                </div>
              </div>

              <button 
                onClick={handleGenerateWeeklyPlan}
                disabled={loadingPlanner}
                className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-emerald-600 transition-all disabled:opacity-50 shadow-xl"
              >
                {loadingPlanner ? <Loader2 className="animate-spin" /> : <Wand2 size={20} />}
                {loadingPlanner ? "Architecting Plan..." : "Generate 7-Day Plan"}
              </button>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-8 max-h-[calc(100vh-8rem)] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
            {weeklyPlan ? (
              <div className="space-y-8 animate-in fade-in duration-700 pb-20">
                <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-xl">
                  <div className="flex items-center justify-between mb-8 overflow-x-auto pb-2 scrollbar-hide">
                    <div className="flex gap-2">
                      {[1,2,3,4,5,6,7].map(day => (
                        <button
                          key={day}
                          onClick={() => setActivePlannerDay(day)}
                          className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xs transition-all ${activePlannerDay === day ? 'bg-slate-900 text-white shadow-lg' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}
                        >
                          D{day}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter flex items-center gap-3">
                      <CalendarDays className="text-emerald-500" /> Day {activePlannerDay} Schedule
                    </h3>
                    <div className="grid grid-cols-1 gap-4">
                      {weeklyPlan.days.find(d => d.day === activePlannerDay)?.meals.map((meal, idx) => (
                        <div key={idx} className="p-6 bg-slate-50 rounded-3xl border border-slate-100 hover:border-emerald-200 transition-all group">
                          <div className="flex justify-between items-start mb-2">
                            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 bg-white px-3 py-1 rounded-full shadow-sm">{meal.type}</span>
                          </div>
                          <h4 className="text-lg font-black text-slate-900 uppercase tracking-tight mb-2">{meal.name}</h4>
                          <p className="text-sm text-slate-500 font-medium leading-relaxed">{meal.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900 p-12 rounded-[4rem] text-white shadow-2xl relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none"><ShoppingCart size={200} /></div>
                   <div className="relative z-10">
                      <div className="flex justify-between items-center mb-10">
                        <h3 className="text-2xl font-black uppercase tracking-tighter flex items-center gap-4 text-emerald-400">
                          <ListChecks /> Aggregate Grocery List
                        </h3>
                        <button 
                          onClick={() => {
                            navigator.clipboard.writeText(weeklyPlan.groceryList);
                            setCopied(true);
                            setTimeout(() => setCopied(false), 2000);
                          }}
                          className="p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all text-white"
                        >
                          {copied ? <CheckCircle2 size={18} /> : <Copy size={18} />}
                        </button>
                      </div>
                      <div className="prose prose-invert max-w-none">
                        <div className="bg-white/5 p-8 rounded-3xl border border-white/10 whitespace-pre-wrap font-mono text-xs leading-relaxed text-slate-300" dangerouslySetInnerHTML={{ __html: weeklyPlan.groceryList.replace(/\n/g, '<br/>') }}></div>
                      </div>
                   </div>
                </div>
              </div>
            ) : loadingPlanner ? (
              <div className="bg-white p-12 rounded-[4rem] border border-slate-100 shadow-xl flex flex-col items-center justify-center min-h-[500px]">
                <Loader2 className="animate-spin text-emerald-600 mb-6" size={64} />
                <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter mb-2">Architecting 7 Days of Fuel</h3>
                <p className="text-slate-500 font-medium text-center max-w-sm">Our AI is analyzing your diet, budget, and time constraints to build a professional-grade sustainable plan.</p>
              </div>
            ) : (
              <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-[3rem] p-20 text-center flex flex-col items-center justify-center min-h-[500px]">
                <CalendarDays size={48} className="mx-auto text-slate-200 mb-6" />
                <h3 className="text-xl font-black text-slate-300 uppercase tracking-tighter">Plan is pending...</h3>
                <p className="text-slate-300 text-sm font-medium max-w-sm">Configure your requirements on the left to generate a personalized 7-day nutritional protocol.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'meal' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 animate-in slide-in-from-bottom-8 duration-700">
          <div className="lg:col-span-1">
            <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl space-y-8 sticky top-24">
              {!mealCategory ? (
                <div className="space-y-6">
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
                    <Layers size={14} /> Step 1: Pick a Strategy
                  </h3>
                  <div className="grid grid-cols-1 gap-3">
                    {[
                      { id: 'no-cook', label: 'No-Cook Recipes', icon: Wind, desc: 'Zero stove required' },
                      { id: 'available-ingredients', label: 'Available Ingredients', icon: Utensils, desc: 'Use what you have' },
                      { id: 'less-than-5', label: 'Under 5 Ingredients', icon: Filter, desc: 'Minimum effort' },
                      { id: 'smoothies', label: 'Smoothies', icon: Milk, desc: 'Quick nutrition drinks' },
                      { id: 'goal-based', label: 'Goal Based', icon: Target, desc: 'Weight gain/loss focus' }
                    ].map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setMealCategory(cat.id as any)}
                        className="p-6 text-left bg-slate-50 hover:bg-emerald-50 border border-slate-100 rounded-2xl transition-all group flex items-center gap-4"
                      >
                        <div className="p-3 bg-white text-slate-400 group-hover:text-emerald-600 rounded-xl shadow-sm transition-colors">
                          <cat.icon size={20} />
                        </div>
                        <div>
                          <span className="block text-xs font-black uppercase tracking-tight text-slate-800">{cat.label}</span>
                          <span className="block text-[10px] text-slate-400 font-medium">{cat.desc}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
                  <button 
                    onClick={() => { setMealCategory(null); setMealGoal(null); }}
                    className="text-[10px] font-black uppercase tracking-widest text-emerald-600 flex items-center gap-2 mb-4 hover:translate-x-[-4px] transition-transform"
                  >
                    <ArrowLeft size={14} /> Back to Categories
                  </button>

                  {mealCategory === 'goal-based' && (
                    <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2"><ScaleIcon size={14} /> Your Goal</label>
                      <div className="grid grid-cols-2 gap-2">
                        <button 
                          onClick={() => setMealGoal('weight-gain')}
                          className={`py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${mealGoal === 'weight-gain' ? 'bg-slate-900 text-white shadow-md' : 'bg-slate-50 text-slate-400'}`}
                        >
                          Weight Gain
                        </button>
                        <button 
                          onClick={() => setMealGoal('weight-loss')}
                          className={`py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${mealGoal === 'weight-loss' ? 'bg-slate-900 text-white shadow-md' : 'bg-slate-50 text-slate-400'}`}
                        >
                          Weight Loss
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2"><Filter size={14} /> Other Preferences</label>
                    <input 
                      type="text" 
                      value={mealPref} 
                      onChange={(e) => setMealPref(e.target.value)}
                      placeholder="e.g., Spicy, Vegan, Indian style..."
                      className="w-full p-5 bg-slate-50 rounded-2xl border-none outline-none text-sm font-bold focus:ring-2 ring-emerald-500/20"
                    />
                  </div>

                  {(mealCategory === 'available-ingredients' || mealCategory === 'less-than-5') && (
                    <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2"><Utensils size={14} /> Available Ingredients</label>
                      <textarea 
                        value={availableIngredients}
                        onChange={(e) => setAvailableIngredients(e.target.value)}
                        placeholder="e.g., Poha, Onions, Curd, Bread..."
                        className="w-full h-32 p-5 bg-slate-50 rounded-2xl border-none outline-none text-sm font-bold focus:ring-2 ring-emerald-500/20 resize-none"
                      />
                    </div>
                  )}

                  <button 
                    onClick={handleMealSuggest}
                    disabled={loadingMeals || (mealCategory === 'goal-based' && !mealGoal)}
                    className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-emerald-600 transition-all disabled:opacity-50"
                  >
                    {loadingMeals ? <Loader2 className="animate-spin" /> : <Wand2 size={20} />}
                    {loadingMeals ? "Consulting Chef..." : "Generate Ideas"}
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="lg:col-span-2 space-y-8 max-h-[calc(100vh-8rem)] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
            {meals.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-20">
                {meals.map((meal, idx) => (
                  <div key={idx} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-lg hover:shadow-2xl transition-all group animate-in fade-in slide-in-from-bottom-4">
                    <div className="flex justify-between items-start mb-6">
                      <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl group-hover:bg-emerald-600 group-hover:text-white transition-all"><Utensils size={20} /></div>
                      <div className="flex gap-2">
                         <span className="px-3 py-1 bg-slate-100 text-[8px] font-black uppercase tracking-widest text-slate-400 rounded-full">{meal.prepTime}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-3">{meal.name}</h3>
                    <p className="text-xs text-slate-500 font-medium mb-6 leading-relaxed">{meal.description}</p>
                    <div className="space-y-4">
                       <h4 className="text-[9px] font-black uppercase tracking-widest text-slate-400">Key Ingredients</h4>
                       <div className="flex flex-wrap gap-2">
                         {meal.ingredients.map((ing, i) => (
                           <span key={i} className="px-2 py-1 bg-slate-50 text-[9px] font-bold text-slate-600 rounded-lg">{ing}</span>
                         ))}
                       </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : !loadingMeals && (
              <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-[3rem] p-20 text-center min-h-[500px] flex flex-col justify-center items-center">
                <ChefHat size={48} className="mx-auto text-slate-200 mb-6" />
                <h3 className="text-xl font-black text-slate-300 uppercase tracking-tighter">Chef is standing by...</h3>
                <p className="text-slate-300 text-sm font-medium max-w-sm">
                  {mealCategory ? "Fill in your preferences to receive personalized Indian-style meal ideas." : "Select a kitchen strategy to get started with localized recommendations."}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'label' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 animate-in slide-in-from-bottom-8 duration-700">
          <div className="lg:col-span-1">
            <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl space-y-8 sticky top-24">
               <div className="space-y-4">
                 <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2"><Upload size={14} /> Visual Capture (Image)</label>
                 <div 
                   onClick={() => fileInputRef.current?.click()}
                   className="w-full aspect-video bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-100 transition-all overflow-hidden relative"
                 >
                   {imagePreview ? (
                      <img src={imagePreview} className={`w-full h-full object-contain ${isPreprocessing ? 'opacity-50' : ''}`} style={{ transform: `rotate(${imageRotation}deg)` }} alt="Label Preview" />
                   ) : (
                      <>
                        <Upload size={32} className="text-slate-300 mb-2" />
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Select Food Label</span>
                      </>
                   )}
                   {isPreprocessing && <div className="absolute inset-0 flex items-center justify-center bg-white/40"><Loader2 className="animate-spin text-emerald-600" /></div>}
                 </div>
                 <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                 
                 {imagePreview && (
                   <div className="flex gap-2">
                      <button onClick={() => setImageRotation(prev => (prev + 90) % 360)} className="flex-1 py-3 bg-slate-100 rounded-xl text-[9px] font-black uppercase tracking-widest text-slate-500 flex items-center justify-center gap-2"><RotateCw size={14} /> Rotate</button>
                      <button onClick={() => setIsEnhanced(!isEnhanced)} className={`flex-1 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest flex items-center justify-center gap-2 ${isEnhanced ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-500'}`}><ZapIcon size={14} /> {isEnhanced ? 'Enhanced' : 'Natural'}</button>
                   </div>
                 )}
               </div>

               <div className="space-y-4">
                 <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2"><TypeIcon size={14} /> Ingredient Text Feed</label>
                 <textarea 
                  value={labelText}
                  onChange={(e) => setLabelText(e.target.value)}
                  placeholder="Type or paste ingredient list here..."
                  className="w-full h-32 p-5 bg-slate-50 rounded-2xl border-none outline-none text-sm font-bold focus:ring-2 ring-emerald-500/20 resize-none placeholder:text-slate-300"
                 />
               </div>

               <div className="pt-8 border-t border-slate-100 space-y-4">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Precision Manual Data</h4>
                  <div className="flex gap-2">
                    <input type="text" placeholder="Ingredient" value={newIngredientName} onChange={e => setNewIngredientName(e.target.value)} className="flex-grow p-3 bg-slate-50 rounded-xl text-xs font-bold" />
                    <input type="text" placeholder="%" value={newIngredientPercent} onChange={e => setNewIngredientPercent(e.target.value)} className="w-16 p-3 bg-slate-50 rounded-xl text-xs font-bold" />
                    <button onClick={addManualIngredient} className="p-3 bg-slate-900 text-white rounded-xl hover:bg-emerald-600 transition-colors"><Plus size={16} /></button>
                  </div>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {manualIngredients.map((ing, i) => (
                      <div key={i} className="flex justify-between items-center p-3 bg-slate-50 rounded-xl text-[11px] font-bold border border-slate-100">
                        <span>{ing.name} ({ing.percentage}%)</span>
                        <button onClick={() => removeManualIngredient(i)} className="text-rose-500 hover:scale-110 transition-transform"><XCircle size={14} /></button>
                      </div>
                    ))}
                  </div>
               </div>

               <button 
                onClick={handleAnalyzeLabel}
                disabled={loadingLabel || isPreprocessing || (!labelText && !labelImage && manualIngredients.length === 0)}
                className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-blue-600 transition-all disabled:opacity-50 shadow-2xl shadow-blue-900/10"
              >
                {loadingLabel ? <Loader2 className="animate-spin" /> : <FileSearch size={20} />}
                {loadingLabel ? "Analyzing Profile..." : "Analyze Label"}
              </button>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-8 max-h-[calc(100vh-8rem)] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
             {labelResult ? (
               <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-700 pb-20">
                 {/* 1. Nutritional DNA */}
                 <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none"><Fingerprint size={120} /></div>
                    <div className="relative z-10">
                      <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter mb-6 flex items-center gap-3"><Scale size={15} className="text-emerald-500" /> Nutritional DNA</h3>
                      <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                        <p className="text-sm text-slate-700 leading-relaxed font-medium">{labelResult.nutritionalSummary}</p>
                      </div>
                    </div>
                 </div>
                 
                 {/* 2. Ingredient Audit */}
                 <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl">
                    <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter mb-8 flex items-center gap-3"><Microscope className="text-blue-500" /> Ingredient Audit</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {labelResult.ingredientBreakdown.map((ing, i) => (
                        <div key={i} className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 group hover:bg-white hover:border-blue-200 transition-all">
                           <div className="flex justify-between items-start mb-4">
                              <span className="text-sm font-black text-slate-900 uppercase tracking-tight group-hover:text-blue-600 transition-colors">{ing.name}</span>
                              <span className="text-[8px] font-black uppercase tracking-[0.2em] text-blue-500 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">{ing.role}</span>
                           </div>
                           <div className="flex gap-3 items-start">
                             <Beaker size={14} className="text-slate-300 mt-0.5 shrink-0" />
                             <p className="text-[11px] text-slate-500 font-medium leading-relaxed italic text-wrap">"{ing.impact}"</p>
                           </div>
                        </div>
                      ))}
                    </div>
                 </div>

                 {/* 3. Action Protocol */}
                 <div className="bg-emerald-900 p-10 rounded-[4rem] text-white shadow-3xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none"><ShieldCheck size={200} /></div>
                    <div className="relative z-10">
                      <h3 className="text-xl font-black uppercase tracking-tighter mb-10 flex items-center gap-3 text-emerald-400"><ClipboardList /> Action Protocol</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {labelResult.healthRecommendations.map((rec, i) => (
                          <div key={i} className="flex gap-5 items-start bg-white/5 p-6 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors">
                             <div className="w-8 h-8 rounded-2xl bg-emerald-500 text-white flex items-center justify-center font-black text-xs shrink-0 shadow-lg shadow-emerald-500/20">{i+1}</div>
                             <span className="text-sm font-medium leading-relaxed text-slate-200">{rec}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                 </div>
               </div>
             ) : !loadingLabel && (
               <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-[3rem] p-20 text-center flex flex-col items-center justify-center min-h-[500px]">
                 <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-8 shadow-xl">
                    <Scan size={48} className="text-slate-200" />
                 </div>
                 <h3 className="text-xl font-black text-slate-400 uppercase tracking-tighter mb-4">Awaiting Input Module</h3>
                 <p className="text-slate-400 text-sm font-medium max-w-sm">Upload a photo of a label or paste an ingredient list to initiate the forensic analysis engine.</p>
               </div>
             )}
          </div>
        </div>
      )}

      {activeTab === 'health' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 animate-in slide-in-from-bottom-8 duration-700">
           <div className="lg:col-span-1">
              <div className="bg-white p-6 md:p-8 rounded-[3rem] border border-slate-100 shadow-xl space-y-6 sticky top-24">
                 <div className="space-y-6">
                    {HEALTH_CATEGORIES.map((cat) => (
                      <div key={cat.id} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                            <cat.icon size={12} className="text-slate-400" /> {cat.label}
                          </label>
                          <span className="text-[8px] font-black text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full">
                            {reflections[cat.id] || 'Pending'}
                          </span>
                        </div>
                        <div className="grid grid-cols-4 gap-1">
                           {cat.options.map((opt) => (
                             <button 
                                key={opt}
                                onClick={() => setRating(cat.id, opt)}
                                className={`py-2 rounded-lg text-[8px] font-black uppercase tracking-tight transition-all text-center border ${
                                  reflections[cat.id] === opt 
                                    ? 'bg-slate-900 text-white border-slate-900 shadow-sm' 
                                    : 'bg-white text-slate-400 border-slate-100 hover:border-slate-300'
                                }`}
                             >
                               {opt}
                             </button>
                           ))}
                        </div>
                      </div>
                    ))}
                 </div>
                 <button 
                  onClick={handleHealthReflection}
                  disabled={loadingHealth || Object.keys(reflections).length < HEALTH_CATEGORIES.length}
                  className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 hover:bg-emerald-600 transition-all disabled:opacity-50 shadow-lg"
                >
                  {loadingHealth ? <Loader2 className="animate-spin size-4" /> : <Sparkles size={16} />}
                  {loadingHealth ? "Synthesizing..." : "Analyze Week"}
                </button>
              </div>
           </div>
           
           <div className="lg:col-span-2 space-y-8 sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
              {healthInsight ? (
                <div className="bg-white p-12 rounded-[4rem] border border-slate-100 shadow-2xl relative overflow-hidden pb-20">
                   <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none"><Zap size={200} /></div>
                   <div className="relative z-10 prose prose-slate max-w-none">
                      <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl w-fit mb-8"><Sparkles size={32} /></div>
                      <div className="whitespace-pre-wrap text-slate-600 font-medium leading-relaxed" dangerouslySetInnerHTML={{ __html: healthInsight.replace(/\n/g, '<br/>') }}></div>
                   </div>
                </div>
              ) : loadingHealth ? (
                <div className="bg-white p-12 rounded-[4rem] border border-slate-100 shadow-xl flex flex-col items-center justify-center min-h-[400px]">
                  <Loader2 className="animate-spin text-emerald-600 mb-6" size={48} />
                  <p className="text-slate-500 font-black uppercase tracking-widest text-xs animate-pulse">Running Narrative Synthesis Engine...</p>
                </div>
              ) : (
                <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-[3rem] p-20 text-center flex flex-col items-center justify-center min-h-[400px]">
                  <Heart size={48} className="mx-auto text-slate-200 mb-6" />
                  <h3 className="text-xl font-black text-slate-300 uppercase tracking-tighter">Your Body is Talking...</h3>
                  <p className="text-slate-300 text-sm font-medium">Complete the weekly reflection to generate supportive wellness insights.</p>
                </div>
              )}
           </div>
        </div>
      )}

      {activeTab === 'grocery' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 animate-in slide-in-from-bottom-8 duration-700">
          <div className="lg:col-span-1">
            <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl space-y-8 sticky top-24">
               <div className="space-y-6">
                  {DAYS.map((day) => (
                    <div key={day} className="space-y-3">
                       <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">{day} Meal Plan</label>
                       <input 
                        type="text" 
                        placeholder={`Meals for ${day}...`}
                        className="w-full p-4 bg-slate-50 rounded-xl border-none outline-none text-xs font-bold focus:ring-2 ring-emerald-500/20"
                        value={planner[day] || ''}
                        onChange={(e) => setPlanner({...planner, [day]: e.target.value})}
                       />
                    </div>
                  ))}
               </div>
               <button 
                onClick={handleGenerateGrocery}
                disabled={loadingGrocery}
                className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-emerald-600 transition-all disabled:opacity-50"
              >
                {loadingGrocery ? <Loader2 className="animate-spin" /> : <ListChecks size={20} />}
                {loadingGrocery ? "Compiling..." : "Generate List"}
              </button>
            </div>
          </div>
          <div className="lg:col-span-2 space-y-8 max-h-[calc(100vh-8rem)] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
             {groceryOutput ? (
               <div className="bg-white p-12 rounded-[4rem] border border-slate-100 shadow-2xl relative pb-20">
                  <div className="absolute top-10 right-10 flex gap-2">
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(groceryOutput);
                        setCopied(true);
                        setTimeout(() => setCopied(false), 2000);
                      }}
                      className="p-4 bg-slate-100 hover:bg-emerald-500 hover:text-white rounded-2xl transition-all text-slate-500"
                    >
                      {copied ? <CheckCircle2 size={20} /> : <Copy size={20} />}
                    </button>
                  </div>
                  <div className="prose prose-slate max-w-none">
                    <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl w-fit mb-8"><ShoppingCart size={32} /></div>
                    <div className="whitespace-pre-wrap text-slate-600 font-bold font-mono text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: groceryOutput.replace(/\n/g, '<br/>') }}></div>
                  </div>
               </div>
             ) : !loadingGrocery && (
               <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-[3rem] p-20 text-center min-h-[500px] flex flex-col justify-center">
                 <ShoppingCart size={48} className="mx-auto text-slate-200 mb-6" />
                 <h3 className="text-xl font-black text-slate-300 uppercase tracking-tighter">Cart is empty...</h3>
                 <p className="text-slate-300 text-sm font-medium">Draft your weekly meal plan to generate an aggregated, organized grocery list.</p>
               </div>
             )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AITools;