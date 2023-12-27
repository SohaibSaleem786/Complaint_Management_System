import PathHead from "../../MainComponent/PathHead/PathHead";
import Header from "../../MainComponent/Header/Header";
import Footer from "../../MainComponent/Footer/Footer";
import { useTheme } from "../../../ThemeContext";

import { MDBTable, MDBTableBody, MDBTableHead, MDBTableFoot } from "mdbreact";

import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Alert from "@mui/material/Alert";

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Item_Sheet() {
  const [values, setValues] = useState({
    itemid: "",
    itemDscc: "",
    itemDscUrdd: "",
    itmremarkss: "",
    itmindexx: "",
    itemStss: "",
    purRatee: "",
    discontt: " ",
    saleRatee: "",
    categoryIdd: "",
    typee: "",
    titmspll: "",
    pic: "",
    loading: false,
  });
  const navigate = useNavigate();
  const [selectedStatus, setSelectedStatus] = useState("Yes");
  const [selectedStatus2, setSelectedStatus2] = useState("Yes");

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
  const [selectedImage1, setSelectedImage1] = useState(null);
  const [selectedImage2, setSelectedImage2] = useState(null);
  const [selectedImage3, setSelectedImage3] = useState(null);

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
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleImageChange1 = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage1(file);
      const imgElement = document.getElementById("pic-preview");
      imgElement.src = URL.createObjectURL(file);
    }
  };
  const handleImageChange2 = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage2(file);
      const imgElement = document.getElementById("pic2-preview");
      imgElement.src = URL.createObjectURL(file);
    }
  };
  const handleImageChange3 = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage3(file);
      const imgElement = document.getElementById("pic3-preview");
      imgElement.src = URL.createObjectURL(file);
    }
  };
  {
    /* ////////////////////////  DUE TO GET DATA OF CATEGORY ////////////////////////// */
  }

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
        const response = await fetch(
          `https://www.crystalsolutions.com.pk/malikspicy/get_uom.php`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const apiData = await response.json();
        setData1(apiData);

        // Set the selectedCategoryId with the first category ID from the API data
        if (apiData.length > 0) {
          setSelectedUnitId(apiData[0].uomid);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  const UserId = 33;

  const [nextItemId, setNextItemId] = useState(""); // Initialize the next TItmId

  {
    /* ////////////////////////  CALL API TO POST DATA ////////////////////////// */
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const value = {
      itemStss: selectedStatus,
      categoryIdd: selectedStatus1,
      typee: selectedType,
      titmspll: selectedStatus2,
    };
    setValues((prevState) => ({
      ...prevState,
      loading: true,
    }));

    try {
      const formData = new FormData();
      // formData.append("itmId", values.itemid);
      formData.append("itemDsc", values.itemDscc);
      formData.append("itemDscUrd", values.itemDscUrdd);
      formData.append("itmremarks", values.itmremarkss);
      formData.append("itmindex", values.itmindexx);

      formData.append("itemSts", value.itemStss);
      formData.append("purRate", values.purRatee);
      formData.append("saleRate", values.saleRatee);
      formData.append("discont", values.discontt);
      formData.append("categoryId", selectedCategoryId);
      // formData.append("type", value.typee);
      formData.append("titmspl", value.titmspll);
      formData.append("pic", selectedImage1);
      formData.append("pic2", selectedImage2);
      formData.append("pic3", selectedImage3);

      console.log("FormData data:");
      console.log("itmId:", nextItemId);
      console.log("itemDsc:", values.itemDscc);
      console.log("itemDscUrd:", values.itemDscUrdd);
      console.log("itmremarks:", values.itmremarkss);
      console.log("itmindex:", values.itmindexx);
      console.log("itemSts:", value.itemStss);
      console.log("purRate:", values.purRatee);
      console.log("saleRate:", values.saleRatee);
      console.log("discont:", values.discontt);
      console.log("categoryId:", selectedCategoryId);
      console.log("type:", value.typee);
      console.log("titmspl:", value.titmspll);
      console.log("pic:", selectedImage1);
      console.log("pic2:", selectedImage2);
      console.log("pic3:", selectedImage3);

      // formData.append('FUsrId', UserId);
      const response = await axios
        .post(
          `https://www.crystalsolutions.com.pk/csart/add_item.php`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              // 'Content-Type': 'application/json;charset=UTF-8',
            },
          }
        )
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
          navigate("/Get_Installer");
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
      setSelectedImage1(null); // Clear the selected image

      setAlert("Image uploaded successfully.");
      navigate("/Item");
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

  ////////////////////////get item id show them in inout field//////////////////////////
  const [item, setItem] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://www.crystalsolutions.com.pk/csart/get_item.php`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const apiData = await response.json();
        setItem(apiData);

        // Find the maximum TItmId in the existing data
        const maxItemId = Math.max(
          ...apiData.map((item) => parseInt(item.TItmId))
        );
        // Set the nextItemId to be one greater than the maximum TItmId
        setNextItemId(maxItemId + 1);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  // Function to handle adding new data
  const handleAddData = () => {
    const newData = {
      TItmId: String(nextItemId), // Convert to string
      // Add other properties as needed
    };

    // Update the state with the new data
    setItem([...item, newData]);

    // Increment the nextItemId for the next addition
    setNextItemId(nextItemId + 1);
  };

  /////////////////////////////////////////////////////////////////////////////////////////////

  const [totalQuantity, setTotalQuantity] = useState(0);

  const lastInputRef = useRef(null);

  const calculateAmount = (quantity, Purchase) => {
    const parsedQuantity = parseFloat(quantity) || 0;
    const parsedPurchase = parseFloat(Purchase) || 0;
    return (parsedQuantity * parsedPurchase).toFixed(2);
  };

  const [totalAmount, setTotalAmount] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [filteredItemData, setFilteredItemData] = useState([]);

  const calculateTotals = () => {
    let quantityTotal = 0;
    let amountTotal = 0;

    tableData.forEach((rowData) => {
      const quantity = parseFloat(rowData.quantity || 0);
      const purchase = parseFloat(rowData.Purchase || 0);
      quantityTotal += quantity;
      amountTotal += quantity * purchase;
    });

    setTotalQuantity(quantityTotal);
    // Format the amount with commas using toLocaleString
    setTotalAmount(amountTotal.toLocaleString()); // Format the amount with commas
  };

  const [tableData, setTableData] = useState([
    { name: "", quantity: "", Purchase: "", Amount: "" },
  ]);

  const [itemdata, setitemdata] = useState([]);

  useEffect(() => {
    fetch(`${apiLinks}/get_item.php`)
      .then((response) => response.json())
      .then((apiData) => {
        const transformedData = apiData.map((item) => ({
          TItmId: item.TItmId,
          TItmDsc: item.TItmDsc,
          uom: item.uom,
          TPurRat: item.TPurRat,
        }));

        setitemdata(transformedData);

        console.log(apiData); // Log the fetched data
      })
      .catch((error) => console.error(error));
  }, []);

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };
  const [selectedItemData, setSelectedItemData] = useState({
    TItmId: "",
    TItmDsc: "",
    TPurRat: "",
    uom: "",
  });

  // Add the following state variables at the beginning of your component
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);

  // Modify the handleInputChange1 function to handle item selection and update the first row
  const handleInputChange1 = (event, rowIndex) => {
    const { name, value } = event.target;
    const updatedTableData = [...tableData];

    if (name === "name") {
      const selectedItem = itemdata.find((item) => item.TItmId === value);

      if (selectedItem) {
        updatedTableData[rowIndex] = {
          ...updatedTableData[rowIndex],
          name: selectedItem.TItmId,
          Desctiption: selectedItem.TItmDsc,
          Unit: selectedItem.uom,
          Purchase: selectedItem.TPurRat,
          Amount: calculateAmount(
            updatedTableData[rowIndex].quantity,
            selectedItem.TPurRat
          ),
        };
      }
    } else {
      updatedTableData[rowIndex] = {
        ...updatedTableData[rowIndex],
        [name]: value,
      };

      if (name === "quantity" || name === "Purchase") {
        const quantity = parseFloat(updatedTableData[rowIndex].quantity || 0);
        const Purchase = parseFloat(updatedTableData[rowIndex].Purchase || 0);
        updatedTableData[rowIndex].Amount = (quantity * Purchase).toFixed(2);
      }
    }

    setTableData(updatedTableData);
    calculateTotals();
  };

  // Add event listeners to the input fields of the last row
  // Add event listeners to the input fields of the last row
  // Add event listeners to the input fields of the last row
  // Add event listeners to the input fields of the last row
  // Add event listeners to the input fields of the last row
  const addNewRow = () => {
    setTableData([
      ...tableData,
      { name: "", quantity: "", Purchase: "", Amount: "" },
    ]);
  };

  const [selectedRowIndex, setSelectedRowIndex] = useState(null);

  const handleRowClick = (rowData, rowIndex) => {
    // Create a copy of the current tableData
    const updatedTableData = [...tableData];

    // if (rowIndex >= 0 && rowIndex < updatedTableData.length) {
    if (rowIndex >= 0 && rowIndex < "100000000") {
      updatedTableData[updatedTableData.length - 1] = {
        ...updatedTableData[updatedTableData.length - 1],
        name: rowData.TItmId,
        Desctiption: rowData.TItmDsc,
        Unit: rowData.uom,
        Purchase: rowData.TPurRat,
        Amount: calculateAmount(
          updatedTableData[updatedTableData.length - 1].quantity,
          rowData.TPurRat
        ),
      };
    }

    // Update the state with the modified tableData
    setTableData(updatedTableData);
    calculateTotals();
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
        {alertData && (
          <Alert
            severity={alertData.type}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "30%",
              marginLeft: "35%",
              zIndex: 1000,
              textAlign: "center",
            }}
          >
            {alertData.message}
          </Alert>
        )}
        <Header />

        <PathHead
          pageName="File > Item Sheet "
          screen="Item"
          pageLink="/MainPage"
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
                width: "100%",
                maxWidth: "750px",
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
                                Sheet#:
                              </Form.Label>
                            </Form.Group>
                          </td>
                          <td>
                            <Form.Group style={{ display: "flex" }}>
                              <Form.Control
                                as="select"
                                name="itemStss"
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
                              >
                                <option value="000718">000718</option>
                                <option value="000719">000719</option>
                              </Form.Control>
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
                                Person:
                              </Form.Label>
                            </Form.Group>
                          </td>
                          <td>
                            <Form.Group
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <Form.Control
                                type="text"
                                placeholder="Person"
                                name="itmindexx"
                                className="form-control"
                                value={values.itmindexx}
                                style={{ height: "24px" }}
                                onChange={handleInputChange}
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
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <Form.Label style={{ marginRight: "10px" }}>
                                Referance:
                              </Form.Label>
                            </Form.Group>
                          </td>
                          <td>
                            <Form.Group
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <Form.Control
                                type="text"
                                placeholder="Referance"
                                name="itemDscc"
                                className="form-control"
                                value={values.itemDscc}
                                style={{ height: "24px" }}
                                onChange={handleInputChange}
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
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <Form.Label style={{ marginRight: "10px" }}>
                                Customer:
                              </Form.Label>
                            </Form.Group>
                          </td>
                          <td>
                            <Form.Group
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <Form.Control
                                type="text"
                                placeholder="Customer"
                                name="itemDscc"
                                className="form-control"
                                value={values.itemDscc}
                                style={{ height: "24px" }}
                                onChange={handleInputChange}
                              />
                            </Form.Group>
                          </td>
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
                                name="itemDscc"
                                className="form-control"
                                value={values.itemDscc}
                                style={{ height: "24px" }}
                                onChange={handleInputChange}
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
                                name="itemDscc"
                                className="form-control"
                                value={values.itemDscc}
                                style={{ height: "24px" }}
                                onChange={handleInputChange}
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
                              style={{ display: "flex", alignItems: "center" }}
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
                                placeholder="Mobile"
                                name="itemDscc"
                                className="form-control"
                                value={values.itemDscc}
                                style={{ height: "24px" }}
                                onChange={handleInputChange}
                              />
                            </Form.Group>
                          </td>
                          <td></td>
                          <td></td>
                        </tr>

                        {/* ///////////////// 8 row */}
                      </tbody>
                    </table>

                    <div
                      style={{
                        marginLeft: "10%",
                        width: "80%",
                        height: "150px",
                        fontSize: "11px",
                      }}
                    >
                      <MDBTable
                        responsive
                        striped
                        bordered
                        hover
                        maxHeight="15rem"
                      >
                        <MDBTableHead>
                          <tr>
                            <th
                              style={{
                                backgroundColor: primaryColor,
                                color: secondaryColor,
                                fontWeight: "bold",
                                position: "sticky",
                                top: -1,
                                zIndex: 1,
                                border: "1px solid #000",
                                width: "2%",
                                textAlign: "center",
                              }}
                            >
                              Sr#
                            </th>
                            <th
                              style={{
                                backgroundColor: primaryColor,
                                color: secondaryColor,
                                fontWeight: "bold",
                                position: "sticky",
                                top: -1,
                                zIndex: 1,
                                border: "1px solid #000",
                                width: "5%",
                                textAlign: "center",
                              }}
                            >
                              Item
                            </th>
                            <th
                              style={{
                                backgroundColor: primaryColor,
                                color: secondaryColor,
                                width: "20%",
                                fontWeight: "bold",
                                position: "sticky",
                                top: -1,
                                zIndex: 1,
                                border: "1px solid #000",
                                width: "30%",
                                textAlign: "center",
                              }}
                            >
                              Description
                            </th>
                            <th
                              style={{
                                backgroundColor: primaryColor,
                                color: secondaryColor,
                                fontWeight: "bold",
                                position: "sticky",
                                top: -1,
                                zIndex: 1,
                                border: "1px solid #000",
                                width: "10%",
                                textAlign: "center",
                              }}
                            >
                              Quantity
                            </th>
                            <th
                              style={{
                                backgroundColor: primaryColor,
                                color: secondaryColor,
                                fontWeight: "bold",
                                position: "sticky",
                                top: -1,
                                zIndex: 1,
                                border: "1px solid #000",
                                width: "10%",
                                textAlign: "center",
                              }}
                            >
                              Amount
                            </th>
                          </tr>
                        </MDBTableHead>
                        <MDBTableBody>
                          {tableData.map((rowData, index) => (
                            <tr key={index}>
                              <td
                                style={{
                                  border: "1px solid #000",
                                  padding: "8px",
                                  textAlign: "center",
                                }}
                              >
                                {index + 1}
                              </td>
                              <td
                                style={{
                                  border: "1px solid #000",
                                  padding: "8px",
                                  textAlign: "center",
                                }}
                              >
                                <input
                                  type="text"
                                  name="name"
                                  placeholder="ID"
                                  value={rowData.name}
                                  onChange={(e) => handleInputChange1(e, index)}
                                  style={{
                                    width: "100%",
                                    border: "none",
                                    backgroundColor: "transparent",
                                    textAlign: "center",
                                  }}
                                  // ref={index === tableData.length - 1 ? lastInputRef : null}
                                />
                              </td>
                              <td
                                style={{
                                  border: "1px solid #000",
                                  padding: "8px",
                                  textAlign: "center",
                                }}
                              >
                                <input
                                  type="text"
                                  name="Desctiption"
                                  placeholder="Description"
                                  value={rowData.Desctiption}
                                  onChange={(e) => handleInputChange1(e, index)}
                                  style={{
                                    width: "100%",
                                    border: "none",
                                    backgroundColor: "transparent",
                                    textAlign: "left",
                                  }}
                                />
                              </td>

                              <td
                                style={{
                                  border: "1px solid #000",
                                  padding: "8px",
                                  textAlign: "center",
                                  background: "#f5f5f5",
                                }}
                              >
                                <input
                                  type="number"
                                  name="quantity"
                                  placeholder="Quantity"
                                  value={rowData.quantity}
                                  onChange={(e) => handleInputChange(e, index)}
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                      e.preventDefault(); // Prevent the default behavior of "Enter"
                                      addNewRow(); // Add a new row
                                      if (lastInputRef.current) {
                                        lastInputRef.current.focus();
                                      }
                                    }
                                  }}
                                  style={{
                                    width: "100%",
                                    border: "none",
                                    backgroundColor: "transparent",
                                    textAlign: "center",
                                  }}
                                />
                              </td>

                              <td
                                style={{
                                  border: "1px solid #000",
                                  padding: "8px",
                                  textAlign: "center",
                                  background: "#f5f5f5",
                                }}
                              >
                                <input
                                  type="text" // Change type to "text" to display formatted number
                                  name="Amount"
                                  placeholder="Amount"
                                  value={rowData.Amount.toLocaleString()}
                                  onChange={(e) => handleInputChange(e, index)}
                                  style={{
                                    width: "100%",
                                    border: "none",
                                    backgroundColor: "transparent",
                                    textAlign: "center",
                                  }}
                                />
                              </td>
                            </tr>
                          ))}
                        </MDBTableBody>
                        <MDBTableFoot
                          style={{ position: "sticky", bottom: 0, zIndex: 2 }}
                        >
                          <tr>
                            <td
                              style={{
                                backgroundColor: primaryColor,
                                color: secondaryColor,
                                fontWeight: "bold",
                                border: "1px solid #000",
                              }}
                            ></td>
                            <td
                              style={{
                                backgroundColor: primaryColor,
                                color: secondaryColor,
                                fontWeight: "bold",
                                border: "1px solid #000",
                              }}
                            ></td>
                            <td
                              style={{
                                backgroundColor: primaryColor,
                                color: secondaryColor,
                                fontWeight: "bold",
                                border: "1px solid #000",
                              }}
                            ></td>
                            <td
                              style={{
                                backgroundColor: primaryColor,
                                color: secondaryColor,
                                fontWeight: "bold",
                                border: "1px solid #000",
                                textAlign: "center",
                              }}
                            >
                              {totalQuantity}
                            </td>
                            <td
                              style={{
                                backgroundColor: primaryColor,
                                color: secondaryColor,
                                fontWeight: "bold",
                                position: "sticky",
                                border: "1px solid #000",
                                textAlign: "center",
                              }}
                            >
                              {totalAmount || ".00"}
                            </td>
                          </tr>
                        </MDBTableFoot>
                      </MDBTable>
                    </div>

                    <table>
                      <tbody>
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
                                name="itmremarkss"
                                className="form-control"
                                value={values.itmremarkss}
                                style={{ width: "270px" }}
                                onChange={handleInputChange}
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
                  onClick={handleFormSubmit}
                >
                  SUBMIT
                </Button>
                {/* <Button
                  className="btn btn-primary"
                  onClick={() => navigate("/Get_Item")}
                  style={{
                    backgroundColor: primaryColor,
                    height: "4%",
                    fontSize: "11px",
                    color: secondaryColor,
                    width: "25%",
                    marginRight: "2%",
                  }}
                >
                  Return
                </Button> */}
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

export default Item_Sheet;

// function Item_Sheet() {
//   const [values, setValues] = useState({
//     itemid: "",
//     itemDscc: "",
//     itemDscUrdd:'',
//     itmremarkss:'',
//     itmindexx:'',
//     itemStss: "",
//     purRatee: "",
//     discontt:" ",
//     saleRatee: "",
//     categoryIdd: "",
//     typee: "",
//     titmspll:'',
//     pic:'',
//     loading: false,
//   });
//   const navigate = useNavigate();
//   const [selectedStatus, setSelectedStatus] = useState("Yes");
//   const [selectedStatus2, setSelectedStatus2] = useState("Yes");

//   const [selectedStatus1, setSelectedStatus1] = useState("");
//   const [selectedCategoryId, setSelectedCategoryId] = useState("Startup");
//   const [selectedUnitId, setSelectedUnitId] = useState("Startup");

//   const [alertData, setAlertData] = useState(null);
//   const { secondaryColor ,apiLinks } = useTheme();

//   const [selectedType, setSelectedType] = useState("Item Purchase");
//   const [selectedUnit, setSelectedUnit] = useState("Quantity");

//   const [data, setData] = useState([]);
//   const [data1, setData1] = useState([]);

//   const [alert, setAlert] = useState(null);
//   const [selectedImage1, setSelectedImage1] = useState(null);
//   const [selectedImage2, setSelectedImage2] = useState(null);
//   const [selectedImage3, setSelectedImage3] = useState(null);

//   const { primaryColor } = useTheme();

//   const handleInputChange = (e) => {
//     setValues({ ...values, [e.target.name]: e.target.value });
//   };
//   const handleImageChange1 = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setSelectedImage1(file);
//       const imgElement = document.getElementById("pic-preview");
//       imgElement.src = URL.createObjectURL(file);
//     }
//   };
//   const handleImageChange2 = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setSelectedImage2(file);
//       const imgElement = document.getElementById("pic2-preview");
//       imgElement.src = URL.createObjectURL(file);
//     }
//   };
//   const handleImageChange3 = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setSelectedImage3(file);
//       const imgElement = document.getElementById("pic3-preview");
//       imgElement.src = URL.createObjectURL(file);
//     }
//   };
//   {/* ////////////////////////  DUE TO GET DATA OF CATEGORY ////////////////////////// */}

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(`https://www.crystalsolutions.com.pk/csart/get_category.php`);
//         if (!response.ok) {
//           throw new Error('Failed to fetch data');
//         }

//         const apiData = await response.json();
//         setData(apiData);

//         // Set the selectedCategoryId with the first category ID from the API data
//         if (apiData.length > 0) {
//           setSelectedCategoryId(apiData[0].tctgid);
//         }
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchData();
//   }, []);
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(`https://www.crystalsolutions.com.pk/malikspicy/get_uom.php`);
//         if (!response.ok) {
//           throw new Error('Failed to fetch data');
//         }

//         const apiData = await response.json();
//         setData1(apiData);

//         // Set the selectedCategoryId with the first category ID from the API data
//         if (apiData.length > 0) {
//           setSelectedUnitId(apiData[0].uomid);
//         }
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchData();
//   }, []);
//   const UserId = 33;

//   const [nextItemId, setNextItemId] = useState(''); // Initialize the next TItmId

//   {/* ////////////////////////  CALL API TO POST DATA ////////////////////////// */}

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();

//     const value = {
//       itemStss: selectedStatus,
//       categoryIdd: selectedStatus1,
//       typee: selectedType,
//       titmspll:selectedStatus2,
//     };
//     setValues((prevState) => ({
//       ...prevState,
//       loading: true,
//     }));

//     try {
//       const formData = new FormData();
//       // formData.append("itmId", values.itemid);
//       formData.append("itemDsc", values.itemDscc);
//       formData.append("itemDscUrd", values.itemDscUrdd);
//       formData.append("itmremarks", values.itmremarkss);
//       formData.append("itmindex", values.itmindexx);

//       formData.append("itemSts", value.itemStss);
//       formData.append("purRate", values.purRatee);
//       formData.append("saleRate", values.saleRatee);
//       formData.append("discont", values.discontt);
//       formData.append("categoryId", selectedCategoryId);
//       // formData.append("type", value.typee);
//       formData.append("titmspl", value.titmspll);
//       formData.append("pic", selectedImage1);
//       formData.append("pic2", selectedImage2);
//       formData.append("pic3", selectedImage3);

//       console.log("FormData data:");
//       console.log("itmId:", nextItemId);
//       console.log("itemDsc:", values.itemDscc);
//       console.log("itemDscUrd:", values.itemDscUrdd);
//       console.log("itmremarks:", values.itmremarkss);
//       console.log("itmindex:", values.itmindexx);
//       console.log("itemSts:", value.itemStss);
//       console.log("purRate:", values.purRatee);
//       console.log("saleRate:", values.saleRatee);
//       console.log("discont:", values.discontt);
//       console.log("categoryId:", selectedCategoryId);
//       console.log("type:", value.typee);
//       console.log("titmspl:", value.titmspll);
//       console.log("pic:", selectedImage1);
//       console.log("pic2:", selectedImage2);
//       console.log("pic3:", selectedImage3);

//       // formData.append('FUsrId', UserId);
//       const response = await axios.post(
//         `https://www.crystalsolutions.com.pk/csart/add_item.php`,
//         formData,
//         {
//           headers: { "Content-Type": "multipart/form-data",
//           // 'Content-Type': 'application/json;charset=UTF-8',
//         },
//         }
//       )
//       .then((response) => {
//         if (response.data.error === 200) {
//           navigate("/Get_Item");
//           console.log('response data show',response);

//           setAlertData({
//             type: "success",
//             message: `${response.data.message}`,
//           });
//           setTimeout(() => {
//             setAlertData(null);
//           }, 1000);

//         }
//          else {
//           console.log(response.data.message);
//           console.log('response data show',response);

//           setAlertData({
//             type: "error",
//             message: `${response.data.message}`,
//           });
//           setTimeout(() => {
//             setAlertData(null);
//           }, 2000);
//         }
//         navigate("/Get_Item");

//       })
//       .catch((error) => {
//         // Handle errors
//         console.error("Error:", error);
//       });

//       console.log(response.data);
//       // Reset form values after submission
//       setValues({
//         itemid: "",
//         itmindex:'',
//         itmremarks:'',
//         itemDscc: "",
//         itemDscUrdd:"",
//         itmremarkss:'',
//         itemStss: "Yes", // Set the initial value for itemStss
//         purRatee: "",
//         discontt: "", // Set the initial value for discontt
//         saleRatee: "",
//         categoryIdd: data.length > 0 ? data[0].tctgid : "", // Set the initial value for categoryIdd
//         typee: "Item Purchase",
//         uomm: data1.length > 0 ? data1[0].uomid : "",// Set the initial value for typee
//         pic: "",
//         loading: true,
//       });
//       setSelectedStatus("Yes"); // Set the initial value for selectedStatus
//       setSelectedStatus1(""); // Set the initial value for selectedStatus1
//       setSelectedCategoryId(data.length > 0 ? data[0].tctgid : "Startup");
//       setSelectedUnitId(data1.length > 0 ? data1[0].uomid : "KG"); // Set the initial value for selectedCategoryId
//       // Set the initial value for selectedCategoryId
//       setSelectedType("Item Purchase"); // Set the initial value for selectedType
//       setSelectedUnit("Quantity");
//       setSelectedImage1(null); // Clear the selected image

//       setAlert("Image uploaded successfully.");
//       navigate("/Get_Technnical");
//       window.location.reload();

//     } catch (error) {
//       console.error("Error uploading image:", error);
//       setAlert("Error uploading image.");
//     } finally {
//       setValues((prevState) => ({
//         ...prevState,
//         loading: false,
//       }));
//     }
//   };

//   ////////////////////////get item id show them in inout field//////////////////////////
//   const [item, setItem] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(`https://www.crystalsolutions.com.pk/csart/get_item.php`);
//         if (!response.ok) {
//           throw new Error('Failed to fetch data');
//         }

//         const apiData = await response.json();
//         setItem(apiData);

//         // Find the maximum TItmId in the existing data
//         const maxItemId = Math.max(...apiData.map((item) => parseInt(item.TItmId)));
//         // Set the nextItemId to be one greater than the maximum TItmId
//         setNextItemId(maxItemId + 1);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchData();
//   }, []);

//   // Function to handle adding new data
//   const handleAddData = () => {
//     const newData = {
//       TItmId: String(nextItemId), // Convert to string
//       // Add other properties as needed
//     };

//     // Update the state with the new data
//     setItem([...item, newData]);

//     // Increment the nextItemId for the next addition
//     setNextItemId(nextItemId + 1);
//   };
//   return (
//     <>

//        <div
//         style={{
//           position: "relative",
//           width: "100%",
//           height: "100vh",
//           overflow: "hidden",
//         }}
//       >
//         {alertData && (
//           <Alert
//             severity={alertData.type}
//             style={{
//               position: "fixed",
//               top: 0,
//               left: 0,
//               width: "30%",
//               marginLeft: "35%",
//               zIndex: 1000,
//               textAlign: "center",
//             }}
//           >
//             {alertData.message}
//           </Alert>
//         )}
// <Header  />

// <PathHead pageName="File > Item Sheet " screen="Item"  pageLink="/MainPage"/>

//       <div className="col-12" style={{ color: 'black' ,fontFamily: 'Verdana', fontWeight:'bold' }}>

//         <div
//           className="row"
//           style={{
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             padding: "5px",
//             backgroundColor: "#f5f5f5",
//             minHeight: "100vh",
//             overflowY: "scroll", // Enable vertical scrolling
//             height: "calc(100vh - 200px)", // Set an appropriate height
//           }}
//         >
//           <div className="col-md-12 form-container"
//            style={{
//             backgroundColor: "#fff",
//             borderRadius: "10px",
//             boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
//             padding: "10px",
//             width: "100%",
//             maxWidth: "500px",
//             margin: "20px 0",
//             fontSize: '12px'
//           }}
//           >
//             <Form onSubmit={handleFormSubmit}>
//             <div className="row">
//   {/* Left side (label and input field) */}
//   <div className="col-12  ">
//     <br />

// <div className='row'>

//   <div className='col-6'>
//   <Form.Group style={{ display: 'flex', alignItems: 'center' }}>
//   <Form.Label style={{ marginRight: '10px', marginLeft: '6px' }}>Complaint# :</Form.Label>
//   <Form.Control
//     type="text"
//     placeholder="Description"
//     name="itemDscc"
//     className="form-control"
//     value={values.itemDscc}
//     style={{ height: '20px', width: '100px' }}
//     onChange={handleInputChange}
//   />
// </Form.Group>
//   </div>
//   <div  className='col-6'>
//   <Form.Group style={{ display: 'flex', alignItems: 'center' }}>
//   <Form.Label style={{ marginRight: '10px', marginLeft: '6px' }}>Date :</Form.Label>
//   <Form.Control
//     type="text"
//     placeholder="Date"
//     name="itemDscc"
//     className="form-control"
//     value={values.itemDscc}
//     style={{ height: '20px', width: '70px' }}
//     onChange={handleInputChange}
//   />
//   <Form.Control
//     type="text"
//     placeholder="Time"
//     name="itemDscc"
//     className="form-control"
//     value={values.itemDscc}
//     style={{ height: '20px', width: '70px' }}
//     onChange={handleInputChange}
//   />
// </Form.Group>
//   </div>
// </div>
// <hr  style={{marginTop:'-1px',marginBottom:'10px'}}/>

// <Form.Group style={{ display: 'flex', alignItems: 'center', marginTop: '-1%' }}>
//   <Form.Label style={{ marginRight: '10px', marginLeft: '17px' }}>Mobile No:</Form.Label>
//   <Form.Control
//     type="text"
//     placeholder="Mobile No."
//     name="itmindexx"
//     className="form-control"
//     value={values.itmindexx}
//     style={{ height: '20px', width: '170px' }}
//     onChange={handleInputChange}
//   />
// </Form.Group>
// <Form.Group controlId="status" style={{ display: 'flex', alignItems: 'center' }}>
//           <Form.Label style={{ marginRight: '10px', marginLeft: '46px', textAlign: 'right' }}>Type :</Form.Label>
//           <Form.Control
//             as="select"
//             name="itemStss"
//             value={selectedStatus}
//             onChange={(e) => setSelectedStatus(e.target.value)}
//             className="form-control custom-select"
//             style={{ height: '27px', fontSize: '11px', width: '100px' }}
//           >
//             <option value="000718">Work Shop</option>
//             <option value="000719">Gudam</option>
//           </Form.Control>

//         </Form.Group>
// <Form.Group style={{ display: 'flex', alignItems: 'center' }}>
//   <Form.Label style={{ marginRight: '10px', marginLeft: '14px' }}>Customer :</Form.Label>
//   <Form.Control
//     type="text"
//     placeholder="Customer"
//     name="itemDscc"
//     className="form-control"
//     value={values.itemDscc}
//     style={{ height: '20px', width: '170px' }}
//     onChange={handleInputChange}
//   />
// </Form.Group>
// <Form.Group style={{ display: 'flex', alignItems: 'center', marginTop: '-1%' }}>
//   <Form.Label style={{ marginRight: '10px', marginLeft: '28px' }}>Address:</Form.Label>
//   <Form.Control
//     type="text"
//     placeholder="Address"
//     name="itemDscc"
//     className="form-control"
//     value={values.itemDscc}
//     style={{ height: '20px', width: '270px' }}
//     onChange={handleInputChange}
//   />
// </Form.Group>

// <Form.Group style={{ display: 'flex', alignItems: 'center', marginTop: '-1%' }}>
//   <Form.Label style={{ marginRight: '10px', marginLeft: '8px' }}>Contact No:</Form.Label>
//   <Form.Control
//     type="text"
//     placeholder="Contact No."
//     name="itmindexx"
//     className="form-control"
//     value={values.itmindexx}
//     style={{ height: '20px', width: '170px' }}
//     onChange={handleInputChange}
//   />
// </Form.Group>
// <Form.Group style={{ display: 'flex', alignItems: 'center', marginTop: '-1%' }}>
//   <Form.Label style={{ marginRight: '10px', marginLeft: '25px' }}>Location:</Form.Label>
//   <Form.Control
//     type="text"
//     placeholder="location"
//     name="itmindexx"
//     className="form-control"
//     value={values.itmindexx}
//     style={{ height: '20px', width: '170px' }}
//     onChange={handleInputChange}
//   />
// </Form.Group>

// <hr  style={{marginTop:'-1px',marginBottom:'5px'}}/>
// <Form.Group style={{ display: 'flex', alignItems: 'center' }}>
//   <Form.Label style={{ marginRight: '10px', marginLeft: '16px' }}>Product :</Form.Label>
//   <Form.Control
//     type="text"
//     placeholder="Product Id"
//     name="itemDscc"
//     className="form-control"
//     value={values.itemDscc}
//     style={{ height: '20px', width: '100px' }}
//     onChange={handleInputChange}
//   />
//   <Form.Control
//     type="text"
//     placeholder="Product Name"
//     name="itemDscc"
//     className="form-control"
//     value={values.itemDscc}
//     style={{ height: '20px', width: '200px' }}
//     onChange={handleInputChange}
//   />
// </Form.Group>

// <div className='row'>
//   <div className='col-6'>
//   <Form.Group style={{ display: 'flex', alignItems: 'center', marginTop: '-1%' }}>
//   <Form.Label style={{ marginRight: '10px', marginLeft: '25px' }}>Invoice:</Form.Label>
//   <Form.Control
//     type="text"
//     placeholder="Inovice"
//     name="itmindexx"
//     className="form-control"
//     value={values.itmindexx}
//     style={{ height: '20px', width: '100px' }}
//     onChange={handleInputChange}
//   />
// </Form.Group>
//   </div>
//   <div className='col-6'>
//   <Form.Group style={{ display: 'flex', alignItems: 'center', marginTop: '-1%' }}>
//   <Form.Label style={{ marginRight: '10px', marginLeft: '25px' }}>Purchase:</Form.Label>
//   <Form.Control
//     type="text"
//     placeholder="Purchase"
//     name="itmindexx"
//     className="form-control"
//     value={values.itmindexx}
//     style={{ height: '20px', width: '100px' }}
//     onChange={handleInputChange}
//   />
// </Form.Group>
//   </div>
// </div>

// <Form.Group controlId="status" style={{ display: 'flex', alignItems: 'center' }}>
//           <Form.Label style={{ marginRight: '10px', marginLeft: '8px', textAlign: 'right' }}>Warranty :</Form.Label>
//           <Form.Control
//             as="select"
//             name="itemStss"
//             value={selectedStatus}
//             onChange={(e) => setSelectedStatus(e.target.value)}
//             className="form-control custom-select"
//             style={{ height: '27px', fontSize: '11px', width: '100px' }}
//           >
//             <option value="000718">Yes</option>
//             <option value="000719">No</option>
//           </Form.Control>

//         </Form.Group>

//         <Form.Group style={{ display: 'flex', alignItems: 'center', marginTop: '-1%' }}>
//   <Form.Label style={{ marginRight: '10px', marginLeft: '25px' }}>Serial #:</Form.Label>
//   <Form.Control
//     type="text"
//     placeholder="Purchase"
//     name="itmindexx"
//     className="form-control"
//     value={values.itmindexx}
//     style={{ height: '20px', width: '200px' }}
//     onChange={handleInputChange}
//   />
// </Form.Group>

// <Form.Group style={{ display: 'flex', alignItems: 'center', marginTop: '-1%' }}>
//   <Form.Label style={{ marginRight: '10px', marginLeft: '10px' }}>Complaint:</Form.Label>
//   <Form.Control
//     type="text"
//     placeholder="No."
//     name="itmindexx"
//     className="form-control"
//     value={values.itmindexx}
//     style={{ height: '20px', width: '70px' }}
//     onChange={handleInputChange}
//   />
//    <Form.Control
//     type="text"
//     placeholder="Description"
//     name="itmindexx"
//     className="form-control"
//     value={values.itmindexx}
//     style={{ height: '20px', width: '170px' }}
//     onChange={handleInputChange}
//   />
// </Form.Group>
// <hr  style={{marginTop:'-1px',marginBottom:'10px'}}/>

// <Form.Group style={{ display: 'flex', alignItems: 'center', marginTop: '-1%' }}>
//   <Form.Label style={{ marginRight: '10px', marginLeft: '22px' }}>Remarks:</Form.Label>
//   <Form.Control
//     as="textarea" // Set the input type to textarea
//     rows={4} // Specify the number of rows (adjust as needed)
//     placeholder="Remarks"
//     name="itmremarkss"
//     className="form-control"
//     value={values.itmremarkss}
//     style={{ width: '270px' }}
//     onChange={handleInputChange}
//   />
// </Form.Group>

//   </div>

// </div>
// <br />
// <Button
//                     className="btn btn-primary"
//                     style={{
//                       backgroundColor: primaryColor,
//                       height: "4%",
//                       fontSize: "11px",
//                       color: secondaryColor,
//                       width: "25%",
//                       marginRight: "2%",
//                     }}
//                     onClick={handleFormSubmit}
//                   >
//                     SUBMIT
//                   </Button>
//                   {/* <Button
//                 className="btn btn-primary"
//                 onClick={() => navigate("/Get_Item")}
//                 style={{
//                   backgroundColor: primaryColor,
//                   height: "4%",
//                   fontSize: "11px",
//                   color: secondaryColor,
//                   width: "25%",
//                   marginRight: "2%",
//                 }}
//               >
//                 Return
//               </Button> */}
//               </Form>
//           </div>
//         </div>
//         <br />
//       </div>
//       </div>
//       <Footer/>
//     </>
//   );
// }

// export default Item_Sheet;
