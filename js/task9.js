// Дано перелік товарів у кошику. При зміні кількості одиниць товару збільшувати загальну
// вартість. Створити клас Product, що призначений для маніпуляцій товаром та клас ProductManager
// що оперує з усіма товарами (через подію передвати ідентифікатор товару та операцію, що зроблена

class ElementsCreator {
   static createHTMLElement({ tag, attrs, props, events }) {
      const el = document.createElement(tag)

      if (attrs) for (const attrKey in attrs) el.setAttribute(attrKey, attrs[attrKey])

      if (props) for (const propKey in props) el[propKey] = props[propKey]

      if (events) for (const eventType in events) el.addEventListener(eventType, events[eventType])

      return el
   }
}

class Product {
   constructor(initData) {
      Object.assign(this, initData)
      this.el = this.createElement()
   }

   decrease() {
      const decreaseEvent = new CustomEvent('decrease', {
         detail: {
            inputValue: this.input.value,
         },
      })
      this.el.dispatchEvent(decreaseEvent)
   }

   increase() {
      const increaseEvent = new CustomEvent('increase', {
         detail: {
            inputValue: this.input.value,
         },
      })
      this.el.dispatchEvent(increaseEvent)
   }

   changePrice() {
      const changePriceEvent = new CustomEvent('changePrice', {
         detail: {
            productPrice: this.price,
         },
      })
      this.el.dispatchEvent(changePriceEvent)
   }

   delete() {
      const deleteEvent = new CustomEvent('delete')
      this.el.dispatchEvent(deleteEvent)
   }

   createElement() {
      const container = ElementsCreator.createHTMLElement({ tag: 'div', attrs: { class: 'product' } })

      const img = ElementsCreator.createHTMLElement({ tag: 'img', attrs: { src: this.imgSrc, class: 'product__img' } })
      container.append(img)

      const title = ElementsCreator.createHTMLElement({
         tag: 'a',
         attrs: { class: 'product__title', href: this.link },
         props: { innerText: this.title },
      })
      container.append(title)

      const quantityContainer = ElementsCreator.createHTMLElement({ tag: 'div', attrs: { class: 'quantity-container' } })
      container.append(quantityContainer)

      const minus = ElementsCreator.createHTMLElement({
         tag: 'button',
         attrs: { class: 'quantity-container__button' },
         props: { innerText: '-' },
         events: { click: this.decrease.bind(this) },
      })
      quantityContainer.append(minus)

      this.input = ElementsCreator.createHTMLElement({
         tag: 'input',
         attrs: { class: 'quantity-container__input', value: '1', type: 'number' },
         events: { input: this.changePrice.bind(this) },
      })
      quantityContainer.append(this.input)

      const plus = ElementsCreator.createHTMLElement({
         tag: 'button',
         attrs: { class: 'quantity-container__button' },
         props: { innerText: '+' },
         events: { click: this.increase.bind(this) },
      })
      quantityContainer.append(plus)

      const priceContainer = ElementsCreator.createHTMLElement({
         tag: 'div',
         attrs: { class: 'product__price-container' },
         props: { innerText: 'До сплати: ' },
      })
      container.append(priceContainer)

      const totalPrice = ElementsCreator.createHTMLElement({
         tag: 'span',
         attrs: { class: 'product__price' },
         props: { innerText: `${this.price} грн.` },
      })
      priceContainer.append(totalPrice)

      const deleteButton = ElementsCreator.createHTMLElement({
         tag: 'button',
         attrs: { class: 'product__delete' },
         events: { click: this.delete.bind(this) },
      })
      container.append(deleteButton)

      return container
   }
}

class ProductManager {
   constructor(productsList) {
      this.productsList = productsList
      this.el = this.createElement()
   }

   delete(e) {
      console.log(e)
   }

   createElement() {
      const productsContainer = ElementsCreator.createHTMLElement({ tag: 'div', attrs: { class: 'block__products' } })

      for (const product of this.productsList) {
         product.el.addEventListener('delete', this.delete.bind(this))
         productsContainer.append(product.el)
      }

      return productsContainer
   }

   render(targetContainer) {
      document.querySelector(targetContainer).append(this.el)
   }
}

class Quantity {
   constructor({ imgSrc, title, link, price }, minNum = 0, maxNum = 10) {
      this.imgSrc = imgSrc
      this.title = title
      this.link = link
      this.price = price
      this.minNum = minNum
      this.maxNum = maxNum
   }

   decrease() {
      if (this.inp.value > this.minNum) {
         this.inp.value--
         this.changePrice()
      }
   }

   increase() {
      if (this.inp.value < this.maxNum) {
         this.inp.value++
         this.changePrice()
      }
   }

   changePrice() {
      if (this.inp.value < this.minNum) this.inp.value = this.minNum
      if (this.inp.value > this.maxNum) this.inp.value = this.maxNum

      this.totalPrice.innerText = `${this.price * this.inp.value}грн.`
   }

   render(containerSelector) {
      const container = document.createElement('div')
      container.className = 'product'

      const img = document.createElement('img')
      img.src = this.imgSrc
      img.className = 'product__img'
      container.append(img)

      const title = document.createElement('a')
      title.innerText = this.title
      title.href = this.link
      container.append(title)

      const quantityContainer = document.createElement('div')
      quantityContainer.classList = 'quantity-container'
      container.append(quantityContainer)

      const minus = document.createElement('button')
      minus.className = 'quantity-container__button minus'
      minus.innerText = '-'
      minus.onclick = this.decrease.bind(this)
      quantityContainer.append(minus)

      this.inp = document.createElement('input')
      this.inp.value = 1
      this.inp.oninput = this.changePrice.bind(this)
      this.inp.className = 'quantity-container__input'
      quantityContainer.append(this.inp)

      const plus = document.createElement('button')
      plus.className = 'quantity-container__button plus'
      plus.innerText = '+'
      plus.onclick = this.increase.bind(this)
      quantityContainer.append(plus)

      const priceContainer = document.createElement('div')
      priceContainer.className = 'product__price-container'
      priceContainer.innerText = 'До сплати: '
      container.append(priceContainer)

      this.totalPrice = document.createElement('span')
      this.totalPrice.className = 'product__price'
      this.totalPrice.innerText = `${this.price}грн.`
      priceContainer.append(this.totalPrice)

      document.querySelector(containerSelector).append(container)
   }
}

const prod1 = new Product({
   imgSrc: '../img/image01.png',
   title: 'Ноутбук Acer Aspire 7 A715-42G-R3EZ',
   link: 'https://rozetka.com.ua/ua/acer_nh_qbfeu_00c/p288376303/',
   price: 29999,
})

// document.querySelector('.block__container').append(prod1.el)

const prodList = [prod1, prod1, prod1]

const pm = new ProductManager(prodList)
pm.render('.block__container')

// new Quantity({
//    imgSrc: '../img/image01.png',
//    title: 'Ноутбук Acer Aspire 7 A715-42G-R3EZ',
//    link: 'https://rozetka.com.ua/ua/acer_nh_qbfeu_00c/p288376303/',
//    price: 29999,
// }).render('.block__products')

// new Quantity({
//    imgSrc: '../img/image02.png',
//    title: 'Ноутбук ASUS TUF Gaming F15 FX506LHB-HN323',
//    link: 'https://rozetka.com.ua/ua/asus-90nr03u2-m008e0/p353689830/',
//    price: 16999,
// }).render('.block__products')
