import Tesseract from "tesseract.js";

const recognize = async function (image: string) {
  return Tesseract.recognize(image);
};

export default recognize;
