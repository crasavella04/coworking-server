export interface ImageServiceImplements {
  addImg: (image: Express.Multer.File) => Promise<string>;
  deleteImg: (image: string | null) => Promise<void>;
}
