/**
 * @author wou
 */
import { useNodeViewContext } from "@prosemirror-adapter/react";
import * as Tabs from "@radix-ui/react-tabs";
import clsx from "clsx";
import mermaid from "mermaid";
import type { FC } from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { Tooltip } from "react-tooltip";

import CodeMirror from '@uiw/react-codemirror';
import { EditorView } from '@codemirror/view';

import { Eye } from "lucide-react";
import { PenSquare } from "lucide-react";

export const Diagram: FC = () => {
  const { node, setAttrs, selected } = useNodeViewContext();
  const code = useMemo(() => node.attrs.value, [node.attrs.value]);
  const id = node.attrs.identity;
  const codeInput = useRef(null);
  const [value, setValue] = useState("source");
  const codePanel = useRef<HTMLDivElement>(null);
  const [darkMode, setDarkmode] = useState(false);
  const rendering = useRef(false);
  const htmlElement = document.documentElement;
  const dataTheme = htmlElement.getAttribute('data-theme');
  const [codeValue, setCodeValue] = useState("");

  const renderMermaid = useCallback(async () => {
    const container = codePanel.current;
    if (!container) return;

    if (codeValue.length === 0) return;
    if (rendering.current) return;

    mermaid.initialize({
      startOnLoad: false,
      theme: "dark",
      // theme: document.documentElement.getAttribute('data-theme') === 'dark' ? "dark" : "default",
    });
    rendering.current = true;
    const { svg, bindFunctions } = await mermaid.render(id, codeValue);
    rendering.current = false;
    container.innerHTML = svg;
    // console.log("rendered svg: " + svg)
    // console.log(darkMode)
    bindFunctions?.(container);
  }, [codeValue, darkMode, id]);

  useEffect(() => {
    requestAnimationFrame(() => {
      // console.log("Calling renderMermaid...");
      renderMermaid();
      // console.log("After renderMermaid");
    });
  }, [renderMermaid, value]);

  /* submit code to render upon enter keypress */
  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      setAttrs({ value: codeInput.current?.value || "" });
      setValue("preview");
    }
  }

  return (
    <div className="nodeViewWrapper">
      <Tabs.Root
        contentEditable={false}
        className={selected ? "ring-2 ring-offset-2" : ""}
        value={value}
        onValueChange={(value) => {
          setValue(value);
        }}
      >
        <Tabs.List className="nodeViewTabGroup">
          <Tooltip id="previewTooltip" className="labelTooltip" />
          <Tooltip id="editTooltip" className="labelTooltip" />
          <div className="tabsContainer">
            <Tabs.Trigger
              value="preview"
              className={clsx(
                "previewTab",
                value === "preview" ? "activeTab" : ""
              )}
              data-tooltip-id="previewTooltip" data-tooltip-content="Preview"
            >
              <Eye size={16} className="buttonIcon"/>
            </Tabs.Trigger>
            <Tabs.Trigger
              value="source"
              className={clsx(
                "sourceTab",
                value === "source" ? "activeTab" : ""
              )}
              data-tooltip-id="editTooltip" data-tooltip-content="Edit"
            >
              <PenSquare size={16} className="buttonIcon"/>
            </Tabs.Trigger>
          </div>
        </Tabs.List>
        <Tabs.Content value="preview" >
          <div className="svgContainer" ref={codePanel} style={{
            paddingBottom: codeValue.length === 0 ? "0px" : "20px",
          }} />
        </Tabs.Content>
        <Tabs.Content value="source" className="relative">
          <CodeMirror
            autoFocus
            value={
              /* if the user copies pastes something use that as the code value */
              codeValue.length === 0 ? node.textContent : codeValue
            }
            extensions={[
              EditorView.lineWrapping
            ]}
            editable={true}
            basicSetup={{
              foldGutter: true,
              dropCursor: false,
              indentOnInput: false,
            }}
            onChange={
                (sourceCode) => setCodeValue(sourceCode)
            }
            onKeyDown={handleKeyPress}
            ref={codeInput} />
          <button
            className="nodeViewSubmitButton"
            onClick={() => {
              setAttrs({ value: node.textContent || "" });
              setValue("preview");
            }}
          >
            OK
          </button>
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
};