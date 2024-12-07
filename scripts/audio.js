function manageAudio(){
    const audio = document.getElementById('player');

    // Function to handle first play
    function handleFirstPlay() {
        console.log('Handling first play');
        localStorage.clear();
        localStorage.setItem('hasVisited', 'true');
        audio.currentTime = 0;
        localStorage.setItem('audioCurrentTime', '0');
    }

    window.addEventListener('load', () => {
        const isFirstVisit = !localStorage.getItem('hasVisited');
        console.log('Is first visit?', isFirstVisit);
        
        if (isFirstVisit) {
            // Set up first visit
            audio.currentTime = 0;
            audio.volume = 1;
            audio.muted = false;
            
            // Handle the first play click
            audio.addEventListener('play', handleFirstPlay, { once: true });
        } else {
            // For subsequent visits/navigation, restore the previous state
            const savedTime = localStorage.getItem('audioCurrentTime');
            const wasPlaying = localStorage.getItem('audioPlaying') === 'true';
            const savedVolume = localStorage.getItem('audioVolume');
            const isMuted = localStorage.getItem('audioMuted') === 'true';
            
            if (savedTime) audio.currentTime = parseFloat(savedTime);
            if (savedVolume) audio.volume = parseFloat(savedVolume);
            audio.muted = isMuted;
            
            if (wasPlaying) {
                audio.play().catch(e => console.log('Playback prevented:', e));
            }
        }
    });

    // Save state before page unload
    window.addEventListener('beforeunload', () => {
        localStorage.setItem('audioCurrentTime', audio.currentTime);
        localStorage.setItem('audioPlaying', !audio.paused);
        localStorage.setItem('audioVolume', audio.volume);
        localStorage.setItem('audioMuted', audio.muted);
    });

    // Save volume settings when changed
    audio.addEventListener('volumechange', () => {
        localStorage.setItem('audioVolume', audio.volume);
        localStorage.setItem('audioMuted', audio.muted);
    });
}

// Volume control functions
function increaseVolume() {
    const player = document.getElementById('player');
    if (player.volume < 1) {
        player.muted = false;
        player.volume += 0.1;
    }
}

function decreaseVolume() {
    const player = document.getElementById('player');
    if (player.volume > 0) {
        player.volume -= 0.1;
        if (player.volume === 0) {
            player.muted = true;
        }
    }
}

document.addEventListener('DOMContentLoaded', manageAudio);