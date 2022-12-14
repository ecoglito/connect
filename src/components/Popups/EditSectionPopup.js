import React from "react";
import "./Popup.css";
 
const EditSectionPopup = props => {
  const [logo, setLogo] = React.useState(props.content.logo);
  const [title, setTitle] = React.useState(props.content.title);
  const [description, setDescription] = React.useState(props.content.description);
  

  const [isFree, setIsFree] = React.useState(props.content.tiers.free);
  const [isGrowth, setIsGrowth] = React.useState(props.content.tiers.growth);
  const [isVip, setIsVip] = React.useState(props.content.tiers.vip);


  
  return (
    <div className="popup-box">
      <div className="box">
        <span className="close-icon" onClick={props.handleClose}>x</span>
        <div className = "popup-container">
          <div className = "edit-header">
                <h4>Edit {title}</h4>
          </div>
            <form className = "popup-form" onSubmit = {(e) => {props.onEdit(e, title, logo, description, isFree, isGrowth, isVip)}}>
            <label>Section Title</label>
            <input onChange = {(e) => setTitle(e.target.value)} value = {title}></input>

            <label>Description</label>
            <input onChange = {(e) => setDescription(e.target.value)} value = {description}></input>

            <label>Logo</label>
            <input onChange = {(e) => setLogo(e.target.value)} value = {logo}></input>


            <label>Displayed on tier</label>
            <div className = "checkbox-wrapper">

              <div className = "checkbox-flex-container">
                  <p>Free</p>
                  <input className = "input-checkbox" type = "checkbox" checked = {isFree}  onChange = {(e) => {setIsFree(e.target.checked)}}></input>
                </div>

              <div className = "checkbox-flex-container">
                  <p>Growth</p>
                  <input className = "input-checkbox" type = "checkbox" checked = {isGrowth}  onChange = {(e) => setIsGrowth(e.target.checked)}></input>
                </div>            

                <div className = "checkbox-flex-container">
                  <p>Vip</p>
                  <input className = "input-checkbox" type = "checkbox" checked = {isVip}  onChange = {(e) => setIsVip(e.target.checked)}></input>
                </div>
             
            </div>
           
            
            

            <input className = "submit-btn" type = "submit"></input>
            </form>
        </div>
      </div>
    </div>
  );
};
 
export {EditSectionPopup}