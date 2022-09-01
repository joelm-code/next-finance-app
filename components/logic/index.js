// const importData = {
//   productName,
//   cost,
//   timeline,
//   interestRate,
//   inflationRate,
//   currentYear,
// };

// const Data = {
//   year: [],
//   annualSavings: [],
//   cummulativeSavings: [],
//   monthlySavings: [],
//   presentValueOfNeededFunds,
// };

//
// Variables
//

export const logic = (oldData) => {
  const data = { ...oldData };
  //Financial Information
  const LifePlansB1 = data.currentAge;
  const LifePlansB2 = data.retirementAge; // age you want to retire
  const LifePlansB3 = data.lifeExpectancy; // life expectancy

  //Life Plans
  const FinancialInformationB1 = data.desiredAnnualIncomeOnRetirement; // desired income
  const FinancialInformationB2 = data.incomeFromOtherSources; //annual income from other sources
  const FinancialInformationB3 = data.currentSavings; // current amount of savings
  const FinancialInformationB4 = data.rateOfReturnOnSavings; // rate of return on savings
  const FinancialInformationB5 = data.inflationRate; // inflation rate

  //
  //Calculate Retirement Goals C2 -> Amount of savings in {End of Term}
  const calculateAmountOfSavingsInLifetime = () => {
    const amountOfSavingsInLifetime =
      (((FinancialInformationB1 - FinancialInformationB2) *
        (1 + FinancialInformationB5) ** (LifePlansB2 - LifePlansB1 + 1)) /
        (FinancialInformationB4 - FinancialInformationB5)) *
      (1 -
        ((1 + FinancialInformationB5) / (1 + FinancialInformationB4)) **
          (LifePlansB3 - LifePlansB2));

    // Add this code in the try catch if there is an error
    const amountOfSavingsInLifetime2 =
      (FinancialInformationB1 - FinancialInformationB2) *
      (1 + FinancialInformationB5) ** (LifePlansB2 - LifePlansB1) *
      (LifePlansB3 - LifePlansB2);

    return Math.round(amountOfSavingsInLifetime);
  };

  //Calculate Retirement Goal C3
  const calculatePresentValueOfNeededFunds = () => {
    const presentValueOfNeededFunds =
      (1 / (1 + FinancialInformationB4) ** (LifePlansB2 - LifePlansB1)) *
        calculateAmountOfSavingsInLifetime() -
      FinancialInformationB3;

    //cacualte old present value of future needs
    return Math.round(presentValueOfNeededFunds);
  };

  //Calculate Retirement Goal C4
  const calculateFirstYearSavings = () => {
    const firstYearSavings =
      ((calculatePresentValueOfNeededFunds() *
        ((1 + FinancialInformationB4) / (1 + FinancialInformationB5) - 1)) /
        (1 -
          1 /
            (1 +
              ((1 + FinancialInformationB4) / (1 + FinancialInformationB5) -
                1)) **
              (LifePlansB2 - LifePlansB1))) *
      (1 + FinancialInformationB5);

    const firstYearSavings2 =
      (calculateAmountOfSavingsInLifetime() -
        FinancialInformationB3 *
          (1 + FinancialInformationB5) ** (LifePlansB2 - LifePlansB1)) /
      ((LifePlansB2 - LifePlansB1) *
        (1 + FinancialInformationB5) ** (LifePlansB2 - LifePlansB1));

    return Math.round(firstYearSavings);
  };

  //Calculate Retirement Goal C5
  const calculateRealSterlingContributionAtYearZero = () => {
    const realSterlingContributionAtYearZero =
      calculateFirstYearSavings() / (1 + FinancialInformationB5);
    return Math.round(realSterlingContributionAtYearZero);
  };

  // console.log(`
  //     calculateAmountOfSavingsInLifetime : ${calculateAmountOfSavingsInLifetime()}
  //     calculatePresentValueOfNeededFunds : ${calculatePresentValueOfNeededFunds()}
  //     calculateFirstYearSavings : ${calculateFirstYearSavings()}
  //     calculateRealSterlingContributionAtYearZero : ${calculateRealSterlingContributionAtYearZero()}
  // `);

  const RetirementGoalsB2 = calculateAmountOfSavingsInLifetime();
  data.amountOfSavingsInLifetime = calculateAmountOfSavingsInLifetime();

  const RetirementGoalsB3 = calculatePresentValueOfNeededFunds();
  data.presentValueOfNeededFunds = calculatePresentValueOfNeededFunds();

  const RetirementGoalsB4 = calculateFirstYearSavings();
  data.firstYearSavings = calculateFirstYearSavings();

  const RetirementGoalsB5 = calculateRealSterlingContributionAtYearZero();
  data.realSterlingContributionAtYearZero =
    calculateRealSterlingContributionAtYearZero();

  // console.log(data);

  const table = {
    year: [],
    age: [],
    annualSavings: [],
    cumulativeSavings: [],
    monthlySavingsGoal: [],
    amountOfSavingsInLifetime: 0,
  };

  // console.log(table);

  const buildTable = () => {
    table.amountOfSavingsInLifetime = calculateAmountOfSavingsInLifetime();

    for (let index = 0; index < 83; index++) {
      if (index === 0) {
        table.year[index] = index + 1;
        table.age[index] = LifePlansB1 + table.year[index] - 1;

        if (table.year[index] < LifePlansB2 - LifePlansB1 + 1) {
          table.annualSavings[index] = Math.round(
            RetirementGoalsB5 *
              (1 + FinancialInformationB5) ** table.year[index]
          );
        } else {
          table.annualSavings[index] = 0;
        }

        table.cumulativeSavings[index] = Math.round(
          table.annualSavings[index] +
            FinancialInformationB3 * (1 + FinancialInformationB4)
        );

        table.monthlySavingsGoal[index] = Math.round(
          table.annualSavings[index] / 12
        );
      } else {
        table.year[index] = index + 1;
        table.age[index] = LifePlansB1 + table.year[index] - 1;

        if (table.year[index] < LifePlansB2 - LifePlansB1 + 1) {
          table.annualSavings[index] = Math.round(
            RetirementGoalsB5 *
              (1 + FinancialInformationB5) ** table.year[index]
          );
        } else {
          table.annualSavings[index] = 0;
        }

        if (table.year[index] < LifePlansB2 - LifePlansB1 + 1) {
          table.cumulativeSavings[index] = Math.round(
            table.cumulativeSavings[index - 1] * (1 + FinancialInformationB4) +
              table.annualSavings[index]
          );
        } else if (
          table.cumulativeSavings[index - 1] * (1 + FinancialInformationB4) -
            (FinancialInformationB1 - FinancialInformationB2) *
              (1 + FinancialInformationB5) ** table.year[index] >
          0
        ) {
          table.cumulativeSavings[index] = Math.round(
            table.cumulativeSavings[index - 1] * (1 + FinancialInformationB4) -
              (FinancialInformationB1 - FinancialInformationB2) *
                (1 + FinancialInformationB5) ** table.year[index]
          );
        } else {
          table.cumulativeSavings[index] = 0;
        }
        table.monthlySavingsGoal[index] = Math.round(
          table.annualSavings[index] / 12
        );
      }

      //if the cummulative savings is 0 -> i.e you are broke or dead then break the for loop
      if (table.cumulativeSavings[index] === 0) {
        break;
      }
    }
  };

  const popTable = () => {
    table.year.pop();
    table.age.pop();
    table.annualSavings.pop();
    table.cumulativeSavings.pop();
    table.monthlySavingsGoal.pop();
  };

  buildTable();

  console.log(data.startingMonthlySavingsGoal);

  //console.log(table);
  return table;
};

/* 
//don't go beyond the point where the money is made
if (
  table.cumulativeSavings[index] < table.cumulativeSavings[index - 1]
) {
  break;
} */
