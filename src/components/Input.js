const Input = ({ className, children, ...props }) => {
  return (
    <div className="relative">
      <input
        {...props}
        className={
          "h-8 rounded-md bg-input outline-none px-2 " + className
        }
      ></input>
      {children && (
        <div className="absolute right-2 top-0 h-full grid place-items-center">
          {children}
        </div>
      )}
    </div>
  );
};

export default Input;
