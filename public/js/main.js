// uncomment line below to register offline cache service worker 
// navigator.serviceWorker.register('../serviceworker.js');

if (typeof fin !== 'undefined') {
    init();
} else {
    document.querySelector('#of-version').innerText =
        'The fin API is not available - you are probably running in a browser.';
}

// once the DOM has loaded and the OpenFin API is ready
async function init() {
    // get a reference to the current Application.
    const app = await fin.Application.getCurrent();
    const win = await fin.Window.getCurrent();

    const ofVersion = document.querySelector('#of-version');
    ofVersion.innerText = await fin.System.getVersion();
    document.addEventListener('keypress', async (e) => {
        if(e.ctrlKey && e.code === "NumpadAdd" && e.key === "+") {
            const zoomLevel = await win.getZoomLevel();
            console.log(zoomLevel)
            win.setZoomLevel(zoomLevel + 1)
        }
        if(e.ctrlKey && e.code === "NumpadSubtract" && e.key === "-") {
            const zoomLevel = await win.getZoomLevel();
            console.log(zoomLevel)
            win.setZoomLevel(zoomLevel - 1)
        }
        console.dir(e, {depth: null, colors: true})
    })


    // only launch new windows from the main window.
    if (win.identity.name === app.identity.uuid) {
        // subscribing to the run-requested events will allow us to react to secondary launches, clicking on the icon once the Application is running for example.
        // for this app we will  launch a child window the first the user clicks on the desktop.
        const createWindowBtn = document.querySelector('#create-window');
        createWindowBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            await fin.Window.create({
                name: `child-${new Date(Date.now()).toTimeString().slice(0, 8)}`,
                url: location.href,
                defaultWidth: 320,
                defaultHeight: 320,
                autoShow: true
            });
        })
    }
}
