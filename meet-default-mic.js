const optionsLabel = "More options";
const settingsLabel = "Settings";
const microphoneLabel = "Select Microphone";
const microphoneBlocked = "Microphone is blocked";
const closeLabel = "Close dialog";

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getOptions() {
    return document.querySelector(`button[aria-label='${optionsLabel}']`);
}

function getSettings() {
    return document.evaluate(`//span[text()='${settingsLabel}']`, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
}

function getMicrophone(microphoneName) {
    return document.evaluate(`//span[text()='${microphoneName}']`, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
}

function getMicrophoneMenu() {
    let foo = document.querySelector(`[data-aria-label='${microphoneLabel}']`);
    if (foo) {
        let bar = foo.querySelector("[aria-haspopup='listbox']");
        if (bar.innerText != microphoneBlocked) {
            return bar;
        }
        return null;
    }
    return null;
}

function getClose() {
    let foo = document.querySelector(`[aria-label='${settingsLabel}']`);
    if (foo) {
        return foo.querySelector(`[aria-label='${closeLabel}']`);
    }
    return null;
}

async function setMicrophone(microphoneName) {
    // Open options menu
    while (!getOptions()) {
        await sleep(100);
    }
    getOptions().click();

    // Open settings pane
    while (!getSettings()) {
        await sleep(100);
    }
    getSettings().click();

    // Open microphone selector
    while (!getMicrophoneMenu()) {
        await sleep(100);
    }
    getMicrophoneMenu().click();

    // Wait for the desired microphone to be connected
    while (!getMicrophone(microphoneName)) {
        await sleep(100);
    }

    // Open microphone selector (again)
    while (!getMicrophoneMenu()) {
        await sleep(100);
    }
    getMicrophoneMenu().click();

    // Select microphone
    while (!getMicrophone(microphoneName)) {
        await sleep(100);
    }
    getMicrophone(microphoneName).click();

    // Close settings pane
    getClose().click();
}

browser.storage.local.get("microphoneName").then((item) => setMicrophone(item.microphoneName));
