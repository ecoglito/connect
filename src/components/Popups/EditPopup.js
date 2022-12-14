import React from "react";
import "./Popup.css";
 
const EditPopup = props => {
  const [logo, setLogo] = React.useState(props.content.logo);
  const [title, setTitle] = React.useState(props.content.title);
  const [description, setDescription] = React.useState(props.content.description);
  const [url, setUrl] = React.useState("/");
  const [checked, setChecked] = React.useState(false);

  
  const [isFree, setIsFree] = React.useState(props.content.tiers["free"]);
  const [isGrowth, setIsGrowth] = React.useState(props.content.tiers["growth"]);
  const [isVip, setIsVip] = React.useState(props.content.tiers["vip"]);



  console.log(props.content);


  
  
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
            <div className = "checkbox-wrapper">

              <div className = "checkbox-flex-container">
                <p>free</p>
                <input className = "input-checkbox" type = "checkbox" checked = {isFree}  onChange = {(e) => setIsFree(e.target.checked)}></input>
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
 
export {EditPopup}