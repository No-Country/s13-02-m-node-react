import React, { useState, useEffect } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import axios from "axios";
import { Container } from "@mui/material";

const NotificationProfile = ({ notification, setUserData }) => {
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");
  // Inicializa el estado de `notification` con false
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setUserId(localStorage.getItem("idUser"));
    setToken(localStorage.getItem("idKey"));
  }, []);

  // Este useEffect se activa cuando la prop `notification` cambia
  useEffect(() => {
    // Actualiza el estado de `checked` para reflejar el valor actual de `notification`
    if (notification !== undefined) {
      setChecked(notification);
    }
  }, [notification]);

  const handleChange = async (event) => {
    try {
      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`,
        {
          notification: event.target.checked,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setChecked(event.target.checked); // Asegúrate de actualizar el estado con el nuevo valor
      setUserData(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      console.log("Notificación actualizada");
    }
  };

  return (
    <Container component={"form"}>
      <FormGroup>
        <FormControlLabel
          sx={{ color: "white" }}
          control={<Switch checked={checked} onChange={handleChange} />}
          label="Recibir notificaciones"
        />
      </FormGroup>
    </Container>
  );
};

export default NotificationProfile;
