class ProductService {
    getListProductApi(){
        const promise = axios({
            url: "https://683fd1e35b39a8039a55bd89.mockapi.io/api/Products",
            method: "GET",
        });
        return promise;
    }

    deleteProductApi(id){
        const promise = axios({
            url:`https://683fd1e35b39a8039a55bd89.mockapi.io/api/Products/${id}`,
            method:"DELETE",
        });
        return promise;
    }

    addProductApi(product){
        const promise = axios({
            url:"https://683fd1e35b39a8039a55bd89.mockapi.io/api/Products",
            method:"POST",
            data: product,
        })
        return promise;
    }

    getProductById(id){
        const promise = axios({
            url:`https://683fd1e35b39a8039a55bd89.mockapi.io/api/Products/${id}`,
            method:"GET",
        });
        return promise
    }
}
export default ProductService;