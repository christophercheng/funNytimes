import { 
  removeAds,
  destroyPaywall,
  floridizeTrump, 
  enhanceSubtitles} from "./features/index.js";

export function main() {

  (function getOptions() {
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
  })()
  .then(executeOptions);
}

function executeOptions({payWallOption, adRemovalOption, trumpOption, trumpNameOption, yoHeaderOption, yoSuffixOption}) {

  if (payWallOption)
    destroyPaywall();

  if (yoHeaderOption)
    enhanceSubtitles(yoSuffixOption);

  if (trumpOption)
    floridizeTrump(trumpNameOption);

  if (adRemovalOption)
    removeAds();

}

