import { useNodeViewContext } from "@prosemirror-adapter/react";
import * as Tabs from "@radix-ui/react-tabs";
import clsx from "clsx";
import mermaid from "mermaid";
import type { FC } from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export const Diagram: FC = () => {
  const { node, setAttrs, selected } = useNodeViewContext();
  const code = useMemo(() => node.attrs.value, [node.attrs.value]);
  const id = node.attrs.identity;
  const codeInput = useRef<HTMLTextAreaElement>(null);
  const [value, setValue] = useState("preview");
  const codePanel = useRef<HTMLDivElement>(null);
  const darkMode = true;
  const rendering = useRef(false);

  const renderMermaid = useCallback(async () => {
    const container = codePanel.current;
    if (!container) return;

    if (code.length === 0) return;
    if (rendering.current) return;

    mermaid.initialize({
      startOnLoad: false,
      theme: darkMode ? "dark" : "default",
    });
    rendering.current = true;
    const { svg, bindFunctions } = await mermaid.render(id, code);
    rendering.current = false;
    container.innerHTML = svg;
    console.log("rendered svg: " + svg)
    bindFunctions?.(container);
  }, [code, darkMode, id]);

  useEffect(() => {
    requestAnimationFrame(() => {
        console.log("Calling renderMermaid...");
        renderMermaid();
        console.log("After renderMermaid");
    });
  }, [renderMermaid, value]);

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
        <div className="tabsContainer">
          <Tabs.Trigger
            value="preview"
            className={clsx(
              "previewTab",
              value === "preview" ? "activeTab" : ""
            )}
          >
            Preview
          </Tabs.Trigger>
          <Tabs.Trigger
            value="source"
            className={clsx(
              "sourceTab",
              value === "source" ? "activeTab" : ""
            )}
          >
            Edit
          </Tabs.Trigger>
        </div>
      </Tabs.List>
      <Tabs.Content value="preview" forceMount>
        <div
          ref={codePanel}
          className={clsx(
            "svgContainer",
            value !== "preview" ? "hidden" : ""
          )}
        />
      </Tabs.Content>
      <Tabs.Content value="source" className="relative">
        <textarea
          className="nodeviewCodeInput"
          ref={codeInput}
          defaultValue={code}
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