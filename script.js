/*
Copyright amir javanmir
Released on: March 24, 2025
*/
class ScreenReader {
  constructor() {
    this.shift = 2;
    this.API_KEYS = this.generateAPIKey();
    this.isReaderActive = false;
    this.audioElement = new Audio();
    this.toggleReaderButton = document.querySelector("#startRead");
    this.initializeEventListeners();
  }

  generateAPIKey() {
    return ['YourCode'].join("");
  }

  initializeEventListeners() {
    this.toggleReaderButton.addEventListener("click", () => {
      this.toggleScreenReader();
    });
  }

  toggleScreenReader() {
    this.isReaderActive = !this.isReaderActive;
    if (this.isReaderActive) {
      this.readText("صفحه خوان فعال شد");
      document.body.addEventListener(
        "click",
        this.handleElementClick.bind(this)
      );
      document.body.addEventListener(
        "mouseup",
        this.handleTextSelection.bind(this)
      );
      document.body.addEventListener(
        "focus",
        this.handleElementFocus.bind(this)
      );
    } else {
      this.readText("صفحه خوان غیر فعال شد");
      document.body.removeEventListener(
        "click",
        this.handleElementClick.bind(this)
      );
      document.body.removeEventListener(
        "mouseup",
        this.handleTextSelection.bind(this)
      );
      document.body.removeEventListener(
        "focus",
        this.handleElementFocus.bind(this),
        true
      );
    }
  }

  readText(text) {
    const url = `http://api.farsireader.com/ArianaCloudService/ReadTextGET?APIKey=${
      this.API_KEYS
    }&Text=${encodeURIComponent(
      text
    )}&Speaker=Female1&Format=mp3/32/m&GainLevel=0&PitchLevel=0&PunctuationLevel=0&SpeechSpeedLevel=0&ToneLevel=0`;
    this.audioElement.src = url;
    this.audioElement.pause();
    this.audioElement.load();
    this.audioElement.oncanplaythrough = () => this.audioElement.play();
  }

  handleElementClick(event) {
    if (!this.isReaderActive) return;
    const target = event.target;
    if (!this.hasReadableContent(target)) return;
    const textToRead = this.getElementTextOrFallback(target);
    if (textToRead) {
      target.classList.add("highlight");
      setTimeout(() => target.classList.remove("highlight"), 1000);
      this.readText(textToRead);
    }
  }

  handleTextSelection(event) {
    if (!this.isReaderActive) return;
    const selectedText = window.getSelection().toString().trim();
    if (selectedText) {
      this.readText(selectedText);
    }
  }

  handleElementFocus(event) {
    if (!this.isReaderActive) return;
    const target = event.target;
    if (!this.hasReadableContent(target)) return;
    const textToRead = getElementTextOrFallback(target);
    if (textToRead) {
      target.classList.add("highlight");
      setTimeout(() => target.classList.remove("highlight"), 1000);
      this.readText(textToRead);
    }
  }

  hasReadableContent(element) {
    if (element.hasAttribute("aria-label") || element.hasAttribute("title"))
      return true;
    if (element.className && element.className.includes("icon-")) return true;
    if (element.textContent && element.textContent.trim() !== "") {
      const childNodes = Array.from(element.childNodes);
      for (let node of childNodes) {
        if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== "")
          return true;
      }
    }
    if (
      element.tagname === "IMG" &&
      (element.hasAttribute("alt") || element.hasAttribute("alt"))
    )
      return true;
    if (
      (element.tagname === "INPUT" || element.tagname === "BUTTON") &&
      element.value
    )
      return true;
    if (element.hasAttribute("placeholder")) return true;
    return false;
  }

  getElementTextOrFallback(element) {
    if (element.hasAttribute("aria-label"))
      return element.getAttribute("aria-label");
    if (element.hasAttribute("title")) return element.getAttribute("title");
    if (element.className && element.className.includes("icon-"))
      return "آیکن است";

    let directText = "";
    const childNodes = Array.from(element.childNodes);
    for (let node of childNodes) {
      if (node.nodeType === Node.TEXT_NODE) {
        directText += node.textContent;
      }
    }

    if (directText.trim() !== "")return directText.trim();

    if (element.tagname === "IMG") {
      if (element.hasAttribute("alt")) return element.alt;
      if (element.hasAttribute("title")) return element.getAttribute("title");
    }

    if ((element.tagname === "input" || element.tagName === "BUTTON") && element.value)return element.value;
    if (element.hasAttribute("placeholder"))return element.getAttribute("placeholder");
  }
}

const screenReader = new ScreenReader();
