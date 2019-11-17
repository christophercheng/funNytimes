const NODE_BODY="body";
const NODE_ADS = "ads";
const NODE_PARAGRAPHS = "paragraphs";
const NODE_TITLE_SPANS = "titleSpans";
const NODE_ARTICLE = "article";
const NODE_HEADER_TITLES="headerTitles";

export default (function() {

  let currentPage=window.location.href;
  let currentNodes = {};

  function resetDocumentData() {
    currentPage = window.location.href;
    currentNodes = {};
  }

  function isHomePage() {
    return !(currentPage.includes('.html'));
  }

  function getDocumentNodes(requestedNodes) {
    if (currentPage !== window.location.href) {
      resetDocumentData();
    }
    let {body, titleSpans, article, paragraphs, ads = [], headerTitles=[]} = currentNodes;

    if (shouldFetch(NODE_BODY)) { // always going to need to get body 
      fetchBody();
    }
    if (shouldFetch(NODE_ARTICLE)) { // always going to need to get article
      fetchArticle();
    }
    if (shouldFetch(NODE_PARAGRAPHS) || shouldFetch(NODE_ADS)) {
      fetchParagraphsAndAds();
    }
    if (shouldFetch(NODE_TITLE_SPANS)) {
      fetchTitleSpans();
    }
    if (shouldFetch(NODE_HEADER_TITLES)) {
      fetchHeaderTitles();
    }

    function shouldFetch(node) {
      // only sift through the dom if the node is requested and hasn't already been fetched/cached
      switch (node) {

        case NODE_BODY:
          return !body;

        case NODE_ARTICLE:
          return (
            !isHomePage()
            && !article);

        case NODE_PARAGRAPHS: 
          return (
            NODE_PARAGRAPHS in requestedNodes
              && !paragraphs);

        case NODE_TITLE_SPANS:
          return (
            NODE_TITLE_SPANS in requestedNodes 
              && !titleSpans);
              
        case NODE_ADS:
          return (
            NODE_ADS in requestedNodes 
              && article 
              && (!ads.length || !paragraphs));

        case NODE_HEADER_TITLES:
          return (
            NODE_HEADER_TITLES in requestedNodes
              && !headerTitles.length);

        default:
          return true;
      }
    };

    function fetchHeaderTitles() {
      if (!isHomePage()){
        const sections = document.getElementsByTagName('section');
        if (sections) {
          const goodSections = Array.prototype.filter.call(sections, function(section) {
            return (!(
              section.hasAttribute("name") 
              || section.hasAttribute("aria-labelledby")
              || section.id
              || section.parentNode.tagName.toLowerCase() !== "header"
            ))
          });
          if (goodSections && goodSections.length === 1 && goodSections[0].children[1])
              headerTitles.push(goodSections[0].children[1].getElementsByTagName('a')[0]);
        }
      }
      else {
        const h1s = document.getElementsByTagName('h1');
        headerTitles = [...headerTitles, ...Array.from(h1s)];
      }
      currentNodes[NODE_HEADER_TITLES] = headerTitles;
    };

    function fetchParagraphsAndAds() {
      const scope = isHomePage() ? body : article;
      paragraphs = scope.getElementsByTagName('p');   
      if (paragraphs) {
        paragraphs = Array.prototype.filter.call(paragraphs, p => {
          if (p.innerHTML.toLowerCase() === "advertisement") {
            ads.push(p.parentNode.parentNode);
            return false;
          }
          return true;
        });
        currentNodes[NODE_PARAGRAPHS] = paragraphs;
        currentNodes[NODE_ADS]= ads;
      }
    };

    function fetchArticle() {
      article = document.getElementsByTagName("article")[0];
      currentNodes[NODE_ARTICLE] = article;
    };

    function fetchTitleSpans() {
      titleSpans = [];
      const titleElement = isHomePage() ? "h2" : "h1";
      const titles = document.getElementsByTagName(titleElement);
      for (let title of titles) {
        const spans = title.getElementsByTagName('span');
        if (spans.length) {
          for (let span of spans)
            titleSpans.push(span);
        } else {
          titleSpans.push(title);
        }
      }
      currentNodes[NODE_TITLE_SPANS] = titleSpans;
    };

    function fetchBody() {
      body = document.getElementsByTagName(NODE_BODY)[0];
      currentNodes[NODE_BODY] = body;
    };

    return {
      body,
      titleSpans,
      article,
      paragraphs,
      ads,
      headerTitles
    };
  }

  return {
    isHomePage,
    getDocumentNodes,
  };
})();

