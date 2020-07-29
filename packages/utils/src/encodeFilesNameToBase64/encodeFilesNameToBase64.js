import { Base64 } from 'js-base64';

export default function encodeFilesNameToBase64(files) {
  const result = [];
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const exts = file.name.split('.').pop();
    const name = file.name.replace(`.${exts}`, '');
    const newFile = new File([file], `${Base64.encode(name)}.${exts}`, {
      type: file.type
    });
    result.push(newFile);
  }
  return result;
}
