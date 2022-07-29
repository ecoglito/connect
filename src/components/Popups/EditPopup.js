import React from "react";
import "./Popup.css";
 
const EditPopup = props => {
  const [logo, setLogo] = React.useState(props.content.logo);
  const [title, setTitle] = React.useState(props.content.title);
  const [description, setDescription] = React.useState(props.content.description);
  const [url, setUrl] = React.useState("/");
  const tiers = props.content.tiers;
  // var tierList = tiers.map(function(tier){
  //   return (
  //     <div className = "checkbox-wrapper">
  //       <label>{tier}</label>
  //       <input className = "input-checkbox" type = "checkbox" value = {tier}></input>
  //     </div>
  //   ) 
  // });
  
  return (
    <div className="popup-box">
      <div className="box">
        <span className="close-icon" onClick={props.handleClose}>x</span>
        <div className = "popup-container">
          <div className = "edit-header">
                <h4>Edit</h4>
          </div>
            <form className = "popup-form" onSubmit = {(e) => props.onEdit(e, title, logo, description, url)}>
            <label>Section Title</label>
            <input onChange = {(e) => setTitle(e.target.value)} value = {title}></input>

            <label>Description</label>
            <input onChange = {(e) => setDescription(e.target.value)} value = {description}></input>

            <label>Logo</label>
            <input onChange = {(e) => setLogo(e.target.value)} value = {logo}></input>

            <label>URL / Affiliate Link (subsections only)</label>
            <input onChange = {(e) => setUrl(e.target.value)} value = {url}></input>

            <label>Displayed on tier</label>
            {/* {tierList} */}
            

            <input className = "submit-btn" type = "submit"></input>
            </form>
        </div>
      </div>
    </div>
  );
};
 
export {EditPopup}