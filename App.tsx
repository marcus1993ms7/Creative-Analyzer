
import React, { useState, useRef, useEffect } from 'react';
import { analyzeCreative } from './services/geminiService';
import { AnalysisResult, AnalysisStatus, Brand, BRANDS, Platform, PLATFORMS } from './types';
import ResultDisplay from './components/ResultDisplay';
import TriggersModal from './components/TriggersModal';
import DesignerArea from './components/DesignerArea';
import { 
  Sparkles, 
  AlertTriangle, 
  Loader2, 
  BrainCircuit, 
  BookOpen, 
  ChevronDown, 
  Check, 
  Globe, 
  User, 
  ExternalLink,
  Facebook,
  Search,
  Layout,
  Video,
  PenTool,
  Palette,
  LayoutGrid
} from 'lucide-react';

type AppArea = 'redator' | 'designer';

const App: React.FC = () => {
  const [activeArea, setActiveArea] = useState<AppArea>('redator');
  const [copyText, setCopyText] = useState('');
  const [image, setImage] = useState<{ data: string, mimeType: string } | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [platform, setPlatform] = useState<Platform>('Meta Padrão');
  const [status, setStatus] = useState<AnalysisStatus>(AnalysisStatus.IDLE);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [lastAnalyzedImage, setLastAnalyzedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBrandMenuOpen, setIsBrandMenuOpen] = useState(false);
  const [isPlatformMenuOpen, setIsPlatformMenuOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<Brand>('Anhanguera');
  
  const brandMenuRef = useRef<HTMLDivElement>(null);

  const handleOpenKeySelector = async () => {
    const win = window as any;
    if (win.aistudio && typeof win.aistudio.openSelectKey === 'function') {
      try {
        await win.aistudio.openSelectKey();
      } catch (err) {
        console.error("Erro ao abrir seletor de chave:", err);
      }
    } else {
      alert("O seletor de chaves está disponível apenas dentro do ambiente do AI Studio.");
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = (reader.result as string).split(',')[1];
      setImage({ data: base64String, mimeType: file.type });
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
  };

  const handleAnalyze = async () => {
    if (!copyText.trim() && !image) {
      setError("Por favor, insira o texto ou suba uma imagem para análise.");
      return;
    }
    
    setStatus(AnalysisStatus.LOADING);
    setError(null);
    setResult(null);

    try {
      const data = await analyzeCreative(copyText, platform, image || undefined);
      setResult(data);
      setLastAnalyzedImage(imagePreview);
      setStatus(AnalysisStatus.SUCCESS);
    } catch (err: any) {
      console.error("Analisador Error:", err);
      const errStr = JSON.stringify(err);
      const isPermissionError = 
        err?.status === 403 || 
        err?.message?.includes('permission') || 
        err?.message?.includes('PERMISSION_DENIED') ||
        errStr.includes('PERMISSION_DENIED') ||
        errStr.includes('403') ||
        errStr.includes('caller does not have permission');
      
      if (isPermissionError) {
        setError("Erro de permissão na API do Gemini (403). Selecione uma conta Google ou Chave de API válida clicando no botão abaixo.");
      } else {
        setError("Falha na análise. Verifique sua conexão e tente novamente.");
      }
      setStatus(AnalysisStatus.ERROR);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col">
      <header className="bg-white/90 backdrop-blur-md border-b border-slate-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-600 p-2 rounded-xl shadow-lg shadow-indigo-100">
                <BrainCircuit className="text-white w-5 h-5" />
              </div>
              <h1 className="text-lg font-black tracking-tighter hidden md:block">Creative Analyzer</h1>
            </div>
            
            <nav className="flex items-center bg-slate-100/50 p-1 rounded-2xl border border-slate-100">
              <button 
                onClick={() => setActiveArea('redator')}
                className={`flex items-center gap-2 px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeArea === 'redator' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
              >
                <PenTool className="w-3.5 h-3.5" />
                Área do Redator
              </button>
              <button 
                onClick={() => setActiveArea('designer')}
                className={`flex items-center gap-2 px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeArea === 'designer' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
              >
                <Palette className="w-3.5 h-3.5" />
                Área do Designer
              </button>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 px-3 py-2 text-slate-600 hover:bg-slate-100 rounded-xl transition-all font-bold text-[10px] uppercase tracking-widest">
              <BookOpen className="w-4 h-4 text-indigo-600" />
              Gatilhos
            </button>
            {typeof window !== 'undefined' && (window as any).aistudio && (
              <button onClick={handleOpenKeySelector} className="flex items-center gap-2 px-3 py-2 text-slate-600 hover:bg-slate-100 rounded-xl transition-all font-bold text-[10px] uppercase tracking-widest border border-slate-100 bg-slate-50">
                <User className="w-4 h-4 text-indigo-600" />
                Chave API
              </button>
            )}
            <div className="relative">
              <button onClick={() => setIsBrandMenuOpen(!isBrandMenuOpen)} className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all font-bold text-[10px] uppercase border tracking-widest ${isBrandMenuOpen ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-slate-50 text-slate-600 border-slate-100'}`}>
                <Globe className="w-3.5 h-3.5" />
                <span>{selectedBrand}</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${isBrandMenuOpen ? 'rotate-180' : ''}`} />
              </button>
              {isBrandMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-100 rounded-2xl shadow-xl py-2 z-50">
                  {BRANDS.map(brand => (
                    <button key={brand} onClick={() => { setSelectedBrand(brand); setIsBrandMenuOpen(false); }} className={`w-full px-4 py-2.5 text-left text-[11px] font-bold hover:bg-slate-50 ${selectedBrand === brand ? 'text-indigo-600 bg-indigo-50/50' : 'text-slate-600'}`}>
                      {brand}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {activeArea === 'redator' ? (
        <main className="flex-grow max-w-7xl mx-auto w-full px-6 py-10 grid grid-cols-1 xl:grid-cols-12 gap-10">
          <div className="xl:col-span-5 space-y-6">
            <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 sticky top-24">
              <div className="mb-6">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block">Análise Visual (Opcional)</label>
                {!imagePreview ? (
                  <label className="w-full h-32 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-indigo-400 hover:bg-indigo-50/30 transition-all group">
                    <div className="bg-slate-50 p-2 rounded-xl group-hover:bg-indigo-100 transition-all">
                      <Layout className="w-5 h-5 text-slate-400 group-hover:text-indigo-600" />
                    </div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Subir Imagem / Print</span>
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                  </label>
                ) : (
                  <div className="relative w-full h-32 rounded-2xl overflow-hidden border border-slate-100 group">
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button onClick={removeImage} className="bg-white/20 backdrop-blur-md text-white p-2 rounded-xl hover:bg-white/40 transition-all">
                        <AlertTriangle className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="mb-8">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block">Texto da Peça (Criativo)</label>
                <textarea 
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-5 text-sm focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 outline-none transition-all min-h-[150px]" 
                  placeholder="Cole aqui o texto da imagem, vídeo ou anúncio..." 
                  value={copyText} 
                  onChange={(e) => setCopyText(e.target.value)} 
                />
              </div>

              <div className="pt-6 border-t border-slate-50 space-y-5">
                <div className="relative">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block">Configuração de Canal e Apoio</label>
                  <button 
                    onClick={() => setIsPlatformMenuOpen(!isPlatformMenuOpen)}
                    className="w-full flex items-center justify-between px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-[11px] uppercase tracking-wider text-slate-700 hover:border-indigo-300 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <LayoutGrid className="w-4 h-4 text-indigo-600" />
                      <span>{platform}</span>
                    </div>
                    <ChevronDown className={`w-4 h-4 transition-transform ${isPlatformMenuOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {isPlatformMenuOpen && (
                    <div className="absolute left-0 bottom-full mb-2 w-full bg-white border border-slate-100 rounded-2xl shadow-2xl py-2 z-50 max-h-[300px] overflow-y-auto">
                      {PLATFORMS.map(p => (
                        <button key={p} onClick={() => { setPlatform(p); setIsPlatformMenuOpen(false); }} className={`w-full px-5 py-3 text-left text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 flex items-center justify-between ${platform === p ? 'text-indigo-600 bg-indigo-50' : 'text-slate-500'}`}>
                          {p}
                          {platform === p && <Check className="w-3 h-3" />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {error && (
                  <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-[11px] font-bold flex flex-col gap-3">
                    <div className="flex gap-2">
                      <AlertTriangle className="w-4 h-4 flex-shrink-0 text-red-500" />
                      <span>{error}</span>
                    </div>
                    {typeof window !== 'undefined' && (window as any).aistudio && (
                      <button 
                        type="button"
                        onClick={handleOpenKeySelector}
                        className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all shadow-sm"
                      >
                        Selecionar Chave de API / Conta Google
                      </button>
                    )}
                  </div>
                )}

                <button 
                  onClick={handleAnalyze} 
                  disabled={status === AnalysisStatus.LOADING || (!copyText.trim() && !image)} 
                  className={`w-full py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all active:scale-[0.98] shadow-xl ${status === AnalysisStatus.LOADING || (!copyText.trim() && !image) ? 'bg-slate-100 text-slate-400' : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-100'}`}
                >
                  {status === AnalysisStatus.LOADING ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Sparkles className="w-5 h-5" /> Analisar e Gerar Apoio</>}
                </button>
              </div>
            </div>
          </div>

          <div className="xl:col-span-7">
            {status === AnalysisStatus.IDLE && (
              <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center p-12 bg-white/50 rounded-[3rem] border-2 border-dashed border-slate-200">
                <BrainCircuit className="w-16 h-16 text-slate-100 mb-6" />
                <h3 className="text-sm font-black text-slate-300 uppercase tracking-[0.4em]">Aguardando Texto</h3>
                <p className="text-slate-400 mt-4 text-[11px] font-bold uppercase tracking-widest max-w-xs leading-relaxed">Insira sua copy para extrair o diagnóstico e os textos de apoio.</p>
              </div>
            )}
            {status === AnalysisStatus.LOADING && (
              <div className="h-full flex flex-col items-center justify-center text-center p-12 animate-in fade-in duration-500">
                <div className="relative mb-10">
                  <div className="w-24 h-24 border-8 border-slate-100 border-t-indigo-600 rounded-full animate-spin"></div>
                  <div className="absolute inset-0 flex items-center justify-center"><Sparkles className="w-8 h-8 text-indigo-600 animate-pulse" /></div>
                </div>
                <h3 className="text-xl font-black text-slate-800 tracking-tight uppercase">Processando...</h3>
                <p className="text-slate-500 text-[10px] mt-2 font-bold uppercase tracking-widest">Extraindo gatilhos e gerando ativos</p>
              </div>
            )}
            {status === AnalysisStatus.SUCCESS && result && (
              <ResultDisplay data={result} analyzedImage={lastAnalyzedImage} />
            )}
          </div>
        </main>
      ) : (
        <DesignerArea selectedBrand={selectedBrand} />
      )}
      
      <TriggersModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default App;
