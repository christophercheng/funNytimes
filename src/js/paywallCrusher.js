import * as config from "./config.js";
import documentCache, {NODE_BODY, NODE_ARTICLE, NODE_PAYWALL} from "./documentSifter.js";

export default function searchAndDestroyPaywall() 
{
  if (documentCache.isHomePage())
    return; // don't remove ads on home page right now

  (function rinseAndRepeat(options={}) { 
    let {
      numPreviousAttempts = 0,
      maxSearchAttempts = config.MAX_SEARCH_ATTEMPTS,
      msBetweenAttempts = config.MS_BETWEEN_SEARCH_ATTEMPTS
    } = options;

    if (numPreviousAttempts >= maxSearchAttempts)
      return;

    wait((numPreviousAttempts === 0) ? 0 : msBetweenAttempts)
    .then(function() {
      let document = documentCache.getDocumentNodes({[NODE_PAYWALL]: true});
      if (NODE_PAYWALL in document){
        document = documentCache.getDocumentNodes({[NODE_BODY]: true,[NODE_ARTICLE]: true});
        destroyPaywall(document);
      }
      else 
        rinseAndRepeat({
          ...options,
          numPreviousAttempts: numPreviousAttempts + 1
        });
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

export function wait(msTime) {
  return new Promise(function(resolve,reject) {
    setTimeout(resolve, msTime);
  });
};
