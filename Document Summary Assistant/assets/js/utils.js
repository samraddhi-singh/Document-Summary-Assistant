// utils.js - general helpers

function setStatus(msg) {
  document.getElementById("status").innerText = msg;
}

function toast(msg) {
  alert(msg); // simple fallback, can be upgraded to custom toast
}

function downloadSummary() {
  const text = document.getElementById("summaryOutput").value;
  const blob = new Blob([text], { type: "text/plain" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "summary.txt";
  a.click();
}

function copySummary() {
  const text = document.getElementById("summaryOutput").value;
  navigator.clipboard.writeText(text).then(() => toast("Summary copied!"));
}

// Dynamic script loader
function loadScript(src) {
  return new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = src;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.head.appendChild(s);
  });
}
