import React from "react";

export const CopyButton = (props: {
  textToCopy: string;
  buttonText: string;
}) => {
  const handleClick = () => {
    if ("clipboard" in navigator) {
      navigator.clipboard.writeText(props.textToCopy);
    } else {
      return document.execCommand("copy", true, props.textToCopy);
    }
  };
  return (
    <button className="copy-button" onClick={() => handleClick()}>
      {props.buttonText}
    </button>
  );
};