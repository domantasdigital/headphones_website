import NavBar from "./Sections/NavBar.jsx";
import Hero from "./Sections/Hero.jsx";

const App = () => {
  return (
    <main className="max-w-425 mx-auto min-h-screen flex flex-col">
      <NavBar />
      <Hero />
      <div className="bg-red-500 min-h-1000">another section a new onee</div>
    </main>
  );
};

export default App;
