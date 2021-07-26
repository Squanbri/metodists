const company = document.querySelector('#company')
const fio = document.querySelector('#fio')
const email = document.querySelector('#email')
const phone = document.querySelector('#phone')
const quizBody = document.querySelector('.quiz__body')
const addPerson = document.querySelector('#addPerson')
const sendBtn = document.querySelector('#send')
const modal = document.querySelector('#modal')
let vacansyCount = 1

const validation = () => {
  const counts = Array.from(document.querySelectorAll('.count'))
  const fields = document.querySelectorAll('.quiz .form-control')

  fields.forEach(field => {
    field.classList.remove('is-invalid')
  })

  const fail = [] // Массивы полей не прошедших валидацию
  if( !company.value || !/\S[А-Яа-я ]/.test(company.value)) {
    company.classList.add('is-invalid')
    fail.push('company')
  }
  if (!phone.value || /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g.test(phone.value)) {
    phone.classList.add('is-invalid')
    fail.push('phone')
  }

  for (const count of counts) {
    if (!count.value || !/^\d+$/.test(count.value)) {
      count.classList.add('is-invalid')
      fail.push('count')
    }
  }

  for(const field of fields) {
    if (!field.value) {
      field.classList.add('is-invalid')
      fail.push('field')
    }
  }

  return fail.length
}

const send = () => {
  const vacansies = []

  for (let i=0; i<vacansyCount; i++) {
    const city = Array.from(document.querySelectorAll('.city'))[i]
    const department = Array.from(document.querySelectorAll('.department'))[i]
    const specialty = Array.from(document.querySelectorAll('.specialty'))[i]
    const count = Array.from(document.querySelectorAll('.count'))[i]
    const payment = Array.from(document.querySelectorAll('.payment'))[i]
    const education = Array.from(document.querySelectorAll('.education'))[i]
    const experience = Array.from(document.querySelectorAll('.experience'))[i]
    const comment = Array.from(document.querySelectorAll('.comment'))[i]
    const students = document.querySelector(`#students${i+1}-yes`)

    let time = Array.from(document.querySelectorAll(`[name="time${i+1}"]:checked`))[0]
    if (time.classList.contains('full-time')) time = 'Полная занятость'
    else if (time.classList.contains('part-time')) time = 'Частичная занятость'
    else if (time.classList.contains('flex-time')) time = 'Гибкий график'    

    let selExperience = experience.options[experience.options.selectedIndex].textContent
    console.log(students)
    let selStudents = students.checked ? 'Да' : 'Нет'

    vacansies.push({
      company: company.value,
      fio: fio.value,
      email: email.value,
      phone: phone.value,
      city: city.value,
      department: department.value,
      specialty: specialty.value,
      count: count.value,
      time: time,
      payment: payment.value,
      education: education.value,
      experience: selExperience,
      comment: comment.value,
      students: selStudents,
    })
  }

  openModal()

  fetch('./../../php/interview.php', {
    method: 'POST',
    body: JSON.stringify({
      vacansies: vacansies   
    })
  })
}

const openModal  = () => modal.style.display = 'flex'
const closeModal = () => modal.style.display = 'none'

addPerson.addEventListener('click', () => {
  if (vacansyCount === 2) addPerson.style.display = 'none'

  vacansyCount++
  quizBody.insertAdjacentHTML('beforeend', vacansy(vacansyCount))

  $('.city').each(function( index ) {
    $(this).fias({
      type: $.fias.type.city,
    });
  });

  $('.department').each(function( index ) {
    $(this).autocomplete({
      source: departments
    });
  });
})

sendBtn.addEventListener('click', () => {
  if(validation() === 0) send()
  else window.scrollTo(0,0);
})


function vacansy(index) {
  return `
    <hr>
    <h4>Вакансия ${index}</h4>

    <div class="quiz__item w-100">
      <label for="">Город</label>
      <input type="text" class="city form-control" placeholder="Начните вводить город...">  <!-- Город -->
    </div>

    <div class="quiz__item w-100">
      <label for="department">Отрасль</label>
      <input type="text" class="department form-control" placeholder="Строительство">  <!-- Город -->
    </div>

    <div class="quiz__item">
      <label for="">Вакансия</label>
      <input type="text" class="specialty form-control specialty" placeholder="Сварщик">  <!-- Специальность -->
    </div>

    <div class="quiz__item">
      <label for="">Количество сотрудников</label>
      <input type="text" class="count form-control count" placeholder="5">  <!-- Количество сотрудников -->
    </div>

    <div class="quiz__item quiz__item_radio">
      <label>Условия</label>
      <div class="quiz__item_radio-body">
        <div>
          <input class="full-time" type="radio" name="time${index}" id="full-time${index}" checked>  <!-- Полная занятость -->
          <label for="full-time${index}">Полная занятость</label>
        </div>

        <div>
          <input class="part-time" type="radio" name="time${index}" id="part-time${index}">  <!-- Частичная занятость -->
          <label for="part-time${index}">Частичная занятость</label>
        </div>

        <div class="d-flex self-time">
          <input type="radio" name="time${index}" class="d-flex my-auto me-1 flex-time" id="flex-time${index}">  <!-- Гибкая занятость -->
          <label for="flex-time${index}">Гибкий график</label>
        </div>
      </div>
    </div>

    <div class="quiz__item">
      <label for="">Оплата</label>
      <input type="text" class="payment form-control payment" placeholder="50 000 Р">  <!-- Оплата -->
    </div>

    <div class="quiz__item">
      <label for="">Образование</label>
      <input type="text" class="education form-control education" placeholder="Высшее">  <!-- Образование -->
    </div>

    <div class="quiz__item w-100">
      <label for="">Опыт</label>
      <select class="form-control experience">  <!-- Опыт -->
        <option value="Не обязателен">Не обязателен</option>
        <option value="Желателен">Желателен</option>
        <option value="От 1 года">От 1 года</option>
        <option value="От 1 до 3 лет">От 1 до 3 лет</option>
        <option value="Более 3 лет">Более 3 лет</option>
      </select>
    </div>

    <div class="quiz__item w-100">
      <label for="">Описание вакансии</label>
      <textarea class="form-control comment"></textarea>  <!-- Коментарии -->
    </div>

    <div class="quiz__item d-flex flex-column w-100">
      <label for="students1">Готов сотрудничать с профессиональными образовательными организациями?</label>
      <div class="d-flex self-time">
        <input type="radio" name="students${index}" class="d-flex my-auto me-1 flex-time" id="students${index}-yes" checked>  <!-- Студенты да -->
        <label for="students${index}-yes" class="me-3">Да</label>
        
        <input type="radio" name="students${index}" class="d-flex my-auto me-1 flex-time" id="students${index}-no">  <!-- Студенты нет -->
        <label for="students${index}-no">Нет</label>
      </div>
    </div>
  `
}


// ------------------------- //
// -- -- -- JQUERY -- -- --  //
// ------------------------- //

$.fias.token = 'eE5Srd9KkdDADYdabf9kTKQeiSYf64r8';
$.fias.url = 'https://kladr-api.com/api.php';

$('.city').each(function( index ) {
  $(this).fias({
    type: $.fias.type.city,
  });
});

var departments = [
  "Строительство",
  "IT и телеком",
  "Образование и воспитание",
  "Менеджмент и управление",
  "Сфера услуг",
  "Транспорт и логистика",
  "Производство",
  "Здравоохранение",
  "Безопасность",
  "Торговля и финансы"
];
$(".department").autocomplete({
  source: departments
});

$("#phone").mask("8(999) 999-9999");