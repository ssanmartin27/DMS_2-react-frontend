import {Form, Container, Row, Col, Accordion, Stack, Button} from "react-bootstrap"
import { useState } from "react"

const Filters = ({docs, docsToShow, setDocsToShow}) => {

    const [type, setType] = useState({
        Book: false,
        Essay: false,
        Magazine: false,
        Investigation: false,
        Monograph: false,
        Iconography: false,

    })

    const [physical, setPhysical] = useState(false)


    const typeChange = (target) => {
        setType({...type, [target.value]: target.checked})
        }

    const formatChange = (target) => {
        setPhysical(target.checked)
        }

    const handleSubmit = (event) => {
        event.preventDefault()
        if (Object.values(type).every((value) => !value))
        { setDocsToShow(docs)}
        else {setDocsToShow(docs.filter((doc) => type[doc.doc_type] && (!physical || (doc.physical_copies > 0)) ))}
    }
    
    const handleReset = () => {
        
        setDocsToShow(docs)


    }
    
    return (
        <Form onSubmit={handleSubmit}>
            <Form.Label>Filters</Form.Label>
            <Stack>
            <Accordion alwaysOpen>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Tipo</Accordion.Header>
                    <Accordion.Body>
                    <Form.Check 
                        type="checkbox"
                        id="book"
                        label= "Book"
                        value= "Book"
                        onChange={({target})=>typeChange(target)}
                    />
                    <Form.Check 
                        type="checkbox"
                        id="essay"
                        label= "Essay"
                        value = "Essay"
                        onChange={({target})=>typeChange(target)}
                    />
                    <Form.Check 
                        type="checkbox"
                        id="magazine"
                        label= "Magazine"
                        value = "Magazine"
                        onChange={({target})=>typeChange(target)}
                    />
                    <Form.Check 
                        type="checkbox"
                        id="investigation"
                        label= "Investigation"
                        value= "Investigation"
                        onChange={({target})=>typeChange(target)}
                    />
                    <Form.Check 
                        type="checkbox"
                        id="monograph"
                        label= "Monograph"
                        value= "Monograph"
                        onChange={({target})=>typeChange(target)}
                    />
                    <Form.Check 
                        type="checkbox"
                        id="iconography"
                        label= "Iconography"
                        value= "Iconography"
                        onChange={({target})=>typeChange(target)}
                    />
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Formato</Accordion.Header>
                    <Accordion.Body>
                    <Form.Check 
                        type="checkbox"
                        id="fisico"
                        label= "Physical format available"
                        value = "Physical"
                        onChange={({target})=>formatChange(target)}
                    />
                   
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        <Button variant="primary" type="submit">
        Apply filters
        </Button>
        </Stack>
        </Form>
    )
}

export default Filters