"use client";

import { paths } from "@/config/admin-paths";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Image,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Avatar,
  Link,
  Dropdown,
  DropdownTrigger,
  DropdownItem,
  DropdownMenu,
} from "@nextui-org/react";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import React from "react";

const AdminNavbar = () => {
  const pathName = usePathname();

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  return (
    <Navbar isBordered isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand className="gap-1">
          <Image
            src="/logos/logo-base-m.png"
            alt="Savers Mart Logo"
            width={50}
            height={50}
            className="object-contain size-6"
          />
          <p className="font-bold  text-medium md:text-large text-primary text-inherit">
            Savers Mart
          </p>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {paths.map((path) => (
          <NavbarItem
            key={path.name}
            isActive={pathName === path.path}
            onClick={() => setIsMenuOpen(false)}
          >
            <Link
              href={path.path}
              className={
                pathName === path.path ? "text-primary" : "text-foreground"
              }
            >
              {path.name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                showFallback
                src="/logos/logo-base-s.xng"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">zoey@example.com</p>
              </DropdownItem>

              <DropdownItem
                key="logout"
                color="danger"
                onClick={() => signOut()}
              >
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {paths.map((item, index) => (
          <NavbarMenuItem key={index}>
            <Link
              color={pathName === item.path ? "primary" : "foreground"}
              className="w-full"
              href={item.path}
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};

export default AdminNavbar;
