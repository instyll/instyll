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
import { ReactNode } from "react";

import textIcon from '../icons/TEXT.png'
import h1Icon from '../icons/H1.png'
import h2Icon from '../icons/H2.png'
import h3Icon from '../icons/H3.png'
import codeIcon from '../icons/CodeIcon.png'
import numIcon from '../icons/NumIcon.png'
import quoteIcon from '../icons/QuoteIcon.png'
import bulletIcon from '../icons/BulletIcon.png'
import aiIcon from '../icons/ai2.png'

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
        onSelect: (ctx: Ctx) => ctx.get(commandsCtx).call(turnIntoTextCommand.key),
        renderer: (
            <div className="slashSuggestionItemContainer">
                <span className="suggestionItemImageContainer">
                    <img src={aiIcon} className="aiIcon"></img>
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
                    <img src={textIcon}></img>
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
                    <img src={bulletIcon}></img>
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
                    <img src={numIcon}></img>
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
                    <img src={h1Icon}></img>
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
                    <img src={h2Icon}></img>
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
                    <img src={h3Icon}></img>
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
                    <img src={codeIcon}></img>
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
                    <img src={quoteIcon}></img>
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
