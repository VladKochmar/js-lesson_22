// Дано 3 таблиці розмірності 3*3 з випадковими числами. Якщо відбувається клік на якійсь із клітинок,
// то до відповідної таблиці додається червона рамка (спробуйте додати можливість відображення кількості кліків
// біля назви таблиці з використанням відповідно доданого для цього атрибута).

class ElementsCreator {
   static createHTMLElement({ tag, attrs, props, events }) {
      const el = document.createElement(tag)

      for (const attrKey in attrs) {
         el.setAttribute(attrKey, attrs[attrKey])
      }

      for (const propKey in props) {
         el[propKey] = props[propKey]
      }

      for (const eventType in events) {
         el.addEventListener(eventType, events[eventType])
      }

      return el
   }
}

class Table {
   constructor(cols = 3, rows = 3) {
      this.cols = cols
      this.rows = rows
      this.el = this.createElement()
   }

   getRandomNumber(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min)
   }

   createRow() {
      const tr = ElementsCreator.createHTMLElement({ tag: 'tr', attrs: { class: 'table__tr' } })

      for (let i = 0; i < this.cols; i++) {
         const td = ElementsCreator.createHTMLElement({
            tag: 'td',
            attrs: { class: 'table__td' },
            props: { innerText: this.getRandomNumber(1, 100) },
            events: { click: this.onClick.bind(this) },
         })
         tr.append(td)
      }

      return tr
   }

   createElement() {
      const container = ElementsCreator.createHTMLElement({ tag: 'div', attrs: { class: 'block__table-container', clickcount: 0 } })

      this.title = ElementsCreator.createHTMLElement({
         tag: 'h3',
         attrs: { class: 'block__table-title' },
         props: { innerText: `Кліки: ${container.getAttribute('clickcount')}` },
      })
      container.append(this.title)

      this.table = ElementsCreator.createHTMLElement({
         tag: 'table',
         attrs: { class: 'table' },
      })

      for (let r = 0; r < this.cols; r++) {
         this.table.append(this.createRow())
      }

      container.append(this.table)

      return container
   }

   onClick() {
      const clickCountEvent = new CustomEvent('clickcount', {
         detail: { tableTitle: this.title, targetTable: this.table, clicksNum: this.el.getAttribute('clickcount') },
      })
      this.el.dispatchEvent(clickCountEvent)
   }
}

class TablesManager {
   constructor(tabelsNum = 1) {
      this.tabelsNum = tabelsNum
      this.el = this.createElement()
   }

   countClicks(e) {
      const table = e.detail.targetTable
      table.style.border = '2px solid red'

      const parentContainer = table.parentElement
      parentContainer.setAttribute('clickcount', parseInt(e.detail.clicksNum) + 1)

      e.detail.tableTitle.innerText = `Кліки: ${parentContainer.getAttribute('clickcount')}`
   }

   createElement() {
      const container = document.createElement('div')
      container.className = 'block__tabels'

      for (let i = 0; i < this.tabelsNum; i++) {
         const table = new Table(3, 3)
         table.el.addEventListener('clickcount', this.countClicks.bind(this))
         container.append(table.el)
      }

      return container
   }

   render(targetContainer) {
      document.querySelector(targetContainer).append(this.el)
   }
}

new TablesManager(3).render('.block__container')
