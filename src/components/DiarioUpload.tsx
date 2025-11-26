import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DiarioResponse } from '@/types/diario';
import { FileText, Link, Loader2, Upload } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface DiarioUploadProps {
  onResult: (data: DiarioResponse) => void;
}

export const DiarioUpload = ({ onResult }: DiarioUploadProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [url, setUrl] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file && !url) {
      toast.error('Por favor, envie um arquivo PDF ou cole a URL');
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();

      if (file) {
        formData.append('pdf_file', file);
      } else if (url) {
        formData.append('url', url);
      }
      const baseApiUrl = import.meta.env.VITE_BASE_URL_API || 'http://localhost:8000';
      console.log('Enviando requisição para:', import.meta.env.VITE_BASE_URL_API + '/api/process');

      

      const response = await fetch(baseApiUrl + '/api/process', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Erro ao processar o diário');
      }

      const data: DiarioResponse = await response.json();
      onResult(data);
      toast.success('Diário processado com sucesso!');
    } catch (error) {
      console.error('Erro:', error);
      toast.error(
        'Não foi possível processar o diário. Verifique a conexão com a API.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type !== 'application/pdf') {
        toast.error('Por favor, selecione um arquivo PDF');
        return;
      }
      setFile(selectedFile);
      setUrl('');
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
    setFile(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl p-8 shadow-lg">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <FileText className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-semibold text-foreground mb-2">
            Processador do Diário Oficial
          </h1>
          <p className="text-muted-foreground">
            Envie um PDF ou cole a URL do Diário Oficial do DF para consultar os
            atos publicados
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="file-upload" className="text-base mb-2 block">
                Enviar arquivo PDF
              </Label>
              <div className="relative">
                <Input
                  id="file-upload"
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  disabled={isLoading || !!url}
                  className="cursor-pointer"
                />
                <Upload className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
              </div>
              {file && (
                <p className="text-sm text-muted-foreground mt-2">
                  Arquivo selecionado: {file.name}
                </p>
              )}
            </div>

            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-border" />
              <span className="text-sm text-muted-foreground">ou</span>
              <div className="flex-1 h-px bg-border" />
            </div>

            <div>
              <Label htmlFor="url-input" className="text-base mb-2 block">
                Colar URL do arquivo
              </Label>
              <div className="relative">
                <Input
                  id="url-input"
                  type="url"
                  placeholder="https://exemplo.com/diario.pdf"
                  value={url}
                  onChange={handleUrlChange}
                  disabled={isLoading || !!file}
                  className="pl-10"
                />
                <Link className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              </div>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading || (!file && !url)}
            className="w-full h-12 text-base"
            size="lg"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Processando...
              </>
            ) : (
              'Processar Diário'
            )}
          </Button>
        </form>

        <p className="text-sm text-muted-foreground text-center mt-6">
          Os dados serão processados de forma segura e organizada para fácil
          consulta
        </p>
      </Card>
    </div>
  );
};
