import { NextApiHandler } from "next";
import { DATAGOLF_API_KEY } from "../../../../../../envs";

const handler: NextApiHandler = async (req, res) => {
  const { type, tour, market } = req.query;
  const baseURL = `https://feeds.datagolf.com/betting-tools/${type}`;
  
  const searchParams = new URLSearchParams({
    market: Array.isArray(market) ? market.toString() : market || '3_ball',
    tour: Array.isArray(tour) ? tour.toString() : tour || 'pga',
    odds_format: 'american',
    key: DATAGOLF_API_KEY,
  });
  const url = `${baseURL}?${searchParams}`;
  const data = await fetch(url).then(res => res.json()).then(data => data);
  return res.status(200).json(data);
};
export default handler;