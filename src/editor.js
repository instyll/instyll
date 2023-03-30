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
        let word = context.matchBefore(/\w*/)
        if (word.from == word.to && !context.explicit)
            return null
        return {
            from: word.from,
            options: [
                { label: ":zap:", type: "text", apply: "zap:" },
                { label: ":smile:", type: "text", apply: "smile:" },
                { label: ":frog:", type: "text", apply: "frog:" },
                { label: ":fire:", type: "text", apply: "fire:" },
                { label: ":heart:", type: "text", apply: "heart:" },
                { label: ":rocket:", type: "text", apply: "rocket:" },
                { label: ":thumbsup:", type: "text", apply: "thumbsup:" },
                { label: ":raised_hands:", type: "text", apply: "raised_hands:" },
                { label: ":bulb:", type: "text", apply: "bulb:" },
                { label: ":tada:", type: "text", apply: "tada:" },
                { label: ":star:", type: "text", apply: "star:" },
                { label: ":eyes:", type: "text", apply: "eyes:" },
                { label: ":thinking:", type: "text", apply: "thinking:" },
                { label: ":sunglasses:", type: "text", apply: "sunglasses:" },
                { label: ":muscle:", type: "text", apply: "muscle:" },
                { label: ":v:", type: "text", apply: "v:" },
                { label: ":pray:", type: "text", apply: "pray:" },
                { label: ":rainbow:", type: "text", apply: "rainbow:" },
                { label: ":pizza:", type: "text", apply: "pizza:" },
                { label: ":coffee:", type: "text", apply: "coffee:" },
                { label: ":smiley:", type: "text", apply: "smiley:" },
                { label: ":laughing:", type: "text", apply: "laughing:" },
                { label: ":heart_eyes:", type: "text", apply: "heart_eyes:" },
                { label: ":sweat_smile:", type: "text", apply: "sweat_smile:" },
                { label: ":wink:", type: "text", apply: "wink:" },
                { label: ":blush:", type: "text", apply: "blush:" },
                { label: ":yum:", type: "text", apply: "yum:" },
                { label: ":sunglasses:", type: "text", apply: "sunglasses:" },
                { label: ":heart_eyes_cat:", type: "text", apply: "heart_eyes_cat:" },
                { label: ":dog:", type: "text", apply: "dog:" },
                { label: ":unicorn:", type: "text", apply: "unicorn:" },
                { label: ":ghost:", type: "text", apply: "ghost:" },
                { label: ":skull:", type: "text", apply: "skull:" },
                { label: ":bomb:", type: "text", apply: "bomb:" },
                { label: ":money_with_wings:", type: "text", apply: "money_with_wings:" },
                { label: ":crown:", type: "text", apply: "crown:" },
                { label: ":star2:", type: "text", apply: "star2:" },
                { label: ":sos:", type: "text", apply: "sos:" },
                { label: ":clap:", type: "text", apply: "clap:" },
                { label: ":fireworks:", type: "text", apply: "fireworks:" },
                { label: ":robot:", type: "text", apply: "robot:" },
                { label: ":alien:", type: "text", apply: "alien:" },
                { label: ":santa:", type: "text", apply: "santa:" },
                { label: ":clown_face:", type: "text", apply: "clown_face:" },
                { label: ":octopus:", type: "text", apply: "octopus:" },
                { label: ":penguin:", type: "text", apply: "penguin:" },
                { label: ":sunflower:", type: "text", apply: "sunflower:" },
                { label: ":volcano:", type: "text", apply: "volcano:" },
                { label: ":wind_chime:", type: "text", apply: "wind_chime:" },
                { label: ":butterfly:", type: "text", apply: "butterfly:" },
                { label: ":teddy_bear:", type: "text", apply: "teddy_bear:" },
                { label: ":nerd_face:", type: "text", apply: "nerd_face:" },
                { label: ":brain:", type: "text", apply: "brain:" },
                { label: ":dna:", type: "text", apply: "dna:" },
                { label: ":mortar_board:", type: "text", apply: "mortar_board:" },
                { label: ":artist:", type: "text", apply: "artist:" },
                { label: ":guard:", type: "text", apply: "guard:" },
                { label: ":detective:", type: "text", apply: "detective:" },
                { label: ":construction_worker:", type: "text", apply: "construction_worker:" },
                { label: ":farmer:", type: "text", apply: "farmer:" },
                { label: ":scientist:", type: "text", apply: "scientist:" },
                { label: ":teacher:", type: "text", apply: "teacher:" },
                { label: ":eagle:", type: "text", apply: "eagle:" },
                { label: ":gorilla:", type: "text", apply: "gorilla:" },
                { label: ":sloth:", type: "text", apply: "sloth:" },
                { label: ":tiger:", type: "text", apply: "tiger:" },
                { label: ":whale:", type: "text", apply: "whale:" },
                { label: ":duck:", type: "text", apply: "duck:" },
                { label: ":owl:", type: "text", apply: "owl:" },
                { label: ":shark:", type: "text", apply: "shark:" },
                { label: ":snail:", type: "text", apply: "snail:" },
                { label: ":paw_prints:", type: "text", apply: "paw_prints:" },
                { label: ":cactus:", type: "text", apply: "cactus:" },
                { label: ":coffee:", type: "text", apply: "coffee:" },
                { label: ":beer:", type: "text", apply: "beer:" },
                { label: ":cocktail:", type: "text", apply: "cocktail:" },
                { label: ":wine_glass:", type: "text", apply: "wine_glass:" },
                { label: ":pizza:", type: "text", apply: "pizza:" },
                { label: ":hamburger:", type: "text", apply: "hamburger:" },
                { label: ":taco:", type: "text", apply: "taco:" },
                { label: ":sushi:", type: "text", apply: "sushi:" },
                { label: ":cake:", type: "text", apply: "cake:" },
                { label: ":doughnut:", type: "text", apply: "doughnut:" },
                { label: ":ice_cream:", type: "text", apply: "ice_cream:" },
                { label: ":lollipop:", type: "text", apply: "lollipop:" },
            ]
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