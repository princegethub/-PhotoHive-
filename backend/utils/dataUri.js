import DataUriParser from 'datauri/parser.js'; // Correct import
import path from 'path';
const parser = new DataUriParser(); // Correct class name

const getDataUri = (file) => {
  const extname = path.extname(file.originalname).toString();
  return parser.format(extname, file.buffer).content;
}

export default getDataUri;
