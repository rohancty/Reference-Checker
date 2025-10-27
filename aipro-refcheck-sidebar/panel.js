const abstractEl = document.getElementById("abstract");
const wordCountEl = document.getElementById("abstractWordCount");

function updateWordCount() {
  const text = abstractEl.value.trim();
  const words = text.length === 0 ? 0 : text.split(/\s+/).length;
  wordCountEl.textContent = "Word count: " + words;
}

abstractEl.addEventListener("input", updateWordCount);
updateWordCount();

document.getElementById("openBtn").addEventListener("click", async () => {
  const authors = document.getElementById("authors").value.trim();
  const abstract = abstractEl.value.trim();
  const refs = document.getElementById("references").value.trim();

  const text = `Perform the following checks on the manuscript’s reference list:

1. Identify Self-Citations: Check if any references are authored or co-authored by the manuscript’s authors. Highlight these self-citations.

2. Assess Relevance of Citations: Review each reference in the context of the paper’s abstract/topic. Flag any citations that appear unrelated or only marginally relevant to the core topics.

Information to use for the check:

Author(s) of the paper: ${authors}

Abstract or summary of the paper: ${abstract}

Manuscript reference list: ${refs}`;

  try {
    await navigator.clipboard.writeText(text);
    chrome.tabs.create({ url: "https://aipro.elsevier.net/" });
  } catch (err) {
    alert("Failed to copy text: " + err);
  }
});