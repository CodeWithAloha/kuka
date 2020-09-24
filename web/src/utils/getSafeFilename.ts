import sanitize from "sanitize-filename";

const getSafeFilename = (filename: string) => {
  // sanitizes and adds unique timestamp to file.
  const now = new Date()
  const secondsSinceEpoch = Math.round(now.getTime() / 1000)
  console.log(filename)
  let fn = sanitize(filename);
  return fn.replace(/^([^.]*)\.(.*)$/, `$1.${secondsSinceEpoch}.$2`);
}

export default getSafeFilename;
