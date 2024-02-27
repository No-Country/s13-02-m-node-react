import Footer from "@/components/footer/Footer";
import NavBar from "@/components/navBar/NavBar";

const layout = ({ children }) => {
  return (
    <div className="w-full relative">
      <div className="sticky top-0 z-50">
        <NavBar />
      </div>
      <div className=" p-2 lg:p-5">{children}</div>
      <Footer />
    </div>
  );
};
export default layout;
