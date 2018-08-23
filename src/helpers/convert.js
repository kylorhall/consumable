export default (props = {}) => {
  const { from, to, units } = props;
  const value = props.value || 0;

  if (!units[from] || !units[from].conversion) throw new Error(`Incorrect 'from' value of '${from}' in conversion.`);
  if (!units[to] || !units[to].conversion) throw new Error(`Incorrect 'to' value of '${to}' in conversion.`);

  const toBase = (value || 0) * units[from].conversion;
  return toBase / units[to].conversion;
};
