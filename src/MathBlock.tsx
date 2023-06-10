import { katexOptionsCtx } from "@milkdown/plugin-math";
import { useInstance } from "@milkdown/react";
import { useNodeViewContext } from "@prosemirror-adapter/react";
import * as Tabs from "@radix-ui/react-tabs";
import katex from "katex";
import type { FC } from "react";
import { useEffect, useMemo, useRef, useState } from "react";

export const MathBlock: FC = () => {
  const { node, setAttrs, selected } = useNodeViewContext();
  const code = useMemo(() => node.attrs.value, [node.attrs.value]);
  const codePanel = useRef<HTMLDivElement>(null);
  const codeInput = useRef<HTMLTextAreaElement>(null);
  const [value, setValue] = useState("preview");
  const [loading, getEditor] = useInstance();

  useEffect(() => {
    requestAnimationFrame(() => {
      if (!codePanel.current || value !== "preview" || loading) return;

      try {
        katex.render(
          code,
          codePanel.current,
          getEditor().ctx.get(katexOptionsCtx.key)
        );
      } catch {}
    });
  }, [code, getEditor, loading, value]);

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
            className={[
              "previewTab",
              value === "preview" ? "activeTab" : "",
            ].join(" ")}
          >
            Preview
          </Tabs.Trigger>
          <Tabs.Trigger
            value="source"
            className={[
              "sourceTab",
              value === "source" ? "activeTab" : "",
            ].join(" ")}
          >
            Edit
          </Tabs.Trigger>
        </div>
      </Tabs.List>
      <Tabs.Content value="preview">
        <div className="svgContainer" ref={codePanel} />
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