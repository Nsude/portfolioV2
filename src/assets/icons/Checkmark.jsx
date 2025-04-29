import React from "react";

const Checkmark = ({color}) => {
  return (
    <svg
      width="32"
      height="19"
      viewBox="0 0 32 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.17566 9.15309L9.01668 16.9942L24.5761 1.43469M7.31805 8.93868L15.1591 16.7797L30.7185 1.22028"
        stroke={color || "#5DEA7C"}
        strokeWidth="1.5"
      />
    </svg>
  );
};

export default Checkmark;
