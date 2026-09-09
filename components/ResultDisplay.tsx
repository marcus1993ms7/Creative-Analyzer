
import React from 'react';
import { AnalysisResult } from '../types';
import { 
  CheckCircle2, 
  Target, 
  TrendingUp, 
  Info, 
  Layers, 
  Copy, 
  MousePointerClick, 
  Zap, 
  MessageSquareQuote, 
  AlertCircle, 
  FileText, 
  ChevronRight, 
  CopyPlus,
  ClipboardCheck,
  ClipboardList
} from 'lucide-react';

interface Props {
  data: AnalysisResult;
  analyzedImage?: string | null;
}

const ResultDisplay: React.FC<Props> = ({ data, analyzedImage }) => {
  const getCategoryColor = (cat: string) => {
    const c = cat.toLowerCase();
    if (c.includes('performance') && c.includes('atributo')) return '#0ea5e9';
    if (c.includes('performance')) return '#38bdf8';
    if (c.includes('oferta')) return '#4ade80';
    if (c.includes('atributo')) return '#f472b6';
    return '#6366f1';
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const copyAllFromSection = (label: string, items: string[]) => {
    const header = `--- ${label} ---`;
    const formattedItems = items.map((item, index) => `${index + 1}. ${item}`).join('\n');
    const finalContent = `${header}\n${formattedItems}`;
    
    navigator.clipboard.writeText(finalContent);
    alert(`Bloco "${label}" copiado com sucesso!`);
  };

  const copyAllSupportingTexts = () => {
    if (!data.supportingTexts || data.supportingTexts.length === 0) return;
    
    const allContent = data.supportingTexts.map(section => {
      const header = `[ ${section.label} ]`;
      const body = section.items.map((item, i) => `${i + 1}. ${item}`).join('\n');
      return `${header}\n${body}`;
    }).join('\n\n');
    
    const finalExport = `DIAGNÓSTICO E ATIVOS GERADOS\nEficácia: ${data.score}/100\n\n${allContent}`;
    
    navigator.clipboard.writeText(finalExport);
    alert('Todos os ativos de apoio foram copiados com separação por categorias!');
  };

  const radius = 52;
  const strokeWidth = 10;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (data.score / 100) * circumference;

  const lowIntensityItems = data.foundItems.filter(item => item.intensity < 8);
  const hasLowIntensity = lowIntensityItems.length > 0;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      {/* Score Section */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 flex flex-col md:flex-row items-center gap-8">
        {analyzedImage && (
          <div className="w-32 h-32 flex-shrink-0 rounded-2xl overflow-hidden border border-slate-100 shadow-sm">
            <img src={analyzedImage} alt="Analysed" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
        )}
        <div className="relative flex-shrink-0 w-32 h-32">
          <svg viewBox="0 0 104 104" className="w-full h-full transform -rotate-90 drop-shadow-sm">
            <circle cx="52" cy="52" r={normalizedRadius} stroke="currentColor" strokeWidth={strokeWidth} fill="transparent" className="text-slate-100" />
            <circle cx="52" cy="52" r={normalizedRadius} stroke="currentColor" strokeWidth={strokeWidth} fill="transparent" strokeDasharray={circumference} style={{ strokeDashoffset }} className="text-indigo-600 transition-all duration-1000 ease-out" strokeLinecap="round" />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-black text-slate-800 leading-none">{data.score}</span>
            <span className="text-[10px] uppercase font-bold text-slate-400 mt-1">Eficácia</span>
          </div>
        </div>
        <div className="flex-grow">
          <div className="flex items-center gap-2 mb-1 text-indigo-600">
            <Layers className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Análise de Gatilhos</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">Diagnóstico Criativo</h2>
          <p className="text-slate-600 leading-relaxed text-sm">{data.summary}</p>
        </div>
      </div>

      {/* Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.foundItems.slice(0, 2).map((item, idx) => (
          <div key={idx} className={`bg-white rounded-3xl border overflow-hidden shadow-sm flex flex-col transition-all ${item.intensity < 8 ? 'border-amber-200 ring-2 ring-amber-50' : 'border-slate-200'}`}>
            <div className="px-6 py-4 flex flex-col gap-1" style={{ backgroundColor: `${getCategoryColor(item.category)}10` }}>
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: getCategoryColor(item.category) }}>{item.category}</span>
                {item.intensity < 8 && (
                  <div className="flex items-center gap-1.5 text-[8px] bg-amber-100 text-amber-600 px-2 py-0.5 rounded font-black uppercase tracking-widest border border-amber-200">
                    <AlertCircle className="w-2.5 h-2.5" />
                    Baixa Intensidade
                  </div>
                )}
              </div>
              <h3 className="text-lg font-black text-slate-800">{item.name}</h3>
            </div>
            
            <div className="p-6 flex-grow space-y-4">
              <div className="flex items-start gap-2 text-slate-500">
                <Info className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-slate-300" />
                <p className="text-[11px] italic leading-tight">{item.officialDescription}</p>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-[9px] font-bold text-slate-400 uppercase">
                  <span>Intensidade Atual</span>
                  <span className={item.intensity < 8 ? 'text-amber-500 font-black' : ''}>{item.intensity}/10</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full transition-all duration-1000 ease-out ${item.intensity < 8 ? 'bg-amber-400' : ''}`} style={{ width: `${item.intensity * 10}%`, backgroundColor: item.intensity >= 8 ? getCategoryColor(item.category) : undefined }} />
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 mt-4">
                <p className="text-[9px] font-bold text-slate-400 uppercase mb-2 flex items-center gap-1">
                  <Target className="w-3 h-3" /> Evidência
                </p>
                <p className="text-xs text-slate-700 font-medium mb-2 leading-relaxed italic">"{item.evidence}"</p>
                <div className="pt-2 border-t border-slate-200/50">
                   <p className="text-[11px] text-slate-500 leading-relaxed">
                     <span className="font-bold text-slate-600">Cognição:</span> {item.analysis}
                   </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Supporting Texts Section (Textos de Apoio) */}
      {data.supportingTexts && data.supportingTexts.length > 0 && (
        <div className="bg-white border-2 border-slate-100 rounded-[2.5rem] p-8 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-100">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900 tracking-tight">Textos de Apoio Gerados</h3>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Ativos prontos para implementação</p>
              </div>
            </div>
            
            <button 
              onClick={copyAllSupportingTexts}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-slate-800 transition-all shadow-xl active:scale-95 group"
            >
              <ClipboardList className="w-4 h-4 group-hover:animate-bounce" />
              Copiar Todos os Ativos
            </button>
          </div>

          <div className="space-y-10">
            {data.supportingTexts.map((section, idx) => (
              <div key={idx} className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-50 pb-2">
                  <div className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-indigo-500" />
                    <h4 className="text-[11px] font-black text-slate-600 tracking-wider">{section.label}</h4>
                  </div>
                  <button 
                    onClick={() => copyAllFromSection(section.label, section.items)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-[9px] font-black uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all group"
                  >
                    <CopyPlus className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                    Copiar Bloco
                  </button>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  {section.items.map((item, i) => (
                    <div key={i} className="group flex items-center justify-between bg-slate-50 hover:bg-white p-4 rounded-2xl border border-slate-100 hover:border-indigo-200 hover:shadow-md transition-all">
                      <p className="text-sm font-medium text-slate-800 leading-relaxed pr-8">{item}</p>
                      <button 
                        onClick={() => copyToClipboard(item)}
                        className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all flex-shrink-0"
                        title="Copiar texto"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Suggested Alternative Copys (High Intensity Variations) */}
      {data.suggestedCopys && data.suggestedCopys.length > 0 && (
        <div className={`bg-white border-2 rounded-[2.5rem] p-8 shadow-xl transition-all ${hasLowIntensity ? 'border-amber-200 shadow-amber-50' : 'border-indigo-100 shadow-indigo-50'}`}>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-xl ${hasLowIntensity ? 'bg-amber-100 text-amber-600' : 'bg-indigo-100 text-indigo-600'}`}>
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900 tracking-tight">Variações Estratégicas</h3>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  {hasLowIntensity 
                    ? `Otimizações focadas em elevar intensidade` 
                    : 'Upgrade para Performance Máxima'
                  }
                </p>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            {data.suggestedCopys.map((copy, idx) => (
              <div key={idx} className="group bg-slate-50 hover:bg-white border border-slate-100 hover:border-indigo-200 hover:shadow-lg rounded-2xl p-6 transition-all relative overflow-hidden">
                <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                   <button onClick={() => copyToClipboard(copy.text)} className="bg-slate-900 text-white p-2 rounded-lg shadow-lg hover:bg-slate-800 active:scale-90 transition-all">
                      <Copy className="w-4 h-4" />
                   </button>
                </div>
                <div className="flex items-center gap-2 mb-3">
                   <span className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded border bg-indigo-50 text-indigo-500 border-indigo-100">
                     Foco: {copy.trigger}
                   </span>
                </div>
                <blockquote className="text-sm font-bold text-slate-800 leading-relaxed mb-4 italic border-l-4 border-indigo-500 pl-4 py-1">
                  "{copy.text}"
                </blockquote>
                <div className="flex items-start gap-2 bg-white/50 p-3 rounded-xl border border-slate-100">
                   <MessageSquareQuote className="w-3.5 h-3.5 text-slate-400 mt-0.5 flex-shrink-0" />
                   <p className="text-[11px] text-slate-500 font-medium italic">
                     <span className="text-slate-700 font-bold not-italic">Raciocínio:</span> {copy.reasoning}
                   </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Suggested CTAs Section */}
      {data.suggestedCTAs && data.suggestedCTAs.length > 0 && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <MousePointerClick className="text-indigo-600 w-4 h-4" />
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Sugestões de CTA</h4>
          </div>
          <div className="flex flex-wrap gap-3">
            {data.suggestedCTAs.map((cta, idx) => (
              <button
                key={idx}
                onClick={() => copyToClipboard(cta)}
                className="flex items-center gap-2 px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold text-slate-700 hover:border-indigo-200 hover:bg-indigo-50 transition-all group"
              >
                <span>{cta}</span>
                <Copy className="w-3 h-3 text-slate-300 group-hover:text-indigo-400" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Optimizations Section */}
      <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-xl shadow-indigo-100">
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="text-emerald-400 w-5 h-5" />
          <h3 className="text-lg font-bold tracking-tight">Oportunidades de Performance</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.improvements.map((item, i) => (
            <div key={i} className="flex gap-3 bg-white/5 p-4 rounded-2xl border border-white/10">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <p className="text-xs leading-relaxed text-slate-200">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay;
