import BigNumber from 'bignumber.js';

export const shiftedBy = (value, decimals) => new BigNumber(value).shiftedBy(decimals).toString();

export const test = () => [];
