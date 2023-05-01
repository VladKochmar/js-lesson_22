class IsNotNumberError extends Error {
   constructor() {
      super()
      this.message = 'Має бути числом'
      this.name = 'IsNotNumberError'
   }
}

class IsNegativeNumberError extends Error {
   constructor() {
      super()
      this.message = "Не може бути від'ємним"
      this.name = 'IsNegativeNumberError'
   }
}

class OutOfLimitError extends Error {
   constructor() {
      super()
      this.message = 'Не може бути менше ліміту'
      this.name = 'OutOfLimit'
   }
}

class Client {
   constructor({ id, fullName, balance }) {
      this.id = id
      this.fullName = fullName
      this.balance = balance
   }

   addMoney(addedSum) {
      this.balance += addedSum
   }

   withdrawalMoney(amountOfMoney) {
      try {
         if (this.balance - amountOfMoney < 0) throw new IsNegativeNumberError()
         this.balance -= amountOfMoney
      } catch (err) {
         if (err instanceof IsNegativeNumberError) alert(err.message)
      }
   }

   toString() {
      return `id: ${this.id} ${this.fullName} Баланс: ${this.balance}`
   }
}

class GoldenClient extends Client {
   constructor({ id, fullName, balance, creditLimit, creditPercent }) {
      super({ id, fullName, balance })
      this.creditLimit = Math.abs(creditLimit)
      this.creditPercent = creditPercent
   }

   withdrawalMoney(amountOfMoney) {
      try {
         if (this.balance - amountOfMoney < -this.creditLimit) throw new OutOfLimitError()
         this.balance -= amountOfMoney
      } catch (err) {
         if (err instanceof OutOfLimitError) alert(err.message)
      }
   }

   getCreditSurcharge(numberOfDaysLate) {
      return this.balance < 0 ? (Math.abs(this.balance) * this.creditPercent * numberOfDaysLate) / 100 : 0
   }

   toString() {
      return `id: ${this.id} ${this.fullName} Баланс: ${this.balance} Кредитний ліміт: ${this.creditLimit} Відсоток за використання кредитних коштів: ${this.creditPercent}`
   }
}

class Bank {
   constructor(clientsList) {
      this.clientsList = clientsList
   }

   showAllOrdinaryClients(targetContainer) {
      const container = document.createElement('div')
      container.className = 'clients-container'
      container.innerHTML = '<h2 class="client-title">Звичайні клієнти</h2>'

      const list = document.createElement('ul')
      list.className = 'client-list'

      for (const client of this.clientsList) {
         if (client instanceof Client) {
            const li = document.createElement('li')
            li.innerText = client
            list.append(li)
         }
      }
      container.append(list)

      document.querySelector(targetContainer).append(container)
   }

   showAllGoldClients(targetContainer) {
      const container = document.createElement('div')
      container.className = 'clients-container'
      container.innerHTML = '<h2 class="client-title">Gold клієнти</h2>'

      const list = document.createElement('ul')
      list.className = 'client-list'

      for (const client of this.clientsList) {
         if (client instanceof GoldenClient) {
            const li = document.createElement('li')
            li.innerText = client
            list.append(li)
         }
      }
      container.append(list)

      document.querySelector(targetContainer).append(container)
   }

   getTotalAmount() {
      return this.clientsList.reduce((sum, client) => sum + client.balance, 0)
   }
}

const gc = new GoldenClient({ id: 111, fullName: 'Kochmar Vlad', balance: 3000, creditLimit: 5000, creditPercent: 0.02 })
gc.withdrawalMoney(4200)
console.log(gc.getCreditSurcharge(151))

const clientsList = [
   new GoldenClient({ id: 1, fullName: 'Кочмар Владислав', balance: 3000000, creditLimit: 100000, creditPercent: 0.02 }),
   new Client({ id: 2, fullName: 'Івасик Телесик', balance: 2500 }),
   new GoldenClient({ id: 3, fullName: 'Іванов Іван', balance: 3000, creditLimit: 5000, creditPercent: 0.05 }),
   new Client({ id: 4, fullName: 'Антоненко Антон', balance: 2500 }),
   new GoldenClient({ id: 5, fullName: 'Петро Щур', balance: 15000, creditLimit: 10000, creditPercent: 0.05 }),
   new Client({ id: 6, fullName: 'Петренко Анастасія', balance: 25000 }),
   new GoldenClient({ id: 7, fullName: 'Степанов Степан', balance: 30000, creditLimit: 15000, creditPercent: 0.1 }),
   new Client({ id: 8, fullName: 'Іванова Людмила', balance: 15000 }),
   new GoldenClient({ id: 9, fullName: 'Петренко Василь', balance: 15000, creditLimit: 15000, creditPercent: 0.05 }),
]

const bank = new Bank(clientsList)

bank.showAllGoldClients('.block__container')
bank.showAllOrdinaryClients('.block__container')

document.querySelector('.clients-total-amount').innerText = `Сумарна кількість грошей на рахунку: ${bank.getTotalAmount()}грн.`
