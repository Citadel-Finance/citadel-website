import Web3 from 'web3';
import Web4 from '@cryptonteam/web4';
import BigNumber from 'bignumber.js';
import { BEP20, POOL, FACTORY } from '~/abis';

let web3;
let web4;
let userAddress;

let bep20Abs;
let poolAbs;
let factoryAbs;

const bep20InstMap = {};
const poolInstMap = {};
const factoryInstMap = {};

const outsideBEP20Token = '0x3281b72e55D1Dbe9D63395deDeAe0bbE8B4dC6d';
const ctlToken = '0xC2F6086DDb0FCC0bAB85b6Ed6c190DAA0156c526';
const factory = '0x58B2Eb581BDEF51086d100B0fBF3FDc0201AF79F';
const pool = '0x8bd94e881c59dC153E3716091227530E664a933B';

export const output = (res) => ({
  ok: true,
  result: res,
});

export const error = (code, msg, data) => ({
  ok: false,
  code,
  msg,
  data,
});

// eslint-disable-next-line import/prefer-default-export
export const initWeb3Provider = async () => {
  try {
    web3 = new Web3(window.ethereum);
    if (await web3.eth.getCoinbase() === null) {
      await window.ethereum.enable();
    }

    userAddress = await web3.eth.getCoinbase();

    web4 = new Web4();
    await web4.setProvider(window.ethereum, userAddress);
    return output({ userAddress });
  } catch (err) {
    return error(4001, 'connection error', err);
  }
};

export const createAbstractions = async () => {
  bep20Abs = await web4.getContractAbstraction(BEP20);
  poolAbs = await web4.getContractAbstraction(POOL);
  factoryAbs = await web4.getContractAbstraction(FACTORY);
  console.log(poolAbs);
};

export const createBep20Inst = async () => {
  // bep20Abs.getInstance();
};
