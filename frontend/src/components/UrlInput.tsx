'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Github, Loader2 } from 'lucide-react';

interface UrlInputProps {
  onSubmit: (url: string) => void;
  loading: boolean;
}

export function UrlInput({ onSubmit, loading }: UrlInputProps) {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onSubmit(url.trim());
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5">
        <div className="relative flex-1">
          <Github className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
          <Input
            type="url"
            placeholder="https://github.com/owner/repository"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="pl-10 h-11 text-gray-950 font-medium bg-white border-gray-300 shadow-sm rounded-lg focus:ring-[#E11D74] focus:border-[#E11D74]"
            disabled={loading}
            required
          />
        </div>
        <Button 
          type="submit" 
          disabled={loading || !url.trim()}
          className="h-11 px-6 bg-[#E11D74] hover:bg-[#BE185D] text-white font-semibold shadow-sm transition-all rounded-lg"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin text-white" />
              Analyzing...
            </>
          ) : (
            'Analyze Repository'
          )}
        </Button>
      </form>
    </div>
  );
}
