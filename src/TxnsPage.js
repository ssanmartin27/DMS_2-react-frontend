import txnService from "./services/txn"
import {NavBar, padding} from "./components/NavBar";
import {Table, Button} from "react-bootstrap"
import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"

const TxnsPage = ({user, setUser}) => {
    const [txns, setTxns] = useState([])

    useEffect(() => {
       txnService
        .getAll()
        .then(txns => {
         setTxns(txns.filter(txn => (txn.client.id === user.id) && (txn.complete === true)));
        })
    }, [])
    
    return (
        <>
        <NavBar user={user} />
        <Table striped bordered hover>
        <thead>
            <tr>
                <th>Document</th>
                <th>Format</th>
                <th>Order type</th>
                <th>Total</th>
                <th>Date</th>
                <th>Comments</th>
            </tr>
        </thead>
        <tbody>
        {txns.map(
            txn => 
            <tr>
                <td>{txn.doc.title}</td>
                <td>{txn.format}</td>
                <td>{txn.type}</td>
                <td>{txn.total}</td>
                <td>{new Date(txn.date).toUTCString()}</td>
                <td>{(() => {
                    if (txn.format === "physical") {
                        return(`Sent to ${txn.client.address}`)
                    } else {
                       return(<Link to="/my-documents">View</Link>) 
                    }
                })()}
                </td>
            </tr>
        )}
        </tbody>
        </Table>
        </>
    )
}

export default TxnsPage