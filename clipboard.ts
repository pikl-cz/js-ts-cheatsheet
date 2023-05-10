
const copyToClipboard = (text: string) => {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      console.log("Copied to clipboard")
    })
    .catch((err) => console.error("Failed to copy to clipboard: ", err));
};

function readFromClipboard() {
  navigator.clipboard.readText()
    .then((text) => console.log("Clipboard text:", text))
    .catch((err) => console.error("Failed to read from clipboard: ", err));
}
