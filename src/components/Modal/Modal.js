import * as React from 'react';
import './Modal.css';
import { Popup } from "../Popup/Popup.js";
import {db} from "../../firebase";
import { collection, doc, getDoc, getDocs, setDoc, addDoc, updateDoc, deleteField } from "firebase/firestore"; 


function Header(props){

    const [isOpen, setIsOpen] = React.useState(false);
    const togglePopup = () => {
        setIsOpen(!isOpen);
      }

    const onSubmit = (e, title, logo, description) => {
        e.preventDefault();
        console.log(title);
        updateDoc(doc(db, "sections", props.section.id), { title: title, logo: logo, description: description }).then(
        (

        ) => {
            setIsOpen(false);
            window.location.reload(false);
        }
        )
    }
    
   

    return (
        <div className = "modal-header-container">
            <div className ="modal-header-items">
                
                <img src = {props.section.logo} />
                <div className = 'modal-header-text'>
                    <span className = "modal-header-text-header">{props.section.title}</span>
                    <span className = "modal-header-text-subtitle">{props.section.description}</span>
                </div>
                {props.tier === "admin" && 
                <div className = "admin-btn-container">
                    {/* <button className = "modal-popup-btn" onClick = {() => editSection(props)}>Edit</button> */}
                    <button className = "modal-popup-btn" onClick={togglePopup}>Edit</button>
                </div>}
                {isOpen && <Popup
                    onSubmit = {onSubmit}
                    content={props.section}
                    handleClose={togglePopup}
                />}
            </div>
        </div>
    )
}


function Divider () {
    return (
        <div className = "modal-divider">
            <hr></hr>
        </div>
    )
}

function SubItem(props) {
    const [isOpen, setIsOpen] = React.useState(false);
    const section = props.subsections[props.index];
    const togglePopup = () => {
        setIsOpen(!isOpen);
      }
    
    const onSubmit = (e, title, logo, description) => {
        e.preventDefault();
        props.subsections[props.index] = { title: title, logo: logo, description: description }
        updateDoc(doc(db, "sections", section.parent),  { subsections: props.subsections}).then(
        (

        ) => {
            setIsOpen(false);
            window.location.reload(false);
        }
        )
    }

    const onDelete = () => {
        const newSubsections = [...props.subsections];
        newSubsections.splice(props.index, 1); 
        console.log(newSubsections);
        updateDoc(doc(db, "sections",section.parent),  { subsections: newSubsections});
    }

    return (
        <div className = "modal-subitem-container">
            <div className = "modal-subitem-items">
                <div className = "modal-subitem-logo-frame">
                   <img src = {section.logo} />
                </div>
                <div className = 'modal-subitem-text'>
                        <a href ="mercury.com"><span className = "modal-subitem-text-header">{section.title}</span> </a>
                        <span className = "modal-subitem-text-subtitle">{section.description}</span>
                </div>
                {props.tier === "admin" && 
                <div className = "admin-btn-container">
                    {/* <button className = "modal-popup-btn" onClick = {() => editSection(props)}>Edit</button> */}
                    <button className = "modal-popup-btn" onClick={togglePopup} >Open Popup</button>
                    <button className = "modal-popup-btn" onClick = {onDelete}>Delete</button>
                </div>}
                {isOpen && <Popup
                    onSubmit = {onSubmit}
                    content={section}
                    handleClose={togglePopup}
                />}
            </div>
        </div>
       
    )
}


function Modal(props) {
    const end = props.section.subsections ? props.section.subsections.length - 1 : 0;
    return (
            <div className = "modal-container"> 
                <Header section = {props.section} tier = {props.tier}/>
                {props.section.subsections && props.section.subsections.map((section,i) => (
                    <div>
                    <SubItem subsections = {props.section.subsections} tier = {props.tier} index = {i}/>
                    {end != i && <Divider />}
                    </div>
                ))}
            </div>
    )
    
}

export {Modal};