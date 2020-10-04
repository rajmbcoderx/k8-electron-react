import  React from "react";
import { } from '@material-ui/core';
import Highlight from 'react-highlight.js';
import './css/railscasts.css'       // this is overwriting the one setup in Dialog
//import './css/github.css'



export default function RawXml(props)  {
    return (
            <div id='raw-xml-report'>
               <h2>Raw Xml</h2>
               <Highlight language='xml'>
                   {props.xml_report}
               </Highlight>
            </div>
        )
    }