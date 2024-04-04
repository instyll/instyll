/**
 * @author wou
 */
import { commandsCtx, editorViewCtx } from "@milkdown/core";
import { Ctx, MilkdownPlugin } from "@milkdown/ctx";
import { slashFactory } from "@milkdown/plugin-slash";
import {
    createCodeBlockCommand,
    insertHrCommand,
    wrapInHeadingCommand,
    turnIntoTextCommand,
    wrapInBulletListCommand,
    wrapInOrderedListCommand,
    wrapInBlockquoteCommand,
    insertImageCommand,
} from "@milkdown/preset-commonmark";
import { insertTableCommand } from "@milkdown/preset-gfm";
import { ReactNode, useState } from "react";

import GenAIModal from "../modal/openai/GenAIModal";

import textIcon from '../icons/TEXT.png'
import h1Icon from '../icons/header1.png'
import h2Icon from '../icons/header2.png'
import h3Icon from '../icons/header3.png'
import codeIcon from '../icons/CodeIcon.png'
import numIcon from '../icons/listOrdered.png'
import quoteIcon from '../icons/bquote.png'
import bulletIcon from '../icons/listUnordered.png'
import aiIcon from '../icons/ai2.png'
import tableIcon from '../icons/tableIcon.png'
import dividerIcon from '../icons/dividerIcon.png'

/* declare type for respective selections */
type ConfigItem = {
    renderer: ReactNode;
    onSelect: (ctx: Ctx) => void;
};



const removeSlash = (ctx: Ctx) => {
    // remove slash
    const view = ctx.get(editorViewCtx);
    view.dispatch(
        view.state.tr.delete(
            view.state.selection.from - 1,
            view.state.selection.from
        )
    );
};

export const slash = slashFactory("slashMenu") satisfies MilkdownPlugin[];

export const config: Array<ConfigItem> = [
    /* item for gen ai */
    {
        onSelect: (ctx: Ctx) => ({  }),
        renderer: (
            <div className="slashSuggestionItemContainer">
                <span className="suggestionItemImageContainer">
                    <img src={aiIcon} className="tooltipIcon"></img>
                </span>
                <div className="suggestionItemTitle">
                Instyll AI
                <br></br>
                <span className="suggestionItemDescription">Your personal AI note-taking assistant.</span>
                </div>
            </div>
        ),
    },
    /* item for paragraph text */
    {
        onSelect: (ctx: Ctx) => ctx.get(commandsCtx).call(turnIntoTextCommand.key),
        renderer: (
            <div className="slashSuggestionItemContainer">
                <span className="suggestionItemImageContainer">
                    <img src={textIcon} className="tooltipIcon"></img>
                </span> 
                <div className="suggestionItemTitle">
                Text
                <br></br>
                <span className="suggestionItemDescription">Write normal text in paragraph size.</span>
                </div>
            </div>
        ),
    },
    /* item for unordered list */
    {
        onSelect: (ctx: Ctx) => ctx.get(commandsCtx).call(wrapInBulletListCommand.key),
        renderer: (
            <div className="slashSuggestionItemContainer">
                <span className="suggestionItemImageContainer">
                    <img src={bulletIcon} className="tooltipIcon"></img>
                </span>
                <div className="suggestionItemTitle">
                Bullet List
                <br></br>
                <span className="suggestionItemDescription">Create a list with bullets.</span>
                </div>
            </div>
        ),
    },
    /* item for ordered list */
    {
        onSelect: (ctx: Ctx) => ctx.get(commandsCtx).call(wrapInOrderedListCommand.key),
        renderer: (
            <div className="slashSuggestionItemContainer">
                <span className="suggestionItemImageContainer">
                    <img src={numIcon} className="tooltipIcon"></img>
                </span>
                <div className="suggestionItemTitle">
                Numbered List
                <br></br>
                <span className="suggestionItemDescription">Create a list with numbers.</span>
                </div>
            </div>
        ),
    },
    /* item for heading 1 */
    {
        onSelect: (ctx: Ctx) =>
            ctx.get(commandsCtx).call(wrapInHeadingCommand.key, 1),
        renderer: (
            <div className="slashSuggestionItemContainer">
                <span className="suggestionItemImageContainer">
                    <img src={h1Icon} className='tooltipIcon'></img>
                </span>
                <div className="suggestionItemTitle">
                Heading 1
                <br></br>
                <span className="suggestionItemDescription">Create a large-sized section title.</span>
                </div>
            </div>
        ),
    },
    /* item for heading 2 */
    {
        onSelect: (ctx: Ctx) =>
            ctx.get(commandsCtx).call(wrapInHeadingCommand.key, 2),
        renderer: (
            <div className="slashSuggestionItemContainer">
                <span className="suggestionItemImageContainer">
                    <img src={h2Icon} className='tooltipIcon'></img>
                </span>
                <div className="suggestionItemTitle">
                Heading 2
                <br></br>
                <span className="suggestionItemDescription">Create a medium-sized section title.</span>
                </div>
            </div>
        ),
    },
    /* item for heading 3 */
    {
        onSelect: (ctx: Ctx) =>
            ctx.get(commandsCtx).call(wrapInHeadingCommand.key, 3),
        renderer: (
            <div className="slashSuggestionItemContainer">
                <span className="suggestionItemImageContainer">
                    <img src={h3Icon} className='tooltipIcon'></img>
                </span>
                <div className="suggestionItemTitle">
                Heading 3
                <br></br>
                <span className="suggestionItemDescription">Create a small-sized section title.</span>
                </div>
            </div>
        ),
    },
    /* item for code block */
    {
        onSelect: (ctx: Ctx) =>
            ctx.get(commandsCtx).call(createCodeBlockCommand.key),
        renderer: (
            <div className="slashSuggestionItemContainer">
                <span className="suggestionItemImageContainer">
                    <img src={codeIcon} className="tooltipIcon"></img>
                </span>
                <div className="suggestionItemTitle">
                Code Block
                <br></br>
                <span className="suggestionItemDescription">Write code in a code block.</span>
                </div>
            </div>
        ),
    },
    /* item for blockquote */
    {
        onSelect: (ctx: Ctx) =>
            ctx.get(commandsCtx).call(wrapInBlockquoteCommand.key),
        renderer: (
            <div className="slashSuggestionItemContainer">
                <span className="suggestionItemImageContainer">
                    <img src={quoteIcon} className="tooltipIcon"></img>
                </span>
                <div className="suggestionItemTitle">
                Quote
                <br></br>
                <span className="suggestionItemDescription">Write down a quote.</span>
                </div>
            </div>
        ),
    },
    /* item for horizontal rule */
    {
        onSelect: (ctx: Ctx) => ctx.get(commandsCtx).call(insertHrCommand.key),
        renderer: (
            <div className="slashSuggestionItemContainer">
                <span className="suggestionItemImageContainer">
                    <img src={dividerIcon} className="tooltipIcon" />
                </span>
                <div className="suggestionItemTitle">
                Divider
                <br></br>
                <span className="suggestionItemDescription">Separate sections with a divider.</span>
                </div>
            </div>
        ),
    },
    /* item for basic table */
    {
        onSelect: (ctx: Ctx) => ctx.get(commandsCtx).call(insertTableCommand.key, 2),
        renderer: (
            <div className="slashSuggestionItemContainer">
                <span className="suggestionItemImageContainer">
                    <img src={tableIcon} className="tooltipIcon" />
                </span>
                <div className="suggestionItemTitle">
                Table
                <br></br>
                <span className="suggestionItemDescription">Write in tabular format.</span>
                </div>
            </div>
        ),
    },
].map((item) => ({
    ...item,
    onSelect: (ctx: Ctx) => {
        removeSlash(ctx);
        item.onSelect(ctx);
    },
}));
