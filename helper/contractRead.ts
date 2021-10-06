import Web3 from 'web3'
import { HttpProviderOptions } from 'web3-core-helpers'
import { AbiItem } from 'web3-utils'
import { ContractOptions } from 'web3-eth-contract'

const RPC_URL = 'https://data-seed-prebsc-1-s1.binance.org:8545'
const httpProvider = new Web3.providers.HttpProvider(RPC_URL || '', { timeout: 10000 } as HttpProviderOptions)

const getWeb3 = () => {
  const web3 = new Web3(httpProvider)
  return web3
}
const getContract = (abi: any, address: string, contractOptions?: ContractOptions) => {
  const web3 = getWeb3()
  return new web3.eth.Contract((abi as unknown) as AbiItem, address, contractOptions)
}

export { getWeb3, getContract, httpProvider }