import React from 'react';
import { Redirect } from 'react-router';
import '../styles/selector.css'
import {ReactComponent as Para} from '../assets/para.svg'
import {ReactComponent as Image} from '../assets/image.svg'


function Selector(props) {
    return (
        <ul className="selector">
            <li className="option" ><Para className="icon"/><a onClick={props.paraClick}>Paragraph</a></li>
            <li className="option" ><Image className="icon"/><a onClick={props.imgClick}>Image</a></li>
        </ul>
    )
}

export default Selector;