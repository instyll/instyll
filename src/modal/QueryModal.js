import { Command } from "cmdk";
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

import "../App.css";

import { useState } from "react";

const QueryModal = ({ show, onOpenChange, containerRef }) => {

  const documents = useSelector((state) => state.documents.documents)

  return (
    <Command.Dialog open={show} onOpenChange={onOpenChange} container={containerRef.current}>
      <Command.Input placeholder="Search"/>

        <Command.List>

            <Command.Empty>No results found.</Command.Empty>

            <Command.Group heading="Notes">
            {
            documents.map((document) => (
              <Command.Item>{document[1]}</Command.Item>
            ))
            }
            </Command.Group>
        </Command.List>
    </Command.Dialog>
  );
};

export default QueryModal;
