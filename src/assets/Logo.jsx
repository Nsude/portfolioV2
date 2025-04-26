import React from "react";

const Logo = ({color}) => {
  return (
    <svg
      width="30"
      height="31"
      viewBox="0 0 30 31"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="14.8492"
        y="0.650759"
        width="5"
        height="21"
        transform="rotate(45 14.8492 0.650759)"
        fill={color || "black"}
      />
      <rect
        x="17.2384"
        y="9.57534"
        width="5"
        height="11.7575"
        transform="rotate(45 17.2384 9.57534)"
        fill={color || "black"}
      />
      <rect
        x="26.163"
        y="11.9645"
        width="5"
        height="21"
        transform="rotate(45 26.163 11.9645)"
        fill={color || "black"}
      />
    </svg>
  );
};

export default Logo;
