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
    do {
        await sleep(100);
    } while (!getOptions());
    getOptions().click();

    // Open settings pane
    do {
        await sleep(100);
    } while (!getSettings());
    getSettings().click();

    // Open microphone selector
    do {
        await sleep(100);
    } while (!getMicrophoneMenu());
    getMicrophoneMenu().click();

    await sleep(100);
    if (!getMicrophone(microphoneName)) {
        // Wait for the desired microphone to be connected
        do {
            await sleep(100);
        } while (!getMicrophone(microphoneName));

        // Open microphone selector (again)
        do {
            await sleep(100);
        } while (!getMicrophoneMenu());
        getMicrophoneMenu().click();
    }

    // Select microphone
    do {
        await sleep(100);
    } while (!getMicrophone(microphoneName));
    getMicrophone(microphoneName).click();

    // Close settings pane
    await sleep(250);
    getClose().click();
}

browser.storage.local.get("microphoneName").then((item) => setMicrophone(item.microphoneName));
