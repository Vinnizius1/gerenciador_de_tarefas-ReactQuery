/* eslint-disable react/prop-types */
const Button = ({ children, type, className, onClick = null }) => {
  return (
    <button className={className} type={type} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
