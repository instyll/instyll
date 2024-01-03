/**
 * @author wou
 */
import { defaultValueCtx, Editor, rootCtx } from '@milkdown/core';
import type { FC } from 'react';
import fs from 'fs'
import { useEffect, useMemo, useState } from "react";
import { replaceAll, insert } from "@milkdown/utils"
import type { Ctx, MilkdownPlugin } from "@milkdown/ctx";
import { 
  commonmark, 
  listItemSchema,
  codeBlockSchema 
} from '@milkdown/preset-commonmark';
import { Milkdown, useEditor } from '@milkdown/react';
import { nord } from '@milkdown/theme-nord';
import {
  usePluginViewFactory, useNodeViewFactory, useWidgetViewFactory
}
  from '@prosemirror-adapter/react';
import { Slash } from './slash-menu/Slash.tsx';
import { useSlash } from './slash-menu/index.tsx';
import { useEmojiMenu } from './emoji-menu/index.tsx';
import { useZapMenu } from './zap-menu/index.tsx';
import {
  gfm,
  strikethroughKeymap,
  footnoteDefinitionSchema,
  footnoteReferenceSchema,
} from '@milkdown/preset-gfm';
import { FootnoteDef, FootnoteRef } from './components/editor/Footnote.tsx';
import { math, mathBlockSchema } from '@milkdown/plugin-math';
import { emoji, emojiAttr } from '@milkdown/plugin-emoji';
import { diagram, diagramSchema } from "@milkdown/plugin-diagram";
import { history } from '@milkdown/plugin-history';
import { block } from '@milkdown/plugin-block';
import { Block } from './components/editor/Block.tsx';
import { prism, prismConfig } from '@milkdown/plugin-prism';
import { listener, listenerCtx } from '@milkdown/plugin-listener';
import { clipboard } from '@milkdown/plugin-clipboard';
import { trailing } from '@milkdown/plugin-trailing';
import { indent } from '@milkdown/plugin-indent';

import { tooltip, TooltipView } from './components/editor/Tooltip.tsx';

import { MathBlock } from './components/editor/MathBlock.tsx';

import { Diagram } from './components/editor/Diagram.tsx';

import { linkPlugin } from './components/editor/LinkWidget.tsx';

import { CodeBlock } from './components/editor/CodeBlock.tsx';
import { $view, getMarkdown } from "@milkdown/utils";

import './App.css';

const markdown =
  ``

export const MilkdownEditor: FC = ({documentPath, documentContents}) => {

  const pluginViewFactory = usePluginViewFactory();
  const nodeViewFactory = useNodeViewFactory();
  const widgetViewFactory = useWidgetViewFactory();

  const slash = useSlash();

  const emojiMenu = useEmojiMenu();

  const zapMenu = useZapMenu();

  const [fileContents, setFileContents] = useState(null); // State to store file contents

  // useEffect(() => {
  //   const readMarkdown = async () => {
  //     try {
  //       const contents = fs.readFileSync(documentPath, 'utf-8');
  //       console.log(contents)
  //       setFileContents(contents);
  //       console.log(fileContents)
  //     } catch (error) {
  //       console.error('Error reading file:', error);
  //     }
  //   };

  //   readMarkdown();
  // }, [fileContents]); 

  /* gfm plugins */

  const gfmPlugins: MilkdownPlugin[] = useMemo(() => {
    return [
      gfm,
      $view(footnoteDefinitionSchema.node, () =>
        nodeViewFactory({ component: FootnoteDef })
      ),
      $view(footnoteReferenceSchema.node, () =>
        nodeViewFactory({ component: FootnoteRef })
      ),
    ].flat();
  }, [nodeViewFactory, pluginViewFactory, widgetViewFactory])

  /* mermaid diagram plugin */
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

  /* math plugin */
  const mathPlugins: MilkdownPlugin[] = useMemo(() => {
    return [
      $view(mathBlockSchema.node, () =>
        nodeViewFactory({
          component: MathBlock,
          stopEvent: () => true,
        })
      ),
      math,
    ].flat();
  }, [nodeViewFactory]);

  /* block plugin */
  const blockPlugins: MilkdownPlugin[] = useMemo(() => {
    return [
      block,
      (ctx: Ctx) => () => {
        ctx.set(block.key, {
          view: pluginViewFactory({
            component: Block,
          }),
        });
      },
    ].flat();
  }, [pluginViewFactory]);

  useEditor((root) => {
    return Editor
      .make()
      .config(ctx => {
        ctx.set(rootCtx, root)
        // ctx.set(defaultValueCtx, fileContents)
        const listener = ctx.get(listenerCtx);
        console.log(fileContents)
        ctx.get(listenerCtx).mounted(insert(documentContents))

        /* listen for changes in the editor */
        listener.markdownUpdated((ctx, markdown, prevMarkdown) => {
          if (markdown !== prevMarkdown) {
            // YourMarkdownUpdater(markdown);
            window.parent.postMessage({ type: "updateToc" }, "*");
            // update the file with new markdown
            try {
              fs.writeFileSync(documentPath, markdown, 'utf-8');
              console.log('File updated successfully.');
            } catch (error) {
              console.error('Error updating file:', error);
            }
          }
        })

        /* create strikethrough keybind */
        ctx.set(strikethroughKeymap.key, {
          ToggleStrikethrough: 'Mod-Shift-s',
          // or you may want to bind multiple keys:
          ToggleStrikethrough: ['Mod-Shift-s', 'Mod-s'],
        })

       /* create tooltip view */
        ctx.set(tooltip.key, {
          view: pluginViewFactory({
            component: TooltipView,
          })
        })

        slash.config(ctx);
        emojiMenu.config(ctx);
        zapMenu.config(ctx);
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
      .use(gfmPlugins)
      .use(slash.plugins)
      .use(emojiMenu.plugins)
      .use(zapMenu.plugins)
      .use(diagramPlugins)
      .use(blockPlugins)
      .use(mathPlugins)
      .use(linkPlugin(widgetViewFactory))
      .use(tooltip)
      .use(
        $view(codeBlockSchema.node, () =>
          nodeViewFactory({ component: CodeBlock })
        )
      );
  }, [])

  return <Milkdown />
}
