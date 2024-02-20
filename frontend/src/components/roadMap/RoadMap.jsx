
"use client"
import React from "react";
import Button from "@mui/material/Button";
import { Container } from "@mui/material";
import Image from "next/image";
import image1 from "/public/amico.webp";
import image2 from "/public/Group69.webp";
import image3 from "/public/Group67.webp";
import { useMediaQuery } from "@mui/material";
import data from "@/utils/db/stackThemes"

const Roadmap = () => {
  // const temas = [
  //   "Variables y Tipos de Datos",
  //   "Funciones y Alcance",
  //   "Estructuras de Control",
  //   "Manipulación del DOM",
  //   "Eventos",
  //   "AJAX y APIs",
  //   "Programación orientada a Objetos",
  //   "Trabajo con Arrays y Objetos",
  //   "ES6+ y Sintaxis Moderna",
  //   "Frameworks y Bibliotecas",
  //   "Eventos",
  //   "Eventos",
  //   "Eventos",
  //   "Eventos",
  // ];

  const getButtonMarginLeft = (index) => {
    if (index === 0) {
      return `0px`;
    } else if (index < 5) {
      return `${index * 50 - 100}px`;
    } else if (index < 12) {
      return `${(index - 6) * -30}px`;
    } else if (index < 18) {
      return `${(index - 12) * 30 - 100}px`;
    } else {
      return `${(index - 18) * -30}px`;

    }
  };

  const isXsOrMd = useMediaQuery("(max-width:960px)");
  const datajs=data.filter(item=>item.name==="Javascript") //prueba despues cambiar generico
  const dataJavascript=datajs[0] //prueba despues cambiar generico

  return (
    <>
      <Container 
      className="grid grid-cols-3"
      >
        <Container className="">
          {isXsOrMd? null:
          <Image
            src={image1}
            width={400}
            height={400}
            alt="Principiante"
            className=" mt-[220px] hidden md:block"
          />
          }
           {isXsOrMd? null:
             <Image
             src={image2}
             width={400}
            height={400}
             alt="Avanzado"
             className=" mt-[750px] pr-[50px] hidden md:block "
           />
          }
        
          
        </Container>
        <div className={`flex flex-col items-center justify-center `} >
          {dataJavascript.themes.map((data, index) => {
            return (
              <Button
                sx={{
                  color: "#FFFFFF",
                  fontWeight: "medium",
                  width:{
                    xs: "270px", // theme.breakpoints.up('xs')
                    sm: "270px", // theme.breakpoints.up('sm')
                    md: "270px", // theme.breakpoints.up('md')
                    lg: "270px", // theme.breakpoints.up('lg')
                    xl: "270px", // theme.breakpoints.up('xl')
                  },
                  borderRadius: "31px",
                  boxShadow: "0px 4px 6px rgba(0,0,0,0.3)",
                  border: "5px solid #17B877",
                  // marginLeft:{marginLeft: getButtonMarginLeft(index) },
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "#A87FFB",
                    color: "#FFFFFF",
                  },
                }}
                className={` bg-[#A87FFB] mb-4 md:ml-0`}
                style={{  marginLeft: isXsOrMd ? "0px" : getButtonMarginLeft(index) }}
                key={index}
              >
                {data.name + data.level  }
              </Button>
            );
          })}
        </div>
        
        {isXsOrMd? null:
            <Image
            src={image3}
            width={400}
            height={400}
            alt="Intermedio"
            className="mt-[660px] hidden md:block"
          />
          }
        
      </Container>
    </>
  );
};

export default Roadmap;
