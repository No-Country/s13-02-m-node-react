export const fileFilter = (
  _req: Express.Request, // Adding underscore to make know this parameter is not being use *MJV*.
  file: Express.Multer.File,
  cb: (error: Error, acceptFile: boolean) => void, // adding types *MJV*
) => {
  // console.log({  file })
  if (!file) return cb(new Error('File is empty'), false);

  const fileExptension = file.mimetype.split('/')[1];
  const validExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];

  if (validExtensions.includes(fileExptension)) {
    return cb(null, true);
  }

  cb(null, false);
};
