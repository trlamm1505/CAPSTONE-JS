class ProductService {
    getListProductApi(){
        const promise = axios({
            url: "https://683fd1e35b39a8039a55bd89.mockapi.io/api/Products",
            method: "GET",
        });
        return promise;
    }
}
export default ProductService;