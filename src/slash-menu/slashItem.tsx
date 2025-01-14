/**
 * @author wou
 */
import { Ctx } from "@milkdown/ctx";
import { Instance } from "@milkdown/react";
import { clsx } from "clsx";
import { FC, ReactNode, useRef, useEffect, useState } from "react";
import GenAIModal from "../modal/openai/GenAIModal";
import React from "react";
import { useSlashState } from "./state";

/* declare properties of slash items */
type SlashItemProps = {
  index: number;
  instance: Instance;
  onSelect: (ctx: Ctx) => void;
  children: ReactNode;
  selected: boolean;
  setSelected: (selected: number) => void;
  keyEvent: (e: KeyboardEvent, itemIndex: number) => boolean;
};

export const SlashItem: FC<SlashItemProps> = ({
  index,
  instance,
  onSelect,
  children,
  selected,
  setSelected,
  keyEvent,
}) => {
  const [loading, getEditor] = instance;
  const listItemRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (selected && listItemRef.current) {
      listItemRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [selected]);

  const onPick = () => {
    // console.log(index)
    if (loading) return;

    getEditor().action((ctx) => {
        onSelect(ctx);
    });
  };

  return (
    <div tabIndex={0}>
    <li
      ref={listItemRef}
      className={clsx(
        "slashSuggestionItem",
        selected && "slashSuggestionItemSelected"
      )}
      onMouseMove={() => setSelected(index)}
      onMouseDown={(e) => {
        e.preventDefault();
        onPick();
      }}
    >
      {children}
 
    </li>
    </div>
  );
};
