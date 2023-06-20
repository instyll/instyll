/**
 * @author wou
 */
import { useNodeViewContext } from "@prosemirror-adapter/react";
import clsx from "clsx";
import { useState, useEffect, useRef, type FC } from "react";
import Select from 'react-select';

import CodeMirror from '@uiw/react-codemirror';
import { loadLanguage, langNames, langs } from '@uiw/codemirror-extensions-langs';
import { EditorView } from '@codemirror/view';
import { indentUnit } from '@codemirror/language';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Tooltip } from "react-tooltip";

import copy from '../../icons/copy.png';
import download from '../../icons/download.png';

/* define options for react-select */
const langOptions = [
  { value: "python", label: "python", fileEnding: "py" },
  { value: "java", label: "java", fileEnding: "java" },
  { value: "typescript", label: "typescript", fileEnding: "ts" },
  { value: "javascript", label: "javascript", fileEnding: "js" },
  { value: "html", label: "html", fileEnding: "html" },
  { value: "css", label: "css", fileEnding: "css" },
  { value: "json", label: "json", fileEnding: "json" },
  { value: "markdown", label: "markdown", fileEnding: "md" },
];

export const CodeBlock: FC = () => {

  const html = document.querySelector('html');

  const [currTheme, setCurrTheme] = useState("light");

  const { contentRef, selected, node, setAttrs } = useNodeViewContext();

  const editorRef = useRef(null);

  /* Add a message to notify user when they copy */
  const notify = () => toast("Copied to clipboard!");

  /* logic to handle writing code block content to clipboard */
  const handleCopy = (e) => {
    notify();
    e.preventDefault();
    navigator.clipboard.writeText(node.textContent);
  }

  /* logic to handle downloading code block content as a file */
  const handleDownload = () => {
    /* use the correct ending for each file */
    const langExtension = langOptions.find(option => option.value === node.attrs.language);
    if (langExtension) {
      const fileEnding = langExtension.fileEnding;
      const blob = new Blob([node.textContent], { type: `text/${fileEnding}` });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `snippet.${fileEnding}`;
      a.click();
      URL.revokeObjectURL(url);
    }
  }

  useEffect(() => {
    if (document.querySelector('html')?.getAttribute("data-theme") === "dark") {
      setCurrTheme("dark");
    }
    else {
      setCurrTheme("light");
    }
  }, [document.querySelector('html')]);

  return (
    <div
      className={clsx(
        selected ? "ProseMirror-selectednode" : "",
        "nodeViewCodeBlockContainer"
      )}
      contentEditable="false"
    >
      <div
        contentEditable="false"
        suppressContentEditableWarning
        className="nodeViewCodeBlockSelectorContainer"
      >

        <Select
          options={langOptions}
          placeholder={node.attrs.language || "javascript"}
          onChange={(e) => {
            setAttrs({ language: e?.value });
          }}
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              borderRadius: "10px",
              border: "none",
              width: "fit-content",
              fontFamily: "var(--font)",
              backgroundColor: "transparent",
              fontSize: "15px",
              marginLeft: "10px",
              paddingTop: "10px",
              userSelect: "none",
            }),
            input: (baseStyles, state) => ({
              ...baseStyles,
              color: "var(--secondary-text)",
            }),
            menu: (baseStyles, state) => ({
              ...baseStyles,
              borderRadius: "10px",
              backgroundColor: "var(--elevated-bg)",
            }),
            singleValue: (baseStyles, state) => ({
              ...baseStyles,
              color: "var(--secondary-text)",
            }),
            option: (baseStyles, state) => ({
              ...baseStyles,
              color: "var(--primary-text)",
              fontSize: "15px",
            }),
            indicatorSeparator: (baseStyles, state) => ({
              ...baseStyles,
              backgroundColor: "var(--muted-text)",
            }),
            dropdownIndicator: (baseStyles, state) => ({
              ...baseStyles,
              color: "var(--secondary-text)",
            }),
          }}
          theme={(theme) => ({
            ...theme,
            colors: {
              ...theme.colors,
              primary25: 'var(--muted-text)',
              primary: 'transparent',
            },
          })}
        />

        <div className="nodeViewCodeBlockButtonContainer">
          <Tooltip id="copyButtonTooltip" className="labelTooltip" />
          <Tooltip id="downloadButtonTooltip" className="labelTooltip" />
          <ToastContainer />
          <button
            className="nodeViewCodeBlockCopyButton"
            onClick={handleCopy}
            data-tooltip-id="copyButtonTooltip" data-tooltip-content="Copy"
          >
            <img src={copy} className="buttonIcon"></img>
          </button>
          <button
            className="nodeViewCodeBlockDownloadButton"
            onClick={handleDownload}
            data-tooltip-id="downloadButtonTooltip" data-tooltip-content="Download"
          >
            <img src={download} className="buttonIcon"></img>
          </button>
        </div>
      </div>
      <div className="codemirrorWrapper">
        <CodeMirror
          autoFocus
          theme={currTheme}
          value={node.textContent}
          extensions={[
            node.attrs.language ? [loadLanguage(node.attrs.language!)].filter(Boolean) : loadLanguage("javascript"),
            EditorView.lineWrapping
          ]}
          editable={true}
          basicSetup={{
            foldGutter: true,
            dropCursor: false,
            indentOnInput: false,
          }}
          ref={editorRef} />
      </div>
    </div>
  );
};
