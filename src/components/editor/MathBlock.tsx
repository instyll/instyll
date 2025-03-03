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
import { EditorState } from "@codemirror/state";
import { CompletionContext, completeFromList, autocompletion } from "@codemirror/autocomplete";
import options from '../../legacy/TeXOptions';


import { Eye } from "lucide-react";
import { PenSquare } from "lucide-react";

export const MathBlock: FC = () => {
    const { node, setAttrs, selected } = useNodeViewContext();
    const code = useMemo(() => node.attrs.value, [node.attrs.value]);
    const codePanel = useRef<HTMLDivElement>(null);
    const codeInput = useRef(null);
    const [value, setValue] = useState('preview');
    const [codeValue, setCodeValue] = useState("");
    const [loading, getEditor] = useInstance();

    // const texOptions = require('../../legacy/TeXOptions');

    // console.log(node.attrs.value)
    // console.log("codevalue: "  + codeValue)

    /* handle TeX autocomplete */
    const latexCompletion = (context: CompletionContext) => {
        let word = context.matchBefore(/\S*/);
        if (!word || word.text[0] !== "\\") {
            return null;
        }
        return {
            from: word.from,
            options: options,
        };
    }

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
    // const handleKeyPress = (event) => {
    //     if (event.key === 'Enter' && !event.shiftKey) {
    //         setAttrs({ value: codeInput.current?.value || "" });
    //         setValue("preview");
    //     }
    // }
    useEffect(() => {
            if (codeValue.length === 0) {
                setCodeValue(node.attrs.value);
            }
    }, []);

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
                            <Eye size={16} className="buttonIcon"/>
                        </Tabs.Trigger>
                        <Tabs.Trigger
                            value="source"
                            className={[
                                "sourceTab",
                                value === "source" ? "activeTab" : "",
                            ].join(" ")}
                            data-tooltip-id="editTooltip" data-tooltip-content="Edit"
                        >
                            <PenSquare size={16} className="buttonIcon"/>
                        </Tabs.Trigger>
                    </div>
                </Tabs.List>
                <Tabs.Content value="preview">
                    <div className="svgContainer" ref={codePanel} style={{
                        paddingBottom: codeValue.length === 0 ? "0px" : "20px",
                    }} />
                </Tabs.Content>
                <Tabs.Content value="source" className="relative">
                    <CodeMirror
                        autoFocus
                        /* if the user copies pastes something use that as the code value */
                        // value={
                        //     codeValue.length === 0 ? node.textContent : codeValue
                        // }
                        value={codeValue.length === 0 ? node.attrs.value: codeValue}
                        extensions={[
                            EditorView.lineWrapping,
                            autocompletion({override: [latexCompletion]})
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
                        // onKeyDown={handleKeyPress}
                        ref={codeInput} />
                    <button
                        className="nodeViewSubmitButton"
                        onClick={() => {
                            // setAttrs({ value: node.textContent });
                            setAttrs({ value: codeValue || "" })
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