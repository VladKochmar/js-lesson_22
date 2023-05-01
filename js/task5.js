// На формі вводять 7 числових значень (вік, зріст, вага, заробітна плата, стаж, номер відділу, порядковий номер).
// Додати подію обробки події click на форму і якщо клік на input, то автоматично замінювати значення його на 0.

document.querySelector('.block__form').addEventListener('click', e => {
   const targetElement = e.target
   if (targetElement.classList.contains('input')) targetElement.value = 0
})
