import { useState } from 'react';
import { formatZAR } from '../data/commodities';

export default function CommodityBoard({ commodities, selectedId, onSelectCrop }) {
  const [filter, setFilter] = useState('All');

  const categories = ['All', ...new Set(commodities.map((c) => c.category))];
  const visibleCrops = filter === 'All'
    ? commodities
    : commodities.filter((c) => c.category === filter);

  return (
    <section className="card market-card">
      <div className="card-header">
        <div>
          <span className="badge badge-gold">SAFEX Reference · ZAR/ton</span>
          <h2>Free State Commodity Board</h2>
        </div>

        <div className="filter-pills">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`pill ${filter === cat ? 'active' : ''}`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="table-wrapper">
        <table className="commodity-table">
          <thead>
            <tr>
              <th>Commodity</th>
              <th>Primary Belt</th>
              <th>Spot Price (ZAR/t)</th>
              <th>24h Change</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {visibleCrops.map((crop) => {
              const isPositive = crop.changePercent >= 0;
              const isSelected = crop.id === selectedId;
              return (
                <tr key={crop.id} className={isSelected ? 'selected-row' : ''}>
                  <td><strong>{crop.name}</strong></td>
                  <td className="muted">{crop.regionNote}</td>
                  <td><strong>{formatZAR(crop.priceZarPerTon)}</strong></td>
                  <td>
                    <span className={`delta ${isPositive ? 'up' : 'down'}`}>
                      {isPositive ? '▲' : '▼'} {Math.abs(crop.changePercent).toFixed(2)}%
                    </span>
                  </td>
                  <td>
                    <button
                      className={`btn-calc ${isSelected ? 'active' : ''}`}
                      onClick={() => onSelectCrop(crop)}
                    >
                      {isSelected ? 'Selected' : 'Calculate'}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="footnote">
        * Indicative Free State / SAFEX reference prices in South African Rand (ZAR) per metric ton. Click any crop to load it into the profit calculator.
      </p>
    </section>
  );
}
