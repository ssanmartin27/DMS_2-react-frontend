import {Container,Form, Button, Row, Col, Alert} from "react-bootstrap"
import docService from './services/doc'
import { useState, useEffect, useRef } from "react"
import {useNavigate} from "react-router-dom"
import { Nav } from 'react-bootstrap'
import { useLocation } from "react-router-dom";
import {
    // ...
    useParams
  } from "react-router-dom"

import { Link } from "react-router-dom"
import {NavBar, padding} from "./components/NavBar";

const DocFormEdit = ({user, setUser, docs, setDocs}) => {
    const [doc, setDoc] = useState("")
    const id = useParams().id
    const [file, setFile] = useState(null)
    const [origfile, setOrigfile] = useState(doc.file)
    const [title, setTitle] = useState(doc.title)
    const [description, setDescription] = useState(doc.description)
    const [doc_type, setDoc_type] = useState(doc.doc_type)
    const [price, setPrice] = useState(doc.price)
    const [physical_copies, setPhysical_copies] = useState(doc.physical_copies)
    const [origpdf, setOrigpdf] = useState(doc.pdf)
    const [pdf, setPdf] = useState(null)
    
    useEffect(() => {
        docService
                .get(id)
                .then(doc => {
                setDoc(doc);
                setOrigfile(doc.file)
                setTitle(doc.title)
                setDescription(doc.description)
                setDoc_type(doc.doc_type)
                setPrice(doc.price)
                setPhysical_copies(doc.physical_copies)
                setOrigpdf(doc.pdf)
                
            })
        
      }, [])
    
    
    const [submit, setSubmit] = useState("")
    console.log(docService.getToken())

    const handleSubmit = (event) => {
        event.preventDefault()

        let formData = new FormData()
        formData.append("pdf", pdf)
        formData.append("origpdf", origpdf)
        formData.append("image", file)
        formData.append("origimage", origfile)
        formData.append("title", title)
        formData.append("description", description)
        formData.append("doc_type", doc_type)
        formData.append("price", price)
        formData.append("physical_copies", physical_copies)

        setFile(""); setTitle(""); setDescription(""); setDoc_type(""); setPrice("");
        setPhysical_copies(""); setPdf(""); 
        docService
            .update(doc.id, formData)
            .then(returnedDoc => {
                console.log(docs.map((n) => n.id !== returnedDoc.id ? n : returnedDoc))
                setDocs(docs.map((n) => n.id !== returnedDoc.id ? n : returnedDoc))
                setSubmit("success")
                console.log(docs)
                console.log(returnedDoc.id)
            })
            .catch(setSubmit("error"))

    }

    return (
        <div>
        <NavBar user={user} />
        <Container>
        <h1 className="mt-1">Edit Document</h1>
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
            <Form.Label>New Cover Image</Form.Label>
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
                    checked={doc_type === "Book"}
                    onChange={({target}) => setDoc_type(target.value)}
                />

            <Form.Check
                    type="radio"
                    label="Magazine"
                    name="category"
                    value="Magazine"
                    checked={doc_type === "Magazine"}
                    onChange={({target}) => setDoc_type(target.value)}
            />
            <Form.Check 
                    type="radio"
                    label="Essay"
                    name="category"
                    value="Essay"
                    checked={doc_type === "Essay"}
                    onChange={({target}) => setDoc_type(target.value)}
                />

            <Form.Check
                    type="radio"
                    label="Monograph"
                    name="category"
                    value="Monograph"
                    checked={doc_type === "Monograph"}
                    onChange={({target}) => setDoc_type(target.value)}
                    
            />
            <Form.Check 
                    type="radio"
                    label="Iconography"
                    name="category"
                    value="Iconography"
                    checked={doc_type === "Iconography"}
                    onChange={({target}) => setDoc_type(target.value)}
                    
                />

            <Form.Check
                    type="radio"
                    label="Investigation"
                    name="category"
                    value="Investigation"
                    checked={doc_type === "Investigation"}
                    onChange={({target}) => setDoc_type(target.value)}
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
            <Form.Label>New Virtual PDF</Form.Label>
            <Form.Control type="file" name="pdf" accept=".pdf" onChange={({target}) => setPdf(target.files[0])}/>
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit
            </Button>

        </Form>
        </Container>
        </div>

    )
}

export default DocFormEdit
