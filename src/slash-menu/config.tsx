import { commandsCtx, editorViewCtx } from "@milkdown/core";
import { Ctx, MilkdownPlugin } from "@milkdown/ctx";
import { slashFactory } from "@milkdown/plugin-slash";
import {
    createCodeBlockCommand,
    insertHrCommand,
    wrapInHeadingCommand,
    turnIntoTextCommand,
    wrapInBulletListCommand,
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
                Text
            </div>
        ),
    },
    {
        onSelect: (ctx: Ctx) => ctx.get(commandsCtx).call(wrapInBulletListCommand.key),
        renderer: (
            <div className="slashSuggestionItemContainer">
                <span className="suggestionItemImageContainer">

                </span>
                Bulleted List
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
                Heading 1
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
                Heading 2
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
                Heading 3
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
                Code Block
            </div>
        ),
    },
    {
        onSelect: (ctx: Ctx) => ctx.get(commandsCtx).call(insertHrCommand.key),
        renderer: (
            <div className="slashSuggestionItemContainer">
                <span className="suggestionItemImageContainer">

                </span>
                Divider
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
