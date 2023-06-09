import { Ctx } from "@milkdown/ctx"
import { tooltipFactory, TooltipProvider } from "@milkdown/plugin-tooltip"
import {
    toggleStrongCommand,
    toggleEmphasisCommand,
    wrapInBulletListCommand,
    wrapInOrderedListCommand,
    wrapInHeadingCommand,
} from "@milkdown/preset-commonmark"
import {
    toggleStrikethroughCommand,
} from "@milkdown/preset-gfm";
import { useInstance } from '@milkdown/react'
import { usePluginViewContext } from "@prosemirror-adapter/react"
import { useCallback, useEffect, useRef } from "react"
import { callCommand } from "@milkdown/utils"

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
                        H1
                    </button>
                    <button
                        className="tooltipItem"
                        onMouseDown={(e) => {
                            // Use `onMouseDown` with `preventDefault` to prevent the editor from losing focus.
                            e.preventDefault()

                            action(callCommand(wrapInHeadingCommand.key, 2))
                        }}
                    >
                        H2
                    </button>
                    <button
                        className="tooltipItem"
                        onMouseDown={(e) => {
                            // Use `onMouseDown` with `preventDefault` to prevent the editor from losing focus.
                            e.preventDefault()

                            action(callCommand(wrapInHeadingCommand.key, 3))
                        }}
                    >
                        H3
                    </button>
                    <button
                        className="tooltipItem"
                        onMouseDown={(e) => {
                            // Use `onMouseDown` with `preventDefault` to prevent the editor from losing focus.
                            e.preventDefault()

                            action(callCommand(toggleStrongCommand.key))
                        }}
                    >
                        Bold
                    </button>
                    <button
                        className="tooltipItem"
                        onMouseDown={(e) => {
                            // Use `onMouseDown` with `preventDefault` to prevent the editor from losing focus.
                            e.preventDefault()

                            action(callCommand(toggleEmphasisCommand.key))
                        }}
                    >
                        Italic
                    </button>
                    <button
                        className="tooltipItem"
                        onMouseDown={(e) => {
                            // Use `onMouseDown` with `preventDefault` to prevent the editor from losing focus.
                            e.preventDefault()

                            action(callCommand(wrapInBulletListCommand.key))
                        }}
                    >
                        List
                    </button>
                    <button
                        className="tooltipItem"
                        onMouseDown={(e) => {
                            // Use `onMouseDown` with `preventDefault` to prevent the editor from losing focus.
                            e.preventDefault()

                            action(callCommand(wrapInOrderedListCommand.key))
                        }}
                    >
                        List 2
                    </button>
                    <button
                        className="tooltipItem"
                        onMouseDown={(e) => {
                            // Use `onMouseDown` with `preventDefault` to prevent the editor from losing focus.
                            e.preventDefault()

                            action(callCommand(toggleStrikethroughCommand.key))
                        }}
                    >
                        Strikethrough
                    </button>
                </div>
            </div>
        </div>
    )
}
