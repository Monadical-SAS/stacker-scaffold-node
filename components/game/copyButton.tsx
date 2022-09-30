import React from "react";

export const CopyButton = (props: {
  textToCopy: string;
  buttonText: string;
}) => {
  const handleClick = () => {
    navigator.clipboard.writeText(props.textToCopy);
  };
  return (
    <button className="copy-button" onClick={() => handleClick()}>
      {props.buttonText}
    </button>
  );
};