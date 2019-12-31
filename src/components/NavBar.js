import { Nav, Navbar, NavDropdown } from 'react-bootstrap'
import React from 'react'

function NavBar({location, currentUser, logout}) {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand href="/login">Back Support</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                { location.pathname !== '/login' && !currentUser ? <Nav.Link href="/login">Login</Nav.Link> : null }
                { location.pathname !== '/signup' && !currentUser ? <Nav.Link href="/signup">Sign Up</Nav.Link> : null }
                    <Nav.Link href="/tickets/new">Create a New Ticket</Nav.Link>
                </Nav>

                <Nav className="justify-content-end">
                    {
                        currentUser
                        ? 
                            <NavDropdown title={currentUser.attributes.username} id="collapsible-nav-dropdown" alignRight >
                                <NavDropdown.Item href="#action/3.1">My Tickets</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">All Open Tickets</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                            </NavDropdown>
                        : null  
                    }
                </Nav>
                {/* <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-success">Search</Button>
                </Form> */}
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavBar;