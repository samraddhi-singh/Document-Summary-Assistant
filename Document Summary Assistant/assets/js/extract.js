// extract.js - PDF.js & OCR extraction
let currentFile = null;
window.currentText = "";

async function ensurePDFJS() {
  if (window.pdfjsLib) return;
  await loadScript("https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.min.js");
  pdfjsLib.GlobalWorkerOptions.workerSrc =
    "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js";
}

async function ensureTesseract() {
  if (window.Tesseract) return;
  await loadScript("https://cdnjs.cloudflare.com/ajax/libs/tesseract.js/5.0.1/tesseract.min.js");
}

async function extract() {
  if (!currentFile) {
    return setStatus("❌ No file selected");
  }

  const name = currentFile.name.toLowerCase();

  if (name.endsWith(".pdf")) {
    await ensurePDFJS();
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const pdf = await pdfjsLib.getDocument({ data: new Uint8Array(reader.result) }).promise;
        let text = "";
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          text += content.items.map(it => it.str).join(" ") + "\n\n";
        }
        window.currentText = text;

        // ✅ Show extracted text in the textarea
        document.getElementById("summary").value = text;

        setStatus(`✅ Extracted text from ${pdf.numPages} pages`);
      } catch (err) {
        console.error(err);
        setStatus("❌ Failed to extract PDF text: " + err.message);
      }
    };
    reader.readAsArrayBuffer(currentFile);
  } else if (name.endsWith(".png") || name.endsWith(".jpg") || name.endsWith(".jpeg")) {
    await ensureTesseract();
    setStatus("⏳ Running OCR on image...");

    try {
      const { data: { text } } = await Tesseract.recognize(currentFile, "eng");
      window.currentText = text;

      // Show extracted text in the textarea if it exists
const summaryBox = document.getElementById("summary");
if (summaryBox) {
  summaryBox.value = text;
}


      setStatus("✅ OCR extraction complete");
    } catch (err) {
      console.error(err);
      setStatus("❌ OCR failed: " + err.message);
    }
  } else {
    setStatus("❌ Unsupported file type. Upload PDF, JPG, or PNG.");
  }
}
