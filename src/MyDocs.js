import txnService from "./services/txn"
import {NavBar, padding} from "./components/NavBar";
import {Table, Button} from "react-bootstrap"
import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import doc from "./services/doc";

const MyDocs = ({user, setUser}) => {
    const [txns, setTxns] = useState([])
    const [date, setDate] = useState(null)
    
    useEffect(() => {
       console.log(user)
       txnService
        .getAll()
        .then(txns => {
         console.log(txns)
         setTxns(txns.filter( (txn) => (txn.client.id && user.id) && (txn.complete === true) && (txn.format === "virtual") ));
        })
       txnService 
        .getDate()
        .then(date => {
            setDate(new Date(date))
        }) 
        console.log("hola")
       
    }, [])

    const handleClick = (txn) => {
        
    }
    
    return (
        <>
        <NavBar user={user} />
        <Table striped bordered hover>
        <thead>
            <tr>
                <th>Document</th>
                <th>Order type</th>
                <th>Expiration Date</th>
                <th>View Document</th>
            </tr>
        </thead>
        <tbody>
        {txns.map((txn)=>{
            let expDate = new Date(txn.expDate)
            return(
            <tr>
                <td>{txn.doc.title}</td>
                <td>{txn.type}</td>
                <td>{txn.type === "rent" ? expDate.toUTCString(): "-"}</td>
                <td>{(() => {
                    if (txn.type === "purchase") {
                    return (<a className="btn btn-rounded btn-primary"  href={`/uploads/${txn.doc.pdf}`} download>Download Document</a>
                    )
                    } else {
                    return (
                        <Link className="btn btn-rounded btn-primary" disabled={(txn.type === "rent") && (expDate < date)} to={`/view-document/${txn.doc.id}`}>View Document</Link>
                    )
                    } 
                })()}
                </td>
            </tr>)
        }
        )}
        </tbody>
        </Table>
        </>
    ) 
}

export default MyDocs