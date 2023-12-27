import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Alert from "@mui/material/Alert";
import PathHead from "../../../MainComponent/PathHead/PathHead";
import Header from "../../../MainComponent/Header/Header";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../../../../ThemeContext";
import Footer from "../../../MainComponent/Footer/Footer";
import "../Add_Installer/Add_Installer.css";
import displayAlert from "../../../MainComponent/Alert/Alert";

function Add_Installer() {
  const [values, setValues] = useState({
    Instdscc: "",
    contactt: "",
    InstAdd11: "",
    InstAdd22: "",
    InstPhonee: "",
    InstMobilee: "",
    InstSmss: "",
    InstSmss: "",
    InstStss: " ",
    InstEmaill: "",
    Send_Emaill: "",
    Send_Smss: "",
    titmspll: "",
    pic: "",
    loading: false,
  });

  const navigate = useNavigate();
  const [selectedStatus, setSelectedStatus] = useState("Yes");
  const [selectedEmail, setSelectedChechemail] = useState("Yes");
  const [selectedSms, setSelectedChechsms] = useState("Yes");

  const [selectedStatus1, setSelectedStatus1] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("Startup");
  const [selectedUnitId, setSelectedUnitId] = useState("Startup");

  const [alertData, setAlertData] = useState(null);
  const { secondaryColor, apiLinks } = useTheme();

  const [selectedType, setSelectedType] = useState("Item Purchase");
  const [selectedUnit, setSelectedUnit] = useState("Quantity");

  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);

  const [alert, setAlert] = useState(null);
 

  const { primaryColor } = useTheme();

  // const handleInputChange = (e) => {
  //   setValues({ ...values, [e.target.name]: e.target.value });
  // };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const uppercaseValue = value.toUpperCase();
    setValues({ ...values, [name]: uppercaseValue });
  };

  const [nextItemId, setNextItemId] = useState(""); // Initialize the next TItmId

  {
    /* ////////////////////////  CALL API TO POST DATA ////////////////////////// */
  }
  const [sendEmail, setSendEmail] = useState(false);
  const [sendSms, setSendSms] = useState(false);


  const [missingDescription, setMissingDescription] = useState(false);
  const [missingMobile, setMissingMobile] = useState(false);
  const [missingEmail, setMissingEmail] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!values.Instdscc.trim()) {
      setAlertData({
        type: "error",
        message: "Please fill in the description.",
      });
      setMissingDescription(true); // Set the missing description state
      setTimeout(() => {
        setAlertData(null);
        setMissingDescription(false);
      }, 2000);
      return; // Prevent form submission
    }

    if (!values.InstMobilee.trim()) {
      setAlertData({
        type: "error",
        message: "Please fill in the Mobile No.",
      });
      setMissingMobile(true); // Set the missing description state

      setTimeout(() => {
        setAlertData(null);
        setMissingMobile(false); // Set the missing description state
      }, 2000);
      return; // Prevent form submission
    }

    if (!values.InstEmaill.trim()) {
      setAlertData({
        type: "error",
        message: "Please fill in the Email",
      });
      setMissingEmail(true); // Set the missing description state

      setTimeout(() => {
        setAlertData(null);
        setMissingEmail(false); // Set the missing description state
      }, 2000);
      return; // Prevent form submission
    }

    const value = {
      InstStss: selectedStatus,
      Send_Emaill: selectedEmail,

      Send_Smss: selectedSms,
    };
    setValues((prevState) => ({
      ...prevState,
      loading: true,
    }));

    try {
      const formData = new FormData();
      // formData.append("itmId", values.itemid);
      formData.append("Instdsc", values.Instdscc);
      formData.append("contact", values.contactt);

      formData.append("InstAdd1", values.InstAdd11);
      formData.append("InstAdd2", values.InstAdd22);
      formData.append("InstPhone", values.InstPhonee);
      formData.append("InstMobile", values.InstMobilee);

      formData.append("InstEmail", values.InstEmaill);
      formData.append("InstSts", value.InstStss);
      formData.append("Send_Sms", value.Send_Smss);
      formData.append("Send_Email", value.Send_Emaill);

      console.log("Instdsc", values.Instdscc);
      console.log("contact", values.contactt);

      console.log("InstAdd1", values.InstAdd11);
      console.log("InstAdd2", values.InstAdd22);
      console.log("InstPhone", values.InstPhonee);
      console.log("InstMobile", values.InstMobilee);

      console.log("InstEmail", values.InstEmaill);
      console.log("InstSts", value.InstStss);
      console.log("Send_Sms", sendSms ? "Yes" : "No");
      console.log("Send_Email", sendEmail ? "Yes" : "No");

      // formData.append('FUsrId', UserId);
      const response = await axios
        .post(`${apiLinks}/InstallerMaintenance.php`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            // 'Content-Type': 'application/json;charset=UTF-8',
          },
        })
        .then((response) => {
          if (response.data.error === 200) {
            navigate("/Get_Installer");
            console.log("response data show", response);

            setAlertData({
              type: "success",
              message: `${response.data.message}`,
            });
            setTimeout(() => {
              setAlertData(null);
            }, 1000);
          } else {
            console.log(response.data.message);
            console.log("response data show", response);

            setAlertData({
              type: "error",
              message: `${response.data.message}`,
            });
            setTimeout(() => {
              setAlertData(null);
            }, 2000);
          }
          // navigate("/Get_Technical");
        })
        .catch((error) => {
          // Handle errors
          console.error("Error:", error);
        });

      console.log(response.data);
      // Reset form values after submission
      setValues({
        itemid: "",
        itmindex: "",
        itmremarks: "",
        itemDscc: "",
        itemDscUrdd: "",
        itmremarkss: "",
        itemStss: "Yes", // Set the initial value for itemStss
        purRatee: "",
        discontt: "", // Set the initial value for discontt
        saleRatee: "",
        categoryIdd: data.length > 0 ? data[0].tctgid : "", // Set the initial value for categoryIdd
        typee: "Item Purchase",
        uomm: data1.length > 0 ? data1[0].uomid : "", // Set the initial value for typee
        pic: "",
        loading: true,
      });
      setSelectedStatus("Yes"); // Set the initial value for selectedStatus
      setSelectedStatus1(""); // Set the initial value for selectedStatus1
      setSelectedCategoryId(data.length > 0 ? data[0].tctgid : "Startup");
      setSelectedUnitId(data1.length > 0 ? data1[0].uomid : "KG"); // Set the initial value for selectedCategoryId
      // Set the initial value for selectedCategoryId
      setSelectedType("Item Purchase"); // Set the initial value for selectedType
      setSelectedUnit("Quantity");

      setAlert("Image uploaded successfully.");
      navigate("/Get_Technnical");
      window.location.reload();
    } catch (error) {
      console.error("Error uploading image:", error);
      setAlert("Error uploading image.");
    } finally {
      setValues((prevState) => ({
        ...prevState,
        loading: false,
      }));
    }
  };

  /////////////////////////////////////////////////////

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
          pageName="File > Installer Maintenance > Add Installer"
          screen="Item"
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
              overflowY: "scroll", // Enable vertical scrolling
              height: "calc(100vh - 200px)", // Set an appropriate height
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
              <Form onSubmit={handleFormSubmit} style={{ marginRight: "30px" }}>
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
                              <Form.Label>Description:</Form.Label>
                            </Form.Group>
                          </td>
                          <td colSpan="3">
                            <Form.Group
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <Form.Control
                                type="text"
                                placeholder="Description"
                                name="Instdscc"
                                className="form-control"
                                value={values.Instdscc}
                                maxLength={40}
                                style={{
                                  height: "24px",
                                  borderColor: missingDescription ? "red" : "",
                                  transition: "border-color 2s ease",
                                }}
                                onKeyDown={(e) =>
                                  handleEnterKeyPress(contactPersonRef, e)
                                } // Move to the next input on Enter key press
                                ref={descriptionRef}
                                onChange={handleInputChange}
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
                                placeholder="Contact Person"
                                name="contactt"
                                className="form-control"
                                maxLength={40}
                                value={values.contactt}
                                style={{ height: "24px" }}
                                onChange={handleInputChange}
                                onKeyDown={(e) =>
                                  handleEnterKeyPress(address1Ref, e)
                                } // Move to the next input on Enter key press
                                ref={contactPersonRef}
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
                                placeholder="Address1"
                                name="InstAdd11"
                                className="form-control"
                                value={values.InstAdd11}
                                maxLength={40}
                                style={{ height: "24px" }}
                                onChange={handleInputChange}
                                onKeyDown={(e) =>
                                  handleEnterKeyPress(address2Ref, e)
                                } // Move to the next input on Enter key press
                                ref={address1Ref}
                              />
                            </Form.Group>
                          </td>
                        </tr>

                        <tr>
                          <td></td>
                          <td colSpan="3">
                            <Form.Control
                              type="text"
                              placeholder="Address2"
                              name="InstAdd22"
                              className="form-control"
                              value={values.InstAdd22}
                              maxLength={40}
                              style={{ height: "24px" }}
                              onChange={handleInputChange}
                              onKeyDown={(e) =>
                                handleEnterKeyPress(phoneNoRef, e)
                              } // Move to the next input on Enter key press
                              ref={address2Ref}
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
                                placeholder="Phone No."
                                name="InstPhonee"
                                className="form-control"
                                value={values.InstPhonee}
                                maxLength={16}
                                style={{ height: "24px", width: "70%" }}
                                onChange={handleInputChange}
                                onKeyDown={(e) =>
                                  handleEnterKeyPress(mobileNoRef, e)
                                } // Move to the next input on Enter key press
                                ref={phoneNoRef}
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
                                placeholder="Mobile No."
                                name="InstMobilee"
                                className="form-control"
                                value={values.InstMobilee}
                                style={{
                                  height: "24px",
                                  width: "55%",
                                  borderColor: missingMobile ? "red" : "",
                                  transition: "border-color 1s",
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
                                name="Send_Sms"
                                value={selectedSms}
                                onChange={(e) =>
                                  setSelectedChechsms(e.target.value)
                                }
                                className="form-control custom-select"
                                style={{
                                  height: "27px",
                                  fontSize: "11px",
                                  width: "50px",
                                }}
                                onKeyDown={(e) =>
                                  handleEnterKeyPress(emailRef, e)
                                } // Move to the next input on Enter key press
                                ref={mobileCheckRef}
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
                                placeholder="Email"
                                name="InstEmaill"
                                className="form-control"
                                value={values.InstEmaill}
                                style={{
                                  height: "24px",
                                  width: "100%",
                                  borderColor: missingEmail ? "red" : "",
                                  transition: "border-color 1s",
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
                                name="Send_Email"
                                value={selectedEmail}
                                onChange={(e) =>
                                  setSelectedChechemail(e.target.value)
                                }
                                className="form-control custom-select"
                                style={{
                                  height: "27px",
                                  fontSize: "11px",
                                  width: "50px",
                                }}
                                onKeyDown={(e) =>
                                  handleEnterKeyPress(statusRef, e)
                                } // Move to the next input on Enter key press
                                ref={emailSmsRef}
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
                                name="InstSts"
                                value={selectedStatus}
                                onChange={(e) =>
                                  setSelectedStatus(e.target.value)
                                }
                                className="form-control custom-select"
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
                                <option value="000718">Yes</option>
                                <option value="000719">No</option>
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
                                width: "60%",
                                marginRight: "2%",
                              }}
                              onClick={handleFormSubmit}
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

export default Add_Installer;
