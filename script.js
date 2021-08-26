const musicContainer = document.querySelector('.music-container');
const playBtn = document.querySelector('#play');
const stopBtn = document.querySelector('#stop');
const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');
const audio = document.querySelector('#audio');
const progress = document.querySelector('.progress');
const progressContainer = document.querySelector('.progress-container');
const title = document.querySelector('#title');
const img = document.querySelector('#cover');
const timeProgress = document.querySelector('#time');
const artist = document.querySelector('#artist');

// song titles
const songs = [
    {name:'Peperina', album:'Peperina', artist:'Serú Girán'}, 
    {name:'Salir de la melancolía', album:'Peperina', artist:'Serú Girán'}
];

let songIndex = 1;

let songDurationSec;
//load song
loadSong(songs[songIndex]);

//update song details
function loadSong(song){
    title.innerText = song.name;
    artist.innerText = song.artist;
    audio.src = `Music/${song.name}.ogg`
    //change this to music cover, be carefull! if multiple songs share a cover with diferent name it wont work!
    cover.src = `img/${song.album}.jpg`

}

function playSong(){
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');

    audio.play();
}

function pauseSong(){
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.add('fa-play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');

    audio.pause();
}

function stopSong(){
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.add('fa-play');

    audio.pause();
    audio.currentTime = 0;
}

function prevSong(){
    songIndex--;

    if(songIndex < 0){
        songIndex = songs.length -1;
    }

    loadSong(songs[songIndex]);
    playSong();
}

function nextSong(){
    songIndex++;

    if(songIndex > songs.length -1){
        songIndex = 0;
    }

    loadSong(songs[songIndex]);
    playSong();
}

function updateProgress(e){
    const {duration, currentTime} = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    

    var sec= new Number();
    var min= new Number();

    //calculates time passed on song
    sec = Math.floor( currentTime );
    min = Math.floor( sec / 60 );
    min = min >= 10 ? min : '0' + min;
    sec = Math.floor( sec % 60 );
    sec = sec >= 10 ? sec : '0' + sec;

    timeProgress.innerHTML = `${min+" : "+sec} / ${songDurationSec}`;
    progress.style.width = `${progressPercent}%`

}

function setProgress(e){
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
}

function setSongTime(e){

    const duration = e.srcElement.duration;

    calculateTimeInSec(duration);
}

function calculateTimeInSec(duration){
    var sec= new Number();
    var min= new Number();

    const dur = duration;
    //calculates time passed on song
    sec = Math.floor( dur );
    min = Math.floor( sec / 60 );
    min = min >= 10 ? min : '0' + min;
    sec = Math.floor( sec % 60 );
    sec = sec >= 10 ? sec : '0' + sec;

    songDurationSec = min +" : "+ sec;
}


// event listeners

playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play')


    if(isPlaying){
        pauseSong();
    }else{
        playSong();
    }
});

stopBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play')

    if(isPlaying){
        stopSong();
    }else{
        //do nothing
    }
});

//change songs event
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('playing', setSongTime);

progressContainer.addEventListener('click', setProgress);

audio.addEventListener('ended', nextSong);