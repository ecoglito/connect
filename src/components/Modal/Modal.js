import * as React from 'react';
import './Modal.css';
import { EditSectionPopup } from "../Popups/EditSectionPopup.js";
import { EditSubsectionPopup } from "../Popups/EditSubsectionPopup.js";
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
        console.log("entire section", props.section);
        const section = props.section;
        console.log(props.id);
        let newSubsections = [];

        if (section[0] === "empty") {
            console.log("empty array");
            newSubsections.push({title: title, logo: logo, description: description, url: url});
            updateDoc(doc(db, "sections", props.section.id), {subsections: newSubsections}).then(() => {window.location.reload(false)});
        }
        else if (section.subsections) {
            console.log("there's are subsections");
            newSubsections = [...props.section.subsections];
            console.log(newSubsections);
            newSubsections.push( {title: title, logo: logo, description: description, url: url});
            updateDoc(doc(db, "sections", props.section.id), {subsections: newSubsections}).then(() => {window.location.reload(false)});
            
        }
        else {
            console.log('error, could not add new connection');
        }
    }
    

    const onEdit  = (e, title, logo, description, isFree, isGrowth, isVip) => {
        e.preventDefault();
        console.log("edited the title", title);
        console.log(isFree, isGrowth, isVip);
       
        const tiers = {
            "free": isFree,
            "growth": isGrowth,
            "vip": isVip,
        }
        updateDoc(doc(db, "sections", props.section.id), { title: title, logo: logo, description: description, tiers: tiers}).then(
            () => {
                setIsEditOpen(false);
                window.location.reload(false);
             }
        )
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
                    <button className = "modal-popup-btn" onClick={toggleEditPopup}>EDIT SECTION</button>
                    <button className = "modal-popup-btn" onClick={toggleAddPopup}>+ ADD NEW CONNECTION</button>
        
                </div>}
                {isEditOpen && <EditSectionPopup
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
    const [isAddOpen, setIsAddOpen] = React.useState(false);
    const section = props.subsections[props.index];

    const togglePopup = () => {
        setIsOpen(!isOpen);
      }

    
    const toggleAddPopup = () => {
        setIsAddOpen(!isAddOpen);
      }
    

    const onAdd = (e, title, logo, description, url) => {
        e.preventDefault();
        console.log("entire section", props.subsections);
        console.log(props.parent);
        let newSubsections = [];

        if (section === "empty") {
            console.log("empty array");
            newSubsections.push({title: title, logo: logo, description: description, url: url});
            updateDoc(doc(db, "sections", props.parent), {subsections: newSubsections}).then(() => {window.location.reload(false)});
        }
        else  {
            console.log("there's are subsections");
            newSubsections = [...props.subsections];
            console.log(newSubsections);
            newSubsections.push( {title: title, logo: logo, description: description, url: url});
            updateDoc(doc(db, "sections", props.parent), {subsections: newSubsections}).then(() => {window.location.reload(false)});
        }
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

   
    //console.log(section);
    if (props.subsections[0] === "empty") {
        return (
            <div className = "modal-subitem-empty-state">
                <a className = "a-new-subsection" onClick = {toggleAddPopup}><p>No connections yet. Add a new one.</p></a>
                {isAddOpen && <AddPopup onAdd= {onAdd} handleClose={toggleAddPopup}/> }
            </div>
            
    
        )
    }
    // else if (props.tier === "free") {
    //     return (
    //         <BlurredSubsection/>
    //     )
    // }
    else {
        return (
            <div className = "modal-subitem-container">
                    <div className = "modal-info-wrapper">
                        <div className = "modal-subitem-logo-frame">
                            <img className = "subitem-logo" src = {section.logo} />
                        </div>
                        <div className = 'modal-subitem-text'>
                                <a href = {"//"+section.url} target="_blank"><span className = "modal-subitem-text-header">{section.title}</span> </a>
                                <div className ="modal-subitem-subtitle">
                                    <span className = "modal-subitem-text-subtitle">{section.description}</span>
                                </div>
                        </div>
                    </div>
                    {props.tier === "admin" && 
                        <div className = "admin-btn-container">
                            <button className = "modal-popup-btn" onClick={togglePopup} >EDIT CONNECTION</button>
                            <button className = "modal-popup-btn" onClick = {onDelete}>DELETE CONNECTION</button>
                        </div>
                    }
                    {isOpen && <EditSubsectionPopup
                        onEdit = {onSubmit}
                        content={section}
                        handleClose={togglePopup}/>}
            </div>
        )
    }
}

const BlurredSubsection = (props) => {
    const section = props.subsections[props.index];
    return (
        <div>
            <div className = "modal-subitem-container">
                    <div className = "modal-info-wrapper-blurred">
                        <div className = "modal-subitem-logo-frame">
                            <img className = "subitem-logo" src = {section.logo} />
                        </div>
                        <div className = 'modal-subitem-text'>
                               
                                    <span className = "modal-subitem-text-header">{section.title}</span> 
                    
                                <div className ="modal-subitem-subtitle">
                                    <span className = "modal-subitem-text-subtitle">{section.description}</span>
                                </div>
                        </div>
                    </div>
                <div className = "subitem-blur-cta"> 
                Upgrade to <span className = "blue-span">Growth Tier</span> to get exclusive access to perks!
                </div>
            </div>
    </div>
    );
}


function Modal(props) {
    const end = props.section.subsections ? props.section.subsections.length - 1 : 0;
    return (
            <div className = "modal-container"> 
                <Header section = {props.section} id = {props.section.id} tier = {props.tier}/>
                {props.section.subsections && props.section.subsections.map((section,i) => {
                    if(props.tier === "free" && i >= 2) {
                        return (<div>
                        <BlurredSubsection parent = {props.section.id} subsections = {props.section.subsections} tier = {props.tier} index = {i}/>
                        {end != i && <Divider />}
                        </div>
                        );
                    }
                    else {
                        return  (<div>
                        <SubItem parent = {props.section.id} subsections = {props.section.subsections} tier = {props.tier} index = {i}/>
                        {end != i && <Divider />}
                        </div>);
                    }
                })}
            </div>
                );
            }

export {Modal};