export interface MulterFile {
  fieldname: string; // Name of the field in the form
  originalname: string; // Original name of the uploaded file
  encoding: string; // File encoding type (e.g., '7bit')
  mimetype: string; // File MIME type (e.g., 'image/png')
  size: number; // File size in bytes
  destination: string; // Destination path (if using disk storage)
  filename: string; // Filename generated by Multer
  path: string; // Full path to the stored file
  buffer?: Buffer; // Buffer containing file data (if using memory storage)
}
