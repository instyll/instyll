import React, {Component} from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { EditorView } from '@codemirror/view';
import { indentUnit } from '@codemirror/language';

// Languages
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data';
import { syntaxHighlighting, HighlightStyle } from '@codemirror/language'
import { tags } from '@lezer/highlight';
import { Tag, styleTags } from '@lezer/highlight';
import { Emoji, MarkdownConfig } from '@lezer/markdown';
import { inlineMathTag, mathTag, MarkdownMathExtension } from './MarkdownTexParser.ts';

require('codemirror/lib/codemirror.css');
require('codemirror/mode/javascript/javascript');
require('codemirror/mode/python/python');
require('codemirror/mode/xml/xml');
require('codemirror/mode/markdown/markdown');

class Editor extends Component {
    constructor(props) {
        super(props);
        this.updateCode = this.updateCode.bind(this);
    }

    updateCode(e) {
        this.props.onChange(e);
    }

    headingMark = Tag.define();
    emphasisMark = Tag.define();
    refMark = Tag.define();
    imgMark = Tag.define();
    urlMark = Tag.define();
    hRuleMark = Tag.define();
    codeBlockMark = Tag.define();
    listMark = Tag.define();
    emojiMark = Tag.define();
    
    MarkStylingExtension: MarkdownConfig = {
        props: [ styleTags({
            HeaderMark: this.headingMark,
            EmphasisMark: this.emphasisMark,
            Link: this.refMark,
            Image: this.imgMark,
            URL: this.urlMark,
            HorizontalRule: this.hRuleMark,
            CodeMark: this.codeBlockMark,
            ListMark: this.listMark,
            Emoji: this.emojiMark,
        }) ],
    };
    
    markdownHighlighting = HighlightStyle.define([
        {
        tag: 
        this.headingMark,
        color: "rgba(180,180,182, 0.4)"
        },
        {
        tag: 
        this.emphasisMark,
        color: "rgba(180,180,182, 0.4)"
        },
        {
        tag: 
        this.refMark,
        color: "#5271ff",
        },
        {
        tag: 
        this.imgMark,
        color: "#5271ff",
        },
        {
        tag:
        this.urlMark,
        color: "#5271ff"
        },
        {
        tag: 
        this.hRuleMark,
        color: "rgba(180,180,182, 0.4)",
        },
        {
        tag: this.codeBlockMark,
        color: "rgba(180,180,182, 0.4)"
        },
        {
        tag: this.listMark,
        color: "rgba(180,180,182, 0.4)"
        },
        {
        tag: this.emojiMark,
        color: "rgba(180,180,182, 0.2)"
        },
        { tag: 
        tags.heading1, 
        fontSize: "2em", 
        fontWeight: "bold", 
        lineHeight: "1.4em"
        },
        {
        tag: tags.heading2,
        fontSize: "1.6em",
        fontWeight: "bold",
        lineHeight: "1.4em"
        },
        {
        tag: tags.heading3,
        fontSize: "1.4em",
        fontWeight: "bold",
        lineHeight: "1.4em"
        },
        {
        tag: tags.heading4,
        fontSize: "1.2em",
        fontWeight: "bold",
        lineHeight: "1.4em"
        },
        {
        tag: tags.heading5,
        fontSize: "1.1em",
        fontWeight: "bold",
        lineHeight: "1.4em"
        },
        {
        tag: tags.emphasis,
        fontStyle: "italic",
        },
        {
        tag: tags.strong,
        fontWeight: "bold",
        },
        {
        tag: tags.strikethrough,
        color: "rgba(180,180,182, 0.4)",
        },
        {
        tag: tags.bracket,
        color: "rgba(180,180,182, 0.4)",
        },
        {
        tag: tags.squareBracket,
        color: "rgba(180,180,182, 0.4)",
        },
        {
        tag: tags.brace,
        color: "rgba(180,180,182, 0.4)",
        },
        {
        tag: inlineMathTag,
        fontFamily: "monospace",
        color: "rgba(180,180,182, 0.4)",
        },
        {
        tag: mathTag,
        fontFamily: "monospace",
        color: "rgba(180,180,182, 0.4)",
        },
    ]);

    render () {
        return (<CodeMirror 
            extensions={
                [markdown({ base: markdownLanguage, codeLanguages: languages, extensions: [this.MarkStylingExtension, Emoji, MarkdownMathExtension] }),
                    EditorView.lineWrapping, indentUnit.of("    "),
                    syntaxHighlighting(this.markdownHighlighting),
                ]} 
            value={this.props.value} 
            onChange={this.updateCode}
            height="100%"/>);
    }
}

export default Editor;