const _id = document.querySelector('.order').dataset.id;
const namee = document.querySelector('.order__title');
const surname = document.querySelector('.order__secondTitle');
const vk = document.querySelector('.order__vk');
const job = document.querySelector('.order__job');
const departament = document.querySelector('.order__departament');

const textarea = document.querySelector('#composition_descryption');

const addEditEvent = (element) => {
  const content = element.querySelector('.order__content');
  const editBtn = element.querySelector('.order__edit');
  const key = element.dataset.key;

  let state = content.textContent;

  const localBlurHandle = (e) => {
    if (e.target.textContent !== state) {
      state = e.target.textContent;

      let body = { _id };
      body[key] = state;

      fetch(`${host}/admin/composition`, {
        headers: { 'Content-type': 'application/json;charset=utf-8' },
        method: 'PUT',
        body: JSON.stringify(body),
      })
        .then((res) => {
          if (res.status !== 200) {
            alert(`Изменения не сохранились. Код ошибки: ${res.status}`);
          }
        })
        .catch((e) => alert(`Ошибка запроса. ${e.message}`));
    }

    content.removeEventListener('blur', localBlurHandle);
  };

  editBtn.addEventListener('click', () => {
    content.contentEditable = true;
    content.addEventListener('blur', localBlurHandle);
    content.focus();
  });
};

for (const el of [namee, surname, vk, job, departament]) {
  addEditEvent(el);
}

textarea.addEventListener('change', () => {
  fetch(`${host}/admin/composition`, {
    headers: { 'Content-type': 'application/json;charset=utf-8' },
    method: 'PUT',
    body: JSON.stringify({ _id, descryption: textarea.value }),
  })
    .then((res) => {
      if (res.status !== 200) {
        alert(`Изменения не сохранились. Код ошибки: ${res.status}`);
      }
    })
    .catch((e) => alert(`Ошибка запроса. ${e.message}`));
});
