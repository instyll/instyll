import { MilkdownPlugin } from "@milkdown/ctx";
import { slashFactory } from "@milkdown/plugin-slash";

export const zapSlash = slashFactory("zapMenu") satisfies MilkdownPlugin[];