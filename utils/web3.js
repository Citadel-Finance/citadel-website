import Web3 from 'web3';
import Web4 from '@cryptonteam/web4';
import BigNumber from 'bignumber.js';
import { BEP20, POOL, FACTORY } from '~/abis';

let web3;
let web4;
let userAddress;

let tokenAbs;
let poolAbs;
let factoryAbs;

const tokensInstsMap = {};
const poolsInstsMap = {};
let factoryInst;

const ctlTokenAddress = '0xC2F6086DDb0FCC0bAB85b6Ed6c190DAA0156c526';
const factoryAddress = '0x58B2Eb581BDEF51086d100B0fBF3FDc0201AF79F';

const poolsData = [];

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
    // TODO check chainId
    userAddress = await web3.eth.getCoinbase();
    web4 = new Web4();
    await web4.setProvider(window.ethereum, userAddress);
    return output({ userAddress });
  } catch (err) {
    return error(4001, 'connection error', err);
  }
};

// export const createAbstractions = () => {
//   tokenAbs = web4.getContractAbstraction(BEP20);
//   poolAbs = web4.getContractAbstraction(POOL);
//   factoryAbs = web4.getContractAbstraction(FACTORY);
//   console.log(poolAbs);
// };

export const fetchContractData = async (_method, _abi, _address, _params, _provider = web3) => {
  const Contract = new _provider.eth.Contract(_abi, _address);
  return await Contract.methods[_method].apply(this, _params).call();
};

// export const fetchPools = async () => {
//   try {
//     const r = await factoryInst.allPools();
//     poolsData = r;
//     // console.log('allPools', r);
//     return r;
//   } catch (e) {
//     console.log(e);
//     return false;
//   }
// };

// export const createInsts = async () => {
//   factoryInst = await factoryAbs.getInstance(factoryAddress);
//   console.log('factoryInst', factoryInst);
//   // await fetchPools();
//
//   await Promise.all(poolsData.map(async (data) => {
//     poolsInstsMap[data.pool] = await poolAbs.getInstance(data.pool);
//     tokensInstsMap[data.token] = await tokenAbs.getInstance(data.token);
//   }));
//   console.log(poolsInstsMap);
//   console.log(tokensInstsMap);
//
//   const r = await tokensInstsMap['0x3281b72e55D1Dbe9D63395deDeAe0bbE8B4dC6d9'].balanceOf(userAddress);
//   console.log('my balance', new BigNumber(r.toString()).shiftedBy(-18).toString());
//   // erc20InstMap[address].balanceOf(userAddress)
//   // 0x8301F2213c0eeD49a7E28Ae4c3e91722919B8B47
//   // 0x3281b72e55D1Dbe9D63395deDeAe0bbE8B4dC6d9
// };
//
// export const createBep20Inst = async () => {
//   // tokenAbs.getInstance();
// };

export const createInst = async (abi, address) => {
  const abs = web4.getContractAbstraction(abi);
  return await abs.getInstance(address);
};

export const getUserAddress = () => userAddress;
