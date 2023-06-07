import { Ctx } from "@milkdown/ctx";
import { Instance } from "@milkdown/react";
import { clsx } from "clsx";
import { FC, ReactNode, useRef, useEffect } from "react";

type SlashItemProps = {
  index: number;
  instance: Instance;
  onSelect: (ctx: Ctx) => void;
  children: ReactNode;
  selected: boolean;
  setSelected: (selected: number) => void;
};

export const SlashItem: FC<SlashItemProps> = ({
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

  const onPick = () => {
    if (loading) return;

    getEditor().action((ctx) => {
      onSelect(ctx);
    });
  };

  return (
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
  );
};
