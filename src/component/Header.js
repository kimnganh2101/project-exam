import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

const BasicExample = ()=> {
    const navigate = useNavigate();
    const isAuthenticatedLogin = useSelector(state => state.accountUser.isAuthenticated)
    const UserData = useSelector(state => state.accountUser.account)
    const handleLogin =  () =>{
    navigate('/login');
  }
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <NavLink href="/" className="navbar-brand">React-Bootstrap</NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink to="home" className='nav-link'>Home</NavLink>
            <NavLink to="User" className='nav-link'>User</NavLink>
            <NavLink to="Admin" className='nav-link'>Admin</NavLink>
            </Nav>
          {
            isAuthenticatedLogin === false ?
              <>
                <Nav className='navbar-nav'>
                <Button className='btn btn-login mx-5' onClick={()=> handleLogin()}>
                  Login
                </Button>
                <Button className='btn btn-signin ' >
                  signin
                </Button>
              
              </Nav>
              </>
              :
              <Nav>
            <NavDropdown title="Setting" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Log Out</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          }      
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;