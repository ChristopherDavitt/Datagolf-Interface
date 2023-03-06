import { gql } from "apollo-server-micro";

export const typeDefs = gql`
  type Bet {
    id: Int!
    title: String
    type: String
    event: String
    sportsbook: String
    odds: Int!   
    dg_odds: Int!   
    ammount_staked: Int!
    expected_value: Int!
    created_at:  String!
    updated_at: String!
    result: String
    custom_payout: Int
  }

  input BetInput {
    id: Int
    title: String
    event: String
    type: String
    sportsbook: String!
    odds: Int!           
    ammount_staked: Int!
  }

  input ResultInput {
    id: Int!
    result: String!
    custom_payout: String
  }

  type Query {
    bets: [Bet]!
  }

  type Mutation {
    postBet(input: BetInput!): Bet!
    updateResult(input: ResultInput!): Bet!
  }
`;

export type BetInput = {
  id?: number,
  title?: string,
  type?: string,
  event?: string,
  sportsbook?: string,
  odds: number,
  dg_odds: number,      
  ammount_staked: number,
};

export type ResultInput = {
  id: number,
  result: string,
  custom_payout: number,
};