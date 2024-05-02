import { wikiSlash } from "../wiki-link/config.tsx";
import { WikiMenu } from "../wiki-link/wikilinkMenu.tsx";
import { Ctx } from "@milkdown/ctx";
import { usePluginViewFactory } from "@prosemirror-adapter/react";

const inspectKeys = ["ArrowDown", "ArrowUp", "Enter"];

export const useWikiMenu = () => {
  const pluginViewFactory = usePluginViewFactory();
  return {
    plugins: wikiSlash,
    config: (ctx: Ctx) => {
      ctx.set(wikiSlash.key, {
        props: {
          handleKeyDown: (view, event) => {
            if (!ctx.get(wikiSlash.key).opened) {
              return false;
            }
            return inspectKeys.includes(event.key);
          },
        },
        view: pluginViewFactory({
          component: WikiMenu,
        }),
        opened: false,
      });
    },
  };
};