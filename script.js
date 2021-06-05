const videoMediaElement = document.getElementById("video")
const button = document.getElementById("picture-button")
const warningLable = document.getElementById('warning-lable')

async function selectMediaStream() {
    // checks if Browser supports Picture in Picture
    if ('pictureInPictureEnabled' in document)
    {
        // Hides PnP button until a Media Stream is selected.
        button.style.visibility = 'hidden';
        try {
            const mediaStream = await navigator.mediaDevices.getDisplayMedia();
            videoMediaElement.srcObject = mediaStream;
            videoMediaElement.onloadedmetadata = () => {
                videoMediaElement.play();}
            setButtonTextAuto();
            button.style.visibility = 'visible';
        }
        catch (error) {
            console.log('Error getting media stream', error);
        }
    }
    else{
        button.hidden = true;
        warningLable.textContent = 'THis browser does not support Picture In Picture.  Pleae try anpther browser';
    }
}

// function setButtonText(buttonMessage) {
//         button.innerText = buttonMessage
// }

function setButtonTextAuto() {
    // Checks the status of the PnP element and set button text
    if (null == document.pictureInPictureElement)
    {
        button.innerText = "Enable PNP"
    }
    else {
        button.innerText = "Disable PNP"
    }
}

// if Picture in picture not active
if (null !== document.pictureInPictureElement)
// enable button
button.disabled = false;
// set button click event to start picture in picture
button.addEventListener('click', async () => {
        // disable button    
    if (null == document.pictureInPictureElement)
    {
        button.disabled = true;
        // Start Picture in Picture
        await videoMediaElement.requestPictureInPicture();
        // Reset button
        button.disabled = false;
        // setButtonText("Disable PNP");
        // changes button text
        setButtonTextAuto();
    }
    else {
        document
            .exitPictureInPicture()
            .catch(error => {
                console.log('An error happened when exiting PnP', error);
            })
            // setButtonText("Enable PNP");
            setButtonTextAuto();
        }
});

// On Load
selectMediaStream();