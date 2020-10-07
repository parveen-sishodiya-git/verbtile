console.log('Hi i am VerbTiles, I will help you in you todos and fast notes.');
const notesStorageName = "notes";

displayNotes();


document.getElementById("addNote").addEventListener("click", addNote);
document.getElementById("searchNote").addEventListener("input", searchNote);
// add note
function addNote(event) {
    if (document.getElementById("note").value !== "")
        addNoteToLocalStorage(notesStorageName, document.getElementById("note").value);
    else
        document.getElementById("note").focus();
    displayNotes();
}

// display note
function displayNotes() {
    let notes = JSON.parse(localStorage.getItem(notesStorageName));
    let noteGrid = "";
    if (notes != null ? (notes.length > 0) : false) {
        notes.forEach(function (item, index) {
            noteGrid += `<div class="card border-secondary mb-4 ml-4" style="max-width: 21rem;height:280px;overflow-y:auto">
        <div>
            <div class="card-header">
                <span>NOTE ${index + 1}</span>
                <span  href="#" class="cardHeaderIcon" onclick="deleteANote(${index})">
                    <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash" fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                        <path fill-rule="evenodd"
                            d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                    </svg>
                </span> </div>
        </div>
        <div class="card-body text-secondary">
            <h5 class="card-title">Node title</h5>
            <p class="card-text">${item}</p>
        </div>
        </div>`;
        });
    } else {
        noteGrid = ` <p class="lead ml-3 noNotes">Nothing to show, Type a note above</p>`;
    }
    document.getElementById("noteGrid").innerHTML = noteGrid;
}

//delete note
function deleteANote(index) {
    let notes = JSON.parse(localStorage.getItem("notes"));
    notes.splice(index, 1);
    localStorage.setItem(notesStorageName, JSON.stringify(notes));
    displayNotes();
}

function addNoteToLocalStorage(loaclVarName, valueToAdd) {
    let isInLocalStorage = localStorage.getItem(loaclVarName);
    let notes;
    if (isInLocalStorage == null) {
        notes = [];
    } else {
        notes = JSON.parse(localStorage.getItem(loaclVarName));
    }

    notes.push(valueToAdd);
    localStorage.setItem(loaclVarName, JSON.stringify(notes));
    document.getElementById("note").value = null;
}

function searchNote(event) {
    let notes = document.getElementsByClassName('card');
    Array.from(notes).forEach(element => {
         console.log("ELEmEnt is = "+(element.getElementsByTagName('div')[2].innerHTML));
         let noteText = (element.getElementsByTagName('div')[2]).getElementsByTagName('p')[0].innerText;
         console.log(noteText);
         if (!noteText.includes(event.target.value)) {
             element.style.display = "none";
         }else{
            element.style.display = "block";
         }
    });
}


