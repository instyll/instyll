import React from 'react';
import { Editor, rootCtx, defaultValueCtx } from '@milkdown/core';
import { nord } from '@milkdown/theme-nord';
import { Milkdown, MilkdownProvider, useEditor } from '@milkdown/react';
import { commonmark } from '@milkdown/preset-commonmark';
import { gfm } from '@milkdown/preset-gfm';
import { math } from '@milkdown/plugin-math';
import { emoji } from '@milkdown/plugin-emoji';
import { diagram } from '@milkdown/plugin-diagram';
import { history } from '@milkdown/plugin-history';
import { block } from '@milkdown/plugin-block';
import { BlockView } from './Block.tsx';
import { prism, prismConfig } from '@milkdown/plugin-prism';
import { listener, listenerCtx } from '@milkdown/plugin-listener';
// import { usePluginViewFactory } from '@prosemirror-adapter/react';
import 'katex/dist/katex.min.css';

// refractor languages
import markdown from 'refractor/lang/markdown'
import css from 'refractor/lang/css'
import javascript from 'refractor/lang/javascript'
import typescript from 'refractor/lang/typescript'
import jsx from 'refractor/lang/jsx'
import tsx from 'refractor/lang/tsx'

const defaultValue = 'Type "/" to get started';

const MilkdownEditor: React.FC = () => {

  // const pluginViewFactory = usePluginViewFactory();

  const { editor } = useEditor((root) =>
    Editor.make()
      .config(nord)
      .config((ctx) => {

        const listener = ctx.get(listenerCtx);

        listener.markdownUpdated((ctx, markdown, prevMarkdown) => {
          if (markdown !== prevMarkdown) {
            // YourMarkdownUpdater(markdown);
            window.parent.postMessage({type: "updateToc"}, "*");
          }
        })

        ctx.set(rootCtx, root)
        ctx.set(defaultValueCtx, defaultValue);
        ctx.set(prismConfig.key, {
          configureRefractor: (refractor) => {
            refractor.register(markdown)
            refractor.register(css)
            refractor.register(javascript)
            refractor.register(typescript)
            refractor.register(jsx)
            refractor.register(tsx)
          },
        })
      })
      .use(commonmark)
      .use(gfm)
      .use(math)
      .use(emoji)
      .use(diagram)
      .use(history)
      .use(block)
      .use(prism)
      .use(listener),
  );

  return <Milkdown />;
};

export const MilkdownEditorWrapper: React.FC = () => {
  return (
    <MilkdownProvider>
      <MilkdownEditor />
    </MilkdownProvider>
  );
};