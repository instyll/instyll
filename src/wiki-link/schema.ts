import { InputRule } from "@milkdown/prose/inputrules";
import { Node } from "@milkdown/prose/model";
import type { Node as ProseNode } from '@milkdown/prose/model'
import { $inputRule, $node, $remark } from '@milkdown/utils'
import wikiLinkPlugin from 'remark-wiki-link'
import { expectDomTypeError } from '@milkdown/exception'

const remarkWiki = $remark(() => wikiLinkPlugin);

const wikiLinkNode = $node('wikilink', () => ({
    attrs: {
        href: {},
        title: { default: null },
    },
    parseDOM: [{
        {
            tag: 'a[href]',
            getAttrs: (dom) => {
              if (!(dom instanceof HTMLElement))
                throw expectDomTypeError(dom)
      
              return { href: dom.getAttribute('href'), title: dom.getAttribute('title') }
            },
          },
    }],
    toDOM: (node: Node) => ['a', {...node.attrs, 'contenteditable': true}, 0],
    parseMarkdown: {

    },
    toMarkdown: {
      
    }
}))
