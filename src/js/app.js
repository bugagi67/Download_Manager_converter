const links = document.querySelectorAll(".file-list a");
const downloadedSizeElement = document.getElementById("downloaded-size");
const fileContainer = document.querySelector(".converter_cont");
const fileInput = document.querySelector("#pdf-file-input");
const textArea = document.querySelector("#res");
let totalDownloaded = 0;

links.forEach((link) => {
  const dataUrl = link.getAttribute("data-file");

  const base64String = dataUrl.split(",")[1];
  const fileSizeInBytes =
    base64String.length * (3 / 4) -
    (base64String.endsWith("==") ? 2 : base64String.endsWith("=") ? 1 : 0);
  const fileSizeInMb = fileSizeInBytes / (1024 * 1024);

  const fileSizeElement = link.previousElementSibling;
  fileSizeElement.textContent = `${fileSizeInMb.toFixed(2)} Mb`;

  link.addEventListener("click", (event) => {
    event.preventDefault();

    const fileName =
      link.previousElementSibling.previousElementSibling.textContent
        .trim()
        .replace(/\s+/g, "_") + ".pdf";

    totalDownloaded += fileSizeInMb;
    downloadedSizeElement.textContent = totalDownloaded.toFixed(2);

    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  });
});

function convertPdfToDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);

    reader.readAsDataURL(file);
  });
}

async function handleFile(file) {
  try {
    if (!file || file.type !== "application/pdf") {
      throw new Error("Файл должен быть формата PDF.");
    }

    const dataURL = await convertPdfToDataURL(file);
    textArea.value = "";
    textArea.value = dataURL;
    console.log("PDF файл успешно преобразован в Data URL:", dataURL);
  } catch (error) {
    textArea.value = "";
    textArea.value = error.message;
    console.error("Ошибка при обработке файла:", error.message);
  }
}

fileContainer.addEventListener("click", (e) => {
  e.preventDefault();
  fileInput.dispatchEvent(new MouseEvent("click"));
});

fileContainer.addEventListener("dragover", (e) => e.preventDefault());

fileContainer.addEventListener("drop", (e) => {
  e.preventDefault();

  const file = e.dataTransfer.files[0];
  if (file) {
    handleFile(file);
  }
});

fileInput.addEventListener("change", () => {
  const file = fileInput.files[0];
  if (file) {
    handleFile(file);
  }
});

textArea.addEventListener("keydown", (e) => e.preventDefault());
