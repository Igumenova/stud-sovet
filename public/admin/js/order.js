const _id=document.querySelector(".order").dataset.id,title=document.querySelector(".order__title"),customer=document.querySelector(".order__customer"),textarea=document.querySelector("#command_comment"),addEditEvent=t=>{const e=t.querySelector(".order__content"),n=t.querySelector(".order__edit"),o=t.dataset.key;let r=e.textContent;const a=t=>{if(t.target.textContent!==r){r=t.target.textContent;let e={_id:_id};e[o]=r,fetch(`${host}/admin/commands`,{headers:{"Content-type":"application/json;charset=utf-8"},method:"PUT",body:JSON.stringify(e)}).then(t=>{200!==t.status&&alert(`Изменения не сохранились. Код ошибки: ${t.status}`)}).catch(t=>alert(`Ошибка запроса3. ${t.message}`))}e.removeEventListener("blur",a)};n.addEventListener("click",()=>{e.contentEditable=!0,e.addEventListener("blur",a),e.focus()})};for(const t of[title,customer])addEditEvent(t);textarea.addEventListener("change",()=>{fetch(`${host}/admin/commands`,{headers:{"Content-type":"application/json;charset=utf-8"},method:"PUT",body:JSON.stringify({_id:_id,comment:textarea.value})}).then(t=>{200!==t.status&&alert(`Изменения не сохранились. Код ошибки: ${t.status}`)}).catch(t=>alert(`Ошибка запроса4. ${t.message}`))});