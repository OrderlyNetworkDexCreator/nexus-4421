import React from 'react';

export const QuoteDisplay: React.FC<{ quotes: any[] }> = ({ quotes }) => {
  if (quotes.length === 0) return null;

  return (
    <div className="space-y-2 mt-4">
      {quotes.map((quote: any, idx: number) => (
        <div key={idx} className={`p-3 rounded border ${idx === 0 ? 'bg-green-900/30 border-green-500' : 'bg-gray-800/30 border-gray-700'}`}>
          <div className="flex justify-between">
            <span className="font-semibold text-gray-200">{quote.dex}</span>
            <span className="text-green-400">{quote.outputAmount}</span>
          </div>
          <div className="text-xs text-gray-400">Impact: {quote.priceImpact}% | Gas: {quote.gasEstimate}</div>
        </div>
      ))}
    </div>
  );
};
