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
const Get_Area = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState({ columns: [], rows: [] });
  const { primaryColor, secondaryColor } = useTheme();
  const { apiLinks } = useTheme();
  const imageurl = `https://www.crystalsolutions.com.pk/csart/itemimage/`;
  const [Length, setLength] = useState("");

  const handleMenuItemClick = () => {
    navigate("/Add_Area");
  };

  useEffect(() => {
    fetch(`${apiLinks}/GetArea.php`)
      .then((response) => response.json())
      .then((apiData) => {
        const transformedData = apiData.map((item) => ({
          areaid: item.areaid,
          taredsc: item.taredsc,
          techid: item.techid,
          tarests: item.tarests,
        }));

        const columns = [
          { label: "ID", field: "areaid", sort: "asc" },
          { label: "Desription ", field: "taredsc", sort: "asc" },
          { label: "Techid ", field: "taredsc", sort: "asc" },
          { label: "Status ", field: "tarests", sort: "asc" },
        ];

        setData({ columns, rows: transformedData });
        setLength(apiData.length);
        console.log(apiData); // Log the fetched data
      })
      .catch((error) => console.error(error));
  }, []);

  const filteredRows = data.rows.filter(
    (row) =>
      (row.taredsc &&
        row.taredsc.toLowerCase().includes(searchText.toLowerCase())) ||
      (row.tarests &&
        row.tarests.toLowerCase().includes(searchText.toLowerCase()))
  );
  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };
  ///////////////// here is our Search Function

  const [selectedRow, setSelectedRow] = useState(null);

  const handleRowClick = (row) => {
    if (selectedRow === row.areaid) {
      // If the clicked row is already selected, navigate to the update screen
      navigate(`/Update_Area/${row.areaid}`);
    } else {
      // Set the selectedRow state to the clicked row id
      setSelectedRow(row.areaid);
    }
  };


  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  const rowHeight = 40; // Set this value based on your actual row height

// Calculate the number of rows based on 70% of the viewport height
const numberOfRows = Math.floor((0.7 * windowHeight) / rowHeight);

// Generate the rows dynamically
const blankRows = Array.from({ length: Math.max(0, numberOfRows - filteredRows.length) }).map((_, index) => (
  <tr key={`blank-${index}`}>
    {Array.from({ length: 4 }).map((_, colIndex) => (
      <td key={`blank-${index}-${colIndex}`}>&nbsp;</td>
    ))}
  </tr>
));
  return (
    <>
      <Header />
      <PathHead
        pageName="File > Area Maintenance"
        screen="Get_Item"
        pageLink="/MainPage"
      />

      <div className="col-12" style={{ color: secondaryColor }}>
        <br />
        <div
          className="Area"
          style={{
            // marginLeft: "30%",
            // marginRight: "30%",
            // maxWidth: "40%",
            padding: "20px",
            border: "1px solid gray",backgroundColor: "white",
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
              maxHeight="66vh"
              striped
              bordered
              small
              responsive
            >
              {/* <MDBTableHead columns={data.columns} /> */}
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
                        textAlign: "center",
                        zIndex: 1,
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
                    {Object.keys(row).map((key, columnIndex) => {
                      return (
                        <td
                          key={key}
                          style={{
                            textAlign:
                              columnIndex === 1
                                ? "left"
                                : // : columnIndex === 2 || columnIndex === 4 || columnIndex === 5 || columnIndex === 6
                                  // ? 'right'
                                  "center",

                            width:
                              columnIndex === 0
                                ? "1%"
                                : columnIndex === 1
                                ? "65%"
                                : columnIndex === 2
                                ? "3%"
                                : "auto",
                          }}
                        >
                          {key === "tusrpwd" ? "*****" : row[key]}
                        </td>
                      );
                    })}
                  </tr>
                ))}
                {/* {Array.from({ length: Math.max(0, 11 - filteredRows.length) }).map((_, index) => (
        <tr key={`blank-${index}`}>
          {Array.from({ length: 4 }).map((_, colIndex) => (
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

export default Get_Area;
