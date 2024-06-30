"use client";

import ViewModal from "@/components/admin/view-modal";
import { VerticalDotsIcon } from "@/components/icons/vertical-dots";
import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { Billboard } from "@prisma/client";
import React, { useState } from "react";

export type ColumnsType = {
  key: keyof Omit<Billboard, "id"> | "actions";
  label: string;
};

export const columns: ColumnsType[] = [
  {
    key: "image",
    label: "Image",
  },
  {
    key: "title",
    label: "Title",
  },
  {
    key: "actions",
    label: "Actions",
  },
];

type RenderCellProps = {
  billboard: Billboard;
  columnKey: React.Key;
  onOpenModal: (data: Billboard) => void;
};

export const RenderCell = ({
  billboard,
  columnKey,
  onOpenModal,
}: RenderCellProps) => {
  const cellValue = billboard[columnKey as keyof Billboard];

  switch (columnKey) {
    case "image":
      return (
        <Avatar
          src={billboard.image}
          fallback
          radius="md"
          isBordered
          isFocusable={false}
        />
      );
    case "title":
      return <div>{cellValue}</div>;
    case "actions":
      return (
        <div>
          <div className="relative flex items-center">
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <VerticalDotsIcon />
                </Button>
              </DropdownTrigger>
              <DropdownMenu variant="flat">
                <DropdownItem onClick={() => onOpenModal(billboard)}>
                  <span>View</span>
                </DropdownItem>
                <DropdownItem>
                  <span>edit</span>
                </DropdownItem>
                <DropdownItem color="danger">
                  <span>delete</span>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      );
  }
};
