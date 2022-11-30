import {Container,Form, Button, Row, Col, Alert} from "react-bootstrap"
import docService from './services/doc'
import { useState, useEffect, useRef } from "react"
import {useNavigate} from "react-router-dom"
import { Nav } from 'react-bootstrap'
import { Link } from "react-router-dom"
import {NavBar, padding} from "./components/NavBar";

const DocForm = ({user, setUser, docs, setDocs}) => {
    const [file, setFile] = useState("")
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [doc_type, setDoc_type] = useState("")
    const [price, setPrice] = useState("")
    const [physical_copies, setPhysical_copies] = useState("")
    const [pdf, setPdf] = useState("")
    const [submit, setSubmit] = useState("")
    console.log(docService.getToken())

    const handleSubmit = (event) => {
        event.preventDefault()

        let formData = new FormData()
        formData.append("pdf", pdf)
        formData.append("image", file)
        formData.append("title", title)
        formData.append("description", description)
        formData.append("doc_type", doc_type)
        formData.append("price", price)
        formData.append("physical_copies", physical_copies)

        setFile(""); setTitle(""); setDescription(""); setDoc_type(""); setPrice("");
        setPhysical_copies(""); setPdf(""); 
        docService
            .create(formData)
            .then(returnedDoc => {
                setDocs(docs.concat(returnedDoc))
                setSubmit("success")
            })
            .catch(setSubmit("error"))

    }

    return (
        <div>
        <NavBar user={user} />
        <Container>
        <h1 className="mt-1">Add Document</h1>
        {(() => {
         if (submit === "error") {
          return (
            <Alert key="danger" variant="danger">An error has ocurred. Please try again</Alert>
          ) }
          else if (submit === "success") {
            return (
              <Alert key="success" variant="success">Document created successfully</Alert>
            )}
        })}
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formFile" enctype="multipart/form-data" className="mb-3">
            <Form.Label>Cover Image</Form.Label>
            <Form.Control type="file" name="image" accept="image/*" onChange={({target}) => setFile(target.files[0])} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" value={title} onChange={({target}) => setTitle(target.value)} required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" value={description} onChange={({target}) => setDescription(target.value)} rows={3} />
            </Form.Group>

            <Form.Group controlId="docType">
            <Form.Label>Document Category</Form.Label>
            <Form.Check 
                    type="radio"
                    label="Book"
                    name="category"
                    value="Book"
                    onChange={({target}) => setDoc_type(target.value)}
                    required
                />

            <Form.Check
                    type="radio"
                    label="Magazine"
                    name="category"
                    value="Magazine"
                    onChange={({target}) => setDoc_type(target.value)}
                    required
            />
            <Form.Check 
                    type="radio"
                    label="Essay"
                    name="category"
                    value="Essay"
                    onChange={({target}) => setDoc_type(target.value)}
                    required
                />

            <Form.Check
                    type="radio"
                    label="Monograph"
                    name="category"
                    value="Monograph"
                    onChange={({target}) => setDoc_type(target.value)}
                    required
            />
            <Form.Check 
                    type="radio"
                    label="Iconography"
                    name="category"
                    value="Iconography"
                    onChange={({target}) => setDoc_type(target.value)}
                    required
                />

            <Form.Check
                    type="radio"
                    label="Investigation"
                    name="category"
                    value="Investigation"
                    onChange={({target}) => setDoc_type(target.value)}
                    required
            />
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1_2">
            <Form.Label>Price</Form.Label>
            <Form.Control type="number" min="0" value={price} onChange={({target}) => setPrice(target.value)} required />
            </Form.Group>

             
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1_2_3">
            <Form.Label>Physical Copies</Form.Label>
            <Form.Control type="number" min="0" value={physical_copies} onChange={({target}) => setPhysical_copies(target.value)} required />
            </Form.Group>

            <Form.Group controlId="formFile2" enctype="multipart/form-data" className="mb-3">
            <Form.Label>Virtual PDF</Form.Label>
            <Form.Control type="file" name="pdf" accept=".pdf" onChange={({target}) => setPdf(target.files[0])} required />
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit
            </Button>

        </Form>
        </Container>
        </div>

    )
}

export default DocForm
