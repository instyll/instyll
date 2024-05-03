import { zapSlash } from "../zap-menu/config.tsx";
import { editorViewCtx, rootDOMCtx } from "@milkdown/core";
import { Ctx } from "@milkdown/ctx";
import { Instance } from "@milkdown/react";
import { gemoji } from "gemoji";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { $node } from '@milkdown/utils'

export const useSlashState = (instance: Instance) => {
  const [loading, getEditor] = instance;
  const [selected, setSelected] = useState(0);
  const selectedRef = useRef(0);
  const [search, setSearch] = useState("");

  const wikiListConst = useSelector((state) => state.documents.documents);

  // console.log("search len " + search.length)

  const wikiList = useMemo(() => {
    if (search.length === 0) return [];
    return wikiListConst.filter(wikiItem => wikiItem[1].toLowerCase().includes(search.toLowerCase()));
  }, [search]);

  const onPick = useCallback(
    (ctx: Ctx) => {
      const target = wikiList[selected];
      if (!target) return;
      const view = ctx.get(editorViewCtx);
      const { state } = view;
      const { selection } = state;
    //   const linkNode = $node('link', () => ())
      view.dispatch(
        view.state.tr
          .delete(selection.from - search.length - 1, selection.from)
          .insertText(target[1] + "]" + "(" + target[3] + ")")
        //   .replaceSelectionWith()
      );
    },
    [wikiList, search.length, selected]
  );

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
        ctx.update(zapSlash.key, (spec) => ({
          ...spec,
          opened,
        }));
      });
    },
    [getEditor]
  );

  useEffect(() => {
    const onKeydown = (e: KeyboardEvent) => {
      const editor = getEditor();
      const opened = editor?.ctx.get(zapSlash.key).opened;
      if (!opened) return;
      const key = e.key;
      if (key === "ArrowDown") {
        setSelected((s) => (s + 1) % wikiList.length);
        return;
      }
      if (key === "ArrowUp") {
        setSelected((s) => (s - 1 + wikiList.length) % wikiList.length);
        return;
      }
      if (key === "Enter") {
        // e.stopImmediatePropagation();
        getEditor()?.action(onPick);
      }
    };

    root?.addEventListener("keydown", onKeydown);
    return () => {
      root?.removeEventListener("keydown", onKeydown);
    };
  }, [wikiList.length, getEditor, onPick, root]);

  return {
    root,
    setOpened,
    setSelected,
    selected,
    setSearch,
    onPick,
    wikiList,
  };
};