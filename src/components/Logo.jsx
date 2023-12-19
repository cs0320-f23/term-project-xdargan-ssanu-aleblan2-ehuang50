import React from "react";

/**
 * Logo is a React component that renders the logo image.
 *
 * @component
 * @returns {JSX.Element} JSX element representing the logo.
 */
const Logo = () => {
  return (
    <div className="">
      <img src={require("../image/logo.png")} alt="" />
    </div>
  );
};

export default Logo;
