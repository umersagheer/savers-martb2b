import { Image, Navbar, NavbarBrand } from "@nextui-org/react";
import React from "react";

const NavbarComp = () => {
  return (
    <Navbar isBordered>
      <NavbarBrand className="gap-1">
        <Image
          src="/logos/logo-base-m.png"
          alt="Savers Mart Logo"
          className="size-10 object-cover"
        />
        <p className="font-bold text-xl text-primary">Savers Mart</p>
      </NavbarBrand>
    </Navbar>
  );
};

export default NavbarComp;
