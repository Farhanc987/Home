const firebaseConfig = {
    apiKey: "AIzaSyAGr5TtXTukeQU7QcrDuvLjcN_ZfTyzSo0",
    authDomain: "thought-journal-23ff8.firebaseapp.com",
    databaseURL: "https://thought-journal-23ff8-default-rtdb.firebaseio.com",
    projectId: "thought-journal-23ff8",
    storageBucket: "thought-journal-23ff8.appspot.com",
    messagingSenderId: "119645921234",
    appId: "1:119645921234:web:7e110e23f790f57c55f20b",
    measurementId: "G-MD548H48G4"
};

firebase.initializeApp(firebaseConfig);
var thoughtjDB = firebase.database().ref('thoughtj');
document.getElementById('thoughtj').addEventListener('Create', createThought);

function createThought(e) {
    e.preventDefault();

    //GetValues
    var txt = getElementVal('txt')

    console.log(txt);
}

function getInputVal() {

    return document.getElementById('txt').value;
}

//functionality
const getElementVal = (id) => {
    return document.getElementbyId(id).value
}

function _(id) {
    return document.getElementById(id)
}

function getRs() {
    let txt = _('txt').value
    const d = new Date()
    thoughtjDB.push();
    thoughtjDB.set({ msg: getInputVal() });
    _('rs').innerHTML += `<div class = "card" <p> ${txt} </p> <small> ${d.toLocaleTimeString()}</small> , <small> ${d.toLocaleDateString()}</small></div>`
    return false;
}

