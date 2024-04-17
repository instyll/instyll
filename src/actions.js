import fs from 'fs'; 
import path from 'path'; 
import { useSelector } from 'react-redux';
import {store} from './store'
import OpenAI from "openai";

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
    console.log(documents)
    const documentsList = documents;
    const possibleZaps = [];
    const promptPrefix = 'From the following tokenized text, extract a list of the words that recurr the most frequently and/or take longer to type out, and would be suitable for an autocomplete menu. Return these in a json object using the following schema: {"words": {"word": string}[]}. The tokenized text: ';
    // for (const document of documentsList) {
        const document = documentsList[1]
        const documentPath = document[3];
        const documentTokens = readNoteContent(documentPath);
        // console.log(documentTokens)
        try {
            const response = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [{role: "user", content: (promptPrefix + documentTokens)}]
            })
            const responseData = await response.choices[0].message.content;
            console.log(responseData)
            const words = responseData.words;
            for (const word of words) {
                possibleZaps.push(word.word);
            }
        } catch (error) {
            console.log("Error calling OpenAI API:", error);
        }
    // }
    console.log("possible zaps: " + possibleZaps)
}

const readNoteContent = (documentPath) => {
    const tokens = fs.readFileSync(documentPath, 'utf-8').split(/\s+/);
    return tokens;
}