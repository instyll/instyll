/**
 * @author wou
 */
import { Ctx } from "@milkdown/ctx"
import { tooltipFactory, TooltipProvider } from "@milkdown/plugin-tooltip"
import {
    toggleStrongCommand,
    toggleEmphasisCommand,
    wrapInBulletListCommand,
    wrapInOrderedListCommand,
    wrapInHeadingCommand,
    wrapInBlockquoteCommand,
} from "@milkdown/preset-commonmark"
import {
    toggleStrikethroughCommand,
} from "@milkdown/preset-gfm";
import { useInstance } from '@milkdown/react'
import { usePluginViewContext } from "@prosemirror-adapter/react"
import { useCallback, useEffect, useRef } from "react"
import { callCommand } from "@milkdown/utils"

import { Heading1 } from "lucide-react";
import { Heading2 } from "lucide-react";
import { Heading3 } from "lucide-react";
import { Bold } from "lucide-react";
import { Italic } from "lucide-react";
import { List } from "lucide-react";
import { ListOrdered } from "lucide-react";
import { Strikethrough } from "lucide-react";
import { Quote } from "lucide-react";

export const tooltip = tooltipFactory('Text');

export const TooltipView = () => {
    const ref = useRef<HTMLDivElement>(null)
    const tooltipProvider = useRef<TooltipProvider>()

    const { view, prevState } = usePluginViewContext()
    const [loading, get] = useInstance()
    const action = useCallback((fn: (ctx: Ctx) => void) => {
        if (loading) return;
        get().action(fn)
    }, [loading])

    useEffect(() => {
        const div = ref.current
        if (loading || !div) {
            return;
        }
        tooltipProvider.current = new TooltipProvider({
            content: div,
        })

        return () => {
            tooltipProvider.current?.destroy()
        }
    }, [loading])

    useEffect(() => {
        tooltipProvider.current?.update(view, prevState)
    })

    return (
        <div data-desc="This additional wrapper is useful for keeping tooltip component during HMR">
            <div ref={ref}>
                <div className="tooltipContainer">
                    <button
                        className="tooltipItem"
                        onMouseDown={(e) => {
                            // Use `onMouseDown` with `preventDefault` to prevent the editor from losing focus.
                            e.preventDefault()

                            action(callCommand(wrapInHeadingCommand.key, 1))
                        }}
                    >
                        {/* <img src={header1} className='tooltipIcon'></img> */}
                        <Heading1 size={16} className="tooltipIcon"/>
                    </button>
                    <button
                        className="tooltipItem"
                        onMouseDown={(e) => {
                            // Use `onMouseDown` with `preventDefault` to prevent the editor from losing focus.
                            e.preventDefault()

                            action(callCommand(wrapInHeadingCommand.key, 2))
                        }}
                    >
                        <Heading2 size={16} className="tooltipIcon"/>
                    </button>
                    <button
                        className="tooltipItem"
                        onMouseDown={(e) => {
                            // Use `onMouseDown` with `preventDefault` to prevent the editor from losing focus.
                            e.preventDefault()

                            action(callCommand(wrapInHeadingCommand.key, 3))
                        }}
                    >
                        <Heading3 size={16} className="tooltipIcon"/>
                    </button>
                    <button
                        className="tooltipItem"
                        onMouseDown={(e) => {
                            // Use `onMouseDown` with `preventDefault` to prevent the editor from losing focus.
                            e.preventDefault()

                            action(callCommand(toggleStrongCommand.key))
                        }}
                    >
                        <Bold size={16} className="tooltipIcon"/>
                    </button>
                    <button
                        className="tooltipItem"
                        onMouseDown={(e) => {
                            // Use `onMouseDown` with `preventDefault` to prevent the editor from losing focus.
                            e.preventDefault()

                            action(callCommand(toggleEmphasisCommand.key))
                        }}
                    >
                        <Italic size={16} className="tooltipIcon"/>
                    </button>
                    <button
                        className="tooltipItem"
                        onMouseDown={(e) => {
                            // Use `onMouseDown` with `preventDefault` to prevent the editor from losing focus.
                            e.preventDefault()

                            action(callCommand(wrapInBulletListCommand.key))
                        }}
                    >
                        <List size={16} className="tooltipIcon"/>
                    </button>
                    <button
                        className="tooltipItem"
                        onMouseDown={(e) => {
                            // Use `onMouseDown` with `preventDefault` to prevent the editor from losing focus.
                            e.preventDefault()

                            action(callCommand(wrapInOrderedListCommand.key))
                        }}
                    >
                        <ListOrdered size={16} className="tooltipIcon"/>
                    </button>
                    <button
                        className="tooltipItem"
                        onMouseDown={(e) => {
                            // Use `onMouseDown` with `preventDefault` to prevent the editor from losing focus.
                            e.preventDefault()

                            action(callCommand(toggleStrikethroughCommand.key))
                        }}
                    >
                        <Strikethrough size={16} className="tooltipIcon"/>
                    </button>
                    <button
                        className="tooltipItem"
                        onMouseDown={(e) => {
                            // Use `onMouseDown` with `preventDefault` to prevent the editor from losing focus.
                            e.preventDefault()

                            action(callCommand(wrapInBlockquoteCommand.key))
                        }}
                    >
                        <Quote size={16} className="tooltipIcon"/>
                    </button>
                </div>
            </div>
        </div>
    )
}
