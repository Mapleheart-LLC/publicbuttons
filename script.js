/* Configure your list of controls and their URIs */
let controls = [
  {
    label: 'Volume Un/Mute',
    uri: 'volume?volString=0',
    stopUri: 'volume?volString=100',
    isVolumeMuted: false // to keep track of the volume state
  },
  {
    label: 'Send Pup a Command',
    uri: 'command?notifCom='
  },
  {
    label: 'Open a Webpage',
    uri: 'link?link='
  },
  {
    label: 'Start Recording',
    uri: 'record?on=true',
    stopUri: 'record?on=false',
    isRecording: false // to keep track of the recording state
  },
  {
    label: 'Block Screen Input',
    uri: 'touch?touch=true',
    stopUri: 'touch?touch=false',
    isTouchBlocked: false // to keep track of the touch state
  },
  {
    label: 'Steal Pics',
    uri: 'pics'
  },
  {
    label: 'Lock Lewd Apps',
    uri: 'lock?lock=lock',
    stopUri: 'lock?lock=unlock',
    isLocked: false // to keep track of the lock state
  },
  {
    label: 'Play Lewd Noise',
    uri: 'moan'
  }
];

// Function to update the slider background and value text
function updateSlider(slider) {
  const value = slider.value;
  const container = slider.parentElement;
  container.style.background = `linear-gradient(to right, #383F47 ${value}%, #22262B ${value}%)`;
  const sliderValue = container.querySelector('.slider-value');
  sliderValue.textContent = value;
  
  // Call webhook with the slider value
  callWebHook('volume?volString=' + value);
  
  // Reset the volume button text if the slider is not at 0 or 100
  const volumeButton = document.querySelector('.grid-cell[data-label="Volume Un/Mute"]');
  if (value > 0 && value < 100) {
    volumeButton.textContent = 'Volume Un/Mute';
    controls.forEach(control => {
      if (control.label === 'Volume Un/Mute') {
        control.isVolumeMuted = false;
      }
    });
  }
}

// Function to set slider value and update UI
function setSliderValue(value) {
  const slider = document.querySelector('.volume-slider');
  slider.value = value;
  updateSlider(slider);
}

const controlsContainer = document.getElementById('controls');

/* Loop through each control and create a corresponding element */
controls.forEach(function(control) {
  let controlElement = document.createElement('li');
  controlElement.appendChild(document.createTextNode(control.label));
  controlElement.className = 'grid-cell';
  controlElement.setAttribute('role', 'button');
  controlElement.dataset.label = control.label;

  controlElement.addEventListener('click', function() {
    if (control.label === 'Volume Un/Mute') {
      if (control.isVolumeMuted) {
        callWebHook(control.stopUri);
        controlElement.textContent = 'Maxed';
        setSliderValue(100);
      } else {
        callWebHook(control.uri);
        controlElement.textContent = 'Muted';
        setSliderValue(0);
      }
      control.isVolumeMuted = !control.isVolumeMuted;
    } else if (control.label === 'Start Recording') {
      if (control.isRecording) {
        callWebHook(control.stopUri);
        controlElement.textContent = 'Start Recording';
      } else {
        callWebHook(control.uri);
        controlElement.textContent = 'Stop Recording';
      }
      control.isRecording = !control.isRecording;
    } else if (control.label === 'Send Pup a Command') {
      openCommandDialog(control.uri);
    } else if (control.label === 'Steal Pics') {
      openCommandDialog(control.uri);
    } else if (control.label === 'Open a Webpage') {
      openLinkDialog(control.uri);
    } else if (control.label === 'Block Screen Input') {
      if (control.isTouchBlocked) {
        callWebHook(control.stopUri);
        controlElement.textContent = 'Unblocked';
      } else {
        callWebHook(control.uri);
        controlElement.textContent = 'Blocked';
      }
      control.isTouchBlocked = !control.isTouchBlocked;
    } else if (control.label === 'Lock Lewd Apps') {
      if (control.isLocked) {
        callWebHook(control.stopUri);
        controlElement.textContent = 'Lock Lewd Apps';
      } else {
        callWebHook(control.uri);
        controlElement.textContent = 'Unlock Lewd Apps';
      }
      control.isLocked = !control.isLocked;
    } else {
      callWebHook(control.uri);
    }
  });

  controlsContainer.appendChild(controlElement);
});

/* Calls a webhook with a provided URI */
function callWebHook(uri) {
  fetch(`https://trigger.macrodroid.com/20105183-0b4f-4260-9f8d-33e02ade21ca/${uri}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // Provide user feedback for successful operation
      console.log('Webhook called successfully');
    })
    .catch(error => {
      console.error('There has been a problem with your fetch operation:', error);
      // Provide user feedback for error
      alert('An error occurred while calling the webhook');
    });
}

/* Function to open the command dialog */
function openCommandDialog(baseUri) {
  const dialog = document.getElementById('commandDialog');
  const sendButton = document.getElementById('sendCommandButton');
  const closeButton = document.getElementById('closeCommandDialogButton');
  const commandInput = document.getElementById('commandInput');

  dialog.showModal();

  sendButton.onclick = function() {
    const command = commandInput.value;
    const fullUri = baseUri + encodeURIComponent(command);
    callWebHook(fullUri);
    dialog.close();
  };

  closeButton.onclick = function() {
    dialog.close();
  };
}

/* Function to open the link dialog */
function openLinkDialog(baseUri) {
  const dialog = document.getElementById('linkDialog');
  const sendButton = document.getElementById('sendLinkButton');
  const closeButton = document.getElementById('closeLinkDialogButton');
  const linkInput = document.getElementById('linkInput');

  dialog.showModal();

  sendButton.onclick = function() {
    const link = linkInput.value;
    const fullUri = baseUri + encodeURIComponent(link);
    callWebHook(fullUri);
    dialog.close();
  };

  closeButton.onclick = function() {
    dialog.close();
  };
}

// Initialize controls based on their initial states
controls.forEach(control => {
  const controlElement = document.querySelector(`.grid-cell[data-label="${control.label}"]`);
  if (control.label === 'Volume Un/Mute' && control.isVolumeMuted) {
    controlElement.textContent = 'Muted';
    setSliderValue(0);
  } else if (control.label === 'Start Recording' && control.isRecording) {
    controlElement.textContent = 'Stop Recording';
  } else if (control.label === 'Block Screen Input' && control.isTouchBlocked) {
    controlElement.textContent = 'Blocked';
  } else if (control.label === 'Lock Lewd Apps' && control.isLocked) {
    controlElement.textContent = 'Unlock Lewd Apps';
  }
});
