const Card = ({ children, title, className = "", header, ...props }) => {
  return (
    <div
      className={`max-w-full bg-card rounded-xl p-4 text-left relative ${className}`}
      {...props}
    >
      {header}
      <div
        className={`text-lg font-semibold text-title ${header ? "mt-3" : ""}`}
      >
        {title}
      </div>
      <div className="text-sm leading-tight">{children}</div>
    </div>
  );
};

export default Card;
