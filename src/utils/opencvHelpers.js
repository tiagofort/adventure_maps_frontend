export const loadOpenCV = async () => {
  if (window.cv && window.cv.Mat) return window.cv;

  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://docs.opencv.org/4.x/opencv.js";
    script.async = true;

    script.onload = () => {
      window.cv['onRuntimeInitialized'] = () => {
        resolve(window.cv);
      };
    };

    script.onerror = () => reject(new Error("Falha ao carregar OpenCV.js"));

    document.body.appendChild(script);
  });
};

export const loadReferenceMats = async (data) => {
  const mats = [];
  for (const item of data) {
    const img = new Image();
    img.src = item.src;
    await new Promise((resolve) => (img.onload = resolve));

    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    const mat = cv.imread(canvas);
    mats.push({ ...item, mat });
  }
  return mats;
};

// compareImages permanece igual
export const compareImages = (uploadedMat, referenceMats, threshold = 0.85) => {
  let match = null;
  const compareHist = (img1, img2) => {
    const hsv1 = new cv.Mat();
    const hsv2 = new cv.Mat();
    cv.cvtColor(img1, hsv1, cv.COLOR_RGBA2HSV);
    cv.cvtColor(img2, hsv2, cv.COLOR_RGBA2HSV);

    const srcVec1 = new cv.MatVector();
    const srcVec2 = new cv.MatVector();
    srcVec1.push_back(hsv1);
    srcVec2.push_back(hsv2);

    const channels = cv.matFromArray(2, 1, cv.CV_32S, [0, 1]);
    const histSize = cv.matFromArray(2, 1, cv.CV_32S, [50, 60]);
    const ranges = cv.matFromArray(4, 1, cv.CV_32F, [0, 180, 0, 256]);

    const hist1 = new cv.Mat();
    const hist2 = new cv.Mat();
    cv.calcHist(srcVec1, channels, new cv.Mat(), hist1, histSize, ranges);
    cv.calcHist(srcVec2, channels, new cv.Mat(), hist2, histSize, ranges);

    cv.normalize(hist1, hist1, 0, 1, cv.NORM_MINMAX);
    cv.normalize(hist2, hist2, 0, 1, cv.NORM_MINMAX);

    const score = cv.compareHist(hist1, hist2, cv.HISTCMP_CORREL);

    hsv1.delete(); hsv2.delete();
    srcVec1.delete(); srcVec2.delete();
    channels.delete(); histSize.delete(); ranges.delete();
    hist1.delete(); hist2.delete();

    return score;
  };

  for (const ref of referenceMats) {
    const score = compareHist(uploadedMat, ref.mat);
    if (score > threshold) {
      match = ref;
      break;
    }
  }
  return match;
};
