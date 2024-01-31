const _id = document.querySelector('.order').dataset.id;
const title = document.querySelector('.order__title');
const customer = document.querySelector('.order__customer');
const contact = document.querySelector('.order__contact');
const description = document.querySelector('.order__description');

const textarea = document.querySelector('#order_comment');

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

      fetch(`${host}/admin/orders/updateCommand`, {
        headers: { 'Content-type': 'application/json;charset=utf-8' },
        method: 'PUT',
        body: JSON.stringify(body),
      })
        .then((res) => {
          if (res.status !== 200) {
            alert(`Изменения не сохранились. Код ошибки: ${res.status}`);
          }
        })
        .catch((e) => alert(`Ошибка запроса3. ${e.message}`));
    }

    content.removeEventListener('blur', localBlurHandle);
  };

  editBtn.addEventListener('click', () => {
    content.contentEditable = true;
    content.addEventListener('blur', localBlurHandle);
    content.focus();
  });
};

for (const el of [title, customer, contact, description]) {
  addEditEvent(el);
}

textarea.addEventListener('change', () => {
  fetch(`${host}/admin/orders/updateCommand`, {
    headers: { 'Content-type': 'application/json;charset=utf-8' },
    method: 'PUT',
    body: JSON.stringify({ _id, comment: textarea.value }),
  })
    .then((res) => {
      if (res.status !== 200) {
        alert(`Изменения не сохранились. Код ошибки: ${res.status}`);
      }
    })
    .catch((e) => alert(`Ошибка запроса4. ${e.message}`));
});
