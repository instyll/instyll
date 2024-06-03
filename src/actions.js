import fs from 'fs'; 
import path from 'path'; 
import { useSelector } from 'react-redux';
import {store} from './store'
import OpenAI from "openai";
import { words } from 'lodash';

export const executeFileCreation = ({documentTitle}) => {
    const state = store.getState();
    // console.log(documentTitle)
    const filePath = path.join(state.path.path, `${documentTitle}.md`);
    // console.log(filePath)
    const fileContent = `# ${documentTitle}`;
    fs.writeFileSync(filePath, fileContent);
}

// generates a list of the longest and most recurring words based on a user's notes
export const generateZaps = async (documents) => {
    const openai = new OpenAI({ apiKey: process.env.REACT_APP_OPENAI_API_SECRET_KEY, dangerouslyAllowBrowser: true });
    const documentsList = documents;
    const possibleZaps = [];
    const promptPrefix = 'From the following tokenized text, extract a list of five words that recurr the most frequently and/or take longer to type out, and would be suitable for an autocomplete menu. Return these in a json object using the following schema: {"words": []}. The tokenized text: ';
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    for (let i = 0; i < 3; ++i) { // limits to 3 rpm
        const document = documentsList[i];
        const documentPath = document[3];
        const documentTokens = readNoteContent(documentPath);
        // console.log(documentTokens)
        try {
            const response = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [{role: "user", content: (promptPrefix + documentTokens)}]
            })
            const responseData = await response.choices[0].message.content;
            // console.log(responseData)
            const words = JSON.parse(responseData);
            for (const word of words.words) {
                possibleZaps.push(word);
            }
            await delay(3000);
        } catch (error) {
            console.log("Error calling OpenAI API:", error);
        }
    }
    console.log(possibleZaps)
    return possibleZaps;
}

const readNoteContent = (documentPath) => {
    const tokens = fs.readFileSync(documentPath, 'utf-8').split(/\s+/);
    return tokens;
}

export const getWordCount = (documentPath) => {
    let count = 0;
    const tokens = fs.readFileSync(documentPath, 'utf-8').split(/\s+/);
    // what should be exclude from the word count: # symbols, * symbols, math, code, table
    for (const token of tokens) {
        if (token !== '#' && token !== '##' && token !== '###' && token !== '####' && token !== '#####' && token !== '*' && token !== '```' && token !== '$$' && token !== '|' && token !== ':-') {
            ++count;
        }
    }
    return count;
}

export const getCharCount = (documentPath) => {
    let count = 0;
    const tokens = fs.readFileSync(documentPath, 'utf-8').split('');
    for (const token of tokens) {
        if (token !== '#' && token !== '*' && token !== '`' && token !== '~' && token !== '$' && token !== '|') {
            ++count;
        }
    }
    return count;
}

export const formatDate = (dateString) => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const date = new Date(dateString);
    const month = months[date.getMonth()];
    const day = String(date.getDate()).padStart(2, '0');
    const yr = date.getFullYear()
    return `${month} ${day} ${yr}`;
}