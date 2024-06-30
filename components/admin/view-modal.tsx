import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";

type ViewModalProps = {
  children: React.ReactNode;
  title: string;
  onClose: () => void;
};

export default function ViewModal({
  children,
  title,
  onClose,
}: ViewModalProps) {
  const { isOpen } = useDisclosure({ defaultOpen: true });
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
              <ModalBody>{children}</ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
