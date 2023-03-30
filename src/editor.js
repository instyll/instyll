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
import { CompletionContext, completeFromList, autocompletion } from "@codemirror/autocomplete";

require('codemirror/lib/codemirror.css');
require('codemirror/mode/javascript/javascript');
require('codemirror/mode/python/python');
require('codemirror/mode/xml/xml');
require('codemirror/mode/markdown/markdown');

const options = require("./emojiOptions");

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
        content = content.replace(/\\quad/g, "$Q(x) = ax^2 - bx + c$");
        content = content.replace(/\\lin/g, "$f(x) = mx + b$");
        content = content.replace(/\\fn/g, "$f(x)$");
        content = content.replace(/\\fin/g, "$f^{-1}(x)$");
        content = content.replace(/\\lm/g, "$\\lim\\limits_{h\\to 0}$");
        content = content.replace(/\\qf/g, "$$x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$$");
        content = content.replace(/\\slp/g, "$$m = \\frac{y_2 - y_2}{x_2 - x_1}$$");
        content = content.replace(/\\bl/g, "$$$$\n\\begin{aligned}\n\\end{aligned}\n$$$$");
        content = content.replace(/\\sd/g, "$\\sigma = \\sqrt{\\frac{1}{N}\\sum_{i=1}^N (x_i - \\mu)^2}$");
        content = content.replace(/\\img/g, "![]()");
        this.props.onChange(content);
        // console.log(this.myCompletions().options)
    }

    // Autocomplete provider function
    myCompletions(context: CompletionContext) {
        let word = context.matchBefore(/\S*/);
        if (!word || word.text[0] !== ":") {
          return null;
        }
        return {
          from: word.from,
          options: options,
        }
    }

    // TeX 


    // Defining tags for markdown highlighting

    headingMark = Tag.define();
    emphasisMark = Tag.define();
    refMark = Tag.define();
    imgMark = Tag.define();
    urlMark = Tag.define();
    hRuleMark = Tag.define();
    codeBlockMark = Tag.define();
    inlineCodeMark = Tag.define();
    blockCodeMark = Tag.define();
    listMark = Tag.define();
    emojiMark = Tag.define();

    MarkStylingExtension: MarkdownConfig = {
        props: [styleTags({
            HeaderMark: this.headingMark,
            EmphasisMark: this.emphasisMark,
            Link: this.refMark,
            Image: this.imgMark,
            URL: this.urlMark,
            HorizontalRule: this.hRuleMark,
            CodeMark: this.codeBlockMark,
            InlineCode: this.inlineCodeMark,
            CodeBlock: this.blockCodeMark,
            ListMark: this.listMark,
            Emoji: this.emojiMark,
        })],
    };

    mdCompletions = markdownLanguage.data.of({
        autocomplete: this.myCompletions,
    })

    markdownHighlighting = HighlightStyle.define([
        {
            tag:
                this.headingMark,
            color: "var(--secondary-text)"
        },
        {
            tag:
                this.emphasisMark,
            color: "var(--secondary-text)"
        },
        {
            tag:
                this.refMark,
            color: "var(--secondary-text)",
        },
        {
            tag:
                this.imgMark,
            color: "var(--secondary-text)",
        },
        {
            tag:
                this.urlMark,
            color: "var(--secondary-text)"
        },
        {
            tag:
                this.hRuleMark,
            color: "var(--secondary-text)",
        },
        {
            tag: this.codeBlockMark,
            color: "var(--secondary-text)"
        },
        {
            tag: this.listMark,
            color: "var(--secondary-text)",
        },
        {
            tag: this.emojiMark,
            color: "var(--muted-text)"
        },
        {
            tag: this.inlineCodeMark,
            fontFamily: "monospace",
        },
        {
            tag: this.blockCodeMark,
            fontFamily: "monospace",
        },
        {
            tag:
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
            color: "var(--secondary-text)",
        },
        {
            tag: tags.bracket,
            color: "var(--secondary-text)",
        },
        {
            tag: tags.squareBracket,
            color: "var(--secondary-text)",
        },
        {
            tag: tags.brace,
            color: "var(--secondary-text)",
        },
        {
            tag: inlineMathTag,
            fontFamily: "monospace",
            color: "#5271ff",
        },
        {
            tag: mathTag,
            fontFamily: "monospace",
            color: "#5271ff",
        },
    ]);


    render() {
        // const emojiList = Emoji.names.map(name => `:${name}:`);
        return (<CodeMirror
            extensions={
                [
                    markdown({ base: markdownLanguage, codeLanguages: languages, extensions: [this.MarkStylingExtension, Emoji, MarkdownMathExtension,] }),
                    EditorView.lineWrapping, indentUnit.of("    "),
                    syntaxHighlighting(this.markdownHighlighting),
                    this.mdCompletions,
                ]}
            value={this.props.value}
            onChange={this.updateCode}
            height="100%" />);
    }
}

export default Editor;