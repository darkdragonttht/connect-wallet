import { getContract } from "../helper/contractRead"
import { getContractWrite } from "../helper/contractWrite"
import busdAbi from "../abi/busdAbi.json"
import { getBusdAddress } from './getContractAddress'

export const getBusdContractRead = async () => {
    return getContract(busdAbi, getBusdAddress())
}

export const getBusdContractWrite = async () => {
    return getContractWrite(busdAbi, getBusdAddress())
}