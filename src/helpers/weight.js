import convert from './convert';

// NOTE: Units may not be quite precise enough due to low precision.
export const units = {
  g: {
    abbr: 'g',
    name: 'gram',
    conversion: 1,
  },
  oz: {
    abbr: 'oz',
    name: 'ounce',
    conversion: 28.349523125,
  },
  kg: {
    abbr: 'kg',
    name: 'kilogram',
    conversion: 1000,
  },
  lb: {
    abbr: 'lb',
    name: 'pound',
    conversion: 453.59237,
  },
};

// NOTE: All conversions are based off of grams as the base unit, so oz => lb converts to grams first.  This may cause more rounding issues.
export const base = units.g;
export const baseUnit = base.abbr;

export default ({ from, to, value }) => convert({
  from: from || baseUnit,
  to: to || baseUnit,
  units,
  value: value || 0,
});
