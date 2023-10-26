import { resizeAndConvertImage } from '../utils/imageResize';

export const convertImages = async (files: File[]): Promise<string[]> => {
  const convertedImages: string[] = [];

  for (const file of files) {
    const reader = new FileReader();

    const result: any = await new Promise((resolve, reject) => {
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;

      if (/^image\/.+/i.test(file.type)) {
        reader.readAsDataURL(file);
      } else {
        reader.readAsArrayBuffer(file);
      }
    });

    if (typeof result === 'string' && result.startsWith('data:image')) {
      const imgBlob = await fetch(result).then(res => res.blob());
      const resizedAndConvertedToWebPImageBlob = await resizeAndConvertImage(imgBlob);
      const webPImageUrl = URL.createObjectURL(resizedAndConvertedToWebPImageBlob);
      convertedImages.push(webPImageUrl);
    } else {
      try {
        const base64String = btoa(new Uint8Array(result).reduce((data, byte) => data + String.fromCharCode(byte), ''));
        const base64Image = `data:${file.type};base64,${base64String}`;
        const imgBlob = await fetch(base64Image).then(res => res.blob());
        const resizedAndConvertedToWebPImageBlob = await resizeAndConvertImage(imgBlob);
        const webPImageUrl = URL.createObjectURL(resizedAndConvertedToWebPImageBlob);
        convertedImages.push(webPImageUrl);
      } catch (error) {
        console.error("Base64 변환 및 WebP 변환 중 오류 발생:", error);
      }
    }
  }

  return convertedImages;
};