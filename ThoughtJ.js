import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js'

// If you enabled Analytics in your project, add the Firebase SDK for Google Analytics
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-analytics.js'

// Add Firebase products that you want to use
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js'
import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js'

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

const dbRef = firebase.database().ref('journalData');
const auth = firebase.auth();
var userId = auth.userId;
console.log(`userId == ${userId}`);


console.log(dbRef.once('value'));
dbRef.once('value', (snapshot) => {
    console.log('snapshot called')
    const data = snapshot.val();
    var keyNode = Object.keys(data);
    var newKeys = Object.values(data);
    for (var i = 0; i < newKeys.length; i++) {
        console.log(newKeys[i]);

        const newValue = Object.values(newKeys[i]);
        const actualKey = keyNode[i];
        const idValue = newKeys[i].timeStamp;
        const msgValue = newKeys[i].msg;

        const timeStampValue = newKeys[i].timeStamp;
        const d = new Date()
        var timeStamp = timeStampValue;
        let timeStampToString = timeStamp.toString();
        var finalTimeStamp = timeStampToString.slice(0, -3);

        const newCard = document.createElement("div");
        newCard.className = `card ${ actualKey }`;
        const newNode = document.createElement("p");
        const textNode = document.createTextNode(msgValue);

        const dateTxt = document.createElement("small")
        dateTxt.style.marginRight = '2px';
        const dataValue = document.createTextNode(new Date(finalTimeStamp * 1000).toLocaleTimeString());
        const divider = document.createTextNode(" , ");


        const dateTxt1 = document.createElement("small")
        dateTxt1.style.marginLeft = '2px';
        const dataValue1 = document.createTextNode(new Date(finalTimeStamp * 1000).toLocaleDateString());

        //Delete button

        const deleteBtn = document.createElement('button');
        deleteBtn.style.marginLeft = '375px';
        deleteBtn.style.width = '90px';
        deleteBtn.className = 'btn btn-danger';
        const deleteBtnTxt = document.createTextNode('Delete');

        // This code is what allows the btn clicking to work
        deleteBtn.onclick = function () {
            console.log(`Actual Key == ${actualKey}`);
            deleteData(actualKey);
        };

        deleteBtn.appendChild(deleteBtnTxt);

        dateTxt.appendChild(dataValue);
        dateTxt1.appendChild(dataValue1);

        newCard.appendChild(textNode);
        newCard.appendChild(newNode);

        newCard.appendChild(dateTxt);
        newCard.appendChild(divider);
        newCard.appendChild(dateTxt1);

        newCard.appendChild(deleteBtn);


        const list = document.getElementById("rs");
        list.insertBefore(newCard, list.children[0]);
    }

});

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
    //let randid = Math.floor(Math.random() * 100); //randid = random number generator id
    const d = new Date()
    let timeStampDate = Date.now();
    var thoughtjDB = firebase.database().ref(`journalData/${timeStampDate}`);
    var userId = auth.userId;
    console.log(`userId == ${userId}`)
    let txt = _('txt').value
    thoughtjDB.push()
    thoughtjDB.set({ msg: getInputVal(), timeStamp: Date.now() });
    //_('rs').innerHTML += `<div class = "card" <p> ${txt} </p> <small> ${d.toLocaleTimeString()}</small> , <small> ${d.toLocaleDateString()}</small></div>`
    const newCard = document.createElement("div");
    newCard.className = `card ${ timeStampDate }`;
    const newNode = document.createElement("p");
    const textNode = document.createTextNode(getInputVal());

    const dateTxt = document.createElement("small")
    dateTxt.style.marginRight = '2px';
    const dataValue = document.createTextNode(d.toLocaleTimeString());
    const divider = document.createTextNode(" , ");


    const dateTxt1 = document.createElement("small")
    dateTxt1.style.marginLeft = '2px';
    const dataValue1 = document.createTextNode(d.toLocaleDateString());

    //delete button

    const deleteBtn = document.createElement('button');
    const deleteBtnTxt = document.createTextNode('Delete');
    deleteBtn.style.marginLeft = '375px';
    deleteBtn.style.width = '90px';
    deleteBtn.className = 'btn btn-danger';

    deleteBtn.onclick = function () {
        console.log(`deletedatatime == ${timeStampDate}`);
        deleteData(timeStampDate);
    };


    deleteBtn.appendChild(deleteBtnTxt);



    //newNode.appendChild(textNode);
    dateTxt.appendChild(dataValue);
    dateTxt1.appendChild(dataValue1);

    newCard.appendChild(textNode);
    newCard.appendChild(newNode);

    newCard.appendChild(dateTxt);
    newCard.appendChild(divider);
    newCard.appendChild(dateTxt1);

    newCard.appendChild(deleteBtn);


    const list = document.getElementById("rs");
    list.insertBefore(newCard, list.children[0]);

}

function deleteData(journalId) {
    console.log(`new function == ${journalId}`);
    const jIdRef = firebase.database().ref(`journalData/${journalId}`);
    console.log(`journalData/${journalId}`);
    jIdRef.remove();
    const journalColumn = document.getElementsByClassName(journalId);
    console.log(`journalColumn == ${journalColumn[0].className}`);
    journalColumn[0].remove();

}
