import {Container,Form, Button} from "react-bootstrap"
import { useState, useEffect, useRef } from "react"
import {useNavigate} from "react-router-dom"
import loginService from "./services/login"
import docService from "./services/doc"
import {Nav, Alert, NavDropdown } from 'react-bootstrap'
import {NavBar, padding} from "./components/NavBar";
import { Link } from "react-router-dom"

const LogIn = ({user, setUser}) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState(null)
    const [submit, setSubmit] = useState("")
    const navigate = useNavigate()


    const handleLogin = async (event) => {
      event.preventDefault()
      
      try{ const user = await loginService.login({
        email, password,
      })
      
      window.localStorage.setItem(
        'loggedDMSUser', JSON.stringify(user)
      ) 

      docService.setToken(user.token)
      console.log(docService.getToken())
      setUser(user)
      setEmail("")
      setPassword("")
      setSubmit("success")
    } catch(exception) {
      setErrorMessage(exception.response.data.error)
      setSubmit("error")
    }
    }

    if (submit === "success") {
        navigate('/')
    }

    const handleLogout = (event) => {
      window.localStorage.clear()
      navigate('/')
    }

    return (
        <div>
      {user === null ?
      <NavBar>
      <div>
      <Nav.Link href="#" as="span">
                        <Link style={padding} to="/sign-up">Sign up</Link>
      </Nav.Link>
      </div> 
      </NavBar>:
      
     <NavBar user={user} />
      }
        <Container>
        
        <h1 className="mt-1">Log In</h1>
        {(() => {
         if (submit === "error") {
          return (
            <Alert key="danger" variant="danger">{errorMessage}</Alert>
          )
        } 
      })()}
        <Form onSubmit={handleLogin}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control required value={email} onChange={({target}) => setEmail(target.value)} type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>


      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control required value={password} onChange={({target}) => setPassword(target.value)} type="password" placeholder="Password" />
      </Form.Group>
      
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    </Container>
    </div>
    )
}

export default LogIn