"use client";
import Logo from "@/components/logo/Logo";
import { Button } from "@mui/material";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Subtitle from "./Subtitle";
import Pet from "../pet/Pet";

const Hero = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <section className="flex min-h-screen flex-col items-center justify-evenly md:justify-between p-5  md:px-24 md:py-16 bg-rich-black-500">
      <Pet className="md:hidden w-40 md:w-52 " />
      <div className="flex flex-col items-center justify-center space-y-4 md:space-y-10">
        <Logo />
        <Subtitle />
      </div>
      <Button
        href="/login"
        variant="outlined"
        size={isDesktop ? "large" : "medium"}
        endIcon={<KeyboardArrowRightRoundedIcon />}
      >
        Comenzar Ahora
      </Button>
    </section>
  );
};

export default Hero;
