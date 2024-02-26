import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MDBTable, MDBTableBody, MDBTableFoot, MDBTableHead } from "mdbreact";
import Header from "../../../MainComponent/Header/Header";
import Footer from "../../../MainComponent/Footer/Footer";
import { useTheme } from "../../../../ThemeContext";
import PathHead from "../../../MainComponent/PathHead/PathHead";
import Edit from "../../../../image/edit.png";
import {
  Card,
  Row,
  Col,
  Button,
  FormControl,
  InputGroup,
  Form,
} from "react-bootstrap";
import "../../../Table.css";
const Get_Installer = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState({ columns: [], rows: [] });
  const { primaryColor, secondaryColor } = useTheme();
  const { apiLinks } = useTheme();
  const imageurl = `https://www.crystalsolutions.com.pk/csart/itemimage/`;
  const [Length, setLength] = useState("");

  const handleMenuItemClick = () => {
    navigate("/Add_Installer");
  };
 
  useEffect(() => {
    fetch(`${apiLinks}/GetInstaller.php`)
      .then((response) => response.json())
      .then((apiData) => {
        const transformedData = apiData.map((item) => ({
          instid: item.instid,
          instdsc: item.instdsc,
          instcontact: item.instcontact,
          // instadd1: item.instadd1,
          // instadd2: item.instadd2,
          instphone: item.instphone,
          instmobile: item.instmobile,
          // techsms: item.techsms,
          instemail: item.instemail,
          // tech_semail: item.tech_semail,
          inststatus: item.inststatus,
        }));

        const columns = [
          { label: "ID", field: "id", sort: "asc" },
          { label: "Desription ", field: "TItmDsc", sort: "asc" },
          { label: "Contact Person", field: "itmdscurd", sort: "asc" },
          // { label: "Address1", field: "TItmSts", sort: "asc" },
          // { label: "Address2", field: "TPurRat", sort: "asc" },
          { label: "Phone No. ", field: "TSalRat", sort: "asc" },
          { label: "Mobile No.", field: "itmdis", sort: "asc" },
          // { label: "Sms ", field: "TItmSts", sort: "asc" },
          { label: "Email", field: "TPurRat", sort: "asc" },
          // { label: "Email Sts ", field: "TSalRat", sort: "asc" },
          { label: "Status", field: "itmdis", sort: "asc" },
        ];

        setData({ columns, rows: transformedData });
        setLength(apiData.length);

        console.log(apiData); // Log the fetched data
      })
      .catch((error) => console.error(error));
  }, []);
  const filteredRows = data.rows.filter(
    (row) =>
      (row.instdsc &&
        row.instdsc.toLowerCase().includes(searchText.toLowerCase())) ||
      (row.instmobile &&
        row.instmobile.toLowerCase().includes(searchText.toLowerCase())) ||
      (row.inststatus &&
        row.inststatus.toLowerCase().includes(searchText.toLowerCase()))
  );

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };
  ///////////////// here is our Search Function

  const [selectedRow, setSelectedRow] = useState(null);

  const handleRowClick = (row) => {
    if (selectedRow === row.instid) {
      // If the clicked row is already selected, navigate to the update screen
      navigate(`/Update_Installer/${row.instid}`);
    } else {
      // Set the selectedRow state to the clicked row id
      setSelectedRow(row.instid);
    }
  };



  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  const rowHeight = 40; // Set this value based on your actual row height

// Calculate the number of rows based on 70% of the viewport height
const numberOfRows = Math.floor((0.7 * windowHeight) / rowHeight);

// Generate the rows dynamically
const blankRows = Array.from({ length: Math.max(0, numberOfRows - filteredRows.length) }).map((_, index) => (
  <tr key={`blank-${index}`}>
    {Array.from({ length: 7 }).map((_, colIndex) => (
      <td key={`blank-${index}-${colIndex}`}>&nbsp;</td>
    ))}
  </tr>
));
  return (
    <>
      <Header />
      <PathHead
        pageName="File > Installer Maintenance"
        screen="Get_Item"
        pageLink="/MainPage"
      />

      <div className="col-12" style={{ color: secondaryColor }}>
        <br />
        <div
          className="Installer"
          style={{
            // marginLeft: "20%",
            // marginRight: "20%",
            // maxWidth: "60%",
            padding: "20px",
            border: "1px solid gray",
            backgroundColor: "white",
          }}
        >
          <Row>
            <Col xs={12} sm={4} md={4} lg={4} xl={2}>
              <Button
                className="btn btn-primary"
                style={{
                  backgroundColor: primaryColor,
                  fontSize: "11px",
                  color: secondaryColor,
                  width: "100%",
                  marginBottom: "10px",
                }}
                onClick={handleMenuItemClick}
              >
                ADD
              </Button>
            </Col>

            <Col xs={12} sm={4} md={4} lg={4} xl={{ span: 3, offset: 7 }}>
              <Form.Control
                type="text"
                placeholder="Search..."
                value={searchText}
                onChange={handleSearchChange}
              />
            </Col>
          </Row>

          <div
            style={{
              fontSize: "12px",
              fontFamily: "Verdana",
              width: "100%",
              overflowX: "auto",
            }}
          >
            <MDBTable
              scrollY
              maxHeight="60vh"
              striped
              bordered
              small
              responsive
            >
              <MDBTableHead>
                <tr>
                  {data.columns.map((column, columnIndex) => (
                    <th
                      key={columnIndex}
                      style={{
                        backgroundColor: primaryColor,
                        color: secondaryColor,
                        fontWeight: "bold",
                        position: "sticky",
                        top: -1,
                        //  border:'none',
                        zIndex: 1,
                        textAlign: "center",
                      }}
                    >
                      {column.label}
                    </th>
                  ))}
                </tr>
              </MDBTableHead>

              <MDBTableBody>
                {filteredRows.map((row, index) => (
                  <tr key={index} onClick={() => handleRowClick(row)}>
                    {Object.keys(row).map((key, columnIndex) => (
                      <td
                        key={key}
                        style={{
                          textAlign:
                            columnIndex === 1 ||
                            columnIndex === 2 ||
                            columnIndex === 5 ||
                            columnIndex === 6
                              ? "left"
                              : columnIndex === 3 || columnIndex === 4
                              ? "right"
                              : "center",
                          width:
                            columnIndex === 0
                              ? "1%"
                              : columnIndex === 1
                              ? "15%"
                              : columnIndex === 2
                              ? "15%"
                              : columnIndex === 3
                              ? "10%"
                              : columnIndex === 4
                              ? "10%"
                              : columnIndex === 5
                              ? "12%"
                              : columnIndex === 6
                              ? "1%"
                              : "auto",
                        }}
                      >
                        {key === "tusrpwd" ? "*****" : row[key]}
                      </td>
                    ))}
                  </tr>
                ))}
      {/* {Array.from({ length: Math.max(0, 11 - filteredRows.length) }).map((_, index) => (
        <tr key={`blank-${index}`}>
          {Array.from({ length: 7 }).map((_, colIndex) => (
            <td key={`blank-${index}-${colIndex}`}>&nbsp;</td>
          ))}
        </tr>
      ))} */}
      {blankRows}
              </MDBTableBody>
              <MDBTableFoot
                style={{ position: "sticky", bottom: 0, zIndex: 2 }}
              >
                <tr>
                  <th
                    style={{
                      backgroundColor: primaryColor,
                      color: secondaryColor,

                      textAlign: "left",
                    }}
                  ></th>
                  <th
                    colSpan={6}
                    style={{
                      backgroundColor: primaryColor,
                      color: secondaryColor,

                      textAlign: "left",
                    }}
                  >
                    {Length}
                  </th>
                </tr>
              </MDBTableFoot>
            </MDBTable>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Get_Installer;
