interface PhotoSumbissionResult {
  success: boolean;
}

function b64toBlob(
  b64Data: string,
  contentType: string = "",
  sliceSize: number = 512,
) {
  const byteCharacters = atob(b64Data); // window.atob(b64Data)
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);

    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: contentType });
  return blob;
}

function photoToBlob(photo: string): Blob {
  const block = photo.split(";");

  const contentType = block[0].split(":")[1];
  const data = block[1].split(",")[1];

  return b64toBlob(data, contentType);
}

async function submitPhoto(photo: string, initData: string): Promise<boolean> {
  const formData = new FormData();

  const blob = photoToBlob(photo);

  formData.append("photo", blob);
  const resp = await fetch("/api/photos/submit", {
    body: formData,
    method: "POST",
    headers: {
      "Init-Data": initData,
    },
  });
  if (!resp.ok) return false;
  const result = await (resp.json() as Promise<PhotoSumbissionResult>);
  return result.success;
}

export { submitPhoto, photoToBlob };
