import {React,useState} from "react";
import NavBar from "../Navbar/Navbar";
import Header from "../Header/Header";
// import Ittefaq from "../../image/logo.png";
import Ittefaq from '../../../image/logo.png';
import Footer from "../Footer/Footer";
import { useLocation  } from "react-router-dom";
import SideBar from "../SideBar/SideBar";
import Metal from '../../../image/grmetal.png'
import { useTheme } from "../../../ThemeContext";
function HomePage1() {
  const location = useLocation();
  const { primaryColor,secondaryColor } = useTheme();
  const [showNavBar, setShowNavBar] = useState(true);

  const toggleNavbar = () => {
    setShowNavBar(!showNavBar);
  };
  const userid = location?.state?.userid || null; // Check if location state contains the userid
  const permissions = location?.state?.permissions || [];

  return (
    <>
 
 <Header /> <NavBar />
    {/* {showNavBar ?   <>  <Header /> <NavBar /></> : <SideBar />} */}


    {/* <div
      className="d-flex flex-column flex-grow-1"
      style={{fontFamily: 'Verdana', backgroundColor: "lightblack" }}
    >
      
      <div className="container-fluid HomePage1 row justify-content-center align-items-center">
      
        <div className="col-12 col-md-8 col-lg-6 text-center" style={{marginTop:'3%'}}>
        
          <img
            src={Metal}
            alt="ITTEFAQ ELECTRONICS"
            style={{ width: "30%" }}
          />
          <h1
            className="mt-4 mb-5"
            style={{ color: primaryColor, fontSize: "48px", fontWeight: "bold" }}
          >
            Welcome to Complain Management System 
          </h1>
          <p
            style={{ color: "#444444", fontSize: "18px", lineHeight: "1.4" }}
          >
           A realm of boundless creativity and innovation, where art takes on new dimensions. Our passion is to transform imagination into exquisite visual masterpieces.
          </p>
        </div>
      </div>
      
    </div> */}

<div
      className="d-flex flex-column flex-grow-1"
      style={{ fontFamily: "Verdana", backgroundColor: "#ecf0f1", minHeight: "100vh" 
      }}
    >
      <div className="container-fluid HomePage1 row justify-content-center align-items-center">
        <div className="col-12 col-md-8 col-lg-6 text-center" style={{ marginTop: '1%'
        , position: 'absolute', top: '55%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          <img
            src={Metal}
            alt="ITTEFAQ ELECTRONICS"
            style={{ width: "33%", borderRadius: "50%", boxShadow: "0 22px 44px rgba(0, 0, 0, 0.3)" }}
          />
          <h1
            className="mt-4 mb-5"
            style={{ color: primaryColor, fontSize: "44px", fontWeight: "bold" }}
          >
            Welcome to the Complaint Management System
          </h1>
          <p
            style={{ color: "#333", fontSize: "16px", lineHeight: "1.4" }}
          >
            A realm of boundless creativity and innovation, where art takes on new dimensions. Our passion is to transform imagination into exquisite visual masterpieces.
          </p>
        </div>
      </div>
    </div>
    

  
    <Footer className="mt-auto fixed-bottom" />
  </>
  );
}

export default HomePage1;
