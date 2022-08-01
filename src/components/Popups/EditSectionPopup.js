import React from "react";
import "./Popup.css";
 
const EditSectionPopup = props => {
  const [logo, setLogo] = React.useState(props.content.logo);
  const [title, setTitle] = React.useState(props.content.title);
  const [description, setDescription] = React.useState(props.content.description);
  
//   const [isFree, setIsFree] = React.useState(props.content.tiers.free);
  var freeTier = props.content.tiers.free; 
  const [free, setFree] = React.useState(freeTier);
  const [isGrowth, setIsGrowth] = React.useState(props.content.tiers.growth);
  const [isVip, setIsVip] = React.useState(props.content.tiers.vip);

  console.log(free,isGrowth,isVip)

  
  return (
    <div className="popup-box">
      <div className="box">
        <span className="close-icon" onClick={props.handleClose}>x</span>
        <div className = "popup-container">
          <div className = "edit-header">
                <h4>Edit {title}</h4>
          </div>
            <form className = "popup-form" onSubmit = {(e) => {console.log("onsubmit",free); props.onEdit(e, title, logo, description, free, isGrowth, isVip)}}>
            <label>Section Title</label>
            <input onChange = {(e) => setTitle(e.target.value)} value = {title}></input>

            <label>Description</label>
            <input onChange = {(e) => setDescription(e.target.value)} value = {description}></input>

            <label>Logo</label>
            <input onChange = {(e) => setLogo(e.target.value)} value = {logo}></input>


            <label>Displayed on tier</label>
            <div className = "checkbox-wrapper">

            <div className = "checkbox-flex-container">
                <p>free</p>
                <input className = "input-checkbox" type = "checkbox" checked = {free}  onChange = {(e) => {console.log(e.target.checked);setFree(e.target.checked)}}></input>
              </div>

            <div className = "checkbox-flex-container">
                <p>growth</p>
                <input className = "input-checkbox" type = "checkbox" checked = {isGrowth}  onChange = {(e) => setIsGrowth(e.target.checked)}></input>
              </div>            

              <div className = "checkbox-flex-container">
                <p>vip</p>
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