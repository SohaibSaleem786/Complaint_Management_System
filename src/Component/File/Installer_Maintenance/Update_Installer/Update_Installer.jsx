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

function Update_Installer() {
  const navigate = useNavigate();
  const { instid } = useParams();
  const [alertData, setAlertData] = useState(null);

  const [previewImage1, setPreviewImage] = useState("");
  const [previewImage2, setPreviewImage2] = useState("");
  const [previewImage3, setPreviewImage3] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const { secondaryColor, apiLinks } = useTheme();

  const [data, setData] = useState([]);
  const { primaryColor } = useTheme();

  const [sendEmail, setSendEmail] = useState(true);
  const [sendSms, setSendSms] = useState(true);

  const handleCheckboxChange = (e) => {
    setSendEmail(e.target.checked);
    console.log("Email Checkbox Checked:", e.target.checked);
  };

  const handleCheckboxChange1 = (e) => {
    setSendSms(e.target.checked);
    console.log("SMS Checkbox Checked:", e.target.checked);
  };

  const [user, setUser] = useState({
    instid: "",
    instdsc: "",
    instcontact: "",
    instadd1: "",
    instadd2: "",
    instphone: "",
    instmobile: "",
    instsms: "",
    instemail: "",
    inst_semail: "",
    inststatus: "",
  });

  useEffect(() => {
    fetch(`${apiLinks}/GetInstaller.php?instid=${instid}`)
      .then((response) => response.json())
      .then((apiData) => {
        const user = apiData.find((item) => item.instid === instid);
        setUser(user);
        setSendEmail(user.inst_semail === "Yes");
        setSendSms(user.instsms === "Yes");
      })
      .catch((error) => console.error(error));
  }, [instid]);

  // const handleInputChange = (event) => {
  //   const { name, value } = event.target;
  //   setUser((prevUser) => ({
  //     ...prevUser,
  //     [name]: value,
  //   }));
  // };
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

  const [selectedStatus, setSelectedStatus] = useState("");

  const [alert, setAlert] = useState(null);
 

  const marginRightinput = "10px";

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

  const [missingDescription, setMissingDescription] = useState(false);
  const [missingMobile, setMissingMobile] = useState(false);
  const [missingEmail, setMissingEmail] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!user.instdsc.trim()) {
      setAlertData({
        type: "error",
        message: "Please fill in the description.",
      });
      setTimeout(() => {
        setAlertData(null);
      }, 1000);
      setMissingDescription(true); // Set the missing description state
      return; // Prevent form submission
    }

    if (!user.instmobile.trim()) {
      setAlertData({
        type: "error",
        message: "Please fill in the Mobile No.",
      });
      setMissingMobile(true); // Set the missing description state
      setTimeout(() => {
        setAlertData(null);
        setMissingMobile(false);
      }, 1000);
      return; // Prevent form submission
    }

    if (!user.instemail.trim()) {
      setAlertData({
        type: "error",
        message: "Please fill in the Email",
      });
      setMissingEmail(true);
      setTimeout(() => {
        setAlertData(null);
        setMissingEmail(false);
      }, 1000);
      // Set the missing description state
      return; // Prevent form submission
    }
    const FSinUsr = 33; // Your user ID logic here

    const requestBody = new FormData();
    requestBody.append("id", user.instid);
    requestBody.append("Instdsc", user.instdsc);
    requestBody.append("contact", user.instcontact);
    requestBody.append("InstAdd1", user.instadd1);
    requestBody.append("InstAdd2", user.instadd2);
    requestBody.append("InstPhone", user.instphone);
    requestBody.append("InstMobile", user.instmobile);
    requestBody.append("InstEmail", user.instemail);
    requestBody.append("InstSts", user.inststatus);

    requestBody.append("Send_Sms", user.instsms);
    requestBody.append("Send_Email", user.inst_semail);

    axios
      .post(`${apiLinks}/UpdateInstaller.php?instid=${instid}`, requestBody)
      .then((response) => {
        if (response.data.error === 200) {
          setAlertData({
            type: "success",
            message: `${response.data.message}`,
          });
          setTimeout(() => {
            setAlertData(null);
            navigate("/Get_Installer");
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
          pageName="File > Installer Maintenance > Update Installer"
          screen="Update_Item"
          pageLink="/Get_Installer"
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
                          <td colSpan="3">
                            <Form.Group
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <Form.Control
                                type="text"
                                id="code"
                                placeholder=" Id"
                                className="form-control"
                                name="instid"
                                value={user.instid}
                                style={{ height: "24px", width: "70px" }}
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
                                name="instdsc"
                                value={user.instdsc}
                                style={{
                                  height: "24px",
                                  borderColor: missingDescription
                                    ? "red"
                                    : null,
                                }}
                                onChange={handleInputChange}
                                onKeyDown={(e) =>
                                  handleEnterKeyPress(contactPersonRef, e)
                                } // Move to the next input on Enter key press
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
                                name="instcontact"
                                className="form-control"
                                value={user.instcontact}
                                style={{ height: "24px" }}
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
                                name="instadd1"
                                className="form-control"
                                value={user.instadd1}
                                style={{ height: "24px" }}
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
                              name="instadd2"
                              className="form-control"
                              value={user.instadd2}
                              style={{ height: "24px" }}
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
                                name="instphone"
                                className="form-control"
                                value={user.instphone}
                                style={{ height: "24px", width: "70%" }}
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
                                name="instmobile"
                                className="form-control"
                                value={user.instmobile}
                                style={{
                                  height: "24px",
                                  width: "70%",
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
                                name="instsms"
                                value={user.instsms}
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
                                alignItems: "center",
                                justifyContent: "space-between",
                              }}
                            >
                              <Form.Control
                                type="text"
                                id="code"
                                placeholder="Email"
                                name="instemail"
                                className="form-control"
                                value={user.instemail}
                                style={{
                                  height: "24px",
                                  width: "70%",
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
                                name="inst_semail"
                                value={user.inst_semail}
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
                                name="inststatus"
                                value={user.inststatus}
                                onChange={handleInputChange}
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
                          <td></td>
                          <td></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <br />
                <Button
                  className="btn btn-primary"
                  style={{
                    backgroundColor: primaryColor,
                    height: "4%",
                    fontSize: "11px",
                    color: secondaryColor,
                    width: "25%",
                    marginRight: "2%",
                  }}
                  onClick={handleSubmit}
                  ref={buttonRef}
                >
                  SUBMIT
                </Button>
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

export default Update_Installer;
