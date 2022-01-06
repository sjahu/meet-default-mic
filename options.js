browser.storage.local.get({ microphoneName: "" }).then((item) => {
  document.querySelector("#microphone-name").value = item.microphoneName;
});

document.querySelector("#options-form").addEventListener("submit", () => {
  browser.storage.local.set({ microphoneName: document.querySelector("#microphone-name").value });
});