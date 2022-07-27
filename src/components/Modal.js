import * as React from 'react';
import './styles.css';
import { ReactComponent as Logo } from './logos/banking-logo.svg';
import { ReactComponent as SubItemLogo} from './logos/mercury.svg';

function Header(props){
    
    return (
        <div className = "modal-header-container">
            
            <div className ="modal-header-items">
                <img src = {props.section.logo} />
                <div className = 'modal-header-text'>
                    <span className = "modal-header-text-header">{props.section.title}</span>
                    <span className = "modal-header-text-subtitle">{props.section.description}</span>
                </div>
                {props.tier === "admin" && 
                <div>
                    <button onClick = {() => editSection(props)}>Edit</button>
                    <button onClick = {deleteSection}>Delete</button>
                </div>}
            </div>
        </div>
    )
}

const editSection = (props) => {
    console.log("edit section",props.section);

}

const deleteSection = () => {

}


function Divider () {
    return (
        <div className = "modal-divider">
            <hr></hr>
        </div>
    )
}

function SubItem(section, end) {
    return (
        <div className = "modal-subitem-container">
            <div className = "modal-subitem-items">
                <div className = "modal-subitem-logo-frame">
                   <img src = {section.section.logo} />
                </div>
                <div className = 'modal-subitem-text'>
                        <a href ="mercury.com"><span className = "modal-subitem-text-header">{section.section.title}</span> </a>
                        <span className = "modal-subitem-text-subtitle">{section.section.description}</span>
                </div>
            </div>
            
        </div>
       
    )
}


function Modal(props) {
    const end = props.section.subsection ? props.section.subsection.length - 1 : 0;
    
    return (
            <div className = "modal-container"> 
                <Header section = {props.section} tier = {props.tier}/>
                {props.section.subsection && props.section.subsection.map((section,i) => (
                    <div>
                    <SubItem section = {section}/>
                    {end != i && <Divider />}
                    </div>
                ))}
            </div>
    )
    
}

export {Modal};