export const calcDayDifferenceFromNow = (d: Date): number => {
  const today = new Date();
  return Math.ceil((+d - +today) / 1000 / 60 / 60 / 24);
};
