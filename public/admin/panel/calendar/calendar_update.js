const _id = document.querySelector('.order').dataset.id;
const title = document.querySelector('.order__title');
const author = document.querySelector('.order__author');
const eventDate = document.querySelector('.order__eventDate');
const eventTime = document.querySelector('.order__eventTime');

const textarea = document.querySelector('#calendar_descryption');

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

      fetch(`${host}/admin/calendar`, {
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

for (const el of [title,author,eventDate,eventTime]) {
  addEditEvent(el);
}

textarea.addEventListener('change', () => {
  fetch(`${host}/admin/calendar`, {
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
