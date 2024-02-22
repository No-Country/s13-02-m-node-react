import React from "react";
import { Bronce, Diamante, Oro, Plata, Platino } from "./Medals";
import { Skeleton } from "@mui/material";

const MedalsRanks = ({ rank, dataLoaded }) => {
  const medal = rank.toLowerCase();

  return (
    <div className="max-w-3xl w-full flex items-center justify-between bg-jet-500 p-2 md:p-5 rounded-xl gap-2 md:gap-4">
      <div className={medal === "bronce" ? "w-16 md:w-24" : "w-12 md:w-16"}>
        {dataLoaded ? (
          <Skeleton variant="rectangular" width={60} height={60} />
        ) : (
          <Bronce />
        )}
      </div>
      <div className={medal === "plata" ? "w-16 md:w-24" : "w-12 md:w-16"}>
        {dataLoaded ? (
          <Skeleton variant="rectangular" width={60} height={60} />
        ) : (
          <Plata />
        )}
      </div>
      <div className={medal === "oro" ? "w-16 md:w-24" : "w-12 md:w-16"}>
        {dataLoaded ? (
          <Skeleton variant="rectangular" width={60} height={60} />
        ) : (
          <Oro />
        )}
      </div>
      <div className={medal === "platino" ? "w-16 md:w-24" : "w-12 md:w-16"}>
        {dataLoaded ? (
          <Skeleton variant="rectangular" width={60} height={60} />
        ) : (
          <Platino />
        )}
      </div>
      <div className={medal === "diamante" ? "w-16 md:w-24" : "w-12 md:w-16"}>
        {dataLoaded ? (
          <Skeleton variant="rectangular" width={60} height={60} />
        ) : (
          <Diamante />
        )}
      </div>
    </div>
  );
};

export default MedalsRanks;
