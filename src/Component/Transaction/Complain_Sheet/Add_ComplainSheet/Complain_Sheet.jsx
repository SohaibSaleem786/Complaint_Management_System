import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Alert from "@mui/material/Alert";
import PathHead from "../../../MainComponent/PathHead/PathHead";
import Header from "../../../MainComponent/Header/Header";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../../MainComponent/Footer/Footer";
import Select from "react-select";
import { useTheme } from "../../../../ThemeContext";
import displayAlert from "../../../MainComponent/Alert/Alert";

function Add_ComplainSheet() {
  const [values, setValues] = useState({
    mobilee: "",
    typee: "",
    namee: "",
    add11: "",
    add22: "",
    contactt: "",
    refidd: "",
    prodidd: " ",
    warrtyy: "",
    compidd: "",
    remarkss: "",
    purdatee: "",
    emaill: "",
    seriall: "",
    loading: false,
  });

  const navigate = useNavigate();
  const [selectedStatus, setSelectedStatus] = useState("Yes");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [selectedAreaId, setSelectedAreaId] = useState("");
  const [alertData, setAlertData] = useState(null);
  const { secondaryColor, apiLinks } = useTheme();
  const [data, setData] = useState([]);

  const [dataRef, setDataRef] = useState([]);
  const [selectedReferanceId, setSelectedReferanceId] = useState("");
  const [selectedProductId, setSelectedProductId] = useState("");
  const [dataPro, setDataPro] = useState([]);

  const [selectedCompalainId, setSelectedComplainId] = useState("");
  const [dataCom, setDataCom] = useState([]);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const uppercaseValue = value.toUpperCase();
    setValues({ ...values, [name]: uppercaseValue });
  };

  {
    /* ////////////////////////  DUE TO GET DATA OF CATEGORY ////////////////////////// */
  }

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

  const [dataItem, setDataItem] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(` ${apiLinks}/GetItem.php`);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiLinks}/GetReference.php`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const apiData = await response.json();
        setDataPro(apiData);

        // Set the selectedCategoryId with the first category ID from the API data
        if (apiData.length > 0) {
          setSelectedProductId(apiData[0].refid);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

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
  {
    /* ////////////////////////  CALL API TO POST DATA ////////////////////////// */
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const value = {
      typee: selectedCategoryId,
      areaId: selectedAreaId,
      warrtyy: selectedStatus,
      refidd: selectedReferanceId,
      prodidd: selectedProductId,
    };

    setValues((prevState) => ({
      ...prevState,
      loading: true,
    }));

    try {
      const formData = new FormData();
      formData.append("mobile", values.mobilee);
      formData.append("type", value.typee);
      formData.append("name", values.namee);
      formData.append("add1", values.add11);
      formData.append("add2", values.add22);
      formData.append("contact", values.contactt);
      formData.append("refid", value.refidd);
      formData.append("prodid", value.prodidd);
      formData.append("invno", values.invnoo);
      formData.append("warrty", value.warrtyy);
      formData.append("compid", values.compidd);
      formData.append("remarks", values.remarkss);
      formData.append("purdate", "2023-11-11");
      formData.append("email", values.emaill);
      formData.append("serial", values.seriall);

      const response = await axios.post(`${apiLinks}/Complaint.php`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("FormData data:", response);

      if (response.data.error === 200) {
        navigate("/Get_ComplainSheet");
        console.log("response message data show", response.data.message);

        setAlertData({
          type: "success",
          message: `${response.data.message}`,
        });

        setTimeout(() => {
          setAlertData(null);
        }, 1000);
      } else {
        console.log("response message error data show", response.data.message);

        setAlertData({
          type: "error",
          message: `${response.data.message}`,
        });
        setTimeout(() => {
          setAlertData(null);
        }, 2000);
      }
      // navigate("/MainPage");
    } catch (error) {
      console.error("API Error:", error);
    } finally {
      setValues({
        itemid: "",
        itmindex: "",
        itmremarks: "",
        // (Resetting other form values)
        loading: false,
      });
      // window.location.reload();
    }
  };

  // Create refs for each input field
  const complainid = useRef(null);
  const mobile = useRef(null);
  const type = useRef(null);
  const name = useRef(null);
  const address1 = useRef(null);
  const address2 = useRef(null);
  const area = useRef(null);
  const contact = useRef(null);
  const email = useRef(null);
  const referance = useRef(null);
  const product = useRef(null);
  const invoice = useRef(null);
  const warrty = useRef(null);
  const complaint = useRef(null);
  const remarks = useRef(null);
  const subnitbutton = useRef(null);

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

  ////////////////////////////////////////////////////////////////////////

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
          pageName="Transaction > Complaint Sheet > Add Coplaint Sheet"
          screen="Item"
          pageLink="/Get_ComplainSheet"
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
                maxWidth: "750px",
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
                        {/* ///////////////// 1 row */}
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
                              <Form.Label style={{ marginRight: "10px" }}>
                                Complaint#:
                              </Form.Label>
                            </Form.Group>
                          </td>
                          <td>
                            <Form.Group style={{ display: "flex" }}>
                              <Form.Control
                                type="text"
                                placeholder="Id"
                                name="seriall"
                                className="form-control"
                                value={values.seriall}
                                style={{ height: "24px", width: "70px" }}
                                onChange={handleInputChange}
                                onKeyDown={(e) =>
                                  handleEnterKeyPress(mobile, e)
                                }
                                ref={complainid}
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

                        {/* ///////////////// 2 row */}
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
                              <Form.Label style={{ marginRight: "10px" }}>
                                Mobile No:
                              </Form.Label>
                            </Form.Group>
                          </td>
                          <td>
                            <Form.Group
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <Form.Control
                                type="text"
                                placeholder="Mobile No."
                                name="mobilee"
                                className="form-control"
                                value={values.mobilee}
                                style={{ height: "24px", width: "170px" }}
                                onChange={handleInputChange}
                                maxLength={11}
                                onKeyDown={(e) => handleEnterKeyPress(type, e)}
                                ref={mobile}
                              />
                            </Form.Group>
                          </td>
                          <td></td>
                          <td></td>
                        </tr>
                        {/* ///////////////// 3 row */}
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
                              <Form.Label style={{ marginRight: "10px" }}>
                                Type:
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
                                name="typee"
                                onChange={(e) => {
                                  setSelectedCategoryId(e.target.value);
                                }}
                                id="typee"
                                className="form-control custom-select"
                                style={{
                                  height: "27px",
                                  fontSize: "11px",
                                  width: "150px",
                                }}
                                onKeyDown={(e) => handleEnterKeyPress(name, e)}
                                ref={type}
                              >
                                {data.map((item) => (
                                  <option key={item.typid} value={item.typid}>
                                    {item.typdsc}
                                  </option>
                                ))}
                              </Form.Control>
                            </Form.Group>
                          </td>
                          <td></td>
                          <td></td>
                        </tr>
                        {/* ///////////////// 4 row */}
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
                              <Form.Label style={{ marginRight: "10px" }}>
                                Customer Name:
                              </Form.Label>
                            </Form.Group>
                          </td>
                          <td>
                            <Form.Group
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <Form.Control
                                type="text"
                                placeholder="Customer Name"
                                name="namee"
                                className="form-control"
                                value={values.namee}
                                style={{ height: "24px" }}
                                onChange={handleInputChange}
                                onKeyDown={(e) =>
                                  handleEnterKeyPress(address1, e)
                                }
                                ref={name}
                                maxLength={40}
                              />
                            </Form.Group>
                          </td>
                          <td></td>
                          <td></td>
                        </tr>
                        {/* ///////////////// 5 row */}
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
                              <Form.Label style={{ marginRight: "10px" }}>
                                Address:
                              </Form.Label>
                            </Form.Group>
                          </td>
                          <td>
                            <Form.Group
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <Form.Control
                                type="text"
                                placeholder="Address1"
                                name="add11"
                                className="form-control"
                                value={values.add11}
                                style={{ height: "24px" }}
                                onChange={handleInputChange}
                                onKeyDown={(e) =>
                                  handleEnterKeyPress(address2, e)
                                }
                                ref={address1}
                              />
                            </Form.Group>
                          </td>
                          <td></td>
                          <td></td>
                        </tr>
                        {/* ///////////////// 6 row */}
                        <tr>
                          <td></td>
                          <td>
                            <Form.Group
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <Form.Control
                                type="text"
                                placeholder="Address2"
                                name="add22"
                                className="form-control"
                                value={values.add22}
                                style={{ height: "24px" }}
                                onChange={handleInputChange}
                                onKeyDown={(e) => handleEnterKeyPress(area, e)}
                                ref={address2}
                              />
                            </Form.Group>
                          </td>
                          <td></td>
                          <td></td>
                        </tr>
                        {/* ///////////////// 7 row */}

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
                              <Form.Label style={{ marginRight: "10px" }}>
                                Area:
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
                                name="categoryIdd"
                                onChange={(e) => {
                                  setSelectedAreaId(e.target.value);
                                }}
                                id="categoryIdd"
                                className="form-control custom-select"
                                style={{
                                  height: "27px",
                                  fontSize: "11px",
                                  width: "150px",
                                }}
                                onKeyDown={(e) =>
                                  handleEnterKeyPress(contact, e)
                                }
                                ref={area}
                              >
                                {data.map((item) => (
                                  <option key={item.typid} value={item.typid}>
                                    {item.typdsc}
                                  </option>
                                ))}
                              </Form.Control>
                            </Form.Group>
                          </td>
                          <td></td>
                          <td></td>
                        </tr>
                        {/* ///////////////// 8 row */}

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
                              <Form.Label style={{ marginRight: "10px" }}>
                                Contact No:
                              </Form.Label>
                            </Form.Group>
                          </td>
                          <td>
                            <Form.Group
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <Form.Control
                                type="text"
                                placeholder="Contact No."
                                name="contactt"
                                className="form-control"
                                value={values.contactt}
                                style={{ height: "24px", width: "150px" }}
                                onChange={handleInputChange}
                                onKeyDown={(e) => handleEnterKeyPress(email, e)}
                                ref={contact}
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
                            <Form.Group style={{ display: "flex" }}>
                              <Form.Label style={{ marginRight: "10px" }}>
                                Email:
                              </Form.Label>
                            </Form.Group>
                          </td>
                          <td>
                            <Form.Group style={{ display: "flex" }}>
                              <Form.Control
                                type="text"
                                placeholder="Email"
                                name="emaill"
                                className="form-control"
                                value={values.emaill}
                                style={{ height: "24px", width: "170px" }}
                                onChange={handleInputChange}
                                onKeyDown={(e) =>
                                  handleEnterKeyPress(referance, e)
                                }
                                ref={email}
                              />
                            </Form.Group>
                          </td>
                        </tr>
                        {/* ///////////////// 9 row */}

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
                              <Select
                                options={dataRef.map((item) => ({
                                  value: item.refid,
                                  label: item.refdsc,
                                }))}
                                onChange={(selectedOption) => {
                                  setSelectedReferanceId(selectedOption.value);
                                }}
                                onKeyDown={(e) =>
                                  handleEnterKeyPress(product, e)
                                }
                                ref={referance}
                                isSearchable
                                placeholder="Search..."
                                styles={{
                                  control: (provided) => ({
                                    ...provided,
                                    height: "2rem",
                                    fontSize: "11px",
                                    width: "180px",
                                  }),
                                }}
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
                              <Select
                                options={dataItem.map((item) => ({
                                  value: item.itmid,
                                  label: item.itmdsc,
                                }))}
                                onChange={(selectedOption) => {
                                  setSelectedItemId(selectedOption.value);
                                }}
                                onKeyDown={(e) =>
                                  handleEnterKeyPress(invoice, e)
                                }
                                ref={product}
                                isSearchable
                                placeholder="Search..."
                                styles={{
                                  control: (provided) => ({
                                    ...provided,
                                    height: "2rem",
                                    fontSize: "11px",
                                    width: "180px",
                                  }),
                                }}
                              />
                            </Form.Group>
                          </td>
                        </tr>

                        {/* ///////////////// 10 row */}

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
                              <Form.Label style={{ marginRight: "10px" }}>
                                Invoice No:
                              </Form.Label>
                            </Form.Group>
                          </td>
                          <td>
                            <Form.Group style={{ display: "flex" }}>
                              <Form.Control
                                type="text"
                                placeholder="Invoice No"
                                name="invnoo"
                                className="form-control"
                                value={values.invnoo}
                                style={{ height: "24px", width: "170px" }}
                                onChange={handleInputChange}
                                onKeyDown={(e) =>
                                  handleEnterKeyPress(warrty, e)
                                }
                                ref={invoice}
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
                                value={selectedStatus}
                                onChange={(e) =>
                                  setSelectedStatus(e.target.value)
                                }
                                style={{
                                  height: "30px",
                                  width: "60px",
                                  fontSize: "11px",
                                }}
                                onKeyDown={(e) =>
                                  handleEnterKeyPress(complaint, e)
                                }
                                ref={warrty}
                                //  onKeyDown={(e) => handleEnterKeyPress(buttonRef, e)} // Move to the next input on Enter key press
                                //   ref={statusRef}
                              >
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                              </Form.Control>
                            </Form.Group>
                          </td>
                        </tr>
                        {/* ///////////////// 11 row */}

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
                              <Select
                                options={dataCom.map((item) => ({
                                  value: item.comid,
                                  label: item.comdsc,
                                }))}
                                onChange={(selectedOption) => {
                                  setSelectedComplainId(selectedOption.value);
                                }}
                                onKeyDown={(e) =>
                                  handleEnterKeyPress(remarks, e)
                                }
                                ref={complaint}
                                isSearchable
                                placeholder="Select a Complaint..."
                                styles={{
                                  control: (provided, state) => ({
                                    ...provided,
                                    border: state.isFocused
                                      ? "1px solid #007bff"
                                      : "1px solid #ced4da",
                                    boxShadow: state.isFocused
                                      ? "0 0 0 0.2rem rgba(0, 123, 255, 0.25)"
                                      : "none",
                                    height: "2rem",
                                    fontSize: "12px",
                                    width: "200px",
                                  }),
                                  menu: (provided) => ({
                                    ...provided,
                                    maxHeight: "150px",
                                    fontSize: "12px",
                                  }),
                                  option: (provided, state) => ({
                                    ...provided,
                                    backgroundColor: state.isFocused
                                      ? "#007bff"
                                      : "white",
                                    color: state.isFocused ? "white" : "black",
                                    fontSize: "10px",
                                  }),
                                }}
                              />
                            </Form.Group>
                          </td>
                          <td></td>
                          <td></td>
                        </tr>

                        {/* ///////////////// 12 row */}

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
                              <Form.Label style={{ marginRight: "10px" }}>
                                Remarks:
                              </Form.Label>
                            </Form.Group>
                          </td>
                          <td>
                            <Form.Group style={{ display: "flex" }}>
                              <Form.Control
                                as="textarea" // Set the input type to textarea
                                rows={4} // Specify the number of rows (adjust as needed)
                                placeholder="Remarks"
                                name="remarkss"
                                className="form-control"
                                value={values.remarkss}
                                style={{ width: "270px" }}
                                onChange={handleInputChange}
                                onKeyDown={(e) =>
                                  handleEnterKeyPress(subnitbutton, e)
                                }
                                ref={remarks}
                              />
                            </Form.Group>
                          </td>
                          <td></td>
                          <td></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
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
                  onClick={handleFormSubmit}
                  // onKeyDown={(e) => handleEnterKeyPress(statusRef, e)}
                  ref={subnitbutton}
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

export default Add_ComplainSheet;
