import IPaginationOptions from '@modules/pagination/interfaces/IPaginationOptions';
import ISortingOptions from '@modules/sorting/interfaces/ISortingOptions';

declare global {
  namespace Express {
    interface Request {
      paginationOptions: IPaginationOptions;
      sortingOptions: ISortingOptions;
    }
  }
}
