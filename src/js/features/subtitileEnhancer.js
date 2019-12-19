import getDocumentData from "./documentSifter/index.js";

export default function yoTheHeader(suffix) {
  const {headerTitles} = getDocumentData({headerTitles: true});

  if (!headerTitles.length)
    return;
  for (let title of headerTitles) {
  if (title.hasAttribute('aria-label'))
    continue;
   let innerHTML = title.innerHTML;
   title.innerHTML = innerHTML.trim() + ", " + suffix;
  }
}
