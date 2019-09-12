import shrinkingImage from './shrinkingImage';
import resetOrientation from './resetOrientation';

/**
 * Compress and resize image and keep aspect ratio.
 *
 * @param {Node} canvas Canvas element
 * @param {Node} img Image element
 * @param {Object} options
 * @param {String} options.type ['image/jpeg'] compressed image type
 * @param {Number} options.quality [1] compressed image quality
 * @param {Number} options.maxWidth [1920] compressed image max width
 * @param {Number} options.maxHeight [1920] compressed image max height
 * @param {Boolean} options.orientation provide image orientation to reset it
 */
const preProcessImage = (canvas, img, options) => {
  const { type = 'image/jpeg', quality, maxWidth, maxHeight, orientation } =
    options || {};
  if (!canvas || !img) {
    throw TypeError('Canvas or Img element is required.');
  }

  const isCompressImage = typeof quality !== 'undefined';
  const isShrinkingImage =
    typeof maxWidth !== 'undefined' && typeof maxHeight !== 'undefined';
  const isResetOrientation = typeof orientation !== 'undefined';

  if (!isCompressImage && !isShrinkingImage && !isResetOrientation) {
    throw TypeError('At least need one option to handle image.');
  }

  return new Promise((resolve, reject) => {
    try {
      const ctx = canvas.getContext('2d');
      let imgWidth = img.width;
      let imgHeight = img.height;

      if (isShrinkingImage) {
        const [width, height] = shrinkingImage(
          canvas,
          imgWidth,
          imgHeight,
          maxWidth,
          maxHeight
        );
        imgWidth = width;
        imgHeight = height;
      }

      if (isResetOrientation) {
        resetOrientation(canvas, ctx, imgWidth, imgHeight, orientation);
      }

      // Draw canvas.
      ctx.drawImage(img, 0, 0, imgWidth, imgHeight);
      // Convert back to blob.
      canvas.toBlob(resolve, type, quality);
    } catch (error) {
      reject(error);
    }
  });
};

export default preProcessImage;
