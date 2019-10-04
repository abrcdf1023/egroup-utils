import fs from 'fs'

const dirname = 'test-images/processed'

if (!fs.existsSync(dirname)) {
  fs.mkdirSync(dirname);
}
