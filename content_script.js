(async () => {
try {
  const src = chrome.extension.getURL('src/js/main.js');
  const contentScript = await import(src);
  contentScript.main(/* chrome: no need to pass it */);
}
catch(error) {
  console.log('error: ', error);
}
})();