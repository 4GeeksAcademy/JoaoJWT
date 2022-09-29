import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { CurrrencyConverter } from "./CurrencyConverter";
import "../../styles/home.css";
import { ExchangeRate } from "./ExchangeRate";
import Grafico from "./Grafico.jsx";
import ImageSlider from "./ImageSlider";
import { Text } from '@chakra-ui/react'
import { Box } from "@chakra-ui/react"
import { Perfil } from "./perfil";
import SidebarWithHeader from "../component/sideBar.jsx" 
export const Conversor = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="home">
         {/* <Perfil/> */}
         <SidebarWithHeader/>
          <CurrrencyConverter />
          <br/>
          <br/>
          <br/>
          <br/>
          <ImageSlider/>
    </div>
    
  )
};
