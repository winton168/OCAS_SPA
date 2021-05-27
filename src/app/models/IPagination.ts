import { userDTO } from './userDTO';

export interface IPagination {
    pageIndex: number;
    pageSize: number;
    count: number;
    data: userDTO[];
}