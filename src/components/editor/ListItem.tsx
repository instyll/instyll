// import { useNodeViewContext } from "@prosemirror-adapter/react";
// import type { FC } from "react";

// export const ListItem: FC = () => {
//   const { contentRef, node, setAttrs, selected } = useNodeViewContext();
//   const { attrs } = node;
//   const checked = attrs?.checked;
//   const isBullet = attrs?.listType === "bullet";
//   return (
//     <li
//       className={[ "checkboxNode",
//         selected ? "ProseMirror-selectednode" : "",
//       ].join(" ")}
//     >
//       <span className="checkboxSpan">
//         {checked != null ? (
//           <input
//             className="checkboxInput"
//             onChange={() => setAttrs({ checked: !checked })}
//             type="checkbox"
//             checked={checked}
//           />
//         ) : isBullet ? (
//           <span className="" />
//         ) : (
//           <span className="">{attrs?.label}</span>
//         )}
//       </span>
//       <div className="checkboxContent" ref={contentRef} />
//     </li>
//   );
// };
import { useNodeViewContext } from "@prosemirror-adapter/react";
import type { FC } from "react";

export const ListItem: FC = () => {
  const { contentRef, node, setAttrs, selected } = useNodeViewContext();
  const { attrs } = node;
  const checked = attrs?.checked;
  const isBullet = attrs?.listType === "bullet";
  return (
    <li
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "start",
        gap: "0.6rem",
        ...(selected && { outline: "1px solid #000" }),
      }}
    >
      <span style={{ display: "flex", height: "2rem", alignItems: "center" }}>
        {checked != null ? (
          <input
            style={{ appearance: "checkbox", borderRadius: "50%", marginLeft: "0px" }}
            onChange={() => setAttrs({ checked: !checked })}
            type="checkbox"
            checked={checked}
          />
        ) : isBullet ? (
          <span style={{ height: "0.45rem", width: "0.45rem", borderRadius: "50%", backgroundColor: "var(--primary-text)"}} />
        ) : (
          <span className="orderedDelim">{attrs?.label}</span>
        )}
      </span>
      <div style={{ minWidth: "0" }} ref={contentRef} />
    </li>
  );
};
