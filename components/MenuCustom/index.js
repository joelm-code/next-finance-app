import {
  HStack,
  Link as ChakraLink,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  MenuGroup,
  Text,
} from "@chakra-ui/react";

import { AddIcon } from "@chakra-ui/icons";

import Link from "next/link";

import React from "react";

const MenuCustom = ({ isMenuOpen }) => {
  return (
    <div>
      <Menu isOpen={isMenuOpen}>
        <MenuButton
          as={Button}
          variant={"solid"}
          colorScheme={"blue"}
          size={"sm"}
          mr={4}
          leftIcon={<AddIcon />}
        >
          New Goal
        </MenuButton>
        <MenuList>
          <MenuGroup title="I want to buy a new">
            <Link href="/purchase-plan/phone">
              <MenuItem>
                <ChakraLink>Phone</ChakraLink>
              </MenuItem>
            </Link>
            <Link href="/purchase-plan/car">
              <MenuItem>
                <ChakraLink>Car</ChakraLink>
              </MenuItem>
            </Link>
            <Link href="/purchase-plan/home">
              <MenuItem>
                <ChakraLink>Home</ChakraLink>
              </MenuItem>
            </Link>
          </MenuGroup>
          <MenuDivider />
          <MenuGroup title="I want to plan my">
            <Link href="/long-term-plan/education">
              <MenuItem>
                <ChakraLink>Education</ChakraLink>
              </MenuItem>
            </Link>
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
          <MenuGroup title="I want to build">
            <MenuItem bg={"blue.100"}>
              <HStack>
                <AddIcon />
                <Text>My Custom Goal</Text>
              </HStack>
            </MenuItem>
          </MenuGroup>
        </MenuList>
      </Menu>
    </div>
  );
};

export default MenuCustom;
