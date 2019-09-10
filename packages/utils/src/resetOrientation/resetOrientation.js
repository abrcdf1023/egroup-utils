/**
 * To reset orientation of image.
 *
 * @param {Canvas} canvas Canvas element
 * @param {Image} img Image element
 * @param {number} srcOrientation the orientation of image file
 * @param {object} options
 * @param {string} options.type ['image/jpeg'] compressed image type
 * @param {string} options.quality [1] compressed image quality
 */
export default function resetImgOrientation(
  canvas,
  img,
  srcOrientation,
  options
) {
  const { type = 'image/jpeg', quality = 1 } = options || {};
  return new Promise((resolve, reject) => {
    try {
      const ctx = canvas.getContext('2d');
      const width = img.width;
      const height = img.height;

      // set proper canvas dimensions before transform & export
      if (4 < srcOrientation && srcOrientation < 9) {
        canvas.width = height;
        canvas.height = width;
      } else {
        canvas.width = width;
        canvas.height = height;
      }

      // transform context before drawing image
      switch (srcOrientation) {
        case 2:
          ctx.transform(-1, 0, 0, 1, width, 0);
          break;
        case 3:
          ctx.transform(-1, 0, 0, -1, width, height);
          break;
        case 4:
          ctx.transform(1, 0, 0, -1, 0, height);
          break;
        case 5:
          ctx.transform(0, 1, 1, 0, 0, 0);
          break;
        case 6:
          ctx.transform(0, 1, -1, 0, height, 0);
          break;
        case 7:
          ctx.transform(0, -1, -1, 0, height, width);
          break;
        case 8:
          ctx.transform(0, -1, 1, 0, 0, width);
          break;
        default:
          break;
      }

      // draw image
      ctx.drawImage(img, 0, 0);

      // Convert back to blob.
      canvas.toBlob(resolve, type, quality);
    } catch (error) {
      reject(error);
    }
  });
}
