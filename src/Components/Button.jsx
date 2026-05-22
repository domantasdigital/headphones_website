const variants = {
  outline: `
  cursor-pointer
  rounded-[3px]
    font-sans
    text-[15px]
    font-semibold
    px-[24px]
    py-[12px]
    min-w-[140px]
    bg-grey-100 
    border-2 border-orange-500 
    text-orange-500
    hover:bg-orange-500 hover:text-grey-100 
    active:bg-orange-300 active:border-orange-300
    active:text-grey-100

    transition-colors
    duration-150

  `,
};

const Button = ({ children, variant = "outline", onClick }) => {
  return (
    <button onClick={onClick} className={`${variants[variant]} `}>
      {children}
    </button>
  );
};

export default Button;
