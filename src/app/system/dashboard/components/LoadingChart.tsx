import { LoaderCircle } from "lucide-react";
import React from "react";

const LoadingChart = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <LoaderCircle className="text-primary animate-spin" />
    </div>
  );
};

export default LoadingChart;
