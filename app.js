// SAYFA GEÇİŞ
function showPage(page){
  document.querySelectorAll(".page").forEach(p=>p.classList.add("hidden"));
  document.getElementById(page).classList.remove("hidden");
}

/* ---------------- GÜNLÜK ---------------- */

function saveJournal(){
  const date = j_date.value;
  const time = j_time.value;
  const note = j_note.value;

  if(!date || !time || !note){
    alert("Tüm alanları doldur");
    return;
  }

  let data = JSON.parse(localStorage.getItem("journal")) || [];
  data.push({date,time,note});
  localStorage.setItem("journal", JSON.stringify(data));
  loadJournal();
}

function loadJournal(){
  journalList.innerHTML="";
  let data = JSON.parse(localStorage.getItem("journal")) || [];

  data.reverse().forEach(e=>{
    journalList.innerHTML += `
      <div class="card">
        <h3>${e.date} ${e.time}</h3>
        <p>${e.note}</p>
      </div>`;
  });
}

/* ---------------- NOTLAR ---------------- */

function saveNote(){
  let notes = JSON.parse(localStorage.getItem("notes")) || [];
  notes.push(noteText.value);
  localStorage.setItem("notes", JSON.stringify(notes));
  loadNotes();
}

function loadNotes(){
  notesList.innerHTML="";
  let notes = JSON.parse(localStorage.getItem("notes")) || [];

  notes.reverse().forEach(n=>{
    notesList.innerHTML += `<div class="card">${n}</div>`;
  });
}

/* ---------------- KLİPLER ---------------- */

function saveClip(){
  let clips = JSON.parse(localStorage.getItem("clips")) || [];
  clips.push(clipLink.value);
  localStorage.setItem("clips", JSON.stringify(clips));
  loadClips();
}

function loadClips(){
  clipList.innerHTML="";
  let clips = JSON.parse(localStorage.getItem("clips")) || [];

  clips.reverse().forEach(link=>{
    clipList.innerHTML += `
      <div class="card">
        <iframe width="300" height="200"
        src="${link.replace("watch?v=","embed/")}"
        allowfullscreen></iframe>
      </div>`;
  });
}

loadJournal();
loadNotes();
loadClips();
