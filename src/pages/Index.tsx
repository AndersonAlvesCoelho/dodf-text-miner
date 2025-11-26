import { useState } from 'react';
import { DiarioUpload } from '@/components/DiarioUpload';
import { DiarioResult } from '@/components/DiarioResult';
import { DiarioResponse } from '@/types/diario';

const Index = () => {
  const [result, setResult] = useState<DiarioResponse | null>(null);

  const handleResult = (data: DiarioResponse) => {
    setResult(data);
  };

  const handleBack = () => {
    setResult(null);
  };

  return (
    <div className="bg-background min-h-screen">
      {result ? (
        <DiarioResult data={result} onBack={handleBack} />
      ) : (
        <DiarioUpload onResult={handleResult} />
      )}
    </div>
  );
};

export default Index;
