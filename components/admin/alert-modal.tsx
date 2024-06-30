import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { useEffect, useState } from "react";

type AlertModalProps = {
  title: string;
  onClose: () => void;
  onDelete: (id: string) => Promise<void>;
  loading: boolean;
  id?: string;
};

export default function AlertModal({
  title,
  onClose,
  onDelete,
  loading,
  id,
}: AlertModalProps) {
  const { isOpen } = useDisclosure({ defaultOpen: true });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;
  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={(isOpen) => !isOpen && onClose()}
        backdrop="opaque"
        hideCloseButton
        classNames={{
          backdrop:
            "bg-gradient-to-t from-primary/50 via-primary/10 to-primary/10 backdrop-blur-md",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
              <ModalBody>Are you sure you want to delete this item?</ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="danger"
                  variant="solid"
                  isLoading={loading}
                  onClick={async () => {
                    if (id) {
                      await onDelete(id);
                    }
                    onClose();
                  }}
                >
                  Confirm
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
