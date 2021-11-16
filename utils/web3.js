import Web3 from 'web3';
import Web4 from '@cryptonteam/web4';
import BigNumber from 'bignumber.js';
import { methodAddRpcbsc, methodAddRpcbscTestnet } from '~/configs/configChainRpc';

const { IS_MAINNET } = process.env;

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

let pingTimer = null;

export const startPingingMetamask = async (callback) => {
  try {
    if (web3 === undefined) {
      return error(500, 'pingingMetamask err');
    }
    const referenceAddress = userAddress;
    const referenceChainId = chainId;
    clearInterval(pingTimer);
    pingTimer = setInterval(async () => {
      const address = await web3.eth.getCoinbase();
      const localChainId = await web3.eth.net.getId();
      if (address !== referenceAddress || localChainId !== referenceChainId) {
        chainId = null;
        userAddress = '';
        callback();
        clearInterval(pingTimer);
      }
    }, 2000);
    return output();
  } catch (err) {
    return error(500, 'pingingMetamask err', err);
  }
};

export const initWeb3ProviderAnon = async () => {
  try {
    // const infuraKeyBsc = process.env.NODE_KEY_BSC;
    let bscUrl;
    if (process.env.IS_MAINNET === 'true') {
      bscUrl = 'https://bsc-dataseed.binance.org/';
    } else {
      bscUrl = 'https://data-seed-prebsc-2-s2.binance.org:8545';
    }
    const providerBsc = new Web3.providers.HttpProvider(bscUrl);
    web3Anon = new Web3(providerBsc);
    return output();
  } catch (e) {
    return error(500, 'connection error', e);
  }
};

export const initWeb3Provider = async () => {
  try {
    const { ethereum } = window;
    if (!ethereum) {
      return error(449, 'no metamask');
    }
    web3 = new Web3(ethereum);
    userAddress = await web3.eth.getCoinbase();
    if (userAddress === null) {
      await ethereum.enable();
      userAddress = await web3.eth.getCoinbase();
    }
    chainId = await web3.eth.net.getId();
    if (IS_MAINNET !== 'true' && +chainId !== 97) {
      await ethereum.request(methodAddRpcbscTestnet);
      chainId = await web3.eth.net.getId();
    } else if (IS_MAINNET === 'true' && +chainId !== 56) {
      await ethereum.request(methodAddRpcbsc);
      chainId = await web3.eth.net.getId();
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
