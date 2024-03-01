import { v4 as uuid } from 'uuid';
// Added @types/uuid *MJV*

export const fileNamer = (
  _req: Express.Request, // Adding underscore to make know this parameter is not being use *MJV*.
  file: Express.Multer.File,
  cb: (error: Error | null, filename: string) => void, // adding types *MJV*
) => {
  // console.log({  file })
  if (!file) return cb(new Error('File is empty'), null); // Cant accept boolean type so null to be false *MJV*

  const fileExtencion = file.mimetype.split('/')[1];

  const fileName = `${uuid()}.${fileExtencion}`;

  cb(null, fileName);
};
