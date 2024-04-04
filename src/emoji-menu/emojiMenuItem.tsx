import { Ctx } from "@milkdown/ctx";
import { Instance } from "@milkdown/react";
import { clsx } from "clsx";
import { FC, ReactNode, useEffect, useRef } from "react";

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
  const listItemRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (selected && listItemRef.current) {
      listItemRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [selected]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLLIElement>) => {
    if (e.key === "Enter") {
      // console.log("ok")
      e.preventDefault();
      if (loading) return;
      getEditor().action(onSelect);
    }
  };

  return (
    <li
      ref={listItemRef}
      className={clsx(
        "emojiMenuItem",
        selected && "emojiMenuItemSelected"
      )}
      onMouseMove={() => setSelected(index)}
      // onMouseDown={(e) => {
      //   if (loading) return;
      //   e.preventDefault();

      //   getEditor().action(onSelect);
      // }}
      onKeyDown={(e) => {
        if (loading) return;
        e.preventDefault();

        getEditor().action(onSelect);
      }}
      tabIndex={0}
    >
      {children}
    </li>
  );
};