// Динамічний пошук. Є список працівників і поле пошуку.
// При введенні відображаються усі, які містять вказаний фрагмент

class ElementsCreator {
   static createHTMLElement({ tag, attrs, props, events }) {
      const el = document.createElement(tag)

      if (attrs) for (const attrKey in attrs) el.setAttribute(attrKey, attrs[attrKey])

      if (props) for (const propKey in props) el[propKey] = props[propKey]

      if (events) for (const eventType in events) el.addEventListener(eventType, events[eventType])

      return el
   }
}

class SearchForm {
   constructor() {
      this.el = this.createElement()
   }

   onInputSearch() {
      const searchEvent = new CustomEvent('search', {
         detail: {
            inputValue: this.input.value,
         },
      })
      this.el.dispatchEvent(searchEvent)
   }

   createElement() {
      const label = ElementsCreator.createHTMLElement({
         tag: 'label',
         attrs: {
            class: 'search-label',
         },
         props: {
            innerHTML: "<span>Ім'я</span>",
         },
      })
      this.input = ElementsCreator.createHTMLElement({
         tag: 'input',
         attrs: {
            class: 'input',
            placeholder: 'Я шукаю...',
         },
         events: {
            input: this.onInputSearch.bind(this),
         },
      })

      label.append(this.input)

      return label
   }
}

class SearchedElemsList {
   constructor(dataList) {
      this.dataList = dataList
      this.el = this.createElement()
   }

   createElement() {
      const list = ElementsCreator.createHTMLElement({ tag: 'ul', attrs: { class: 'search-list' } })

      for (const item of this.dataList) {
         const li = ElementsCreator.createHTMLElement({ tag: 'li', attrs: { class: 'search-list__item' }, props: { innerText: item } })
         list.append(li)
      }

      return list
   }
}

class Search {
   constructor(dataList) {
      this.dataList = dataList
      this.elemsList = []
      this.el = this.createElement()
   }

   searchElem(e) {
      const inpValue = e.detail.inputValue

      for (const elem of this.dataList) {
         if (elem.toLowerCase().includes(inpValue.toLowerCase()) && inpValue !== '') this.elemsList.push(elem)
      }

      this.displayList()
   }

   displayList() {
      this.searchListContainer.innerHTML = ''
      this.searchListContainer.append(new SearchedElemsList(this.elemsList).el)
      this.elemsList = []
   }

   createElement() {
      const container = document.createElement('div')

      const searchForm = new SearchForm()
      searchForm.el.addEventListener('search', this.searchElem.bind(this))
      container.append(searchForm.el)

      this.searchListContainer = document.createElement('div')
      container.append(this.searchListContainer)

      return container
   }

   render(targetContainer) {
      document.querySelector(targetContainer).append(this.el)
   }
}

const workersList = ['Іванов Петро', 'Васильков Іван', 'Пумба', 'Тімон', 'Кіану Рівз', 'Петро Щур', 'Степан', 'Дмитро']

window.onload = function () {
   const searchWorkers = new Search(workersList)
   searchWorkers.render('.block__container')
}
