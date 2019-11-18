import getDocumentData, {NODE_BODY, NODE_ARTICLE, NODE_PAYWALL} from "./documentSifter.js";

export const MAX_SEARCH_ATTEMPTS = 8;
export const MS_BETWEEN_SEARCH_ATTEMPTS = 500;


export default function() 
{
  if (!getDocumentData().isArticlePage)
    return; // don't remove ads on home page right now

  (function rinseAndRepeat(options={}) { 
    let {
      numPreviousAttempts = 0,
      maxSearchAttempts = MAX_SEARCH_ATTEMPTS,
      msBetweenAttempts = MS_BETWEEN_SEARCH_ATTEMPTS
    } = options;

    if (numPreviousAttempts >= maxSearchAttempts)
      return;

    wait((numPreviousAttempts === 0) ? 0 : msBetweenAttempts)
    .then(function() {
      if (!findAndDestroyPaywall())
        rinseAndRepeat({
          ...options,
          numPreviousAttempts: numPreviousAttempts + 1
        });
    });    
  })();
}

function findAndDestroyPaywall() {
  let {paywall} = getDocumentData({[NODE_PAYWALL]: true});
  if (!paywall)
    return false;
  paywall.parentNode.removeChild(paywall);
  const {body, article} = getDocumentData({[NODE_BODY]: true,[NODE_ARTICLE]: true});
  body.prepend(article);
  return true;
}

export function wait(msTime) {
  return new Promise(function(resolve,reject) {
    setTimeout(resolve, msTime);
  });
};
