import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
import HomePage2 from './Component/MainComponent/HomePage2/HomePage2';
import HomePage1 from './Component/MainComponent/HomePage/Homepage';
import Login from './Component/MainComponent/Login/Login';

import AuthProvider from './AuthContext';

import { ThemeProvider } from './ThemeContext'; // Import the ThemeProvider

import { RowIdProvider } from './createContext';
import Get_Technical from './Component/File/Technical_Maintenance/Get_Technical/Get_Technical';
import Add_Technical from './Component/File/Technical_Maintenance/Add_Technical/Add_Technical';
import Get_Installer from './Component/File/Installer_Maintenance/Get_Installer/Get_Installer';
import Add_Installer from './Component/File/Installer_Maintenance/Add_Installer/Add_Installer';
import Get_Item from './Component/File/Item_Maintenance/Get_Item/Get_Item';
import Add_Item from './Component/File/Item_Maintenance/Add_Item/Add_Item';
import Complain_Sheet from './Component/Transaction/Complain_Sheet/Add_ComplainSheet/Complain_Sheet';
import Get_Referance from './Component/File/Referance_Maintenance/Get_Referance/Get_Referance';
import Add_Referance from './Component/File/Referance_Maintenance/Add_Referance/Add_Referance';
import Get_Complain from './Component/File/Complain_Maintenace/Get_Complain/Get_Complain';
import Add_Complaint from './Component/File/Complain_Maintenace/Add_Complain/Add_Complain';
import Add_Complain from './Component/File/Complain_Maintenace/Add_Complain/Add_Complain';
import Get_Type from './Component/File/Type_Maintenace/Get_Type/Get_Type';
import Add_Type from './Component/File/Type_Maintenace/Add_Type/Add_Type';
import Item_Sheet from './Component/Transaction/Item_Sheet/Item_Sheet';
import Update_Technical from './Component/File/Technical_Maintenance/Update_Technical/Update_Technical';
import Update_Installer from './Component/File/Installer_Maintenance/Update_Installer/Update_Installer';
import Update_Referance from './Component/File/Referance_Maintenance/Update_Referance/Update_Referance';
import Update_Type from './Component/File/Type_Maintenace/Update_Type/Update_Type';
import Update_Complain from './Component/File/Complain_Maintenace/Update_Complain/Update_Complain';
import Update_Item from './Component/File/Item_Maintenance/Update_Item/Update_Item';
import Get_Area from './Component/File/Area_Maintenance/Get_Area/Get_Area';
import Add_Area from './Component/File/Area_Maintenance/Add_Area/Add_Area';
import Update_Area from './Component/File/Area_Maintenance/Update_Area/Update_Area';
import Get_Mobile from './Component/File/Mobile_Maintenance/Get_Mobile/Get_Mobile';
import Add_Mobile from './Component/File/Mobile_Maintenance/Add_Mobile/Add_Mobile';
import Update_Mobile from './Component/File/Mobile_Maintenance/Update_Mobile/Update_Mobile';
import Get_Category from './Component/File/Category_Maintenace/Get_Category/Get_Category';
import Add_Category from './Component/File/Category_Maintenace/Add_Category/Add_Category';
import Update_Category from './Component/File/Category_Maintenace/Update_Category/Update_Category';
import Get_ComplainSheet from './Component/Transaction/Complain_Sheet/Get_ComplainSheet/Get_ComplainSheet';
import Add_ComplainSheet from './Component/Transaction/Complain_Sheet/Add_ComplainSheet/Complain_Sheet';
import Update_ComplainSheet from './Component/Transaction/Complain_Sheet/Edit_ComplainSheet/Update_ComplainSheet';
import Technician_Assignment from './Component/Transaction/Technician_Assignment/Technician_Assignment';
import Update_TechnicianAssignment from './Component/Transaction/Technician_Assignment/Update_TechnicianAssignment/Update_TechnicianAssignment';
import Technician_Visit from './Component/Transaction/Technician_Visit/Technician_Visit';
import Update_TechnicianVisit from './Component/Transaction/Technician_Visit/Update_TechnicianVisit/Update_TechnicianVisit';
import Closed_Complaint from './Component/Transaction/Closed_Complaint/Closed_Complaint';
import Update_ClosedComplaint from './Component/Transaction/Closed_Complaint/Update_CloseComplaint/Update_ClosedComplaint';
import Complaint_Report from './Component/Report/Complaint_Report/Complaint_Reports';
import Get_Comparison_Report from './Component/Report/Comparison_Report/Comparison_Report';
import Item_Comparison_Report from './Component/Report/Item_Comparison_Report/Item_Comparison_Report ';


function App() {
  return (
    <>
       

      <div style={{ backgroundColor: '#edf2ff', minHeight: '100vh' }}>
      <Router basename='/complaint/cms'>
      
    <AuthProvider>
      {/* Use the ThemeProvider */}
      <ThemeProvider>
      <RowIdProvider>
      <Routes>
<Route path="/" element={<Login />} />
<Route path="/login" element={<Login />} />
<Route path="/MainPage" element={<HomePage1 />} />

{/* File */}
<Route path="/Get_Technical" element={<Get_Technical />} />
<Route path="/Add_Technical" element={<Add_Technical />} />
<Route path="/Update_Technical/:techid" element={<Update_Technical />} />

{/* Installer */}
<Route path="/Get_Installer" element={<Get_Installer />} />
<Route path="/Add_Installer" element={<Add_Installer />} />
<Route path="/Update_Installer/:instid" element={<Update_Installer />} />

{/* Reference */}
<Route path="/Get_Referance" element={<Get_Referance />} />
<Route path="/Add_Referance" element={<Add_Referance />} />
<Route path="/Update_Referance/:refid" element={<Update_Referance />} />

{/* Item */}
<Route path="/Get_Item" element={<Get_Item />} />
<Route path="/Add_Item" element={<Add_Item />} />
<Route path="/Update_Item/:itmid" element={<Update_Item />} />

{/* Complain */}
<Route path="/Get_Complain" element={<Get_Complain />} />
<Route path="/Add_Complain" element={<Add_Complain />} />
<Route path="/Update_Complain/:comid" element={<Update_Complain />} />

{/* Type */}
<Route path="/Get_Type" element={<Get_Type />} />
<Route path="/Add_Type" element={<Add_Type />} />
<Route path="/Update_Type/:typid" element={<Update_Type />} />

{/* Area */}
<Route path="/Get_Area" element={<Get_Area />} />
<Route path="/Add_Area" element={<Add_Area />} />
<Route path="/Update_Area/:areaid" element={<Update_Area />} />


{/* Mobile */}
<Route path="/Get_Mobile" element={<Get_Mobile />} />
<Route path="/Add_Mobile" element={<Add_Mobile />} />
<Route path="/Update_Mobile/:mid" element={<Update_Mobile />} />

{/* Category */}
<Route path="/Get_Category" element={<Get_Category />} />
<Route path="/Add_Category" element={<Add_Category />} />
<Route path="/Update_Category/:tctgid" element={<Update_Category />} />
{/* Transaction */}
<Route path="/Get_ComplainSheet" element={<Get_ComplainSheet />} />


<Route path="/Update_ComplainSheet/:c_id" element={<Update_ComplainSheet />} />
<Route path="/Add_ComplainSheet" element={<Add_ComplainSheet />} />
<Route path="/Item_Sheet" element={<Item_Sheet />} />

{/* //////////////////// Technical_Assignment////////////////////////////// */}
<Route path="/Technician_Assignment" element={<Technician_Assignment />} />
<Route path="/Update_TechnicianAssignment/:c_id" element={<Update_TechnicianAssignment />} />
{/* //////////////////// Technician_Visit ////////////////////////////// */}
<Route path="/Technician_Visit" element={<Technician_Visit />} />
<Route path="/Update_TechnicianVisit/:c_id" element={<Update_TechnicianVisit />} />

{/* //////////////////// Technician_Visit ////////////////////////////// */}
<Route path="/Closed_Complaint" element={<Closed_Complaint />} />
<Route path="/Update_ClosedComplaint/:c_id" element={<Update_ClosedComplaint />} />








{/* /////////////////// ////////////////////////////// */}
{/* //////////////////////////////////////////// */}
{/* //////////////////////////////////////////////// */}
{/* ///////////////////     REPORT     //////////////////// */}
{/* //////////////////// cOMPLAINT REPORTS ////////////////////////////// */}

<Route path="/Complaint_Report" element={<Complaint_Report />} />
<Route path="/Get_Comparison_Report" element={<Get_Comparison_Report />} />
<Route path="/Item_Comparison_Report" element={<Item_Comparison_Report />} />






</Routes>

      </RowIdProvider>


      </ThemeProvider>
    </AuthProvider>
   

      </Router>

        
        
        
      </div>
     

    </>
  );
}

export default App;




 






