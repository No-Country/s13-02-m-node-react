import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box, Container } from "@mui/material";

const CardsEtapas = () => {
  return (
    <Container className="container mt-4">
      <Card
        className="bg-[rgb(51,51,51)] py-4"
        sx={{
          //   height: ["239px"],
          width: ["500px"],
          display: "flex",
          borderRadius: ["19px"],
          boxShadow: "0px 0px 8px 0px rgb(33,150,243)",
        }}
      >
        <Box
          sx={{ display: "flex", flexDirection: "column", alignSelf: "center" }}
          className=" "
        >
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{
                fontWeight: "medium",
                fontSize: "24px",
                color: "white",
              }}
            >
              Etapa 1: Hello world!
            </Typography>
            `
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <img
                className="mr-1"
                src="https://i.ibb.co/TqYrZMf/check-circle.png"
              />
              <Typography
                variant="body2"
                sx={{
                  fontWeight: "regular",
                  fontSize: "16px",
                  color: "white",
                }}
              >
                Completado
              </Typography>
            </Box>
          </CardContent>
          <CardActions>
            <Button
              sx={{
                color: "rgb(33,150,243)",
                fontWeight: "medium",
                fontSize: "16px",
                borderRadius: "31px",
                boxShadow: "0px 4px 6px rgba(0,0,0,0.3)",
                textTransform: "none",
              }}
              className="px-3 ml-2"
            >
              Repasar
            </Button>
            <Button
              size="small"
              sx={{
                color: "rgb(168,127,251)",
                fontWeight: "medium",
                fontSize: "16px",
                textTransform: "none",
              }}
              className="px-3 ml-2"
            >
              Ver detalles
            </Button>
          </CardActions>
        </Box>
        <CardMedia
          sx={{ height: ["10.403rem"], width: ["14rem"], alignSelf: "center" }}
          image="https://i.ibb.co/zZN6Mvz/amico.png"
          title="green iguana"
        />
      </Card>
    </Container>
  );
};

export default CardsEtapas;
