import React from "react";
import { Bronce, Diamante, Oro, Plata, Platino } from "./Medals";

const MedalsRanks = ({ rank }) => {
  const medal = rank.toLowerCase();
  return (
    <div className="max-w-3xl w-full flex items-center justify-between bg-jet-500 p-2 md:p-5 rounded-xl gap-2 md:gap-4">
      <div className={medal === "bronce" ? "w-16 md:w-24" : "w-12 md:w-16"}>
        <Bronce />
      </div>
      <div className={medal === "plata" ? "w-16 md:w-24" : "w-12 md:w-16"}>
        <Plata />
      </div>
      <div className={medal === "oro" ? "w-16 md:w-24" : "w-12 md:w-16"}>
        <Oro />
      </div>
      <div className={medal === "platino" ? "w-16 md:w-24" : "w-12 md:w-16"}>
        <Platino />
      </div>
      <div className={medal === "diamante" ? "w-16 md:w-24" : "w-12 md:w-16"}>
        <Diamante />
      </div>
    </div>
  );
};

export default MedalsRanks;
