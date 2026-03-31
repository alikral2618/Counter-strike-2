const PASSWORD = "cs2"; // şifreyi buradan değiştir

function login(){
  const pass = document.getElementById("password").value;
  if(pass === PASSWORD){
    document.getElementById("loginPage").classList.add("hidden");
    document.getElementById("app").classList.remove("hidden");
    loadEntries();
  }else{
    alert("Yanlış şifre!");
  }
}

function saveEntry(){
  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;
  const note = document.getElementById("note").value;
  const video = document.getElementById("video").value;

  const entry = {date,time,note,video};
  let entries = JSON.parse(localStorage.getItem("entries")) || [];
  entries.push(entry);
  localStorage.setItem("entries", JSON.stringify(entries));

  loadEntries();
}

function loadEntries(){
  const container = document.getElementById("entries");
  container.innerHTML = "";
  let entries = JSON.parse(localStorage.getItem("entries")) || [];

  entries.reverse().forEach(e=>{
    const div = document.createElement("div");
    div.className="entry";
    div.innerHTML = `
      <h3>${e.date} ${e.time}</h3>
      <p>${e.note}</p>
      ${e.video ? `<iframe width="300" height="200" src="${e.video.replace("watch?v=","embed/")}" frameborder="0"></iframe>`:""}
    `;
    container.appendChild(div);
  });
}
