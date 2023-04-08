
/* song informations */
const singerImage = document.getElementById("singer-image")
const songName = document.getElementById("song-name")
const singerName = document.getElementById("singer-name")
const audio = document.getElementById("audio")

/* playlist buttons informations */
const shuffle = document.querySelector(".shuffle")
const backward = document.querySelector(".backward")
const play = document.querySelector(".play")
const pause = document.querySelector(".pause")
const forward = document.querySelector(".forward")
const repeat = document.querySelector(".repeat")

/* time and progressbar */
const playTime = document.getElementById("current-time")
const maxDuration = document.getElementById("max-duration")
const currentStatus = document.getElementById("current-status")
const progressBar = document.querySelector(".progress-bar")


/* playlist */
const playList = document.getElementById("playlist")
const closePlayList = document.getElementById("close-btn")
const playLİstContainer = document.getElementById("playlist-container")
const playListSongs = document.getElementById("playlist-songs")


/* datas */

let index = 0
let shuffleSituation = true
let loop = true
let prevSongIndex = 0

const songList = [
    {
        song: "Hodri Meydan",
        artist: "Bengü",
        image: "./assets/bengu.jpg",
        link: "./assets/bengu.mp3"
    },
    {
        song: "Where Do We Go from Here ",
        artist: "Charles Bradley",
        image: "./assets/charles_bradley.jpg",
        link: "./assets/charles_bradley.mp3"
    },
    {
        song: "Turn The Beat Around(Remix)",
        artist: "Gloria Estefan",
        image: "./assets/gloria_estefan.jpg",
        link: "./assets/gloria_estefan.mp3"
    },
    {
        song: "İçimdeki Duman",
        artist: "İlyas Yalçıntaş",
        image: "./assets/ilyas_yalcıntas.jpg",
        link: "./assets/ilyas_yalcıntas.mp3"
    },
    {
        song: "15 step",
        artist: "Radiohead",
        image: "./assets/radiohead.jpg",
        link: "./assets/radiohead.mp3"
    },
    {
        song: "Yankı",
        artist: "Simge",
        image: "./assets/simge.jpg",
        link: "./assets/simge.mp3"
    }
]

/* play list container */

playList.addEventListener("click", () => {
    playLİstContainer.classList.remove("hide")
})

closePlayList.addEventListener("click", () => {
    playLİstContainer.classList.add("hide")
})

for (let i in songList) {
    playListSongs.innerHTML +=
        `<li onclick="setSong(${i})" onmouseover="color(${i})">
        <div class="playlist-info">
            <img class="playlist-image" src="${songList[i].image}" alt="">
            <div class="song-information">
                <p class="song-name">${songList[i].song}</p>
                <p class="singer-name">${songList[i].artist}</p>
            </div>
        </div>
        <span class="duration">12.12</span>
    </li>`
}

/* set play and pause audio */

const setSong = (arrayIndex) => {
    let { song, artist, image, link } = songList[arrayIndex]
    audio.src = link
    singerName.innerHTML = artist
    songName.innerHTML = song
    singerImage.src = image
    playListSongs.childNodes[`${arrayIndex}`].classList.add("play-colored")
    playListSongs.childNodes[`${prevSongIndex}`].classList.remove("play-colored")
    prevSongIndex=arrayIndex
    playAudio()
}



const playAudio = () => {
    audio.play()
    pause.classList.remove("hide")
    play.classList.add("hide")
}

const pauseAudio = () => {
    audio.pause()
    play.classList.remove("hide")
    pause.classList.add("hide")
}

setSong(0)

play.addEventListener("click", playAudio)
pause.addEventListener("click", pauseAudio)

audio.onended = () => {
    nextSong()
}

/* shuufle and repeat buttons */

shuffle.addEventListener("click", () => {
    if (shuffle.classList.contains("active")) {
        shuffle.classList.remove("active")
        shuffleSituation = true
    }
    else {
        shuffle.classList.add("active")
        shuffleSituation = false
    }
})

repeat.addEventListener("click", () => {
    if (repeat.classList.contains("active")) {
        repeat.classList.remove("active")
        audio.loop = false
    }
    else {
        repeat.classList.add("active")
        audio.loop = true
    }
})

repeat.addEventListener("click", repeat)




/* time format */

const timeFormatter = (timeInput) => {
    let minute = Math.floor(timeInput / 60)
    minute = minute < 10 ? "0" + minute : minute
    let second = Math.floor(timeInput % 60)
    second = second < 10 ? "0" + second : second
    return `${minute}:${second}`
}


/* set prev song-next song */

const nextSong = () => {
    if (shuffleSituation) {
        if (index == (songList.length - 1)) {
            index = 0
        }
        else {
            index += 1
        }
    }

    else {
        let a = Math.floor(Math.random() * songList.length)
        index = index == a ? Math.floor(Math.random() * songList.length) : a
    }
    setSong(index)
    playAudio()
}

const prevSong = () => {
    if (loop) {
        if (index == 0) {
            index = (songList.length - 1)
        }
        else {
            index -= 1
        }
    }

    else {
        index = Math.floor(Math.random() * songList.length)
    }
    setSong(index)
    playAudio()
}

forward.addEventListener("click", nextSong)
backward.addEventListener("click", prevSong)



/* progress bar */

let timeDuration
let progress
progressBar.addEventListener("click", (event) => {
    timeDuration = (event.clientX - progressBar.getBoundingClientRect().left) / progressBar.offsetWidth
    audio.currentTime = timeDuration * audio.duration
})

setInterval(() => {
    progress = (audio.currentTime / audio.duration) * 100
    currentStatus.style.width = progress + "%"
    playTime.innerHTML = timeFormatter(audio.currentTime)
    maxDuration.innerHTML = timeFormatter(audio.duration)
}, 1000)





