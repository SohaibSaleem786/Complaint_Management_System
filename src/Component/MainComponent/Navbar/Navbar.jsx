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


