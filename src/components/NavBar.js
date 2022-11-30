import ReactDOM from 'react-dom/client'
import {Navbar, Nav, Container, NavDropdown, Button} from 'react-bootstrap'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    Navigate,
    useParams,
    useNavigate,
    useMatch
  } from "react-router-dom"

  const padding = {
    padding: 5
}

const NavBar = (props) => {
    const navigate = useNavigate()
    const handleLogout = (event) => {
        window.localStorage.clear()
        navigate('/')
        navigate(0)
      }

    return (
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link  href="#" as="span">
                        <Link class="navbar-brand" style={padding} to="/">DMS App</Link>
                    </Nav.Link>
                </Nav>
                <Nav>
                    {props.children}
                    {props.user && 
                    <NavDropdown title={props.user.username} drop="start">
                    <NavDropdown.Item>
                    {props.user.admin ? <Link style={padding}  to="/transactions">Transactions</Link> : <Link style={padding}  to="/my-transactions">My transactions</Link>}
                    </NavDropdown.Item>
                    {!props.user.admin &&
                    <NavDropdown.Item>
                    <Link style={padding}  to="/my-documents">Virtual documents</Link>
                    </NavDropdown.Item>
                    }
                    <NavDropdown.Item>
                      <Button variant="primary" onClick={handleLogout}>Logout</Button>
                    </NavDropdown.Item>
                  </NavDropdown>
                    }
                </Nav>
            </Navbar.Collapse>
        </Navbar>

    )
}

export {NavBar, padding}