// Перекладач. Користувачу виводять змішані картки з словами на англійській і українській мові.
// Користувач поступово клікає на картки (виділяємо синьою рамкою).
// Якщо знайдено правильні пари карток, що відповідають одному слову, то видаляємо ці картки.
// Інакше - виділяємо червоною рамкою і через секунду забираємо рамку.

class ElementsCreator {
   static createHTMLElement({ tag, attrs, props, events }) {
      const el = document.createElement(tag)

      if (attrs) for (const attrKey in attrs) el.setAttribute(attrKey, attrs[attrKey])

      if (props) for (const propKey in props) el[propKey] = props[propKey]

      if (events) for (const eventType in events) el.addEventListener(eventType, events[eventType])

      return el
   }
}

class WordsCard {
   constructor(dataList, lang) {
      this.wordsList = dataList
      this.lang = lang
      this.el = this.createElement()
   }

   getRandomElement(wordsListRef) {
      const randomIndex = Math.floor(Math.random() * wordsListRef.length)
      return wordsListRef[randomIndex]
   }

   checkOnClick(e) {
      const checkEvent = new CustomEvent('check', {
         detail: {
            id: e.target.id,
            lang: e.target.name,
         },
      })
      this.el.dispatchEvent(checkEvent)
   }

   createElement() {
      const container = ElementsCreator.createHTMLElement({ tag: 'div', attrs: { class: 'translator__card' } })

      let wordsListRef = this.wordsList.slice()

      do {
         const currentElem = this.getRandomElement(wordsListRef)

         const label = ElementsCreator.createHTMLElement({
            tag: 'label',
            attrs: { class: 'translator__item' },
            props: { innerText: currentElem.word },
         })
         container.append(label)

         const input = ElementsCreator.createHTMLElement({
            tag: 'input',
            attrs: { class: 'translator__input', type: 'radio', value: currentElem.word, name: this.lang, id: currentElem.id },
            events: { click: this.checkOnClick.bind(this) },
         })
         label.append(input)

         wordsListRef = wordsListRef.filter(elem => elem !== currentElem)
      } while (wordsListRef.length !== 0)

      return container
   }
}

class Translator {
   constructor(dataList) {
      this.uaList = dataList.map(elem => ({ id: elem.id, word: elem.ua }))
      this.enList = dataList.map(elem => ({ id: elem.id, word: elem.en }))
      this.el = this.createElement()
   }

   checkWordsTranslation(e) {
      const currentElement = document.querySelector(`[name="${e.detail.lang}" id="${e.detail.id}"]`)
      console.log('id: ' + e.detail.id)
      console.log('language: ' + e.detail.lang)
      console.log(currentElement)
   }

   createElement() {
      const container = ElementsCreator.createHTMLElement({ tag: 'div', attrs: { class: 'translator' } })

      const uaCard = new WordsCard(this.uaList, 'ua')
      uaCard.el.addEventListener('check', this.checkWordsTranslation.bind(this))
      container.append(uaCard.el)

      const enCard = new WordsCard(this.enList, 'en')
      enCard.el.addEventListener('check', this.checkWordsTranslation.bind(this))
      container.append(enCard.el)

      return container
   }

   render(targetContainer) {
      document.querySelector(targetContainer).append(this.el)
   }
}

const words = [
   { id: 0, en: 'table', ua: 'стіл' },
   { id: 1, en: 'car', ua: 'автомобіль' },
   { id: 2, en: 'bus', ua: 'автобус' },
   { id: 3, en: 'man', ua: 'чоловік' },
   { id: 4, en: 'boy', ua: 'хлопчик' },
   { id: 5, en: 'woman', ua: 'жінка' },
   { id: 6, en: 'girl', ua: 'дівчинка' },
   { id: 7, en: 'cat', ua: 'кіт' },
   { id: 8, en: 'dog', ua: 'пес' },
   { id: 9, en: 'key', ua: 'ключ' },
]

new Translator(words).render('.block__container')
