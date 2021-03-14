const addNewQuestionBtn = document.querySelector('.addquestion')
const newQuestionForm = document.querySelector('#newquestionform')
const qaItems = []

const questionForm = document.querySelector('#questioninput')
const answerForm = document.querySelector('#answerinput')
const saveQuestionAndAnswerBtn = document.querySelector('.save')
const contener = document.querySelector('.contener')



const showQuestionForm = () => { newQuestionForm.style.display = 'block' }
addNewQuestionBtn.addEventListener('click', showQuestionForm)

saveQuestionAndAnswerBtn.addEventListener('click', onAddItem)

function onAddItem() {
    
   const question = questionForm.value
   const answer = answerForm.value

    if (question.length >= 3 && answer.length >=3) {
        const qa = {
            question: question,
            answer: answer,
        }
        qaItems.push(qa)
        render()
        questionForm.value = ''
        answerForm.value = ''
    } else {
        alert(`Question and Answer can't have less than 3 letters`)  
    }

    newQuestionForm.style.display = 'none'
}

function render() {
    contener.innerHTML = ''

    qaItems.forEach(function (qa, index) {
        const newFlashcard = `<div class="flashcard">
        <p class="printquestion">${qa.question}</p>
        <button class="showhide">Show/Hide Answer</button>
        <p class="printanswer ">${qa.answer}</p>
        <button class="edit">Edit</button>
        <button class="delete">Delete</button>
        </div>`
    
        const tempDiv = document.createElement('div')
        tempDiv.innerHTML = newFlashcard
        contener.appendChild(tempDiv)

        tempDiv.setAttribute('data-number', index)
        showHideToggle()
        edit()
        deleteBtn()
    })
}

function showHideanswer(event) {
    const dataNumber = event.target.parentElement.parentElement.getAttribute('data-number')
    event.target.parentElement.classList.toggle('isOpen')
}

function showHideToggle() {
    const showHideBtns = document.querySelectorAll('.showhide')
    showHideBtns.forEach(function (btn) {
        btn.addEventListener('click', showHideanswer)

    })
} 

function deleteFlashcard(event) {
    const dataNumber = event.target.parentElement.parentElement.getAttribute('data-number')

    qaItems.splice(dataNumber, 1)
    render()
}

function deleteBtn() {
    const flashcardDeleteBtn = document.querySelectorAll('.delete')
    flashcardDeleteBtn.forEach(function (btn) {
        btn.addEventListener('click', deleteFlashcard)
    })
} 

function editQuestionAndanswer(event) {
    const parent = event.target.parentElement.parentElement
    const dataNumber = parent.getAttribute('data-number')

    const currentQuestion = parent.querySelector('.printquestion')
    const currentAnswer = parent.querySelector('.printanswer')
  
    questionForm.value = currentQuestion.innerHTML
    answerForm.value = currentAnswer.innerHTML

    qaItems.splice(dataNumber, 1)

    render()

    showQuestionForm()
}

function edit() {
    const flashcardEditBtn = document.querySelectorAll('.edit')
    flashcardEditBtn.forEach(function (btn) {
        btn.addEventListener('click', editQuestionAndanswer)
    })
} 


