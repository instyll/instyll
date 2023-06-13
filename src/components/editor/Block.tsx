/**
 * @author wou
 */
import { commandsCtx } from "@milkdown/core";
import { BlockProvider } from "@milkdown/plugin-block";
import {
  turnIntoTextCommand,
  wrapInHeadingCommand,
} from "@milkdown/preset-commonmark";
import { useInstance } from "@milkdown/react";
import { usePluginViewContext } from "@prosemirror-adapter/react";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

export const Block = () => {
  const { view } = usePluginViewContext();
  const blockProvider = useRef<BlockProvider>();
  const [element, setElement] = useState<HTMLDivElement | null>(null);
  const [loading, get] = useInstance();
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    if (element && !loading) {
      blockProvider.current ??= new BlockProvider({
        ctx: get().ctx,
        content: element,
        tippyOptions: {
          zIndex: 1,
          appendTo: document.body,
          onBeforeUpdate: () => setShowMenu(false),
          onClickOutside: () => setShowMenu(false),
          onHide: () => setShowMenu(false),
        },
      });
    }

    return () => {
      blockProvider?.current?.destroy();
    };
  }, [loading, get, element]);

  useEffect(() => {
    blockProvider.current?.update(view);
  });

  return (
    <div className="hidden">
      <div
        className={clsx(
          "blockSVGWrapper",
          showMenu ? "ring-2 ring-offset-2" : ""
        )}
        ref={setElement}
      >

        <div onClick={() => setShowMenu((x) => !x)} className="blockSVGContainer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={0}
            className="blockSVG"
          >
            <path fill="none" d="M0 0h24v24H0V0z"></path>
            <path d="M11 18c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm-2-8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path>
          </svg>
        </div>
      </div>
    </div>
  );
};