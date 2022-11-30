import {Container, Stack, Figure, Image, Row, Col, Form, Dropdown, Button} from "react-bootstrap"
import {NavBar, padding} from "./components/NavBar";
import {Nav} from 'react-bootstrap'
import {Routes, Route, Link, useNavigate} from "react-router-dom"
import docService from "./services/doc"
import txnService from "./services/txn"
import PopUp from "./components/PopUp"
import {
    // ...
    useParams
  } from "react-router-dom"

import { useState, useEffect, useRef } from "react"

const DocPage = ({user}) => {
    const [doc, setDoc] = useState(null)
    const [modalShow, setModalShow] = useState(false);
    const navigate = useNavigate()
    const id = useParams().id
    
    useEffect(() => {
        if (!doc) {
            docService
                .get(id)
                .then(initialDocs => {
                setDoc(initialDocs);
                
            })
        }
      }, [])

   
    const [format, setFormat] = useState("virtual")
    const [type, setType] = useState("purchase")

    const handleSubmit = (event) => {
        event.preventDefault()
        txnService.setToken(user.token)
        txnService
            .create({
                doc: doc.id, format, type, user: user.id, complete: false
            })
            .then(() => {
                setModalShow(true)
            })

    }

    const handleClick = () => {
        docService
            .remove(doc.id)
            .then(() => {
                navigate('/')
            })
    }
    return (
        <div>
        {user === null ?
        <NavBar>
        <Nav.Link href="#" as="span">
                            <Link style={padding} to="/sign-up">Sign up</Link>
        </Nav.Link>
        <Nav.Link href="#" as="span">
            <Link style={padding} to="/log-in">Log in</Link> 
            </Nav.Link>
        </NavBar>:
        
        <NavBar user={user} />
        }
        {doc && 
        <Container className="d-flex flex-column justify-content-center">
        
        <h1>{doc.title}</h1>
        <PopUp
        show={modalShow}
        onHide={() => setModalShow(false)}
        title="Success"
        subtitle="Item added to cart"
        text="Now you can complete your transaction in the cart menu or continue shopping"
        />
        <Row>
            <Col><Image width={400} height={520} src={`/uploads/${doc.file}`}/></Col>
            <Col>
            <Row><Col><h2>Description</h2></Col></Row>
            <Row><Col><p className="text-break">{doc.description}</p></Col></Row>
            <Row><Col>
            <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formGridState">
            <Form.Label>{`${doc.physical_copies} physical copies available`}</Form.Label>
            <Form.Select defaultValue="virtual" value={format} onChange={({target}) => setFormat(target.value)}>
            <option value="virtual">Virtual</option>
            <option value="physical" disabled={doc.physical_copies <= 0}>Physical</option>
            </Form.Select>
            </Form.Group>
            <Form.Group controlId="formGridState2">
            <Form.Label>Buy or rent for 7 days</Form.Label>
            <Form.Select defaultValue="purchase" value={type} onChange={({target}) => setType(target.value)}>
            <option value="purchase">Purchase</option>
            <option value="rent">Rent</option>
            </Form.Select>
            </Form.Group>
            <Row><Col><h2>Price: {type === "purchase" ? `$${doc.price}`: "$10000"}</h2></Col>
            </Row>
            <Button variant="primary" type="submit" disabled={user === null}>
                Add to cart
            </Button>
            </Form>
            <Row><Col>
            {(user && user.admin) &&
            <Stack direction="horizontal" className="mt-5" gap={3}>
            <Link className="btn btn-rounded btn-primary" to={`/edit-document/${doc.id}`}>Edit Document</Link>
            <Button variant="primary" onClick={handleClick}>Delete Document</Button>
            </Stack>
            }
            </Col></Row>
            </Col></Row>
            </Col>
        </Row>
        </Container>
        }
        </div>
    )
}

export default DocPage