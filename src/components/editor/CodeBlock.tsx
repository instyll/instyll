import { useNodeViewContext } from "@prosemirror-adapter/react";
import clsx from "clsx";
import type { FC } from "react";
import Select from 'react-select';

/* define options for react-select */
const langs2 = [
  { value: "text", label: "Text" },
  { value: "typescript", label: "Typescript" },
  { value: "javascript", label: "Javascript" },
  { value: "html", label: "HTML" },
  { value: "css", label: "CSS" },
  { value: "json", label: "JSON" },
  { value: "markdown", label: "Markdown" },
];

export const CodeBlock: FC = () => {
  const { contentRef, selected, node, setAttrs } = useNodeViewContext();
  return (
    <div
      className={clsx(
        selected ? "ProseMirror-selectednode" : "",
        "nodeViewCodeBlockContainer"
      )}
    >
      <div
        contentEditable="false"
        suppressContentEditableWarning
        className="nodeViewCodeBlockSelectorContainer"
      >
        {/* <select
          className="nodeViewCodeBlockSelector"
          value={node.attrs.language || "text"}
          onChange={(e) => {
            setAttrs({ language: e.target.value });
          }}
        >
          {langs.map((lang) => (
            <option value={lang.at(0)} key={lang.at(0)}>
              {lang.at(1)}
            </option>
          ))}
        </select> */}

        <Select
          options={langs2}
          placeholder={node.attrs.language || "Text"}
          onChange={(e) => {
            setAttrs({ language: e?.value });
          }}
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              borderRadius: "10px",
              borderColor: "var(--muted-text)",
              width: "180px",
              fontFamily: "var(--font)",
              backgroundColor: "transparent",
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
              primary: 'var(--muted-text)',
            },
          })}
        />

        <button
          className="nodeViewCodeBlockCopyButton"
          onClick={(e) => {
            e.preventDefault();
            navigator.clipboard.writeText(node.textContent);
          }}
        >
          Copy
        </button>
      </div>
      <pre spellCheck={false} className="!m-0 !mb-4">
        <code ref={contentRef} />
      </pre>
    </div>
  );
};
