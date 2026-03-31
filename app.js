const j_date = document.getElementById("j_date");
const j_time = document.getElementById("j_time");
const j_note = document.getElementById("j_note");
const journalList = document.getElementById("journalList");

const noteText = document.getElementById("noteText");
const notesList = document.getElementById("notesList");

const clipLink = document.getElementById("clipLink");
const clipList = document.getElementById("clipList");

function toast(msg){
  const t=document.getElementById("toast");
  t.innerText=msg;
  t.style.display="block";
  setTimeout(()=>t.style.display="none",2000);
}

function showPage(page){
  document.querySelectorAll(".page").forEach(p=>p.classList.add("hidden"));
  document.getElementById(page).classList.remove("hidden");
}

/* OTOMATİK TARİH SAAT */
const now=new Date();
j_date.value=now.toISOString().split("T")[0];
j_time.value=now.toTimeString().slice(0,5);

/* JOURNAL */
function saveJournal(){
  if(!j_note.value) return;
  let data=JSON.parse(localStorage.getItem("journal"))||[];
  data.push({date:j_date.value,time:j_time.value,note:j_note.value});
  localStorage.setItem("journal",JSON.stringify(data));
  j_note.value="";
  loadJournal();
  toast("Kaydedildi");
}

function deleteJournal(i){
  let data=JSON.parse(localStorage.getItem("journal"));
  data.splice(i,1);
  localStorage.setItem("journal",JSON.stringify(data));
  loadJournal();
}

function loadJournal(){
  journalList.innerHTML="";
  let data=JSON.parse(localStorage.getItem("journal"))||[];
  if(data.length===0) journalList.innerHTML="<p>Kayıt yok</p>";
  data.slice().reverse().forEach((e,i)=>{
    journalList.innerHTML+=`
    <div class="card">
      <button class="delete" onclick="deleteJournal(${data.length-1-i})">X</button>
      <h3>${e.date} ${e.time}</h3>
      <p>${e.note}</p>
    </div>`;
  });
}

/* NOTES */
function saveNote(){
  if(!noteText.value) return;
  let data=JSON.parse(localStorage.getItem("notes"))||[];
  data.push(noteText.value);
  localStorage.setItem("notes",JSON.stringify(data));
  noteText.value="";
  loadNotes();
  toast("Not kaydedildi");
}

function deleteNote(i){
  let data=JSON.parse(localStorage.getItem("notes"));
  data.splice(i,1);
  localStorage.setItem("notes",JSON.stringify(data));
  loadNotes();
}

function loadNotes(){
  notesList.innerHTML="";
  let data=JSON.parse(localStorage.getItem("notes"))||[];
  if(data.length===0) notesList.innerHTML="<p>Not yok</p>";
  data.slice().reverse().forEach((n,i)=>{
    notesList.innerHTML+=`
    <div class="card">
      <button class="delete" onclick="deleteNote(${data.length-1-i})">X</button>
      ${n}
    </div>`;
  });
}

/* CLIPS */
function saveClip(){
  if(!clipLink.value) return;
  let data=JSON.parse(localStorage.getItem("clips"))||[];
  data.push(clipLink.value);
  localStorage.setItem("clips",JSON.stringify(data));
  clipLink.value="";
  loadClips();
  toast("Klip kaydedildi");
}

function deleteClip(i){
  let data=JSON.parse(localStorage.getItem("clips"));
  data.splice(i,1);
  localStorage.setItem("clips",JSON.stringify(data));
  loadClips();
}

function loadClips(){
  clipList.innerHTML="";
  let data=JSON.parse(localStorage.getItem("clips"))||[];
  if(data.length===0) clipList.innerHTML="<p>Klip yok</p>";
  data.slice().reverse().forEach((c,i)=>{
    clipList.innerHTML+=`
    <div class="card">
      <button class="delete" onclick="deleteClip(${data.length-1-i})">X</button>
      <iframe width="300" height="200" src="${c.replace("watch?v=","embed/")}" allowfullscreen></iframe>
    </div>`;
  });
}

loadJournal();
loadNotes();
loadClips();
