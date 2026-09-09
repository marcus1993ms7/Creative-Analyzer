

import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult, Platform } from "../types";


const TRIGGER_LIBRARY = `
--- BIBLIOTECA OFICIAL DE GATILHOS (TAXONOMIA) ---
1. Atributo: Prova Social (Muitas pessoas já fizeram e deu certo.)
2. Atributo: Autoridade (Validação por instituições, especialistas ou dados oficiais.)
3. Atributo: Resultados Concretos (Métricas claras: emprego, salário, aprovação, crescimento.)
4. Atributo: Casos Reais (Histórias objetivas de pessoas semelhantes ao público.)
5. Atributo: Eficiência (Menos tempo, menos esforço, mais resultado.)
6. Atributo: Credibilidade (Tradição, reputação e histórico confiável.)
7. Atributo: Segurança (Estabilidade, regulamentação, estrutura sólida.)
8. Atributo: Qualidade Percebida (Sensação de algo bem feito e profissional.)
9. Atributo: Pertencimento (Fazer parte de algo maior ou reconhecido.)
10. Atributo: Identificação (Linguagem, estética e valores próximos do público.)
11. Atributo: Confiabilidade (Cumpre o que promete, sem surpresas.)
12. Atributo: Clareza (Comunicação simples, objetiva e transparente.)
13. Atributo: Humanização (Mostra pessoas reais, empatia e proximidade.)
14. Atributo + Performance: Status (Valorização social ou profissional indireta.)
15. Atributo + Performance: Diferenciação (Característica única que foge do padrão.)
16. Atributos + Performance: Validação Externa (Reconhecimento pelo mercado ou órgãos reguladores.)
17. Oferta: Ancoragem de Preço (Comparação com preço anterior ou valor “real” maior.)
18. Oferta: Inclusão (Bolsas de até 100% para estudar.)
19. Oferta: Acessibilidade Financeira (Mostra que “cabe no bolso” (parcelas, valores baixos).)
20. Oferta: Benefício Extra (Algo a mais sem custo (isenção, bônus, vantagem).)
21. Oferta + Performance: Custo de Oportunidade (Destaca o que a pessoa perde ao não agir agora.)
22. Oferta + Atributo: Autonomia e Inclusão (Bolsas de até 100% para estudar de onde e como quiser.)
23. Performance: Escassez (Poucas vagas, tempo limitado ou benefício que acaba logo.)
24. Performance: FOMO (Aversão à perda)
25. Performance: Urgência (Pressão temporal clara para decisão imediata.)
26. Performance: Facilidade (Processo simples, sem burocracia ou esforço.)
27. Performance: Exclusividade (Oferta válida apenas para um grupo específico.)
28. Performance: Previsibilidade (Caminho claro do início ao resultado final.)
29. Performance: Comparativo de Performance (Mostra desempenho superior frente à média do mercado.)
30. Performance + Atributo: Risco Zero (Garantias, cancelamento fácil, sem compromisso inicial.)
import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult, Platform } from "../types";

const TRIGGER_LIBRARY = `
--- BIBLIOTECA OFICIAL DE GATILHOS (TAXONOMIA) ---
1. Atributo: Prova Social (Muitas pessoas já fizeram e deu certo.)
2. Atributo: Autoridade (Validação por instituições, especialistas ou dados oficiais.)
3. Atributo: Resultados Concretos (Métricas claras: emprego, salário, aprovação, crescimento.)
4. Atributo: Casos Reais (Histórias objetivas de pessoas semelhantes ao público.)
5. Atributo: Eficiência (Menos tempo, menos esforço, mais resultado.)
6. Atributo: Credibilidade (Tradição, reputação e histórico confiável.)
7. Atributo: Segurança (Estabilidade, regulamentação, estrutura sólida.)
8. Atributo: Qualidade Percebida (Sensação de algo bem feito e profissional.)
9. Atributo: Pertencimento (Fazer parte de algo maior ou reconhecido.)
10. Atributo: Identificação (Linguagem, estética e valores próximos do público.)
11. Atributo: Confiabilidade (Cumpre o que promete, sem surpresas.)
12. Atributo: Clareza (Comunicação simples, objetiva e transparente.)
13. Atributo: Humanização (Mostra pessoas reais, empatia e proximidade.)
14. Atributo + Performance: Status (Valorização social ou profissional indireta.)
15. Atributo + Performance: Diferenciação (Característica única que foge do padrão.)
16. Atributos + Performance: Validação Externa (Reconhecimento pelo mercado ou órgãos reguladores.)
17. Oferta: Ancoragem de Preço (Comparação com preço anterior ou valor “real” maior.)
18. Oferta: Inclusão (Bolsas de até 100% para estudar.)
19. Oferta: Acessibilidade Financeira (Mostra que “cabe no bolso” (parcelas, valores baixos).)
20. Oferta: Benefício Extra (Algo a mais sem custo (isenção, bônus, vantagem).)
21. Oferta + Performance: Custo de Oportunidade (Destaca o que a pessoa perde ao não agir agora.)
22. Oferta + Atributo: Autonomia e Inclusão (Bolsas de até 100% para estudar de onde e como quiser.)
23. Performance: Escassez (Poucas vagas, tempo limitado ou benefício que acaba logo.)
24. Performance: FOMO (Aversão à perda)
25. Performance: Urgência (Pressão temporal clara para decisão imediata.)
26. Performance: Facilidade (Processo simples, sem burocracia ou esforço.)
27. Performance: Exclusividade (Oferta válida apenas para um grupo específico.)
28. Performance: Previsibilidade (Caminho claro do início ao resultado final.)
29. Performance: Comparativo de Performance (Mostra desempenho superior frente à média do mercado.)
30. Performance + Atributo: Risco Zero (Garantias, cancelamento fácil, sem compromisso inicial.)
31. Performance + Atributo: Comparação Direta (Mostra que a oferta é melhor que alternativas comuns.)
32. Performance + Atributos: Consistência (Resultados repetidos ao longo do tempo.)
33. Performance + Oferta: Evidência Numérica (Percentuais, rankings, volumes, tempo médio.)
`;

const KNOWLEDGE_BASE_PROMPT = `
Você é um estrategista sênior de publicidade e especialista em copywriting de alta performance.
Sua análise deve ser baseada ESTRITAMENTE na BIBLIOTECA OFICIAL DE GATILHOS fornecida abaixo.

${TRIGGER_LIBRARY}

--- ESPECIFICAÇÕES DE TEXTO DE APOIO ---
- META Padrão: 5 texto principal (125), 5 títulos (40), 1 descrição (25).
- META Carrossel: 1 texto principal (125), 1 título (40), 1 descrição (25).
- META PDLOKAL: 5 texto principal (125), 5 títulos (40), 1 descrição (25).
- TIKTOK: Descrição até 100 caracteres.
- GOOGLE PMax: 10 títulos (30), 5 títulos (15), 3 desc (90), 2 desc (60), 3 títulos longos (90), 2 títulos longos (40).
- GOOGLE DV360: 5 Headline (25), 5 Long headline (50), 5 Body text (90), 5 Long body text (150), 5 CTA (15).
- GOOGLE Search: 10 Títulos (30), 5 Títulos (14), 3 Descrições (90), 1 Descrição (60).
- GOOGLE App: 5 Títulos (30), 5 Descrições (90).
- GOOGLE Display: 5 Títulos (30), 5 Descrições (60), 1 Descrição longa (90).
`;

export const analyzeCreative = async (
  copyText: string, 
  platform: Platform,
  imageData?: { data: string, mimeType: string }
): Promise<AnalysisResult> => {
  // Se process.env.API_KEY for uma string vazia ou falsy, passamos undefined
  // para permitir que o proxy do AI Studio injete automaticamente a chave selecionada no iframe.
  const apiKey = process.env.API_KEY || undefined;
  const ai = new GoogleGenAI(apiKey ? { apiKey } : {});

  const parts: any[] = [];
  
  if (imageData) {
    parts.push({
      inlineData: {
        data: imageData.data,
        mimeType: imageData.mimeType
      }
    });
  }

  const textPrompt = `${KNOWLEDGE_BASE_PROMPT}
    
PLATAFORMA SELECIONADA: ${platform}

TAREFAS:
1. Analise o conteúdo fornecido (Texto: "${copyText}" ${imageData ? 'e a Imagem anexada' : ''}).
2. Identifique os 2 principais pilares de gatilhos/atributos presentes na peça, escolhendo NOMES EXATOS da BIBLIOTECA OFICIAL.
3. Se um pilar tiver intensidade < 8, gere 3 variações de copy ("suggestedCopys") focadas em elevar esse gatilho.
4. GERE OS "SUPPORTING TEXTS" (TEXTOS DE APOIO) seguindo RIGOROSAMENTE as quantidades e limites de caracteres da plataforma ${platform}.
5. Retorne as variações de apoio no campo 'supportingTexts' com labels claros (ex: "Títulos (30 caracteres)").

REGRAS DE OURO:
- É MANDATÓRIO usar apenas os nomes de gatilhos listados na BIBLIOTECA OFICIAL.
- O campo 'officialDescription' deve conter a descrição EXATA que está na BIBLIOTECA OFICIAL para aquele gatilho.
- NUNCA ultrapasse o limite de caracteres nos textos de apoio.
- Mantenha a essência da oferta mas varie os gatilhos para teste A/B.
- Use os 2 pilares identificados como base para os textos de apoio.
- NO CASO DE IMAGEM: Analise elementos visuais, cores, expressões e como eles reforçam ou contradizem os gatilhos identificados.
- NÃO use caixa alta (todas as letras em maiúsculo) desnecessariamente nos labels ou no início das frases. Use capitalização natural.`;

  parts.push({ text: textPrompt });

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: { parts },
      config: {
        temperature: 0.1,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.INTEGER },
            summary: { type: Type.STRING },
            suggestedCTAs: { type: Type.ARRAY, items: { type: Type.STRING }, minItems: 3 },
            foundItems: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  category: { type: Type.STRING },
                  name: { type: Type.STRING },
                  intensity: { type: Type.NUMBER },
                  officialDescription: { type: Type.STRING },
                  analysis: { type: Type.STRING },
                  evidence: { type: Type.STRING }
                },
                required: ["category", "name", "intensity", "officialDescription", "analysis", "evidence"]
              },
              minItems: 2, maxItems: 2
            },
            suggestedCopys: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  trigger: { type: Type.STRING },
                  category: { type: Type.STRING },
                  text: { type: Type.STRING },
                  reasoning: { type: Type.STRING }
                },
                required: ["trigger", "category", "text", "reasoning"]
              }
            },
            supportingTexts: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  label: { type: Type.STRING },
                  items: { type: Type.ARRAY, items: { type: Type.STRING } },
                  limit: { type: Type.NUMBER }
                },
                required: ["label", "items"]
              }
            },
            improvements: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ["score", "summary", "foundItems", "improvements", "suggestedCTAs", "suggestedCopys", "supportingTexts"]
        }
      }
    });

    const responseText = response.text;
    if (!responseText) throw new Error("A IA não conseguiu gerar uma resposta válida.");

    return JSON.parse(responseText.trim()) as AnalysisResult;
  } catch (apiError: any) {
    console.error("Erro na chamada da Gemini API:", apiError);
    throw apiError;
  }
};
