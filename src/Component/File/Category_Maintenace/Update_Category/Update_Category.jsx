import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import Header from "../../../MainComponent/Header/Header";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import PathHead from "../../../MainComponent/PathHead/PathHead";
import { useTheme } from "../../../../ThemeContext";
import Footer from "../../../MainComponent/Footer/Footer";
import displayAlert from "../../../MainComponent/Alert/Alert";

function Update_Category() {
  const navigate = useNavigate();
  const { tctgid } = useParams();
  const [alertData, setAlertData] = useState(null);
  const { secondaryColor, apiLinks } = useTheme();
  const [data, setData] = useState([]);
  const { primaryColor } = useTheme();
  const [selectedTechId, setSelectedTechId] = useState("");

  const [user, setUser] = useState({
    tctgid: "",
    tctgdsc: "",
    tctgsts: "",
  });

  useEffect(() => {
    fetch(
      `${apiLinks}/GetCategory.php?tctgid=${tctgid}`
    )
      .then((response) => response.json())
      .then((apiData) => {
        const user = apiData.find((item) => item.tctgid === tctgid);
        setUser(user);
      })
      .catch((error) => console.error(error));
  }, [tctgid]);

  const handleInputChange1 = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const uppercaseValue = value.toUpperCase();
    setUser((prevUser) => ({
      ...prevUser,
      [name]: uppercaseValue,
    }));
    // setUser({ ...values, [name]: uppercaseValue });
  };

  const [values, setValues] = useState({
    itmIdd: "",
    itemDscc: "",
    itmdscurd: "",

    loading: false,
  });

  const [missingDescription, setMissingDescription] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!user.tctgdsc.trim()) {
      setAlertData({
        type: "error",
        message: "Please fill in the description.",
      });
      setMissingDescription(true);
      setTimeout(() => {
        setAlertData(null);
        setMissingDescription(false);
      }, 2000);

      return;
    }
    const FSinUsr = 33; // Your user ID logic here

    const requestBody = new FormData();
    requestBody.append("id", user.tctgid);
    requestBody.append("categoryDsc", user.tctgdsc);
    requestBody.append("categorySts", user.tctgsts);
    requestBody.append("techid", user.techid);

    axios
      .post(`${apiLinks}/UpdateCategory.php?tctgid=${tctgid}`, requestBody)
      .then((response) => {
        if (response.data.error === 200) {
          setAlertData({
            type: "success",
            message: `${response.data.message}`,
          });
          setTimeout(() => {
            setAlertData(null);
            navigate("/Get_Category");
          }, 1000);
        } else {
          console.log(response.data.message);

          setAlertData({
            type: "error",
            message: `${response.data.message}`,
          });
          setTimeout(() => {
            setAlertData(null);
          }, 2000);
        }
      })
      .catch((error) => {
        // Handle errors
        console.error("Error:", error);
      });
  };


  const marginRightinput = "10px";

  // Create refs for each input field
  const descriptionRef = useRef(null);
  const statusRef = useRef(null);
  const type = useRef(null);
  const buttonRef = useRef(null);

  // Function to focus on the next input field
  const focusNextInput = (ref) => {
    if (ref.current) {
      ref.current.focus();
    }
  };

  // Function to handle Enter key press
  const handleEnterKeyPress = (ref, e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission on Enter key press
      focusNextInput(ref);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${apiLinks}/GetTechnician.php`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const apiData = await response.json();
        setData(apiData);

        if (apiData.length > 0) {
          setSelectedTechId(apiData[0].techid);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        

        {alertData && displayAlert(alertData.type, alertData.message)}

        <Header />

        <PathHead
          pageName="File > Category Maintenance > Update Category"
          screen="Update_Item"
          pageLink="/Get_Category"
        />

        <div
          className="col-12"
          style={{ color: "black", fontFamily: "Verdana", fontWeight: "bold" }}
        >
          <div
            className="row"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "5px",
              backgroundColor: "#f5f5f5",
              minHeight: "100vh",
            }}
          >
            <div
              className="col-md-12 form-container"
              style={{
                backgroundColor: "#fff",
                borderRadius: "10px",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                padding: "10px",
                width: "100%",
                border: "1px solid black",
                maxWidth: "400px",
                margin: "20px 0",
                fontSize: "12px",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <Form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-12">
                    <br />

                    <table style={{ border: "none", width: "100%" }}>
                      <tbody>
                        <tr>
                          <td>
                            <Form.Group
                              style={{
                                display: "flex",
                                alignItems: "flex-end",
                                justifyContent: "flex-end",
                                marginRight: marginRightinput,
                              }}
                            >
                              <Form.Label>Id:</Form.Label>
                            </Form.Group>
                          </td>
                          <td colSpan="2">
                            <Form.Group
                              controlId="description"
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <Form.Control
                                type="text"
                                id="code"
                                placeholder=" Id"
                                className="form-control"
                                name="tctgid"
                                value={user.tctgid}
                                style={{ height: "20px", width: "70px" }}
                                onChange={handleInputChange}
                                disabled
                              />
                            </Form.Group>
                          </td>
                        </tr>

                        <tr>
                          <td>
                            <Form.Group
                              style={{
                                display: "flex",
                                alignItems: "flex-end",
                                justifyContent: "flex-end",
                                marginRight: marginRightinput,
                              }}
                            >
                              <Form.Label>Description:</Form.Label>
                            </Form.Group>
                          </td>
                          <td colSpan="2">
                            <Form.Group
                              controlId="description"
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <Form.Control
                                type="text"
                                id="code"
                                placeholder="Description"
                                className="form-control"
                                name="tctgdsc"
                                value={user.tctgdsc}
                                onChange={handleInputChange}
                                style={{
                                  height: "24px",
                                  borderColor: missingDescription
                                    ? "red"
                                    : null,
                                }}
                                onKeyDown={(e) => handleEnterKeyPress(type, e)}
                                maxLength={40}
                                ref={descriptionRef}
                              />
                            </Form.Group>
                          </td>
                        </tr>

                        <tr>
                          <td
                            style={{
                              display: "flex",
                              alignItems: "flex-end",
                              justifyContent: "flex-end",
                            }}
                          >
                            <Form.Group
                              controlId="status"
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <Form.Label style={{ marginRight: "10px" }}>
                                Technician:
                              </Form.Label>
                            </Form.Group>
                          </td>
                          <td>
                            <Form.Group
                              controlId="status"
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <Form.Control
                                as="select"
                                name="techid"
                                value={user.techid}
                                onChange={(e) => {
                                  setSelectedTechId(e.target.value);
                                  setUser((prevUser) => ({
                                    ...prevUser,
                                    techid: e.target.value,
                                  }));
                                }}
                                id="techid"
                                className="form-control custom-select"
                                style={{
                                  height: "27px",
                                  fontSize: "11px",
                                  width: "150px",
                                }}
                                onKeyDown={(e) =>
                                  handleEnterKeyPress(statusRef, e)
                                }
                                ref={type}
                              >
                                {data.map((item) => (
                                  <option key={item.techid} value={item.techid}>
                                    {item.techdsc}
                                  </option>
                                ))}
                              </Form.Control>
                            </Form.Group>
                          </td>
                          <td></td>
                          <td></td>
                        </tr>

                        <tr>
                          <td>
                            <Form.Group
                              style={{
                                display: "flex",
                                alignItems: "flex-end",
                                justifyContent: "flex-end",
                                marginRight: marginRightinput,
                              }}
                            >
                              <Form.Label>Status:</Form.Label>
                            </Form.Group>
                          </td>
                          <td colSpan="2">
                            <Form.Group
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <Form.Control
                                as="select"
                                name="tctgsts"
                                value={user.tctgsts}
                                onChange={handleInputChange1}
                                className="form-control"
                                style={{
                                  height: "27px",
                                  fontSize: "11px",
                                  width: "70px",
                                }}
                                onKeyDown={(e) =>
                                  handleEnterKeyPress(buttonRef, e)
                                } // Move to the next input on Enter key press
                                ref={statusRef}
                              >
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                              </Form.Control>
                            </Form.Group>
                          </td>
                        </tr>

                        <tr>
                          <td></td>
                          <td>
                            <br />
                            <Button
                              className="btn btn-primary"
                              style={{
                                backgroundColor: primaryColor,
                                height: "4%",
                                fontSize: "11px",
                                color: secondaryColor,
                                width: "50%",
                                marginRight: "2%",
                              }}
                              onClick={handleSubmit}
                              ref={buttonRef}
                            >
                              SUBMIT
                            </Button>
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    
                  </div>
                </div>

               
              </Form>
            </div>
          </div>
          <br />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Update_Category;
