'use client'

import { createWeb3Modal, defaultConfig } from '@web3modal/ethers5/react'

const projectId = 'a968843231d52df8229c554e6de695a2'

const base = {
  chainId: 8453,
  name: 'Base Mainnet',
  currency: 'ETH',
  explorerUrl: 'https://basescan.org',
  rpcUrl: 'https://mainnet.base.org'
}

const mainnet = {
    chainId: 1,
    name: 'ETH Mainnet',
    currency: 'ETH',
    explorerUrl: 'https://etherscan.io',
    rpcUrl: 'https://eth.merkle.io'
}

const metadata = {
  name: "King's Chests",
  description: "Open up the king's chests!",
  url: 'https://kingschests.io',
  icons: ['https://kingschests.io']
}

const ethersConfig = defaultConfig({
  metadata,

  /*Optional*/
  enableEIP6963: true,
  enableInjected: true,
  enableCoinbase: true, 
  rpcUrl: '...',
  defaultChainId: 8453
})

createWeb3Modal({
  ethersConfig,
  chains: [mainnet,base],
  projectId,
  enableAnalytics: true, 
  enableOnramp: true 
})

export function Web3Modal({ children }) {
  return children
}