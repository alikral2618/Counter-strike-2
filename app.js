// SAYFA GEÇİŞ
function showPage(page){
  document.querySelectorAll(".page").forEach(p=>p.classList.add("hidden"));
  document.getElementById(page).classList.remove("hidden");
}

/* ELEMENTLER */
const j_date = document.getElementById("j_date");
const j_time = document.getElementById("j_time");
const j_note = document.getElementById("j_note");
const journalList = document.getElementById("journalList");

const noteText = document.getElementById("noteText");
const notesList = document.getElementById("notesList");

const clipLink = document.getElementById("clipLink");
const clipList = document.getElementById("clipList");


/* ---------------- GÜNLÜK ---------------- */

function saveJournal(){
  const date = j_date.value;
  const time = j_time.value;
  const note = j_note.value;

  if(!date || !time || !note){
    alert("Tüm alanları doldur!");
    return;
  }

  let data = JSON.parse(localStorage.getItem("journal")) || [];
  data.push({date,time,note});
  localStorage.setItem("journal", JSON.stringify(data));

  j_note.value = "";
  loadJournal();
}

function loadJournal(){
  journalList.innerHTML="";
  let data = JSON.parse(localStorage.getItem("journal")) || [];

  data.slice().reverse().forEach(e=>{
    journalList.innerHTML += `
      <div class="card">
        <h3>${e.date} ${e.time}</h3>
        <p>${e.note}</p>
      </div>`;
  });
}


/* ---------------- NOTLAR ---------------- */

function saveNote(){
  if(!noteText.value) return;

  let notes = JSON.parse(localStorage.getItem("notes")) || [];
  notes.push(noteText.value);
  localStorage.setItem("notes", JSON.stringify(notes));

  noteText.value="";
  loadNotes();
}

function loadNotes(){
  notesList.innerHTML="";
  let notes = JSON.parse(localStorage.getItem("notes")) || [];

  notes.slice().reverse().forEach(n=>{
    notesList.innerHTML += `<div class="card">${n}</div>`;
  });
}


/* ---------------- KLİPLER ---------------- */

function saveClip(){
  if(!clipLink.value) return;

  let clips = JSON.parse(localStorage.getItem("clips")) || [];
  clips.push(clipLink.value);
  localStorage.setItem("clips", JSON.stringify(clips));

  clipLink.value="";
  loadClips();
}

function loadClips(){
  clipList.innerHTML="";
  let clips = JSON.parse(localStorage.getItem("clips")) || [];

  clips.slice().reverse().forEach(link=>{
    clipList.innerHTML += `
      <div class="card">
        <iframe width="300" height="200"
        src="${link.replace("watch?v=","embed/")}"
        allowfullscreen></iframe>
      </div>`;
  });
}

/* SAYFA AÇILINCA YÜKLE */
loadJournal();
loadNotes();
loadClips();
