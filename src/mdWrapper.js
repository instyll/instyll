import { defaultValueCtx, Editor, rootCtx } from '@milkdown/core';
import type { FC } from 'react';

import { commonmark } from '@milkdown/preset-commonmark';
import { Milkdown, useEditor } from '@milkdown/react';
import { nord } from '@milkdown/theme-nord';
import { usePluginViewFactory } from '@prosemirror-adapter/react';
import { Slash } from './slash-menu/Slash.tsx';
import { useSlash } from './slash-menu/index.tsx';
import { gfm, strikethroughKeymap } from '@milkdown/preset-gfm';
import { math } from '@milkdown/plugin-math';
import { emoji } from '@milkdown/plugin-emoji';
import { diagram } from '@milkdown/plugin-diagram';
import { history } from '@milkdown/plugin-history';
import { block } from '@milkdown/plugin-block';
import { BlockView } from './Block.tsx';
import { prism, prismConfig } from '@milkdown/plugin-prism';
import { listener, listenerCtx } from '@milkdown/plugin-listener';
import { clipboard } from '@milkdown/plugin-clipboard';
import { trailing } from '@milkdown/plugin-trailing';
import { indent } from '@milkdown/plugin-indent';

// import '@milkdown/theme-nord/style.css';
import './App.css';

const markdown =
``

export const MilkdownEditor: FC = () => {
  const pluginViewFactory = usePluginViewFactory();
  const slash = useSlash();

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
        // ctx.set(slash.key, {
        //   view: pluginViewFactory({
        //     component: SlashView,
        //   })
        // })
        slash.config(ctx);
      })
      .config(nord)
      .use(commonmark)
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
  }, [])

  return <Milkdown />
}
