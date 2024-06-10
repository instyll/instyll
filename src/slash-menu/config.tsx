/**
 * @author wou
 */
import { commandsCtx, editorViewCtx } from "@milkdown/core";
import { Ctx, MilkdownPlugin } from "@milkdown/ctx";
import { slashFactory } from "@milkdown/plugin-slash";
import {
    createCodeBlockCommand,
    insertHrCommand,
    turnIntoTextCommand,
    wrapInBlockquoteCommand,
    wrapInBulletListCommand,
    wrapInHeadingCommand,
    wrapInOrderedListCommand
} from "@milkdown/preset-commonmark";
import { insertTableCommand } from "@milkdown/preset-gfm";
import { ReactNode } from "react";


import { CaseLower, Code, Heading1, Heading2, Heading3, List, ListOrdered, Minus, Quote, Table } from "lucide-react";

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
    /* item for paragraph text */
    {
        onSelect: (ctx: Ctx) => ctx.get(commandsCtx).call(turnIntoTextCommand.key),
        renderer: (
            <div className="slashSuggestionItemContainer">
                <span className="suggestionItemImageContainer">
                    <CaseLower size={16} className="tooltipIcon"/>
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
                    <List size={16} className="tooltipIcon"/>
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
                    <ListOrdered size={16} className="tooltipIcon"/>
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
                    <Heading1 size={16} className="tooltipIcon"/>
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
                    <Heading2 size={16} className="tooltipIcon"/>
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
                    <Heading3 size={16} className="tooltipIcon"/>
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
                    <Code size={16} className="tooltipIcon"/>
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
                    <Quote size={16} className="tooltipIcon"/>
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
                    <Minus size={16} className="tooltipIcon"/>
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
                    <Table size={16} className="tooltipIcon"/>
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
