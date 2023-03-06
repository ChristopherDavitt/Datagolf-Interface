const validifyOdds = (odds: number) => {
  if ((odds > -100 && odds < 100)) {
    return false
  } else {
    return true
  }
};
export default validifyOdds;