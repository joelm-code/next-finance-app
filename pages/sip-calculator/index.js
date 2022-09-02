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

import { calculateSip } from "../../components/logic/calculateSip";

import Layout from "../../components/Layout";
import { useState, useEffect } from "react";
import { LineChart } from "../../components/Chart/LineChart";

export default function MyGoal() {
  // Input Data
  const [investment, setInvestment] = useState(10000);
  const [annualRate, setAnnualRate] = useState(8);
  const [maxAge, setMaxAge] = useState(5);

  // Output Data
  const [table, setTable] = useState([]);
  const [displayResult, setDisplayResult] = useBoolean();

  //logic to calculate data
  const handleCalculate = () => {
    console.log("Calculating Data");

    const inputData = {
      minAge: 0,
      maxAge: maxAge,
      investment: investment,
      annualRate: annualRate,
      month: 0,
    };

    console.log("Input Data:", inputData);
    const table = calculateSip(inputData);

    console.log("Output Data -> Table:", table);
    setTable(table);
  };

  useEffect(() => {
    handleCalculate();
  }, []);

  return (
    <Layout>
      <Flex align={"center"} justify={"center"} minH={"xl"} pt={10} pb={10} bg="gray.50">
        <VStack>
          {/* --> Heading <-- */}
          <Stack align={"center"} p={6} bgGradient="linear(to-l, #7F7FD5, #91EAE4)" bgClip="text">
            <Heading align={"center"} fontSize={"4xl"}>
              {`Calculate your SIP`}
            </Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              in less than 30 seconds
            </Text>
          </Stack>
          {/* Change the width of the wrap  */}
          <Wrap justify={"center"} maxw={"100vw"} py={4} spacing={4}>
            {/* --> What <-- */}
            <WrapItem>
              <Stack spacing={8} w={["xs", "4xl", "4xl", "xs"]} mx={"auto"} maxW={["xs", "md", "2xl"]} px={2}>
                <Box rounded={"lg"} bg={"white"} boxShadow={"lg"} p={8}>
                  <Stack spacing={6}>
                    {/* Title */}
                    <Heading size={"md"}>{`Investment Details`}</Heading>
                    <Divider />

                    {/* Monthly Investment */}
                    <FormControl>
                      <FormLabel>Monthly Investment</FormLabel>
                      <HStack>
                        <NumberInput
                          min={1}
                          maxW="100%"
                          value={investment}
                          onChange={(value) => {
                            setInvestment(Number(value));
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
                    {/* Expected Rate of Return */}
                    <FormControl>
                      <FormLabel>Expected Rate of Return</FormLabel>
                      <HStack>
                        <NumberInput
                          min={1}
                          maxW="100px"
                          value={annualRate}
                          onChange={(value) => {
                            setAnnualRate(Number(value));
                          }}
                        >
                          <NumberInputField />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput>
                        <FormLabel>% per year</FormLabel>
                      </HStack>
                    </FormControl>
                    {/* Time Period */}
                    <FormControl>
                      <FormLabel>Time Period</FormLabel>
                      <HStack>
                        <NumberInput
                          min={1}
                          maxW="100px"
                          value={maxAge}
                          onChange={(value) => {
                            setMaxAge(Number(value));
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

            {/* -----------------------------> Summary <--------------------------------- */}

            <Collapse in={displayResult} animateOpacity>
              {displayResult && (
                <WrapItem>
                  <Stack w="4xl" spacing={6} mx={"auto"} maxW={["xs", "md", "2xl"]} px={2}>
                    <Box rounded={"lg"} bg={"white"} boxShadow={"lg"} p={8}>
                      <Stack>
                        <Text fontSize={"xl"} fontWeight={"semibold"}>
                          By investing{" "}
                        </Text>
                        <Heading>{`₹${investment.toLocaleString("en-IN")} /month`}</Heading>
                        <Text>{`You would have a net worth of Rs.${table[table.length - 1].finalValue.toLocaleString("en-IN")} in ${maxAge} years `}</Text>
                      </Stack>
                    </Box>
                    <Box rounded={"lg"} bg={"white"} boxShadow={"lg"} p={8}>
                      <Stack spacing={6}>
                        <Heading size={"sm"}>{`Net Worth Chart`}</Heading>
                        <Divider />
                        <LineChart title={"Net Worth"} labelArray={table.map((data) => ` Year ${data.months / 12}`)} dataArray={table.map((data) => data.finalValue)} table={table} />
                        <TableContainer>
                          <Table variant="striped" colorScheme="teal">
                            <Thead>
                              <Tr>
                                <Th></Th>
                                <Th>Year 1</Th>
                                <Th isNumeric>{`Year ${maxAge}`}</Th>
                              </Tr>
                            </Thead>
                            <Tbody>
                              <Tr>
                                <Td fontWeight={"bold"}>Net Worth</Td>

                                <Td>₹{table[1].finalValue.toLocaleString("en-IN")}</Td>
                                <Td isNumeric>₹{table[table.length - 1].finalValue.toLocaleString("en-IN")}</Td>
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
                                <Th>Interest Earned</Th>
                                <Th>Net Worth</Th>
                              </Tr>
                            </Thead>
                            <Tbody>
                              {table.map((data) => {
                                return (
                                  <Tr>
                                    <Td>{data.months / 12}</Td>
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
