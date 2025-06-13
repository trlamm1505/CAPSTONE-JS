import Product from "../models/product.js";
import ProductService from "../services/product-services.js";
import Validation from "./../validation/validation.js";
const service = new ProductService();


const validation = new Validation();
export const getId = (id) => document.getElementById(id);

const renderListProduct = (data) => {
    let content = "";
    for( let i = 0; i < data.length; i++) {
        const product = data[i];
        content += `
        <tr>
            <td>${i+1}</td>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>${product.screen}</td>
            <td>${product.backCamera}</td>
            <td>${product.frontCamera}</td>
            <td>
            <img src="${product.img}" alt="" style="width: 100px; height: 100px;">
            </td>
            <td>${product.desc}</td>
            <td>${product.type}</td>
            <td>
            <button class="btn btn-danger" onclick="onDeleteProduct(${product.id})">Delete</button>
            </td>
        </tr>
        `;
    }
    getId("tblDanhSachSP").innerHTML=content;
}

const getListProduct = () => {
    getId("loader").style.display="block";
    const promise = service.getListProductApi();
    promise
        .then((result) => {
            renderListProduct(result.data);
            getId("loader").style.display="none";
        })
        .catch((error) => {
            getId("loader").style.display="none";
            console.log(error);
        });
}

getListProduct();

const onDeleteProduct = (id) => {
    const promise = service.deleteProductApi(id);
    promise
      .then((result) => {
        alert(`Delete Product ${result.data.name} Success`)
        getListProduct();
      })
      .catch((error) => {
          console.log(error);  
      })
}
window.onDeleteProduct=onDeleteProduct;


getId("btnThemSP").onclick = function(){
    document.getElementsByClassName("modal-title")[0].innerHTML="Add Product";

    const btnAdd = `<button class="btn btn-success" onclick="onAddProduct()">Add Product</button>`;
    document.getElementsByClassName("modal-footer")[0].innerHTML=btnAdd;
}

const getValue = () => {
    const name = getId("TenSP").value;
    const price = getId("GiaSP").value;
    const screen = getId("ManHinh").value;
    const backCamera = getId("CameraSau").value;
    const frontCamera = getId("CameraTruoc").value;
    const img = getId("HinhSP").value;
    const desc = getId("MoTa").value;
    const type = getId("LoaiSP").value;

    let isValid = true;

    isValid = validation.checkName(name, "tbTenSP") && isValid;
    isValid = validation.checkPrice(price, "tbGiaSP") && isValid;
    isValid = validation.checkScreen(screen, "tbManHinh") && isValid;
    isValid = validation.checkCamera(backCamera, "tbCameraSau", "camera sau") && isValid;
    isValid = validation.checkCamera(frontCamera, "tbCameraTruoc", "camera trước") && isValid;
    isValid = validation.checkImgURL(img, "tbHinhSP") && isValid;
    isValid = validation.checkDescription(desc, "tbMoTa") && isValid;
    isValid = validation.checkType(type, "tbLoaiSP") && isValid;

    if(!isValid) return;

    const product = new Product("",name,price,screen,backCamera,frontCamera,img,desc,type);
    return product;
}

const resetForm = () => {
    getId("productForm").reset();
}

const onAddProduct = () => {
    const product = getValue();
    if(!product) return;
    const promise = service.addProductApi(product);

    promise
      .then((result) => {
        alert(`Adđ Product ${result.data.name} Success`);
        document.getElementsByClassName("close")[0].click();
        getListProduct();
        resetForm();
      })
      .catch((error) => {
          console.log(error);
          
      })
      
}
window.onAddProduct=onAddProduct;