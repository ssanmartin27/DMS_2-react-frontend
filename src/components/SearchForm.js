
import {Form, Button} from "react-bootstrap"
import { useEffect, useState , useRef} from "react"


const SearchForm = ({docsToShow, docsSearch, setDocsSearch}) => {
    const inputRef = useRef(null)

    useEffect(() => {
        setDocsSearch(docsToShow.filter(doc => doc.title.trim().toLowerCase().includes(inputRef.current.value.toLowerCase().trim())))
    }, [docsToShow])


    const handleChange = (target) => {

     setDocsSearch(docsToShow.filter(doc => doc.title.trim().toLowerCase().includes(target.value.toLowerCase().trim())))
    }
    

    return (

        <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onChange={({target}) => {handleChange(target)}}
              ref={inputRef}
            />


        </Form>
    )
}

export default SearchForm