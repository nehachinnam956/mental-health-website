document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section, header');
    
    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href').substring(1) === entry.target.id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };
    // Array of daily affirmations
const affirmations = [
    "You are capable of amazing things.",
    "You are enough just as you are.",
    "You deserve love and kindness.",
    "You are strong and resilient.",
    "You have the power to create change.",
    "You are worthy of happiness.",
    "You are doing your best, and that's enough.",
    "You have the strength to overcome challenges.",
    "You are growing into the best version of yourself.",
    "You bring light and positivity to the world."
];

// Function to generate a random affirmation
const generateAffirmation = () => {
    const affirmationText = document.getElementById('affirmation-text');
    const randomIndex = Math.floor(Math.random() * affirmations.length);
    affirmationText.textContent = `"${affirmations[randomIndex]}"`;
};

// Add event listener to the button
const generateBtn = document.getElementById('generate-btn');
generateBtn.addEventListener('click', generateAffirmation);


    // Mood tips mapping
    const moodTips = {
        "Happy": "🌟 Keep spreading positivity! Do something creative or share your joy with a friend.",
        "Calm": "🧘 Enjoy the serenity. Try a nature walk or a short meditation session.",
        "Sad": "💙 It’s okay to feel sad. Reach out to a friend or listen to soothing music.",
        "Anxious": "😌 Breathe deeply. Try the 4-7-8 breathing technique or mindfulness.",
        "Stressed": "🕊️ Take a break. Stretch, hydrate, or do a relaxation exercise."
    };

    function selectMood(mood) {
        const moodDisplay = document.getElementById('mood-display');
        moodDisplay.textContent = mood;

        const tipsContainer = document.getElementById('mood-tips');
        tipsContainer.innerHTML = `<p>${moodTips[mood]}</p>`;

        const buttons = document.querySelectorAll('.mood-btn');
        buttons.forEach(btn => {
            btn.classList.remove('active-mood');
            if (btn.getAttribute('data-mood') === mood) {
                btn.classList.add('active-mood');
            }
        });
    }
// 🌿 Select all flashcards
const flashcards = document.querySelectorAll('.flashcard');

// Iterate over each flashcard
flashcards.forEach(card => {
    card.addEventListener('click', () => {
        // Toggle the flipped class
        card.classList.toggle('flipped');

        // Get the answer from the data attribute
        const answer = card.getAttribute('data-answer');
        const back = card.querySelector('.flashcard-back p');

        // Display the answer dynamically when flipped
        if (card.classList.contains('flipped')) {
            back.textContent = answer;
        } else {
            back.textContent = '';  // Clear the answer on flip back
        }
    });
});// Quiz form handling
    const quizForm = document.getElementById('quiz-form');
    if (quizForm) {
        quizForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const questions = document.querySelectorAll('.question');
            let score = 0;
            let unansweredQuestions = 0;

            questions.forEach(question => {
                const selectedOption = question.querySelector('input:checked');
                if (!selectedOption) {
                    unansweredQuestions++;
                } else {
                    switch (selectedOption.value) {
                        case 'Often':
                        case 'Yes':
                        case 'Poor':
                        case 'Rarely':
                            score += 1;
                            break;
                        case 'Sometimes':
                        case 'Occasionally':
                        case 'Average':
                        case 'Weekly':
                            score += 0.5;
                            break;
                    }
                }
            });

            const resultContainer = document.getElementById('result');

            if (unansweredQuestions > 0) {
                resultContainer.innerHTML = `Please answer all questions. ${unansweredQuestions} question(s) are unanswered.`;
                resultContainer.style.color = 'red';
                return;
            }

            let recommendation = '';
            if (score <= 2) {
                recommendation = 'Your mental health seems good. Keep maintaining your positive habits!';
            } else if (score <= 4) {
                recommendation = 'You might benefit from some additional support. Consider talking to a professional.';
            } else {
                recommendation = 'It seems you could use some additional mental health support. We recommend consulting a mental health professional.';
            }

            resultContainer.innerHTML = `
                <h3>Quiz Results</h3>
                <p>Your Mental Well-being Score: ${score.toFixed(1)}/5</p>
                <p>${recommendation}</p>
            `;
            resultContainer.style.color = '#333';
        });
    }

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetElement = document.querySelector(this.getAttribute('href'));
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Fade-in effect for sections
    const fadeInSections = document.querySelectorAll('.section-fade-in');
    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    fadeInSections.forEach(section => fadeInObserver.observe(section));

    // Contact form validation
    const contactForm = document.querySelector('#contact form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = this.querySelector('input[type="text"]');
            const email = this.querySelector('input[type="email"]');
            const message = this.querySelector('textarea');

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!name.value.trim()) {
                alert('Please enter your name.');
                return;
            }

            if (!emailRegex.test(email.value.trim())) {
                alert('Please enter a valid email address.');
                return;
            }

            if (!message.value.trim()) {
                alert('Please enter a message.');
                return;
            }

            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }

    window.selectMood = selectMood;
});





