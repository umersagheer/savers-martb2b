"use client";

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
import { useRouter } from "next/navigation";

export type ColumnsType = {
  key: keyof Omit<Billboard, "id"> | "actions";
  label: string;
};

type RenderCellProps = {
  billboard: Billboard;
  columnKey: keyof Billboard | "actions";
  onOpenModal: (billboard: Billboard) => void;
  onOpenDeleteModal: (billboard: Billboard) => void;
};

export const columns: ColumnsType[] = [
  // {
  //   key: "image",
  //   label: "Image",
  // },
  {
    key: "title",
    label: "Title",
  },
  {
    key: "actions",
    label: "Actions",
  },
];

export const RenderCell = ({
  billboard,
  columnKey,
  onOpenModal,
  onOpenDeleteModal,
}: RenderCellProps) => {
  const cellValue = billboard[columnKey as keyof Billboard];
  const router = useRouter();

  switch (columnKey) {
    // case "image":
    //   return (
    //     <Avatar
    //       src={billboard.image}
    //       fallback
    //       radius="md"
    //       isBordered
    //       isFocusable={false}
    //     />
    //   );
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
                <DropdownItem
                  onClick={() =>
                    router.push(`/admin/billboards/${billboard.id}`)
                  }
                >
                  <span>Edit</span>
                </DropdownItem>
                <DropdownItem
                  color="danger"
                  onClick={() => {
                    onOpenDeleteModal(billboard);
                  }}
                >
                  <span>Delete</span>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      );
  }
};
