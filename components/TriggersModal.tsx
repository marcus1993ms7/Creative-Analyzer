
import React, { useState, useMemo } from 'react';
import { X, BookOpen, Hash, Filter } from 'lucide-react';

interface TriggerInfo {
  category: string;
  name: string;
  description: string;
}

const triggerData: TriggerInfo[] = [
  { category: "Atributo", name: "Prova Social", description: "Muitas pessoas já fizeram e deu certo." },
  { category: "Atributo", name: "Autoridade", description: "Validação por instituições, especialistas ou dados oficiais." },
  { category: "Atributo", name: "Resultados Concretos", description: "Métricas claras: emprego, salário, aprovação, crescimento." },
  { category: "Atributo", name: "Casos Reais", description: "Histórias objetivas de pessoas semelhantes ao público." },
  { category: "Atributo", name: "Eficiência", description: "Menos tempo, menos esforço, mais resultado." },
  { category: "Atributo", name: "Credibilidade", description: "Tradição, reputação e histórico confiável." },
  { category: "Atributo", name: "Segurança", description: "Estabilidade, regulamentação, estrutura sólida." },
  { category: "Atributo", name: "Qualidade Percebida", description: "Sensação de algo bem feito e profissional." },
  { category: "Atributo", name: "Pertencimento", description: "Fazer parte de algo maior ou reconhecido." },
  { category: "Atributo", name: "Identificação", description: "Linguagem, estética e valores próximos do público." },
  { category: "Atributo", name: "Confiabilidade", description: "Cumpre o que promete, sem surpresas." },
  { category: "Atributo", name: "Clareza", description: "Comunicação simples, objetiva e transparente." },
  { category: "Atributo", name: "Humanização", description: "Mostra pessoas reais, empatia e proximidade." },
  { category: "Atributo + Performance", name: "Status", description: "Valorização social ou profissional indireta." },
  { category: "Atributo + Performance", name: "Diferenciação", description: "Característica única que foge do padrão." },
  { category: "Atributos + Performance", name: "Validação Externa", description: "Reconhecimento pelo mercado ou órgãos reguladores." },
  { category: "Oferta", name: "Ancoragem de Preço", description: "Comparação com preço anterior ou valor “real” maior." },
  { category: "Oferta", name: "Inclusão", description: "Bolsas de até 100% para estudar." },
  { category: "Oferta", name: "Acessibilidade Financeira", description: "Mostra que “cabe no bolso” (parcelas, valores baixos)." },
  { category: "Oferta", name: "Benefício Extra", description: "Algo a mais sem custo (isenção, bônus, vantagem)." },
  { category: "Oferta + Performance", name: "Custo de Oportunidade", description: "Destaca o que a pessoa perde ao não agir agora." },
  { category: "Oferta + Atributo", name: "Autonomia e Inclusão", description: "Bolsas de até 100% para estudar de onde e como quiser." },
  { category: "Performance", name: "Escassez", description: "Poucas vagas, tempo limitado ou benefício que acaba logo." },
  { category: "Performance", name: "FOMO", description: "Aversão à perda" },
  { category: "Performance", name: "Urgência", description: "Pressão temporal clara para decisão imediata." },
  { category: "Performance", name: "Facilidade", description: "Processo simples, sem burocracia ou esforço." },
  { category: "Performance", name: "Exclusividade", description: "Oferta válida apenas para um grupo específico." },
  { category: "Performance", name: "Previsibilidade", description: "Caminho claro do início ao resultado final." },
  { category: "Performance", name: "Comparativo de Performance", description: "Mostra desempenho superior frente à média do mercado." },
  { category: "Performance + Atributo", name: "Risco Zero", description: "Garantias, cancelamento fácil, sem compromisso inicial." },
  { category: "Performance + Atributo", name: "Comparação Direta", description: "Mostra que a oferta é melhor que alternativas comuns." },
  { category: "Performance + Atributos", name: "Consistência", description: "Resultados repetidos ao longo do tempo." },
  { category: "Performance + Oferta", name: "Evidência Numérica", description: "Percentuais, rankings, volumes, tempo médio." }
];

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const TriggersModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [activeFilter, setActiveFilter] = useState<string>('Tudo');

  const categories = useMemo(() => {
    const cats = Array.from(new Set(triggerData.map(t => t.category)));
    return ['Tudo', ...cats.sort()];
  }, []);

  const filteredTriggers = useMemo(() => {
    if (activeFilter === 'Tudo') return triggerData;
    return triggerData.filter(t => t.category === activeFilter);
  }, [activeFilter]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div 
        className="bg-white w-full max-w-4xl max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-8 py-6 border-b border-slate-100 bg-white sticky top-0 z-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-600 p-2 rounded-xl">
                <BookOpen className="text-white w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">Biblioteca de Gatilhos</h2>
                <p className="text-xs text-slate-500 font-medium">Taxonomia oficial de performance criativa</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex items-center gap-3 overflow-x-auto pb-2 no-scrollbar">
            <div className="flex-shrink-0 flex items-center gap-2 mr-2 text-slate-400">
              <Filter className="w-3.5 h-3.5" />
              <span className="text-[10px] font-bold uppercase tracking-wider">Filtrar:</span>
            </div>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`flex-shrink-0 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all border ${
                  activeFilter === cat
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-100'
                    : 'bg-white text-slate-500 border-slate-200 hover:border-indigo-300 hover:text-indigo-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-grow overflow-y-auto p-8 bg-slate-50/30">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredTriggers.map((trigger, idx) => (
              <div 
                key={idx} 
                className="group p-5 rounded-2xl border border-slate-100 bg-white hover:border-indigo-100 hover:bg-indigo-50/30 transition-all flex flex-col gap-2 shadow-sm hover:shadow-md"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[9px] font-black uppercase tracking-widest text-indigo-400 bg-indigo-50 px-2 py-0.5 rounded">
                    {trigger.category}
                  </span>
                  <Hash className="w-3 h-3 text-slate-200 group-hover:text-indigo-200 transition-colors" />
                </div>
                <h4 className="font-bold text-slate-800 text-sm group-hover:text-indigo-700 transition-colors">
                  {trigger.name}
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {trigger.description}
                </p>
              </div>
            ))}
          </div>
          
          {filteredTriggers.length === 0 && (
            <div className="py-20 text-center">
              <Filter className="w-12 h-12 text-slate-200 mx-auto mb-4" />
              <p className="text-slate-400 font-medium">Nenhum gatilho encontrado para esta categoria.</p>
            </div>
          )}
        </div>

        <div className="px-8 py-4 border-t border-slate-100 bg-white flex justify-end">
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-all shadow-md active:scale-95"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};

export default TriggersModal;
