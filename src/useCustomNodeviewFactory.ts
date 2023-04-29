import {
    useNodeViewFactory,
    usePluginViewFactory,
    useWidgetViewFactory,
  } from "@prosemirror-adapter/react";

  export function useCustomNodeViewFactory() {
    const nodeViewFactory = useNodeViewFactory();
  
    // your custom code here...
  
    return nodeViewFactory;
  }