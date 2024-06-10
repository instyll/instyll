/**
 * @author wou
 */
import { config } from "../slash-menu/config.tsx";
import { SlashItem } from "../slash-menu/slashItem.tsx";
import { useSlashState } from "../slash-menu/state.ts";
import { SlashProvider } from "@milkdown/plugin-slash";
import { useInstance } from "@milkdown/react";
import { usePluginViewContext } from "@prosemirror-adapter/react";
import { useEffect, useRef, useState } from "react";
import React from "react";

export const Slash = () => {
  const { view, prevState } = usePluginViewContext();
  const slashProvider = useRef<SlashProvider>();
  const ref = useRef<HTMLDivElement>(null);
  const instance = useInstance();
  const [loading] = instance;
  const [modalState, setModalState] = useState(false);
  const { root, setOpened, onKeydown, setSelected, selected } =
    useSlashState(instance, setModalState);

  useEffect(() => {
    if (!ref.current || loading) return;

    slashProvider.current ??= new SlashProvider({
      content: ref.current,
      debounce: 50,
      tippyOptions: {
        onShow: () => {
          setOpened(true);
          root?.addEventListener("keydown", onKeydown);
         
        },
        onHide: () => {
          setSelected(0);
          setOpened(false);
          root?.removeEventListener("keydown", onKeydown);
        },
      },
    });

    return () => {
      slashProvider.current?.destroy();
      slashProvider.current = undefined;
    };

  }, [loading, onKeydown, root, setOpened, setSelected]);

  useEffect(() => {
    slashProvider.current?.update(view, prevState);
  });

  return (
    <div className="hidden">
      <div role="tooltip" ref={ref}>
        <ul className="slashItemContainer" autoFocus tabIndex={1}>
            <span className="slashGroupHeader">Formatting</span>
          {config.map((item, i) => (
            <SlashItem
              key={i.toString()}
              index={i}
              instance={instance}
              onSelect={(ctx) => item.onSelect(ctx)}
              selected={i === selected}
              setSelected={setSelected}
            >
              {item.renderer}
            </SlashItem>
          ))}
        </ul>
      </div>
    </div>
  );
};
