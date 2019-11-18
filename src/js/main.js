import { 
  removeAds,
  destroyPaywall,
  floridizeTrump, 
  enhanceSubtitles} from "./features/index.js";

export function main() {
  getSavedOptions()
  .then(executeThem);
}

function executeThem(options) {
  const {
    payWallOption,
    adRemovalOption,
    trumpOption,
    trumpNameOption,
    yoHeaderOption,
    yoSuffixOption} = options;

  if (payWallOption)
    destroyPaywall();

  if (yoHeaderOption)
    enhanceSubtitles(yoSuffixOption);

  if (trumpOption)
    floridizeTrump(trumpNameOption);

  if (adRemovalOption)
    removeAds();
}

function getSavedOptions() {
  return new Promise(function(resolve) {
    chrome.storage.sync.get({
      payWallOption: true,
      adRemovalOption: true,
      trumpOption: true,
      trumpNameOption: 'florida man',
      yoSuffixOption: 'Yo',
      yoHeaderOption: true
    }, resolve)
  });
}
