import { Nav, Navbar, NavDropdown } from 'react-bootstrap'
import React from 'react'

function NavBar({location, currentUser, logout}) {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand href="/tickets">Back Support</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                { location.pathname !== '/login' && !currentUser ? <Nav.Link href="/login">Login</Nav.Link> : null }
                { location.pathname !== '/signup' && !currentUser ? <Nav.Link href="/signup">Sign Up</Nav.Link> : null }
                { currentUser && (!currentUser.attributes.agent && !currentUser.attributes.admin)
                ?      
                <Nav.Link href="/tickets/new">Create a New Ticket</Nav.Link>
                : null
                }     
                </Nav>

                <Nav className="justify-content-end">
                    {
                        currentUser
                        ? 
                            <NavDropdown title={currentUser.attributes.username} id="collapsible-nav-dropdown" alignRight >
                                <NavDropdown.Item href="/tickets">My Tickets</NavDropdown.Item>
                                {currentUser.attributes.agent || currentUser.attributes.admin 
                                ?      
                                <>                           
                                    <NavDropdown.Item href="/tickets/open">All Open Tickets</NavDropdown.Item>
                                    <NavDropdown.Item href="/tickets/closed">All Closed Tickets</NavDropdown.Item>
                                </>
                                : null
                                }                                      
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                            </NavDropdown>
                        : null  
                    }
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavBar;