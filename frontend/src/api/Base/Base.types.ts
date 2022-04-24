export interface StrapiBaseFields {
    createdAt:string,
    updatedAt:string,
    id?:number,
}

export interface IStrapiEntity<T> {

    attributes:T,
    id:number

}

export interface IStrapiResponse<T>{
    data:T,
    meta:any
}

export interface IStrapiFile {
    alternativeText: any,
    caption: any,
    createdAt: string,
    ext: string,
    formats: any,
    hash: string,
    height: any,
    mime: string,
    name: string,
    previewUrl: any,
    provider: string,
    provider_metadata: any,
    size: number,
    updatedAt:string,
    url:string,
    width:number,
}