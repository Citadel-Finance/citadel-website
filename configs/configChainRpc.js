export const methodAddRpcbscTestnet = {
  method: 'wallet_addEthereumChain',
  params: [{
    chainId: '0x61',
    chainName: 'BSC Testnet',
    nativeCurrency: {
      name: 'BNB',
      symbol: 'BNB',
      decimals: 18,
    },
    rpcUrls: ['https://data-seed-prebsc-1-s3.binance.org:8545'],
    blockExplorerUrls: ['https://testnet.bscscan.com'],
  }],
};

export const methodAddRpcbsc = {
  method: 'wallet_addEthereumChain',
  params: [{
    chainId: '0x38',
    chainName: 'BSC',
    nativeCurrency: {
      name: 'BNB',
      symbol: 'BNB',
      decimals: 18,
    },
    rpcUrls: ['https://bsc-dataseed.binance.org'],
    blockExplorerUrls: ['https://bscscan.com'],
  }],
};
