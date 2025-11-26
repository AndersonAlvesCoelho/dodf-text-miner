import { useState } from 'react';
import { DiarioItem } from '@/types/diario';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface DiarioItemCardProps {
  item: DiarioItem;
  index: number;
}

export const DiarioItemCard = ({ item, index }: DiarioItemCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Determina o título do card
  const getTitle = () => {
    if (item.titulo) return item.titulo;
    if (item.ato && item.nome) return `${item.ato} - ${item.nome}`;
    if (item.tipo && item.numero) return `${item.tipo} Nº ${item.numero}`;
    return `Item ${index + 1}`;
  };

  // Determina o conteúdo completo
  const getContent = () => {
    return item.conteudo || item.raw || 'Sem conteúdo disponível';
  };

  return (
    <Card className="p-4 hover:shadow-md transition-smooth">
      <div className="space-y-3">
        {/* Cabeçalho */}
        <div>
          <h3 className="text-base font-medium text-foreground mb-2">
            {getTitle()}
          </h3>
          
          <div className="flex flex-wrap gap-2">
            {item.tipo && (
              <Badge variant="outline">{item.tipo}</Badge>
            )}
            {item.numero && (
              <Badge variant="outline">Nº {item.numero}</Badge>
            )}
            {item.ato && (
              <Badge variant="outline">{item.ato}</Badge>
            )}
          </div>
        </div>

        {/* Informações principais */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
          {item.data && (
            <div>
              <span className="text-muted-foreground">Data:</span>{' '}
              <span className="text-foreground">{item.data}</span>
            </div>
          )}
          {item.orgao && (
            <div>
              <span className="text-muted-foreground">Órgão:</span>{' '}
              <span className="text-foreground">{item.orgao}</span>
            </div>
          )}
          {item.nome && (
            <div>
              <span className="text-muted-foreground">Nome:</span>{' '}
              <span className="text-foreground">{item.nome}</span>
            </div>
          )}
          {item.cargo && (
            <div>
              <span className="text-muted-foreground">Cargo:</span>{' '}
              <span className="text-foreground">{item.cargo}</span>
            </div>
          )}
          {item.simbolo && (
            <div>
              <span className="text-muted-foreground">Símbolo:</span>{' '}
              <span className="text-foreground">{item.simbolo}</span>
            </div>
          )}
          {item.sigrh && (
            <div>
              <span className="text-muted-foreground">SIGRH:</span>{' '}
              <span className="text-foreground">{item.sigrh}</span>
            </div>
          )}
          {item.matricula && (
            <div>
              <span className="text-muted-foreground">Matrícula:</span>{' '}
              <span className="text-foreground">{item.matricula}</span>
            </div>
          )}
        </div>

        {/* Conteúdo colapsável */}
        <div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full justify-between h-auto py-2"
          >
            <span className="text-sm font-medium">
              {isExpanded ? 'Ver menos' : 'Ver conteúdo completo'}
            </span>
            {isExpanded ? (
              <ChevronUp className="w-4 h-4 ml-2" />
            ) : (
              <ChevronDown className="w-4 h-4 ml-2" />
            )}
          </Button>

          {isExpanded && (
            <div className="mt-3 p-4 bg-muted/50 rounded-lg">
              <p className="text-sm text-foreground whitespace-pre-wrap leading-relaxed">
                {getContent()}
              </p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};
