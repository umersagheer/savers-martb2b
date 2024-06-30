import React from "react";

type Props = {
  width?: number;
  height?: number;
  className?: string;
};

const BackArrowIcon = ({ width = 16, height = 16, className }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
};

export default BackArrowIcon;
