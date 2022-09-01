import {
  Box,
  Flex,
  Link as ChakraLink,
  Text,
  Stack,
  VStack,
  Heading,
  Spacer,
  useBoolean,
} from "@chakra-ui/react";
import Image from "next/image";

import Layout from "../../components/Layout";
import MenuCustom from "../../components/MenuCustom";
import { TypewritterEffect } from "../../components/TypewriterEffect";
export default function MyGoal() {
  const [isMenuOpen, setIsMenuOpen] = useBoolean();
  return (
    <Layout>
      <Flex
        align={"center"}
        justify={"center"}
        minH={"xl"}
        pt={10}
        pb={10}
        bg="gray.50"
      >
        <VStack>
          <Stack align={"center"} p={6} alignItems={"center"}>
            <Flex
              bgGradient="linear(to-l, #7F7FD5, #91EAE4)"
              bgClip="text"
              fontSize={"6xl"}
              fontWeight={"bold"}
              textAlign={"center"}
            >
              <TypewritterEffect />
            </Flex>
            <Text fontWeight={"normal"} fontSize={"lg"} color={"gray.600"}>
              make better financial decisions
            </Text>
          </Stack>
        </VStack>
      </Flex>
    </Layout>
  );
}
