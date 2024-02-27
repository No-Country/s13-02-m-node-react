"use client";
import React from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import oro from "/public/oro.svg";
import winner from "/public/winner.svg";
import Rectangle from "/public/Rectangle.svg";
import redclock from "/public/redclock.svg";
import racingflag from "/public/racingflag.svg";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import Link from "next/link";

export const CardHome = ({ secondary }) => {
  return (
    <>
      {secondary ? (
        <Grid
          sx={{
            //card whit glassmorphism

            width: "300px",
            backgroundColor: "#333333",
            borderRadius: "10px",
            margin: "10px",
            boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
            backdropFilter: "blur(4px)",
            WebkitBackdropFilter: "blur(4px)",
            border: "1px solid rgba( 255, 255, 255, 0.18 )",
            borderRadius: "10px",
            // position: 'sticky',
            top: "290px",
          }}
        >
          <Grid
            item
            sx={{
              display: "flex",
              padding: "10px",
              color: "white",
              justifyContent: "space-between",
              alignItems: "space-between",
            }}
          >
            <Typography component="h2">Desafio del dia</Typography>
          </Grid>
          <Grid
            item
            gap={2}
            sx={{
              display: "flex",

              paddingX: "10px",
              marginLeft: "10px",
              color: "white",
            }}
          >
            {/** importar imagen de public */}

            <Image src={winner} alt="oro" width={40} height={40} />
            <Grid
              item
              sx={{
                paddingX: "10px",
                color: "white",
                justifyContent: "center",

                margin: "5px",
              }}
            >
              <Typography
                sx={{
                  marginBottom: "10px",
                  fontSize: "14px",
                }}
                component="h2"
              >
                Gana 10 xp
              </Typography>
              <Image src={Rectangle} alt="oro" width={100} height={100} />
            </Grid>
          </Grid>
          <Grid
            item
            gap={2}
            sx={{
              display: "flex",

              paddingX: "10px",
              marginLeft: "10px",
              color: "white",
            }}
          >
            {/** importar imagen de public */}

            <Image src={racingflag} alt="oro" width={40} height={40} />
            <Grid
              item
              sx={{
                paddingX: "10px",
                color: "white",
                justifyContent: "center",

                margin: "10px",
              }}
            >
              <Typography
                sx={{
                  marginBottom: "10px",
                  fontSize: "14px",
                }}
                component="h3"
              >
                Responde correctamente 5 veces seguidas en 2 lecciones
              </Typography>
              <Image src={Rectangle} alt="oro" width={100} height={100} />
            </Grid>
          </Grid>
          <Grid
            item
            gap={2}
            sx={{
              display: "flex",

              paddingX: "10px",
              marginLeft: "10px",
              color: "white",
            }}
          >
            {/** importar imagen de public */}

            <Image src={redclock} alt="oro" width={40} height={40} />
            <Grid
              item
              sx={{
                paddingX: "10px",
                color: "white",
                justifyContent: "center",

                margin: "10px",
              }}
            >
              <Typography
                sx={{
                  marginBottom: "10px",
                  fontSize: "14px",
                }}
                component="h2"
              >
                Aprende durante 10 minutos
              </Typography>
              <Image src={Rectangle} alt="oro" width={100} height={100} />
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <Grid
          sx={{
            //card whit glassmorphism
            // height: '180px',
            width: "300px",
            backgroundColor: "#333333",
            borderRadius: "10px",
            margin: "10px",
            marginTop: "0px",
            boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
            backdropFilter: "blur(4px)",
            WebkitBackdropFilter: "blur(4px)",
            border: "1px solid rgba( 255, 255, 255, 0.18 )",
            borderRadius: "10px",
            // position: "sticky",
            top: "100px",
          }}
        >
          <Grid
            item
            sx={{
              display: "flex",
              padding: "10px",
              color: "white",
              justifyContent: "space-between",
              alignItems: "space-between",
            }}
          >
            <h1>Divison oro</h1>
          </Grid>
          <Grid
            item
            gap={2}
            sx={{
              display: "flex",
              padding: "10px",
              marginLeft: "10px",
              color: "white",
            }}
          >
            {/** importar imagen de public */}

            <Image src={oro} alt="oro" width={50} height={50} />

            <h1>Estás a 3 puestos de la zona de descenso.</h1>
          </Grid>
          <Grid
            item
            sx={{
              display: "flex",
              padding: "5px",
              color: "white",
              justifyContent: "center",

              margin: "5px",
            }}
          >
            <Link href={"/ranks"}>
              <Button
                variant="contained"
                sx={{
                  color: "#A87FFB",
                  borderRadius: "10px",
                  padding: "5px",
                  margin: "5px",

                  fontSize: "10px",
                }}
              >
                Jugar a las ligas
              </Button>
            </Link>
          </Grid>
        </Grid>
      )}
    </>
  );
};
