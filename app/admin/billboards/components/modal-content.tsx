import { Avatar } from "@nextui-org/react";
import React from "react";

type ModalContentProps = {
  data: any;
};

export default function ModalContent({ data }: ModalContentProps) {
  return (
    <div className="flex flex-col gap-2 justify-center items-center">
      <Avatar src={data.image} className="w-32 h-32 text-large" radius="md" />
      <p className="text-small">{data.title}</p>
    </div>
  );
}
