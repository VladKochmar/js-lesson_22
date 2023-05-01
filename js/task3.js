// Користувач задає місяць навчання учня (перевіряти чи є числом, чи від 1 до 12, чи не канікули)
// та оцінку (перевіряти чи є числом, чи від 1 до 100).
// Вивести чи зможе він виправити оцінку (якщо оцінка погана і це не останній місяць у семестрі).
// Обробку усіх помилок зробити з використанням відповідних класів.

class IsNotNumberError extends Error {
   constructor() {
      super()
      this.message = 'Має бути числом'
      this.name = 'IsNotNumberError'
   }
}

class OutOfRangeError extends Error {
   constructor() {
      super()
      this.message = 'Не може бути поза діапазоном'
      this.name = 'OutOfRangeError'
   }
}

class EducationStatistic {
   constructor() {
      this.el = this.createElement()
   }

   createForm() {
      const container = document.createElement('div')
      container.className = 'student-form'

      const monthLabel = document.createElement('label')
      container.append(monthLabel)

      this.monthInput = document.createElement('input')
      this.monthInput.setAttribute('minVal', 1)
      this.monthInput.setAttribute('maxVal', 12)
      this.monthInput.className = 'input'
      this.monthInput.placeholder = 'Введіть місяць (1-12)'
      monthLabel.append(this.monthInput)

      const scoreLabel = document.createElement('label')
      container.append(scoreLabel)

      this.scoreInput = document.createElement('input')
      this.scoreInput.setAttribute('minVal', 1)
      this.scoreInput.setAttribute('maxVal', 100)
      this.scoreInput.className = 'input'
      this.scoreInput.placeholder = 'Введіть оцінку (1-100)'
      scoreLabel.append(this.scoreInput)

      return container
   }

   createElement() {
      const container = document.createElement('div')

      const formElement = this.createForm()
      container.append(formElement)

      this.resultContainer = document.createElement('div')
      this.resultContainer.className = 'grade-result'
      container.append(this.resultContainer)

      formElement.addEventListener('input', e => {
         this.validate(e)
      })

      return container
   }

   canCorrectGrade() {
      const month = parseInt(this.monthInput.value),
         score = parseInt(this.scoreInput.value)
      if (score < 70 && (month === 6 || month === 12)) return 'Студент не зможе виправити оцінки'
      else return 'Студент зможе виправити оцінки'
   }

   validate(e) {
      const currentElem = e.target,
         minVal = parseInt(currentElem.getAttribute('minVal')),
         maxVal = parseInt(currentElem.getAttribute('maxVal')),
         parent = currentElem.parentElement,
         errorMessage = document.createElement('div')

      errorMessage.className = 'error-message'
      if (parent.querySelector('.error-message')) parent.querySelector('.error-message').remove()

      try {
         if (isNaN(currentElem.value)) throw new IsNotNumberError()
         if (currentElem.value < minVal || currentElem.value > maxVal) throw new OutOfRangeError()
         this.resultContainer.innerText = this.canCorrectGrade()
      } catch (err) {
         if (err instanceof IsNotNumberError) {
            currentElem.value = ''
            if (errorMessage) {
               errorMessage.innerText = 'Має бути числом'
               parent.prepend(errorMessage)
               this.resultContainer.innerText = ''
            }
         }
         if (err instanceof OutOfRangeError) {
            currentElem.value = ''
            if (errorMessage) {
               errorMessage.innerText = `Має знаходитись в діапазоні від ${minVal} до ${maxVal}`
               parent.prepend(errorMessage)
               this.resultContainer.innerText = ''
            }
         }
      }
   }

   render(containerSelector) {
      document.querySelector(containerSelector).append(this.el)
   }
}

const es = new EducationStatistic()
es.render('.block__container')

function canCorrectGrade(month) {
   const studentInfo = document.querySelector('.student-info')
   if (month === '12' || month === '6') studentInfo.innerText = 'Учень не зможе виправити оцінку'
   else studentInfo.innerText = 'Учень зможе виправити оцінку'
}
