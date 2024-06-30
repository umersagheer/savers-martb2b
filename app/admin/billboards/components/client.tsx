"use client";

import { Heading } from "@/components/admin/heading";
import DataTable from "@/components/admin/table";
import PLusIcon from "@/components/icons/plus";
import { Button } from "@nextui-org/react";
import { Billboard } from "@prisma/client";
import { useRouter } from "next/navigation";
import { columns, RenderCell } from "./columns";
import { toast } from "sonner";
import { useState } from "react";
import axios from "axios";
import ViewModal from "@/components/admin/view-modal";
import ModalContent from "./modal-content";
import AlertModal from "@/components/admin/alert-modal";

type BillboardClientProps = {
  billboards: Billboard[] | null;
};

const BillboardClient = ({ billboards }: BillboardClientProps) => {
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [data, setData] = useState<Billboard | null>(null);

  const [loading, setLoading] = useState(false);

  const handleOpenModal = (billboard: Billboard) => {
    setIsModalOpen(true);
    setData(billboard);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setData(null);
  };

  const handleOpenDeleteModal = (billboard: Billboard) => {
    setIsDeleteModalOpen(true);
    setData(billboard);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setData(null);
  };

  const onDelete = async (id: string) => {
    try {
      setLoading(true);
      await axios.delete(`/api/billboards/${id}`);
      router.refresh();
      toast.info("Billboard deleted successfully");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.warning(error.response.data);
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
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
            searchKey="title"
            data={billboards}
            columns={columns}
            renderCell={(item, columnKey) =>
              RenderCell({
                billboard: item,
                columnKey,
                onOpenModal: handleOpenModal,
                onOpenDeleteModal: handleOpenDeleteModal,
              })
            }
          />
        )}
      </div>

      {isDeleteModalOpen && (
        <AlertModal
          title={"Delete Billboard"}
          onClose={handleCloseDeleteModal}
          onDelete={onDelete}
          loading={loading}
          id={data?.id}
        />
      )}

      {isModalOpen && (
        <ViewModal title={"Billboard"} onClose={handleCloseModal}>
          <ModalContent data={data} />
        </ViewModal>
      )}
    </div>
  );
};

export default BillboardClient;
