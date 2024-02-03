for (let el of document.querySelectorAll('.select.settings__select.filter')) {
  el.addEventListener('change', () => {
    for (let row of document.querySelectorAll('.order')) {
      row.classList.remove('hide-row');
      if (
        el.getValue() !== 'all' &&
        row.querySelector('dev-select').getValue() !== el.getValue()
      ) {
        row.classList.add('hide-row');
      }
    }
  });
}

for (let el of document.querySelectorAll('.select.settings__select.sort')) {
  el.addEventListener('change', () => {
    const ordersGrid = document.querySelector('.orders-grid');
    const orderElements = Array.from(ordersGrid.querySelectorAll('.order'));

    orderElements.sort((a, b) => {
      switch (el.getValue()) {
        case 'stage':
          const selectA = a.querySelector(`.order__select`);
          const selectB = b.querySelector(`.order__select`);
          return selectA.getValue().localeCompare(selectB.getValue()) * -1;
        case 'date':
          const dateA = a.querySelector('.order__date').dataset.date;
          const dateB = b.querySelector('.order__date').dataset.date;
          return moment(dateB) - moment(dateA);
        default:
          const elA = a.querySelector(`.order__${el.getValue()}`);
          const elB = b.querySelector(`.order__${el.getValue()}`);
          return elA.textContent.localeCompare(elB.textContent);
      }
    });

    orderElements.forEach((order) => {
      ordersGrid.removeChild(order);
    });
    orderElements.forEach((order) => {
      ordersGrid.appendChild(order);
    });
  });
}

for (let el of document.querySelectorAll('.order')) {
  const del = el.querySelector('.options__item.remove');
  const name = el.querySelector('.order__name').textContent;
  // const stage = el.querySelector('.select.order__select');

  // stage.addEventListener('change', () => {
  //   fetch(`${host}/admin/commands`, {
  //     headers: { 'Content-type': 'application/json;charset=utf-8' },
  //     method: 'PUT',
  //     body: JSON.stringify({ _id: el.dataset.order, stage: stage.getValue() }),
  //   })
  //     .then((res) => {
  //       if (res.status !== 200) {
  //         alert(`Изменения не сохранились. Код ошибки: ${res.status}`);
  //       }
  //     })
  //     .catch((e) => alert(`Ошибка запроса1. ${e.message}`)); //хохо хаха
  // });

  del.addEventListener('click', () => {
    if (confirm(`Удаляем задачу: \n${name}`)) {
      fetch(`${host}/admin/commands`, {
        headers: { 'Content-type': 'application/json;charset=utf-8' },
        method: 'DELETE',
        body: JSON.stringify({ _id: el.dataset.order }),
      })
        .then((res) => {
          if (res.status === 200) {
            el.classList.add('hide-row');
            setTimeout(() => {
              el.remove();
            }, 300);
          } else {
            alert(`Удаление не произошло. Код ошибки: ${res.status}`);
          }
        })
        .catch((e) => alert(`Ошибка запроса2. ${e.message}`));
    }
  });
}
