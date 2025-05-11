"use client";
import SpendEvolution from "./components/SpendEvolution";
import StatusData from "./components/StatusData";
import TypeValueChart from "./components/TypeValueChart";

const page = () => {
  return (
    <div>
      <StatusData />
      <div className="grid grid-cols-auto-fit-320 gap-5">
        <SpendEvolution />
        <TypeValueChart />
      </div>
    </div>
  );
};

export default page;
