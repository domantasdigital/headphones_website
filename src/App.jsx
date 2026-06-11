import NavBar from "./Sections/NavBar.jsx";
import Hero from "./Sections/Hero.jsx";
import BentoGrid from "./Sections/BentoGrid.jsx";
import FeelThePremium from "./Sections/FeelThePremium.jsx";
import Tesla from "./Sections/Tesla.jsx";
import Interactive from "./Sections/Interactive.jsx";
import ImageCarousel from "./Sections/ImageCarousel.jsx";
import Faq from "./Sections/Faq.jsx";
import NextLevel from "./Sections/NextLevel.jsx";
import Footer from "./Sections/Footer.jsx";

// import TestingSec from "./Sections/TestingSec.jsx";

const App = () => {
  return (
    <main className=" mx-auto min-h-screen flex flex-col">
      <NavBar />
      <Hero />
      <BentoGrid />
      <FeelThePremium />
      <Tesla />
      <Interactive />
      <ImageCarousel />
      <Faq />
      <NextLevel />
      <Footer />
      {/* <TestingSec /> */}
    </main>
  );
};

export default App;
