"use client"
import { node } from "prop-types";
import { createContext, useState} from "react";

export const HomeContextProvider = createContext("");

const HomeProvider = ({ children }) => {

  const [hamburger, setHamburger] = useState(false);
  const [toggle , setToggle] = useState(false);


  const data = {
    hamburger,
    setHamburger,
     toggle,
    setToggle,
  };
  return (
    <HomeContextProvider.Provider value={data}>
      {children}
    </HomeContextProvider.Provider>
  );
};
export default HomeProvider;

HomeProvider.propTypes = {
  children: node,
};
