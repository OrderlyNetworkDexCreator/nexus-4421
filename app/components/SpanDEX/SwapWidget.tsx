import React, { useState } from 'react';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import useSpanDEX from '@/hooks/useSpanDEX';

interface SwapWidgetProps {
  onSwapComplete?: (txHash: string) => void;
}

export const SwapWidget: React.FC<SwapWidgetProps> = ({ onSwapComplete }) => {
  const [tokenIn, setTokenIn] = useState('ETH');
  const [tokenOut, setTokenOut] = useState('USDC');
  const [amountIn, setAmountIn] = useState('1.0');
  const [slippage, setSlippage] = useState('0.5');
  const { quotes, loading, error } = useSpanDEX();

  const bestQuote = Object.entries(quotes).reduce((best, [dex, quote]) => {
    if (!best) return { dex, ...quote };
    return quote.outputAmount > best.outputAmount ? { dex, ...quote } : best;
  }, null as any);

  const handleSwap = async () => {
    if (!bestQuote) return;
    try {
      console.log('Executing swap:', { tokenIn, tokenOut, amountIn, bestQuote });
    } catch (err) {
      console.error('Swap failed:', err);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl shadow-2xl border border-blue-500/20">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Swap</h2>
        <div className="text-xs bg-blue-500/20 px-3 py-1 rounded-full text-blue-300">Powered by Fabric</div>
      </div>

      {/* Slippage */}
      <div className="mb-6 p-3 bg-slate-700/50 rounded-lg border border-slate-600">
        <label className="text-sm text-gray-300 mb-2 block">Slippage: {slippage}%</label>
        <input type="range" min="0" max="5" step="0.1" value={slippage} onChange={(e) => setSlippage(e.target.value)} className="w-full" />
      </div>

      {/* From */}
      <div className="mb-4 p-4 bg-slate-700/50 rounded-xl border border-slate-600">
        <label className="text-sm font-medium text-gray-300 mb-3 block">From</label>
        <div className="flex gap-2">
          <input type="number" placeholder="0.00" value={amountIn} onChange={(e) => setAmountIn(e.target.value)} className="flex-1 bg-slate-800 text-white px-4 py-3 rounded-lg border border-slate-600 focus:border-blue-500 outline-none" />
          <select value={tokenIn} onChange={(e) => setTokenIn(e.target.value)} className="bg-slate-800 text-white px-4 py-3 rounded-lg border border-slate-600 font-semibold">
            <option>ETH</option>
            <option>USDC</option>
            <option>USDT</option>
            <option>DAI</option>
            <option>WBTC</option>
          </select>
        </div>
      </div>

      {/* Swap Arrow */}
      <div className="flex justify-center mb-4">
        <button className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition transform hover:scale-110">⇅</button>
      </div>

      {/* To */}
      <div className="mb-6 p-4 bg-slate-700/50 rounded-xl border border-slate-600">
        <label className="text-sm font-medium text-gray-300 mb-3 block">To</label>
        <div className="flex gap-2">
          <input type="number" placeholder="0.00" value={bestQuote?.outputAmount || ''} readOnly className="flex-1 bg-slate-800 text-white px-4 py-3 rounded-lg border border-slate-600" />
          <select value={tokenOut} onChange={(e) => setTokenOut(e.target.value)} className="bg-slate-800 text-white px-4 py-3 rounded-lg border border-slate-600 font-semibold">
            <option>USDC</option>
            <option>ETH</option>
            <option>USDT</option>
            <option>DAI</option>
            <option>WBTC</option>
          </select>
        </div>
      </div>

      {/* Quote Info */}
      {bestQuote && (
        <div className="mb-6 p-4 bg-gradient-to-r from-green-900/20 to-emerald-900/20 border border-green-500/30 rounded-xl">
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div><div className="text-gray-400">Best Route</div><div className="text-green-400 font-semibold">{bestQuote.dex}</div></div>
            <div><div className="text-gray-400">Price Impact</div><div className={parseFloat(bestQuote.priceImpact) > 2 ? 'text-orange-400' : 'text-green-400'} >{bestQuote.priceImpact}%</div></div>
            <div><div className="text-gray-400">Gas</div><div className="text-blue-400 font-semibold">{bestQuote.gasEstimate}</div></div>
            <div><div className="text-gray-400">Latency</div><div className="text-gray-300 font-semibold">{bestQuote.latency}ms</div></div>
          </div>
        </div>
      )}

      {/* Button */}
      {loading ? (
        <button disabled className="w-full bg-blue-600/50 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2">
          <LoadingSpinner /> Fetching...
        </button>
      ) : (
        <button onClick={handleSwap} disabled={!bestQuote} className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 rounded-lg disabled:opacity-50">
          {bestQuote ? 'Execute Swap' : 'Get Quotes'}
        </button>
      )}

      {Object.keys(quotes).length > 0 && <div className="mt-4 text-xs text-center text-gray-400">✓ {Object.keys(quotes).length} quotes from aggregators</div>}
    </div>
  );
};
