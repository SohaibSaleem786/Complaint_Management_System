import React from "react";
import { useTheme } from "../../../ThemeContext";
import { Link, useNavigate } from "react-router-dom";

function PathHead({ pageName }) {
  const { primaryColor, secondaryColor, pathHeight } = useTheme();
  const navigate = useNavigate();

  return (
    <div
      className="row"
      style={{
        background: primaryColor,
        color: secondaryColor,
        fontWeight: "bold",
        height: pathHeight,
        borderBottom: "1px solid red",
        borderTop: "1px solid red",
        display: "flex",
        alignItems: "center", // Center vertically
        justifyContent: "left", // Align to the left
      }}
    >
      <p style={{
        marginLeft: '2%',
      }}>{pageName}</p>
      
      {/* Media query for small screens */}
      <style>
        {`
          @media (max-width: 768px) {
            p {
              font-size: 11px; 
            }
           
          }
        `}
      </style>
    </div>
  );
}

export default PathHead;
