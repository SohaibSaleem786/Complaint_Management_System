import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Alert from "@mui/material/Alert";
import PathHead from '../../../MainComponent/PathHead/PathHead';
import Header from '../../../MainComponent/Header/Header';
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link, useNavigate,useParams } from "react-router-dom";
import Footer from '../../../MainComponent/Footer/Footer';
import { useTheme } from '../../../../ThemeContext';
import displayAlert from '../../../MainComponent/Alert/Alert';

function Update_ComplainSheet() {
    const navigate = useNavigate();
    const { c_id } = useParams();
    const [alertData, setAlertData] = useState(null);
    const { secondaryColor ,apiLinks} = useTheme();
    const [data, setData] = useState([]);
    const { primaryColor } = useTheme();
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
    const formattedTime = `${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;
       const value = {
      date: formattedDate,
      time: formattedTime,
    };
    const [sendEmail, setSendEmail] = useState(true);
    const [sendSms, setSendSms] = useState(true);
    const [user, setUser] = useState({
     
        c_id :'',
        c_mobile:'',
        c_type:'',
        c_cust:'',
        c_add1:'',
        c_add2:'',
        c_contant:'',
        c_refid:'',
        c_prodid:'',
        c_invno :'',
        c_warrty:'',
        c_comid:'',
        c_remarks:'',
        c_purdate:'',
        c_date:'',
        c_time:'',
        c_email:'',
        c_serial :'',
        c_sts:'',
  
    });
  
    useEffect(() => {
      fetch(
        `${apiLinks}/GetComplaint.php?c_id=${c_id}`
      )
        .then((response) => response.json())
        .then((apiData) => {
          const user = apiData.find((item) => item.c_id === c_id);
          setUser(user);
          setSendEmail(user.tech_semail === 'Yes');
          setSendSms(user.techsms === 'Yes');
  
  
        })
        .catch((error) => console.error(error));
    }, [c_id]);
  
  
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
      itmIdd: "",
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
  
    const [selectedStatus, setSelectedStatus] = useState("");
  
   
  

  
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(
            `https://www.crystalsolutions.com.pk/csart/get_category.php`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }
  
          const apiData = await response.json();
          setData(apiData);
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchData();
  
  
      return () => {
      };
    }, []);
    // const [missingDescription, setMissingDescription] = useState(false);
    // const [missingMobile, setMissingMobile] = useState(false);
    // const [missingEmail, setMissingEmail] = useState(false);

    const handleFormSubmit = (event) => {
      event.preventDefault();
    
  
    //   if (!user.techdsc.trim()) {
    //     setAlertData({
    //       type: "error",
    //       message: "Please fill in the description.",
    //     });
    //     setMissingDescription(true);
    //     setTimeout(() => {
    //       setAlertData(null);
    //       setMissingDescription(false);
    //     }, 2000);
    
    //     return; 
    //   }
  
      
  
    //   if (!user.techmobile.trim()) {
    //     setAlertData({
    //       type: "error",
    //       message: "Please fill in the Mobile.",
    //     });
    //     setMissingMobile(true);
    //     setTimeout(() => {
    //       setAlertData(null);
    //       setMissingMobile(false);
    //     }, 2000);
    
    //     return; 
    //   }
  
  
  
    //   if (!user.techemail.trim()) {
    //     setAlertData({
    //       type: "error",
    //       message: "Please fill in the Email.",
    //     });
    //     setMissingEmail(true);
    //     setTimeout(() => {
    //       setAlertData(null);
    //       setMissingEmail(false);
    //     }, 2000);
    
    //     return; 
    //   }
  
  
      const FSinUsr = 33; // Your user ID logic here
    
      const requestBody = new FormData();
      requestBody.append("id", user.c_id);
      requestBody.append("mobile", user.c_mobile);
      requestBody.append("type", user.c_type);
      requestBody.append("name", user.c_cust);
      requestBody.append("add1", user.c_add1);
      requestBody.append("add2", user.c_add2);
      requestBody.append("contact", user.c_contant);
      requestBody.append("refid", user.c_refid);
      requestBody.append("prodid", user.c_prodid);
      requestBody.append("invno", user.c_invno);
      requestBody.append("warrty", user.c_warrty);
      requestBody.append("compid", user.c_comid);
      requestBody.append("remarks", user.c_remarks);
      requestBody.append("purdate", user.c_purdate);
      requestBody.append("email", user.c_email);
      requestBody.append("serial", user.c_serial);
      requestBody.append("sts", user.c_sts);
  
  // Assuming 'user' is an object with various fields
console.log('User Fields and Values:');
for (const [key, value] of Object.entries(user)) {
  console.log(`${key}: ${value}`);
}

      axios
        .post(
          `${apiLinks}/UpdateComplaint.php?c_id=${c_id}`,
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
              navigate("/Get_ComplainSheet");
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
    




///////////////////////////// tpye//////////////////////////

     const [selectedTypeId, setSelectedTypeId] = useState("");
     const [typedata, setTypeData] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiLinks}/GetType.php`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
  
        const apiData = await response.json();
        setTypeData(apiData);
  
        if (apiData.length > 0) {
          setSelectedTypeId(apiData[0].typid);
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchData();
  }, []);



///////////////////////////// referance //////////////////////////


///////////////////////////// Complain //////////////////////////



    // Create refs for each input field
    const c1 = useRef(null);
    const c2 = useRef(null);
    const c3 = useRef(null);
    const c4 = useRef(null);
    const c5 = useRef(null);
    const c6 = useRef(null);     
    const c7 = useRef(null);
    const c8 = useRef(null);
    const c9 = useRef(null);
    const c10 = useRef(null);
    const c11 = useRef(null);
    const c12 = useRef(null);
    const c13 = useRef(null);
    const c14 = useRef(null);
    const c15 = useRef(null);





    ///////////////////////////////////////////////////////////////////
    const [dataItem, setDataItem] = useState([]);
    const [selectedItemId, setSelectedItemId] = useState("");
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(`${apiLinks}/GetItem.php`);
          if (!response.ok) {
            throw new Error('Failed to fetch data');
          }
    
          const apiData = await response.json();
          setDataItem(apiData);
    
          // Set the selectedCategoryId with the first category ID from the API data
          if (apiData.length > 0) {
            setSelectedItemId(apiData[0].itmid);
          }
        } catch (error) {
          console.error(error);
        }
      };
    
      fetchData();
    }, []);
    
  const [selectedReferanceId, setSelectedReferanceId] = useState("");
  // const [refdata, setRefData] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState("");

    const [selectedProductId, setSelectedProductId] = useState("");
    const [selectedCompalainId, setSelectedComplainId] = useState("");
    const [dataCom, setDataCom] = useState([]);
  
    const [dataRef, setDataRef] = useState([]);
    const [dataPro, setDataPro] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(`${apiLinks}/GetType.php`);
          if (!response.ok) {
            throw new Error('Failed to fetch data');
          }
    
          const apiData = await response.json();
          setData(apiData);
    
          // Set the selectedCategoryId with the first category ID from the API data
          if (apiData.length > 0) {
            setSelectedCategoryId(apiData[0].tctgid);
          }
        } catch (error) {
          console.error(error);
        }
      };
    
      fetchData();
    }, []);
  
  

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(`${apiLinks}/GetReference.php`);
          if (!response.ok) {
            throw new Error('Failed to fetch data');
          }
    
          const apiData = await response.json();
          setDataRef(apiData);
    
          // Set the selectedCategoryId with the first category ID from the API data
          if (apiData.length > 0) {
            setSelectedReferanceId(apiData[0].refid);
          }
        } catch (error) {
          console.error(error);
        }
      };
    
      fetchData();
    }, []);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(`${apiLinks}/GetComplaintType.php`);
          if (!response.ok) {
            throw new Error('Failed to fetch data');
          }
    
          const apiData = await response.json();
          setDataCom(apiData);
    
          // Set the selectedCategoryId with the first category ID from the API data
          if (apiData.length > 0) {
            setSelectedComplainId(apiData[0].comid);
          }
        } catch (error) {
          console.error(error);
        }
      };
    
      fetchData();
    }, []);
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
      
{alertData && displayAlert(alertData.type, alertData.message)}
<Header  />

<PathHead pageName="Transaction > Complaint Sheet > Update Coplaint Sheet" screen="Item"  pageLink="/Get_ComplainSheet"/>

    <div className="col-12" style={{ color: 'black' ,fontFamily: 'Verdana', fontWeight:'bold' }}>
      

      <div
        className="row"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "1px",
          backgroundColor: "#f5f5f5",
          minHeight: "100vh",
          overflowY: "scroll", // Enable vertical scrolling
          height: "calc(100vh - 200px)", // Set an appropriate height
        }}
      >
        <div className="col-md-12 form-container"
         style={{
          backgroundColor: "#fff",
          borderRadius: "10px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          padding: "7px",
          width: "100%",
          maxWidth: "750px",
          margin: "20px 0",border:'1px solid black',
          fontSize: '12px' , position: 'absolute', top: '53%', left: '50%', transform: 'translate(-50%, -50%)'
        }}
        >
          <Form onSubmit={handleFormSubmit}>
          <div className="row">



          {/* colSpan="3" */}
          {/* style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', marginRight: '10px' }} */}
<div className="col-12" >
<table style={{ border: 'none', width: '100%' }}>
  <tbody> 


{/* ///////////////// 1 row */}
<tr>
<td              style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', marginRight: '10px' }}
>
<Form.Group style={{ display: 'flex' }}>
<Form.Label style={{ marginRight: '10px' }}>Complaint#:</Form.Label>

</Form.Group> 
</td>
<td  > 
<Form.Group style={{ display: 'flex' }}>
<Form.Control
type="text"
placeholder="Id"
name="seriall"
className="form-control"
value={user.c_id}
style={{ height: '24px',width:'70px' }}
onChange={handleInputChange}
onKeyDown={(e) => handleEnterKeyPress(c2, e)} 
      ref={c1}
      disabled
/>
</Form.Group> 

</td>
<td >
<Form.Group style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', marginRight: '10px' }}>
            <Form.Label style={{ marginRight: '10px' }}>Date: {value.date}</Form.Label>
          </Form.Group>
</td>
<td   style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', marginRight: '10px' }}> 
<Form.Group style={{ display: 'flex', alignItems: 'center' }}>
            <Form.Label style={{ marginRight: '10px' }}>Time: {value.time}</Form.Label>
          </Form.Group>

</td>
</tr>

{/* ///////////////// 2 row */}
<tr>
<td  style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', marginRight: '10px' }}>

<Form.Group style={{ display: 'flex', alignItems: 'center', marginTop: '-1%' }}>
<Form.Label style={{ marginRight: '10px'}}>Mobile No:</Form.Label>

</Form.Group>
</td>
<td  > 
<Form.Group style={{ display: 'flex', alignItems: 'center' }}>
<Form.Control
type="text"
placeholder="Mobile No."
name="c_mobile"
className="form-control"
value={user.c_mobile}
style={{ height: '24px',width:'170px'}}
onChange={handleInputChange}
maxLength={11}
onKeyDown={(e) => handleEnterKeyPress(c3, e)} 
      ref={c2}
/>
</Form.Group>
</td>
<td >
</td>
<td  > 
</td>
</tr>

{/* ///////////////// 3 row */}

<tr>
  <td              style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end',marginRight: '20px' }}
>



    <Form.Group  controlId="status" style={{ display: 'flex', alignItems: 'center' }}>
      <Form.Label>Type:</Form.Label>
      
    </Form.Group>
  </td>
  <td  > 



    <Form.Group controlId="status" style={{ display: 'flex', alignItems: 'center' }}>
      <Form.Control


as="select"
name="c_type"
value={user.c_type}
onChange={(e) => {
  setSelectedTypeId(e.target.value);
setUser((prevUser) => ({
  ...prevUser,
  c_type: e.target.value,
}));
}}
id="c_type"
className="form-control custom-select"
style={{ height: '27px', fontSize: '11px',width:'170px'}}
onKeyDown={(e) => handleEnterKeyPress(c4, e)} 
ref={c3}


      >
        {typedata.map((item) => (
      <option
        key={item.typid}
        value={item.typid}
      >
        {item.typdsc}
      </option>
    ))}
      </Form.Control>
    </Form.Group>
  </td>
  <td  >
</td>
<td  > 
</td>
</tr>

{/* ///////////////// 4 row */}
<tr>
<td              style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', marginRight: '10px' }}
>
<Form.Group style={{ display: 'flex', alignItems: 'center' }}>
<Form.Label style={{ marginRight: '10px' }}>Customer Name:</Form.Label>

</Form.Group>
</td>
<td  > 
<Form.Group style={{ display: 'flex', alignItems: 'center' }}>
<Form.Control
type="text"
placeholder="Customer Name"
name="c_cust"
className="form-control"
value={user.c_cust}
style={{ height: '24px' }}
onChange={handleInputChange}
onKeyDown={(e) => handleEnterKeyPress(c5, e)} 
ref={c4}
maxLength={40}
/>
</Form.Group>
</td>
<td  >
</td>
<td  > 
</td>
</tr> 
{/* ///////////////// 5 row */}
<tr>
<td              style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', marginRight: '10px' }}
>
<Form.Group style={{ display: 'flex', alignItems: 'center' }}>
<Form.Label style={{ marginRight: '10px' }}>Address:</Form.Label>


</Form.Group>
</td>
<td  > 
<Form.Group style={{ display: 'flex', alignItems: 'center' }}>
<Form.Control
type="text"
placeholder="Address1"
name="c_add1"
className="form-control"
value={user.c_add1}
style={{ height: '24px' }}
onChange={handleInputChange}
onKeyDown={(e) => handleEnterKeyPress(c6, e)} 
      ref={c5}
/>

</Form.Group>
</td>
<td  >
</td>
<td  > 
</td>
</tr>
{/* ///////////////// 6 row */}
<tr>
<td  >
</td>
<td  > 
<Form.Group style={{ display: 'flex', alignItems: 'center' }}>
<Form.Control
type="text"
placeholder="Address2"
name="c_add2"
className="form-control"
value={user.c_add2}
style={{ height: '24px'}}
onChange={handleInputChange}
onKeyDown={(e) => handleEnterKeyPress(c7, e)} 
      ref={c6}
/>

</Form.Group>
</td>
<td  >
</td>
<td  > 
</td>
</tr>


{/* ///////////////// 7 row */}

<tr>




<td              style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end' }}
>



    <Form.Group  controlId="status" style={{ display: 'flex', alignItems: 'center' }}>
      <Form.Label style={{ marginRight: '20px' }}>Product:</Form.Label>
      
    </Form.Group>
  </td>
  <td  > 



    <Form.Group controlId="status" style={{ display: 'flex', alignItems: 'center' }}>
      <Form.Control


as="select"
name="c_prodid"
value={user.c_prodid}
onChange={(e) => {
  setSelectedItemId(e.target.value);
setUser((prevUser) => ({
  ...prevUser,
  c_prodid: e.target.value,
}));
}}
id="c_prodid"
className="form-control custom-select"
style={{ height: '27px', fontSize: '11px',width:'270px'}}
onKeyDown={(e) => handleEnterKeyPress(c8, e)} 
ref={c7}


      >
        {dataItem.map((item) => (
      <option
        key={item.itmid}
        value={item.itmid}
      >
        {item.itmdsc}
      </option>
    ))}
      </Form.Control>
    </Form.Group>
  </td>













<td  style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', marginRight: '10px' }}>
<Form.Group style={{ display: 'flex' }}>
<Form.Label >Email:</Form.Label>

</Form.Group>
</td>
<td  > 
<Form.Group style={{ display: 'flex'}}>
<Form.Control
type="text"
placeholder="Email"
name="c_email"
className="form-control"
value={user.c_email}
style={{ height: '24px', width: '170px' }}
onChange={handleInputChange}
onKeyDown={(e) => handleEnterKeyPress(c9, e)} 
      ref={c8}
/>
</Form.Group>
</td>
</tr>
{/* ///////////////// 8 row */}
<tr>
  <td              style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end' }}
>



    <Form.Group  controlId="status" style={{ display: 'flex', alignItems: 'center' }}>
      <Form.Label style={{ marginRight: '20px' }}>Referance:</Form.Label>
      
    </Form.Group>
  </td>
  <td  > 



    <Form.Group controlId="status" style={{ display: 'flex', alignItems: 'center' }}>
      <Form.Control


as="select"
name="c_refid"
value={user.c_refid}

onChange={(e) => {
  setSelectedReferanceId(e.target.value);
  setUser((prevUser) => ({
    ...prevUser,
    c_refid: e.target.value,
  }));
}}

id="refid"
className="form-control custom-select"
style={{ height: '27px', fontSize: '11px',width:'150px'}}
onKeyDown={(e) => handleEnterKeyPress(c10, e)} 
ref={c9}

      >
        {dataRef.map((item) => (
      <option
        key={item.refid}
        value={item.refid}
      >
        {item.refdsc}
      </option>
    ))}
      </Form.Control>
    </Form.Group>
  </td>


  <td              style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', marginRight: '10px' }}
>
<Form.Group style={{ display: 'flex', alignItems: 'center'}}>
<Form.Label style={{ marginRight: '10px' }}>Contact No:</Form.Label>

</Form.Group>
</td>
<td  > 
<Form.Group style={{ display: 'flex', alignItems: 'center' }}>
<Form.Control
type="text"
placeholder="Contact No."
name="c_contant"
className="form-control"
value={user.c_contant}
style={{ height: '24px', width: '150px' }}
onChange={handleInputChange}
onKeyDown={(e) => handleEnterKeyPress(c11, e)} 
      ref={c10}
/>
</Form.Group>
</td>





</tr>

{/* ///////////////// 9 row */}

<tr>
<td  style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', marginRight: '10px' }}>
<Form.Group style={{ display: 'flex' }}>
<Form.Label style={{ marginRight: '10px'}}>Invoice No:</Form.Label>

</Form.Group>
</td>
<td> 
<Form.Group style={{ display: 'flex'}}>
<Form.Control
type="text"
placeholder="Invoice No"
name="c_invno"
className="form-control"
value={user.c_invno}
style={{ height: '24px', width: '170px' }}
onChange={handleInputChange}
onKeyDown={(e) => handleEnterKeyPress(c12, e)} 
      ref={c11}
/>
</Form.Group>
</td>
<td>
        <Form.Group style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', marginRight: '10px' }}>
        <Form.Label >Warrently:</Form.Label>
        </Form.Group>
      </td>
      <td >
        <Form.Group style={{ display: 'flex', alignItems: 'center' }}>
          <Form.Control
               as="select"
               name="warrtyy"
               value={user.c_warrty}
               onChange={(e) => setSelectedStatus(e.target.value)}
               style={{ height: '30px', width: '60px', fontSize: '11px' }}
               onKeyDown={(e) => handleEnterKeyPress(c13, e)} 
      ref={c12}
              //  onKeyDown={(e) => handleEnterKeyPress(buttonRef, e)} // Move to the next input on Enter key press
              //   ref={statusRef}
                >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </Form.Control>
        </Form.Group>
      </td>
</tr>

{/* ///////////////// 10 row */}


  <tr>
      <td style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
        <Form.Group controlId="status" style={{ display: 'flex', alignItems: 'center' }}>
          <Form.Label style={{ marginRight: '20px' }}>Complain:</Form.Label>
        </Form.Group>
      </td>
      <td>
        <Form.Group controlId="status" style={{ display: 'flex', alignItems: 'center' }}>
          <Form.Control
            as="select"
            name="c_comid"
            value={user.c_comid}
            onChange={(e) => {
              setSelectedComplainId(e.target.value);
              setUser((prevUser) => ({
                ...prevUser,
                c_comid: e.target.value,
              }));
            }}
            id="comid"
            className="form-control custom-select"
            style={{ height: '27px', fontSize: '11px', width: '150px' }}
            onKeyDown={(e) => handleEnterKeyPress(c14, e)}
            ref={c13}
          >
            {dataCom.map((item) => (
              <option key={item.comid} value={item.comid}>
                {item.comdsc}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
      </td>
      <td></td>
      <td></td>
    </tr>


{/* ///////////////// 11 row */}

<tr>
<td  style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', marginRight: '10px' }}>
<Form.Group style={{ display: 'flex' }}>
<Form.Label style={{ marginRight: '10px' }}>Remarks:</Form.Label>

</Form.Group>
</td>
<td > 
<Form.Group style={{ display: 'flex' }}>
<Form.Control
as="textarea" // Set the input type to textarea
rows={4} // Specify the number of rows (adjust as needed)
placeholder="Remarks"
name="c_remarks"
className="form-control"
value={user.c_remarks}
style={{ width: '270px' }}
onChange={handleInputChange}
onKeyDown={(e) => handleEnterKeyPress(c15, e)} 
      ref={c14}
/>
</Form.Group>
</td>
<td  >
</td>
<td  > 
</td>
</tr>











    

    

  </tbody>
</table>
</div>



</div>
<Button
                  className="btn btn-primary"
                  style={{
                    backgroundColor: primaryColor,
                    height: "4%",
                    fontSize: "11px",
                    color: secondaryColor,
                    width: "25%",
                    marginRight: "2%",
                  }}
                  onClick={handleFormSubmit}
                  // onKeyDown={(e) => handleEnterKeyPress(statusRef, e)} 
                  ref={c15}
                >
                  SUBMIT
                </Button>
                
            </Form>
        </div>
      </div>
      <br />
    </div>
    </div>
    <Footer/>
  </>
);
//     return (
//       <>
//          <div
//           style={{
//             position: "relative",
//             width: "100%",
//             height: "100vh",
//             overflow: "hidden",
//           }}
//         >
//        {alertData && displayAlert(alertData.type, alertData.message)}
  
//   <Header />
  
//   <PathHead pageName="File > Technical Maintenance > Update Technical"  screen='Update_Item' pageLink="/Get_ComplainSheet"/>
  
//         <div className="col-12" style={{ color: 'black' ,fontFamily: 'Verdana',fontWeight:'bold' }}>
          
  
//           <div
//             className="row"
//             style={{
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//               padding: "5px",
//               backgroundColor: "#f5f5f5",
//               minHeight: "100vh",
//             }}
//           >
//             <div className="col-md-12 form-container"
//             style={{
//               backgroundColor: "#fff",
//               borderRadius: "10px",
//               boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
//               padding: "10px",border:'1px solid black',
//               width: "100%",
//               maxWidth: "500px",
//               margin: "20px 0",
//               fontSize:'12px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'
//             }}
//             >
//               <Form onSubmit={handleSubmit} style={{marginRight:'30px'}}>
//               <div className="row">
  
  
    
//   <div className="col-12">
//     <table style={{ border: 'none', width: '100%' }}>
//       <tbody > 
//       <tr>
//     <td>
//       <Form.Group style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', marginRight: marginRightinput }}>
//         <Form.Label>Id:</Form.Label>
//       </Form.Group>
//     </td>
//     <td colSpan="2"> 
//       <Form.Group style={{ display: 'flex', alignItems: 'center' }}>
//         <Form.Control
//             type="text"
//             id="code"
//             placeholder=" Id"
//             className="form-control"
//             name="c_id"
//             value={user.c_id}
//             style={{height:'24px',width:'70px'}}
//             onChange={handleInputChange}
//             disabled
//             maxLength={4}
//         />
//       </Form.Group>
//     </td>
//   </tr>
//       <tr>
//     <td>
//       <Form.Group style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', marginRight: marginRightinput }}>
//         <Form.Label>Mobile:</Form.Label>
//       </Form.Group>
//     </td>
//     <td colSpan="3"> 
//       <Form.Group style={{ display: 'flex', alignItems: 'center' }}>
//         <Form.Control
//         type="text"
//         id="code"
//         placeholder="Mobile"
//         className="form-control"
//         name="c_mobile"
//         value={user.c_mobile}
//         style={{height:'24px' , borderColor: missingDescription ? 'red' : null }}
//         onChange={handleInputChange}
//         maxLength={40}
//       onKeyDown={(e) => handleEnterKeyPress(c_typeRef, e)} // Move to the next input on Enter key press
//       ref={c_mobileRef}
//         />
//       </Form.Group>
//     </td>
//   </tr>
  
  
//   <tr>
//   <td              style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end' }}
// >



//     <Form.Group  controlId="status" style={{ display: 'flex', alignItems: 'center' }}>
//       <Form.Label style={{ marginRight: '10px' }}>Type:</Form.Label>
      
//     </Form.Group>
//   </td>
//   <td  > 



//     <Form.Group controlId="status" style={{ display: 'flex', alignItems: 'center' }}>
//       <Form.Control


//         as="select"
//         name="c_type"
//         value={user.c_type}
//         onChange={(e) => {
//         setSelectedTypeId(e.target.value);
//         setUser((prevUser) => ({
//           ...prevUser,
//           techid: e.target.value,
//         }));
//         }}
//         id="c_type"
//         className="form-control custom-select"
//         style={{ height: '27px', fontSize: '11px',width:'150px'}}
//         onKeyDown={(e) => handleEnterKeyPress(c_custRef, e)} 
//         ref={c_typeRef}
//       >
//         {typedata.map((item) => (
//       <option
//         key={item.typid}
//         value={item.typid}
//       >
//         {item.typdsc}
//       </option>
//     ))}
//       </Form.Control>
//     </Form.Group>
//   </td>
//   <td  >
// </td>
// <td  > 
// </td>
// </tr>
  




// <tr>
//           <td>
//             <Form.Group style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', marginRight: marginRightinput }}>
//               <Form.Label>Customer:</Form.Label>
//             </Form.Group>
//           </td>
//           <td colSpan="3">
//             <Form.Group style={{ display: 'flex', alignItems: 'center' }}>
//               <Form.Control
//                 type="text"
//                 id="code"
//                 placeholder="Customer"
//                 name="c_cust"
//                 className="form-control"
//                 value={user.c_cust}
//                 style={{ height: '24px'}}
//                 onChange={handleInputChange}
//                 onKeyDown={(e) => handleEnterKeyPress(c_add1Ref , e)} // Move to the next input on Enter key press
//                 ref={c_custRef}
//                 maxLength={40}
//               />
//             </Form.Group>
//           </td>
          
//         </tr>



//         <tr>
//           <td>
//             <Form.Group style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', marginRight: marginRightinput }}>
//               <Form.Label>Address:</Form.Label>
//             </Form.Group>
//           </td>
//           <td colSpan="3">
//             <Form.Group style={{ display: 'flex', alignItems: 'center' }}>
//               <Form.Control
//                 type="text"
//                 id="code"
//                 placeholder="Address1"
//                 name="c_add1"
//                 className="form-control"
//                 value={user.c_add1}
//                 style={{ height: '24px'}}
//                 onChange={handleInputChange}
//                 onKeyDown={(e) => handleEnterKeyPress(c_add2Ref , e)} // Move to the next input on Enter key press
//                 ref={c_add1Ref  }
//                 maxLength={40}
//               />
//             </Form.Group>
//           </td>
          
//         </tr>
  
//         <tr>
//           <td>
  
//           </td>
//           <td colSpan="3">
//             <Form.Control
//              type="text"
//              id="code"
//              placeholder="Address2"
//              name="c_add2"
//              className="form-control"
//              value={user.c_add2}
//               style={{ height: '24px'}}
//               onChange={handleInputChange}
//               onKeyDown={(e) => handleEnterKeyPress(c_contantRef , e)} // Move to the next input on Enter key press
//               ref={c_add2Ref  }
//               maxLength={40}
//             />
//           </td>
         
//         </tr>
  
//         <tr>
//           <td>
//             <Form.Group style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', marginRight: marginRightinput }}>
//               <Form.Label>Contact:</Form.Label>
//             </Form.Group>
//           </td>
//           <td  colSpan="1">
//             <Form.Group style={{ display: 'flex', alignItems: 'center' }}>
//               <Form.Control
//                type="text"
//                id="code"
//                placeholder="Phone"
//                name="c_contant"
//                className="form-control"
//                value={user.c_contant}
//                 style={{ height: '24px',width: '70%' }}
//                 onChange={handleInputChange}
//                 onKeyDown={(e) => handleEnterKeyPress(c_refidRef , e)} // Move to the next input on Enter key press
//                 ref={c_contantRef  }
//                 maxLength={16}
//               />
//             </Form.Group>
//           </td>
          
//         </tr>
//         <tr>
//   <td              style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end' }}
// >



//     <Form.Group  controlId="status" style={{ display: 'flex', alignItems: 'center' }}>
//       <Form.Label style={{ marginRight: '10px' }}>Referance:</Form.Label>
      
//     </Form.Group>
//   </td>
//   <td  > 



//     <Form.Group controlId="status" style={{ display: 'flex', alignItems: 'center' }}>
//       <Form.Control


//         as="select"
//         name="c_refid"
//         value={user.c_refid}
//         onChange={(e) => {
//         setSelectedReferanceId(e.target.value);
//         setUser((prevUser) => ({
//           ...prevUser,
//           c_refid: e.target.value,
//         }));
//         }}
//         id="c_type"
//         className="form-control custom-select"
//         style={{ height: '27px', fontSize: '11px', width:'150px'}}
//         onKeyDown={(e) => handleEnterKeyPress(c_prodidRef, e)} 
//         ref={c_refidRef}
//       >
//         {refdata.map((item) => (
//       <option
//         key={item.refid}
//         value={item.refid}
//       >
//         {item.refdsc}
//       </option>
//     ))}
//       </Form.Control>
//     </Form.Group>
//   </td>
//   <td  >
// </td>
// <td  > 
// </td>
// </tr>
  
// <tr>
//   <td              style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end' }}
// >



//     <Form.Group  controlId="status" style={{ display: 'flex', alignItems: 'center' }}>
//       <Form.Label style={{ marginRight: '10px' }}>Product:</Form.Label>
      
//     </Form.Group>
//   </td>
//   <td  > 



//     <Form.Group controlId="status" style={{ display: 'flex', alignItems: 'center' }}>
//       <Form.Control


//         as="select"
//         name="c_refid"
//         value={user.c_refid}
//         onChange={(e) => {
//         setSelectedReferanceId(e.target.value);
//         setUser((prevUser) => ({
//           ...prevUser,
//           c_refid: e.target.value,
//         }));
//         }}
//         id="c_type"
//         className="form-control custom-select"
//         style={{ height: '27px', fontSize: '11px', width:'150px'}}
//         onKeyDown={(e) => handleEnterKeyPress(c_invnoRef, e)} 
//         ref={c_prodidRef}
//       >
//         {refdata.map((item) => (
//       <option
//         key={item.refid}
//         value={item.refid}
//       >
//         {item.refdsc}
//       </option>
//     ))}
//       </Form.Control>
//     </Form.Group>
//   </td>
//   <td  >
// </td>
// <td  > 
// </td>
// </tr>







  
//         <tr>
//           <td>
//             <Form.Group style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', marginRight: marginRightinput }}>
//             <Form.Label>Invoice:</Form.Label>
//             </Form.Group>
//           </td>
//           <td colSpan="1">
//     <Form.Group style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//       <Form.Control
//        type="text"
//        id="code"
//        placeholder="Mobile"
//        name="c_invno"
//        className="form-control"
//        value={user.c_invno}
//        style={{ height: '24px', width: '55%', borderColor: missingMobile ? 'red' : null }}
//        onChange={handleInputChange}
//        onKeyDown={(e) => handleEnterKeyPress(c_warrtyRef , e)} // Move to the next input on Enter key press
//        ref={c_invnoRef  }
//        maxLength={11}
//       />
//      <div style={{ display: 'flex', alignItems: 'center' }}>
//      <Form.Check.Label htmlFor="smsCheckbox" >
      
//     </Form.Check.Label>
    
  
   
//   </div>
  
  
//     </Form.Group>
//           </td>
//           <td></td>
//           <td></td>
//         </tr>
  
//         <tr>
//           <td>
//             <Form.Group controlId="status" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', marginRight: marginRightinput }}>
//               <Form.Label>Warrently:</Form.Label>
//             </Form.Group>
//           </td>
//           <td>
//             <Form.Group style={{ display: 'flex', alignItems: 'center' }}>
//             <Form.Control
  
//   as="select"
  
//   name="c_warrty"
//   value={user.c_warrty}
//   onChange={handleInputChange}
//   className="form-control"
// //   onKeyDown={(e) => handleEnterKeyPress(c_comidRef , e)} 
//   ref={c_warrtyRef }
//   style={{height:'27px', fontSize:'11px', width:'70px'}}
//   >
//     <option value="Yes">Yes</option>
//     <option value="No">No</option>
//   </Form.Control>
//             </Form.Group>
//           </td>
//           <td></td>
//           <td></td>
//         </tr>
  
  
  
  
  
//         <tr>
//   <td              style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end' }}
// >



//     <Form.Group  controlId="status" style={{ display: 'flex', alignItems: 'center' }}>
//       <Form.Label style={{ marginRight: '10px' }}>Complain:</Form.Label>
      
//     </Form.Group>
//   </td>
//   <td  > 



//     <Form.Group controlId="status" style={{ display: 'flex', alignItems: 'center' }}>
//       <Form.Control


//         as="select"
//         name="c_comid"
//         value={user.c_comid}
//         onChange={(e) => {
//         setSelectedComplainId(e.target.value);
//         setUser((prevUser) => ({
//           ...prevUser,
//           c_comid: e.target.value,
//         }));
//         }}
//         id="c_type"
//         className="form-control custom-select"
//         style={{ height: '27px', fontSize: '11px', width:'150px'}}
//         // onKeyDown={(e) => handleEnterKeyPress(c_remarksRef, e)} 
//         ref={c_comid}
//       >
//         {comdata.map((item) => (
//       <option
//         key={item.comid}
//         value={item.comid}
//       >
//         {item.comdsc}
//       </option>
//     ))}
//       </Form.Control>
//     </Form.Group>
//   </td>
//   <td  >
// </td>
// <td  > 
// </td>
// </tr>



// {/* ///////////////// 12 row */}

// <tr>
//   <td  style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', marginRight: '10px' }}>
//   <Form.Group style={{ display: 'flex' }}>
// <Form.Label style={{ marginRight: '10px' }}>Remarks:</Form.Label>

// </Form.Group>
//   </td>
//   <td > 
//   <Form.Group style={{ display: 'flex' }}>
// <Form.Control
// as="textarea" // Set the input type to textarea
// rows={4} // Specify the number of rows (adjust as needed)
// placeholder="Remarks"
//        name="c_remarks"
//        className="form-control"
//        value={user.c_remarks}
// style={{ width: '270px' }}
// onChange={handleInputChange}
// // onKeyDown={(e) => handleEnterKeyPress(buttonRef, e)} 
//         ref={c_remarks}
// />
// </Form.Group>
//   </td>
//   <td  >
// </td>
// <td  > 
// </td>
// </tr>

//   <tr>
//     <td></td>
//     <td>
//     <br />
//   <Button
//                       className="btn btn-primary"
//                       style={{
//                         backgroundColor: primaryColor,
//                         height: "4%",
//                         fontSize: "11px",
//                         color: secondaryColor,
//                         width: "50%",
//                         marginRight: "2%",
//                       }}
//                       onClick={handleSubmit}
//                       // onKeyDown={(e) => handleEnterKeyPress(descriptionRef  , e)} // Move to the next input on Enter key press
//                       ref={ButtonRef }
//                     >
//                       SUBMIT
//                     </Button>
//     </td>
//     <td></td>
//     <td></td>
//   </tr>
//       </tbody>
//     </table>
//   </div>
  
//   </div>
  
                    
//                 </Form>
//             </div>
//           </div>
//           <br />
//         </div>
//         </div>
//         <Footer/>
//       </>
//     );
  }
  
  export default Update_ComplainSheet;

