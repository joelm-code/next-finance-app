/* 

// input data
const inputData = {
    minAge: 10,
    maxAge: 20,
    investment: 25000,
    annualRate: 12,
    month: 0,
  };
   */

// Calculate SIP month wise

const calculateInvestmentReturns = (inputData) => {
  // Assignments
  const minAge = inputData.minAge;
  const maxAge = inputData.maxAge;
  const years = inputData.maxAge - inputData.minAge;
  const investment = inputData.investment;
  const annualRate = inputData.annualRate;

  // Monthly Rate
  const monthlyRate = inputData.annualRate / 1200;

  // Calculations
  const months = inputData.month;
  const totalInvest = investment * months;
  const finalValue = Number(((investment * (Math.pow(1 + monthlyRate, months) - 1) * (1 + monthlyRate)) / monthlyRate).toFixed(0));
  const earnings = finalValue - totalInvest;

  return {
    minAge,
    maxAge,
    years,
    investment,
    annualRate,
    monthlyRate,
    months,
    totalInvest,
    finalValue,
    earnings,
  };
};

export const calculateSip = (inputData) => {
  //table that stores all the output data
  const table = [];

  // Calculates the data on a annual basic, it can also be calvulated monthly by changing index += 12 to index++
  for (let index = 0; index <= (inputData.maxAge - inputData.minAge) * 12; index += 12) {
    inputData.month = index;
    const output = calculateInvestmentReturns(inputData);
    table.push(output);
  }

  // Final data
  //console.log(table);
  return table;
};
