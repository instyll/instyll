import { Ctx } from "@milkdown/ctx";
import { Instance } from "@milkdown/react";
import { clsx } from "clsx";
import { FC, ReactNode, useEffect, useRef } from "react";

type ZapItemProps = {
  index: number;
  instance: Instance;
  onSelect: (ctx: Ctx) => void;
  children: ReactNode;
  selected: boolean;
  setSelected: (selected: number) => void;
};

export const ZapMenuItem: FC<ZapItemProps> = ({
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

  return (
    <li
      ref={listItemRef}
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