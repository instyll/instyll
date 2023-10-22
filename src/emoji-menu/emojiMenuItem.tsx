import { Ctx } from "@milkdown/ctx";
import { Instance } from "@milkdown/react";
import { clsx } from "clsx";
import { FC, ReactNode } from "react";

type EmojiItemProps = {
  index: number;
  instance: Instance;
  onSelect: (ctx: Ctx) => void;
  children: ReactNode;
  selected: boolean;
  setSelected: (selected: number) => void;
};

export const EmojiMenuItem: FC<EmojiItemProps> = ({
  index,
  instance,
  onSelect,
  children,
  selected,
  setSelected,
}) => {
  const [loading, getEditor] = instance;

  return (
    <li
      className={clsx(
        "emojiMenuItem",
        selected && "emojiMenuItemSelected"
      )}
      onMouseMove={() => setSelected(index)}
      onMouseDown={(e) => {
        if (loading) return;
        e.preventDefault();
        getEditor().action(onSelect);
      }}
    >
      {children}
    </li>
  );
};