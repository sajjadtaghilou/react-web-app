export const getPhoto = <
  T extends {
    sizeLimitMB?: number;
  }
>({
  sizeLimitMB,
}: T): Promise<string> => {
  return new Promise((res, rej) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = `image/*`;
    input.style.visibility = "invisible";
    document.body.appendChild(input);
    input.click();
    input.addEventListener("change", function (e) {
      const loadPromises: Promise<string>[] = [];
      if (!input.files) return;
      const files = input.files;
      for (let i = 0; i < files.length; i++) {
        loadPromises.push(
          new Promise((res, rej) => {
            const file = files[i];
            const reader = new FileReader();
            reader.addEventListener("load", function () {
              typeof reader.result === "string" && res(reader.result);
            });
            const fileSizeMB = file.size / 1024 / 1024;
            if (sizeLimitMB && fileSizeMB > sizeLimitMB) {
              rej(new Error("حجم فایل بیشتر از حد مجاز است"));
              return;
            }
            reader.readAsDataURL(file);
          })
        );
      }
      Promise.all(loadPromises)
        .then((loadedDataUrls) => {
          res(loadedDataUrls[0]);
        })
        .catch((e) => {
          rej(new Error("خطا در انتخاب فایل"));
        });
      document.body.removeChild(input);
    });
  });
};

/**
 * resize the image
 *
 * @param url - image dataUrl
 * @param quality - between 0 and 1
 *
 */
export const resizeImage = ({
  url,
  maxHeight,
  maxWidth,
  quality,
}: {
  url: string;
  maxHeight?: number;
  maxWidth?: number;
  quality?: number;
}): Promise<{ url: string; blob: Blob | null }> => {
  return new Promise((res, rej) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return rej(new Error("خطا در بارگزاری تصویر"));
    }

    const image = new Image();
    image.onload = function () {
      const MAX_WIDTH = maxWidth || 700;
      const MAX_HEIGHT = maxHeight || 1000;

      const actualWidth = image.naturalWidth;
      const actualHeight = image.naturalHeight;
      const resizeRatio = Math.max(
        actualHeight / MAX_HEIGHT,
        actualWidth / MAX_WIDTH,
        1
      );
      image.width = actualWidth / resizeRatio;
      image.height = actualHeight / resizeRatio;
      canvas.width = actualWidth / resizeRatio;
      canvas.height = actualHeight / resizeRatio;

      ctx.drawImage(image, 0, 0, image.width, image.height);
      canvas.toBlob(
        function (blob) {
          var url = URL.createObjectURL(blob);
          res({
            url,
            blob,
          });
          requestAnimationFrame(() => {
            URL.revokeObjectURL(url);
          });
        },
        "image/jpeg",
        quality || 1
      );
    };
    image.src = url;
  });
};
