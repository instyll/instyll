import React, {Component} from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { EditorView } from '@codemirror/view';

// Languages
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data';

require('codemirror/lib/codemirror.css');
require('codemirror/mode/javascript/javascript');
require('codemirror/mode/python/python');
require('codemirror/mode/xml/xml');
require('codemirror/mode/markdown/markdown');
require('codemirror/theme/monokai.css');
require('codemirror/theme/solarized.css');




class Editor extends Component {
    constructor(props) {
        super(props);
        this.updateCode = this.updateCode.bind(this);
    }

    updateCode(e) {
        this.props.onChange(e);
    }

    render () {
        var options = {
            mode: 'markdown',
            lineWrapping: true,
            // theme: 'solarized light',
        }
        return (<CodeMirror 
            // ref={this.editorRef}
            extensions={
                [markdown({ base: markdownLanguage, codeLanguages: languages }),
                    EditorView.lineWrapping
                ]} 
            value={this.props.value} 
            onChange={this.updateCode}
            options={options} 
            height="100%"/>);
    }
}

export default Editor;