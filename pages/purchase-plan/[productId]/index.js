import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  Select,
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
  useBoolean,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  TableCaption,
} from "@chakra-ui/react";

import { logic } from "../../../components/logic/index";

import Layout from "../../../components/Layout";
import { useState, useEffect } from "react";
import { LineChart } from "../../../components/Chart/LineChart";

import { useRouter } from "next/router";
import { calculateFutureValue } from "../../../components/logic/calculateFutureValue";
import { calculateSip } from "../../../components/logic/calculateSip";

export default function MyGoal() {
  //States of the app
  const [productName, setProductName] = useState("");
  const [cost, setCost] = useState(50000);
  const [timeline, setTimeline] = useState(1);
  const [interestRate, setInterestRate] = useState(5);
  const [inflationRate, setInflationRate] = useState(5);
  const [currentYear, setCurrentYear] = useState(2022);
  const [inflationAdjustedPrice, setInflationAdjustedPrice] = useState(0);

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
    //define const Data
    const inputData1 = {
      currentCost: cost,
      annualRate: interestRate,
      numberOfYears: timeline,
      inflationRate: inflationRate / 100,
    };

    //send data to calculateFutureValue
    const outputData1 = calculateFutureValue(inputData1);

    setInflationAdjustedPrice(outputData1.inflationAdjustedPrice);

    const inputData2 = {
      minAge: 0,
      maxAge: timeline,
      investment: outputData1.investment,
      annualRate: interestRate,
      month: 0,
    };

    const table = calculateSip(inputData2);

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
            <Heading fontSize={"4xl"}>{`Buying your dream ${router.query.productId}`}</Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              is easy when your plan it ahead of time
            </Text>
          </Stack>
          {/* Change the width of the wrap  */}
          <Wrap justify={"center"} maxw={"100vw"} py={4} spacing={4}>
            {/* --> What <-- */}
            <WrapItem>
              <Stack spacing={8} mx={"auto"} w={"xs"} px={2}>
                <Box rounded={"lg"} bg={"white"} boxShadow={"lg"} p={8}>
                  <Stack spacing={6}>
                    {/* Title */}
                    <Heading size={"md"}>{`My Goal`}</Heading>
                    <Divider />

                    {/* Item Name */}
                    <FormControl>
                      <FormLabel>{`I want to buy`}</FormLabel>
                      <Input
                        type="text"
                        value={productName}
                        placeholder={`Phone, Car, House, etc`}
                        onChange={(event) => {
                          setProductName(event.target.value);
                        }}
                      />
                    </FormControl>
                    <Divider />

                    {/* Cost */}
                    <FormControl>
                      <FormLabel>{`Today it costs`}</FormLabel>
                      <NumberInput
                        value={cost}
                        placeholder="Enter amount"
                        onChange={(value) => {
                          setCost(Number(value));
                        }}
                      >
                        <NumberInputField />
                      </NumberInput>
                    </FormControl>
                    <Divider />

                    {/* Time */}
                    <FormControl>
                      <HStack align={"baseline"} spacing={0}>
                        <FormLabel>I want to buy it in</FormLabel>
                        <FormLabel color={"gray"}>{currentYear + Number(timeline)}</FormLabel>
                      </HStack>
                      <Stack>
                        <HStack>
                          <NumberInput
                            min={1}
                            maxW="100px"
                            value={timeline}
                            onChange={(value) => {
                              setTimeline(Number(value));
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
                      </Stack>
                    </FormControl>
                    <Divider />

                    {/* Interest Rate - Investment Type */}
                    <FormControl id="interest">
                      <FormLabel>I will invest in</FormLabel>
                      <Select
                        placeholder="Select"
                        onChange={(event) => {
                          handleInterestChange(event);
                        }}
                      >
                        <option value="liquid-funds">Bank Deposit 0%</option>
                        <option value="debt">Debt 4%</option>
                        <option value="hybrid">Hybrid 8%</option>
                        <option value="equity">Equity 10%</option>
                      </Select>
                    </FormControl>

                    {/* Inflation */}
                    <Divider />
                    <FormControl id="time">
                      <FormLabel>I expect inflation to be</FormLabel>
                      <HStack>
                        <NumberInput
                          step={0.25}
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
                        <Heading>{`${table[0].investment.toLocaleString("en-IN")} / month`}</Heading>
                        <Text>{`You would have a saved ₹${table[table.length - 1].finalValue.toLocaleString("en-IN")}${productName && ` to buy your ${productName}`} in ${timeline} ${
                          timeline === 1 ? "year" : "years"
                        } `}</Text>
                      </Stack>
                    </Box>

                    <Box rounded={"lg"} bg={"white"} boxShadow={"lg"} p={8}>
                      <Stack spacing={6}>
                        <Heading size={"sm"}>{`Cost Chart`}</Heading>
                        <Divider />
                        <LineChart title={"Total Investment"} labelArray={table.map((data) => ` Year ${data.months / 12}`)} dataArray={table.map((data) => data.finalValue)} table={table} />
                        <TableContainer>
                          <Table variant="striped" colorScheme="teal">
                            <Thead>
                              <Tr>
                                <Th></Th>
                                <Th>Today</Th>
                                <Th isNumeric>{`In ${currentYear + timeline}`}</Th>
                              </Tr>
                            </Thead>
                            <Tbody>
                              <Tr>
                                <Td fontWeight={"bold"}>Product Cost</Td>

                                <Td>₹{cost.toLocaleString("en-IN")}</Td>
                                <Td isNumeric>₹{inflationAdjustedPrice.toLocaleString("en-IN")}</Td>
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
                                <Th>Year</Th>
                                <Th>Monthly Investment</Th>
                                <Th>Annual Interest </Th>
                                <Th>Net Worth</Th>
                              </Tr>
                            </Thead>
                            <Tbody>
                              {table.map((data) => {
                                return (
                                  <Tr>
                                    {/* 
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
  
  */}

                                    <Td>{data.months / 12}</Td>
                                    <Td>₹{data.investment.toLocaleString("en-IN")}</Td>
                                    <Td>₹{data.earnings.toLocaleString("en-IN")}</Td>
                                    <Td fontWeight={"semibold"}>₹{data.finalValue.toLocaleString("en-IN")}</Td>
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
