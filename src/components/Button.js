import Ripples from "react-ripples";

const Button = ({ children, className = "", onClick, ...props }) => {
  return (
    <button className={`${className}`} {...props}>
      <Ripples className="w-full" onClick={onClick}>
        {children}
      </Ripples>
    </button>
  );
};

export default Button;
