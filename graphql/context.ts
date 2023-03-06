import { PrismaClient } from "@prisma/client";
import { NextApiHandler } from "next";
import prisma from "../lib/prisma";

export type Context = {
  prisma: PrismaClient;
};

export const createContext: NextApiHandler = async (req, res): Promise<Context> => {
  return {
    prisma,
  };
}
