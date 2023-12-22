console.log("Welcome to my musicZone");

let audioElement = new Audio('songs/audio-1.mp3');
let playmain = document.getElementById('play-main');
let myprogressbar = document.getElementById('myprogressbar');
let songitems = Array.from(document.getElementsByClassName('song-item'));
let prevbutton = document.getElementById('previous');
let nextbutton = document.getElementById('next');
let mainname = document.getElementById('f-songname');

let songs = [
    {songname: "Dil Galti Kar Baitha Hai", filePath: "songs/audio-1.mp3" , coverPath: "musiczone.jpg"},
    {songname: "Bhar Do Jholi - Bajrangi Bhaijaan", filePath: "songs/audio-2.mp3" , coverPath: "musiczone.jpg"},
    {songname: "Tu hai kahan", filePath: "songs/audio-3.mp3" , coverPath: "musiczone.jpg"},
    {songname: "Zinda - Lootera", filePath: "songs/audio-4.mp3" , coverPath: "musiczone.jpg"},
    {songname: "Khwaish - Munawar Faruqui", filePath: "songs/audio-5.mp3" , coverPath: "musiczone.jpg"},
];


playmain.addEventListener('click' , ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        playmain.classList.remove('fa-circle-play');
        playmain.classList.add('fa-circle-pause');
    }else{
        audioElement.pause();
        playmain.classList.remove('fa-circle-pause');
        playmain.classList.add('fa-circle-play')
    }
})

audioElement.addEventListener('timeupdate',()=>{
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myprogressbar.value = progress;
})

myprogressbar.addEventListener('change', ()=>{
    audioElement.currentTime = (myprogressbar.value* audioElement.duration/100) ;
})

songitems.forEach((element,i)=>{
    element.getElementsByClassName("songname")[0].innerText = songs[i].songname;
})

// Update the song duration in the HTML in mm:ss format
const updateSongDuration = (index, duration) => {
    const songDurationElements = document.getElementsByClassName('songdur');
    if (songDurationElements[index]) {
        songDurationElements[index].innerText = duration;
    }
};

// Function to format time to mm:ss
const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    const formattedTime = `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    return formattedTime;
};

// Iterate through each song and update the duration in the HTML
songs.forEach((song, index) => {
    let audio = new Audio(song.filePath);
    audio.addEventListener('loadedmetadata', function () {
        let duration = audio.duration.toFixed(0); // Get the duration of the song in seconds
        let formattedDuration = formatTime(duration); // Format duration to mm:ss
        updateSongDuration(index, formattedDuration); // Update the duration in the HTML
    });
});

const playSong = (index)=>{
    if(index>=0 && index<songs.length){
        audioElement.src = songs[index].filePath ;
        audioElement.play();
        mainname.innerText = songs[index].songname;
        playmain.classList.remove('fa-circle-play');
        playmain.classList.add('fa-circle-pause');
    }
}

songitems.forEach((element,index)=>{
    element.addEventListener('click',()=>{
        playSong(index);
    });
});

// Function to play the next song
const playNextSong = () => {
    let currentIndex = songs.findIndex(song => audioElement.src.endsWith(song.filePath));
    console.log(currentIndex);
    let nextIndex = (currentIndex + 1) % songs.length; // Get the index of the next song
    console.log(nextIndex);
    playSong(nextIndex); // Play the next song
};

// Function to play the previous song
const playPreviousSong = () => {
    let currentIndex = songs.findIndex(song => audioElement.src.endsWith(song.filePath));
    let previousIndex = (currentIndex - 1 + songs.length) % songs.length; // Get the index of the previous song

    playSong(previousIndex); // Play the previous song
};

prevbutton.addEventListener('click' , playPreviousSong);
nextbutton.addEventListener('click' , playNextSong);

let volumeIcon = document.querySelector('.fa-volume-high');
let volumeBar = document.getElementById('myvolumebar');

// Mute/Unmute Functionality
volumeIcon.addEventListener('click', () => {
    if (audioElement.volume !== 0) {
        audioElement.volume = 0; // Mute the audio
        volumeIcon.classList.remove('fa-volume-high');
        volumeIcon.classList.add('fa-volume-mute'); // Change to mute icon
    } else {
        audioElement.volume = 1; // Unmute the audio
        volumeIcon.classList.remove('fa-volume-mute');
        volumeIcon.classList.add('fa-volume-high'); // Change to unmute icon
    }
});

// Volume Bar Functionality
volumeBar.addEventListener('input', () => {
    let volumeLevel = volumeBar.value / 100;   
    audioElement.volume = volumeLevel;
    if(audioElement.volume === 0){
        volumeIcon.classList.remove('fa-volume-high');
        volumeIcon.classList.add('fa-volume-mute');
    }else{
        volumeIcon.classList.remove('fa-volume-mute');
        volumeIcon.classList.add('fa-volume-high'); 
    }
});









