const variants = {
  outline: `
  cursor-pointer
  rounded-[3px]
    font-sans
    text-[15px]
    font-semibold
    px-[20px]
    py-[8px]

    md:px-[24px]
    md:py-[12px]
    min-w-[81px]
    md:min-w-[140px]
    bg-grey-100 
    border-1
    md:border-2 border-orange-500 
    text-orange-500
    hover:bg-orange-500 hover:text-grey-100 
    active:bg-orange-300 active:border-orange-300
    active:text-grey-100

    transition-colors
    duration-150

  `,

  full: `
  cursor-pointer
  rounded-[3px]
    font-sans
    text-[15px]
    font-semibold
    px-[20px]
    py-[8px]

    md:px-[24px]
    md:py-[12px]
    min-w-[81px]
    md:min-w-[140px]
    bg-orange-500 
    
    text-grey-100
    hover:bg-orange-400 hover:text-grey-100 
   active:bg-orange-300
   

    transition-colors
    duration-150

  `,

  fullGlass: `
  cursor-pointer
  rounded-[3px]
  font-sans
  text-[15px]
  font-semibold
  px-[20px]
  py-[10px]
  md:px-[24px]
  md:py-[12px]
  min-w-[81px]
  md:min-w-[140px]

  bg-orange-500/20
  backdrop-blur-md
  border border-orange-400/40
  text-orange-300
  shadow-[inset_0_1px_1px_rgba(255,160,80,0.3),0_4px_24px_rgba(255,100,0,0.15)]

  hover:bg-orange-500/30
  hover:border-orange-300/60
  hover:shadow-[inset_0_1px_1px_rgba(255,160,80,0.5),0_4px_32px_rgba(255,100,0,0.25)]

  active:bg-orange-500/40

  transition-all
  duration-200
`,
};

const Button = ({ children, variant, onClick, ref }) => {
  return (
    <button ref={ref} onClick={onClick} className={`${variants[variant]} `}>
      <span>{children}</span>
    </button>
  );
};

export default Button;
