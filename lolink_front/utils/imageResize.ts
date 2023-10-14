export const resizeAndConvertImage = (file: any, maxWidth = 400) => {
  return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx: any = canvas.getContext("2d");

          let width = image.width;
          let height = image.height;

          if (width > maxWidth) {
              height = height * (maxWidth / width);
              width = maxWidth;
          }

          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(image, 0, 0, width, height);

          canvas.toBlob(resolve, 'image/webp', 0.9);
      };

      image.onerror = reject;
      image.src = URL.createObjectURL(file);
  });
};