
import React, { useState, useEffect } from 'react';
import { 
  Heart, Wind, Battery, Sun, 
  Moon, Zap, ShieldCheck, User, 
  Users, Brain, Coffee, Sparkles,
  Focus, Smile, Smartphone, Clock,
  BookOpen, ZapOff, BrainCircuit, Copy, CheckCircle2,
  BellOff, ShieldAlert, CalendarRange, Briefcase
} from 'lucide-react';

const JOURNAL_PROMPTS = [
  "What is one small win from today that felt bigger than it looked?",
  "How did you practice self-kindness during a difficult moment this week?",
  "What is a boundary you successfully maintained lately, and how did it feel?",
  "What are three things in your physical environment that bring you peace?",
  "Describe a moment today when you felt fully present in your body.",
  "If you could remove one recurring stressor from your life, what would it be?",
  "What does 'rest' look like to you when you aren't just sleeping?",
  "Write about a person who makes you feel safe and why.",
  "What is one thing you are looking forward to in the next 48 hours?",
  "How has your definition of 'success' changed in the last year?",
  "What is a piece of advice you’d give to your younger self about stress?",
  "Describe your perfect 'no-tech' afternoon."
];

const Wellbeing: React.FC = () => {
  const [isBreathing, setIsBreathing] = useState(false);
  const [breathPhase, setBreathPhase] = useState<'In' | 'Hold' | 'Out'>('In');
  const [dailyPrompt, setDailyPrompt] = useState("");
  const [promptCopied, setPromptCopied] = useState(false);

  useEffect(() => {
    // Deterministic daily prompt based on date
    const today = new Date();
    const index = (today.getDate() + today.getMonth()) % JOURNAL_PROMPTS.length;
    setDailyPrompt(JOURNAL_PROMPTS[index]);
  }, []);

  useEffect(() => {
    let timer: any;
    if (isBreathing) {
      const runCycle = () => {
        setBreathPhase('In');
        timer = setTimeout(() => {
          setBreathPhase('Hold');
          timer = setTimeout(() => {
            setBreathPhase('Out');
            timer = setTimeout(runCycle, 4000);
          }, 4000);
        }, 4000);
      };
      runCycle();
    } else {
      setBreathPhase('In');
    }
    return () => clearTimeout(timer);
  }, [isBreathing]);

  const copyPrompt = () => {
    navigator.clipboard.writeText(dailyPrompt);
    setPromptCopied(true);
    setTimeout(() => setPromptCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-white pb-24 animate-in fade-in duration-700">
      {/* Visual Header */}
      <section className="relative h-[450px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80" 
            className="w-full h-full object-cover brightness-[0.6]"
            alt="Wellbeing"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/40 to-white" />
        </div>
        <div className="relative z-10 text-center px-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-6 backdrop-blur-md">
            <Heart size={14} className="text-rose-400" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Mind & Soul Protocol</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none mb-4">
            Mental <span className="text-rose-400">Balance</span>
          </h1>
          <p className="text-slate-100 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
            Resilience isn't about ignoring stress—it's about building the internal architecture to flow through it.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4">
        
        {/* Daily Journaling Prompt */}
        <section className="relative -mt-16 mb-24 z-20">
          <div className="bg-white rounded-[3rem] shadow-2xl border border-slate-100 p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 group">
            <div className="p-6 bg-rose-50 text-rose-500 rounded-3xl group-hover:bg-rose-500 group-hover:text-white transition-all duration-500">
              <BookOpen size={40} />
            </div>
            <div className="flex-grow text-center md:text-left">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-rose-500 mb-2 block">Prompt of the Day</span>
              <h3 className="text-xl md:text-2xl font-black text-slate-900 leading-tight italic">"{dailyPrompt}"</h3>
            </div>
            <button 
              onClick={copyPrompt}
              className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest flex items-center gap-2 hover:bg-rose-600 transition-colors shrink-0"
            >
              {promptCopied ? <CheckCircle2 size={16} /> : <Copy size={16} />}
              {promptCopied ? "Copied" : "Copy Prompt"}
            </button>
          </div>
        </section>

        {/* TOPICS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-32">
          
          <div className="lg:col-span-2 space-y-24">
            {/* 1. Stress Management Techniques */}
            <div className="space-y-12">
               <div>
                  <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter mb-4 flex items-center gap-4">
                     <ZapOff className="text-indigo-600" /> Stress Management
                  </h2>
                  <p className="text-slate-500 font-medium text-lg leading-relaxed max-w-2xl">
                     Beginner-friendly tools to down-regulate your nervous system in real-time.
                  </p>
               </div>
               
               <div className="grid grid-cols-1 gap-8">
                  {/* Mindfulness */}
                  <div className="p-10 bg-slate-50 rounded-[3rem] border border-slate-100 flex flex-col md:flex-row gap-8 items-start">
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm shrink-0">
                      <Focus size={32} />
                    </div>
                    <div>
                      <h4 className="font-black text-slate-900 uppercase text-sm tracking-widest mb-4">Mindfulness: The 5-4-3-2-1 Grounding</h4>
                      <p className="text-sm text-slate-600 leading-relaxed mb-6">When feeling overwhelmed, stop and mentally identify:</p>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                        {['5 things you SEE', '4 things you FEEL', '3 things you HEAR', '2 things you SMELL', '1 thing you TASTE'].map((step, i) => (
                          <div key={i} className="bg-white p-3 rounded-xl border border-slate-200 text-center">
                            <span className="text-[10px] font-black text-indigo-600 block mb-1">{i + 1}</span>
                            <span className="text-[9px] font-bold text-slate-400 uppercase leading-none">{step.split(' ').slice(2).join(' ')}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Deep Breathing */}
                  <div className="p-10 bg-slate-900 text-white rounded-[3rem] shadow-2xl flex flex-col md:flex-row gap-8 items-start">
                    <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-rose-400 border border-white/20 shrink-0">
                      <Wind size={32} />
                    </div>
                    <div>
                      <h4 className="font-black uppercase text-sm tracking-widest mb-4">Deep Breathing: Box Method</h4>
                      <p className="text-slate-400 text-sm leading-relaxed mb-6">Used by professional performers and athletes to reset cortisol levels.</p>
                      <ul className="space-y-3">
                        {[
                          "Inhale slowly through your nose for 4 seconds.",
                          "Hold that breath in for 4 seconds.",
                          "Exhale completely through your mouth for 4 seconds.",
                          "Hold your lungs empty for 4 seconds."
                        ].map((step, i) => (
                          <li key={i} className="flex gap-3 text-xs font-medium items-center">
                            <div className="w-5 h-5 rounded-full bg-rose-500 text-[10px] flex items-center justify-center font-black">0{i+1}</div>
                            {step}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* PMR */}
                  <div className="p-10 bg-emerald-50 rounded-[3rem] border border-emerald-100 flex flex-col md:flex-row gap-8 items-start">
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-emerald-600 shadow-sm shrink-0">
                      <BrainCircuit size={32} />
                    </div>
                    <div>
                      <h4 className="font-black text-slate-900 uppercase text-sm tracking-widest mb-4">Progressive Muscle Relaxation</h4>
                      <p className="text-sm text-slate-600 leading-relaxed mb-6">Physically scan your body to identify and release hidden tension.</p>
                      <div className="bg-white/50 p-6 rounded-2xl text-xs font-medium text-slate-700 leading-relaxed">
                        <strong className="block mb-2 text-emerald-700 uppercase">The Protocol:</strong>
                        1. Tense your toes for 5 seconds. <br/>
                        2. Release suddenly and feel the blood flow back. <br/>
                        3. Repeat for calves, glutes, core, shoulders, and finally your face. <br/>
                        4. Notice the difference between tension and relaxation.
                      </div>
                    </div>
                  </div>
               </div>
            </div>

            {/* 2. Expanded Self-Care Spectrum */}
            <div className="space-y-12">
               <div>
                  <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter mb-4 flex items-center gap-4">
                     <User className="text-rose-500" /> Self-Care Protocols
                  </h2>
                  <p className="text-slate-500 font-medium text-lg">Daily maintenance to prevent emotional and physical exhaustion.</p>
               </div>
               
               <div className="space-y-6">
                  {[
                    { 
                      title: "Physical Self-Care", 
                      desc: "Optimizing your body's physiological state for performance and health.", 
                      examples: [
                        "Active Recovery: Incorporate 15 minutes of light stretching or a casual walk to clear lactic acid.",
                        "Mindful Consumption: Eat without screens to allow your brain to register satiety signals.",
                        "Hydration Anchor: Drink 300ml of water before your first morning caffeine intake."
                      ],
                      icon: ShieldCheck, 
                      color: "emerald" 
                    },
                    { 
                      title: "Emotional Self-Care", 
                      desc: "Managing your internal narrative and acknowledging your emotional landscape.", 
                      examples: [
                        "The 24-Hour Rule: Wait 24 hours before responding to a stressful email or personal conflict.",
                        "Emotion Labeling: Name your feeling (e.g., 'I feel anxious') to move from the amygdala to the prefrontal cortex.",
                        "Digital Sprints: Set a 5-minute timer to journal your worries and 'offload' them from your mind."
                      ],
                      icon: Heart, 
                      color: "rose" 
                    },
                    { 
                      title: "Social Self-Care", 
                      desc: "Protecting your time and energy in relation to your community.", 
                      examples: [
                        "The 'Quality Over Quantity' Rule: Prioritize one deep conversation over five superficial digital interactions.",
                        "Scheduled Unavailability: Set expectations with friends/family about when you are focus-working.",
                        "Asking for Help: Practice vulnerability by delegating one small task when feeling overwhelmed."
                      ],
                      icon: Users, 
                      color: "indigo" 
                    }
                  ].map((item, idx) => (
                    <div key={idx} className="bg-white border border-slate-100 rounded-[2.5rem] hover:shadow-lg transition-all p-10 flex flex-col gap-8 group">
                       <div className="flex gap-8 items-start">
                         <div className={`p-4 bg-${item.color}-50 text-${item.color}-600 rounded-2xl group-hover:scale-110 transition-transform shrink-0`}>
                            <item.icon size={28} />
                         </div>
                         <div>
                            <h4 className="font-black text-slate-900 uppercase text-sm tracking-tight mb-2">{item.title}</h4>
                            <p className="text-sm text-slate-500 leading-relaxed font-medium mb-6">{item.desc}</p>
                            <div className="space-y-3">
                              {item.examples.map((ex, i) => (
                                <div key={i} className="flex gap-3 items-start">
                                  <div className={`w-1.5 h-1.5 rounded-full bg-${item.color}-500 mt-1.5 shrink-0`} />
                                  <p className="text-xs font-bold text-slate-700 leading-relaxed">{ex}</p>
                                </div>
                              ))}
                            </div>
                         </div>
                       </div>
                    </div>
                  ))}
               </div>
            </div>

            {/* 3. Work-Life Balance Section */}
            <div className="space-y-12">
               <div>
                  <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter mb-4 flex items-center gap-4">
                     <Briefcase className="text-blue-600" /> Work-Life Balance
                  </h2>
                  <p className="text-slate-500 font-medium text-lg">Constructing sustainable barriers between your professional output and personal peace.</p>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="p-10 bg-blue-50 border border-blue-100 rounded-[3rem] space-y-6">
                    <div className="p-4 bg-white text-blue-600 rounded-2xl w-fit shadow-sm"><ShieldAlert size={24} /></div>
                    <h4 className="font-black text-slate-900 uppercase text-xs tracking-widest">Setting Boundaries</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">Boundaries are not walls; they are the rules of engagement for your time.</p>
                    <div className="space-y-3">
                      <div className="p-4 bg-white rounded-xl border border-blue-100 text-[11px] font-bold text-slate-700">Action: Define a "Hard Close" time (e.g., 6:30 PM) where all work notifications stop.</div>
                      <div className="p-4 bg-white rounded-xl border border-blue-100 text-[11px] font-bold text-slate-700">Action: Use a physical trigger—changing clothes or closing your laptop—to mark the end of the workday.</div>
                    </div>
                  </div>

                  <div className="p-10 bg-slate-50 border border-slate-100 rounded-[3rem] space-y-6">
                    <div className="p-4 bg-white text-slate-800 rounded-2xl w-fit shadow-sm"><BellOff size={24} /></div>
                    <h4 className="font-black text-slate-900 uppercase text-xs tracking-widest">Managing Digital Overload</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">Reduce the friction caused by constant digital interruptions.</p>
                    <div className="space-y-3">
                      <div className="p-4 bg-white rounded-xl border border-slate-200 text-[11px] font-bold text-slate-700">Action: Disable non-human notifications (apps, news, social media alerts) entirely.</div>
                      <div className="p-4 bg-white rounded-xl border border-slate-200 text-[11px] font-bold text-slate-700">Action: Practice a "No-Phone Zone" for the first 30 minutes of your morning to set your own agenda.</div>
                    </div>
                  </div>

                  <div className="p-10 bg-rose-50 border border-rose-100 rounded-[3rem] md:col-span-2 space-y-6">
                    <div className="flex items-center gap-6">
                      <div className="p-4 bg-white text-rose-600 rounded-2xl w-fit shadow-sm"><CalendarRange size={24} /></div>
                      <div>
                        <h4 className="font-black text-slate-900 uppercase text-xs tracking-widest">Scheduling Downtime</h4>
                        <p className="text-xs text-slate-600 leading-relaxed">Rest is a biological requirement, not a reward for hard work.</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-5 bg-white rounded-2xl border border-rose-100">
                        <span className="text-[10px] font-black uppercase text-rose-500 mb-2 block">Protocol: Appointment Rest</span>
                        <p className="text-[11px] font-medium text-slate-600">Schedule 1 hour of 'Unstructured Time' in your calendar daily. No chores, no emails, just what feels good in the moment.</p>
                      </div>
                      <div className="p-5 bg-white rounded-2xl border border-rose-100">
                        <span className="text-[10px] font-black uppercase text-rose-500 mb-2 block">Protocol: The 90-10 Rule</span>
                        <p className="text-[11px] font-medium text-slate-600">For every 90 minutes of high-focus work, take a 10-minute movement break away from your primary workspace.</p>
                      </div>
                    </div>
                  </div>
               </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-12">
            {/* Interactive Breathing Tool */}
            <div className="bg-slate-900 text-white p-12 rounded-[4rem] shadow-2xl relative overflow-hidden flex flex-col items-center text-center sticky top-24">
               <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none"></div>
               <div className="relative z-10 w-full">
                  <Wind size={40} className="text-indigo-400 mx-auto mb-6" />
                  <h3 className="text-2xl font-black uppercase tracking-tighter mb-2">Nerve Reset</h3>
                  <p className="text-slate-400 text-xs mb-12 font-bold uppercase tracking-widest">Interactive Cycle</p>
                  
                  <div className="relative flex items-center justify-center py-10">
                     <div className={`w-40 h-40 rounded-full border-4 border-indigo-500/30 flex items-center justify-center transition-all duration-1000 ${isBreathing ? (breathPhase === 'In' ? 'scale-125 border-indigo-400 bg-indigo-500/10' : breathPhase === 'Out' ? 'scale-100 border-indigo-500/30' : 'scale-125 bg-indigo-500/5') : ''}`}>
                        <span className="text-2xl font-black uppercase tracking-tighter text-indigo-400">{isBreathing ? breathPhase : 'Start'}</span>
                     </div>
                  </div>
                  
                  <button 
                     onClick={() => setIsBreathing(!isBreathing)}
                     className={`w-full mt-12 py-5 rounded-[2rem] font-black uppercase tracking-[0.2em] transition-all ${isBreathing ? 'bg-rose-500 shadow-xl shadow-rose-500/20' : 'bg-indigo-600 hover:bg-indigo-500 shadow-xl shadow-indigo-500/20'}`}
                  >
                     {isBreathing ? 'End Session' : 'Begin Breathing'}
                  </button>
               </div>
            </div>

            {/* Daily Mind-Shifts */}
            <div className="bg-slate-50 p-10 rounded-[3rem] border border-slate-100">
               <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-500 mb-8 text-center">Daily Mind-Shifts</h3>
               <div className="space-y-8">
                  {[
                    { title: "Savoring", desc: "Enjoy your morning coffee without looking at a screen for 2 minutes.", icon: Coffee },
                    { title: "Single-Tasking", desc: "If you're eating, just eat. If you're walking, just walk.", icon: Zap },
                    { title: "Gratitude Tap", desc: "Name 3 simple things you're grateful for before sleep.", icon: Smile }
                  ].map((win, i) => (
                    <div key={i} className="flex gap-4 group cursor-pointer">
                       <div className="p-3 bg-white rounded-xl text-slate-400 group-hover:text-indigo-600 transition-colors shadow-sm">
                          <win.icon size={18} />
                       </div>
                       <div>
                          <h4 className="font-black text-slate-900 uppercase text-xs tracking-tight mb-1">{win.title}</h4>
                          <p className="text-[11px] text-slate-500 font-medium leading-relaxed">{win.desc}</p>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wellbeing;
