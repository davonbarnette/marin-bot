export interface ITableMemConfigRow {
    id: string,
    render?: (val:any) => any,
    titleRender?: (title:string) => any,
    title: string,
}