import IPaginationOptions from '@modules/pagination/interfaces/IPaginationOptions';

declare global {
  namespace Express {
    interface Request {
      paginationOptions: IPaginationOptions;
    }
  }
}
