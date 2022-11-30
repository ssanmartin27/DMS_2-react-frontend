
import docService from "./services/doc"
import React from 'react';
import ReactDOM from 'react-dom/client';
import {NavBar, padding} from "./components/NavBar";
import {Table, Button, Container} from "react-bootstrap"
import { useState, useEffect, useRef } from "react"
import ViewSDKClient from "./ViewSDKClient.js";
import { Link } from "react-router-dom"



import {
    // ...
    useParams
  } from "react-router-dom"



const DocViewer = ({user}) => {
    const [doc, setDoc] = useState(null)
    const id = useParams().id
    const loadPDF = (url) => {
        const viewSDKClient = new ViewSDKClient();
        viewSDKClient.ready().then(() => {
        viewSDKClient.previewFile(
        "pdf-div",
        {
        defaultViewMode: "FIT_WIDTH",
        embedMode: "FULL_WINDOW",
        showAnnotationTools: false,
        showLeftHandPanel: false,
        showPageControls: false,
        showDownloadPDF: false,
        showPrintPDF: false
        },
        url
        );
        });
        };

    useEffect(() => {
        docService
            .get(id)
            .then(doc=> {
            setDoc(doc);  
         })
        }, [])


    return(
    <div class="d-flex flex-column vh-100">
    <NavBar user={user} />
    {doc &&
        <div
        id="pdf-div"
        class="flex-grow-1"
        onDocumentLoad={loadPDF(`/uploads/${doc.pdf}`)}
        ></div>  
    }
    </div>
    )
}

export default DocViewer
