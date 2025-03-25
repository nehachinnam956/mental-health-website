document.addEventListener("DOMContentLoaded", () => {

    // Mood tips mapping
    const moodTips = {
        "Happy": "🌞 Enjoy the moment! Spread your positivity by doing something kind for others.",
        "Calm": "🌿 Maintain your peace. Try light stretching or a peaceful walk.",
        "Sad": "💙 It's okay to feel down. Reach out to a friend or do a self-care activity.",
        "Anxious": "🧘‍♀️ Breathe deeply. Practice short meditation or relaxation exercises.",
        "Stressed": "😌 Take a break. Step away from your task and do mindful breathing."
    };

    const moodButtons = document.querySelectorAll(".mood-btn");
    const moodDisplay = document.getElementById("mood-display");
    const moodTipsContainer = document.getElementById("mood-tips");

    // Function to handle mood selection
    function selectMood(mood) {
        // Remove 'active' class from all buttons
        moodButtons.forEach(button => {
            button.classList.remove("active");
        });

        // Highlight the selected button
        const selectedButton = [...moodButtons].find(btn => btn.dataset.mood === mood);
        if (selectedButton) {
            selectedButton.classList.add("active");
        }

        // Display mood and tips
        moodDisplay.textContent = mood;

        if (moodTips[mood]) {
            moodTipsContainer.innerHTML = `
                <div class="alert alert-info">
                    <h4>💡 Tips for ${mood}</h4>
                    <p>${moodTips[mood]}</p>
                </div>
            `;
        } else {
            moodTipsContainer.innerHTML = `
                <div class="alert alert-secondary">
                    <h4>🌿 Select a Mood</h4>
                    <p>Choose a mood to see relevant tips.</p>
                </div>
            `;
        }
    }

    // Attach event listeners to each mood button
    moodButtons.forEach(button => {
        button.addEventListener("click", () => {
            const mood = button.dataset.mood;
            selectMood(mood);
        });
    });

    // Quiz Section Logic
    const quizForm = document.getElementById('quiz-form');
    const resultDiv = document.getElementById('result');

    quizForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const form = new FormData(quizForm);
        let score = 0;

        // Scoring logic
        for (let entry of form.entries()) {
            const value = entry[1].trim();

            if (['Rarely', 'No', 'Good', 'Daily', 'Always'].includes(value)) {
                score += 2;
            } else if (['Sometimes', 'Occasionally', 'Average', 'Weekly'].includes(value)) {
                score += 1;
            } else {
                score += 0;
            }
        }

        let resultText = '';

        // Display result with color coding
        if (score >= 8) {
            resultText = "🌿 You're doing great! Keep nurturing your mental health.";
            resultDiv.style.color = '#27ae60'; // Green for good score
        } else if (score >= 5) {
            resultText = "💡 You might benefit from adding more relaxation or self-care activities.";
            resultDiv.style.color = '#f39c12'; // Yellow-orange for moderate score
        } else {
            resultText = "🧠 It may be helpful to reach out to a mental health professional or seek support.";
            resultDiv.style.color = '#e74c3c'; // Red for low score
        }

        // Display result
        resultDiv.innerHTML = `<p>${resultText}</p>`;
    });

});






