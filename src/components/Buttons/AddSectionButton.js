import * as React from 'react';
import './AddSectionButton.css';

const AddSectionButton = (props) => {
    return (
      <div className = "modal-add-section-wrapper">
        <button onClick = {(e) => props.onSubmit} className = "add-section-btn">
          + ADD NEW SECTION
        </button>
      </div>
    )
  }

export {AddSectionButton}