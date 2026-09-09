import React from 'react';
import { 
  Palette, 
  Construction,
  Hammer,
  Clock
} from 'lucide-react';
import { Brand } from '../types';

const DesignerArea: React.FC<{ selectedBrand: Brand }> = ({ selectedBrand }) => {
  return (
    <main className="flex-grow flex items-center justify-center p-6 animate-in fade-in duration-700">
      <div className="max-w-2xl w-full bg-white rounded-[3rem] p-16 shadow-sm border border-slate-100 text-center relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 p-8 opacity-[0.03]">
          <Palette size={200} />
        </div>
        
        <div className="relative z-10">
          <div className="w-24 h-24 bg-indigo-50 rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 group">
            <Construction className="text-indigo-600 w-10 h-10 group-hover:rotate-12 transition-transform duration-500" />
          </div>
          
          <h2 className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.4em] mb-4">Módulo de Design</h2>
          <h1 className="text-4xl font-black text-slate-900 mb-6 tracking-tighter leading-tight">
            Área do Designer <br /> em Construção
          </h1>
          
          <p className="text-slate-500 text-sm font-medium leading-relaxed max-w-sm mx-auto mb-12">
            Estamos preparando uma experiência completa de análise visual e direção de arte para a marca <span className="text-indigo-600 font-bold">{selectedBrand}</span>. Em breve aqui.
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <div className="flex items-center gap-3 px-6 py-3 bg-slate-50 rounded-2xl border border-slate-100">
              <Hammer className="w-4 h-4 text-slate-400" />
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Desenvolvimento Ativo</span>
            </div>
            <div className="flex items-center gap-3 px-6 py-3 bg-slate-50 rounded-2xl border border-slate-100">
              <Clock className="w-4 h-4 text-slate-400" />
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Lançamento em Breve</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DesignerArea;