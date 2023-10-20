import React, { useState, useEffect ,useContext} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions'; // Add this import
import Header from '../../../MainComponent/Header/Header';
import Footer from '../../../MainComponent/Footer/Footer';
import PathHead from '../../../MainComponent/PathHead/PathHead';
import { useTheme } from '../../../../ThemeContext';
import { Form } from 'react-bootstrap'; // Add this import at the beginning of your file
import axios from 'axios';
import '../OrderCtg/OrderCtg.css'
import {
  Row,
  Col,
  FormControl,
  InputGroup,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import { RowIdContext } from '../../../../createContext';
const Order_Category = () => {
  const { rowId } = useContext(RowIdContext);

  const navigate = useNavigate();
  const { primaryColor, secondaryColor, apiLinks } = useTheme();
  const imageurl = `${apiLinks}/ctgImg/`;

  const [alertData, setAlertData] = useState(null);
  const { id } = useParams();

  const handleMenuItemClick = () => {
    navigate('/AddCategory');
  };

  const [data, setData] = useState([]);
  const [filterValue, setFilterValue] = useState('');
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://www.crystalsolutions.com.pk/grmetal/get_category.php');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const apiData = await response.json();
        setData(apiData);
        console.log('our data is in ti:',apiData)
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  const handleCardClick = (item) => {
    // Pass the selected category ID to the Item component
    navigate(`/Order_Item/${item.tctgid}`);
  };


  /////////////////////////////////////////////////////////////////////////
 /////////////////////////////////////////////////////////////////////////
 ///////////////////////////New ORder id generate ///////////////////////////////
 /////////////////////////////////////////////////////////////////////////
 const [Orderid, setOrderId] = useState(""); 
 function generateOrderid() {
  const apiUrl = `${apiLinks}/NewOrder.php`;
  
  // Create an empty form data object
  const formData = new URLSearchParams().toString();

  // Make a POST request to the API
  axios
    .post(apiUrl, formData)
    .then((response) => {
        if (response.data.error === 200) {
            setOrderId(response.data.orderid);

      console.log("New Order id generated:", response.data.orderid);
          setAlertData({
            type: "success",
            message: `${response.data.message}`,
          });
          setTimeout(() => {
            setAlertData(null);
          }, 1000);
          
        }
         else {
          console.log(response.data.message);

          setAlertData({
            type: "error",
            message: `${response.data.message}`,
          });
          setTimeout(() => {
            setAlertData(null);
          }, 2000);
        }
        // navigate("/Item");

      })
      .catch((error) => {
        // Handle errors
        console.error("Error:", error);
      });

  
}
  return (
    // <div className="col-12">
    <>
      {/* <Header id={id}/> */}
      <Header id={rowId} screen="OrderCategory" />

      <PathHead pageName="Transaction > Order > Category" />

      <br />
      <br />
      <Row style={{marginLeft: '5%',
          marginRight: '5%'}}>
              <Col xs={12} sm={4} md={4} lg={4} xl={2}>
                <Button
                  className="btn btn-primary"
                  style={{
                    backgroundColor: primaryColor,
                    fontSize: '11px',
                    color: secondaryColor,
                    width: '100%',
                    marginBottom: '10px',
                  }}
                  onClick={handleMenuItemClick}
                >
                  ADD
                </Button>
              </Col>
              <Col xs={12} sm={4} md={4} lg={4} xl={2}>
                <Button
                  className="btn btn-primary"
                  onClick={() => navigate('/Order_Number')}
                  style={{
                    backgroundColor: primaryColor,
                    fontSize: '11px',
                    color: secondaryColor,
                    width: '100%',
                    marginBottom: '10px',
                  }}
                >
                  Return
                </Button>
              </Col>
             
              <Col xs={12} sm={4} md={4} lg={4} xl={{ span: 2, offset: 6 }}>
    <Form.Control
     
      type="text"
      placeholder="Search..."
      className="form-control"
      value={filterValue}
      onChange={(e) => setFilterValue(e.target.value)}
    />
  </Col>

            </Row>
      <div
        className="card-container" // Add this class to the container div
        style={{
          // Your existing styles for the container div
          marginLeft: '5%',
          marginRight: '5%',
          overflowX: 'hidden', // Hide horizontal overflow
          overflowY: 'auto',
          maxHeight: '65vh',
        }}
        
      >
        
         
        <div >
        <div className="cards" style={{ display: 'flex', flexWrap: 'wrap' }}>
      {data
        .filter((item) =>
          item.tctgdsc.toLowerCase().includes(filterValue.toLowerCase())
        )
        .filter((item) => item.tctgsts === 'Y')
        .map((item) => (
          <Card
            key={item.id}
            sx={{
              maxWidth: 345,
              margin: '8px',
              width: '18.5%', // Set the width of each card
              backgroundColor: primaryColor,
            }}
          >
            <CardContent
              style={{
                color: secondaryColor,
                height: '100px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <Link
                to={`/Order_Item/${item.id}`}
                style={{ textDecoration: 'none', color: secondaryColor }}
              >
                <Typography
                  gutterBottom
                  component="div"
                  style={{
                    fontSize: '18px',
                    textAlign: 'center',
                    fontWeight: 'bold',
                  }}
                >
                  {item.tctgdsc}
                </Typography>
              </Link>
              {/* Add any additional information you want to display */}
            </CardContent>
          </Card>
        ))}
    </div>
        </div>
      </div>
      <Footer />
      </>
  
  );
};

export default Order_Category;

// import CardActions from "@mui/material/CardActions";
// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import Card from 'react-bootstrap/Card';
// import Col from 'react-bootstrap/Col';
// import Row from 'react-bootstrap/Row';
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
// import Header from '../../MainComponent/Header/Header';
// import Footer from '../../MainComponent/Footer/Footer';
// import PathHead from '../../MainComponent/PathHead/PathHead';
// import { useTheme } from '../../../ThemeContext';
// import '../Order/OrderCtg.css';

// const Order_Category = () => {
//   const navigate = useNavigate();
//   const imageurl = 'https://www.crystalsolutions.com.pk/malikspicy/ctgImg/';
//   const { primaryColor, secondaryColor, apiLinks } = useTheme();

//   const handleMenuItemClick = () => {
//     navigate('/AddCategory');
//   };

//   const [data, setData] = useState([]);
//   const [filterValue, setFilterValue] = useState('');

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(`${apiLinks}/get_category.php`);
//         if (!response.ok) {
//           throw new Error('Failed to fetch data');
//         }

//         const apiData = await response.json();
//         setData(apiData);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleCardClick = (item) => {
//     navigate(`/Order_Item/${item.tctgid}`);
//   };

//   return (
//     <div className="col-12">
//       <Header />
//       <PathHead pageName="Transaction > Order > Category" />
//       <br />
//       <br />
//       <div
//         className="card-container"
//         style={{
//           marginLeft: '5%',
//           marginRight: '5%',
//           maxWidth: '90%',
//           overflowY: 'auto',
//           maxHeight: '70vh',
//         }}
//       >
//         <div className="col-12">
//           <div
//             style={{
//               display: 'flex',
//               alignItems: 'center',
//               marginLeft: '3.5%',
//               marginRight: '2.5%',
//             }}
//           >
//             <Button
//               variant="primary"
//               style={{
//                 backgroundColor: primaryColor,
//                 height: '4%',
//                 fontSize: '11px',
//                 color: secondaryColor,
//                 width: '15%',
//                 marginRight: '2%',
//               }}
//               onClick={handleMenuItemClick}
//             >
//               ADD
//             </Button>
//             <Button
//               variant="primary"
//               onClick={() => navigate('/MainPage')}
//               style={{
//                 backgroundColor: primaryColor,
//                 height: '4%',
//                 fontSize: '11px',
//                 color: secondaryColor,
//                 width: '15%',
//                 marginRight: '2%',
//               }}
//             >
//               Return
//             </Button>
//             <div style={{ marginLeft: 'auto', width: '21%' }}>
//               <Form.Control
//                 type="text"
//                 placeholder="Search..."
//                 value={filterValue}
//                 onChange={(e) => setFilterValue(e.target.value)}
//               />
//             </div>
//           </div>
//         </div>
//         <div >
//           <Row 
//           xs={1} sm={2} md={3} lg={6} 
//           className="g-2">
//             {data
//               .filter((item) =>
//                 item.tctgdsc.toLowerCase().includes(filterValue.toLowerCase())
//               )
//               .filter((item) => item.tctgsts === 'Yes')
//               .map((item) => (
//                 <Col key={item.tctgid}>
//                   <Card
//                     style={{
//                       // margin: '8px',
//                       // width: '100%',
//                       // height: '270px',

//                       maxWidth: 345,
//                 margin: '8px',
//                 width: '100%', // Set the width of each card
//                 height: '270px', // Set the height of each card
//                     }}
//                   >
//                     <Link to={`/Order_Item/${item.tctgid}`}>
//                       <Card.Img
//                         variant="top" height="140" style={{}}
//                         src={imageurl + item.tctgpic}
//                         alt="Category"
//                       />
//                     </Link>
//                     <Card.Body>
//                       <Card.Title style={{ fontSize: '18px', fontWeight: 'bold' }}>
//                         {item.tctgdsc}
//                       </Card.Title>
//                     </Card.Body>
//                     <CardActions>
//                  <Link to={`/UpdateCategory/${item.tctgid}`}>
//                    <Button size="small" style={{backgroundColor:primaryColor}}>
//                      Edit
//                    </Button>
//                  </Link>
//               </CardActions>
//                   </Card>
//                 </Col>
//               ))}
//           </Row>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default Order_Category;
