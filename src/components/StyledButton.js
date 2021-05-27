import Button from "./Button";

const StyledButton = ({ children, className = "", ...props }) => {
  return (
    <Button
      {...props}
      className={
        "px-2 py-1 bg-accent rounded-lg text-lg font-bold text-white" + className
      }
    >
      {children}
    </Button>
  );
};

export default StyledButton;
