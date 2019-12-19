import getDocumentData, {NODE_HEADER_TITLES} from "./documentSifter/index.js";

export default function yoTheHeader(suffix) {
  const documentData = getDocumentData({[NODE_HEADER_TITLES]: true});
  const headerTitles = documentData[NODE_HEADER_TITLES];

  if (!headerTitles.length)
    return;
  for (let title of headerTitles) {
  if (title.hasAttribute('aria-label'))
    continue;
   let innerHTML = title.innerHTML;
   title.innerHTML = innerHTML.trim() + ", " + suffix;
  }
}
