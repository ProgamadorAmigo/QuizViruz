const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'Este antibiótico é uma droga de primeira linha usada no tratamento da tuberculose. Ele atua inibindo a ação da enzima catalase-peroxidase (KatG). Trata-se do (a):',
        choice1: 'Etambutol.',
        choice2: 'Etionamida.',
        choice3: 'Izoniazida.',
        choice4: 'Ácido para-aminossalicílico.',
        answer: 3,

    },
    {
        question: 'Assinale a alternativa que preenche as lacunas corretamente. - Os vírus podem ser classificados em duas nomenclaturas, dependendo do tipo de material genético que eles possuem. Quando esse material é o DNA, trata-se de um __________ e, quando esse material é o RNA, trata-se de um __________.',
        choice1: 'Retrovírus e arbovírus.',
        choice2: 'Arbovírus e adenovírus.',
        choice3: 'Adenovírus e arbovírus.',
        choice4: 'Adenovírus e retrovírus.',
        answer: 4,

    },
    {
        question: 'A discromatopsia hereditária é uma doença caracterizada pela ausência da capacidade de distinção de cores, ou, incapacidade de distinguir certos tons de cores. A discromatopsia hereditária também é conhecida como:',
        choice1: 'Daltonismo.',
        choice2: 'Tetracromatismo.',
        choice3: 'Catarata.',
        choice4: 'Astigmatismo.',
        answer: 1,

    },
    {
        question: 'Existem dois tipos de células fotorreceptoras: os __________ e os __________. O primeiro, é responsável pela percepção de cores e existem três tipos correspondentes às luzes vermelha, verde e azul. Já o segundo, é responsável pela recepção da luz e pela visão noturna ou em ambientes pouco iluminados. Trata-se, na ordem, dos:',
        choice1: 'Cilindros e bastonetes.',
        choice2: 'Cones e prismas.',
        choice3: 'Cones e bastonetes.',
        choice4: 'Cilindros e prismas.',
        answer: 3,

    },
    {
        question: 'Assinale a alternativa que preenche a lacuna corretamente. - Existem dois tipos de ligações: ____________________. A primeira ocorre em todas as ligações, porém, a segunda só ocorre em ligações duplas e triplas.',
        choice1: 'Alfa e beta.',
        choice2: 'Sigma e pi.',
        choice3: 'Gama e pi.',
        choice4: 'Beta e delta.',
        answer: 2,

    },
    {
        question: 'O __________ é um hidrocarboneto aromático, formado por 6 carbonos com ligações simples e duplas intercaladas. Sua estrutura foi determinada em 1865 por Friedrich August Kekulé, que afirma ter obtido ajuda de um sonho, no qual viu uma cobra mordendo a própria cauda. A partir dessas informações, pode-se afirmar que se trata do:',
        choice1: 'Hexano.',
        choice2: 'Ácido carbônico.',
        choice3: 'Dióxido de carbono.',
        choice4: 'Benzeno.',
        answer: 4,

    },
    {
        question: 'Os __________ são vírus transmitidos pela picada de insetos hematófagos (se alimentam de sangue), como o Aedes aegypti. Como exemplos de doenças causadas por esses vírus, é possível citar a dengue, a febre amarela e a Chikungunya. Trata-se dos:',
        choice1: 'Arbovírus.',
        choice2: 'Hemovírus.',
        choice3: 'Bacteriófagos.',
        choice4: 'Micófagos.',
        answer: 1,

    },
    {
        question: 'Assinale a alternativa que só contém doenças causadas por bactérias',
        choice1: 'Hanseníase, Malária e Herpes.',
        choice2: 'Tuberculose, Hanseníase e Salmonelose.',
        choice3: 'Leptospirose, Dengue e Cólera.',
        choice4: 'Caxumba, Gonorreia e gripe.',
        answer: 2,

    },
    {
        question: 'Assinale a alternativa que preenche corretamente as lacunas. - O uso de antibióticos de forma incorreta pode acarretar na ____ das bactérias a esses antibióticos. Assim, ao utilizar um antibiótico, ____ seu uso após desaparecerem os sintomas, a menos que o médico recomende o contrário.',
        choice1: 'resistência, deve-se descontinuar.',
        choice2: 'resistência; não se deve descontinuar.',
        choice3: 'vulnerabilidade; não se deve descontinuar.',
        choice4: 'vulnerabilidade; deve-se descontinuar.',
        answer: 2,

    },
    {
        question: 'Assinale a única alternativa que contém uma parte do olho humano',
        choice1: 'Cristalino.',
        choice2: 'Câmara frontal.',
        choice3: 'Refletor.',
        choice4: 'Espelho.',
        answer: 1,

    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 10

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {

    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('./end.html')
    } 

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)
    
    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)
        
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()