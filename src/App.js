import {Container, Row, Col, Button, Stack} from "react-bootstrap"
import {NavBar, padding} from "./components/NavBar";
import SearchForm from "./components/SearchForm";
import DocCard from "./components/DocCard";
import DocForm from "./DocForm";
import docService from "./services/doc"
import Filters from "./components/Filters"
import {useState, useEffect} from "react"
import {Nav} from 'react-bootstrap'
import {Routes, Route, Link} from "react-router-dom"


const App = ({user, setUser, docs, setDocs}) => {

  const [docsToShow, setDocsToShow] = useState([])
  const [docsSearch, setDocsSearch] = useState([])
  
  useEffect(() => {
    docService
      .getAll()
      .then(initialDocs => {
        setDocs(initialDocs)
        setDocsToShow(initialDocs)
        setDocsSearch(initialDocs)
      })
  }, [])


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
      <Container fluid className="my-2">
        <Row>
          <Col>
          {(() => {
        if (user === null) {
          return (<Button variant="primary" disabled>
            <Link style={{ color: 'inherit', textDecoration: 'inherit'}} to="/cart">Shopping Cart</Link></Button>
          )
        } else if (user.admin) {
          return (
            <Link className="btn btn-rounded btn-primary" to="/add-document">Add Document</Link>
          )
        } else {
          return (
            <Link className="btn btn-rounded btn-primary" to="/cart">Shopping Cart</Link>
          )
        }
      })()}
          </Col>
          <Col xs={10}> <SearchForm  docsToShow={docsToShow} docsSearch={docsSearch} setDocsSearch={setDocsSearch} /></Col>
        </Row>
      </Container>
      <Stack direction = "horizontal">
      <Filters docs={docs} docsToShow={docsToShow} setDocsToShow={setDocsToShow}/>
      <Container>
        <Row lg={true} className="g-4">
      {docsSearch.map(doc => 
        <Col lg={true}><DocCard title={doc.title} src={`/uploads/${doc.file}`} id={doc.id} price={`$${doc.price}`}/></Col>)}
        </Row>
      </Container>
      </Stack>
    </div>

  )
}
export default App;
