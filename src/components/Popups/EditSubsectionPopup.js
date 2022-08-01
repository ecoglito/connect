import React from "react";
import "./Popup.css";
 
const EditSubsectionPopup = props => {
  const [logo, setLogo] = React.useState(props.content.logo);
  const [title, setTitle] = React.useState(props.content.title);
  const [description, setDescription] = React.useState(props.content.description);
  const [url, setUrl] = React.useState(props.content.url);


  return (
    <div className="popup-box">
      <div className="box">
        <span className="close-icon" onClick={props.handleClose}>x</span>
        <div className = "popup-container">
          <div className = "edit-header">
                <h4>Edit {title}</h4>
          </div>
            <form className = "popup-form" onSubmit = {(e) => props.onEdit(e, title, logo, description, url)}>
            <label>Title</label>
            <input onChange = {(e) => setTitle(e.target.value)} value = {title}></input>

            <label>Description</label>
            <input onChange = {(e) => setDescription(e.target.value)} value = {description}></input>

            <label>Logo</label>
            <input onChange = {(e) => setLogo(e.target.value)} value = {logo}></input>

            <label>URL / Affiliate Link</label>
            <input onChange = {(e) => setUrl(e.target.value)} value = {url}></input>
        

            <input className = "submit-btn" type = "submit"></input>
            </form>
        </div>
      </div>
    </div>
  );
};
 
export {EditSubsectionPopup}