import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Alert from "@mui/material/Alert";
import PathHead from "../../../MainComponent/PathHead/PathHead";
import Header from "../../../MainComponent/Header/Header";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../../../../ThemeContext";
import Footer from "../../../MainComponent/Footer/Footer";
import "../Add_Mobile/Add_Mobile.css";
import displayAlert from "../../../MainComponent/Alert/Alert";
function Add_Mobile() {
  const [values, setValues] = useState({
    numberr: "",
    descriptionn: "",
    address11: "",
    address22: "",
    stss: "",

    loading: false,
  });
  const navigate = useNavigate();

  const [selectedStatus, setSelectedStatus] = useState("Yes");
  const [alertData, setAlertData] = useState(null);
  const [alert, setAlert] = useState(null);
  const [selectedImage1, setSelectedImage1] = useState(null);
  const { primaryColor, secondaryColor, apiLinks } = useTheme();
  const [data, setData] = useState([]);
  const [selectedArea, setSelectedAreaId] = useState("");

 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const uppercaseValue = value.toUpperCase();
    setValues({ ...values, [name]: uppercaseValue });
  };



  const [missingDescription, setMissingDescription] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted!"); // Add this line for debugging
    if (!values.numberr || !values.numberr.trim()) {
      setAlertData({
        type: "error",
        message: "Please fill in the Mobile Number.",
      });
      setMissingDescription(true);
      setTimeout(() => {
        setAlertData(null);
        setMissingDescription(false);
      }, 2000);

      return;
    }
    const value = {
      stss: selectedStatus,
      areaa: selectedArea,
    };

    setValues((prevState) => ({
      ...prevState,
      loading: true,
    }));

    try {
      const formData = new FormData();
      formData.append("number", values.numberr);
      formData.append("name", values.descriptionn);
      formData.append("areaid", value.areaa);
      formData.append("address1", values.address11);
      formData.append("address2", values.address22);
      formData.append("sts", value.stss);

      axios
        .post(
          `${apiLinks}/MobileMaintenance.php`,

          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        )

        .then((response) => {
          if (response.data.error === 200) {
            setAlertData({
              type: "success",
              message: `${response.data.message}`,
            });
            setTimeout(() => {
              setAlertData(null);
              navigate("/Get_Mobile");
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

      // Reset form values after submission
      setValues({
        FCtgDscc: "",
        FCtgStss: "",
        loading: false,
      });

      setAlert("Image uploaded successfully.");
    } catch (error) {
      setAlert("Error uploading image.");
      console.error(error);
    } finally {
      setValues((prevState) => ({
        ...prevState,
        loading: false,
      }));
      setMissingDescription(false); // Clear the missing description state
    }
  };

  const marginRightinput = "10px";

  // Create refs for each input field
  const descriptionRef = useRef(null);
  const description1Ref = useRef(null);
  const address1Ref = useRef(null);
  const address2Ref = useRef(null);
  const areaRef = useRef(null);
  const statusRef = useRef(null);
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
        const response = await fetch(`${apiLinks}/GetArea.php`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const apiData = await response.json();
        setData(apiData);

        if (apiData.length > 0) {
          setSelectedAreaId(apiData[0].areaid);
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
          pageName="File > Mobile Maintenance > Add Mobile"
          screen="Get_Item"
          pageLink="/Get_Mobile"
        />

        <div
          className="col-12"
          style={{ color: "black", fontWeight: "bold", fontFamily: "Verdana" }}
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
                border: "1px solid black",
                width: "100%",
                maxWidth: "400px",
                margin: "20px 0",
                fontSize: "12px",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <Form onSubmit={handleFormSubmit}>
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
                              <Form.Label>Number:</Form.Label>
                            </Form.Group>
                          </td>
                          <td colSpan="2">
                            <Form.Group
                              controlId="description"
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <Form.Control
                                type="text"
                                placeholder="Number"
                                name="numberr"
                                value={values.numberr}
                                onChange={handleInputChange}
                                style={{
                                  height: "24px",
                                  borderColor: missingDescription
                                    ? "red"
                                    : null,
                                }}
                                onKeyDown={(e) =>
                                  handleEnterKeyPress(description1Ref, e)
                                }
                                ref={descriptionRef}
                                maxLength={40}
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
                              <Form.Label>Name:</Form.Label>
                            </Form.Group>
                          </td>
                          <td colSpan="2">
                            <Form.Group
                              controlId="description"
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <Form.Control
                                type="text"
                                placeholder="Description"
                                name="descriptionn"
                                value={values.descriptionn}
                                onChange={handleInputChange}
                                style={{
                                  height: "24px",
                                  borderColor: missingDescription
                                    ? "red"
                                    : null,
                                }}
                                onKeyDown={(e) =>
                                  handleEnterKeyPress(address1Ref, e)
                                }
                                ref={description1Ref}
                                maxLength={40}
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
                              <Form.Label>Address1:</Form.Label>
                            </Form.Group>
                          </td>
                          <td colSpan="2">
                            <Form.Group
                              controlId="description"
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <Form.Control
                                type="text"
                                placeholder="Address1"
                                name="address11"
                                value={values.address11}
                                onChange={handleInputChange}
                                style={{ height: "24px" }}
                                onKeyDown={(e) =>
                                  handleEnterKeyPress(address2Ref, e)
                                }
                                ref={address1Ref}
                                maxLength={40}
                              />
                            </Form.Group>
                          </td>
                        </tr>

                        <tr>
                          <td></td>
                          <td colSpan="2">
                            <Form.Group
                              controlId="description"
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <Form.Control
                                type="text"
                                placeholder="Address2"
                                name="address22"
                                value={values.address22}
                                onChange={handleInputChange}
                                style={{ height: "24px" }}
                                onKeyDown={(e) =>
                                  handleEnterKeyPress(areaRef, e)
                                }
                                ref={address2Ref}
                                maxLength={40}
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
                              marginRight: "10px",
                            }}
                          >
                            <Form.Group
                              controlId="status"
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <Form.Label>Area:</Form.Label>
                            </Form.Group>
                          </td>
                          <td>
                            <Form.Group
                              controlId="status"
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <Form.Control
                                as="select"
                                name="typee"
                                onChange={(e) => {
                                  setSelectedAreaId(e.target.value);
                                }}
                                id="typee"
                                className="form-control custom-select"
                                style={{
                                  height: "27px",
                                  fontSize: "11px",
                                  width: "150px",
                                }}
                                onKeyDown={(e) =>
                                  handleEnterKeyPress(statusRef, e)
                                }
                                ref={areaRef}
                              >
                                {data.map((item) => (
                                  <option key={item.areaid} value={item.areaid}>
                                    {item.taredsc}
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
                                name="stss"
                                value={selectedStatus}
                                onChange={(e) =>
                                  setSelectedStatus(e.target.value)
                                }
                                style={{
                                  height: "30px",
                                  width: "70px",
                                  fontSize: "11px",
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
                              type="submit" // Add this line to make the button trigger form submission
                              className="btn btn-primary"
                              style={{
                                backgroundColor: primaryColor,
                                height: "4%",
                                fontSize: "11px",
                                color: secondaryColor,
                                width: "50%",
                                marginRight: "2%",
                              }}
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
                <br />
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

export default Add_Mobile;
