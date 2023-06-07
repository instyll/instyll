import { defaultValueCtx, Editor, rootCtx } from '@milkdown/core';
import type { FC } from 'react';
import { useEffect, useMemo } from "react";
import type { Ctx, MilkdownPlugin } from "@milkdown/ctx";
import { commonmark, listItemSchema } from '@milkdown/preset-commonmark';
import { Milkdown, useEditor } from '@milkdown/react';
import { nord } from '@milkdown/theme-nord';
import { 
  usePluginViewFactory, useNodeViewFactory
} 
from '@prosemirror-adapter/react';
import { Slash } from './slash-menu/Slash.tsx';
import { useSlash } from './slash-menu/index.tsx';
import { gfm, strikethroughKeymap } from '@milkdown/preset-gfm';
import { math } from '@milkdown/plugin-math';
import { emoji } from '@milkdown/plugin-emoji';
import { diagram, diagramSchema } from "@milkdown/plugin-diagram";
import { history } from '@milkdown/plugin-history';
import { block } from '@milkdown/plugin-block';
import { BlockView } from './Block.tsx';
import { prism, prismConfig } from '@milkdown/plugin-prism';
import { listener, listenerCtx } from '@milkdown/plugin-listener';
import { clipboard } from '@milkdown/plugin-clipboard';
import { trailing } from '@milkdown/plugin-trailing';
import { indent } from '@milkdown/plugin-indent';

import { Diagram } from './Diagram.tsx';
import { $view, getMarkdown } from "@milkdown/utils";

import './App.css';

const markdown =
  ``

export const MilkdownEditor: FC = () => {

  const pluginViewFactory = usePluginViewFactory();
  const nodeViewFactory = useNodeViewFactory();

  const slash = useSlash();

  const diagramPlugins: MilkdownPlugin[] = useMemo(() => {
    return [
      diagram,
      $view(diagramSchema.node, () =>
        nodeViewFactory({
          component: Diagram,
          stopEvent: () => true,
        })
      ),
    ].flat();
  }, [nodeViewFactory]);

  useEditor((root) => {
    return Editor
      .make()
      .config(ctx => {
        ctx.set(rootCtx, root)
        ctx.set(defaultValueCtx, markdown)
        const listener = ctx.get(listenerCtx);
        listener.markdownUpdated((ctx, markdown, prevMarkdown) => {
          if (markdown !== prevMarkdown) {
            // YourMarkdownUpdater(markdown);
            window.parent.postMessage({ type: "updateToc" }, "*");
          }
        })
        ctx.set(strikethroughKeymap.key, {
          ToggleStrikethrough: 'Mod-Shift-s',
          // or you may want to bind multiple keys:
          ToggleStrikethrough: ['Mod-Shift-s', 'Mod-s'],
        })
        slash.config(ctx);
      })
      .config(nord)
      .use(commonmark)
      .use(gfm)
      .use(math)
      .use(emoji)
      .use(diagram)
      .use(history)
      .use(block)
      .use(prism)
      .use(listener)
      .use(clipboard)
      .use(trailing)
      .use(indent)
      .use(slash.plugins)
      // .use(diagram)
      .use(diagramPlugins)
  }, [])

  return <Milkdown />
}
