import { useEffect, useState } from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import web3 from "web3";
import { AbiItem } from "web3-utils";

const getProvider = async () => {
    const provider: any = await detectEthereumProvider();
    const networkId = await provider.request({ method: 'net_version' })
    return { provider, networkId }
}

export const getContractWrite = async (abi: any, address: string) => {
    const { provider, networkId } = await getProvider()
    const web3A = new web3(provider);
    const ct = new web3A.eth.Contract((abi as unknown) as AbiItem, address)
    return ct
}