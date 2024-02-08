export interface INeDBDao<O, CreateDto, UpdateDto> {
    getAll(): Promise<O[]>;
    getByFilter(filter: any): Promise<O>;
    insert(object: CreateDto): Promise<string>;
    update(filter: any, object: UpdateDto);
    deleteByFilter(filter: any): Promise<boolean>;
}