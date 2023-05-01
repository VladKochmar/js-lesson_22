class ObjectOnField {
   constructor({ coordinateX, coordinateY, imgSrc, interval }) {
      this.coordinateX = coordinateX
      this.coordinateY = coordinateY
      this.imgSrc = imgSrc
      this.interval = interval
      this.el = this.createElement()
   }

   createElement() {
      const elem = document.createElement('img')
      elem.src = this.imgSrc
      elem.className = 'block__obj-image'
      elem.style.top = `${this.coordinateY}%`
      elem.style.left = `${this.coordinateX}%`
      return elem
   }

   getRandomNumber(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min)
   }

   render(containerSelector) {
      document.querySelector(containerSelector).append(this.el)
   }
}

class House extends ObjectOnField {
   constructor({ coordinateX, coordinateY, imgSrc, interval }) {
      super({ coordinateX, coordinateY, imgSrc, interval })
   }

   update() {
      setInterval(() => {
         this.el.style.transform = `scale(${this.getRandomNumber(1, 5)})`
      }, this.interval)
   }
}

class Dog extends ObjectOnField {
   constructor({ coordinateX, coordinateY, imgSrc, interval }) {
      super({ coordinateX, coordinateY, imgSrc, interval })
   }

   update() {
      setInterval(() => {
         this.el.style.left = `${this.getRandomNumber(0, 100)}%`
      }, this.interval)
   }
}

class Bird extends ObjectOnField {
   constructor({ coordinateX, coordinateY, imgSrc, interval }) {
      super({ coordinateX, coordinateY, imgSrc, interval })
   }

   update() {
      setInterval(() => {
         this.el.style.top = `${this.getRandomNumber(0, 100)}%`
         this.el.style.left = `${this.getRandomNumber(0, 100)}%`
      }, this.interval)
   }
}

const h = new House({ coordinateX: 30, coordinateY: 50, imgSrc: '../img/task2/house.svg', interval: 7000 })
h.render('.block__field')
h.update()

const d = new Dog({ coordinateX: 50, coordinateY: 70, imgSrc: '../img/task2/dog.svg', interval: 5000 })
d.render('.block__field')
d.update()

const b = new Bird({ coordinateX: 20, coordinateY: 20, imgSrc: '../img/task2/bird.svg', interval: 5000 })
b.render('.block__field')
b.update()
