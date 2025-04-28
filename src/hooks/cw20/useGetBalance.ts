import { trpcReactClient } from "@/lib/trpc/client";

// Use to get balance of CW20 for a specific addresss 
export const useGetBalance = (chain: string, sharesAddress: string, address: string) => {
    const result = trpcReactClient.cw20.getBalance.useQuery({
        "chain-identifier": chain,
        "contract-address": sharesAddress,
        address: address
    }, { enabled: !!chain && !!address })

    return result
}