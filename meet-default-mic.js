const microphoneLabel = "Microphone: ";

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getMicrophone(microphoneName) {
    return document.evaluate(`//span[text()='${microphoneName}']`, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
}

function getMicrophoneMenu() {
    return document.querySelector(`[aria-label^='${microphoneLabel}']`);
}

async function setMicrophone(microphoneName) {
    // Open microphone selector
    do {
        await sleep(100);
    } while (!getMicrophoneMenu());
    getMicrophoneMenu().click();

    // Select microphone
    do {
        await sleep(100);
    } while (!getMicrophone(microphoneName));
    getMicrophone(microphoneName).click();
}

browser.storage.local.get("microphoneName").then((item) => setMicrophone(item.microphoneName));
