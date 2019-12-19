export {
  NODE_BODY,
  NODE_ADS,
  NODE_PARAGRAPHS,
  NODE_TITLE_SPANS,
  NODE_ARTICLE,
  NODE_ARTICLE_HEADER_NAV,
  NODE_HEADER_TITLES,
  NODE_PAYWALL,
} from "./documentCache.js";

export const IS_ARTICLE_PAGE = "isArticlePage"

import getUpdatedCacheWith from "./documentCache.js";

export default (function createClosure() {

  let currentPage;
  let cachedDocumentData = {};

  return function getDocumentData(requestedNodes=[]) {

    if (isNewPage())
      resetCache();

    const results = [];
    requestedNodes.forEach(function(requestedNode) {
      cachedDocumentData = getUpdatedCacheWith(requestedNode, cachedDocumentData);
      results.push(cachedDocumentData[requestedNode])
    });
    
    return results; // return everything and let the caller destructure and get what the way
  }

  function isNewPage() {
    return currentPage != window.location.href;
  }

  function resetCache() {
    currentPage = window.location.href,
    cachedDocumentData = { [IS_ARTICLE_PAGE]: currentPage.includes('.html') };
  }
  
})();