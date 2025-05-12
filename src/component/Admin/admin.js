import Aside from "../Sidebar/Aside";
import "./Admin.scss";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { FaBars } from "react-icons/fa";
import { useState } from "react";
import ManagerUser from "./Content/ManagerUser";

import "react-toastify/dist/ReactToastify.css";
import { Outlet } from "react-router-dom";
  const Admin = (props) => {
  const [collapsed, setcolapsed] = useState(false);
  
  return (
    <div className="Admin-container">
      <div className="Admin-Sidebar">
        <Aside collapsed={collapsed} /> 
      </div>
      <div className="Admin-content">
        <div className="Admin-Header">
          <FaBars onClick={() => setcolapsed(!collapsed)} />
        </div>
        <div className="Admin-Body  d-flex">
           <Outlet /> 
        </div>
      </div>
    </div>
  );
};
export default Admin;
