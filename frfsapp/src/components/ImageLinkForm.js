import React from 'react';
import './ImageLinkForm.css'
/* ImageLinkForm 
1. Specify the link for the image in which you want to perform Face Recognition
*/ 

const ImageLinkForm = ({onInputChange,onButtonSubmit}) => {
    return <div>
        <p className="f3">
          {"Feed Images and See Magic. What are you waiting for ??"}
        </p>
        <div className="center">
          <div className="form center pa4 br3 shadow-5">
            <input class="f4 pa2 w-70 center" type="text" placeholder="Enter the Image URL" onChange={onInputChange}/>
            <button class="w-30 grow f4 link ph3 pv2 dib white bg-light-purple" onClick={onButtonSubmit}>
              Detect
            </button>
          </div>
        </div>
      </div>;


}

export default ImageLinkForm;