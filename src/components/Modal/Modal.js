import * as React from 'react';
import './Modal.css';
import { EditPopup } from "../Popups/EditPopup.js";
import { AddPopup } from "../Popups/AddPopup.js";
 import {db} from "../../firebase";
import {doc, updateDoc} from "firebase/firestore"; 



function Header(props){

    const [isEditOpen, setIsEditOpen] = React.useState(false);
    const [isAddOpen, setIsAddOpen] = React.useState(false);


    const toggleEditPopup = () => {
        setIsEditOpen(!isEditOpen);
      }

    const toggleAddPopup = () => {
        setIsAddOpen(!isAddOpen);
      }

    const onAdd = (e, title, logo, description, url) => {
        e.preventDefault();
        console.log("added the title", title);
        const oldSubsections = [props.section.subsections];
        console.log("old subsection", oldSubsections);
        let newSubsections = [];

        if (oldSubsections[0].length < 1) {
            console.log("empty array");
            newSubsections.push({title: title, logo: logo, description: description, url: url});
            updateDoc(doc(db, "sections", props.section.id), {subsections: newSubsections}).then(() => {window.location.reload(false)});
        }
        else {
            console.log("there's an item");
            newSubsections = [...props.section.subsections];
            newSubsections.push( {title: title, logo: logo, description: description, url: url});
            updateDoc(doc(db, "sections", props.section.id), {subsections: newSubsections}).then(() => {window.location.reload(false)});
        }

    
    
    }
    

    const onEdit  = (e, title, logo, description) => {
        e.preventDefault();
        console.log("edited the title", title);
        updateDoc(doc(db, "sections", props.section.id), { title: title, logo: logo, description: description}).then(() => {setIsEditOpen(false); window.location.reload(false);})
    }
    
   

    return (
        <div className = "modal-header-container">
                <div className = "modal-info-wrapper">
                    
                    <img className = "modal-header-img" src = {props.section.logo} />
                    
                    <div className = 'modal-header-text'>
                        <span className = "modal-header-text-header">{props.section.title}</span>
                        <span className = "modal-header-text-subtitle">{props.section.description}</span>
                    </div>
                </div>
                {props.tier === "admin" && 
                <div className = "admin-btn-container">
                    <button className = "modal-popup-btn" onClick={toggleEditPopup}>EDIT</button>
                    <button className = "modal-popup-btn" onClick={toggleAddPopup}>+ ADD SUBSECTION</button>
                </div>}
                {isEditOpen && <EditPopup
                    onEdit = {onEdit}
                    content={props.section}
                    handleClose={toggleEditPopup}
                />}
                {isAddOpen && <AddPopup
                    onAdd= {onAdd}
                    handleClose={toggleAddPopup}
                />}
            
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
    
    const onSubmit = (e, title, logo, description, url) => {
        e.preventDefault();
        console.log(title);
        console.log(url);
        props.subsections[props.index] = { title: title, logo: logo, description: description, url: url}
        updateDoc(doc(db, "sections", props.parent),  { subsections: props.subsections}).then(
        () => {setIsOpen(false); window.location.reload(false);})
    }

    const onDelete = () => {
        const newSubsections = [...props.subsections];
        newSubsections.splice(props.index, 1); 
        console.log(newSubsections);
        console.log(props.parent);
        updateDoc(doc(db, "sections",props.parent),  { subsections: newSubsections}).then (
            () => {
                window.location.reload(false);
            }
        )
    }

    return (
        <div className = "modal-subitem-container">
                <div className = "modal-info-wrapper">
                    <div className = "modal-subitem-logo-frame">
                        <img className = "subitem-logo" src = {section.logo} />
                    </div>
                    <div className = 'modal-subitem-text'>
                            <a href = {section.url} target="_blank"><span className = "modal-subitem-text-header">{section.title}</span> </a>
                            <span className = "modal-subitem-text-subtitle">{section.description}</span>
                    </div>
                </div>
                {props.tier === "admin" && 
                    <div className = "admin-btn-container">
                        <button className = "modal-popup-btn" onClick={togglePopup} >Edit</button>
                        <button className = "modal-popup-btn" onClick = {onDelete}>Delete</button>
                    </div>
                }
                {isOpen && <EditPopup
                    onEdit = {onSubmit}
                    content={section}
                    handleClose={togglePopup}/>}
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
                    <SubItem parent = {props.section.id} subsections = {props.section.subsections} tier = {props.tier} index = {i}/>
                    {end != i && <Divider />}
                    </div>
                ))}
            </div>
    )
    
}

export {Modal};