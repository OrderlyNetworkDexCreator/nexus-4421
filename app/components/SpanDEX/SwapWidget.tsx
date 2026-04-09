import React, { useState } from 'react';
import useSpanDEX from '@/hooks/useSpanDEX';

export const SwapWidget: React.FC = () => {
  const [tokenIn, setTokenIn] = useState('ETH');
  const [tokenOut, setTokenOut] = useState('USDC');
  const [amountIn, setAmountIn] = useState('1.0');
  const { quotes, loading, error } = useSpanDEX();

  const bestQuote = Object.entries(quotes).reduce((best: any, [dex, quote]: any) => {
    if (!best) return { dex, ...quote };
    return quote.outputAmount > best.outputAmount ? { dex, ...quote } : best;
  }, null);

  return (
    <div className="w-full max-w-md mx-auto p-8 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl shadow-2xl border border-blue-500/20">
      <h2 className="text-3xl font-bold text-white mb-6">Swap with Fabric</h2>
      
      <div className="mb-4 p-4 bg-slate-700/50 rounded-xl border border-slate-600">
        <label className="text-sm text-gray-300 mb-2 block">From</label>
        <input type="number" placeholder="0.00" value={amountIn} onChange={(e) => setAmountIn(e.target.value)} className="w-full bg-slate-800 text-white p-3 rounded mb-2 border border-slate-600" />
        <select value={tokenIn} onChange={(e) => setTokenIn(e.target.value)} className="w-full bg-slate-800 text-white p-2 rounded border border-slate-600">
          <option>ETH</option>
          <option>USDC</option>
          <option>USDT</option>
          <option>DAI</option>
        </select>
      </div>

      <div className="mb-6 p-4 bg-slate-700/50 rounded-xl border border-slate-600">
        <label className="text-sm text-gray-300 mb-2 block">To</label>
        <input type="number" placeholder="0.00" value={bestQuote?.outputAmount || ''} readOnly className="w-full bg-slate-800 text-white p-3 rounded mb-2 border border-slate-600" />
        <select value={tokenOut} onChange={(e) => setTokenOut(e.target.value)} className="w-full bg-slate-800 text-white p-2 rounded border border-slate-600">
          <option>USDC</option>
          <option>ETH</option>
          <option>USDT</option>
          <option>DAI</option>
        </select>
      </div>

      {bestQuote && (
        <div className="mb-6 p-4 bg-green-900/20 border border-green-500/30 rounded-xl">
          <p className="text-sm text-gray-300"><strong>Best Route:</strong> {bestQuote.dex}</p>
          <p className="text-sm text-gray-300"><strong>Price Impact:</strong> {bestQuote.priceImpact}%</p>
        </div>
      )}

      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition">
        {loading ? 'Loading Quotes...' : bestQuote ? 'Execute Swap' : 'Get Best Quote'}
      </button>
    </div>
  );
};
