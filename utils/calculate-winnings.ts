import validifyOdds from "./validify-odds";

const calculateWinnings = (stake: number, odds: number, result: string) => {
  if (!validifyOdds(odds)) {
    return undefined;
  }
  if (result.toLocaleLowerCase() === 'win') {
    if (odds < 0) {
      return Number(((100 / Math.abs(odds)) * stake).toFixed(2));
    } else {
      return Number(((odds/ 100) * stake).toFixed(2));
    }
  }
}
export default calculateWinnings;