import txnService from "./services/txn"
import {NavBar, padding} from "./components/NavBar";
import {Table, Button} from "react-bootstrap"
import { useState, useEffect, useRef } from "react"
import PopUp from "./components/PopUp"

const Cart = ({user, setUser}) => {
    
    const [txns, setTxns] = useState([])
    const [modalShow, setModalShow] = useState(false);

    useEffect(() => {
       txnService
        .getAll()
        .then(txns => {
         setTxns(txns.filter(txn => (txn.client.id === user.id) && (txn.complete === false)));
        })
    }, [])
    
    const handleOrder = async () => {
        txns.forEach(async (txn) => {
            const updatedTxn = await txnService.update(txn.id)
            }
        )
        setTxns([])
        setModalShow(true)
    }

    return (
        <>
        <NavBar user={user} />
        <PopUp
        show={modalShow}
        onHide={() => setModalShow(false)}
        title="Success"
        subtitle="Order Complete"
        text="View the state of your order in 'My transactions'"
        />
        <Table striped bordered hover>
        <thead>
            <tr>
                <th>Document</th>
                <th>Format</th>
                <th>Order type</th>
                <th>Total</th>
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
            </tr>
        )}
        </tbody>
        </Table>
        <Button variant="primary" onClick={handleOrder}>Complete order</Button>
        </>
    )
}

export default Cart