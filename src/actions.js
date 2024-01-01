import fs from 'fs'; 
import path from 'path'; 
import { useSelector } from 'react-redux';
import {store} from './store'

export const executeFileCreation = ({documentTitle}) => {
    const state = store.getState();
    console.log(documentTitle)
    const filePath = path.join(state.path.path, `${documentTitle}.md`);
    console.log(filePath)
    const fileContent = `# ${documentTitle}`;
    fs.writeFileSync(filePath, fileContent);
}