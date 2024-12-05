document.addEventListener('DOMContentLoaded', () => {
    // Define house results
    const resultOptions = ["Gryffindor", "Hufflepuff", "Ravenclaw", "Slytherin"];

    const quizSteps = document.querySelectorAll(".quiz-step");
    let totalScore = 0;

    // Loop through all quiz steps
    quizSteps.forEach((step, index) => {
        const answers = step.querySelectorAll(".quiz-answer");
        answers.forEach((answer) => {
            answer.addEventListener("click", () => {
                const value = parseInt(answer.getAttribute("data-quizIndex"));

                // Handle active state
                const activeAnswer = step.querySelector(".quiz-answer.active");
                if (activeAnswer) {
                    const oldScore = parseInt(activeAnswer.getAttribute("data-quizIndex"));
                    totalScore -= oldScore;
                    activeAnswer.classList.remove("active");
                }
                answer.classList.add("active");
                totalScore += value;

                // Move to the next step or calculate results
                if (index + 1 < quizSteps.length) {
                    step.classList.remove("current");
                    quizSteps[index + 1].classList.add("current");
                } else {
                    calculateResults();
                }
            });
        });
    });

    // Calculate and display results
    function calculateResults() {
        const minScore = 2 * quizSteps.length;
        const maxScore = 4 * quizSteps.length;
        const range = maxScore - minScore;
        const interval = range / resultOptions.length;

        const index = Math.min(
            Math.floor((totalScore - minScore) / interval),
            resultOptions.length - 1
        );

        // Hide all quiz steps
        quizSteps.forEach(step => {
            step.classList.remove('current');
            step.style.display = 'none';
        });

        // Get the house name and show the sorting animation
        const houseName = resultOptions[index]; // Remove exclamation mark
        showResult(houseName);
    }

    function showResult(house) {
        // Hide any visible quiz elements
        document.querySelectorAll('#quizzie ul').forEach(ul => ul.style.display = 'none');

        // Get and show the sorting hat container
        const sortingHatContainer = document.getElementById('sorting-hat-container');
        const sortingHatImg = sortingHatContainer.querySelector('img');

        // Show the container and ensure the talking hat GIF is visible
        sortingHatContainer.classList.add('show');
        sortingHatImg.src = 'assets/talking-hat.gif';
        sortingHatImg.style.opacity = '1';

        // Get theme song player and reduce volume
        const themeSong = document.getElementById('player');
        const originalVolume = themeSong ? themeSong.volume : 1.0;
        if (themeSong) {
            themeSong.volume = 0.2;
        }

        // Create and play sorting audio
        const audio = new Audio();

        // Set the appropriate audio file and house image path based on house
        let houseImagePath;
        switch (house.toLowerCase()) {
            case 'gryffindor':
                audio.src = 'assets/audios/gryffindor.mp3';
                houseImagePath = 'assets/houses/gryffindor.jpg';
                break;
            case 'ravenclaw':
                audio.src = 'assets/audios/ravenclaw.mp3';
                houseImagePath = 'assets/houses/ravenclaw.jpg';
                break;
            case 'hufflepuff':
                audio.src = 'assets/audios/hufflepuff.mp3';
                houseImagePath = 'assets/houses/hufflepuff.jpg';
                break;
            case 'slytherin':
                audio.src = 'assets/audios/slytherin.mp3';
                houseImagePath = 'assets/houses/slytherin.jpg';
                break;
        }

        audio.play();

        // Get audio duration when it's loaded
        audio.addEventListener('loadedmetadata', function () {
            const audioDuration = audio.duration;

            // Show house image 1 second before audio ends
            setTimeout(() => {
                sortingHatImg.src = houseImagePath;
                sortingHatImg.style.opacity = '1';
            }, (audioDuration - 1) * 1000);
        });

        audio.onended = function () {
            // Restore original theme song volume
            if (themeSong) {
                themeSong.volume = originalVolume;
                // Save the restored volume to localStorage to maintain consistency
                localStorage.setItem('audioVolume', originalVolume);
            }

            // Wait a few seconds with the house image showing, then either:
            setTimeout(() => {
                window.location.href = 'index.html'; // or wherever you want to go
            }, 3000);
        };
    };

});