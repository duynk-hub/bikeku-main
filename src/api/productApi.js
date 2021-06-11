
import { axiosClient } from "./axiosClient";

const productApi = {
    // async getAll(params) {
    //     //Transform _page to _start
    //     const newParams = { ...params }
    //     newParams._start = !params._page || params._page <= 1
    //         ? 0 : (params._page - 1) * (params._limit || 50);
    //     //Remove un-needed key
    //     delete newParams._page
    //     //fetch products list +count
    //     const productList = await easyFrontend.get('/products', {
    //         params:
    //             newParams
    //     });
    //     const count = await easyFrontend.get('/products/count', {
    //         params:
    //             newParams
    //     })
    //     return {
    //         data: productList,
    //         pagination: {
    //             page: params._page,
    //             _limit: params._limit,
    //             total: count.data
    //         }
    //     }
    // },




    async get(id) {
        const url = `/Products/${id}`;
        const data = await axiosClient.get(url);
        return data;
    },

    async getAll(params) {
        var url = `/Products`;
        if (params.searchBy === 'Maker') {
            url = `/Products/Maker/${params.value}`;
        }
        else if (params.searchBy === 'Name') {
            delete params.priceOfBike;
            url = `/Products/Name/${params.value}`;
        }
        else if (params.priceOfBike) {
            delete params.searchBy;
            if (params.priceOfBike !== 'default') {
                var [min, max] = params.priceOfBike.split('-');
                url = `/Products/Price/${min}/${max}`;
            }
        };
        const response = (await axiosClient.get(url, { params: params }));
        return {
            data: response.data,
            pagination: {
                PageNumber: params.PageNumber,
                PageSize: params.PageSize,
                total: response.total,
            }
        }
    }

}

export default productApi;