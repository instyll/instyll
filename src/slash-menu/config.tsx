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
} from "@milkdown/preset-commonmark";
import { ReactNode } from "react";

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
    {
        onSelect: (ctx: Ctx) => ctx.get(commandsCtx).call(turnIntoTextCommand.key),
        renderer: (
            <div className="slashSuggestionItemContainer">
                <span className="suggestionItemImageContainer">

                </span>
                <div className="suggestionItemTitle">
                Text
                <br></br>
                <span className="suggestionItemDescription">Write normal text in paragraph size.</span>
                </div>
            </div>
        ),
    },
    {
        onSelect: (ctx: Ctx) => ctx.get(commandsCtx).call(wrapInBulletListCommand.key),
        renderer: (
            <div className="slashSuggestionItemContainer">
                <span className="suggestionItemImageContainer">

                </span>
                <div className="suggestionItemTitle">
                Bullet List
                <br></br>
                <span className="suggestionItemDescription">Create a list with bullets.</span>
                </div>
            </div>
        ),
    },
    {
        onSelect: (ctx: Ctx) => ctx.get(commandsCtx).call(wrapInOrderedListCommand.key),
        renderer: (
            <div className="slashSuggestionItemContainer">
                <span className="suggestionItemImageContainer">

                </span>
                <div className="suggestionItemTitle">
                Numbered List
                <br></br>
                <span className="suggestionItemDescription">Create a list with numbers.</span>
                </div>
            </div>
        ),
    },
    {
        onSelect: (ctx: Ctx) =>
            ctx.get(commandsCtx).call(wrapInHeadingCommand.key, 1),
        renderer: (
            <div className="slashSuggestionItemContainer">
                <span className="suggestionItemImageContainer">

                </span>
                <div className="suggestionItemTitle">
                Heading 1
                <br></br>
                <span className="suggestionItemDescription">Create a large-sized section title.</span>
                </div>
            </div>
        ),
    },
    {
        onSelect: (ctx: Ctx) =>
            ctx.get(commandsCtx).call(wrapInHeadingCommand.key, 2),
        renderer: (
            <div className="slashSuggestionItemContainer">
                <span className="suggestionItemImageContainer">

                </span>
                <div className="suggestionItemTitle">
                Heading 2
                <br></br>
                <span className="suggestionItemDescription">Create a medium-sized section title.</span>
                </div>
            </div>
        ),
    },
    {
        onSelect: (ctx: Ctx) =>
            ctx.get(commandsCtx).call(wrapInHeadingCommand.key, 3),
        renderer: (
            <div className="slashSuggestionItemContainer">
                <span className="suggestionItemImageContainer">

                </span>
                <div className="suggestionItemTitle">
                Heading 3
                <br></br>
                <span className="suggestionItemDescription">Create a small-sized section title.</span>
                </div>
            </div>
        ),
    },
    {
        onSelect: (ctx: Ctx) =>
            ctx.get(commandsCtx).call(createCodeBlockCommand.key),
        renderer: (
            <div className="slashSuggestionItemContainer">
                <span className="suggestionItemImageContainer">

                </span>
                <div className="suggestionItemTitle">
                Code Block
                <br></br>
                <span className="suggestionItemDescription">Write code in a code block.</span>
                </div>
            </div>
        ),
    },
    {
        onSelect: (ctx: Ctx) =>
            ctx.get(commandsCtx).call(wrapInBlockquoteCommand.key),
        renderer: (
            <div className="slashSuggestionItemContainer">
                <span className="suggestionItemImageContainer">

                </span>
                <div className="suggestionItemTitle">
                Quote
                <br></br>
                <span className="suggestionItemDescription">Write down a quote.</span>
                </div>
            </div>
        ),
    },
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
].map((item) => ({
    ...item,
    onSelect: (ctx: Ctx) => {
        removeSlash(ctx);
        item.onSelect(ctx);
    },
}));
