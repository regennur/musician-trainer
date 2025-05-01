document.addEventListener('DOMContentLoaded', function() {
    // Элементы для упражнения "Тональность: сколько знаков?"
    const keySignaturesBtn = document.getElementById('key-signatures-btn');
    const keySignaturesExercise = document.getElementById('key-signatures-exercise');
    const keySignatureQuestion = document.getElementById('key-signature-question');
    const keySignatureAnswer = document.getElementById('key-signature-answer');
    const keySignatureNextBtn = document.getElementById('key-signature-next');
    const keySignatureStartBtn = document.getElementById('key-signature-start');
    const keySignatureTimer = document.getElementById('key-signature-timer');
    const keySignatureCounter = document.getElementById('key-signature-counter');
    
    // Элементы для упражнения "Какая ступень?"
    const degreeNoteBtn = document.getElementById('degree-note-btn');
    const degreeNoteExercise = document.getElementById('degree-note-exercise');
    const degreeNoteQuestion = document.getElementById('degree-note-question');
    const degreeNoteAnswer = document.getElementById('degree-note-answer');
    const degreeNoteNextBtn = document.getElementById('degree-note-next');
    const degreeNoteStartBtn = document.getElementById('degree-note-start');
    const degreeNoteTimer = document.getElementById('degree-note-timer');
    const degreeNoteCounter = document.getElementById('degree-note-counter');
    
    // Элементы для упражнения "Интервал в тональности"
    const intervalInKeyBtn = document.getElementById('interval-in-key-btn');
    const intervalInKeyExercise = document.getElementById('interval-in-key-exercise');
    const intervalInKeyQuestion = document.getElementById('interval-in-key-question');
    const intervalInKeyAnswer = document.getElementById('interval-in-key-answer');
    const intervalInKeyNextBtn = document.getElementById('interval-in-key-next');
    const intervalInKeyStartBtn = document.getElementById('interval-in-key-start');
    const intervalInKeyTimer = document.getElementById('interval-in-key-timer');
    const intervalInKeyCounter = document.getElementById('interval-in-key-counter');
    
    // Элементы для упражнения "Интервальная цепочка"
    const intervalChainBtn = document.getElementById('interval-chain-btn');
    const intervalChainExercise = document.getElementById('interval-chain-exercise');
    const intervalChainQuestion = document.getElementById('interval-chain-question');
    const intervalChainAnswer = document.getElementById('interval-chain-answer');
    const intervalChainNextBtn = document.getElementById('interval-chain-next');
    const intervalChainStartBtn = document.getElementById('interval-chain-start');
    const intervalChainTimer = document.getElementById('interval-chain-timer');
    const intervalChainCounter = document.getElementById('interval-chain-counter');
    
    // Переменные для управления упражнениями
    let currentExercise = null;
    let timerInterval = null;
    let timeLeft = 60;
    let correctAnswers = 0;
    
    // Массивы данных для упражнений
    const keys = [
        { name: 'C мажор / A минор', signs: 0 },
        { name: 'G мажор / E минор', signs: 1 },
        { name: 'D мажор / B минор', signs: 2 },
        { name: 'A мажор / F# минор', signs: 3 },
        { name: 'E мажор / C# минор', signs: 4 },
        { name: 'B мажор / G# минор', signs: 5 },
        { name: 'F# мажор / D# минор', signs: 6 },
        { name: 'C# мажор / A# минор', signs: 7 },
        { name: 'F мажор / D минор', signs: -1 },
        { name: 'Bb мажор / G минор', signs: -2 },
        { name: 'Eb мажор / C минор', signs: -3 },
        { name: 'Ab мажор / F минор', signs: -4 },
        { name: 'Db мажор / Bb минор', signs: -5 },
        { name: 'Gb мажор / Eb минор', signs: -6 },
        { name: 'Cb мажор / Ab минор', signs: -7 }
    ];
    
    const notes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
    const alterations = ['', '#', 'b'];
    const degrees = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];
    const intervals = ['прима', 'секунда', 'терция', 'кварта', 'квинта', 'секста', 'септима', 'октава'];
    
    // Обработчики кнопок выбора упражнений
    keySignaturesBtn.addEventListener('click', () => showExercise(keySignaturesExercise));
    degreeNoteBtn.addEventListener('click', () => showExercise(degreeNoteExercise));
    intervalInKeyBtn.addEventListener('click', () => showExercise(intervalInKeyExercise));
    intervalChainBtn.addEventListener('click', () => showExercise(intervalChainExercise));
    
    // Обработчики кнопок "Начать" для каждого упражнения
    keySignatureStartBtn.addEventListener('click', () => startExercise('keySignatures'));
    degreeNoteStartBtn.addEventListener('click', () => startExercise('degreeNote'));
    intervalInKeyStartBtn.addEventListener('click', () => startExercise('intervalInKey'));
    intervalChainStartBtn.addEventListener('click', () => startExercise('intervalChain'));
    
    // Обработчики кнопок "Дальше" для каждого упражнения
    keySignatureNextBtn.addEventListener('click', () => nextQuestion('keySignatures'));
    degreeNoteNextBtn.addEventListener('click', () => nextQuestion('degreeNote'));
    intervalInKeyNextBtn.addEventListener('click', () => nextQuestion('intervalInKey'));
    intervalChainNextBtn.addEventListener('click', () => nextQuestion('intervalChain'));
    
    // Функция показа выбранного упражнения
    function showExercise(exerciseElement) {
        // Скрыть все упражнения
        document.querySelectorAll('.exercise').forEach(ex => {
            ex.classList.remove('active');
        });
        
        // Показать выбранное упражнение
        exerciseElement.classList.add('active');
    }
    
    // Функция запуска упражнения
    function startExercise(exerciseType) {
        currentExercise = exerciseType;
        timeLeft = 60;
        correctAnswers = 0;
        
        // Сбросить таймер и счетчик
        updateTimer();
        updateCounter(exerciseType, 0);
        
        // Скрыть кнопку "Начать" и показать кнопку "Дальше"
        document.getElementById(`${exerciseType}-start`).classList.add('hidden');
        document.getElementById(`${exerciseType}-next`).classList.remove('hidden');
        
        // Запустить таймер
        if (timerInterval) clearInterval(timerInterval);
        timerInterval = setInterval(() => {
            timeLeft--;
            updateTimer();
            
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                endExercise(exerciseType);
            }
        }, 1000);
        
        // Показать первый вопрос
        nextQuestion(exerciseType);
    }
    
    // Функция завершения упражнения
    function endExercise(exerciseType) {
        document.getElementById(`${exerciseType}-next`).classList.add('hidden');
        document.getElementById(`${exerciseType}-start`).classList.remove('hidden');
        
        const questionElement = document.getElementById(`${exerciseType}-question`);
        questionElement.textContent = `Время вышло! Вы ответили на ${correctAnswers} вопросов.`;
        
        document.getElementById(`${exerciseType}-answer`).classList.add('hidden');
    }
    
    // Функция обновления таймера
    function updateTimer() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        const timerString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        document.getElementById(`${currentExercise}-timer`).textContent = timerString;
    }
    
    // Функция обновления счетчика
    function updateCounter(exerciseType, count) {
        document.getElementById(`${exerciseType}-counter`).textContent = `Ответов: ${count}`;
    }
    
    // Функция перехода к следующему вопросу
    function nextQuestion(exerciseType) {
        const answerElement = document.getElementById(`${exerciseType}-answer`);
        answerElement.classList.add('hidden');
        
        switch (exerciseType) {
            case 'keySignatures':
                generateKeySignatureQuestion();
                break;
            case 'degreeNote':
                generateDegreeNoteQuestion();
                break;
            case 'intervalInKey':
                generateIntervalInKeyQuestion();
                break;
            case 'intervalChain':
                generateIntervalChainQuestion();
                break;
        }
        
        correctAnswers++;
        updateCounter(exerciseType, correctAnswers);
    }
    
    // Генерация вопроса для "Тональность: сколько знаков?"
    function generateKeySignatureQuestion() {
        const randomKey = keys[Math.floor(Math.random() * keys.length)];
        const questionElement = document.getElementById('key-signature-question');
        const answerElement = document.getElementById('key-signature-answer');
        
        questionElement.textContent = randomKey.name;
        
        let answerText;
        if (randomKey.signs === 0) {
            answerText = 'Нет знаков';
        } else if (randomKey.signs > 0) {
            answerText = `${randomKey.signs} ${declOfNum(randomKey.signs, ['диез', 'диеза', 'диезов'])}`;
        } else {
            answerText = `${Math.abs(randomKey.signs)} ${declOfNum(Math.abs(randomKey.signs), ['бемоль', 'бемоля', 'бемолей'])}`;
        }
        
        answerElement.textContent = answerText;
    }
    
    // Генерация вопроса для "Какая ступень?"
    function generateDegreeNoteQuestion() {
        const randomKey = keys[Math.floor(Math.random() * keys.length)];
        const randomDegree = degrees[Math.floor(Math.random() * degrees.length
