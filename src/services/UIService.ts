function formatNumber(num: number, balance = false): string {
  const precision = 1;
  const format = (num: number, divisor: number, precision: number) => {
    const res = num / divisor;
    return parseFloat(res.toFixed(precision));
  };
  if (num > 1_000_000_000) {
    return `${format(num, 1_000_000_000, precision)}B`;
  }
  if (num > 1_000_000) {
    return `${format(num, 1_000_000, balance ? 3 : precision)}M`;
  }
  if (num > 1_000) {
    return `${format(num, 1_000, precision)}K`;
  }
  return String(num);
}

export { formatNumber };
