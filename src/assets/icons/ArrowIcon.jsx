import React from "react";

const ArrowIcon = ({right = true}) => {
  return (
    <div style={{rotate: right ? "unset" : "-180deg"}}>
      <svg
        width="21"
        height="17"
        viewBox="0 0 21 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className="arrow-icon"
          d="M0.682922 8.65089H19.3171M19.3171 8.65089L11.9489 1.28279M19.3171 8.65089L11.9489 16.019"
          stroke="#FDFDFD"
        />
      </svg>
    </div>
  );
};

export default ArrowIcon;
