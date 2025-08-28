// summarize.js - handles summarization, keywords, suggestions

function splitSentences(text) {
  return text.match(/[^.!?]+[.!?]/g) || [text];
}

function tokenize(text) {
  return text.toLowerCase().match(/\b[a-z]{3,}\b/g) || [];
}

function summarize(length) {
  const text = window.currentText || "";
  if (!text.trim()) return setStatus("No text to summarize");

  const sentences = splitSentences(text);
  const freq = {};
  tokenize(text).forEach(w => freq[w] = (freq[w] || 0) + 1);

  const scored = sentences.map(s => {
    const score = tokenize(s).reduce((a, w) => a + (freq[w] || 0), 0);
    return { s, score };
  });

  scored.sort((a, b) => b.score - a.score);
  const take = length === "short" ? 3 : length === "medium" ? 6 : 9;
  const summary = scored.slice(0, take).map(x => x.s).join(" ");

  document.getElementById("summaryOutput").value = summary;
  document.getElementById("suggestionsOutput").value = suggestionsFor(text);
}

function suggestionsFor(text) {
  let s = [];
  if (splitSentences(text).some(s => s.length > 200)) s.push("Some sentences are too long.");
  if (text.split("\n\n").length < 2) s.push("Add paragraphs for better readability.");
  if ((text.match(/\d+/g) || []).length > 10) s.push("Contains too many numbers.");
  if (text.split(" ").length / 200 > 5) s.push("Text may take long to read.");
  return s.join("\n") || "Looks good!";
}
