import { CustomerDto } from './customer-dto';

export interface CustomerDtoPagedResultDto {
  items: CustomerDto[];
  totalRecordsCount: number;
  pageSize: number;
  pageNumber: number;
  totalPages: number;
}
