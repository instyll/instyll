/**
 * @author wou
 */
import { katexOptionsCtx } from "@milkdown/plugin-math";
import { useInstance } from "@milkdown/react";
import { useNodeViewContext } from "@prosemirror-adapter/react";
import * as Tabs from "@radix-ui/react-tabs";
import katex from "katex";
import type { FC } from "react";
import { useEffect, useMemo, useRef, useState } from "react";

import { Tooltip } from "react-tooltip";

import CodeMirror from '@uiw/react-codemirror';
import { EditorView } from '@codemirror/view';

import preview from '../../icons/preview.png';
import editBlock from '../../icons/editBlock.png';

export const MathBlock: FC = () => {
    const { node, setAttrs, selected } = useNodeViewContext();
    const code = useMemo(() => node.attrs.value, [node.attrs.value]);
    const codePanel = useRef<HTMLDivElement>(null);
    const codeInput = useRef(null);
    const [value, setValue] = useState("source");
    const [codeValue, setCodeValue] = useState("");
    const [loading, getEditor] = useInstance();

    useEffect(() => {
        requestAnimationFrame(() => {
            if (!codePanel.current || value !== "preview" || loading) return;

            try {
                katex.render(
                    codeValue,
                    codePanel.current,
                    getEditor().ctx.get(katexOptionsCtx.key)
                );
            } catch { console.log("invalid render call") }
        });
    }, [codeValue, getEditor, loading, value]);

    /* submit code to render math on enter keypress */
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
                            className={[
                                "previewTab",
                                value === "preview" ? "activeTab" : "",
                            ].join(" ")}
                            data-tooltip-id="previewTooltip" data-tooltip-content="Preview"
                        >
                            <img src={preview} className="buttonIcon"></img>
                        </Tabs.Trigger>
                        <Tabs.Trigger
                            value="source"
                            className={[
                                "sourceTab",
                                value === "source" ? "activeTab" : "",
                            ].join(" ")}
                            data-tooltip-id="editTooltip" data-tooltip-content="Edit"
                        >
                            <img src={editBlock} className="buttonIcon"></img>
                        </Tabs.Trigger>
                    </div>
                </Tabs.List>
                <Tabs.Content value="preview">
                    <div className="svgContainer" ref={codePanel} style={{
                        paddingBottom: node.textContent.length === 0 ? "0px" : "20px",
                    }} />
                </Tabs.Content>
                <Tabs.Content value="source" className="relative">
                    {/* <textarea
                        className="nodeviewCodeInput"
                        ref={codeInput}
                        defaultValue={code}
                        onKeyDown={handleKeyPress}
                    /> */}
                    <CodeMirror
                        autoFocus
                        value={codeValue}
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
                            setAttrs({ value: node.textContent });
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