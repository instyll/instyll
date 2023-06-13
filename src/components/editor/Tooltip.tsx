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

import header1 from '../../icons/header1.png';
import header2 from '../../icons/header2.png';
import header3 from '../../icons/header3.png';
import boldIcon from '../../icons/bold.png';
import italicIcon from '../../icons/italic.png';
import listUnordered from '../../icons/listUnordered.png';
import listOrdered from '../../icons/listOrdered.png';
import strikethrough from '../../icons/strikethrough.png';
import blockquote from '../../icons/bquote.png';

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
                        <img src={header1} className='tooltipIcon'></img>
                    </button>
                    <button
                        className="tooltipItem"
                        onMouseDown={(e) => {
                            // Use `onMouseDown` with `preventDefault` to prevent the editor from losing focus.
                            e.preventDefault()

                            action(callCommand(wrapInHeadingCommand.key, 2))
                        }}
                    >
                        <img src={header2} className='tooltipIcon'></img>
                    </button>
                    <button
                        className="tooltipItem"
                        onMouseDown={(e) => {
                            // Use `onMouseDown` with `preventDefault` to prevent the editor from losing focus.
                            e.preventDefault()

                            action(callCommand(wrapInHeadingCommand.key, 3))
                        }}
                    >
                        <img src={header3} className='tooltipIcon'></img>
                    </button>
                    <button
                        className="tooltipItem"
                        onMouseDown={(e) => {
                            // Use `onMouseDown` with `preventDefault` to prevent the editor from losing focus.
                            e.preventDefault()

                            action(callCommand(toggleStrongCommand.key))
                        }}
                    >
                        <img src={boldIcon} className='tooltipIcon'></img>
                    </button>
                    <button
                        className="tooltipItem"
                        onMouseDown={(e) => {
                            // Use `onMouseDown` with `preventDefault` to prevent the editor from losing focus.
                            e.preventDefault()

                            action(callCommand(toggleEmphasisCommand.key))
                        }}
                    >
                        <img src={italicIcon} className='tooltipIcon'></img>
                    </button>
                    <button
                        className="tooltipItem"
                        onMouseDown={(e) => {
                            // Use `onMouseDown` with `preventDefault` to prevent the editor from losing focus.
                            e.preventDefault()

                            action(callCommand(wrapInBulletListCommand.key))
                        }}
                    >
                        <img src={listUnordered} className='tooltipIcon'></img>
                    </button>
                    <button
                        className="tooltipItem"
                        onMouseDown={(e) => {
                            // Use `onMouseDown` with `preventDefault` to prevent the editor from losing focus.
                            e.preventDefault()

                            action(callCommand(wrapInOrderedListCommand.key))
                        }}
                    >
                        <img src={listOrdered} className='tooltipIcon'></img>
                    </button>
                    <button
                        className="tooltipItem"
                        onMouseDown={(e) => {
                            // Use `onMouseDown` with `preventDefault` to prevent the editor from losing focus.
                            e.preventDefault()

                            action(callCommand(toggleStrikethroughCommand.key))
                        }}
                    >
                        <img src={strikethrough} className='tooltipIcon'></img>
                    </button>
                    <button
                        className="tooltipItem"
                        onMouseDown={(e) => {
                            // Use `onMouseDown` with `preventDefault` to prevent the editor from losing focus.
                            e.preventDefault()

                            action(callCommand(wrapInBlockquoteCommand.key))
                        }}
                    >
                        <img src={blockquote} className='tooltipIcon'></img>
                    </button>
                </div>
            </div>
        </div>
    )
}
