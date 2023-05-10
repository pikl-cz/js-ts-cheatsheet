
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



// https://stackoverflow.com/questions/51805395/navigator-clipboard-is-undefined

 const copyToClipboard = (text: string) => {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
         console.log("Copied to clipboard")
        })
        .catch((err) => console.error("Failed to copy to clipboard: ", err));
    } else {
      // Use the 'out of viewport hidden text area' trick
      const textArea = document.createElement('textarea');
      textArea.value = text;

      // Move textarea out of the viewport so it's not visible
      textArea.style.position = 'absolute';
      textArea.style.left = '-999999px';

      document.body.prepend(textArea);
      textArea.select();

      try {
        document.execCommand('copy');
      } catch (error) {
        console.error(error);
      } finally {
        textArea.remove();
      }
    }
  };
