import React from 'react';

interface Quote {
  dex: string;
  outputAmount: string;
  gasEstimate: string;
  priceImpact: number;
  latency: number;
}

export const QuoteDisplay: React.FC<{ quotes: Quote[] }> = ({ quotes }) => {
  if (quotes.length === 0) return null;

  return (
    <div className="space-y-2">
      {quotes.map((quote, idx) => (
        <div key={idx} className={`p-3 rounded border ${idx === 0 ? 'bg-green-900/30 border-green-500/50' : 'bg-gray-800/30 border-gray-700'}`}>
          <div className="flex justify-between items-center">
            <span className="font-semibold text-gray-200">{quote.dex}</span>
            <span className="text-green-400">{quote.outputAmount}</span>
          </div>
          <div className="text-xs text-gray-400 mt-1">Impact: {quote.priceImpact}% | Gas: {quote.gasEstimate} | Latency: {quote.latency}ms</div>
        </div>
      ))}
    </div>
  );
};
