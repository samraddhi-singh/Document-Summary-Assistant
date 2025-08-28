// demo.js
function loadDemo() {
  const demoText = `This is demo text that simulates extracted content.`;
  window.currentText = demoText;

  const summaryBox = document.getElementById("summary");
  if (summaryBox) {
    summaryBox.value = demoText;
  }

  setStatus("✅ Demo content loaded");
}
