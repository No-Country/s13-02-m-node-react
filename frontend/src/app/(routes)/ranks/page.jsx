"use client";
import React, { useEffect, useState } from "react";
import { Alert, Container, Snackbar } from "@mui/material";
import ChooseYourState from "@/components/CardStatus/ChooseYourState";
import { CardHome } from "@/components/CardHome";
import MedalsRanks from "@/components/medals-ranks/MedalsRanks";
import AscentZone from "@/components/ascent-zone/AscentZone";
import Toolbar from "@mui/material/Toolbar";
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
      <Toolbar id="back-to-top-anchor" />
      <Container
        maxWidth="xl"
        sx={{
          minHeight: "100vh",
        }}
        className="flex flex-col justify-between mt-6"
      >
        <main className="flex">
          <aside className="w-80 hidden lg:block space-y-5">
            <ChooseYourState />
            <CardHome secondary={true} />
          </aside>

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
              Error al obtener datos.
            </Alert>
          </Snackbar>

          <Container className="p-0 flex gap-5 flex-col items-center ">
            <section className="w-full flex gap-5 flex-col items-center justify-center">
              <MedalsRanks rank={"oro"} />
              <div className="text-center text-white">
                <h2 className="text-sm sm:text-lg">DIVISION ORO</h2>
                <h4 className="text-xs sm:text-base">
                  Estás a 3 puestos de la zona de descenso.
                </h4>
              </div>
              <AscentZone dataLoaded={loading} data={userData} />
            </section>
          </Container>
        </main>
      </Container>
    </>
  );
};

export default PageRanks;
