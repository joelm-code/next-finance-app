export const logic = (inputData) => {
  //Financial Information
  const myCurrentAge = inputData.currentAge;
  const myRetirementAge = inputData.retirementAge; // age you want to retire
  const myLifeExpectancy = inputData.lifeExpectancy; // life expectancy

  //Life Plans
  const myDesiredAnnualIncomeOnRetirement = inputData.desiredAnnualIncomeOnRetirement; // desired income
  const myIncomeFromOtherSources = inputData.incomeFromOtherSources; //annual income from other sources
  const myCurrentSavings = inputData.currentSavings; // current amount of savings
  const myRateOfReturnsOnSavings = inputData.rateOfReturnOnSavings; // rate of return on savings
  const myInflationRate = inputData.inflationRate; // inflation rate

  // --------------------------------------------     Calculate Functions     --------------------------------------------

  // 1 -> Calculate Retirement Goals C2 -> Amount of savings in {End of Term}
  const calculateAmountOfSavingsInLifetime = () => {
    const amountOfSavingsInLifetime =
      (((myDesiredAnnualIncomeOnRetirement - myIncomeFromOtherSources) * (1 + myInflationRate) ** (myRetirementAge - myCurrentAge + 1)) / (myRateOfReturnsOnSavings - myInflationRate)) *
      (1 - ((1 + myInflationRate) / (1 + myRateOfReturnsOnSavings)) ** (myLifeExpectancy - myRetirementAge));

    // Add this code in the try catch if there is an error
    const amountOfSavingsInLifetime2 =
      (myDesiredAnnualIncomeOnRetirement - myIncomeFromOtherSources) * (1 + myInflationRate) ** (myRetirementAge - myCurrentAge) * (myLifeExpectancy - myRetirementAge);

    return Math.round(amountOfSavingsInLifetime);
  };

  // 2 -> Calculate Retirement Goal C3
  const calculatePresentValueOfNeededFunds = () => {
    const presentValueOfNeededFunds = (1 / (1 + myRateOfReturnsOnSavings) ** (myRetirementAge - myCurrentAge)) * calculateAmountOfSavingsInLifetime() - myCurrentSavings;

    //cacualte old present value of future needs
    return Math.round(presentValueOfNeededFunds);
  };

  // 3 -> Calculate Retirement Goal C4
  const calculateFirstYearSavings = () => {
    const firstYearSavings =
      ((calculatePresentValueOfNeededFunds() * ((1 + myRateOfReturnsOnSavings) / (1 + myInflationRate) - 1)) /
        (1 - 1 / (1 + ((1 + myRateOfReturnsOnSavings) / (1 + myInflationRate) - 1)) ** (myRetirementAge - myCurrentAge))) *
      (1 + myInflationRate);

    const firstYearSavings2 =
      (calculateAmountOfSavingsInLifetime() - myCurrentSavings * (1 + myInflationRate) ** (myRetirementAge - myCurrentAge)) /
      ((myRetirementAge - myCurrentAge) * (1 + myInflationRate) ** (myRetirementAge - myCurrentAge));

    return Math.round(firstYearSavings);
  };

  // 4 -> Calculate Retirement Goal C5
  const calculateRealSterlingContributionAtYearZero = () => {
    const realSterlingContributionAtYearZero = calculateFirstYearSavings() / (1 + myInflationRate);
    return Math.round(realSterlingContributionAtYearZero);
  };

  const myRealSterlingContributionAtYearZero = calculateRealSterlingContributionAtYearZero();

  // --------------------------------------------     Data Structure Built Here      --------------------------------------------

  // The Table that will store all the data and sent back to user
  const table = [];

  //Build a table of all the data
  const buildTable = () => {
    // Loop over upto 83 times max
    for (let index = 0; index < 83; index++) {
      const myData = {
        year: Number,
        age: Number,
        annualSavings: Number,
        cumulativeSavings: Number,
        monthlySavingsGoal: Number,
        amountOfSavingsInLifetime: Number,
      };

      myData.amountOfSavingsInLifetime = calculateAmountOfSavingsInLifetime();

      if (index === 0) {
        myData.year = index + 1;
        myData.age = myCurrentAge + myData.year - 1;

        if (myData.year < myRetirementAge - myCurrentAge + 1) {
          myData.annualSavings = Math.round(myRealSterlingContributionAtYearZero * (1 + myInflationRate) ** myData.year);
        } else {
          myData.annualSavings = 0;
        }

        myData.cumulativeSavings = Math.round(myData.annualSavings + myCurrentSavings * (1 + myRateOfReturnsOnSavings));

        myData.monthlySavingsGoal = Math.round(myData.annualSavings / 12);
      } else {
        //Set Year
        myData.year = index + 1;

        //Set Age
        myData.age = myCurrentAge + myData.year - 1;

        //Set Annual Savings
        if (myData.year < myRetirementAge - myCurrentAge + 1) {
          myData.annualSavings = Math.round(myRealSterlingContributionAtYearZero * (1 + myInflationRate) ** myData.year);
        } else {
          myData.annualSavings = 0;
        }

        //Set Cumulative Savings
        if (myData.year < myRetirementAge - myCurrentAge + 1) {
          myData.cumulativeSavings = Math.round(table[index - 1].cumulativeSavings * (1 + myRateOfReturnsOnSavings) + myData.annualSavings);
        } else if (table[index - 1].cumulativeSavings * (1 + myRateOfReturnsOnSavings) - (myDesiredAnnualIncomeOnRetirement - myIncomeFromOtherSources) * (1 + myInflationRate) ** myData.year > 0) {
          myData.cumulativeSavings = Math.round(
            table[index - 1].cumulativeSavings * (1 + myRateOfReturnsOnSavings) - (myDesiredAnnualIncomeOnRetirement - myIncomeFromOtherSources) * (1 + myInflationRate) ** myData.year
          );
        } else {
          myData.cumulativeSavings = 0;
        }
        // Set Monthly
        myData.monthlySavingsGoal = Math.round(myData.annualSavings / 12);
      }

      //Push the generated data to the table
      table.push(myData);

      // If the cummulative savings is 0 -> i.e you are broke or dead then break the for loop
      if (myData.cumulativeSavings === 0) {
        break;
      }
    }
  };

  // Build the table
  buildTable();

  //Return the generated table back to use
  return table;
};

// --------------------------------------------     Data for Testing      --------------------------------------------

/* 
// Variables that the user will input
const testTimeline = 40;
const testCost = 1000000;
const testInterestRate = 12;
const testInflationRate = 10;

// Data that will be sent over by user as the INPUT
const testData = {
  currentAge: 0,
  retirementAge: testTimeline,
  lifeExpectancy: testTimeline + 1,
  desiredAnnualIncomeOnRetirement: testCost,
  incomeFromOtherSources: 0,
  currentSavings: 0,
  rateOfReturnOnSavings: testInterestRate / 100,
  inflationRate: testInflationRate / 100,
  startingMonthlySavingsGoal: 0,
  amountOfSavingsInLifetime: 0,
  presentValueOfNeededFunds: 0,
  firstYearSavings: 0,
  realSterlingContributionAtYearZero: 0,
};

const output = logic(testData);
 */
