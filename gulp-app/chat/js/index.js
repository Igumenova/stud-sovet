const chatInput = document.querySelector("#chat-input");
const getTextButton = document.querySelector("#text-btn");
const getImageButton = document.querySelector("#image-btn");
const chatContainer = document.querySelector(".chat-container");
const typingContainer = document.querySelector(".typing-container");
const dialog = document.querySelector(".dialog");
const themeButton = document.querySelector("#theme-btn");
const deleteButton = document.querySelector("#delete-btn");
const yesButton = document.querySelector("#dialog__yes");
const noButton = document.querySelector("#dialog__no");

let userText = null;
let incomingChatDiv = null;

const initialInputHeight = chatInput.scrollHeight;

const socket = io("ws://2040349-rt05646.twc1.net", {
    reconnectionDelayMax: 10000,
    auth: {
        token: "wQAAAADuYFqKwU00SWGxStiLqadl-e6rNqLgKFk",
    }
});

const loadDataFromLocalstorage = () => {
    const defaultText = `<div class="default-text">
                            <h1>GasuGPT</h1>
                            <p>Начни изучать возможности AI.<br>Твоя история начинается здесь и сейчас.</p>
                        </div>`

    chatContainer.innerHTML = localStorage.getItem("all-chats") || defaultText;
    chatContainer.scrollTo(0, chatContainer.scrollHeight);
}

const createChatElement = (content, className) => {

    const chatDiv = document.createElement("div");
    chatDiv.classList.add("chat", className);
    chatDiv.innerHTML = content;
    return chatDiv;
}

const getTextResponse = (text) => {
    const inner = incomingChatDiv.querySelector(".inner");
    inner.innerHTML = '';

    const converter = new showdown.Converter();
    const htmlContent = converter.makeHtml(text.trim());
    inner.innerHTML = htmlContent;
    for (let el of inner.querySelectorAll("code")) {
        let html = el.innerHTML;

        html = html.replace(/&#39;/g, '\'')
            .replace(/&gt;/g, '>')
            .replace(/&lt;/g, '<')
            .replace(/&quot;/g, '"')
            .replace(/&amp;/g, '&');

        let result = hljs.highlightAuto(html);

        el.className = `hljs lang-${result.language} `;
        el.innerHTML = result.value;
        if (el.parentElement.tagName.toLowerCase() === "pre") {
            let copyCode = document.createElement("span");
            copyCode.setAttribute("onClick", "copyResponse(this, \"code\")");
            copyCode.className = "material-symbols-rounded copy-code";
            copyCode.textContent = "content_copy";
            el.parentElement.appendChild(copyCode);
        }
    }

    localStorage.setItem("all-chats", chatContainer.innerHTML);
    chatContainer.scrollTo(0, chatContainer.scrollHeight);
}

const getTextPart = (text) => {
    const inner = incomingChatDiv.querySelector(".inner") || document.createElement("div");
    !inner.classList.contains("inner") && inner.classList.add("inner");
    inner.innerHTML = '';

    const converter = new showdown.Converter();
    const htmlContent = converter.makeHtml(text.trim());
    inner.innerHTML = htmlContent;
    for (let el of inner.querySelectorAll("code")) {
        let html = el.innerHTML;

        html = html.replace(/&#39;/g, '\'')
            .replace(/&gt;/g, '>')
            .replace(/&lt;/g, '<')
            .replace(/&quot;/g, '"')
            .replace(/&amp;/g, '&');

        let result = hljs.highlightAuto(html);

        el.className = `hljs lang-${result.language} `;
        el.innerHTML = result.value;
        if (el.parentElement.tagName.toLowerCase() === "pre") {
            let copyCode = document.createElement("span");
            copyCode.setAttribute("onClick", "copyResponse(this, \"code\")");
            copyCode.className = "material-symbols-rounded copy-code";
            copyCode.textContent = "content_copy";
            el.parentElement.appendChild(copyCode);
        }
    }

    if (!incomingChatDiv.querySelector(".inner")) {
        incomingChatDiv.querySelector(".typing-animation").remove();
        incomingChatDiv.querySelector(".chat-details").appendChild(inner);
    }
}

const getImageResponse = (text) => {
    const inner = document.createElement("div");
    inner.classList.add("inner");

    const image = document.createElement("img");
    const anch = document.createElement("a");

    image.setAttribute("src", text);
    anch.setAttribute("href", text);
    anch.setAttribute("target", "_blank");
    image.setAttribute("width", "220");
    image.setAttribute("height", "220");

    anch.appendChild(image)
    inner.appendChild(anch);

    incomingChatDiv.querySelector(".typing-animation").remove();
    incomingChatDiv.querySelector(".chat-details").appendChild(inner);
    localStorage.setItem("all-chats", chatContainer.innerHTML);
    chatContainer.scrollTo(0, chatContainer.scrollHeight);
}

const copyToClipboard = async (textToCopy) => {

    if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(textToCopy);
    } else {

        const textArea = document.createElement("textarea");
        textArea.value = textToCopy;


        textArea.style.position = "absolute";
        textArea.style.left = "-999999px";

        document.body.prepend(textArea);
        textArea.select();

        try {
            document.execCommand('copy');
        } catch (error) {
            console.error(error);
        } finally {
            textArea.remove();
        }
    }
}

const copyResponse = async (copyBtn, selector = ".inner") => {

    const reponseTextElement = copyBtn.parentElement.querySelector(selector);
    await copyToClipboard(reponseTextElement.textContent);
    copyBtn.textContent = "done";
    setTimeout(() => copyBtn.textContent = "content_copy", 1000);
}

const showTypingAnimation = (type) => {

    const html = `<div class="chat-content">
                    <div class="chat-details">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M160-120v-200q0-33 23.5-56.5T240-400h480q33 0 56.5 23.5T800-320v200H160Zm200-320q-83 0-141.5-58.5T160-640q0-83 58.5-141.5T360-840h240q83 0 141.5 58.5T800-640q0 83-58.5 141.5T600-440H360ZM240-200h480v-120H240v120Zm120-320h240q50 0 85-35t35-85q0-50-35-85t-85-35H360q-50 0-85 35t-35 85q0 50 35 85t85 35Zm0-80q17 0 28.5-11.5T400-640q0-17-11.5-28.5T360-680q-17 0-28.5 11.5T320-640q0 17 11.5 28.5T360-600Zm240 0q17 0 28.5-11.5T640-640q0-17-11.5-28.5T600-680q-17 0-28.5 11.5T560-640q0 17 11.5 28.5T600-600ZM480-200Zm0-440Z"/></svg>
                        <div class="typing-animation">
                            <div class="typing-dot" style="--delay: 0.2s"></div>
                            <div class="typing-dot" style="--delay: 0.3s"></div>
                            <div class="typing-dot" style="--delay: 0.4s"></div>
                        </div>
                    </div>
                    <span onclick="copyResponse(this)" class="material-symbols-rounded">content_copy</span>
                </div>`;

    incomingChatDiv = createChatElement(html, "incoming");
    chatContainer.appendChild(incomingChatDiv);
    chatContainer.scrollTo(0, chatContainer.scrollHeight);

    socket.emit(type, userText);
}

const handleOutgoingChat = (type) => () => {
    userText = chatInput.value.trim();
    if (!userText) return;

    chatInput.value = "";
    chatInput.style.height = `${initialInputHeight}px`;

    const html = `<div class="chat-content"><div class="chat-details"><p>${userText}</p></div></div>`;

    if (chatContainer.querySelector(".default-text")) {
        chatContainer.innerHTML = "";
    }

    const outgoingChatDiv = createChatElement(html, "outgoing");
    chatContainer.appendChild(outgoingChatDiv);
    chatContainer.scrollTo(0, chatContainer.scrollHeight);
    showTypingAnimation(type);
}

socket.on('generate-text', getTextResponse);
socket.on('generate-text-part', getTextPart);
socket.on('generate-image', getImageResponse);

deleteButton.addEventListener("click", () => {
    dialog.classList.add("active");
});

yesButton.addEventListener("click", () => {
    localStorage.removeItem("all-chats");
    loadDataFromLocalstorage();
    dialog.classList.remove("active");
});

noButton.addEventListener("click", () => {
    dialog.classList.remove("active");
});

chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
        e.preventDefault();
        handleOutgoingChat();
    }
});

loadDataFromLocalstorage();
getTextButton.addEventListener("click", handleOutgoingChat('text'));

getTextButton.addEventListener("keypress", (event) => {
    let keyCode = event.keyCode || event.which;
    if (keyCode === 13 && !event.shiftKey) {
        event.preventDefault();
        handleOutgoingChat('text');
    }
});
/*getImageButton.addEventListener("click", handleOutgoingChat('image'));*/

