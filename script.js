
let songindex = 0;
let audioElement;
let progress = document.getElementById("progress");
let Previous = document.getElementById("previous");
let Next = document.getElementById("next");
let ctrlIcon = document.getElementById("ctrlIcon");
let gif = document.getElementById('gif');
let nextsong = document.getElementById("next");
let presong = document.getElementById("previous");
let sname = document.getElementById("songName");

// -----------------------------------------------------------------
let sidesongName = document.getElementsByClassName('songnameChange');
let songitemplay = document.getElementsByClassName("songItemPlay");

let songItems = Array.from(document.getElementsByClassName('songitem'));
let songs = [
    { songName: "Tip_Tip_Barsa_Pani..." },
    { songName: "Jubin_Natiyal..." },
    { songName: "Badi_door_se_chalakar..." },
    { songName: "Abhi_Jinda_hun_to_ji_lene_do..." },
    { songName: "Mere_Rashke_Kamar..." },
    { songName: "Deshi_Guru...", },
    { songName: "O_Sikander_-_Kailash_Kher_(Corporate)(48k)" },
    { songName: "Lat_Lag_Gayee-_Benny_Dayal___Race-2___[Slowed_Reverb](256k)" },
    { songName: "😇Sab_Apne_nazariye_Paas_Rakho_Hum_Apna_Nazriya_rakhtay_Hain_😇(256k)" },
    { songName: "Akha_di_kala_surma..." },

    // { songName: "${name}"},
]

// _____________________________Dynamic song page creater________________________________________

function creatsong(songName, songindex) {
    let html = `<div class="songitem">
                    <span class="songName"><p class="songnameChange">${songName}</p></span>
                    <span class="songlistplay"><i id="${songindex}" class="fas songItemPlay fa-play-circle"></i></span></span>
                </div>`
    document.querySelector(".sidebarpage").innerHTML = document.querySelector(".sidebarpage").innerHTML + html;
}

// let index=0;
for (const iterator of songs) {
    sname.innerText = songs[songindex].songName;
    // console.log(sname.innerText);
    creatsong(sname.innerHTML, songindex)
    songindex++;
    // console.log(iterator);  
}
songindex = 0;
// ______________________________________________________________________________________________________


audioElement = new Audio(`songs/${songindex + 1}.mp3`);
sname.innerText = songs[songindex].songName;

songItems.forEach((element, i) => {
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})

progress.value = 0;

audioElement.addEventListener('timeupdate', () => {
    progress.value = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    if (progress.value == 100) {
        setTimeout(() => {
            gif.style.opacity = 1;
            ctrlIcon.classList.add("fa-pause");
            ctrlIcon.classList.remove("fa-play");
        }, 200);
        if (songindex == songs.length - 1) {
            songindex = 0;
            audioElement.src = `songs/${songindex + 1}.mp3`;
            audioElement.play();
            sname.innerText = songs[songindex].songName;
        }
        else {
            songindex++;
            audioElement.src = `songs/${songindex + 1}.mp3`;
            audioElement.play();
            sname.innerText = songs[songindex].songName;
        }
        gif.style.opacity = 0;
        ctrlIcon.classList.remove("fa-pause");
        ctrlIcon.classList.add("fa-play");
        progress.value = 0;
    }
}, 5000);

progress.onchange = function () {
    audioElement.play();
    gif.style.opacity = 1;
    audioElement.currentTime = progress.value * audioElement.duration / 100;
    ctrlIcon.classList.add("fa-pause");
    ctrlIcon.classList.remove("fa-play");
}


function playPause() {
    if (ctrlIcon.classList.contains("fa-pause")) {
        audioElement.pause();
        ctrlIcon.classList.remove("fa-pause");
        ctrlIcon.classList.add("fa-play");
        gif.style.opacity = 0;
        sname.innerText = songs[songindex].songName;
    }
    else {
        audioElement.play();
        ctrlIcon.classList.add("fa-pause");
        ctrlIcon.classList.remove("fa-play");
        gif.style.opacity = 1;
        sname.innerText = songs[songindex].songName;
    }
}
function nextsongs() {
    if (songindex == songs.length - 1) {
        songindex = 0;
    }
    else {
        songindex++;
    }
    audioElement.src = `songs/${songindex + 1}.mp3`;
    audioElement.play();
    progress.value = 0;
    ctrlIcon.classList.add("fa-pause");
    ctrlIcon.classList.remove("fa-play");
    gif.src = "cover/music.gif.gif"
    gif.style.opacity = 1;
    sname.innerText = songs[songindex].songName;
}

Next.addEventListener('mousedown', () => {
    gif.style.opacity = 0;
    ctrlIcon.classList.remove("fa-pause");
    ctrlIcon.classList.add("fa-play");
    Next.style.color = "#fff";
    Next.style.background = "#f53192";
})
Next.addEventListener('mouseup', () => {
    Next.style.color = "#f53192";
    Next.style.background = "#fff";
})
function presongs() {
    if (songindex == 0) {
        songindex = songs.length - 1;
    }
    else {
        songindex--;
    }
    audioElement.src = `songs/${songindex + 1}.mp3`;
    audioElement.play();
    progress.value = 0;
    ctrlIcon.classList.add("fa-pause");
    ctrlIcon.classList.remove("fa-play");
    gif.src = "cover/music.gif.gif"
    gif.style.opacity = 1;
    sname.innerText = songs[songindex].songName;
}

Previous.addEventListener('mousedown', () => {
    gif.style.opacity = 0;
    ctrlIcon.classList.remove("fa-pause");
    ctrlIcon.classList.add("fa-play");
    Previous.style.color = "#fff";
    Previous.style.background = "#f53192";
})
Previous.addEventListener('mouseup', () => {
    Previous.style.color = "#f53192";
    Previous.style.background = "#fff";
})

// ---------------------sidebar open close -------------------------------
let sidelist = document.getElementById("list");

function openmenu() {
    sidelist.style.right = "1px";
}
function closemenu() {
    sidelist.style.right = "-240px";
}



// -----------------------------------------------------------------------

//------------------------sidebar playing ---------------------------
const makeAllplays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
        element.style.color = 'rgba(183, 27, 255, 0.832)';
    })
}
// const makeWhite = () => {
//     Array.from(document.getElementsByClassName('songName')).forEach((element) => { 
//         element.style.color = 'red';   
//     })
// }



Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        if (audioElement.paused || audioElement.currentTime <= 0) {
            e.target.classList.remove('fa-play-circle');
            e.target.classList.add('fa-pause-circle');
            audioElement.currentTime = 0;
            songindex = parseInt(e.target.id);
            audioElement.src = `songs/${songindex + 1}.mp3`;
            audioElement.play();
            sname.innerText = songs[songindex].songName;
            gif.style.opacity = 1;
            ctrlIcon.classList.add("fa-pause");
            ctrlIcon.classList.remove("fa-play");
            e.target.style.color = 'red';
        }
        else if (audioElement.play || audioElement.currentTime > 0) {
            audioElement.pause();
            makeAllplays();
            gif.style.opacity = 0;
            ctrlIcon.classList.remove("fa-pause");
            ctrlIcon.classList.add("fa-play");

        }
    })
})
