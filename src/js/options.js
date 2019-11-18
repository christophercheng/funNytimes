let payWallOption;
let adRemovalOption;
let trumpOption;
let trumpNameOption;
let yoHeaderOption;
let yoSuffixOption;
let closeButton;
let statusSpan;

function assignNodeReferences() {
  payWallOption = document.getElementById("payWallOption");
  adRemovalOption = document.getElementById("adRemovalOption");
  trumpOption  = document.getElementById("trumpOption");
  trumpNameOption = document.getElementById("trumpNameOption");
  yoHeaderOption  = document.getElementById("yoHeaderOption");
  yoSuffixOption = document.getElementById("yoSuffixOption");
  closeButton = document.getElementById('closeButton');
  statusSpan = document.getElementById('status');
}

// Saves options to chrome.storage
function save_options() {

  chrome.storage.sync.set({
    payWallOption: payWallOption.checked,
    adRemovalOption: adRemovalOption.checked,
    trumpOption: trumpOption.checked,
    trumpNameOption: trumpNameOption.value.toLowerCase,
    yoHeaderOption: yoHeaderOption.checked,
    yoSuffixOption: yoSuffixOption.value.toLowerCase,
  }, function() {
    closeButton.setAttribute('disabled','disabled');
    statusSpan.textContent = 'Options saved...';
    const currentWindow = window;
    setTimeout(function() {
      currentWindow.close();
    }, 1000);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  assignNodeReferences();
  chrome.storage.sync.get({
    payWallOption: true,
    adRemovalOption: true,
    trumpOption: true,
    trumpNameOption: 'florida man',
    yoHeaderOption: true,
    yoSuffixOption: 'yo'
  }, function(items) {
    payWallOption.checked = items.payWallOption;
    adRemovalOption.checked = items.adRemovalOption;
    trumpOption.checked = items.trumpOption;
    trumpNameOption.value = items.trumpNameOption.slice(0,25).toLowerCase();
    yoSuffixOption.value = items.yoSuffixOption.slice(0,25).toLowerCase();
    yoHeaderOption.checked = items.yoHeaderOption;
    closeButton.addEventListener("click", function() {save_options()});
    closeButton.removeAttribute('disabled');
  });
}
document.addEventListener('DOMContentLoaded', restore_options);


