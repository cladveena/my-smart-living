
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface LayeredContentProps {
  title: string;
  simple: React.ReactNode;
  medium?: React.ReactNode;
  detailed?: React.ReactNode;
}

const LayeredContent: React.FC<LayeredContentProps> = ({ title, simple, medium, detailed }) => {
  const [level, setLevel] = useState<'simple' | 'medium' | 'detailed'>('simple');

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-6">
      <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
        <h3 className="font-bold text-slate-800">{title}</h3>
        <div className="flex gap-2">
          <button 
            onClick={() => setLevel('simple')}
            className={`px-3 py-1 text-xs rounded-full font-medium transition-colors ${level === 'simple' ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-600'}`}
          >
            Simple
          </button>
          {medium && (
            <button 
              onClick={() => setLevel('medium')}
              className={`px-3 py-1 text-xs rounded-full font-medium transition-colors ${level === 'medium' ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-600'}`}
            >
              Medium
            </button>
          )}
          {detailed && (
            <button 
              onClick={() => setLevel('detailed')}
              className={`px-3 py-1 text-xs rounded-full font-medium transition-colors ${level === 'detailed' ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-600'}`}
            >
              Detailed
            </button>
          )}
        </div>
      </div>
      
      <div className="p-6">
        <div className={level === 'simple' ? 'block' : 'hidden'}>
          {simple}
        </div>
        {medium && (
          <div className={level === 'medium' ? 'block' : 'hidden'}>
            {medium}
          </div>
        )}
        {detailed && (
          <div className={level === 'detailed' ? 'block' : 'hidden'}>
            {detailed}
          </div>
        )}
      </div>
    </div>
  );
};

export default LayeredContent;
