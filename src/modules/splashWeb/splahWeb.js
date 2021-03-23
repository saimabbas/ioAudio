import React, { useEffect, useState } from "react";
import SplashHeader from "../../utils/header/splashHeader";
import SignUpPopUp from "../auth/signUp/SignUp";
import ClientSection from "./ClientSection/ClientSection";
import DarkSection from "./pricingSection/PricingSection";
import FactSection from "./FactSection/FactSection";
import HeroSection from "./HeroSection/HeroSection";
import BlogSecton from "./BlogSection/BlogSecton";
import SplashFooter from "../../utils/splashFooter/SplashFooter";

export default function SplashWeb() {
  const setSignupForm = () => {
    document
      .getElementById("modalSignup")
      .setAttribute("style", "opacity: 1; display: flex;");
  };
  // const [activeClass, setActiveClass] = useState("normal");
  // const handleScroll = () => {
  //   alert("ringi asdf" , window.scrollY )
  //   activeClass = "normal";
  //   if (window.scrollY === 0) {
  //     activeClass = "top";
  //   }
  //   setActiveClass(activeClass);
  // };
  return (
    <div className="splashWeb">
      <SplashHeader setSignupForm={setSignupForm} />
      <SignUpPopUp />
      <HeroSection />
      <ClientSection />
      <FactSection />
      <DarkSection />
      <BlogSecton />
      <SplashFooter />
    </div>
  );
}
