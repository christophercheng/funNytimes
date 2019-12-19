export {
  NODE_BODY,
  NODE_ADS,
  NODE_PARAGRAPHS,
  NODE_TITLE_SPANS,
  NODE_ARTICLE,
  NODE_ARTICLE_HEADER_NAV,
  NODE_HEADER_TITLES,
  NODE_PAYWALL 
} from "./documentCache.js";

import getUpdatedCacheWith from "./documentCache.js";

export default (function createClosure() {

  let currentPage;
  let cachedDocumentData = {};

  return function getDocumentData(requestedNodes={}) {

    (function resetCacheIfNewPage() {
      if (currentPage != window.location.href) {
        currentPage = window.location.href,
        cachedDocumentData = { isArticlePage: currentPage.includes('.html') };
      }
    })();  

    Object.keys(requestedNodes).forEach(function(requestedNode) {
      cachedDocumentData = getUpdatedCacheWith(requestedNode, cachedDocumentData);
    });
    
    return cachedDocumentData; // return everything and let the caller destructure and get what the way
  }
  
})();