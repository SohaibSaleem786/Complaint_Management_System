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

function Update_Technical() {
  const navigate = useNavigate();
  const { techid } = useParams();
  const [alertData, setAlertData] = useState(null);
  const { secondaryColor, apiLinks } = useTheme();
  const [data, setData] = useState([]);
  const { primaryColor } = useTheme();
  const [sendEmail, setSendEmail] = useState(true);
  const [sendSms, setSendSms] = useState(true);

  const [user, setUser] = useState({
    techid: "",
    techdsc: "",
    techcontact: "",
    techadd1: "",
    techadd2: "",
    techphone: "",
    techmobile: "",
    techsms: "",
    techemail: "",
    tech_semail: "",
    techstatus: "",
  });

  useEffect(() => {
    fetch(`${apiLinks}/GetTechnician.php?techid=${techid}`)
      .then((response) => response.json())
      .then((apiData) => {
        const user = apiData.find((item) => item.techid === techid);
        setUser(user);
        setSendEmail(user.tech_semail === "Yes");
        setSendSms(user.techsms === "Yes");
      })
      .catch((error) => console.error(error));
  }, [techid]);

  // const handleInputChange = (event) => {
  //   const { name, value } = event.target;
  // setUser((prevUser) => ({
  //   ...prevUser,
  //   [name]: value,
  // }));
  // };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const capitalizedValue =
      value.toLowerCase() === value ? value.toUpperCase() : value;

    setUser((prevUser) => ({
      ...prevUser,
      [name]: capitalizedValue,
    }));
  };

  const [values, setValues] = useState({
    itmIdd: "",
    itemDscc: "",
    itmdscurd: "",
    itmindex: "",
    itmremarks: "",
    itmdscurd: "",
    itemStss: "",
    purRatee: "",
    saleRatee: "",
    categoryIdd: "",
    discountt: "",
    typee: "",
    pic: "",
    TItmPic1: "",
    TItmPic3: "",
    TItmPic3: "",
    loading: false,
  });

  const [missingDescription, setMissingDescription] = useState(false);
  const [missingMobile, setMissingMobile] = useState(false);
  const [missingEmail, setMissingEmail] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();

    if (!user.techdsc.trim()) {
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

    if (!user.techmobile.trim()) {
      setAlertData({
        type: "error",
        message: "Please fill in the Mobile.",
      });
      setMissingMobile(true);
      setTimeout(() => {
        setAlertData(null);
        setMissingMobile(false);
      }, 2000);

      return;
    }

    if (!user.techemail.trim()) {
      setAlertData({
        type: "error",
        message: "Please fill in the Email.",
      });
      setMissingEmail(true);
      setTimeout(() => {
        setAlertData(null);
        setMissingEmail(false);
      }, 2000);

      return;
    }

    const FSinUsr = 33; // Your user ID logic here

    const requestBody = new FormData();
    requestBody.append("id", user.techid);
    requestBody.append("techdsc", user.techdsc);
    requestBody.append("contact", user.techcontact);
    requestBody.append("TechAdd1", user.techadd1);
    requestBody.append("TechAdd2", user.techadd2);
    requestBody.append("TechPhone", user.techphone);
    requestBody.append("TechMobile", user.techmobile);
    requestBody.append("TechEmail", user.techemail);
    requestBody.append("TechSts", user.techstatus);
    requestBody.append("Send_Sms", user.techsms);
    requestBody.append("Send_Email", user.tech_semail);

    axios
      .post(`${apiLinks}/UpdateTechnician.php?techid=${techid}`, requestBody)
      .then((response) => {
        if (response.data.error === 200) {
          setAlertData({
            type: "success",
            message: `${response.data.message}`,
          });
          setTimeout(() => {
            setAlertData(null);
            navigate("/Get_Technical");
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
    const fontSize = '12px';
  // Create refs for each input field
  const descriptionRef = useRef(null);
  const contactPersonRef = useRef(null);
  const address1Ref = useRef(null);
  const address2Ref = useRef(null);
  const phoneNoRef = useRef(null);
  const mobileNoRef = useRef(null);
  const mobileCheckRef = useRef(null);
  const emailRef = useRef(null);
  const emailSmsRef = useRef(null);
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
          pageName="File > Technician Maintenance > Update Technician"
          screen="Update_Item"
          pageLink="/Get_Technical"
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
                border: "1px solid black",
                width: "100%",
                maxWidth: "500px",
                margin: "20px 0",
                fontSize: "12px",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <Form onSubmit={handleSubmit} style={{ marginRight: "30px" }}>
                <div className="row">
                  <div className="col-12">
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
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <Form.Control
                                type="text"
                                id="code"
                                placeholder=" Id"
                                className="form-control"
                                name="techid"
                                value={user.techid}
                                style={{ fontSize:fontSize, height: "24px", width: "70px" }}
                                onChange={handleInputChange}
                                disabled
                                maxLength={4}
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
                          <td colSpan="3">
                            <Form.Group
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <Form.Control
                                type="text"
                                id="code"
                                placeholder="Description"
                                className="form-control"
                                name="techdsc"
                                value={user.techdsc}
                                style={{
                                  height: "24px",
                                  fontSize:fontSize,
                                  borderColor: missingDescription
                                    ? "red"
                                    : null,
                                }}
                                onChange={handleInputChange}
                                maxLength={40}
                                onKeyDown={(e) =>
                                  handleEnterKeyPress(contactPersonRef, e)
                                } // Move to the next input on Enter key press
                                ref={descriptionRef}
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
                              <Form.Label>Contact Person:</Form.Label>
                            </Form.Group>
                          </td>
                          <td colSpan="3">
                            <Form.Group
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <Form.Control
                                type="text"
                                id="code"
                                placeholder="Contact"
                                name="techcontact"
                                className="form-control"
                                value={user.techcontact}
                                style={{ height: "24px" ,fontSize:fontSize,}}
                                onChange={handleInputChange}
                                onKeyDown={(e) =>
                                  handleEnterKeyPress(address1Ref, e)
                                } // Move to the next input on Enter key press
                                ref={contactPersonRef}
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
                              <Form.Label>Address:</Form.Label>
                            </Form.Group>
                          </td>
                          <td colSpan="3">
                            <Form.Group
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <Form.Control
                                type="text"
                                id="code"
                                placeholder="Address1"
                                name="techadd1"
                                className="form-control"
                                value={user.techadd1}
                                style={{ height: "24px" ,fontSize:fontSize}}
                                onChange={handleInputChange}
                                onKeyDown={(e) =>
                                  handleEnterKeyPress(address2Ref, e)
                                } // Move to the next input on Enter key press
                                ref={address1Ref}
                                maxLength={40}
                              />
                            </Form.Group>
                          </td>
                        </tr>

                        <tr>
                          <td></td>
                          <td colSpan="3">
                            <Form.Control
                              type="text"
                              id="code"
                              placeholder="Address2"
                              name="techadd2"
                              className="form-control"
                              value={user.techadd2}
                              style={{fontSize:fontSize, height: "24px" }}
                              onChange={handleInputChange}
                              onKeyDown={(e) =>
                                handleEnterKeyPress(phoneNoRef, e)
                              } // Move to the next input on Enter key press
                              ref={address2Ref}
                              maxLength={40}
                            />
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
                              <Form.Label>Phone No:</Form.Label>
                            </Form.Group>
                          </td>
                          <td colSpan="1">
                            <Form.Group
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <Form.Control
                                type="text"
                                id="code"
                                placeholder="Phone"
                                name="techphone"
                                className="form-control"
                                value={user.techphone}
                                style={{fontSize:fontSize, height: "24px", width: "70%" }}
                                onChange={handleInputChange}
                                onKeyDown={(e) =>
                                  handleEnterKeyPress(mobileNoRef, e)
                                } // Move to the next input on Enter key press
                                ref={phoneNoRef}
                                maxLength={16}
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
                              <Form.Label>Mobile No:</Form.Label>
                            </Form.Group>
                          </td>
                          <td colSpan="1">
                            <Form.Group
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                              }}
                            >
                              <Form.Control
                                type="text"
                                id="code"
                                placeholder="Mobile"
                                name="techmobile"
                                className="form-control"
                                value={user.techmobile}
                                style={{
                                  height: "24px",
                                  width: "55%",fontSize:fontSize,
                                  borderColor: missingMobile ? "red" : null,
                                }}
                                onChange={handleInputChange}
                                onKeyDown={(e) =>
                                  handleEnterKeyPress(mobileCheckRef, e)
                                } // Move to the next input on Enter key press
                                ref={mobileNoRef}
                                maxLength={11}
                              />
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <Form.Check.Label htmlFor="smsCheckbox"></Form.Check.Label>
                              </div>
                            </Form.Group>
                          </td>
                          <td>SMS </td>
                          <td>
                            <Form.Group
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <Form.Control
                                as="select"
                                name="techsms"
                                value={user.techsms}
                                onChange={handleInputChange}
                                className="form-control"
                                onKeyDown={(e) =>
                                  handleEnterKeyPress(emailRef, e)
                                } // Move to the next input on Enter key press
                                ref={mobileCheckRef}
                                style={{
                                  height: "27px",
                                  fontSize: "11px",
                                  width: "45px",
                                }}
                              >
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                              </Form.Control>
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
                              <Form.Label>Email:</Form.Label>
                            </Form.Group>
                          </td>
                          <td colSpan="1">
                            <Form.Group
                              style={{
                                display: "flex",
                                alignItems: "center",fontSize:fontSize,
                                justifyContent: "space-between",
                              }}
                            >
                              <Form.Control
                                type="text"
                                id="code"
                                placeholder="Email"
                                name="techemail"
                                className="form-control"
                                value={user.techemail}
                                style={{
                                  height: "24px",
                                  width: "100%",fontSize:fontSize,
                                  borderColor: missingEmail ? "red" : null,
                                }}
                                onChange={handleInputChange}
                                onKeyDown={(e) =>
                                  handleEnterKeyPress(emailSmsRef, e)
                                } // Move to the next input on Enter key press
                                ref={emailRef}
                                maxLength={40}
                              />
                            </Form.Group>
                          </td>
                          <td> </td>
                          <td>
                            <Form.Group
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <Form.Control
                                as="select"
                                name="tech_semail"
                                value={user.tech_semail}
                                onChange={handleInputChange}
                                className="form-control"
                                onKeyDown={(e) =>
                                  handleEnterKeyPress(statusRef, e)
                                } // Move to the next input on Enter key press
                                ref={emailSmsRef}
                                style={{
                                  height: "27px",
                                  fontSize: "11px",
                                  width: "45px",
                                }}
                              >
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                              </Form.Control>
                            </Form.Group>
                          </td>
                        </tr>

                        <tr>
                          <td>
                            <Form.Group
                              controlId="status"
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
                          <td>
                            <Form.Group
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <Form.Control
                                as="select"
                                name="techstatus"
                                value={user.techstatus}
                                onChange={handleInputChange}
                                className="form-control"
                                onKeyDown={(e) =>
                                  handleEnterKeyPress(buttonRef, e)
                                } // Move to the next input on Enter key press
                                ref={statusRef}
                                style={{
                                  height: "27px",
                                  fontSize: "11px",
                                  width: "70px",
                                }}
                              >
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                              </Form.Control>
                            </Form.Group>
                          </td>
                          <td></td>
                          <td></td>
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
                              // onKeyDown={(e) => handleEnterKeyPress(descriptionRef  , e)} // Move to the next input on Enter key press
                              ref={buttonRef}
                            >
                              SUBMIT
                            </Button>
                          </td>
                          <td></td>
                          <td></td>
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

export default Update_Technical;
