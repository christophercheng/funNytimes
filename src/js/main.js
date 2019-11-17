import makeFloridaManTan from "./floridaMan.js";
import searchAndDestroyPaywall from "./paywallCrusher.js";
import yoTheHeader from "./headerYo.js";
import removeAds from "./adRemover.js";

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
    searchAndDestroyPaywall();

  if (yoHeaderOption)
    yoTheHeader(yoSuffixOption);

  if (trumpOption)
    makeFloridaManTan(trumpNameOption);

  if (adRemovalOption)
    removeAds();

}

