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

import preview from '../../icons/preview.png';
import editBlock from '../../icons/editBlock.png';

export const Diagram: FC = () => {
  const { node, setAttrs, selected } = useNodeViewContext();
  const code = useMemo(() => node.attrs.value, [node.attrs.value]);
  const id = node.attrs.identity;
  const codeInput = useRef<HTMLTextAreaElement>(null);
  const [value, setValue] = useState("preview");
  const codePanel = useRef<HTMLDivElement>(null);
  const [darkMode, setDarkmode] = useState(false);
  const rendering = useRef(false);
  const htmlElement = document.documentElement;
  const dataTheme = htmlElement.getAttribute('data-theme');

  const renderMermaid = useCallback(async () => {
    const container = codePanel.current;
    if (!container) return;

    if (code.length === 0) return;
    if (rendering.current) return;

    mermaid.initialize({
      startOnLoad: false,
      theme: "neutral",
      // theme: document.documentElement.getAttribute('data-theme') === 'dark' ? "dark" : "default",
    });
    rendering.current = true;
    const { svg, bindFunctions } = await mermaid.render(id, code);
    rendering.current = false;
    container.innerHTML = svg;
    // console.log("rendered svg: " + svg)
    console.log(darkMode)
    bindFunctions?.(container);
  }, [code, darkMode, id]);

  useEffect(() => {
    requestAnimationFrame(() => {
      console.log("Calling renderMermaid...");
      renderMermaid();
      console.log("After renderMermaid");
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
              <img src={preview} className="buttonIcon"></img>
            </Tabs.Trigger>
            <Tabs.Trigger
              value="source"
              className={clsx(
                "sourceTab",
                value === "source" ? "activeTab" : ""
              )}
              data-tooltip-id="editTooltip" data-tooltip-content="Edit"
            >
              <img src={editBlock} className="buttonIcon"></img>
            </Tabs.Trigger>
          </div>
        </Tabs.List>
        <Tabs.Content value="preview" >
          <div className="svgContainer" ref={codePanel} style={{
            paddingBottom: code.length === 0 ? "0px" : "20px",
          }} />
        </Tabs.Content>
        <Tabs.Content value="source" className="relative">
          <textarea
            className="nodeviewCodeInput"
            ref={codeInput}
            defaultValue={code}
            onKeyDown={handleKeyPress}
          />
          <button
            className="nodeViewSubmitButton"
            onClick={() => {
              setAttrs({ value: codeInput.current?.value || "" });
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