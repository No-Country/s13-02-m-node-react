import React from "react";
import CopyrightRoundedIcon from "@mui/icons-material/CopyrightRounded";
import Pet from "../pet/Pet";
import Logo from "../logo/Logo";

const Footer = () => {
  return (
    <footer className="w-full bg-rich-black-500 text-white px-5 py-10 md:px-20 md:py-5 flex flex-col md:flex-row items-center justify-between gap-5">
      <div className="w-full flex flex-col md:flex-row items-center gap-5">
        <Pet className="w-20 md:w-14" />
        <Logo size="text-2xl w-8 h-9 p-2" space="space-x-2" />
      </div>
      <div className="w-full flex items-center justify-center font-light text-sm">
        <CopyrightRoundedIcon className="text-lg mr-1" />
        <p>Todos los derechos reservados</p>
      </div>
      <div className="w-full text-center md:text-end font-light text-sm">
        <p>No country-s12-02-m-node-react</p>
      </div>
    </footer>
  );
};

export default Footer;
