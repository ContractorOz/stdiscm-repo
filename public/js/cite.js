const Cite = require("citation-js");

function displayCitation(citation, message, copyBtn) {
  const citationText = document.getElementById("citation");
  message.innerHTML = citation;
  citationText.value = citation;
  copyBtn.style.display = "flex";
}

function citeArticle(info) {
  const message = document.getElementById("modal-citation");
  const result = new Cite(info);
  const citation = result.format("bibliography", {
    format: "text",
    template: "apa",
  });
  displayCitation(citation, message, copyBtn);
}

async function asyncCite(info) {
  openModal();
  const message = document.getElementById("modal-citation");
  const copyBtn = document.getElementById("copyBtn");
  copyBtn.style.display = "none";
  message.innerHTML = "Loading...";
  const result = await Cite.async(info);
  const citation = result.format("bibliography", {
    format: "text",
    template: "apa",
  });
  displayCitation(citation, message, copyBtn);
}

function copyCitation() {
  const copyText = document.getElementById("citation");
  const copyBtn = document.getElementById("copyBtn");

  copyText.select();
  copyText.setSelectionRange(0, 99999);

  navigator.clipboard.writeText(copyText.value);
  copyBtn.innerHTML = "Copied to Clipboard!";

  setTimeout(() => {
    const template = `
      <span class="material-symbols-outlined">
        content_copy
      </span>
      Copy Citation
  `;
    copyBtn.innerHTML = template;
  }, 500);
}
