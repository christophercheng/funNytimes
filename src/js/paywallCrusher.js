import * as config from "./config.js";
import documentCache from "./documentSifter.js";

export default function searchAndDestroyPaywall() 
{
  if (documentCache.isHomePage())
    return; // don't remove ads on home page right now

  const {body,article} = documentCache.getDocumentNodes({body: true,article: true});

  (function rinseAndRepeat(options={}) { 
    let {
      numPreviousAttempts = 0,
      maxSearchAttempts = config.MAX_SEARCH_ATTEMPTS,
      msBetweenAttempts = config.MS_BETWEEN_SEARCH_ATTEMPTS
    } = options;

    if (numPreviousAttempts++ >= maxSearchAttempts)
      return;

    wait((numPreviousAttempts === 1) ? 0 : msBetweenAttempts)
    .then(function() {
      const paywall = searchForPayWall();
      if (paywall)
        destroyPaywall({paywall,body,article});
      else 
        rinseAndRepeat(options);
    });    
  })();
}

function destroyPaywall({
  paywall,
  body,
  article
}) {
  paywall.parentNode.removeChild(paywall);
  body.prepend(article);
}

function searchForPayWall() {
  return document.getElementById("gateway-content");
}

export function wait(msTime) {
  return new Promise(function(resolve,reject) {
    setTimeout(resolve, msTime);
  });
};
