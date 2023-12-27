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
// import "../Get_Technical/Get_Technical.css";
import "../../../Table.css"
const Get_Technical = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState({ columns: [], rows: [] });
  const { primaryColor, secondaryColor } = useTheme();
  const [Length, setLength] = useState("");
  const { apiLinks } = useTheme();
  const handleMenuItemClick = () => {
    navigate("/Add_Technical");
  };
 
  useEffect(() => {
    fetch(`${apiLinks}/GetTechnician.php`)
      .then((response) => response.json())
      .then((apiData) => {
        const transformedData = apiData.map((item) => ({
          techid: item.techid,
          techdsc: item.techdsc,
          techcontact: item.techcontact,
          // techadd1: item.techadd1,
          // techadd2: item.techadd2,
          techphone: item.techphone,
          techmobile: item.techmobile,
          // techsms: item.techsms,
          techemail: item.techemail,
          // tech_semail: item.tech_semail,
          techstatus: item.techstatus,
        }));

        const columns = [
          { label: "ID", field: "id", sort: "asc" },
          { label: "Desription ", field: "TItmDsc", sort: "asc" },
          { label: "Contact Person ", field: "itmdscurd", sort: "asc" },
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
        console.log(apiData.length); // Log the fetched data
      })
      .catch((error) => console.error(error));
  }, []);

  const filteredRows = data.rows.filter(
    (row) =>
      (row.techdsc &&
        row.techdsc.toLowerCase().includes(searchText.toLowerCase())) ||
      (row.techmobile &&
        row.techmobile.toLowerCase().includes(searchText.toLowerCase())) ||
      (row.techstatus &&
        row.techstatus.toLowerCase().includes(searchText.toLowerCase()))
  );

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };
  ///////////////// here is our Search Function

  const [selectedRow, setSelectedRow] = useState(null);

  const handleRowClick = (row) => {
    if (selectedRow === row.techid) {
      // If the clicked row is already selected, navigate to the update screen
      navigate(`/Update_Technical/${row.techid}`);
    } else {
      // Set the selectedRow state to the clicked row id
      setSelectedRow(row.techid);
    }
  };

  return (
    <>
      <Header />
      <PathHead
        pageName="File > Technician Maintenance"
        screen="Get_Item"
        pageLink="/MainPage"
      />

      <div className="col-12" style={{ color: secondaryColor }}>

        <br />
        <div
          className="Item-container"
          style={{
            // marginLeft: "15%",
            // marginRight: "15%",
            // maxWidth: "70%",
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
                        // style={{
                        //   textAlign:
                        //     columnIndex === 1 ||
                        //     columnIndex === 2 ||
                        //     columnIndex === 5 ||
                        //     columnIndex === 6
                        //       ? "left"
                        //       : columnIndex === 3 || columnIndex === 4
                        //       ? "right"
                        //       : "center",
                        //   width: window.innerWidth > 768 ? (
                        //     columnIndex === 0
                        //       ? "1%"
                        //       : columnIndex === 1
                        //       ? "15%"
                        //       : columnIndex === 2
                        //       ? "15%"
                        //       : columnIndex === 3
                        //       ? "10%"
                        //       : columnIndex === 4
                        //       ? "10%"
                        //       : columnIndex === 5
                        //       ? "12%"
                        //       : columnIndex === 6
                        //       ? "1%"
                        //       : "auto"
                        //   ) : "auto",
                        // }}
                        
                      >
                        {key === "tusrpwd" ? "*****" : row[key]}
                      </td>
                    ))}
                  </tr>
                ))}
                {/* Blank rows to fill remaining space */}
      {Array.from({ length: Math.max(0, 11 - filteredRows.length) }).map((_, index) => (
        <tr key={`blank-${index}`}>
          {Array.from({ length: 7 }).map((_, colIndex) => (
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

export default Get_Technical;








// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { MDBTable, MDBTableHead, MDBTableBody, MDBTableFoot } from "mdbreact";
// import { Card, Row, Col, Button, Form } from "react-bootstrap";
// import Header from "../../../MainComponent/Header/Header";
// import Footer from "../../../MainComponent/Footer/Footer";
// import PathHead from "../../../MainComponent/PathHead/PathHead";
// import { useTheme } from "../../../../ThemeContext";
// import "../../../Table.css";

// const fetchData = async (apiLinks, setData, setLength) => {
//   try {
//     const response = await fetch(`${apiLinks}/GetTechnician.php`);
//     const apiData = await response.json();

//     const transformedData = apiData.map((item) => ({
//       techid: item.techid,
//       techdsc: item.techdsc,
//       techcontact: item.techcontact,
//       techphone: item.techphone,
//       techmobile: item.techmobile,
//       techemail: item.techemail,
//       techstatus: item.techstatus,
//     }));

//     const columns = [
//       { label: "ID", field: "techid", sort: "asc" },
//       { label: "Description", field: "techdsc", sort: "asc" },
//       { label: "Contact Person", field: "techcontact", sort: "asc" },
//       { label: "Phone No.", field: "techphone", sort: "asc" },
//       { label: "Mobile No.", field: "techmobile", sort: "asc" },
//       { label: "Email", field: "techemail", sort: "asc" },
//       { label: "Status", field: "techstatus", sort: "asc" },
//     ];
    

//     setData({ columns, rows: transformedData });
//     setLength(apiData.length);
//   } catch (error) {
//     console.error(error);
//   }
// };

// const TableHead = ({ columns, primaryColor, secondaryColor }) => (
//   <MDBTableHead>
//     <tr>
//       {columns.map((column, columnIndex) => (
//         <th
//           key={columnIndex}
//           style={{
//             backgroundColor: primaryColor,
//             color: secondaryColor,
//             fontWeight: "bold",
//             position: "sticky",
//             top: -1,
//             zIndex: 1,
//             textAlign: "center",
//           }}
//         >
//           {column.label}
//         </th>
//       ))}
//     </tr>
//   </MDBTableHead>
// );

// const TableRow = ({ row, handleRowClick }) => (
//   <tr onClick={() => handleRowClick(row)}>
//     {Object.keys(row).map((key, columnIndex) => (
//       <td
//         key={key}
//         style={{
//           textAlign:
//             columnIndex === 1 ||
//             columnIndex === 2 ||
//             columnIndex === 5 ||
//             columnIndex === 6
//               ? "left"
//               : columnIndex === 3 || columnIndex === 4
//               ? "right"
//               : "center",
//           width:
//             columnIndex === 0
//               ? "1%"
//               : columnIndex === 1
//               ? "15%"
//               : columnIndex === 2
//               ? "15%"
//               : columnIndex === 3
//               ? "10%"
//               : columnIndex === 4
//               ? "10%"
//               : columnIndex === 5
//               ? "12%"
//               : columnIndex === 6
//               ? "1%"
//               : "auto",
//         }}
//       >
//         {key === "tusrpwd" ? "*****" : row[key]}
//       </td>
//     ))}
//   </tr>
// );

// const GetTechnical = () => {
//   const navigate = useNavigate();
//   const [searchText, setSearchText] = useState("");
//   const [data, setData] = useState({ columns: [], rows: [] });
//   const { primaryColor, secondaryColor } = useTheme();
//   const [Length, setLength] = useState("");
//   const { apiLinks } = useTheme();

//   const handleMenuItemClick = () => {
//     navigate("/Add_Technical");
//   };

//   useEffect(() => {
//     fetchData(apiLinks, setData, setLength);
//   }, []);

//   const filteredRows = data.rows.filter(
//     (row) =>
//       (row.techdsc && row.techdsc.toLowerCase().includes(searchText.toLowerCase())) ||
//       (row.techmobile && row.techmobile.toLowerCase().includes(searchText.toLowerCase())) ||
//       (row.techstatus && row.techstatus.toLowerCase().includes(searchText.toLowerCase()))
//   );

//   const handleSearchChange = (event) => {
//     setSearchText(event.target.value);
//   };

//   const [selectedRow, setSelectedRow] = useState(null);

//   const handleRowClick = (row) => {
//     if (selectedRow === row.techid) {
//       navigate(`/Update_Technical/${row.techid}`);
//     } else {
//       setSelectedRow(row.techid);
//     }
//   };

//   return (
//     <>
//       <Header />
//       <PathHead pageName="File > Technician Maintenance" screen="Get_Item" pageLink="/MainPage" />

//       <div className="col-12" style={{ color: secondaryColor }}>
//         <br />
//         <div className="Item-container" style={{ padding: "20px", border: "1px solid gray" }}>
//           <Row>
//             <Col xs={12} sm={4} md={4} lg={4} xl={2}>
//               <Button
//                 className="btn btn-primary"
//                 style={{
//                   backgroundColor: primaryColor,
//                   fontSize: "11px",
//                   color: secondaryColor,
//                   width: "100%",
//                   marginBottom: "10px",
//                 }}
//                 onClick={handleMenuItemClick}
//               >
//                 ADD
//               </Button>
//             </Col>

//             <Col xs={12} sm={4} md={4} lg={4} xl={{ span: 3, offset: 7 }}>
//               <Form.Control
//                 type="text"
//                 placeholder="Search..."
//                 value={searchText}
//                 onChange={handleSearchChange}
//               />
//             </Col>
//           </Row>

//           <div style={{ fontSize: "12px", fontFamily: "Verdana", width: "100%", overflowX: "auto" }}>
//             <MDBTable scrollY maxHeight="60vh" striped bordered small responsive>
//               <TableHead columns={data.columns} primaryColor={primaryColor} secondaryColor={secondaryColor} />

//               <MDBTableBody>
//                 {filteredRows.map((row, index) => (
//                   <TableRow key={index} row={row} handleRowClick={handleRowClick} />
//                 ))}
//               </MDBTableBody>

//               <MDBTableFoot style={{ position: "sticky", bottom: 0, zIndex: 2 }}>
//                 <tr>
//                   <th style={{ backgroundColor: primaryColor, color: secondaryColor }}></th>
//                   <th colSpan={6} style={{ backgroundColor: primaryColor, color: secondaryColor, textAlign: "left" }}>
//                     {Length}
//                   </th>
//                 </tr>
//               </MDBTableFoot>
//             </MDBTable>
//           </div>
//         </div>
//         <Footer />
//       </div>
//     </>
//   );
// };

// export default GetTechnical;
