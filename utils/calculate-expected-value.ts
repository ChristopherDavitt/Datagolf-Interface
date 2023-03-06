import validifyOdds from "./validify-odds";

const calcEV = (dg_odds: number, odds: number) => {
  if (!validifyOdds(dg_odds) || !validifyOdds(odds)) {
    return false
  }
  if (dg_odds < 100) {
    return odds / (odds + 100) * 100;
  } else {
    return 100 / (odds + 100) * 100;
  }
};

export default calcEV;