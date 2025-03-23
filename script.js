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
        // Remove the 'active' class from all buttons
        moodButtons.forEach(button => {
            button.classList.remove("active");
        });

        // Highlight the selected mood button
        const selectedButton = [...moodButtons].find(btn => btn.dataset.mood === mood);
        if (selectedButton) {
            selectedButton.classList.add("active");
        }

        // Display the selected mood
        moodDisplay.textContent = mood;

        // Display tips based on the selected mood
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

    // Quiz Section logic
    const questions = [
        {
            question: "How often do you feel anxious or stressed?",
            options: ["Never", "Sometimes", "Frequently", "Always"],
            answer: null
        },
        {
            question: "Do you often feel down or depressed?",
            options: ["Never", "Sometimes", "Frequently", "Always"],
            answer: null
        },
        {
            question: "How well are you sleeping?",
            options: ["Very well", "Adequately", "Poorly", "Very poorly"],
            answer: null
        },
        {
            question: "How often do you feel isolated or alone?",
            options: ["Never", "Sometimes", "Frequently", "Always"],
            answer: null
        },
        {
            question: "Do you find it difficult to concentrate or focus?",
            options: ["Never", "Sometimes", "Frequently", "Always"],
            answer: null
        }
    ];
    
    const quizForm = document.getElementById("quiz-form");
    const questionContainer = document.getElementById("question-container");
    const resultContainer = document.getElementById("result-container");
    const quizResult = document.getElementById("quiz-result");
    const resultIcon = document.getElementById("result-icon");
    
    // Display the questions and options
    function displayQuestions() {
        questionContainer.innerHTML = questions.map((q, index) => {
            return `
                <div class="question mb-4">
                    <h5>${q.question}</h5>
                    ${q.options.map((option, i) => {
                        return `
                            <label class="d-block">
                                <input type="radio" name="question${index}" value="${option}" onclick="saveAnswer(${index}, '${option}')"> 
                                ${option}
                            </label>
                        `;
                    }).join('')}
                </div>
            `;
        }).join('');
    }
    
    // Save the selected answer to the corresponding question
    function saveAnswer(questionIndex, option) {
        questions[questionIndex].answer = option;
    }
    
    // Evaluate the answers and provide the result
    function evaluateAnswers() {
        let concerningAnswers = 0;
        let suggestions = [];
    
        // Iterate through the answers and count how many are concerning
        questions.forEach(q => {
            // Answers "Frequently" or "Always" are concerning (indicating mental health issues)
            if (q.answer === "Frequently" || q.answer === "Always") {
                concerningAnswers++;
                if (q.question.includes("anxious") || q.question.includes("stressed")) {
                    suggestions.push("Consider practicing relaxation techniques, and reach out to people you trust to talk about your feelings.");
                }
                if (q.question.includes("down") || q.question.includes("depressed")) {
                    suggestions.push("It's important to talk to a healthcare provider or a mental health professional to work through these feelings.");
                }
                if (q.question.includes("sleeping")) {
                    suggestions.push("If you're struggling with sleep, try maintaining a consistent sleep schedule or consult a healthcare provider for advice.");
                }
                if (q.question.includes("isolated") || q.question.includes("alone")) {
                    suggestions.push("Consider reaching out to family, friends, or a counselor. Building connections can help you feel more supported.");
                }
                if (q.question.includes("concentrate") || q.question.includes("focus")) {
                    suggestions.push("Practicing mindfulness, meditation, or cognitive techniques might help improve focus and concentration.");
                }
            }
        });
    
        let resultText = "";
        let iconHTML = "";
    
        // Result text and suggestions based on concerning answers
        if (concerningAnswers === 0) {
            resultText = "Your answers suggest that you're managing your mental health well. Keep up with your positive habits and practices!";
            iconHTML = '<i class="fas fa-smile-beam text-success" style="font-size: 3em;"></i>';
        } else if (concerningAnswers <= 2) {
            resultText = "You may be experiencing some mental health challenges. Here are a few suggestions to help improve your well-being: ";
            iconHTML = '<i class="fas fa-meh-rolling-eyes text-warning" style="font-size: 3em;"></i>';
        } else {
            resultText = "It seems you might be facing significant mental health struggles. We recommend consulting a healthcare professional for guidance and support. Here are some suggestions: ";
            iconHTML = '<i class="fas fa-sad-tear text-danger" style="font-size: 3em;"></i>';
        }
    
        // Display suggestions if any
        if (suggestions.length > 0) {
            resultText += "<ul>" + suggestions.map(suggestion => `<li>${suggestion}</li>`).join('') + "</ul>";
        }
    
        // Display the result and icon
        quizResult.innerHTML = resultText;
        resultIcon.innerHTML = iconHTML;
        resultContainer.style.display = "block";
    }
    
    // Handle form submission
    quizForm.addEventListener("submit", (e) => {
        e.preventDefault();
        evaluateAnswers();
    });
    
    displayQuestions();
    
});






