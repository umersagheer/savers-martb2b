"use client";

import { Heading } from "@/components/admin/heading";
import DataTable from "@/components/admin/table";
import PLusIcon from "@/components/icons/plus";
import { Button } from "@nextui-org/react";
import { Billboard } from "@prisma/client";
import { useRouter } from "next/navigation";
import { RenderCell, columns } from "./columns";
import ViewModal from "@/components/admin/view-modal";
import { useState } from "react";
import ModalContent from "./modal-content";

type BillboardClientProps = {
  billboards: Billboard[] | null;
};

const BillboardClient = ({ billboards }: BillboardClientProps) => {
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState<Billboard | null>(null);

  const handleOpenModal = (data: Billboard) => {
    setModalData(data);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalData(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <Heading title="Billboards" description="Manage billboards" />
        <Button
          color="secondary"
          variant="flat"
          startContent={<PLusIcon width={16} height={16} />}
          onClick={() => {
            router.push("/admin/billboards/add");
          }}
        >
          Add new
        </Button>
      </div>
      <div className="my-2 md:mx-5">
        {billboards && (
          <DataTable<Billboard>
            data={billboards}
            columns={columns}
            renderCell={(billboard, columnKey) => (
              <RenderCell
                billboard={billboard}
                columnKey={columnKey}
                onOpenModal={handleOpenModal}
              />
            )}
          />
        )}
      </div>
      {isModalOpen && modalData && (
        <ViewModal title="Billboard" onClose={handleCloseModal}>
          <ModalContent data={modalData} />
        </ViewModal>
      )}
    </div>
  );
};

export default BillboardClient;
