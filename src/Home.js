import {BrowserRouter as Router} from "react-router-dom"
import React from 'react';
import ReactDOM from 'react-dom/client';
import { useState, useEffect, useRef } from "react"
import {
    Routes,
    Route,
    Link,
    Navigate,
    useParams,
    useNavigate,
    useMatch
  } from "react-router-dom";
import App from './App';
import LogIn from "./LogIn";
import SignUp from "./SignUp";
import DocForm from "./DocForm"
import DocFormEdit from "./DocFormEdit";
import DocPage from "./DocPage"
import docService from "./services/doc"
import txnService from "./services/txn"
import Cart from "./Cart"
import TxnsPage from "./TxnsPage"
import MyDocs from "./MyDocs"
import DocViewer from "./DocViewer";
import AllTxns from "./AllTxns";


const Home = () => {
    const [user, setUser] = useState(null)
    const [docs, setDocs] = useState([])
    const [loaded, setLoaded] = useState(false)
    

useEffect(() => {

    const loggedUserJSON = window.localStorage.getItem('loggedDMSUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      docService.setToken(user.token)
      txnService.setToken(user.token) 
    }
    setLoaded(true)
  }, [])

  //const match= useMatch("/docs/:id")
  //const [doc, setDoc]= useState((match) => match ? docs.find(doc => doc.id === match.params.id): null)

    return (
      <>
      {loaded &&
        <Routes>
            <Route path="/log-in" element={<LogIn user={user} setUser={setUser}/>} />
            <Route path="/sign-up" element={<SignUp user={user} setUser={setUser}/>} />
            <Route path="/" element={<App user={user} setUser={setUser} docs={docs} setDocs={setDocs}/>} />
            <Route path="/add-document" element={<DocForm user={user} setUser={setUser} docs={docs} setDocs={setDocs}/>} />
            <Route path="/cart" element={<Cart user={user} setUser={setUser}/>} />
            <Route path="/my-transactions" element={<TxnsPage user={user} setUser={setUser}/>} />
            <Route path="/transactions" element={<AllTxns user={user} setUser={setUser}/>} />
            <Route path="/my-documents" element={<MyDocs user={user} setUser={setUser}/>} />
            <Route path="/edit-document/:id" element={<DocFormEdit user={user} setUser={setUser} docs={docs} setDocs={setDocs}/>} />
            <Route path="/docs/:id" element={<DocPage user={user}/>} />
            <Route path="/view-document/:id" element={<DocViewer user={user}/>} />    
        </Routes> 
      }
      </>
    )
}

export default Home