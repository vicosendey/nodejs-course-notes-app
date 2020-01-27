const fs = require('fs');
const chalk = require('chalk');


const addNote = (title, body) => {
    const notes = loadNotes();

    //const duplicateNotes = notes.filter((note) => note.title === title);
    const duplicateNote = notes.find((note) => note.title === title);

    if(!duplicateNote){
        notes.push({
            title: title,
            body: body
        });
    
        saveNotes(notes);
        console.log(chalk.green('New note added!'));
    } else{
        console.log(chalk.red('A Note with this title already exists'));
    }

}


const removeNote = (title) => {
    const notes = loadNotes();

    const hasTitle = notes.filter((note) => note.title === title);

    if(hasTitle.length !== 0){
        const newArr = notes.filter((note) =>  note.title !== title);
        saveNotes(newArr);
        console.log(chalk.green("Note removed!"));
    } else{
        console.log(chalk.red("There is no notes to be removed with this title!"));
    }

}

const listNotes = () => {
    const notes = loadNotes();
    console.log(chalk.green("Your notes are: "));
    notes.forEach((note) => {
        console.log(chalk.green("Title: " + note.title + " Body: " + note.body));
    });
};

const readNote = (title) => {
    const notes = loadNotes();
    const matchNote = notes.find((note) => note.title === title);
    if(matchNote){
        console.log("Your note: ");
        console.log(chalk.green("Title: " + matchNote.title + " Body: " + matchNote.body));
    } else{
        console.log(chalk.red("No note has been found"));
    }
};

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
};

const loadNotes = () => {
    try{
        const dataBuffer = fs.readFileSync('notes.json');
        const dataString = dataBuffer.toString();
        return JSON.parse(dataString);
    } catch (e){
        return [];
    }
};

module.exports = {
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote
};