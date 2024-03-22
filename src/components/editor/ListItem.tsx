import { useNodeViewContext } from "@prosemirror-adapter/react";
import type { FC } from "react";

export const ListItem: FC = () => {
  const { contentRef, node, setAttrs, selected } = useNodeViewContext();
  const { attrs } = node;
  const checked = attrs?.checked;
  const isBullet = attrs?.listType === "bullet";
  return (
    <li
      className={[ "checkboxNode",
        selected ? "ProseMirror-selectednode" : "",
      ].join(" ")}
    >
      <span className="checkboxSpan">
        {checked != null ? (
          <input
            className="checkboxInput"
            onChange={() => setAttrs({ checked: !checked })}
            type="checkbox"
            checked={checked}
          />
        ) : isBullet ? (
          <span className="" />
        ) : (
          <span className="">{attrs?.label}</span>
        )}
      </span>
      <div className="checkboxContent" ref={contentRef} />
    </li>
  );
};