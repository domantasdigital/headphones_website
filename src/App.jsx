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
import usePreloader from "./FilesForSections/PreloaderFiles/usePreloader.js";
import HorizontalScroll from "./Sections/HorizontalScroll.jsx";

const CRITICAL_IMAGES = [
  "/Assets/HeroVideo4.webm",
  // "/Assets/Card_1.webp",
  // "/Assets/Card_2.webp",
  // "/Assets/Card_3.webp",
  // "/Assets/Card_4.webp",
  // "/Assets/Card_5.webp",
];

const App = () => {
  usePreloader(CRITICAL_IMAGES);
  return (
    <main className="mx-auto min-h-screen">
      <NavBar />
      <Hero />
      <BentoGrid />
      <FeelThePremium />
      <HorizontalScroll />
      <Tesla />
      <Interactive />
      <ImageCarousel />
      <Faq />
      <NextLevel />
      <Footer />
    </main>
  );
};

export default App;
