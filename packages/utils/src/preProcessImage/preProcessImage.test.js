import { createCanvas, loadImage } from 'canvas';
import preProcessImage from './preProcessImage';
import getOrientation from './getOrientation';

// mock toBlob
function toBlob(resolve, type, quality) {
  this.toBuffer(
    (err, result) => {
      resolve(result);
    },
    type,
    quality
  );
}

describe('preProcessImage', () => {
  it('should compress image', async done => {
    const image = await loadImage('test-images/cat.jpg');
    const canvas = createCanvas(image.width, image.height);
    canvas.toBlob = toBlob;
    const blob = await preProcessImage(canvas, image, {
      quality: 0.8
    });
    expect(blob).toBeInstanceOf(Buffer);
    done();
  });

  it('should resize image', async done => {
    const image = await loadImage('test-images/cat.jpg');
    const canvas = createCanvas(image.width, image.height);
    canvas.toBlob = toBlob;
    const blob = await preProcessImage(canvas, image, {
      maxWidth: 1920,
      maxHeight: 1920
    });
    const resizedImage = await loadImage(blob);
    expect(image.width >= 1920).toBe(true);
    expect(image.height >= 1920).toBe(true);
    expect(resizedImage.width <= 1920).toBe(true);
    expect(resizedImage.height <= 1920).toBe(true);
    done();
  });

  it('should not resize image', async done => {
    const image = await loadImage('test-images/cat2.jpeg');
    const canvas = createCanvas(image.width, image.height);
    canvas.toBlob = toBlob;
    const blob = await preProcessImage(canvas, image, {
      maxWidth: 1920,
      maxHeight: 1920
    });
    const resizedImage = await loadImage(blob);
    expect(image.width < 1920).toBe(true);
    expect(image.height < 1920).toBe(true);
    expect(resizedImage.width === image.width).toBe(true);
    expect(resizedImage.height === image.height).toBe(true);
    done();
  });

  it('should reset image orientation', async done => {
    const image = await loadImage('test-images/up-down.jpg');
    const canvas = createCanvas(image.width, image.height);
    canvas.toBlob = toBlob;
    // https://storage.googleapis.com/go-attachment/4341/0/exif-orientations.png
    const orientation = 6;
    const blob = await preProcessImage(canvas, image, {
      orientation
    });
    const resetedImage = await loadImage(blob);
    expect(resetedImage.width === image.height).toBe(true);
    expect(resetedImage.height === image.width).toBe(true);
    done();
  });

  it('should cause type error', () => {
    const t = () => {
      preProcessImage();
    };
    expect(t).toThrow('Canvas or Img element is required.');
  });

  it('should cause type error', async done => {
    const image = await loadImage('test-images/cat.jpg');
    const canvas = createCanvas(image.width, image.height);
    const t = () => {
      preProcessImage(canvas, image);
    };
    expect(t).toThrow('At least need one option to handle image.');
    done();
  });
});
