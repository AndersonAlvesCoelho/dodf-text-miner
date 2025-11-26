export interface DiarioItem {
  // Section I - Atos Legislativos
  tipo?: string;
  numero?: string;
  data?: string;
  ano?: number;
  orgao?: string;
  titulo?: string;
  conteudo?: string;
  
  // Section II - Atos Administrativos
  uid?: string;
  secao?: string;
  ato?: string;
  nome?: string;
  matricula?: string | null;
  sigrh?: string;
  simbolo?: string;
  cargo?: string | null;
  raw?: string;
}

export interface DiarioResponse {
  arquivo: string;
  secoes: {
    [key: string]: DiarioItem[];
  };
}

export type SectionKey = keyof DiarioResponse['secoes'];
