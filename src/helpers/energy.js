import convert from './convert';

export const units = {
  kcal: {
    abbr: 'kcal',
    name: 'calorie',
    conversion: 1,
  },
  kj: {
    abbr: 'kj',
    name: 'kilojoule',
    conversion: 4.1868,
  },
};

export const base = units.kcal; // NOTE: All conversions are based off of kcal as the base unit.
export const baseUnit = base.abbr;

export default ({ from, to, value }) => convert({
  from: from || baseUnit,
  to: to || baseUnit,
  units,
  value: value || 0,
});
