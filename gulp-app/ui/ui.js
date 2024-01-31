class DevSelect extends HTMLElement {
    value = "";
    static observedAttributes = ["value"];
    constructor() {
        super();
    };

    getValue() {
        return this.value;
    };

    onChange() {

    };

    connectedCallback() {
        this.value = this.getAttribute("value");
    };

    disconnectedCallback() { };

    adoptedCallback() { };

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case "value":
                this.value = newValue;
                this.classList.remove(oldValue);
                this.classList.add(newValue);
                this.onChange();
        }
    };
}

customElements.define("dev-select", DevSelect);


const timeClassToggle = (el, time, addClass, removeClass) => {
    el.classList.add(addClass);
    removeClass && el.classList.remove(removeClass);

    setTimeout(() => {
        removeClass && el.classList.add(removeClass);
        el.classList.remove(addClass);
    }, time);
};


for (const el of document.querySelectorAll(".accardion-item__header")) {
    let group = el.dataset.group;

    el.addEventListener("click", () => {
        let target = el.querySelector(`input[name="${group}"]`);
        let state = target.checked;
        let checks = document.querySelectorAll(`input[name="${group}"]`);
        for (let check of checks) {
            if (check != target) {
                check.checked = false;
                check.parentElement.classList.remove("active");
            }
        }
        target.checked = !state;
        if (target.checked) {
            el.classList.add("active");
        } else {
            el.classList.remove("active");
        }
    });
}


for (const el of document.querySelectorAll(".select")) {
    let container = el.querySelector(".select__container");

    container.addEventListener("click", () => {
        if (!container.classList.contains("done")) {
            timeClassToggle(container, 300, "done");
        }
    });

    for (const opt of el.querySelectorAll("input[type='radio']")) {
        opt.addEventListener("click", () => {
            el.setAttribute("value", opt.getAttribute("value"));
        });
    }
}


