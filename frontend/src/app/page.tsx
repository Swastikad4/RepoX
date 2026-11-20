'use client';

import { useState } from 'react';
import { UrlInput } from '@/components/UrlInput';
import { AnalysisResults } from '@/components/AnalysisResults';
import { startAnalysis, getAnalysis, refreshAnalysis } from '@/lib/api';
import { AnalysisResult } from '@/types';
import { AlertCircle, CheckCircle2, RefreshCw, Loader2 } from 'lucide-react';
import { usePolling } from '@/hooks/usePolling';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [analysisId, setAnalysisId] = useState<string | null>(null);
  const [quotaExhausted, setQuotaExhausted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isShowingExample, setIsShowingExample] = useState(false);
  const [isCachedResult, setIsCachedResult] = useState(false);
  const [cachedAt, setCachedAt] = useState<string | null>(null);
  const [currentRepoUrl, setCurrentRepoUrl] = useState<string | null>(null);

  // Polling hook for async analysis
  const { status: pollingStatus, isPolling } = usePolling(
    analysisId,
    {
      onComplete: (completedResult) => {
        setResult(completedResult);
        setLoading(false);
      },
      onError: (errorMessage) => {
        setError(errorMessage);
        setLoading(false);
        setQuotaExhausted(errorMessage.includes('quota'));
      },
    }
  );

  const handleSubmit = async (url: string) => {
    setLoading(true);
    setError(null);
    setResult(null);
    setAnalysisId(null);
    setIsShowingExample(false);
    setQuotaExhausted(false);
    setIsCachedResult(false);
    setCachedAt(null);
    setCurrentRepoUrl(url);

    try {
      const response = await startAnalysis({ repo_url: url });
      
      if (response.status === 'completed' || response.status === 'complete') {
        // Analysis already completed (cached) - fetch results immediately
        setAnalysisId(response.analysis_id);
        setIsCachedResult(response.cached || false);
        setCachedAt(response.cached_at || null);
        const data = await getAnalysis(response.analysis_id);
        setResult(data);
        setLoading(false);
      } else {
        // Analysis pending or started - begin polling
        setAnalysisId(response.analysis_id);
        setIsCachedResult(false);
        // Loading will be set to false when polling completes
      }
    } catch (err) {
      console.log('Error caught:', err);
      console.log('Error message:', err instanceof Error ? err.message : 'Not an Error object');
      
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      
      // Handle quota exhaustion specifically
      if (errorMessage.includes('quota_exhausted') || 
          errorMessage.includes('429') || 
          errorMessage.includes('quota')) {
        console.log('Quota exhausted detected!');
        setQuotaExhausted(true);
      } 
      // Handle other service unavailable errors
      else if (errorMessage.includes('Service temporarily unavailable')) {
        setError('The analysis service is temporarily unavailable. Please try again in a few moments.');
      }
      // Handle network/connection errors
      else if (errorMessage.includes('Failed to fetch') || errorMessage.includes('Network')) {
        setError('Unable to connect to the analysis service. Please check your internet connection and try again.');
      }
      // Handle timeout errors
      else if (errorMessage.includes('timeout')) {
        setError('The analysis is taking longer than expected. Please try again with a smaller repository or try again later.');
      }
      // General fallback for other errors
      else {
        console.log('Falling back to general error for message:', errorMessage);
        setError('An unexpected error occurred during analysis. Please try again. If the problem persists, the repository might be too large or have access restrictions.');
      }
      
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    if (!analysisId || !currentRepoUrl) return;
    
    setRefreshing(true);
    setError(null);
    setQuotaExhausted(false);

    try {
      console.log(`🔄 Refreshing analysis ${analysisId} for ${currentRepoUrl}`);
      const response = await refreshAnalysis({ repo_url: currentRepoUrl, force_refresh: true });
      
      if (response.status === 'completed' || response.status === 'complete') {
        // Fetch updated results
        const data = await getAnalysis(response.analysis_id);
        setResult(data);
        setIsCachedResult(false);
        setCachedAt(null);
        console.log(`✅ Refresh complete for ${currentRepoUrl}`);
      }
    } catch (err) {
      console.log('Refresh error caught:', err);
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      
      // Handle quota exhaustion specifically
      if (errorMessage.includes('quota_exhausted') || 
          errorMessage.includes('429') || 
          errorMessage.includes('quota') ||
          (err && typeof err === 'object' && 'status' in err && (err as { status: number }).status === 429)) {
        console.log('Quota exhausted during refresh!');
        setQuotaExhausted(true);
      } else {
        setError(`Failed to refresh analysis: ${errorMessage}`);
      }
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <div className="relative overflow-hidden bg-[#F8F8FA] min-h-[calc(100vh-140px)] pb-12">
      {/* Huge Transparent GitHub Logo Watermark */}
      <div 
        className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden flex items-center justify-center opacity-[0.09]"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 100 100"
          className="w-[500px] h-[500px] sm:w-[650px] sm:h-[650px] md:w-[780px] md:h-[780px] text-gray-950 fill-current"
        >
          {/* Circular badge with inverted Octocat silhouette matching reference */}
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M50 0C22.386 0 0 22.386 0 50s22.386 50 50 50 50-22.386 50-50S77.614 0 50 0zm0 18c-17.673 0-32 14.327-32 32 0 14.138 9.167 26.134 21.884 30.366 1.6.295 2.184-.695 2.184-1.542 0-.76-.028-3.277-.043-5.945-8.902 1.935-10.78-3.791-10.78-3.791-1.455-3.696-3.555-4.68-3.555-4.68-2.906-1.986.22-1.946.22-1.946 3.212.226 4.903 3.298 4.903 3.298 2.855 4.892 7.49 3.479 9.315 2.661.29-2.068 1.118-3.48 2.034-4.28-7.106-.808-14.577-3.553-14.577-15.811 0-3.492 1.247-6.347 3.293-8.583-.33-.809-1.427-4.062.313-8.463 0 0 2.686-.86 8.8 3.28 2.552-.71 5.289-1.065 8.009-1.078 2.719.013 5.457.368 8.012 1.078 6.109-4.14 8.79-3.28 8.79-3.28 1.744 4.401.647 7.654.318 8.463 2.05 2.236 3.29 5.091 3.29 8.583 0 12.29-7.483 14.993-14.61 15.785 1.149.99 2.173 2.94 2.173 5.925 0 4.278-.039 7.731-.039 8.781 0 .855.577 1.854 2.197 1.539C72.844 76.128 82 64.134 82 50c0-17.673-14.327-32-32-32z"
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-16">
        {/* Hero Section matching editorial palette */}
        <div className="text-center mb-10 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-6xl font-black text-gray-950 tracking-tight leading-[1.1] mb-4">
            Understand Your Codebase.<br />
            <span className="bg-gradient-to-r from-gray-950 via-gray-900 to-gray-800 bg-clip-text text-transparent">
              Visualize Its Architecture.
            </span>
          </h1>
          <p className="text-lg sm:text-xl font-semibold text-[#E11D74] max-w-2xl mx-auto mb-2">
            Agile architecture intelligence & automated dependency mapping.
          </p>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
            Analyze Python, TypeScript, and JavaScript repositories, inspect graph centrality, and generate self-correcting Mermaid diagrams.
          </p>
        </div>

        {/* Quota Exhausted Message - Only show when quotas are exhausted */}
        {quotaExhausted && (
          <div className="max-w-2xl mx-auto mb-8">
            <div className="flex items-center p-4 bg-red-50 border border-red-200 rounded-lg shadow-xs">
              <AlertCircle className="w-5 h-5 text-red-500 mr-3 flex-shrink-0" />
              <div>
                <h3 className="text-red-800 font-semibold">RepoX Demo - Quotas Exhausted</h3>
                <p className="text-red-700 text-sm mt-1">
                  This is a demo instance of RepoX using free Gemini API quotas which have been exhausted for today. Please try again tomorrow when quotas reset.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Input Section */}
        <div className="mb-8">
          <UrlInput onSubmit={handleSubmit} loading={loading || refreshing} />
        </div>

        {/* Loading State */}
        {(loading || refreshing) && (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              {/* Main loading indicator */}
              <div className="inline-flex items-center px-6 py-4 bg-pink-50 text-[#BE185D] border border-pink-200/80 rounded-xl mb-4 shadow-sm">
                <Loader2 className="w-5 h-5 animate-spin mr-3 text-[#E11D74]" />
                <div className="text-left">
                  <div className="font-semibold text-gray-900">
                    {refreshing 
                      ? 'Refreshing RepoX analysis...'
                      : isPolling 
                        ? 'RepoX analysis in progress...'
                        : 'Starting RepoX analysis...'
                    }
                  </div>
                  {pollingStatus?.progress_status && (
                    <div className="text-sm text-[#E11D74] mt-0.5 font-medium">
                      {pollingStatus.progress_status}
                    </div>
                  )}
                </div>
              </div>
              
              {/* Patient message */}
              {isPolling && (
                <div className="text-center text-sm text-gray-700 bg-white border border-gray-200/80 px-5 py-4 rounded-xl shadow-xs">
                  <div className="font-semibold text-gray-900 mb-1">
                    ✨ Hold tight, RepoX is mapping the architecture! ✨
                  </div>
                  <div className="text-xs text-gray-600 leading-relaxed">
                    This usually takes around 2 minutes. Perfect time to grab a coffee ☕
                    <br />
                    <span className="text-[#E11D74] font-medium mt-1 block">
                      Reverse-engineering ASTs, imports, and multi-agent topology...
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="max-w-2xl mx-auto mb-8">
            <div className="flex items-center p-4 bg-red-50 border border-red-200 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-500 mr-3 flex-shrink-0" />
              <div>
                <h3 className="text-red-800 font-medium">Analysis Failed</h3>
                <p className="text-red-700 text-sm mt-1">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Success State - Only show when we have results and no quota issues */}
        {result && analysisId && !quotaExhausted && (
          <div className="mb-8">
            <div className="max-w-2xl mx-auto mb-6">
              <div className="flex items-center p-4 bg-emerald-50 border border-emerald-200 rounded-xl shadow-xs">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 mr-3 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="text-emerald-900 font-semibold">
                    {isShowingExample 
                      ? 'Example Loaded' 
                      : isCachedResult 
                        ? 'Analysis Retrieved from Cache' 
                        : 'Analysis Complete'
                    }
                  </h3>
                  <p className="text-emerald-700 text-sm mt-0.5">
                    {isShowingExample 
                      ? 'Example repository loaded successfully. View analysis below.'
                      : isCachedResult
                        ? `Previous analysis found${cachedAt ? ` (analyzed on ${new Date(cachedAt).toLocaleDateString()})` : ''}. Click refresh for latest analysis.`
                        : 'Repository analyzed successfully. View results below.'
                    }
                  </p>
                </div>
                {isCachedResult && !isShowingExample && (
                  <button
                    onClick={handleRefresh}
                    disabled={refreshing}
                    className="ml-4 inline-flex items-center px-3 py-2 text-xs font-semibold text-emerald-800 bg-emerald-100 border border-emerald-300 rounded-lg hover:bg-emerald-200 focus:outline-none transition-colors disabled:opacity-50"
                  >
                    {refreshing ? (
                      <>
                        <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-emerald-800 mr-1.5"></div>
                        Refreshing...
                      </>
                    ) : (
                      <>
                        <RefreshCw className="w-3 h-3 mr-1.5" />
                        Refresh
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
            
            <AnalysisResults result={result} analysisId={analysisId} />
          </div>
        )}

        {/* Help Text - Only show when no loading, no results, no errors, and no quota issues */}
        {!loading && !refreshing && !result && !error && !quotaExhausted && (
          <div className="max-w-4xl mx-auto mt-12">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-7 rounded-xl shadow-xs border border-gray-200/80 hover:shadow-sm transition-shadow">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 rounded-full bg-[#E11D74]"></span>
                  <h3 className="text-base font-bold text-gray-950 uppercase tracking-wide">What RepoX does</h3>
                </div>
                <ul className="space-y-2.5 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-[#E11D74] font-bold">•</span>
                    <span>Analyzes Python, TypeScript, and JavaScript codebases</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#E11D74] font-bold">•</span>
                    <span>Generates architecture overview documentation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#E11D74] font-bold">•</span>
                    <span>Creates self-correcting Mermaid diagrams for dependencies and structure</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#E11D74] font-bold">•</span>
                    <span>Calculates file centrality, fan-in/fan-out, and graph metrics</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#E11D74] font-bold">•</span>
                    <span>Provides downloadable reports, SVG, PNG, and Markdown exports</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white p-7 rounded-xl shadow-xs border border-gray-200/80 hover:shadow-sm transition-shadow">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 rounded-full bg-[#E11D74]"></span>
                  <h3 className="text-base font-bold text-gray-950 uppercase tracking-wide">How to use RepoX</h3>
                </div>
                <ol className="space-y-2.5 text-sm text-gray-700">
                  <li className="flex items-start gap-2.5">
                    <span className="font-bold text-[#E11D74] text-xs pt-0.5">01</span>
                    <span>Enter a public GitHub repository URL above</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="font-bold text-[#E11D74] text-xs pt-0.5">02</span>
                    <span>Click &quot;Analyze Repository&quot; to initialize AI analysis</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="font-bold text-[#E11D74] text-xs pt-0.5">03</span>
                    <span>Wait for multi-agent parsing and graph synthesis</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="font-bold text-[#E11D74] text-xs pt-0.5">04</span>
                    <span>Explore interactive dependency views across tabs</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="font-bold text-[#E11D74] text-xs pt-0.5">05</span>
                    <span>Download reports and architecture diagrams</span>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
