export const toFloat = (val: number, precision: number): string => {
  /**
   * Return 6 digit number of format xxx.xxx
   * pad 0's to the front
   */
  const nos = parseFloat(val.toString()).toFixed(precision);
  let pad = '';
  if (Math.trunc(val) < 10) {
    pad = ('0' + nos).slice(-2);
  } else if (Math.trunc(val) < 100) {
    pad = ('0' + nos).slice(-1);
  }

  return pad.concat(nos);
};
