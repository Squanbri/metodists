const modal = document.querySelector('.modal')
const modalSkill = document.querySelector('#modal-skill')
const insertBtn = document.querySelectorAll('[name = "insert-btn"]')

function modalOpen(mod) {
  mod.style.display = 'flex'
}
function modalClose(mod) {
  mod.style.display = 'none'
}

const getItems = (table, parent = '') => {
  fetch('./../../php/getItems.php', {
    method: 'POST',
    body: JSON.stringify({
      table,
      parent
    })
  })
  .then(res => res.json())
  .then(res => {
    const col = document.querySelector(`#${table}`)
    col.innerHTML = ''
    
    for (const key in res) {
      const id = res[key].id
      const text = res[key].text

      const li = document.createElement("li");
      li.innerHTML = text;        
      li.setAttribute('data-id', id)

      switch(table) {
        case 'groups':
          li.addEventListener('click', () => getItems('products', id))
          break
        case 'products':
          li.addEventListener('click', () => getItems('operations', id))
          break
      }

      col.appendChild(li);   
    }

    // Првильное открытие последующих столбцов
    switch(table) {
      case 'groups':
        const groupsId = col.children[0].getAttribute('data-id')
        getItems('products', groupsId)
        break
      case 'products':
        const productsId = col.children[0].getAttribute('data-id')
        getItems('operations', productsId)
        break
    }
  })
}

const addItem = (table, text, parent = '') => {
  fetch('./../../php/addItem.php', {
    method: 'POST',
    body: JSON.stringify({
      table,
      text,
      parent
    })
  })
}

// addItem('operations', 'Найти свинью', 3)
// addItem('operations', 'Помыть свинью', 3)
getItems('groups')