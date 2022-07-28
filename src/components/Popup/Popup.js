import React from "react";
import "./Popup.css";
 
const Popup = props => {
  const [logo, setLogo] = React.useState(props.content.logo);
  const [title, setTitle] = React.useState(props.content.title);
  const [description, setDescription] = React.useState(props.content.description);
  
  return (
    <div className="popup-box">
      <div className="box">
        <span className="close-icon" onClick={props.handleClose}>x</span>
        <div className = "popup-container">
          <div className = "edit-header">
                <h4>Edit</h4>
          </div>
            <form className = "popup-form" onSubmit = {(e) => props.onSubmit(e, title, logo, description)}>
            <label>Section Title</label>
            <input onChange = {(e) => setTitle(e.target.value)} value = {title}></input>

            <label>Description</label>
            <input onChange = {(e) => setDescription(e.target.value)} value = {description}></input>

            <label>Logo</label>
            <input onChange = {(e) => setLogo(e.target.value)} value = {logo}></input>
            <input className = "submit-btn" type = "submit"></input>
            </form>
        </div>
      </div>
    </div>
  );
};
 
export {Popup}