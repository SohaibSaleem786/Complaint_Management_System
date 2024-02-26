import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Alert from "@mui/material/Alert";
import PathHead from "../../../MainComponent/PathHead/PathHead";
import Header from "../../../MainComponent/Header/Header";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../../../../ThemeContext";
import Footer from "../../../MainComponent/Footer/Footer";
import "../Add_Technical/Add_Technical.css";
import displayAlert from "../../../MainComponent/Alert/Alert";
function Add_Technical() {
  const [values, setValues] = useState({
    techdscc: "",
    contactt: "",
    TechAdd11: "",
    TechAdd22: "",
    TechPhonee: "",
    TechMobilee: "",
    TechSmss: "",
    TechSmss: "",
    TechStss: " ",
    TechEmaill: "",
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
  const { primaryColor } = useTheme();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const uppercaseValue = value.toUpperCase();
    setValues({ ...values, [name]: uppercaseValue });
  };


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
    if (!values.techdscc.trim()) {
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

    if (!values.TechMobilee.trim()) {
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

    if (!values.TechEmaill.trim()) {
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
    const value = {
      TechStss: selectedStatus,
      Send_Emaill: selectedEmail,
      Send_Smss: selectedSms,
      // TechStss:selectedStatus3,
    };
    setValues((prevState) => ({
      ...prevState,
      loading: true,
    }));

    try {
      const formData = new FormData();
      // formData.append("itmId", values.itemid);
      formData.append("techdsc", values.techdscc);
      formData.append("contact", values.contactt);

      formData.append("TechAdd1", values.TechAdd11);
      formData.append("TechAdd2", values.TechAdd22);
      formData.append("TechPhone", values.TechPhonee);
      formData.append("TechMobile", values.TechMobilee);

      formData.append("TechEmail", values.TechEmaill);
      formData.append("TechSts", value.TechStss);
      formData.append("Send_Sms", value.Send_Smss);
      formData.append("Send_Email", value.Send_Emaill);

      console.log("techdsc", values.techdscc);
      console.log("TechAdd1", values.TechAdd11);
      console.log("TechAdd2", values.TechAdd22);
      console.log("TechPhone", values.TechPhonee);
      console.log("TechMobile", values.TechMobilee);

      console.log("TechEmail", values.TechEmaill);
      console.log("TechSts", value.TechStss);
      console.log("Send_Sms", sendSms ? "Yes" : "No");
      console.log("Send_Email", sendEmail ? "Yes" : "No");

      // formData.append('FUsrId', UserId);
      const response = await axios
        .post(`${apiLinks}/TechnicianMaintenance.php`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            // 'Content-Type': 'application/json;charset=UTF-8',
          },
        })
        .then((response) => {
          if (response.data.error === 200) {
            navigate("/Get_Technical");
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
      navigate("/Get_Technnical");
      window.location.reload();
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setValues((prevState) => ({
        ...prevState,
        loading: false,
      }));
    }
  };

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
          pageName="File > Technician Maintenance > Add Technician"
          screen="Item"
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
              overflowY: "scroll", 
              height: "calc(100vh - 200px)", 
            }}
          >
            <div
              className="col-md-12 form-container"
              style={{
                backgroundColor: "#fff",
                borderRadius: "10px",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                border: "1px solid black",
                padding: "10px",
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
                  {/* style={{ border: '1px solid #ddd', padding: '8px' }} */}

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
                                name="techdscc"
                                className="form-control"
                                value={values.techdscc}
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
                                placeholder="Contact Person"
                                name="contactt"
                                className="form-control"
                                value={values.contactt}
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
                                placeholder="Address1"
                                name="TechAdd11"
                                className="form-control"
                                value={values.TechAdd11}
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
                              placeholder="Address2"
                              name="TechAdd22"
                              className="form-control"
                              value={values.TechAdd22}
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
                          <td colSpan="1 ">
                            <Form.Group
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <Form.Control
                                type="text"
                                placeholder="Phone No."
                                name="TechPhonee"
                                className="form-control"
                                value={values.TechPhonee}
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
                                placeholder="Mobile No."
                                name="TechMobilee"
                                className="form-control"
                                value={values.TechMobilee}
                                style={{
                                  height: "24px",
                                  width: "55%",
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
                                <option value="000718">Yes</option>
                                <option value="000719">No</option>
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
                                name="TechEmaill"
                                className="form-control"
                                value={values.TechEmaill}
                                style={{
                                  height: "24px",
                                  width: "100%",
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
                                name="TechSts"
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
                        <br />
                        <tr>
                          <td></td>
                          <td>
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
                              onClick={handleFormSubmit}
                              ref={buttonRef}
                              // onKeyDown={(e) => handleEnterKeyPress(descriptionRef , e)} // Move to the next input on Enter key press
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

export default Add_Technical;
