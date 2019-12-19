import getDocumentData, {NODE_ADS} from "./documentSifter/index.js";

export default function removeAds() {
  if (!getDocumentData().isArticlePage)
    return; // don't remove ads on home page right now

  const ads = getDocumentData({[NODE_ADS]: true})[NODE_ADS];

  for (let ad of ads) 
    ad.remove();
}