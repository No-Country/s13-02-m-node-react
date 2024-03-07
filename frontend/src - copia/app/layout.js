'use client'
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/navBar/NavBar";
import Footer from "@/components/footer/Footer";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "Nekode",
//   description:
//     "Nekode is an app to test and validate your knowledge as a programmer",
// };

export default function RootLayout({ children }) {
  return (
    <Provider store={store}>
      <html lang="en">
        <body className={inter.className}>
          {/* <NavBar /> */}
          {children}
          {/* <Footer/> */}
        </body>
      </html>
    </Provider>
  );
}
