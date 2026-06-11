import Button from "../Components/Button.jsx";

const NextLevel = () => {
  return (
    <>
      <div className="  mt-15 flex flex-col items-center bg-grey-100">
        <h1 className="text-[30px] px-5 sm:text-[42px]   lg:text-[61px] font-extrabold text-center">
          READY TO GO <span className="text-orange-500">NEXT LEVEL?</span>
        </h1>
        <div className="mt-12 flex flex-center gap-3.75">
          <span className="buy-btn ">
            <Button variant="outline">Buy</Button>
          </span>

          <em className="price text-grey-700">for 479€</em>
        </div>
        <div className="mt-5 cursor-pointer">
          <a className="view-link text-orange-400 font-mono hover:text-orange-300">
            View pricing options
          </a>
        </div>
        <div>
          <video autoPlay muted playsInline>
            <source src="/Assets/RTMAC.webm" type="video/webm" />
          </video>
        </div>
      </div>
    </>
  );
};

export default NextLevel;
