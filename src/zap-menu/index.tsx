import { zapSlash } from "../zap-menu/config.tsx";
import { ZapMenu } from "../zap-menu/zapMenu.tsx";
import { Ctx } from "@milkdown/ctx";
import { usePluginViewFactory } from "@prosemirror-adapter/react";

const inspectKeys = ["ArrowDown", "ArrowUp", "Tab"];

export const useZapMenu = () => {
  const pluginViewFactory = usePluginViewFactory();
  return {
    plugins: zapSlash,
    config: (ctx: Ctx) => {
      ctx.set(zapSlash.key, {
        props: {
          handleKeyDown: (view, event) => {
            if (!ctx.get(zapSlash.key).opened) {
              return false;
            }
            return inspectKeys.includes(event.key);
          },
        },
        view: pluginViewFactory({
          component: ZapMenu,
        }),
        opened: false,
      });
    },
  };
};