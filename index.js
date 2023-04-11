function convertJpgToPng() {
  const fileInput = document.getElementById('jpg-file');
  const file = fileInput.files[0];

  if (!file || !file.type.startsWith('image/jpg')) {
    alert('select a JPEG file.');
    return;
  }

  const reader = new FileReader();
  reader.onload = function (event) {
    const jpg = event.target.result;

    const canvas = document.createElement('canvas');
    canvas.width = 600;
    canvas.height = 600;

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    canvg(canvas, jpg, {
      renderCallback: function () {
        const dataUrl = canvas.toDataURL('image/png');
        const img = document.createElement('img');
        img.src = dataUrl;

        const resultDiv = document.getElementById('output');
        resultDiv.innerHTML = '';
        resultDiv.appendChild(img);

        // create download link
        const downloadLink = document.createElement('a');
        downloadLink.href = dataUrl;
        downloadLink.download = 'image.png';
        downloadLink.innerHTML = 'Download PNG File';

        resultDiv.appendChild(document.createElement('br'));
        resultDiv.appendChild(downloadLink);
      },
    });
  };
  reader.readAsText(file);
}
