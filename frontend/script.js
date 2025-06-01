const fileInput = document.getElementById('fileInput');
const fileLabel = document.getElementById('fileLabel');
const uploadBtn = document.getElementById('uploadBtn');
const progressBar = document.getElementById('progressBar');
const progressFill = document.getElementById('progressFill');
const status = document.getElementById('status');
const qrCanvas = document.getElementById('qrCanvas');

fileInput.addEventListener('change', () => {
  if (fileInput.files.length > 0) {
    fileLabel.textContent = fileInput.files[0].name;
    uploadBtn.disabled = false;
    status.textContent = '';
    progressFill.style.width = '0%';
    progressBar.style.display = 'none';
    qrCanvas.style.display = 'none';
  } else {
    fileLabel.textContent = 'Choose a file';
    uploadBtn.disabled = true;
    status.textContent = '';
    progressFill.style.width = '0%';
    progressBar.style.display = 'none';
    qrCanvas.style.display = 'none';
  }
});

uploadBtn.addEventListener('click', () => {
  if (!fileInput.files.length) return;

  uploadBtn.disabled = true;
  status.textContent = 'Uploading...';
  progressBar.style.display = 'block';
  progressFill.style.width = '0%';
  qrCanvas.style.display = 'none';

  const formData = new FormData();
  formData.append('file', fileInput.files[0]);

  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'http://localhost:4000/upload', true);

  xhr.upload.onprogress = (event) => {
    if (event.lengthComputable) {
      const percent = (event.loaded / event.total) * 100;
      progressFill.style.width = percent.toFixed(2) + '%';
    }
  };

  xhr.onload = () => {
    uploadBtn.disabled = false;
    progressBar.style.display = 'none';

    if (xhr.status === 200) {
      const response = JSON.parse(xhr.responseText);
      const fileUrl = response.fileUrl;

      status.innerHTML = `✅ File uploaded!<br><a href="${fileUrl}" target="_blank">${fileUrl}</a>`;

      // Generate QR code for the uploaded file URL
      const qr = new QRious({
        element: qrCanvas,
        value: fileUrl,
        size: 200,
      });

      qrCanvas.style.display = 'block';

    } else {
      status.textContent = '❌ Upload failed: ' + xhr.statusText;
    }
  };

  xhr.onerror = () => {
    uploadBtn.disabled = false;
    progressBar.style.display = 'none';
    status.textContent = '❌ Upload failed: Network error';
  };

  xhr.send(formData);
});
