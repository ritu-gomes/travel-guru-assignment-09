import React, { useContext } from 'react';
import { Button, Container, Form, FormControl, Nav, Navbar } from 'react-bootstrap';
import { userContext } from '../../App';
import logo from "../../Icon/Logo.png"; 
import "./navbar.css"; 

const NavBar = () => {
    const [loggedUser,setLoggedUser] = useContext(userContext);
    return (
        <Container style={{backgroundColor: "rgba(0,0,0,0.0)"}}>
            <Navbar style={{backgroundColor: "rgba(0,0,0,0.0)"}}>
                <Navbar.Brand href="/Home"><img className="logo" src={logo} alt="logo"/></Navbar.Brand>
                <Form inline>
                    <FormControl type="text" placeholder="Search your destination" className="mr-sm-2" />
                    <Button variant="light">Search</Button>
                </Form>
                <Nav className="ml-auto">
                    <Nav.Link href="/Login">
                        <Button style={{backgroundColor: "#F9A51A",border: "none"}}>Log in</Button>
                    </Nav.Link>
                    {
                        loggedUser.isLoggedIn && 
                        <Button onClick={() => setLoggedUser({})} style={{backgroundColor: "#F9A51A",border: "none"}}>Log out</Button>
                    }
                </Nav>
            </Navbar>
        </Container>
    );
};

export default NavBar;