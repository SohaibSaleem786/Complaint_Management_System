import React from "react";
import { Alert } from "react-bootstrap";

const displayAlert = (type, message) => {
  let alertColor = "success"; // default color for success messages

  if (type === "error") {
    alertColor = "danger"; // change color to red for error messages
  }

  return (
    <Alert
      variant={alertColor}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "23%",
        height: "8vh",
        marginLeft: "37%",
        zIndex: 1000,
        textAlign: "center",
      }}
    >
      {message}
    </Alert>
  );
};

export default displayAlert;
