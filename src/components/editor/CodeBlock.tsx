import { useNodeViewContext } from "@prosemirror-adapter/react";
import clsx from "clsx";
import type { FC } from "react";
import Select from 'react-select';

import CodeMirror from '@uiw/react-codemirror';
import { loadLanguage, langNames, langs } from '@uiw/codemirror-extensions-langs';
import { EditorView } from '@codemirror/view';
import { indentUnit } from '@codemirror/language';

import copy from '../../icons/copy.png';
import download from '../../icons/download.png';

/* define options for react-select */
const langOptions = [
  { value: "python", label: "python" },
  { value: "java", label: "java" },
  { value: "typescript", label: "typescript" },
  { value: "javascript", label: "javascript" },
  { value: "html", label: "html" },
  { value: "css", label: "css" },
  { value: "json", label: "json" },
  { value: "markdown", label: "markdown" },
];

export const CodeBlock: FC = () => {
  const { contentRef, selected, node, setAttrs } = useNodeViewContext();
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
          <button
            className="nodeViewCodeBlockCopyButton"
            onClick={(e) => {
              e.preventDefault();
              navigator.clipboard.writeText(node.textContent);
            }}
          >
            <img src={copy} className="buttonIcon"></img>
          </button>
          <button
            className="nodeViewCodeBlockDownloadButton"
            onClick={(e) => {
              e.preventDefault();
              navigator.clipboard.writeText(node.textContent);
            }}
          >
            <img src={download} className="buttonIcon"></img>
          </button>
        </div>
      </div>
      {/* <pre spellCheck={false} className="!m-0 !mb-4">
                <code ref={contentRef} />
            </pre> */}
      <div className="codemirrorWrapper">
      <CodeMirror
        value={node.textContent}
        // extensions={[
        //   EditorView.lineWrapping, indentUnit.of("    "),
        //   loadLanguage(node.attrs.language),
        // ]}
        extensions={[
          node.attrs.language ? loadLanguage(node.attrs.language) : loadLanguage("javascript")
        ]}
        editable={true}
        basicSetup={{
          foldGutter: true,
          dropCursor: false,
          indentOnInput: false,
        }}>
        </CodeMirror>
        </div>
    </div>
  );
};
