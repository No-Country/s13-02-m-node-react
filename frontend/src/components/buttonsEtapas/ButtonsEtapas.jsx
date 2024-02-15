import React from 'react'
import Button from "@mui/material/Button";

const ButtonsEtapas = () => {

  const temas = ["Variables y Tipos de Datos", "Funciones y Alcance", "Estructuras de Control", "Manipulación del DOM", "Eventos", "AJAX y APIs", "Programación orientada a Objetos", "Trabajo con Arrays y Objetos","ES6+ y Sintaxis Moderna", "Frameworks y Bibliotecas","Eventos","Eventos","Eventos","Eventos"]

  const getButtonMarginLeft = (index) => {
    if (index === 0) {
      return `0px`;
    } else if (index<5){
    return `${(index * 50) - 100}px`;
    } else if (index < 12) {
      return `${(index - 6) * -50}px`;
    } else if (index < 18) {
      return `${(index - 12) * 50 - 100}px`;
    } else {
      return `${(index - 18) * 50}px`;
    }
  }

  return (
    <>
     <div className="flex flex-col items-center" style={{height: "350px"}}>
    {temas.map((tema,index)=>{
        return (
              <Button
              sx={{
                color: "#FFFFFF",
                fontWeight: "medium",
                width:"270px",
                borderRadius: "31px",
                boxShadow: "0px 4px 6px rgba(0,0,0,0.3)",
                border: "5px solid #17B877", 
                textTransform: "none",
                "&:hover": {
                    backgroundColor: "#A87FFB",
                    color: "#FFFFFF",
                  },
              }}
              className={` bg-[#A87FFB] mb-4`}
              style={{marginLeft: getButtonMarginLeft(index)}}
              key={index}
            >
              {tema}
            </Button>
        )
    })}
    </div>
</>

  )

}

export default ButtonsEtapas;