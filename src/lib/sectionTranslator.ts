export const translateSectionName = (sectionKey: string): string => {
  const translations: Record<string, string> = {
    section_I: 'Seção I – Atos Legislativos e Normativos',
    section_II: 'Seção II – Atos Administrativos (Nomeações, Exonerações, Portarias, etc.)',
    section_III: 'Seção III – Outros Atos Oficiais',
  };

  return translations[sectionKey] || 'Seção – Conteúdo Oficial';
};
