import Web3 from 'web3';
import Web4 from '@cryptonteam/web4';
import BigNumber from 'bignumber.js';
import { Factory, Pool } from '~/abis';
import { methodAddRpcbscTestnet } from '~/configs/configChainRpc';

let web3;
let web3Anon;
let web4;
let userAddress;
let chainId;

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

BigNumber.config({ EXPONENTIAL_AT: 60 });

export const initWeb3ProviderAnon = async () => {
  try {
    // const infuraKeyBsc = process.env.NODE_KEY_BSC;
    let bscUrl;
    if (+process.env.CHAIN_TYPE === 1) {
      bscUrl = 'https://bsc-dataseed.binance.org/';
    } else {
      bscUrl = 'https://data-seed-prebsc-2-s3.binance.org:8545/';
    }
    const providerBsc = new Web3.providers.HttpProvider(bscUrl);
    web3Anon = new Web3(providerBsc);
    return output();
  } catch (e) {
    return error(500, 'connection error', e);
  }
};

// const addRpcToMetamask = () => {
//
// };

export const initWeb3Provider = async () => {
  try {
    const { ethereum } = window;
    web3 = new Web3(ethereum);
    userAddress = await web3.eth.getCoinbase();
    if (userAddress === null) {
      await ethereum.enable();
      userAddress = await web3.eth.getCoinbase();
    }
    chainId = await web3.eth.net.getId();
    if (+chainId !== 97) {
      await ethereum.request(methodAddRpcbscTestnet);
    }
    web4 = new Web4();
    await web4.setProvider(ethereum, userAddress);
    return output({ userAddress });
  } catch (err) {
    return error(4001, 'connection error', err);
  }
};

export const fetchContractData = async (_method, _abi, _address, _params) => {
  const contract = new web3.eth.Contract(_abi, _address);
  return await contract.methods[_method].apply(this, _params).call();
};

export const fetchContractDataAnon = async (_method, _abi, _address, _params) => {
  const contract = new web3Anon.eth.Contract(_abi, _address);
  return await contract.methods[_method].apply(this, _params).call();
};

export const createInst = async (abi, address) => {
  const abs = web4.getContractAbstraction(abi);
  return await abs.getInstance(address);
};

export const getWeb3 = () => web3;

export const getUserAddress = () => userAddress;
