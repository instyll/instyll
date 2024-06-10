/**
 * @author wou
 */
import { config, slash } from "../slash-menu/config.tsx";
import { rootDOMCtx } from "@milkdown/core";
import { Instance } from "@milkdown/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export const useSlashState = (instance: Instance, updateModalState: (newState: boolean) => void) => {
  const [loading, getEditor] = instance;
  const [selected, setSelected] = useState(0);
  const selectedRef = useRef(0);
  const [modalState, setModalState] = useState(false);

  useEffect(() => {
    selectedRef.current = selected;
  }, [selected]);

  const root = useMemo(() => {
    if (loading) return undefined;
    try {
      return getEditor().ctx.get(rootDOMCtx);
    } catch {
      return undefined;
    }
  }, [getEditor, loading]);

  const setOpened = useCallback(
    (opened: boolean) => {
      getEditor()?.action((ctx) => {
        ctx.update(slash.key, (spec) => ({
          ...spec,
          opened,
        }));
      });
    },
    [getEditor]
  );

  /* handle arrow navigation through slash menu */
  const onKeydown = useCallback(
    (e: KeyboardEvent, itemIndex) => {
      itemIndex = itemIndex || -1;
      const key = e.key;
      if (key === "ArrowDown") {
        setSelected((s) => (s + 1) % config.length);
        return;
      }
      if (key === "ArrowUp") {
        setSelected((s) => (s - 1 + config.length) % config.length);
        return;
      }
      if (key === "Enter") {
        getEditor()?.action(config[selectedRef.current].onSelect);
        return;
      }
    },
    [getEditor, updateModalState]
  );

  return {
    root,
    setOpened,
    onKeydown,
    setSelected,
    selected,
  };
};
