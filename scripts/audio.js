function manageAudio(){
    const audio = document.getElementById('player');

    // Resume from saved time and volume on page load
    window.addEventListener('load', () => {
        const savedTime = localStorage.getItem('audioCurrentTime');
        const savedVolume = localStorage.getItem('audioVolume');
        const isPageReload = performance.getEntriesByType('navigation')[0].type === 'reload';
        const wasPlaying = localStorage.getItem('audioPlaying') === 'true';

        console.log(savedTime, savedVolume, isPageReload, wasPlaying);
        
        // Start from beginning only on page reload
        if (isPageReload) {
            audio.currentTime = 0;
        } else if (savedTime) {
            audio.currentTime = parseFloat(savedTime);
        }

        // persist audio setting across pages
        if (savedVolume) {
            audio.volume = parseFloat(savedVolume);
        }

        // Only play if it was playing before navigation
        if (wasPlaying) {
            audio.play().catch(e => console.log('Playback prevented:', e));
        }
    });

    // Save current time, volume, and playing state before navigating away
    window.addEventListener('beforeunload', () => {
        localStorage.setItem('audioCurrentTime', audio.currentTime);
        localStorage.setItem('audioVolume', audio.volume);
        localStorage.setItem('audioPlaying', !audio.paused);
    });

    // Save volume when changed using controls
    audio.addEventListener('volumechange', () => {
        localStorage.setItem('audioVolume', audio.volume);
    });

    // Update playing state when pause button are clicked
    audio.addEventListener('pause', () => {
        localStorage.setItem('audioPlaying', 'false');
    });
}

function increaseVolume() {
    if (document.getElementById('player').volume < 1) {
        document.getElementById('player').volume += 0.1;
    }
}

function decreaseVolume() {
    if (document.getElementById('player').volume > 0) {
        document.getElementById('player').volume -= 0.1;
    }
}

document.addEventListener('DOMContentLoaded', manageAudio);
