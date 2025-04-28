import { AUCTION } from "@/lib/andrjs/auction";
import { withContractAddress } from "../../procedures/withContractAddress";
import { createTRPCRouter } from "../../trpc";
import z from "zod"
import { queryAuctionLatestSaleState, queryBids } from "./query";

export const auctionRouter = createTRPCRouter({
    getLatestAuctionState: withContractAddress
        .input(z.object({ tokenAddress: z.string(), tokenId: z.string() }))
        .query<AUCTION.GetLatestSaleStatePesponse>(async ({ input, ctx }) => {
            const saleState = await queryAuctionLatestSaleState(
                ctx.chainConfig.lcdUrl,
                ctx.resolvedContractAddress,
                input.tokenAddress,
                input.tokenId
            );
            return saleState
        }),

    getBids: withContractAddress
        .input(z.object({ auctionId: z.string() }))
        .query<AUCTION.GetBidsResponse>(async ({ input, ctx }) => {
            const bids = await queryBids(
                ctx.chainConfig.lcdUrl,
                ctx.resolvedContractAddress,
                input.auctionId
            )
            return bids
        })
})