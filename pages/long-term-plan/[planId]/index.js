import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Stack,
  Button,
  Heading,
  Text,
  VStack,
  Wrap,
  WrapItem,
  HStack,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Divider,
  Collapse,
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tbody,
  Td,
  Tr,
  Th,
  Tfoot,
  useBoolean,
} from "@chakra-ui/react";

import { logic } from "../../../components/logic/index";

import Layout from "../../../components/Layout";
import { useState, useEffect } from "react";
import { LineChart } from "../../../components/Chart/LineChart";

import { useRouter } from "next/router";

export default function MyGoal() {
  const [currentAge, setCurrentAge] = useState(32);
  const [retirementAge, setRetirementAge] = useState(65);
  const [lifeExpectancy, setLifeExpectancy] = useState(80);

  const [desiredAnnualIncomeOnRetirement, setDesiredAnnualIncomeOnRetirement] = useState(100000);
  const [incomeFromOtherSources, setIncomeFromOtherSources] = useState(1000);
  const [currentSavings, setCurrentSavings] = useState(1000);
  const [rateOfReturnOnSavings, setRateOfReturnOnSavings] = useState(10);
  const [inflationRate, setInflationRate] = useState(5);

  //States of the app
  const [interestRate, setInterestRate] = useState(5);

  const [currentYear, setCurrentYear] = useState(2022);

  const [table, setTable] = useState();
  const [displayResult, setDisplayResult] = useBoolean();

  const router = useRouter();

  //set the Current Year
  useEffect(() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    setCurrentYear(yyyy);
  }, []);

  //logic to calculate data
  const handleCalculate = () => {
    console.log("calculating");

    const data = {
      currentAge,
      retirementAge,
      lifeExpectancy,
      desiredAnnualIncomeOnRetirement,
      incomeFromOtherSources,
      currentSavings,
      rateOfReturnOnSavings: rateOfReturnOnSavings / 100,
      inflationRate: inflationRate / 100,
      startingMonthlySavingsGoal: 0,
      amountOfSavingsInLifetime: 0,
      presentValueOfNeededFunds: 0,
      firstYearSavings: 0,
      realSterlingContributionAtYearZero: 0,
    };
    console.log("data:", data);
    const table = logic(data);
    console.log("table:", table);
    setTable(table);
  };

  //set Interest rate depending on investment plan
  const handleInterestChange = (event) => {
    const value = event.target.value;
    switch (value) {
      case "liquid-funds":
        setInterestRate(0);
        break;
      case "debt":
        setInterestRate(4);
        break;
      case "hybrid":
        setInterestRate(8);
        break;
      case "equity":
        setInterestRate(10);
        break;
      default:
        setInterestRate(4);
    }
  };

  return (
    <Layout>
      <Flex align={"center"} justify={"center"} minH={"xl"} pt={10} pb={10} bg="gray.50">
        <VStack>
          {/* --> Heading <-- */}
          <Stack align={"center"} p={6} bgGradient="linear(to-l, #7F7FD5, #91EAE4)" bgClip="text">
            <Heading align={"center"} fontSize={"4xl"}>
              {`Planning your ${router.query.planId}`}
            </Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              in less than 30 seconds
            </Text>
          </Stack>
          {/* Change the width of the wrap  */}
          <Wrap justify={"center"} maxw={"100vw"} py={4} spacing={4}>
            {/* --> What <-- */}
            <WrapItem>
              {/* 
            <Stack
                    w="4xl"
                    spacing={6}
                    mx={"auto"}
                    maxW={["xs", "md", "2xl"]}
                    px={2}
                  > */}

              <Stack spacing={8} w={["xs", "4xl", "4xl", "xs"]} mx={"auto"} maxW={["xs", "md", "2xl"]} px={2}>
                <Box rounded={"lg"} bg={"white"} boxShadow={"lg"} p={8}>
                  <Stack spacing={6}>
                    {/* Title */}
                    <Heading size={"md"}>{`My Goal`}</Heading>
                    <Divider />
                    <Heading size={"sm"}>{`Life Plans`}</Heading>
                    {/* Current Age */}
                    <FormControl>
                      <FormLabel>Current Age</FormLabel>
                      <HStack>
                        <NumberInput
                          min={1}
                          maxW="100px"
                          value={currentAge}
                          onChange={(value) => {
                            setCurrentAge(Number(value));
                          }}
                        >
                          <NumberInputField />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput>
                        <FormLabel>Years</FormLabel>
                      </HStack>
                    </FormControl>
                    {/* Retirement Age */}
                    <FormControl>
                      <FormLabel>Retirement Age</FormLabel>
                      <HStack>
                        <NumberInput
                          min={1}
                          maxW="100px"
                          value={retirementAge}
                          onChange={(value) => {
                            setRetirementAge(Number(value));
                          }}
                        >
                          <NumberInputField />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput>
                        <FormLabel>Years</FormLabel>
                      </HStack>
                    </FormControl>
                    {/* Life Expectancy */}
                    <FormControl>
                      <FormLabel>Life Expectancy</FormLabel>
                      <HStack>
                        <NumberInput
                          min={1}
                          maxW="100px"
                          value={lifeExpectancy}
                          onChange={(value) => {
                            setLifeExpectancy(Number(value));
                          }}
                        >
                          <NumberInputField />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput>
                        <FormLabel>Years</FormLabel>
                      </HStack>
                    </FormControl>
                    <Divider />
                    <Heading size={"sm"}>{`Financial Information`}</Heading>
                    {/* Desired Retirement Income */}
                    <FormControl>
                      <FormLabel>Desired Annual Income on Retirement</FormLabel>
                      <HStack>
                        <NumberInput
                          min={1}
                          maxW="100%"
                          value={desiredAnnualIncomeOnRetirement}
                          onChange={(value) => {
                            setDesiredAnnualIncomeOnRetirement(Number(value));
                          }}
                        >
                          <NumberInputField />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput>
                      </HStack>
                    </FormControl>
                    {/* Annual contribution from other sources */}
                    <FormControl>
                      <FormLabel>Annual contribution from other sources</FormLabel>
                      <HStack>
                        <NumberInput
                          min={1}
                          maxW="100%"
                          value={incomeFromOtherSources}
                          onChange={(value) => {
                            setIncomeFromOtherSources(Number(value));
                          }}
                        >
                          <NumberInputField />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput>
                      </HStack>
                    </FormControl>
                    {/* Current Amount of savings */}
                    <FormControl>
                      <FormLabel>Current Amount of savings</FormLabel>
                      <HStack>
                        <NumberInput
                          min={1}
                          maxW="100%"
                          value={currentSavings}
                          onChange={(value) => {
                            setCurrentSavings(Number(value));
                          }}
                        >
                          <NumberInputField />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput>
                      </HStack>
                    </FormControl>
                    {/* Rate of Return on Savings */}
                    <FormControl>
                      <FormLabel>Rate of Return on Savings</FormLabel>
                      <HStack>
                        <NumberInput
                          min={1}
                          maxW="100px"
                          value={rateOfReturnOnSavings}
                          onChange={(value) => {
                            setRateOfReturnOnSavings(Number(value));
                          }}
                        >
                          <NumberInputField />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput>
                        <FormLabel>%</FormLabel>
                      </HStack>
                    </FormControl>

                    {/* Inflation */}
                    <FormControl id="time">
                      <FormLabel>I expect inflation to be</FormLabel>
                      <HStack>
                        <NumberInput
                          min={1}
                          max={20}
                          maxW="100px"
                          value={inflationRate}
                          onChange={(value) => {
                            setInflationRate(Number(value));
                          }}
                        >
                          <NumberInputField />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput>
                        <FormLabel>%</FormLabel>
                      </HStack>
                    </FormControl>

                    <Button
                      colorScheme="blue"
                      onClick={() => {
                        !displayResult && setDisplayResult.on();
                        handleCalculate();
                      }}
                    >
                      Calculate
                    </Button>
                  </Stack>
                </Box>
              </Stack>
            </WrapItem>

            {/* --> Summary <-- */}

            <Collapse in={displayResult} animateOpacity>
              {displayResult && (
                <WrapItem>
                  <Stack w="4xl" spacing={6} mx={"auto"} maxW={["xs", "md", "2xl"]} px={2}>
                    <Box rounded={"lg"} bg={"white"} boxShadow={"lg"} p={8}>
                      <Stack>
                        <Text fontSize={"xl"} fontWeight={"semibold"}>
                          By investing{" "}
                        </Text>
                        <Heading>{`₹${table.monthlySavingsGoal[0].toLocaleString("en-IN")} /month`}</Heading>
                        <Text>{`You would have a net worth of ₹${table.amountOfSavingsInLifetime.toLocaleString("en-IN")} in ${retirementAge - currentAge} years `}</Text>
                      </Stack>
                    </Box>
                    <Box rounded={"lg"} bg={"white"} boxShadow={"lg"} p={8}>
                      <Stack spacing={6}>
                        <Heading size={"sm"}>{`Net Worth Chart`}</Heading>
                        <Divider />
                        <LineChart title={"Net Worth"} labelArray={table.age} dataArray={table.cumulativeSavings} />
                        <TableContainer>
                          <Table variant="striped" colorScheme="teal">
                            <Thead>
                              <Tr>
                                <Th></Th>
                                <Th>Current</Th>
                                <Th isNumeric>At Retirement</Th>
                              </Tr>
                            </Thead>
                            <Tbody>
                              <Tr>
                                <Td fontWeight={"bold"}>Net Worth</Td>
                                <Td>₹{currentSavings.toLocaleString("en-IN")}</Td>
                                <Td isNumeric>₹{table.amountOfSavingsInLifetime.toLocaleString("en-IN")}</Td>
                              </Tr>
                            </Tbody>
                          </Table>
                        </TableContainer>
                      </Stack>
                    </Box>

                    <Box rounded={"lg"} bg={"white"} boxShadow={"lg"} p={8}>
                      <Stack spacing={6}>
                        <Heading size={"sm"}>{`Investment Goals`}</Heading>
                        <Divider />
                        <TableContainer>
                          <Table variant="striped" colorScheme="teal">
                            <TableCaption>Your projected net worth</TableCaption>
                            <Thead>
                              <Tr>
                                <Th>Age</Th>
                                <Th>Monthly Goal</Th>
                                <Th>Net Worth</Th>
                              </Tr>
                            </Thead>
                            <Tbody>
                              {table.year.map((year) => {
                                const index = year - 1;
                                return (
                                  <Tr>
                                    <Td>{table.age[index]}</Td>
                                    <Td>₹{table.monthlySavingsGoal[index].toLocaleString("en-IN")}</Td>
                                    <Td fontWeight={"semibold"} color={table.age[index] < retirementAge ? "green.500" : "red.500"}>
                                      ₹{table.cumulativeSavings[index].toLocaleString("en-IN")}
                                    </Td>
                                  </Tr>
                                );
                              })}
                            </Tbody>
                          </Table>
                        </TableContainer>
                      </Stack>
                    </Box>
                  </Stack>
                </WrapItem>
              )}
            </Collapse>
          </Wrap>
        </VStack>
      </Flex>
    </Layout>
  );
}
