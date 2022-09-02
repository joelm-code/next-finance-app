import { HStack, Link as ChakraLink, Button, Menu, MenuButton, MenuList, MenuItem, MenuDivider, MenuGroup, Text, Spacer } from "@chakra-ui/react";

import { AddIcon } from "@chakra-ui/icons";

import Link from "next/link";

import React from "react";

const MenuCustom = ({ isMenuOpen }) => {
  return (
    <div>
      <Menu isOpen={isMenuOpen}>
        <MenuButton as={Button} variant={"solid"} colorScheme={"blue"} size={"sm"} mr={4} leftIcon={<AddIcon />}>
          New Goal
        </MenuButton>
        <MenuList>
          <MenuGroup title="I want to buy a new">
            <Link href="/purchase-plan/product">
              <MenuItem>
                <ChakraLink>Product</ChakraLink>
                <Spacer />
                <Text fontWeight={"semibold"} color={"gray.300"} fontSize={".8rem"}>
                  Car, Home{" "}
                </Text>
              </MenuItem>
            </Link>
          </MenuGroup>
          <MenuDivider />
          <MenuGroup title="I want to plan my">
            <Link href="/long-term-plan/retirement">
              <MenuItem>
                <ChakraLink>Retirement</ChakraLink>
              </MenuItem>
            </Link>
            <Link href="/long-term-plan/financial-freedom">
              <MenuItem>
                <ChakraLink>Financial Freedom</ChakraLink>
              </MenuItem>
            </Link>
          </MenuGroup>
          <MenuDivider />
          <MenuGroup title="I want to calculate my">
            <Link href="/sip-calculator">
              <MenuItem>
                <ChakraLink>SIP</ChakraLink>
              </MenuItem>
            </Link>
            <Link href="/lumpsum">
              <MenuItem>
                <ChakraLink>Lumpsum Investment</ChakraLink>
              </MenuItem>
            </Link>
          </MenuGroup>
          <MenuDivider />
          <MenuGroup title="I want to build">
            <MenuItem bg={"blue.100"}>
              <HStack>
                <AddIcon />
                <Text>A Custom Goal</Text>
              </HStack>
            </MenuItem>
          </MenuGroup>
        </MenuList>
      </Menu>
    </div>
  );
};

export default MenuCustom;
