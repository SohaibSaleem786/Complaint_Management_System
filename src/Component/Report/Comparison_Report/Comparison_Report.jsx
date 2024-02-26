import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MDBTable, MDBTableBody, MDBTableFoot, MDBTableHead } from "mdbreact";
import Header from "../../MainComponent/Header/Header";
import Footer from "../../MainComponent/Footer/Footer";
import PathHead from "../../MainComponent/PathHead/PathHead";
import PDF from "../../../image/pdf.png";
import * as XLSX from "xlsx";
import XLS from "../../../image/xls.png";
import { jsPDF } from "jspdf";
import {
  Card,
  Row,
  Col,
  Button,
  FormControl,
  InputGroup,
  Form,
} from "react-bootstrap";
import '../../Table.css'
import { useTheme } from "../../../ThemeContext";

const Get_Comparison_Report = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState({ columns: [], rows: [] });
  const { primaryColor, secondaryColor } = useTheme();
  const { apiLinks } = useTheme();
  const [Length, setLength] = useState("");

  const handleMenuItemClick = () => {
    navigate("/Add_Area");
  };
  
  
  
  
  
  
  
  useEffect(() => {
    fetch(`${apiLinks}/TechnicianComplaintReport.php`)
      .then((response) => response.json())
      .then((apiData) => {
        const transformedData = apiData.map((item) => ({
            techid: item.techid,
            description: item.description,
            pending: item.pending,
            not_solved: item.not_solved,
            solved: item.solved,
            closed: item.closed,
            total: item.total,

        }));

        const columns = [
          { label: "ID", field: "areaid", sort: "asc" },
          { label: "Desription ", field: "taredsc", sort: "asc" },
          { label: "Pending ", field: "tarests", sort: "asc" },
          { label: "Not Solved", field: "areaid", sort: "asc" },
          { label: "Solved ", field: "taredsc", sort: "asc" },
          { label: "Closed ", field: "taredsc", sort: "asc" },
          { label: "Total ", field: "taredsc", sort: "asc" },

        ];

        setData({ columns, rows: transformedData });
        setLength(apiData.length);
        console.log(apiData); // Log the fetched data
      })
      .catch((error) => console.error(error));
  }, []);

  const filteredRows = data.rows.filter(
    (row) =>
      (row.description &&
        row.description.toLowerCase().includes(searchText.toLowerCase())) 
  );
  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };
  ///////////////// here is our Search Function

  const [selectedRow, setSelectedRow] = useState(null);

 


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

  //////////////////////// PDF ////////////////////////////////
  const generatePDF = () => {
    const doc = new jsPDF();

    // Set the header text
    const companyName = "CRYSTAL SOLUTION";
    const reportTitle = "COMPARISON REPORT";

    // Set font size and color for the company name
    doc.setFontSize(20);
    doc.setTextColor(0, 0, 255); // Blue color
    doc.text(companyName, 80, 10);

    // Calculate the center position for the report title
    const textWidth =
      doc.getStringUnitWidth(reportTitle) * doc.internal.getFontSize();
    const centerPosition = (doc.internal.pageSize.width - textWidth) / 2;

    // Set font size and color for the report title
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0); // Black color
    doc.text(reportTitle, 90, 25);

    // Get the table data
    const tableData = filteredRows.map((item) => [


      item.techid,
      item.description,
      item.pending,
      item.not_solved,
      item.solved,
      item.closed,
      item.total,
     
    ]);

    // Set up the table headers
    const tableHeaders = [
      "ID",
      "Description",
      "Pending",
      "Not Solved",
      "Solved",
      "Closed",
      "Total",
     
    ];

    // Set configuration options for the table
    const tableConfig = {
      head: [tableHeaders],
      body: tableData,
      startY: 40, // Adjust the starting position as needed
      theme: "plain", // or 'striped' or 'grid'
      styles: {
        fontSize: 9,
        lineWidth: 0.1, // Set the line width for the table border
        lineColor: [0, 0, 0], // Black color for the table border
      },
      headStyles: {
        fillColor: [0, 0, 255],
        textColor: [255, 255, 255],
        halign: "center",
      },
      columnStyles: {
        0: {
          // ID column
          cellWidth: "auto",
          align: "right",
        },
        1: {
          // Customer Name column
          cellWidth: "auto",
          align: "left",
        },
        2: {
          // Email column
          cellWidth: "auto",
          align: "center",
        },
        3: {
          // Mobile column
          cellWidth: "auto",
          align: "center",
        },
        4: {
          // Ref_id column
          cellWidth: "auto",
          align: "center",
        },
        5: {
          // Prod_id column
          cellWidth: "auto",
          align: "center",
        },
        6: {
          // Date column
          cellWidth: "auto",
          align: "center",
        },
        7: {
          // Warranty column
          cellWidth: "auto",
          align: "center",
        },
        8: {
          // Status column
          cellWidth: "auto",
          align: "center",
        },
      },
    };

    // Add the table to the PDF
    doc.autoTable(tableConfig);

    // Save the PDF
    doc.save("complaint_report.pdf");
  };

  //////////////////////// Excell ////////////////////////////////

  const generateExcel = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(filteredRows);

    XLSX.utils.book_append_sheet(wb, ws, "ComplaintReport");
    XLSX.writeFile(wb, "complaint_report.xlsx");
  };


  return (
    <>
      <Header />
      <PathHead
        pageName="Report > Comparison Report"
        screen="Get_Item"
        pageLink="/MainPage"
      />

      <div className="col-12" style={{ color: secondaryColor }}>
        <br />
        <div
          className="Comparison_Report"
          style={{
            // marginLeft: "30%",
            // marginRight: "30%",
            // maxWidth: "40%",
            padding: "20px",
            border: "1px solid gray",backgroundColor: "white",
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
                  <tr key={index} >
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
                                ? "45%"
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
                        colSpan={5}
                        style={{
                          backgroundColor: primaryColor,
                          color: secondaryColor,

                          textAlign: "left",
                        }}
                      >
                        {Length}
                      </th>
                      <th style={{
                          backgroundColor: primaryColor,
                          color: secondaryColor,

                          textAlign: "center",
                        }}>
                        <img
                src={PDF}
                alt="PDF Image"
                style={{ width: "40%", height: "20px" }}
                onClick={generatePDF}
               
              />
              <img
                src={XLS}
                alt="PDF Image"
                style={{ width: "40%", height: "20px" }}
                onClick={generateExcel}
                
              />
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

export default Get_Comparison_Report;
