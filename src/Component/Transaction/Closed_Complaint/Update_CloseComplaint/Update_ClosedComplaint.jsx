import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Alert from "@mui/material/Alert";
import PathHead from "../../../MainComponent/PathHead/PathHead";
import Header from "../../../MainComponent/Header/Header";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import Footer from "../../../MainComponent/Footer/Footer";
import Select from "react-select";
import { useTheme } from "../../../../ThemeContext";
import displayAlert from "../../../MainComponent/Alert/Alert";
// import { multiValueCSS } from 'react-select/dist/declarations/src/components/MultiValue';
function Update_ClosedComplaint() {
  const navigate = useNavigate();
  const { c_id } = useParams();
  const [alertData, setAlertData] = useState(null);

  /////////////////////////////// date and time from network
  const [currentDate1, setCurrentDate] = useState("");

  useEffect(() => {
    // Fetch the current date in "YYYY-MM-DD" format
    const currentDateFormatted = new Date().toISOString().split("T")[0];
    setCurrentDate(currentDateFormatted);
  }, []); // Run this effect only once on component mount
  const [values, setValues] = useState({
    fllow11: "",
    fllow22: "",
    fllow33: "",
    fllow44: "",
    fllow1_date: "",
    fllow2_date: "",
    fllow3_date: "",
    clsremarks:'',
    fllow4_date: currentDate1,
    loading: false,
  });

  const handleInputChange1 = (e) => {
    const { name, value } = e.target;
    const uppercaseValue = value.toUpperCase();
    setValues({ ...values, [name]: uppercaseValue });
  };

  const { secondaryColor, apiLinks } = useTheme();

  const imageurl = `https://www.crystalsolutions.com.pk/csart/itemimage/`;
  const [data, setData] = useState([]);
  const { primaryColor } = useTheme();

  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()}-${
    currentDate.getMonth() + 1
  }-${currentDate.getFullYear()}`;
  const formattedTime = `${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;
  const value = {
    date: formattedDate,
    time: formattedTime,
  };

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
    c_id: "",
    c_mobile: "",
    c_type: "",
    c_cust: "",
    c_add1: "",
    c_add2: "",
    c_contant: "",
    c_refid: "",
    c_prodid: "",
    c_invno: "",
    c_warrty: "",
    c_comid: "",
    c_remarks: "",
    c_purdate: "",
    c_date: "",
    c_time: "",
    c_email: "",
    c_serial: "",
    c_sts: "",
    aasign_techid: "",
    techdsc: "",
    c_fllow1_date: "",
    c_fllow2_date: "",
    c_fllow3_date: "",
    c_fllow4_date: "",
    c_fllow1: "",
    c_fllow2: "",
    c_fllow3: "",
    c_fllow4: "",
    c_sts_date:'',
    c_sts:'',
  });

  useEffect(() => {
    fetch(`${apiLinks}/GetComplaint.php?c_id=${c_id}`)
      .then((response) => response.json())
      .then((apiData) => {
        const user = apiData.find((item) => item.c_id === c_id);
        setUser(user);
        setSendEmail(user.tech_semail === "Yes");
        setSendSms(user.techsms === "Yes");
      })
      .catch((error) => console.error(error));
  }, [c_id]);

  // const handleInputChange = (event) => {
  //   const { name, value } = event.target;
  // setUser((prevUser) => ({
  //   ...prevUser,
  //   [name]: value,
  // }));
  // };

  // const handleInputChange = (event) => {
  //   const { name, value } = event.target;
  //   const capitalizedValue = value.toLowerCase() === value ? value.toUpperCase() : value;

  //   setUser((prevUser) => ({
  //     ...prevUser,
  //     [name]: capitalizedValue,
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

  const [selectedStatus, setSelectedStatus] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://www.crystalsolutions.com.pk/csart/get_category.php`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const apiData = await response.json();
        setData(apiData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();

    return () => {};
  }, []);

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

  const [selectedStatusId, setSelectedStatusId] = useState("");

  ///////////////////////////// tpye//////////////////////////

  const [selectedTypeId, setSelectedTypeId] = useState("");
  const [typedata, setTypeData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiLinks}/GetType.php`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const apiData = await response.json();
        setTypeData(apiData);

        // if (apiData.length > 0) {
        //   setSelectedTypeId(apiData[0].typid);
        // }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  ///////////////////////////// Technician //////////////////////////

  const [selectedTechId, setSelectedTechId] = useState("");
  const [techdata, setTechData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiLinks}/GetTechnician.php`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const apiData = await response.json();
        setTechData(apiData);

        if (apiData.length > 0 && selectedTechId === "") {
          // Set selectedTechId only if it is not already set
          setSelectedTechId(apiData[0].techid);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [selectedTechId]); // Include selectedTechId in the dependency array if needed

  const handleFormSubmit = (event) => {
    event.preventDefault();

    console.log("Form submitted!"); // Add this line for debugging

    setValues((prevState) => ({
      ...prevState,
      loading: true,
    }));

    const value = {
      techh: selectedTechId,
      statuss: selectedStatusId,
    };

    const requestBody = new FormData();
    requestBody.append("id", user.c_id);
    // requestBody.append("fllow1", user.c_fllow1 || values.fllow11);
    // requestBody.append("fllow1_date", currentDate1);
    // requestBody.append("fllow2", user.c_fllow2 || values.fllow22);
    // requestBody.append("fllow2_date", currentDate1);
    // requestBody.append("fllow3", user.c_fllow3 || values.fllow33);
    // requestBody.append("fllow3_date", currentDate1);
    // requestBody.append("fllow4", user.c_fllow4 || values.fllow44);
    // requestBody.append("fllow4_date", currentDate1);
    // requestBody.append("statusDate", currentDate1);
    // requestBody.append("status", value.statuss);

    requestBody.append("remarks", values.clsremarks);

    console.log("FormData Entries:");
    for (const [key, value] of requestBody.entries()) {
      console.log(`${key}: ${value}`);
    }

    axios
      .post(`${apiLinks}/CustomerRemarks.php`, requestBody)
      .then((response) => {
        if (response.data.error === 200) {
          setAlertData({
            type: "success",
            message: `${response.data.message}`,
          });
          setTimeout(() => {
            setAlertData(null);
            navigate("/Technician_Visit");
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

  ///////////////////////////// Complain //////////////////////////

  // Create refs for each input field
  const c1 = useRef(null);
  const c2 = useRef(null);
  const c3 = useRef(null);
  const c4 = useRef(null);
  const c5 = useRef(null);
  const c6 = useRef(null);
  const c7 = useRef(null);
  const c8 = useRef(null);
  const c9 = useRef(null);
  const c10 = useRef(null);
  const c11 = useRef(null);
  const c12 = useRef(null);
  const c13 = useRef(null);
  const c14 = useRef(null);
  const c15 = useRef(null);

  //////////////////////////GET iTEM /////////////////////////
  const [dataItem, setDataItem] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiLinks}/GetItem.php`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const apiData = await response.json();
        setDataItem(apiData);

        // Set the selectedCategoryId with the first category ID from the API data
        if (apiData.length > 0) {
          setSelectedItemId(apiData[0].itmid);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const [selectedReferanceId, setSelectedReferanceId] = useState("");
  // const [refdata, setRefData] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");

  const [selectedProductId, setSelectedProductId] = useState("");
  const [selectedCompalainId, setSelectedComplainId] = useState("");
  const [dataCom, setDataCom] = useState([]);

  const [dataRef, setDataRef] = useState([]);
  const [dataPro, setDataPro] = useState([]);
  ///////////////////////////////// TYPE MAINTENANCE ///////////////////////////////////////

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiLinks}/GetType.php`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const apiData = await response.json();
        setData(apiData);

        // Set the selectedCategoryId with the first category ID from the API data
        if (apiData.length > 0) {
          setSelectedCategoryId(apiData[0].tctgid);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  ///////////////////////////////// GET REFERANCE ///////////////////////////////////////
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiLinks}/GetReference.php`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const apiData = await response.json();
        setDataRef(apiData);

        // Set the selectedCategoryId with the first category ID from the API data
        if (apiData.length > 0) {
          setSelectedReferanceId(apiData[0].refid);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  ///////////////////////////////// GET COMPLAINT TYPE ///////////////////////////////////////

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiLinks}/GetComplaintType.php`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const apiData = await response.json();
        setDataCom(apiData);

        // Set the selectedCategoryId with the first category ID from the API data
        if (apiData.length > 0) {
          setSelectedComplainId(apiData[0].comid);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   const uppercaseValue = value.toUpperCase();
  //   setUser((prevUser) => ({
  //     ...prevUser,
  //     [name]: uppercaseValue,
  //   }));
  //   // setUser({ ...values, [name]: uppercaseValue });
  // };
  const [isFollowUp1Disabled, setFollowUp1Disabled] = useState(false);
  const [isFollowUp2Disabled, setFollowUp2Disabled] = useState(false);
  const [isFollowUp3Disabled, setFollowUp3Disabled] = useState(false);
  const [isFollowUp4Disabled, setFollowUp4Disabled] = useState(false);

  useEffect(() => {
    setFollowUp1Disabled(user.c_fllow1 === "");
    setFollowUp2Disabled(user.c_fllow2 === "");
    setFollowUp3Disabled(user.c_fllow3 === "");
    setFollowUp4Disabled(user.c_fllow4 === "");
  }, [user.c_fllow1, user.c_fllow2, user.c_fllow3, user.c_fllow4]);

  useEffect(() => {
    if (user.c_fllow1 === null) {
      setFollowUp2Disabled(true);
      setFollowUp3Disabled(true);
      setFollowUp4Disabled(true);
    } else if (user.c_fllow2 === null) {
      setFollowUp1Disabled(true);
      setFollowUp3Disabled(true);
      setFollowUp4Disabled(true);
    } else if (user.c_fllow3 === null) {
      setFollowUp1Disabled(true);
      setFollowUp2Disabled(true);
      setFollowUp4Disabled(true);
    } else if (user.c_fllow4 === null) {
      setFollowUp1Disabled(true);
      setFollowUp2Disabled(true);
      setFollowUp3Disabled(true);
    } else if (user.c_fllow4 !== null) {
      setFollowUp1Disabled(true);
      setFollowUp2Disabled(true);
      setFollowUp3Disabled(true);
      setFollowUp4Disabled(true);
    }
  }, [user.c_fllow1, user.c_fllow2, user.c_fllow3, user.c_fllow4]);

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
          pageName="Transaction > Closed Complaint > Update Closed Complaint"
          screen="Item"
          pageLink="/Closed_Complaint"
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
              padding: "1px",
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
                padding: "7px",
                width: "100%",
                maxWidth: "900px",
                margin: "20px 0",
                border: "1px solid black",
                fontSize: "12px",
                position: "absolute",
                top: "53%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <Form onSubmit={handleFormSubmit}>
                <div className="row">
                  {/* colSpan="3" */}
                  {/* style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', marginRight: '10px' }} */}
                  <div className="col-12">
                    <table style={{ border: "none", width: "100%" }}>
                      <tbody>
                        {/*   ///////////////// 1 row */}
                        <tr>
                          <td
                            style={{
                              display: "flex",
                              alignItems: "flex-end",
                              justifyContent: "flex-end",
                              marginRight: "10px",
                            }}
                          >
                            <Form.Group style={{ display: "flex" }}>
                              <Form.Label>Complaint#:</Form.Label>
                            </Form.Group>
                          </td>
                          <td>
                            <Form.Group style={{ display: "flex" }}>
                              <Form.Control
                                type="text"
                                placeholder="Id"
                                name="seriall"
                                className="form-control"
                                value={user.c_id}
                                style={{ height: "24px", width: "70px" }}
                                onChange={handleInputChange}
                                onKeyDown={(e) => handleEnterKeyPress(c2, e)}
                                ref={c1}
                                disabled
                              />
                            </Form.Group>
                          </td>
                          <td>
                            <Form.Group
                              style={{
                                display: "flex",
                                alignItems: "flex-end",
                                justifyContent: "flex-end",
                                marginRight: "10px",
                              }}
                            >
                              <Form.Label style={{ marginRight: "10px" }}>
                                Date: {value.date}
                              </Form.Label>
                            </Form.Group>
                          </td>
                          <td
                            style={{
                              display: "flex",
                              alignItems: "flex-end",
                              justifyContent: "flex-end",
                              marginRight: "10px",
                            }}
                          >
                            <Form.Group
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <Form.Label style={{ marginRight: "10px" }}>
                                Time: {value.time}
                              </Form.Label>
                            </Form.Group>
                          </td>
                        </tr>

                        {/*   ///////////////// 2 row */}
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
                              style={{
                                display: "flex",
                                alignItems: "center",
                                marginTop: "-1%",
                              }}
                            >
                              <Form.Label>Mobile No:</Form.Label>
                            </Form.Group>
                          </td>
                          <td>
                            <Form.Group
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <Form.Control
                                type="text"
                                placeholder="Mobile No."
                                name="c_mobile"
                                className="form-control"
                                value={user.c_mobile}
                                style={{ height: "24px", width: "170px" }}
                                onChange={handleInputChange}
                                maxLength={11}
                                onKeyDown={(e) => handleEnterKeyPress(c3, e)}
                                ref={c2}
                              />
                            </Form.Group>
                          </td>
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
                              <Form.Label>Type:</Form.Label>
                            </Form.Group>
                          </td>
                          <td>
                            <Form.Group
                              controlId="status"
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <Form.Control
                                as="select"
                                name="typid"
                                value={user.typid}
                                onChange={(e) => {
                                  setSelectedTypeId(e.target.value);
                                  setUser((prevUser) => ({
                                    ...prevUser,
                                    typid: e.target.value,
                                  }));
                                }}
                                id="typid"
                                className="form-control custom-select"
                                style={{ height: "27px", fontSize: "11px" }}
                                onKeyDown={(e) => handleEnterKeyPress(c4, e)}
                                ref={c3}
                              >
                                {typedata.map((item) => (
                                  <option key={item.typid} value={item.typid}>
                                    {item.typdsc}
                                  </option>
                                ))}
                              </Form.Control>
                            </Form.Group>
                          </td>
                        </tr>

                        {/*    ///////////////// 4 row */}
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
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <Form.Label>Customer Name:</Form.Label>
                            </Form.Group>
                          </td>
                          <td>
                            <Form.Group
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <Form.Control
                                type="text"
                                placeholder="Customer Name"
                                name="c_cust"
                                className="form-control"
                                value={user.c_cust}
                                style={{ height: "24px" }}
                                onChange={handleInputChange}
                                onKeyDown={(e) => handleEnterKeyPress(c5, e)}
                                ref={c4}
                                maxLength={40}
                              />
                            </Form.Group>
                          </td>
                          <td></td>
                          <td></td>
                        </tr>
                        {/*    ///////////////// 5 row */}
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
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <Form.Label>Address:</Form.Label>
                            </Form.Group>
                          </td>
                          <td>
                            <Form.Group
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <Form.Control
                                type="text"
                                placeholder="Address1"
                                name="c_add1"
                                className="form-control"
                                value={user.c_add1}
                                style={{ height: "24px" }}
                                onChange={handleInputChange}
                                onKeyDown={(e) => handleEnterKeyPress(c6, e)}
                                ref={c5}
                              />
                            </Form.Group>
                          </td>
                          <td></td>
                          <td></td>
                        </tr>
                        {/*    ///////////////// 6 row */}
                        <tr>
                          <td></td>
                          <td>
                            <Form.Group
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <Form.Control
                                type="text"
                                placeholder="Address2"
                                name="c_add2"
                                className="form-control"
                                value={user.c_add2}
                                style={{ height: "24px" }}
                                onChange={handleInputChange}
                                onKeyDown={(e) => handleEnterKeyPress(c7, e)}
                                ref={c6}
                              />
                            </Form.Group>
                          </td>
                          <td></td>
                          <td></td>
                        </tr>

                        {/*    ////////////////////7 row ///////////////////////// */}

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
                                Product:
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
                                name="c_prodid"
                                value={user.c_prodid}
                                onChange={(e) => {
                                  setSelectedItemId(e.target.value);
                                  setUser((prevUser) => ({
                                    ...prevUser,
                                    c_prodid: e.target.value,
                                  }));
                                }}
                                id="c_prodid"
                                className="form-control custom-select"
                                style={{ height: "27px", fontSize: "11px" }}
                                onKeyDown={(e) => handleEnterKeyPress(c8, e)}
                                ref={c7}
                              >
                                {dataItem.map((item) => (
                                  <option key={item.itmid} value={item.itmid}>
                                    {item.itmdsc}
                                  </option>
                                ))}
                              </Form.Control>
                            </Form.Group>
                          </td>

                          <td
                            style={{
                              display: "flex",
                              alignItems: "flex-end",
                              justifyContent: "flex-end",
                              marginRight: "10px",
                            }}
                          >
                            <Form.Group style={{ display: "flex" }}>
                              <Form.Label>Email:</Form.Label>
                            </Form.Group>
                          </td>
                          <td>
                            <Form.Group style={{ display: "flex" }}>
                              <Form.Control
                                type="text"
                                placeholder="Email"
                                name="c_email"
                                className="form-control"
                                value={user.c_email}
                                style={{ height: "24px" }}
                                onChange={handleInputChange}
                                onKeyDown={(e) => handleEnterKeyPress(c9, e)}
                                ref={c8}
                              />
                            </Form.Group>
                          </td>
                        </tr>
                        {/*    ///////////////// 8 row */}
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
                                Referance:
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
                                name="c_refid"
                                value={user.c_refid}
                                onChange={(e) => {
                                  setSelectedReferanceId(e.target.value);
                                  setUser((prevUser) => ({
                                    ...prevUser,
                                    c_refid: e.target.value,
                                  }));
                                }}
                                id="refid"
                                className="form-control custom-select"
                                style={{
                                  height: "27px",
                                  fontSize: "11px",
                                  width: "150px",
                                }}
                                onKeyDown={(e) => handleEnterKeyPress(c10, e)}
                                ref={c9}
                              >
                                {dataRef.map((item) => (
                                  <option key={item.refid} value={item.refid}>
                                    {item.refdsc}
                                  </option>
                                ))}
                              </Form.Control>
                            </Form.Group>
                          </td>
                          <td
                            style={{
                              display: "flex",
                              alignItems: "flex-end",
                              justifyContent: "flex-end",
                              marginRight: "10px",
                            }}
                          >
                            <Form.Group
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <Form.Label>Contact No:</Form.Label>
                            </Form.Group>
                          </td>
                          <td>
                            <Form.Group
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <Form.Control
                                type="text"
                                placeholder="Contact No."
                                name="c_contant"
                                className="form-control"
                                value={user.c_contant}
                                style={{ height: "24px", width: "150px" }}
                                onChange={handleInputChange}
                                onKeyDown={(e) => handleEnterKeyPress(c11, e)}
                                ref={c10}
                              />
                            </Form.Group>
                          </td>
                        </tr>

                        {/*    ///////////////// 9 row */}

                        <tr>
                          <td
                            style={{
                              display: "flex",
                              alignItems: "flex-end",
                              justifyContent: "flex-end",
                              marginRight: "10px",
                            }}
                          >
                            <Form.Group style={{ display: "flex" }}>
                              <Form.Label>Invoice No:</Form.Label>
                            </Form.Group>
                          </td>
                          <td>
                            <Form.Group style={{ display: "flex" }}>
                              <Form.Control
                                type="text"
                                placeholder="Invoice No"
                                name="c_invno"
                                className="form-control"
                                value={user.c_invno}
                                style={{ height: "24px", width: "170px" }}
                                onChange={handleInputChange}
                                onKeyDown={(e) => handleEnterKeyPress(c12, e)}
                                ref={c11}
                              />
                            </Form.Group>
                          </td>
                          <td>
                            <Form.Group
                              style={{
                                display: "flex",
                                alignItems: "flex-end",
                                justifyContent: "flex-end",
                                marginRight: "10px",
                              }}
                            >
                              <Form.Label>Warrently:</Form.Label>
                            </Form.Group>
                          </td>
                          <td>
                            <Form.Group
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <Form.Control
                                as="select"
                                name="warrtyy"
                                value={user.c_warrty}
                                onChange={(e) =>
                                  setSelectedStatus(e.target.value)
                                }
                                style={{
                                  height: "30px",
                                  width: "60px",
                                  fontSize: "11px",
                                }}
                                onKeyDown={(e) => handleEnterKeyPress(c13, e)}
                                ref={c12}
                                //  onKeyDown={(e) => handleEnterKeyPress(buttonRef, e)} // Move to the next input on Enter key press
                                //   ref={statusRef}
                              >
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                              </Form.Control>
                            </Form.Group>
                          </td>
                        </tr>

                        {/*    ///////////////// 10 row */}
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
                                Complain:
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
                                name="c_comid"
                                value={user.c_comid}
                                onChange={(e) => {
                                  setSelectedComplainId(e.target.value);
                                  setUser((prevUser) => ({
                                    ...prevUser,
                                    c_comid: e.target.value,
                                  }));
                                }}
                                id="comid"
                                className="form-control custom-select"
                                style={{
                                  height: "27px",
                                  fontSize: "11px",
                                  width: "150px",
                                }}
                                onKeyDown={(e) => handleEnterKeyPress(c14, e)}
                                ref={c13}
                              >
                                {dataCom.map((item) => (
                                  <option key={item.comid} value={item.comid}>
                                    {item.comdsc}
                                  </option>
                                ))}
                              </Form.Control>
                            </Form.Group>
                          </td>

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
                                Technicain:
                              </Form.Label>
                            </Form.Group>
                          </td>

                          <td>
                            {user.aasign_techid === null ? (
                              <Form.Group
                                controlId="status"
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <Form.Control
                                  as="select"
                                  name="categoryIdd"
                                  onChange={(e) => {
                                    setSelectedTechId(e.target.value);
                                  }}
                                  id="categoryIdd"
                                  className="form-control custom-select"
                                  style={{
                                    height: "27px",
                                    fontSize: "11px",
                                    width: "150px",
                                  }}
                                >
                                  <option value="">SELECT TECHNICIAN</option>{" "}
                                  {/* Added this line */}
                                  {techdata.map((item) => (
                                    <option
                                      key={item.techid}
                                      value={item.techid}
                                    >
                                      {item.techdsc}
                                    </option>
                                  ))}
                                </Form.Control>
                              </Form.Group>
                            ) : (
                              // <Form.Group controlId="status" style={{ display: 'flex', alignItems: 'center' }}>
                              //   <Form.Control
                              //     type="text" // You can use 'text' or 'hidden' based on your requirements
                              //     value={user.techdsc} // Show the assigned technician's value
                              //     readOnly // Make the input non-editable
                              // style={{ height: '27px', fontSize: '11px', width: '150px' ,backgroundColor: primaryColor,color:secondaryColor}}
                              //   />
                              // </Form.Group>
                              <Form.Group
                                controlId="status"
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <Form.Control
                                  as="select"
                                  name="categoryIdd"
                                  onChange={(e) => {
                                    setSelectedTechId(e.target.value);
                                  }}
                                  id="categoryIdd"
                                  className="form-control custom-select"
                                  style={{
                                    height: "27px",
                                    fontSize: "11px",
                                    width: "170px",
                                    backgroundColor: primaryColor,
                                    color: secondaryColor,
                                  }}
                                >
                                  {techdata.map((item) => (
                                    <option
                                      key={item.techid}
                                      value={item.techid}
                                    >
                                      {item.techdsc}
                                    </option>
                                  ))}
                                </Form.Control>
                              </Form.Group>
                            )}
                          </td>
                        </tr>

                        {/*    ///////////////// 11 row */}

                        <tr>
                          <td
                            style={{
                              display: "flex",
                              alignItems: "flex-end",
                              justifyContent: "flex-end",
                              marginRight: "10px",
                            }}
                          >
                            <Form.Group style={{ display: "flex" }}>
                              <Form.Label>Remarks:</Form.Label>
                            </Form.Group>
                          </td>
                          <td>
                            <Form.Group style={{ display: "flex" }}>
                              <Form.Control
                                as="textarea" // Set the input type to textarea
                                rows={2} // Specify the number of rows (adjust as needed)
                                placeholder="Remarks"
                                name="c_remarks"
                                className="form-control"
                                value={user.c_remarks}
                                style={{ width: "270px" }}
                                onChange={handleInputChange}
                                onKeyDown={(e) => handleEnterKeyPress(c15, e)}
                                ref={c14}
                              />
                            </Form.Group>
                          </td>
                        </tr>

                        {/*    ///////////////// 12 row */}

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
                              style={{
                                display: "flex",
                                alignItems: "center",
                                marginTop: "-1%",
                              }}
                            >
                              <Form.Label>FollowUp 1:</Form.Label>
                            </Form.Group>
                          </td>
                          <td>
                            <Form.Group
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <Form.Group
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <Form.Control
                                  type="text"
                                  placeholder="FollowUp 1"
                                  name="fllow1_date"
                                  className="form-control"
                                  // value={values.fllow1_date}
                                  value={currentDate1}
                                  disabled
                                  style={{ height: "24px", width: "100px" }}
                                  onChange={handleInputChange1}
                                  maxLength={10}
                                  onKeyDown={(e) => handleEnterKeyPress(c3, e)}
                                  ref={c2}
                                />
                              </Form.Group>

                              <Form.Control
                                type="text"
                                placeholder="Follow Up1"
                                name="fllow11"
                                className="form-control"
                                value={
                                  user.c_fllow1 !== null
                                    ? user.c_fllow1
                                    : values.fllow11
                                }
                                // value={values.fllow11 || user.c_fllow1}
                                // value={user.c_fllow1 }
                                disabled={isFollowUp1Disabled}
                                style={{ height: "24px", width: "220px" }}
                                onChange={handleInputChange1}
                                maxLength={11}
                                onKeyDown={(e) => handleEnterKeyPress(c3, e)}
                                ref={c2}
                              />

                              {/* disabled={user.c_fllow1 === '' && user.c_fllow2 === null  && user.c_fllow3 === null && user.c_fllow4 === null} */}
                            </Form.Group>
                          </td>
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
                              <Form.Label>Type:</Form.Label>
                            </Form.Group>
                          </td>
                          <td>
                            <Form.Group
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <Form.Control
                                as="select"
                                name="status"
                                value={user.c_sts}
                                disabled
                                //  onChange={(e) => setSelectedStatusId(e.target.value)}
                                onChange={(e) => {
                                  setSelectedStatusId(e.target.value);
                                  // setUser((prevUser) => ({
                                  //   ...prevUser,
                                  //   typid: e.target.value,
                                  // }));
                                }}
                                style={{
                                  height: "30px",
                                  width: "100px",
                                  fontSize: "11px",
                                }}
                                //  onKeyDown={(e) => handleEnterKeyPress(buttonRef, e)} // Move to the next input on Enter key press
                                //   ref={statusRef}
                              >
                                <option value="Select">Select Option</option>
                                <option value="pending">Pending</option>
                                <option value="solved">Solved</option>
                                <option value="not_solved">Not Solved</option>
                                <option value="closed">Closed</option>
                              </Form.Control>
                            </Form.Group>
                          </td>
                          {/* <td  > 



    <Form.Group controlId="status" style={{ display: 'flex', alignItems: 'center' }}>
      <Form.Control


as="select"
name="typid"
value={user.typid}
onChange={(e) => {
  setSelectedTypeId(e.target.value);
setUser((prevUser) => ({
  ...prevUser,
  typid: e.target.value,
}));
}}
id="typid"
className="form-control custom-select"
style={{ height: '27px', fontSize: '11px',width:'150px'}}
onKeyDown={(e) => handleEnterKeyPress(c4, e)} 
ref={c3}


      >
                    <option value="Select">Select Option</option>
            <option value="pending">Pending</option>
            <option value="solved">Solved</option>
            <option value="not_solved">Not Solved</option>
            <option value="closed">Closed</option>

      </Form.Control>
    </Form.Group>
  </td> */}
                        </tr>

                        {/*    ///////////////// 13 row */}

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
                              style={{
                                display: "flex",
                                alignItems: "center",
                                marginTop: "-1%",
                              }}
                            >
                              <Form.Label>FollowUp 2:</Form.Label>
                            </Form.Group>
                          </td>
                          <td>
                            <Form.Group
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <Form.Control
                                type="text"
                                placeholder="Mobile No."
                                name="fllow2_date"
                                className="form-control"
                                disabled
                                // value={values.fllow2_date}
                                value={currentDate1}
                                style={{ height: "24px", width: "100px " }}
                                onChange={handleInputChange1}
                                maxLength={11}
                                onKeyDown={(e) => handleEnterKeyPress(c3, e)}
                                ref={c2}
                              />
                              <Form.Control
                                type="text"
                                placeholder="Follow Up2"
                                name="fllow22"
                                className="form-control"
                                value={values.fllow22 || user.c_fllow2}
                                // value={user.c_fllow2}
                                disabled={isFollowUp2Disabled}
                                style={{ height: "24px", width: "220px" }}
                                onChange={handleInputChange1}
                                maxLength={11}
                                onKeyDown={(e) => handleEnterKeyPress(c3, e)}
                                ref={c2}
                              />
                            </Form.Group>
                          </td>
                          <td
                            style={{
                              display: "flex",
                              alignItems: "flex-end",
                              justifyContent: "flex-end",
                              marginRight: "10px",
                            }}
                          >
                            <Form.Group
                              style={{
                                display: "flex",
                                alignItems: "center",
                                marginTop: "-1%",
                              }}
                            >
                              <Form.Label>Closed Date:</Form.Label>
                            </Form.Group>
                          </td>
                          <td>
                            <Form.Group
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <Form.Control
                                type="text"
                                placeholder="Closed Date"
                                name="c_mobile"
                                className="form-control"
                                value={user.c_sts_date}
                                disabled
                                style={{ height: "24px", width: "150px" }}
                                onChange={handleInputChange1}
                                maxLength={11}
                                onKeyDown={(e) => handleEnterKeyPress(c3, e)}
                                ref={c2}
                              />
                            </Form.Group>
                          </td>
                        </tr>

                        {/*    ///////////////// 14 row */}

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
                              style={{
                                display: "flex",
                                alignItems: "center",
                                marginTop: "-1%",
                              }}
                            >
                              <Form.Label>FollowUp 3:</Form.Label>
                            </Form.Group>
                          </td>
                          <td>
                            <Form.Group
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <Form.Control
                                type="text"
                                placeholder="Mobile No."
                                name="fllow3_date"
                                className="form-control"
                                // value={values.fllow3_date}
                                value={currentDate1}
                                style={{ height: "24px", width: "100px " }}
                                onChange={handleInputChange1}
                                disabled
                                maxLength={11}
                                onKeyDown={(e) => handleEnterKeyPress(c3, e)}
                                ref={c2}
                              />
                              <Form.Control
                                type="text"
                                placeholder="Follow Up3"
                                name="fllow33"
                                className="form-control"
                                value={values.fllow33 || user.c_fllow3}
                                // value={user.c_fllow3}
                                disabled={isFollowUp3Disabled}
                                style={{ height: "24px", width: "220px" }}
                                onChange={handleInputChange1}
                                maxLength={11}
                                onKeyDown={(e) => handleEnterKeyPress(c3, e)}
                                ref={c2}
                              />
                            </Form.Group>
                          </td>
                        </tr>
                        {/*    ///////////////// 15 row */}

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
                              style={{
                                display: "flex",
                                alignItems: "center",
                                marginTop: "-1%",
                              }}
                            >
                              <Form.Label>FollowUp 4:</Form.Label>
                            </Form.Group>
                          </td>
                          <td>
                            <Form.Group
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <Form.Control
                                type="text"
                                name="fllow4_date"
                                value={currentDate1}
                                style={{ height: "24px", width: "100px " }}
                                disabled
                                // onChange={handleInputChange1}
                                maxLength={11}
                                onKeyDown={(e) => handleEnterKeyPress(c3, e)}
                                ref={c2}
                              />
                              <Form.Control
                                type="text"
                                placeholder="Follow Up4"
                                name="fllow44"
                                className="form-control"
                                value={values.fllow44 || user.c_fllow4}
                                // value={user.c_fllow4}
                                style={{ height: "24px", width: "220px" }}
                                onChange={handleInputChange1}
                                disabled={isFollowUp4Disabled}
                                maxLength={11}
                                onKeyDown={(e) => handleEnterKeyPress(c3, e)}
                                ref={c2}
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
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <Form.Label>Cst Remarks:</Form.Label>
                            </Form.Group>
                          </td>
                          <td>
                            <Form.Group
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <Form.Control
                                type="text"
                                placeholder="Customer Remarks"
                                name="clsremarks"
                                className="form-control"
                                value={values.clsremarks}
                                style={{ height: "24px" }}
                                onChange={handleInputChange1}
                                onKeyDown={(e) => handleEnterKeyPress(c5, e)}
                                ref={c4}
                                maxLength={40}
                              />
                            </Form.Group>
                          </td>
                        </tr>
                        {/*    ///////////////// 15 row */}

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
                              // onKeyDown={(e) => handleEnterKeyPress(statusRef, e)}
                              ref={c15}
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

export default Update_ClosedComplaint;
