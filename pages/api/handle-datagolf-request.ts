import { NextApiHandler } from "next";

const handler: NextApiHandler = (req, res) => {
  const { type, tour, market } = req.body;
  const baseURL = `https://feeds.datagolf.com/betting-tools/${type}`;
  const searchParams = new URLSearchParams({
    market: market,
    tour: tour,
  });
  const url = `${baseURL}/${searchParams}`;
  const data = fetch(url);
  return res.send(data);
}