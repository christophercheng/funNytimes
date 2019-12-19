import getDocumentData from "./documentSifter/index.js";

export const TRUMP_REGEX = new RegExp("(mr. )?(president )?(donald )?(trump)", "gi");

export default function makeFloridaManTan(nickname) {

  const {titleSpans, paragraphs} = getDocumentData({titleSpans: true, paragraphs: true});

  for (let node of [...titleSpans, ...paragraphs])
    replaceParagraphText(node, TRUMP_REGEX, capitalizeWords(nickname));
}

function capitalizeWords(phrase) {
  return phrase.split(' ')
    .map(function(word) { return word[0].toUpperCase() + word.slice(1);})
    .join(' ');
}

function replaceParagraphText(node, regexp, newText) {
  const innerHTML = node.innerHTML;
  const nextHTML = innerHTML.replace(regexp, newText);  
  if (nextHTML !== innerHTML) {
    node.innerHTML =  nextHTML;
  } 
}
