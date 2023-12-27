import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MDBTable, MDBTableBody, MDBTableFoot, MDBTableHead } from "mdbreact";
import Header from "../../../MainComponent/Header/Header";
import Footer from "../../../MainComponent/Footer/Footer";
import { useTheme } from "../../../../ThemeContext";
import PathHead from "../../../MainComponent/PathHead/PathHead";
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
const Get_ComplainSheet = () => {
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
          c_mobile: item.c_mobile,
          c_cust: item.c_cust,
          c_type: item.c_type,
          c_comid: item.c_comid,
          c_date: item.c_date,
          c_time: item.c_time,
          c_sts: item.c_sts,
        }));

        const columns = [
          { label: "ID", field: "id", sort: "asc" },
          { label: "Mobile ", field: "TItmDsc", sort: "asc" },
          { label: "Name", field: "TSalRat", sort: "asc" },
          { label: "Type", field: "itmdscurd", sort: "asc" },
          { label: "Com_Id", field: "itmdis", sort: "asc" },
          { label: "Date", field: "itmdis", sort: "asc" },
          { label: "Time", field: "TPurRat", sort: "asc" },
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
      (row.c_mobile &&
        row.c_mobile.toLowerCase().includes(searchText.toLowerCase()))
  );

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };
  ///////////////// here is our Search Function

  const [selectedRow, setSelectedRow] = useState(null);

  const handleRowClick = (row) => {
    if (selectedRow === row.c_id) {
      // If the clicked row is already selected, navigate to the update screen
      navigate(`/Update_ComplainSheet/${row.c_id}`);
    } else {
      // Set the selectedRow state to the clicked row id
      setSelectedRow(row.c_id);
    }
  };

  return (
    <>
      <Header />
      <PathHead
        pageName="File > Complaint Sheet"
        screen="Get_Item"
        pageLink="/MainPage"
      />

      <div className="col-12" style={{ color: secondaryColor }}>
        {/* // , position: 'absolute', top: '50%', left: '50%', transform: 'translate(-74%, -40%)' */}

        <br />
        <div
          className="Complaint_Sheet"
          style={{
            // marginLeft: "20%",
            // marginRight: "20%",
            // maxWidth: "60%",
            padding: "20px",
            border: "1px solid gray",
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
                            columnIndex === 2
                              ? "left"
                              : columnIndex === 1
                              ? "right"
                              : "center",
                          width:
                            columnIndex === 0
                              ? "1%"
                              : columnIndex === 1
                              ? "13%"
                              : columnIndex === 2
                              ? "23%"
                              : columnIndex === 3
                              ? "10%"
                              : columnIndex === 4
                              ? "10%"
                              : columnIndex === 5
                              ? "16%"
                              : columnIndex === 6
                              ? "16%"
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

export default Get_ComplainSheet;
