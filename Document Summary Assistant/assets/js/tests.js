// tests.js - self-test & unit tests

function runSelfTest() {
  if (window.pdfjsLib) setStatus("PDF.js ready (self-test passed)");
  else setStatus("PDF.js not loaded");

  if (window.Tesseract) setStatus("Tesseract.js ready");
  else setStatus("Tesseract.js not loaded");
}

function runUnitTests() {
  const sample = "This is a test. Another sentence. Important text!";
  window.currentText = sample;
  summarize("short");
  const out = document.getElementById("summaryOutput").value;
  alert("Unit test summary: " + out);
}
