import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import React, { useState, useEffect,useRef } from "react";
import Header from "../../../MainComponent/Header/Header";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import PathHead from "../../../MainComponent/PathHead/PathHead";
import { useTheme } from "../../../../ThemeContext";
import Footer from "../../../MainComponent/Footer/Footer";
import displayAlert from '../../../MainComponent/Alert/Alert';

function Update_Complain() {
  const navigate = useNavigate();
  const { comid } = useParams();
  const [alertData, setAlertData] = useState(null);

  const { secondaryColor ,apiLinks} = useTheme();
  const [data, setData] = useState([]);
  const { primaryColor } = useTheme();
  const [user, setUser] = useState({
    comid :'',
    comdsc:'',
    comsts:'',
  });

  useEffect(() => {
    fetch(
      `${apiLinks}/GetComplaintType.php?comid=${comid}`
    )
      .then((response) => response.json())
      .then((apiData) => {
        const user = apiData.find((item) => item.comid === comid);
        setUser(user);
     

      })
      .catch((error) => console.error(error));
  }, [comid]);



  const handleInputChange1 = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const uppercaseValue = value.toUpperCase();
    setUser((prevUser) => ({
      ...prevUser,
      [name]: uppercaseValue,
    }));
    // setUser({ ...values, [name]: uppercaseValue });
  };
  const [values, setValues] = useState({
    comid: "",
    itemDscc: "",
    itmdscurd:'',
    itmindex:'',
    itmremarks:'',
    itmdscurd:'',
    itemStss: "",
    purRatee: "",
    saleRatee: "",
    categoryIdd: "",
    discountt:"",
    typee: "",
    pic : '',
    TItmPic1:'',
    TItmPic3:'',
    TItmPic3:'',
    loading: false,
  });

  const [missingDescription, setMissingDescription] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!user.comdsc.trim()) {
      setAlertData({
        type: "error",
        message: "Please fill in the description.",
      });
      setTimeout(() => {
        setAlertData(null);
      }, 1000);
      setMissingDescription(true); // Set the missing description state
      return; // Prevent form submission
    }
    const requestBody = new FormData();
    requestBody.append("id", user.comid);
    requestBody.append("Comdsc", user.comdsc);
    requestBody.append("ComSts", user.comsts);
    axios
      .post(
        `${apiLinks}/UpdateComplaintType.php?comid=${comid}`,
        requestBody
      )
      .then((response) => {
        if (response.data.error === 200) {
          setAlertData({
            type: "success",
            message: `${response.data.message}`,
          });
          setTimeout(() => {
            setAlertData(null);
            navigate("/Get_Complain");
          }, 1000);
          
        } else {
          console.log(response.data.message);

          setAlertData({
            type: "error",
            message: `${response.data.message}`,
          });
          setTimeout(() => {
            setAlertData(null);
          }, 2000);
        }
      })
      .catch((error) => {
        // Handle errors
        console.error("Error:", error);
      });
  };
  const marginRightinput = '10px';

  const descriptionRef = useRef(null);
  const statusRef = useRef(null);
  const buttonRef = useRef(null);


  // Function to focus on the next input field
  const focusNextInput = (ref) => {
    if (ref.current) {
      ref.current.focus();
    }
  };

  // Function to handle Enter key press
  const handleEnterKeyPress = (ref, e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent form submission on Enter key press
      focusNextInput(ref);
    }
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
        {/* {alertData && (
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
        )} */}


{alertData && displayAlert(alertData.type, alertData.message)}

<Header />

<PathHead pageName="File > Complain Maintenance > Update Complain"  screen='Update_Item' pageLink="/Get_Complain"/>

      <div className="col-12" style={{ color: 'black' ,fontFamily: 'Verdana',fontWeight:'bold' }}>
        

        <div
          className="row"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "5px",
            backgroundColor: "#f5f5f5",
            minHeight: "100vh",
          }}
        >
          <div className="col-md-12 form-container"
          style={{
            backgroundColor: "#fff",
            borderRadius: "10px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            padding: "10px",border:'1px solid black',
            width: "100%",
            maxWidth: "400px",
            margin: "20px 0",
            fontSize:'12px' , position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'
          }}
          >
            <Form onSubmit={handleSubmit}>
            <div className="row">
  <div className="col-12">
    <br />



  {/* <Form.Group controlId="Id" style={{ display: 'flex', alignItems: 'center' }}>
      <Form.Label style={{ marginRight: '10px',marginLeft: '60px' }}>Id :</Form.Label>
      <Form.Control
        type="text"
        id="code"
        placeholder=" Id"
        className="form-control"
        name="comid"
        value={user.comid}
        style={{height:'20px', width:'70px' }}
        onChange={handleInputChange}
        disabled
      />
    </Form.Group>
    <Form.Group controlId="description" style={{ display: 'flex', alignItems: 'center' ,marginTop:'-1%'}}>
      <Form.Label style={{ marginRight: '10px' }}>Description:</Form.Label>
      <Form.Control
         type="text"
         id="code"
         placeholder="Description"
         className="form-control"
         name="Comdsc"
         value={user.comdsc}
         style={{height:'20px', width:'270px' }}
         onChange={handleInputChange}
      />
    </Form.Group>
   
    <Form.Group controlId="status" style={{ display: 'flex', alignItems: 'center' }}>
      <Form.Label style={{ marginRight: '10px', marginLeft: '34px', textAlign: 'right' }}>Status:</Form.Label>
     <Form.Control

as="select"

name="comsts"
value={user.comsts}
onChange={handleInputChange}
className="form-control"
style={{height:'27px', fontSize:'11px', width:'70px'}}
>
  <option value="Yes">Yes</option>
  <option value="No">No</option>
</Form.Control>

    </Form.Group> */}





    <table style={{ border: 'none', width: '100%' }}>
    <tbody > 

    <tr>
  <td>
    <Form.Group style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', marginRight: marginRightinput }}>
    <Form.Label >Id:</Form.Label>

    </Form.Group>
  </td>
  <td colSpan="2"> 
    


    <Form.Group controlId="description" style={{ display: 'flex', alignItems: 'center' }}>
      <Form.Control
       type="text"
       id="code"
       placeholder="Description"
       className="form-control"
       name="Comdsc"
       value={user.comid}
        style={{height:'24px', width:'70px' }}
        onChange={handleInputChange}
        disabled
      />
    </Form.Group>
  </td>
    </tr>


    <tr>
  <td>
    <Form.Group style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', marginRight: marginRightinput }}>
    <Form.Label >Description:</Form.Label>

    </Form.Group>
  </td>
  <td colSpan="2"> 
    


    <Form.Group controlId="description" style={{ display: 'flex', alignItems: 'center' }}>
      <Form.Control
   
        type="text"
        id="code"
        placeholder="Description"
        className="form-control"
        name="comdsc"
        value={user.comdsc}
        onChange={handleInputChange}
        onKeyDown={(e) => handleEnterKeyPress(statusRef, e)} 
        ref={descriptionRef}
        maxLength={40}

         style={{height:'24px', width:'270px' , borderColor: missingDescription ? 'red' : null}}
      />
    </Form.Group>
  </td>
    </tr>


      <tr>
        <td>
          <Form.Group style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', marginRight: marginRightinput }}>
          <Form.Label >Status:</Form.Label>
          </Form.Group>
        </td>
        <td colSpan="2">
          <Form.Group style={{ display: 'flex', alignItems: 'center' }}>
            <Form.Control
as="select"

name="comsts"
value={user.comsts}
onChange={handleInputChange1}
className="form-control"
style={{height:'27px', fontSize:'11px', width:'70px'}}
onKeyDown={(e) => handleEnterKeyPress(buttonRef, e)} // Move to the next input on Enter key press
                  ref={statusRef}
                  >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </Form.Control>
          </Form.Group>
        </td>
      

      </tr>

      

<tr>
  <td></td>
  <td>
  <br />
<Button
                    className="btn btn-primary"
                    style={{
                      backgroundColor: primaryColor,
                      height: "4%",
                      fontSize: "11px",
                      color: secondaryColor,
                      width: "50%",
                      marginRight: "2%",
                    }}
                    onClick={handleSubmit}
                    ref={buttonRef}
                  >
                    SUBMIT
                  </Button>

  </td>
</tr>

     











       

    </tbody>
  </table>








  </div>


</div>

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
      <Footer/>
    </>
  );
}

export default Update_Complain;