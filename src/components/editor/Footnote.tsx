/**
 * @author wou
 */
import { useNodeViewContext } from "@prosemirror-adapter/react";
import type { FC } from "react";

export const FootnoteRef: FC = () => {
  const { node } = useNodeViewContext();
  const label = node.attrs.label;

  return (
    <sup>
      <a
        id={`footnote-${label}-ref`}
        className="footnoteSuperscript"
        href={`#footnote-${label}-def`}
      >
        {label}
      </a>
    </sup>
  );
};

export const FootnoteDef: FC = () => {
  const { node, contentRef } = useNodeViewContext();
  const label = node.attrs.label;
  return (
    <dl
      className="footnoteReferenceContainer"
      id={`footnote-${label}-def`}
    >
      <dt className="footnoteReferenceNumber"><p>{label}:</p></dt>
      <dd className="footnoteReferenceContent" ref={contentRef} />
      <div
        contentEditable="false"
        suppressContentEditableWarning
        className="footnoteReferenceReturnToDefContainer"
      >
        <a className="footnoteReferenceReturnToDefLink" href={`#footnote-${label}-ref`}>
          ↩
        </a>
      </div>
    </dl>
  );
};