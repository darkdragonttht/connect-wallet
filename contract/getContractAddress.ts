import addresses from './address'
const chainId = 97

export const getBusdAddress = () => {
    return addresses()?.busdContract[chainId]
}