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
// import { usePluginViewFactory } from '@prosemirror-adapter/react';
import 'katex/dist/katex.min.css';

const defaultValue = 'Type "/" to get started';

const MilkdownEditor: React.FC = () => {

  // const pluginViewFactory = usePluginViewFactory();

  const { editor } = useEditor((root) =>
    Editor.make()
      .config(nord)
      .config((ctx) => {
        ctx.set(rootCtx, root)
        ctx.set(defaultValueCtx, defaultValue);
      })
      .use(commonmark)
      .use(gfm)
      .use(math)
      .use(emoji)
      .use(diagram)
      .use(history)
      .use(block),
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