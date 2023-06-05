// import React from 'react';
// import { Editor, rootCtx, defaultValueCtx } from '@milkdown/core';
// import { nord } from '@milkdown/theme-nord';
// import { $view, getMarkdown } from "@milkdown/utils";
// import {
//   useNodeViewFactory,
//   usePluginViewFactory,
//   useWidgetViewFactory,
// } from "@prosemirror-adapter/react";
// import { Milkdown, MilkdownProvider, useEditor } from '@milkdown/react';
// // import { commonmark } from '@milkdown/preset-commonmark';
// import {
//   codeBlockSchema,
//   commonmark,
//   listItemSchema,
// } from "@milkdown/preset-commonmark";
// import { gfm, strikethroughKeymap } from '@milkdown/preset-gfm';
// import { math } from '@milkdown/plugin-math';
// import { emoji } from '@milkdown/plugin-emoji';
// import { diagram } from '@milkdown/plugin-diagram';
// import { history } from '@milkdown/plugin-history';
// import { block } from '@milkdown/plugin-block';
// import { BlockView } from './Block.tsx';
// import { prism, prismConfig } from '@milkdown/plugin-prism';
// import { listener, listenerCtx } from '@milkdown/plugin-listener';
// import { clipboard } from '@milkdown/plugin-clipboard';
// import { trailing } from '@milkdown/plugin-trailing';
// import { indent } from '@milkdown/plugin-indent';
// import { slash, SlashView } from './Slash.tsx';
// // import { placeholder, placeholderCtx } from 'milkdown-plugin-placeholder';

// import { useCustomNodeViewFactory } from './useCustomNodeviewFactory.ts';

// import 'katex/dist/katex.min.css';

// // components
// import { ListItem } from './ListItem.tsx';

// // refractor languages
// import markdown from 'refractor/lang/markdown'
// import css from 'refractor/lang/css'
// import javascript from 'refractor/lang/javascript'
// import typescript from 'refractor/lang/typescript'
// import jsx from 'refractor/lang/jsx'
// import tsx from 'refractor/lang/tsx'

// // const defaultValue = 'Type "/" to get started';
// const MilkdownEditor: React.FC = () => {

//   const pluginViewFactory = usePluginViewFactory();

//   const { editor } = useEditor((root) =>

//     Editor.make()
//       .config(nord)
//       .config((ctx) => {


//         ctx.set(slash.key, {
//           view: pluginViewFactory({
//             component: SlashView,
//           })
//         })

//         const listener = ctx.get(listenerCtx);

//         // const nodeViewFactory = useCustomNodeViewFactory();

//         listener.markdownUpdated((ctx, markdown, prevMarkdown) => {
//           if (markdown !== prevMarkdown) {
//             // YourMarkdownUpdater(markdown);
//             window.parent.postMessage({ type: "updateToc" }, "*");
//           }
//         })

//         ctx.set(rootCtx, root)
//         ctx.set(defaultValueCtx, '')
//         // ctx.set(placeholderCtx, 'Have fun!');
//         ctx.set(prismConfig.key, {
//           configureRefractor: (refractor) => {
//             refractor.register(markdown)
//             refractor.register(css)
//             refractor.register(javascript)
//             refractor.register(typescript)
//             refractor.register(jsx)
//             refractor.register(tsx)
//           },
//         })
//         ctx.set(strikethroughKeymap.key, {
//           ToggleStrikethrough: 'Mod-Shift-s',
//           // or you may want to bind multiple keys:
//           ToggleStrikethrough: ['Mod-Shift-s', 'Mod-s'],
//         })
//       })
//       .use(commonmark)
//       .use(gfm)
//       .use(math)
//       .use(emoji)
//       .use(diagram)
//       .use(history)
//       .use(block)
//       .use(prism)
//       .use(listener)
//       .use(clipboard)
//       .use(trailing)
//       .use(indent)
//       .use(slash),
//       // .use(placeholder),
//   );

//   return <Milkdown />;
// };

// export const MilkdownEditorWrapper: React.FC = () => {
//   return (
//     <MilkdownProvider>
//       <MilkdownEditor />
//     </MilkdownProvider>
//   );
// };
import { defaultValueCtx, Editor, rootCtx } from '@milkdown/core';
import type { FC } from 'react';

import { commonmark } from '@milkdown/preset-commonmark';
import { Milkdown, useEditor } from '@milkdown/react';
import { nord } from '@milkdown/theme-nord';
import { usePluginViewFactory } from '@prosemirror-adapter/react';
import { slash, SlashView } from './Slash.tsx';
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

  useEditor((root) => {
    return Editor
      .make()
      .config(ctx => {
        ctx.set(rootCtx, root)
        ctx.set(defaultValueCtx, markdown)
        ctx.set(slash.key, {
          view: pluginViewFactory({
            component: SlashView,
          })
        })
      })
      .config(nord)
      .use(commonmark)
      .use(slash)
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
      .use(slash)
  }, [])

  return <Milkdown />
}
