class StrapiPaginator {

    queryFunction;
    queryParams;
    page = 1;
    pageSize;
    pageCount;
    total;
    items;
    errored = false;

    constructor(queryFunction, query, pageSize = 10) {
        this.queryParams = {
            ...query,
            pagination: {
                pageSize,
            }
        }
        this.queryFunction = queryFunction;
        this.pageSize = pageSize;
    }

    async _query(){
        let res = await this.queryFunction(this.curQueryParams);
        if (res){
            const {data, meta} = res;
            const {pagination: { pageCount, total }} = meta;
            this.errored = false;
            this.pageCount = pageCount;
            this.total = total;
            this.items = data;
            return this.items;
        } else {
            this.errored = true;
            return undefined;
        }
    }

    async paginate(direction){
        let targetPage = this.page + direction;
        if (targetPage > 0 && targetPage <= this.pageCount){
            this.page = targetPage;
        }

        await this._query();
        return this;
    }

    async toFirstPage(){
        return await this.goToPage(1);
    }

    async toLastPage(){
        return await this.goToPage(this.pageCount);
    }

    async paginateLeft(){
        return await this.paginate(-1);
    }

    async paginateRight(){
        return await this.paginate(1);
    }

    async goToPage(targetPage){
        if (targetPage > 0 && targetPage <= this.pageCount){
            this.page = targetPage;
        }
        await this._query();
        return this;
    }

    get curItems(){
        if (!this.errored){
            return this.items;
        } else {
            return undefined;
        }
    }

    get startingItemNumber(){
        return ((this.page - 1) * this.pageSize) + 1;
    }

    get endingItemNumber(){
        let curEnd = (this.page) * this.pageSize;
        if (curEnd > this.total){
            curEnd = this.total
        }
        return curEnd;
    }


    get curQueryParams(){
        return {
            ...this.queryParams,
            pagination: {
                pageSize: this.pageSize,
                page: this.page,
            }
        }
    }

    async initialize(){
        return await this._query();
    }

    get isOnePage(){
        return this.total <= this.pageSize;
    }

    get hasNextPage(){
        return this.page < this.pageCount;
    }
}

module.exports = {StrapiPaginator}