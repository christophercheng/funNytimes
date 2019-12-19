import getDocumentData,
{
  NODE_BODY,
  NODE_ARTICLE,
  NODE_PAYWALL,
  NODE_ARTICLE_HEADER_NAV
} from "./documentSifter/index.js";

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
      const paywall = findPaywall();
      if (!paywall)
        rinseAndRepeat({
          ...options,
          numPreviousAttempts: numPreviousAttempts + 1
        });
      else {
        destroy(paywall);
        liftArticle();
      }
    });    
  })();
}

function findPaywall() {
  let documentData = getDocumentData({[NODE_PAYWALL]: true});
  return documentData[NODE_PAYWALL];
}

function destroy(paywall) {
  paywall.parentNode.removeChild(paywall);
}

function liftArticle() {
  let documentData = getDocumentData({
    [NODE_BODY]: true,
    [NODE_ARTICLE]: true,
    [NODE_ARTICLE_HEADER_NAV]: true});
  const body = documentData[NODE_BODY];
  const article = documentData[NODE_ARTICLE];
  const articleHeaderNav = documentData[NODE_ARTICLE_HEADER_NAV];
  
  body.prepend(articleHeaderNav, article);
}

export function wait(msTime) {
  return new Promise(function(resolve) {
    setTimeout(resolve, msTime);
  });
};
