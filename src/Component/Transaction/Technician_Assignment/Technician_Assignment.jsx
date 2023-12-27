import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MDBTable, MDBTableBody, MDBTableFoot, MDBTableHead } from "mdbreact";
import Header from "../../MainComponent/Header/Header";
import Footer from "../../MainComponent/Footer/Footer";
import PathHead from "../../MainComponent/PathHead/PathHead";
import {
  Card,
  Row,
  Col,
  Button,
  FormControl,
  InputGroup,
  Form,
} from "react-bootstrap";
import { useTheme } from "../../../ThemeContext";
import "../../Table.css";
const Technician_Assignment = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState({ columns: [], rows: [] });
  const { primaryColor, secondaryColor } = useTheme();

  const [Length, setLength] = useState("");
  const { apiLinks } = useTheme();
  const imageurl = `https://www.crystalsolutions.com.pk/csart/itemimage/`;

  const handleMenuItemClick = () => {
    navigate("/Add_ComplainSheet");
  };

  useEffect(() => {
    fetch(`${apiLinks}/GetComplaint.php`)
      .then((response) => response.json())
      .then((apiData) => {
        const transformedData = apiData.map((item) => ({
          c_id: item.c_id,
          c_date: item.c_date,
          c_time: item.c_time,
          c_cust: item.c_cust,
          c_mobile: item.c_mobile,
          itmdsc: item.itmdsc,
          refdsc: item.refdsc,
          c_sts: item.c_sts,
        }));

        const columns = [
          { label: "ID", field: "id", sort: "asc" },
          { label: "Date", field: "itmdis", sort: "asc" },
          { label: "Time", field: "TPurRat", sort: "asc" },
          { label: "Name", field: "TSalRat", sort: "asc" },
          { label: "Mobile ", field: "TItmDsc", sort: "asc" },
          { label: "Item", field: "itmdscurd", sort: "asc" },
          { label: "Referance", field: "itmdscurd", sort: "asc" },
          { label: "Status", field: "itmdis", sort: "asc" },
        ];

        setData({ columns, rows: transformedData });
        setLength(apiData.length);
        console.log(apiData.length); // Log the fetched data
      })
      .catch((error) => console.error(error));
  }, []);
  const filteredRows = data.rows.filter(
    (row) =>
      (row.c_sts &&
        row.c_sts.toLowerCase().includes(searchText.toLowerCase())) ||
      (row.c_cust &&
        row.c_cust.toLowerCase().includes(searchText.toLowerCase()))
  );

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };
  ///////////////// here is our Search Function

  const [selectedRow, setSelectedRow] = useState(null);

  const handleRowClick = (row) => {
    if (selectedRow === row.c_id) {
      // If the clicked row is already selected, navigate to the update screen
      navigate(`/Update_TechnicianAssignment/${row.c_id}`);
    } else {
      // Set the selectedRow state to the clicked row id
      setSelectedRow(row.c_id);
    }
  };

  return (
    <>
      <Header />
      <PathHead
        pageName="Transaction > Technician Assignment"
        screen="Get_Item"
        pageLink="/MainPage"
      />

      <div className="col-12" style={{ color: secondaryColor }}>
        {/* // , position: 'absolute', top: '50%', left: '50%', transform: 'translate(-74%, -40%)' */}

        <br />
        <div
          className="Technician_Assignment"
          style={{
            // marginLeft: "10%",
            // marginRight: "10%",
            // maxWidth: "80%",
            padding: "20px",
            border: "1px solid gray",
            //  position: 'absolute',
            //  top: '50%',
            //  left: '60%',
            //  transform: 'translate(-74%, -40%)',
            //  maxWidth: '80%',
            //  padding: '20px',
            //  border: '1px solid gray',
          }}
        >
          <Row>
            <Col xs={12} sm={4} md={4} lg={4} xl={{ span: 3, offset: 9 }}>
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
              maxHeight="61vh"
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
                            columnIndex === 3 ||
                            columnIndex === 5 ||
                            columnIndex === 6
                              ? "left"
                              : columnIndex === 4
                              ? "right"
                              : "center",
                          width:
                            columnIndex === 0
                              ? "1%"
                              : columnIndex === 1
                              ? "8%"
                              : columnIndex === 2
                              ? "8%"
                              : columnIndex === 3
                              ? "15%"
                              : columnIndex === 4
                              ? "8%"
                              : columnIndex === 5
                              ? "30%"
                              : columnIndex === 6
                              ? "16%"
                              : columnIndex === 7
                              ? "1%"
                              : "auto",
                        }}
                      >
                        {key === "tusrpwd" ? "*****" : row[key]}
                      </td>
                    ))}
                  </tr>
                ))}
                {Array.from({ length: Math.max(0, 11 - filteredRows.length) }).map((_, index) => (
        <tr key={`blank-${index}`}>
          {Array.from({ length: 8 }).map((_, colIndex) => (
            <td key={`blank-${index}-${colIndex}`}>&nbsp;</td>
          ))}
        </tr>
      ))}
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
                    colSpan={16}
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

export default Technician_Assignment;
