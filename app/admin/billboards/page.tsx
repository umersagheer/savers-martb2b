import React, { Suspense } from "react";
import BillboardClient from "./components/client";
import prisma from "@/libs/prismadb";
import Loading from "../loading";
import Await from "@/components/admin/await";

const BillboardsPage = async () => {
  const billboards = prisma.billboard.findMany({});
  return (
    <div className="">
      <Suspense fallback={<Loading />}>
        <Await promise={billboards}>
          {(billboards) => (
            <>{billboards && <BillboardClient billboards={billboards} />}</>
          )}
        </Await>
      </Suspense>
    </div>
  );
};

export default BillboardsPage;
