import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from '../../../AuthContext';
import { useTheme } from "../../../ThemeContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Navbar/Navbar.css";

function NavBar() {
  const { primaryColor, secondaryColor, navbarHeight, apiLinks } = useTheme();
  const { isLoggedIn } = useAuth();
  const [menuItems, setMenuItems] = useState([]);
  const navigate = useNavigate();
  const [showNavbar, setShowNavbar] = useState(false);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));

    if (userData) {
      fetchMenuItems(userData.id);
    } else {
      console.error("User data not available in local storage.");
    }
  }, []);

  const fetchMenuItems = (userID) => {
    const apiUrl = `${apiLinks}/get_usrmenu.php`;

    axios.post(apiUrl, new URLSearchParams({ userid: userID }).toString())
      .then((response) => setMenuItems(response.data))
      .catch((error) => console.error("Error:", error));
  };

  const handleMouseEnter = (e) => updateStyle(e, 'rgba(247, 255, 249, 0.6)', 'black');
  const handleMouseLeave = (e) => updateStyle(e, '', 'black');

  const updateStyle = (e, backgroundColor, color) => {
    e.target.style.backgroundColor = backgroundColor;
    e.target.style.color = color;
  };

  const getMenuItemStyle = (item) => ({
    fontSize: '12px',
    height: '16px',
    width: '208px',
    backgroundColor: 'white',
    color: 'black',
    padding: '0 20px',
    margin: '5px 0',
    display: 'block',
    pointerEvents: item.tmenprm === 'Y' ? 'auto' : 'none',
    opacity: item.tmenprm === 'Y' ? 1 : 0.6,
    fontFamily: 'Verdana',
  });

  const handleMenuItemClick = (menuItem) => {
    const routeMapping = {
      "1-01-00": "/Get_Technical",
      "1-02-00": "/Get_Installer",
      "1-03-00": "/Get_Referance",
      "1-04-00": "/Get_Item",
      "1-05-00": "/Get_Complain",
      "1-06-00": "/Get_Type",
      "1-07-00": "/Get_Area",
      "1-08-00": "/Get_Mobile",
      "1-09-00": "/Get_Category",

      "2-01-00": "/Get_ComplainSheet",
      "2-02-00": "/Item_Sheet",
      "2-03-00": "/Technician_Assignment",
      "2-04-00": "/Technician_Visit",
      "2-05-00": "/Closed_Complaint",



       
      "3-01-00": "/Complaint_Report",
      "3-02-00": "/Get_Comparison_Report",
      "3-03-00": "/Item_Comparison_Report",

    };

    const route = routeMapping[menuItem.tmencod];
    
    if (route) navigate(route);
    
    else console.error(`Route not found for tmencod: ${menuItem.tmencod}`);
  };

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      variant=""
      className="custom-navbar"
      style={{
        paddingRight: "190px",
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        height: window.innerWidth > 768 ? navbarHeight : "auto",
        fontFamily: 'Verdana',
        zIndex: 100,
      }}
    >
      <Container>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          onClick={() => setShowNavbar(!showNavbar)}
        />
        <Navbar.Collapse
          id="responsive-navbar-nav"
          className={showNavbar ? "show" : ""}
        >
          <Nav className="me-auto justify-content-start">
            {menuItems.map((item) => (
              item.tmenprm === 'Y' &&
              ["1-00-00", "2-00-00", "3-00-00", "4-00-00"].includes(item.tmencod) &&
              <NavDropdown
                key={item.tmencod}
                className="Dropdown_1 mr-3"
                title={item.tmendsc.trim()}
                id="collapsible-nav-dropdown"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {menuItems
                  .filter(subItem => subItem.tmencod.startsWith(`${item.tmencod.substring(0, 1)}-`) && subItem.tmencod !== `${item.tmencod}`)
                  .map(subItem => (
                    <NavDropdown.Item
                      key={subItem.tmencod}      
                      className={`Dropdown_1 mr-3${subItem.tmencod === '2-02-00' ? ' border-top' : ''}`}
                      href={subItem.tmenurl}
                      style={getMenuItemStyle(subItem)}
                      onMouseEnter={(e) => updateStyle(e, primaryColor, secondaryColor)}
                      onMouseLeave={(e) => updateStyle(e, '', '')}
                      onClick={() => handleMenuItemClick(subItem)}
                    >
                      {subItem.tmendsc.trim()}
                    </NavDropdown.Item>
                  ))}
              </NavDropdown>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default NavBar;



// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { Button, Dropdown, Nav, Navbar } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import '../Navbar/Navbar.css'
// function NavBar() {
//   const [menuData, setMenuData] = useState([]);
//   const [isSidebarVisible, setIsSidebarVisible] = useState(false); // State to manage sidebar visibility
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Retrieve userData from local storage
//     const userDataString = localStorage.getItem("user");
//     if (userDataString) {
//       const userData = JSON.parse(userDataString);
//     }
//   }, []);

//   const menuUrl =
//     "https://crystalsolutions.com.pk/emart/web/get_usrmenu.php";

//   useEffect(() => {
//     fetchMenuData();
//   }, []);

//   function fetchMenuData() {
//     const data = {
//       userid: 74,
//     };
//     const formData = new URLSearchParams(data).toString();

//     axios
//       .post(menuUrl, formData, {
//         headers: {
//           "Content-Type": "application/x-www-form-urlencoded",
//         },
//       })
//       .then((response) => {
//         setMenuData(response.data);
//         console.log("Menu Data:", response.data);
//       })
//       .catch((error) => {
//         console.error("API Error:", error);
//       });
//   }

//   const customLinks = {

//   };

//   const nestedMenu = menuData.reduce((menu, item) => {
//     const [topLevel, subMenu] = item.tmencod.split("-");
//     if (!menu[topLevel]) {
//       menu[topLevel] = {
//         label: item.tmendsc,
//         items: [],
//       };
//     }
//     // Skip the first item in each dropdown
//     if (subMenu !== "00") {
//       menu[topLevel].items.push({
//         label: item.tmendsc,
//         to: customLinks[item.tmencod] || "#",
//         disabled: item.tmenprm === "N",
//       });
//     }
//     return menu;
//   }, {});

//   const toggleSidebar = () => {
//     console.log("Toggle sidebar clicked");
//     setIsSidebarVisible(!isSidebarVisible);
//   };

//   // Sort the menuData array based on tmencod
//   menuData.sort((a, b) => a.tmencod.localeCompare(b.tmencod));

//   // Initialize an empty object to store the hierarchical menu data
//   const hierarchicalMenuData = {};

//   // Loop through the sorted menuData array
//   menuData.forEach((item) => {
//     const [topLevel, middleLevel, subLevel] = item.tmencod.split("-");

//     // Create the top-level menu item if it doesn't exist
//     if (!hierarchicalMenuData[topLevel]) {
//       hierarchicalMenuData[topLevel] = {
//         label: item.tmendsc,
//         items: [],
//       };
//     }

//     // Create the middle-level menu item if it doesn't exist
//     if (!hierarchicalMenuData[topLevel].items[middleLevel]) {
//       hierarchicalMenuData[topLevel].items[middleLevel] = {
//         label: item.tmendsc,
//         items: [],
//       };
//     }

//     // Add the sub-level menu item
//     hierarchicalMenuData[topLevel].items[middleLevel].items.push({
//       label: item.tmendsc,
//       to: customLinks[item.tmencod] || "#",
//       disabled: item.tmenprm === "N",
//     });
//   });

//   const renderSubSubDropdown = (topLevel) => {
//     const middleLevelItems = hierarchicalMenuData[topLevel].items;

//     // Sort middle level keys based on the middle digit of tmencod
//     const sortedMiddleLevelKeys = Object.keys(middleLevelItems).sort((a, b) => {
//       const middleDigitA = parseInt(a);
//       const middleDigitB = parseInt(b);
//       return middleDigitA - middleDigitB;
//     });

//     return sortedMiddleLevelKeys.map((middleLevel, index) => {
//       const subSubItems = middleLevelItems[middleLevel].items;

//       // Check if there are sub-sub-items
//       if (subSubItems.length > 1) {
//         // Filter out the first sub-sub-item
//         const filteredSubSubItems = subSubItems.slice(1);

//         return (
//           <Dropdown key={middleLevel} className="custom-dropdown-button dropend">
//             <Dropdown.Toggle
//               variant="transparent"
//               id={`dropdown-${topLevel}-${middleLevel}`}
//               className="sub-dropdown-toggle"
//               // style={{marginTop:'-20px'}}
//             >
//               {middleLevelItems[middleLevel].label}
//             </Dropdown.Toggle>
//             <Dropdown.Menu>
//               {filteredSubSubItems.map((item, subIndex) => (
//                 <Dropdown.Item
//                   key={subIndex}
//                   as={item.to !== "#" ? Link : undefined}
//                   to={item.to}
//                   disabled={item.disabled}
//                   className="sub-dropdown-item"
//                   // style={{backgroundColor:'white' }}
//                 >
//                   {item.label}
//                 </Dropdown.Item>
//               ))}
//             </Dropdown.Menu>
//           </Dropdown>
//         );
//       } else if (subSubItems.length === 1) {
//         // If there's only 1 sub-sub-item, render it as a regular dropdown item
//         return (
//           <Dropdown.Item
//             key={middleLevel}
//             as={subSubItems[0].to !== "#" ? Link : undefined}
//             to={subSubItems[0].to}
//             disabled={subSubItems[0].disabled}
//             // style={{marginTop:'-20px'}}
//             className={`custom-dropdown-item${index === 0 ? ' hide-first-item' : ''}`}

//           // Add the hide-first-item class to the first item
//           >
//             {middleLevelItems[middleLevel].label}
//           </Dropdown.Item>
//         );
//       }

//       // If there are no sub-sub-items, return null for that item
//       return null;
//     }).filter(Boolean); // Filter out null items

//   };

 
//   return (
//     <>
//       <Navbar
//       style={{ backgroundColor: "white" ,fontSize:'11px'}}
//       expand="lg"
//       className="p-0"
//     >
//       <Navbar.Brand href="/emart/dashboard"></Navbar.Brand>
//       <Navbar.Toggle aria-controls="basic-navbar-nav" />
//       <Navbar.Collapse
//         id="basic-navbar-nav"
//         className="gap-2 d-flex justify-content-between"
//       >
//         <Nav className="mr-auto">
//           {Object.keys(hierarchicalMenuData).map((topLevel) => (
//             <Dropdown key={topLevel} className="custom-dropdown-button" >
//               <Dropdown.Toggle
//                 variant="transparent"
//                 id={`dropdown-${topLevel}`}
//               >
//                 {hierarchicalMenuData[topLevel].label}
//               </Dropdown.Toggle>
//               <Dropdown.Menu >{renderSubSubDropdown(topLevel)}</Dropdown.Menu>
//             </Dropdown>
//           ))}
//         </Nav>
//       </Navbar.Collapse>
//     </Navbar>
//     </>
//   );
// }


// export default NavBar;