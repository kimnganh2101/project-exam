import React from 'react';
import 'react-pro-sidebar/dist/css/styles.css';
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from 'react-pro-sidebar';
import { FaTachometerAlt, FaGem, FaList, FaGithub, FaRegLaughWink, FaHeart } from 'react-icons/fa';
 import sidebarBg from '../../assets/bg2.jpg';
import { useNavigate } from "react-router-dom";
const Aside = (props) => {
const { image, collapsed, toggled, handleToggleSidebar } = props;
const navigate = useNavigate();
  const handleManager =  () =>{
    navigate('/admin/manager');
    // alert('ok')
  }
  return (
    <ProSidebar
      image={sidebarBg}
      collapsed={collapsed}
      toggled={toggled}
      breakPoint="md"
      onToggle={handleToggleSidebar}
      
    >
      <SidebarHeader>
        <div
          style={{
            padding: '24px',
            textTransform: 'uppercase',
            fontWeight: 'bold',
            fontSize: 14,
            letterSpacing: '1px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          ProSidebar
        </div>
      </SidebarHeader>
      <SidebarContent>
        <Menu iconShape="circle">
          <MenuItem
            icon={<FaTachometerAlt />}
            suffix={<span className="badge red">new</span>}
          >
            dashboard
          </MenuItem>
          <MenuItem icon={<FaGem />}> components</MenuItem>
        </Menu>
        <Menu iconShape="circle">
          <SubMenu
            // suffix={<span className="badge yellow">3</span>}
            icon={<FaRegLaughWink />}
            title="Feature"
          >
            <MenuItem onClick={()=>handleManager()} > Quản lý User</MenuItem>
            <MenuItem onClick={()=>navigate('/admin/manager/quiz')}> Quản lý bài Quiz</MenuItem>
            <MenuItem onClick={()=>navigate('/admin/manager-question')}> Quản lý Question</MenuItem>
          </SubMenu>

        </Menu>
      </SidebarContent>
{/* 
      <SidebarFooter style={{ textAlign: 'center' }}>
        <div
          className="sidebar-btn-wrapper"
          style={{
            padding: '20px 24px',
          }}
        >
          <a
            href="https://github.com/azouaoui-med/react-pro-sidebar"
            target="_blank"
            className="sidebar-btn"
            rel="noopener noreferrer"
          >
            <FaGithub />
            <span style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
            viewSource
            </span>
          </a>
        </div>
      </SidebarFooter> */}
    </ProSidebar>
  );
};

export default Aside;
