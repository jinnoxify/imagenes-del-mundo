import React from "react";
import "./Image.css";

function Image({ img }) {
  return (
    <div className="image">
      <img className="image__img" src={img} alt="img" />
    </div>
  );
}

export default Image;
