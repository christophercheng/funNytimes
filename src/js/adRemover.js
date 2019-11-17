import documentCache from "./documentSifter.js";

export default function removeAds() {
  if (documentCache.isHomePage())
    return; // don't remove ads on home page right now

  const {ads} = documentCache.getDocumentNodes({ads: true});

  for (let ad of ads) 
    ad.remove();
}