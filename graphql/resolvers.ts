import { BetInput, ResultInput } from "./schema";
import prisma from "../lib/prisma";
import calcEV from '../utils/calculate-expected-value';
import { UserInputError } from "apollo-server-micro";
import calculateWinnings from "../utils/calculate-winnings";

export const resolvers = {
  Query: { 
    bets: async () => prisma.bets.findMany(),
  },
  Mutation: {
    postBet: async (_, { input } : { input: BetInput }) => {
      const ev = calcEV(input.dg_odds, input.odds);

      if (!ev) {
        return new UserInputError('Odds are not in the correct format')
      }
      const create_obj = {
        title: input.title || null,
        type: input.type || null,
        sportsbook: input.sportsbook || null,
        odds: input.odds,
        dg_odds: input.dg_odds,
        ammount_staked: input.ammount_staked,
        expected_value: ev,
      }
      
      const exists = await prisma.bets.findUnique({
        where: {
          id: input.id,
        },
      });

      
      if (exists) {
        return prisma.bets.update({
          where: { id: input.id },
          data: create_obj,
        });
      } else {
        return prisma.bets.create({
          data: create_obj,
        })
      };
    },
    postResult: async (_, { input }: { input: ResultInput }) => {
      const exists = await prisma.bets.findUnique({
        where: {
          id: input.id,
        },
      });

      if (exists) {
        prisma.bets.update({
          where: {
            id: input.id,
          },
          data: {
            result: input.result.toLocaleUpperCase(),
            custom_payout: input.custom_payout || calculateWinnings(exists.ammount_staked, exists.odds, input.result) || 0,
          }
        })
      }
    }
  },
};
