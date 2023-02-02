import React, {Component} from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { EditorView } from '@codemirror/view';
import { indentUnit } from '@codemirror/language';

// Languages
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data';

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

    render () {
        return (<CodeMirror 
            extensions={
                [markdown({ base: markdownLanguage, codeLanguages: languages }),
                    EditorView.lineWrapping, indentUnit.of("    ")
                ]} 
            value={this.props.value} 
            onChange={this.updateCode}
            height="100%"/>);
    }
}

export default Editor;