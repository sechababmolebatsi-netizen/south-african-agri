export const FREE_STATE_COMMODITIES = [
  {
    id: 'wmaize',
    name: 'White Maize (WM1)',
    category: 'Grains',
    priceZarPerTon: 4680,
    changePercent: 1.45,
    defaultYieldTonsPerHa: 5.5,
    defaultInputCostPerHa: 14500,
    regionNote: 'Central & Western Free State',
  },
  {
    id: 'ymaize',
    name: 'Yellow Maize (YM1)',
    category: 'Grains',
    priceZarPerTon: 4390,
    changePercent: -0.62,
    defaultYieldTonsPerHa: 6.0,
    defaultInputCostPerHa: 14200,
    regionNote: 'Eastern Free State',
  },
  {
    id: 'sunflower',
    name: 'Sunflower Seed (SUNS)',
    category: 'Oilseeds',
    priceZarPerTon: 9150,
    changePercent: 2.1,
    defaultYieldTonsPerHa: 1.8,
    defaultInputCostPerHa: 9800,
    regionNote: 'Bloemfontein & Bothaville',
  },
  {
    id: 'soybeans',
    name: 'Soybeans (SOYA)',
    category: 'Oilseeds',
    priceZarPerTon: 8740,
    changePercent: 0.85,
    defaultYieldTonsPerHa: 2.2,
    defaultInputCostPerHa: 11600,
    regionNote: 'Eastern & Northern Free State',
  },
  {
    id: 'wheat',
    name: 'Bread Wheat (WEAT)',
    category: 'Winter Grains',
    priceZarPerTon: 6120,
    changePercent: -0.35,
    defaultYieldTonsPerHa: 3.4,
    defaultInputCostPerHa: 12900,
    regionNote: 'Irrigation & Dryland Free State',
  },
];

export function formatZAR(value) {
  return new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}
