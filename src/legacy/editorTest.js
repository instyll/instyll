import React, { Component } from 'react';
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
        let content = e.toString();
        const today = new Date();
        const dateString = `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`;
        content = content.replace(/\\date/g, dateString);
        content = content.replace(/\\ty/g, "thank you");
        content = content.replace(/\\pyth/g, "$a^2 + b^2 = c^2$");
        this.props.onChange(content);
    }

    // Defining tags for markdown highlighting

    headingMark = Tag.define();

    MarkStylingExtension: MarkdownConfig = {
        props: [styleTags({
            HeaderMark: this.headingMark,
        })],
    };

    markdownHighlighting = HighlightStyle.define([
        {
            tag:
                this.headingMark,
            color: "var(--secondary-text)"
        },

    ]);


    render() {
        return (<CodeMirror
            extensions={
                [markdown({ base: markdownLanguage, codeLanguages: languages, extensions: [this.MarkStylingExtension, Emoji, MarkdownMathExtension] }),
                EditorView.lineWrapping, indentUnit.of("    "),
                syntaxHighlighting(this.markdownHighlighting),
                ]}
            value={this.props.value}
            onChange={this.updateCode}
            height="100%" />);
    }
}

export default Editor;