import getDocumentData from "./documentSifter/index.js";

export default function removeAds() {
  if (!getDocumentData().isArticlePage)
    return; // don't remove ads on home page right now

  const {ads} = getDocumentData({ads: true});

  for (let ad of ads) 
    ad.remove();
}