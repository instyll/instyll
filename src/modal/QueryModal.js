import { Command } from "cmdk";
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import "../App.css";

import { useState } from "react";

const QueryModal = ({ show, onOpenChange, containerRef }) => {

  const documents = useSelector((state) => state.documents.documents)
  const navigate = useNavigate();

  const updateRouterParams = (path) => { 
    navigate('/editor', { state: { documentPath: path } });
    navigate(0)
  }

  return (
    <Command.Dialog open={show} onOpenChange={onOpenChange} container={containerRef.current}>
      <Command.Input placeholder="Search"/>

        <Command.List>

            <Command.Empty>No results found.</Command.Empty>

            <Command.Group heading="Notes">
            {
            documents.map((document) => (
              <Command.Item onSelect={() => updateRouterParams(document[3])}>{document[1]}</Command.Item>
            ))
            }
            </Command.Group>
        </Command.List>
    </Command.Dialog>
  );
};

export default QueryModal;
