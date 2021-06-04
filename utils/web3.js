import Web3 from 'web3';
import Web4 from '@cryptonteam/web4';
import BigNumber from 'bignumber.js';

let web3;
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

export const initWeb3Provider = async () => {
  try {
    web3 = new Web3(window.ethereum);
    userAddress = await web3.eth.getCoinbase();
    if (userAddress === null) {
      await window.ethereum.enable();
      userAddress = await web3.eth.getCoinbase();
    }
    // TODO check chainId
    chainId = await web3.eth.net.getId();
    if (+chainId !== 97) {
      return error(1, 'invalid chain', chainId);
    }
    // const testTime = new Dat
    web4 = new Web4();
    await web4.setProvider(window.ethereum, userAddress);
    return output({ userAddress });
  } catch (err) {
    return error(4001, 'connection error', err);
  }
};

export const fetchContractData = async (_method, _abi, _address, _params, _provider = web3) => {
  const contract = new _provider.eth.Contract(_abi, _address);
  return await contract.methods[_method].apply(this, _params).call();
};

export const createInst = async (abi, address) => {
  const abs = web4.getContractAbstraction(abi);
  return await abs.getInstance(address);
};

export const getWeb3 = () => web3;

export const getUserAddress = () => userAddress;
