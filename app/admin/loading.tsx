import { Spinner } from "@nextui-org/react";
import React from "react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Spinner />
    </div>
  );
};

export default Loading;
