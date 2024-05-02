import { MilkdownPlugin } from "@milkdown/ctx";
import { slashFactory } from "@milkdown/plugin-slash";

export const wikiSlash = slashFactory("wikiMenu") satisfies MilkdownPlugin[];