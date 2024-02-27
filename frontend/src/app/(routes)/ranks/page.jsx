"use client";
import React, { useEffect, useState } from "react";
import { Alert, Container, Snackbar } from "@mui/material";
import ChooseYourState from "@/components/CardStatus/ChooseYourState";
import { CardHome } from "@/components/CardHome";
import MedalsRanks from "@/components/medals-ranks/MedalsRanks";
import AscentZone from "@/components/ascent-zone/AscentZone";
import axios from "axios";

const PageRanks = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorAlert, setErrorAlert] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://nekode-rqas.onrender.com/api/users"
        );
        setUserData(response.data.data);
        setLoading(false);
      } catch (error) {
        setErrorAlert(true);
        console.error("Error al obtener datos:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Snackbar
        open={errorAlert}
        autoHideDuration={6000}
        onClose={() => {
          setErrorAlert(false);
        }}
      >
        <Alert
          onClose={() => {
            setErrorAlert(false);
          }}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Error al obtener datos de la clasificación.
        </Alert>
      </Snackbar>
      <main className="grid gap-2 grid-cols-1 lg:grid-cols-4 relative">
        <aside className="w-60 lg:w-full lg:max-w-60 xl:max-w-80 hidden lg:block lg:col-span-1 space-y-5 ">
          <div className="w-full sticky top-24">
            <ChooseYourState />
            <CardHome secondary={true} />
          </div>
        </aside>
        <section className="w-full lg:col-span-3 flex gap-5 flex-col items-center justify-center">
          <MedalsRanks rank={"oro"} />
          <div className="text-center text-white">
            <h2 className="text-sm sm:text-lg">DIVISION ORO</h2>
            <h4 className="text-xs sm:text-base">
              Estás a 3 puestos de la zona de descenso.
            </h4>
          </div>
          <AscentZone dataLoaded={loading} data={userData} />
        </section>
      </main>
    </>
  );
};

export default PageRanks;
