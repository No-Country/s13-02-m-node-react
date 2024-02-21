import { Container } from "@mui/material";
import ChooseYourState from "@/components/CardStatus/ChooseYourState";
import { CardHome } from "@/components/CardHome";
import MedalsRanks from "@/components/medals-ranks/MedalsRanks";
import AscentZone from "@/components/ascent-zone/AscentZone";
import Toolbar from "@mui/material/Toolbar";

const pageRanks = () => {
  //Datos de muestra
  const data = [
    {
      imagen:
        "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      nombre: "Usuario 1",
      puntaje: 85,
    },
    {
      imagen:
        "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      nombre: "Usuario 2",
      puntaje: 78,
    },
    {
      imagen:
        "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      nombre: "Usuario 3",
      puntaje: 92,
    },
    {
      imagen:
        "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      nombre: "Usuario 4",
      puntaje: 65,
    },
    {
      imagen:
        "https://images.pexels.com/photos/1036622/pexels-photo-1036622.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      nombre: "Usuario 5",
      puntaje: 100,
    },
    {
      imagen:
        "https://images.pexels.com/photos/2787341/pexels-photo-2787341.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      nombre: "Usuario 6",
      puntaje: 45,
    },
    {
      imagen:
        "https://images.pexels.com/photos/2013701/pexels-photo-2013701.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      nombre: "Usuario 7",
      puntaje: 73,
    },
    {
      imagen:
        "https://images.pexels.com/photos/720598/pexels-photo-720598.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      nombre: "Usuario 8",
      puntaje: 87,
    },
    {
      imagen:
        "https://images.pexels.com/photos/3034903/pexels-photo-3034903.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      nombre: "Usuario 9",
      puntaje: 62,
    },
    {
      imagen:
        "https://images.pexels.com/photos/15308686/pexels-photo-15308686/free-photo-of-mujer-primavera-retrato-sonriente.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      nombre: "Usuario 10",
      puntaje: 95,
    },
  ];

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
          <Container className="p-0 flex gap-5 flex-col items-center ">
            <section className="w-full flex gap-5 flex-col items-center justify-center">
              <MedalsRanks rank={"oro"} />
              <div className="text-center text-white">
                <h2 className="text-sm sm:text-lg">DIVISION ORO</h2>
                <h4 className="text-xs sm:text-base">
                  Estás a 3 puestos de la zona de descenso.
                </h4>
              </div>
            </section>
            <AscentZone data={data} />
          </Container>
        </main>
      </Container>
    </>
  );
};

export default pageRanks;
