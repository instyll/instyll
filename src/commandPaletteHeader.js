/* eslint-disable react/jsx-one-expression-per-line */
import React from "react";

const wrapperStyle = {
  fontFamily: "Proxima Soft",
  fontSize: "12px",
  color: "var(--secondary-text)",
  marginBottom: "6px",
  display: "inline-block"
};

const kbdStyle = {
  backgroundColor: "var(--muted-text)",
  fontSize: "12px",
  color: "var(--primary-text)",
  padding: "2px 4px",
  marginRight: "6px",
  borderRadius: "4px"
};

function sampleHeader() {

  const itemStyle = { paddingRight: "32px" };

  return (
    <div style={wrapperStyle}>
      <span style={itemStyle}>Search for a command</span>
      <span style={itemStyle}>
        <kbd style={kbdStyle}>↑↓</kbd> to navigate
      </span>
      <span style={itemStyle}>
        <kbd style={kbdStyle}>enter</kbd> to select
      </span>
      <span style={itemStyle}>
        <kbd style={kbdStyle}>esc</kbd> to dismiss
      </span>
    </div>
  );
}

export default sampleHeader;