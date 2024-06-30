import BillboardForm from "./components/billboard-form";
import prisma from "@/libs/prismadb";

type Props = {
  params: {
    billboardId: string;
  };
};

const BillboardPage = async ({
  params,
}: {
  params: { billboardId: string };
}) => {
  const billboard = await prisma.billboard?.findUnique({
    where: {
      id: params.billboardId,
    },
  });

  return (
    <div>
      <BillboardForm initialData={billboard} />
    </div>
  );
};

export default BillboardPage;
