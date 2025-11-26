import { useState } from 'react';
import { DiarioResponse } from '@/types/diario';
import { translateSectionName } from '@/lib/sectionTranslator';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, FileText } from 'lucide-react';
import { DiarioItemCard } from './DiarioItemCard';

interface DiarioResultProps {
  data: DiarioResponse;
  onBack: () => void;
}

export const DiarioResult = ({ data, onBack }: DiarioResultProps) => {
  const sections = Object.entries(data.secoes);

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>

          <Card className="p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 shrink-0">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-semibold text-foreground mb-2">
                  Diário Oficial Processado
                </h1>
                <p className="text-sm text-muted-foreground mb-1">
                  Arquivo: {data.arquivo}
                </p>
                <p className="text-sm text-muted-foreground">
                  Abra cada seção para consultar os atos publicados
                </p>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-4">
          {sections.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground">
                Nenhuma seção encontrada no diário processado
              </p>
            </Card>
          ) : (
            <Accordion type="single" collapsible className="space-y-4">
              {sections.map(([sectionKey, items]) => (
                <AccordionItem
                  key={sectionKey}
                  value={sectionKey}
                  className="border-none"
                >
                  <Card className="overflow-hidden shadow-sm">
                    <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-muted/50 transition-smooth">
                      <div className="flex items-center justify-between w-full pr-4">
                        <h2 className="text-lg font-medium text-foreground text-left">
                          {translateSectionName(sectionKey)}
                        </h2>
                        <Badge variant="secondary" className="ml-4">
                          {items.length} {items.length === 1 ? 'item' : 'itens'}
                        </Badge>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4">
                      <div className="space-y-3 pt-2">
                        {items.map((item, index) => (
                          <DiarioItemCard
                            key={`${sectionKey}-${index}`}
                            item={item}
                            index={index}
                          />
                        ))}
                      </div>
                    </AccordionContent>
                  </Card>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </div>
      </div>
    </div>
  );
};
