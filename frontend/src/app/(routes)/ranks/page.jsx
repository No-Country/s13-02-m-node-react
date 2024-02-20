import NavBar from "@/components/navBar/NavBar";
import Footer from "@/components/footer/Footer";
import ChooseYourState from "@/components/CardStatus/ChooseYourState";
import { CardHome } from "@/components/CardHome";

const pageRanks = () => {
  return (
    <div>
      <NavBar />
      <main className="flex p-6">
        <aside className="space-y-5">
          <ChooseYourState />
          <CardHome secondary={true} />
        </aside>
      </main>
      <Footer />
    </div>
  );
};

export default pageRanks;
