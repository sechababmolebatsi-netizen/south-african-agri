import { useEffect, useState } from 'react';
import { formatZAR } from '../Data/commodities';

export default function ProfitCalculator({ selectedCrop }) {
  const [hectares, setHectares] = useState(50);
  const [pricePerTon, setPricePerTon] = useState(selectedCrop.priceZarPerTon);
  const [yieldPerHa, setYieldPerHa] = useState(selectedCrop.defaultYieldTonsPerHa);
  const [inputCostPerHa, setInputCostPerHa] = useState(selectedCrop.defaultInputCostPerHa);

  useEffect(() => {
    setPricePerTon(selectedCrop.priceZarPerTon);
    setYieldPerHa(selectedCrop.defaultYieldTonsPerHa);
    setInputCostPerHa(selectedCrop.defaultInputCostPerHa);
  }, [selectedCrop]);

  const safeHa = Math.max(0, Number(hectares) || 0);
  const safePrice = Math.max(0, Number(pricePerTon) || 0);
  const safeYield = Math.max(0, Number(yieldPerHa) || 0);
  const safeCost = Math.max(0, Number(inputCostPerHa) || 0);

  const totalHarvestTons = safeHa * safeYield;
  const grossRevenue = totalHarvestTons * safePrice;
  const totalInputCost = safeHa * safeCost;
  const netProfit = grossRevenue - totalInputCost;
  const breakEvenYield = safePrice > 0 ? safeCost / safePrice : 0;

  return (
    <section className="card calculator-card">
      <div className="card-header">
        <div>
          <span className="badge">Farm Planning Tool</span>
          <h2>Harvest & Input Profit Calculator — {selectedCrop.name}</h2>
        </div>
      </div>

      <div className="calc-layout">
        <div className="calc-inputs">
          <label>
            <span>Area Planted (Hectares)</span>
            <input
              type="number"
              min="0"
              step="1"
              value={hectares}
              onChange={(e) => setHectares(e.target.value)}
            />
          </label>

          <label>
            <span>Market Price (ZAR / ton)</span>
            <input
              type="number"
              min="0"
              step="50"
              value={pricePerTon}
              onChange={(e) => setPricePerTon(e.target.value)}
            />
          </label>

          <label>
            <span>Expected Yield (tons / ha)</span>
            <input
              type="number"
              min="0"
              step="0.1"
              value={yieldPerHa}
              onChange={(e) => setYieldPerHa(e.target.value)}
            />
          </label>

          <label>
            <span>Input Costs (ZAR / ha — seed, fertilizer, fuel)</span>
            <input
              type="number"
              min="0"
              step="100"
              value={inputCostPerHa}
              onChange={(e) => setInputCostPerHa(e.target.value)}
            />
          </label>
        </div>

        <div className="calc-results">
          <div className="result-row">
            <span>Expected Total Harvest</span>
            <strong>{totalHarvestTons.toFixed(1)} tons</strong>
          </div>
          <div className="result-row">
            <span>Gross Revenue</span>
            <strong>{formatZAR(grossRevenue)}</strong>
          </div>
          <div className="result-row">
            <span>Total Input Costs</span>
            <strong>{formatZAR(totalInputCost)}</strong>
          </div>
          <div className="result-row">
            <span>Break-Even Yield</span>
            <strong>{breakEvenYield.toFixed(2)} tons/ha</strong>
          </div>
          <div className={`net-profit-box ${netProfit >= 0 ? 'profit' : 'loss'}`}>
            <span>Estimated Net Margin</span>
            <strong>{formatZAR(netProfit)}</strong>
          </div>
        </div>
      </div>
    </section>
  );
}
