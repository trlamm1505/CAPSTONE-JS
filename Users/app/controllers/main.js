
import ProductService from "./../services/product-services.js";

const service = new ProductService();
export const getId = (id) => document.getElementById(id);


let allProducts = [];
const renderListProduct = (data) => {
    let content = "";
    for (let i = 0; i < data.length; i++) {
      const product = data[i];
      content += `
      <div class="rounded-2xl shadow-md w-[280px] bg-white overflow-hidden transition-all duration-300 transform hover:scale-105 hover:border-2 hover:border-purple-500 hover:shadow-2xl">
    
        <!-- Ảnh sản phẩm -->
        <div class="bg-white p-3 flex justify-center items-center">
          <img src="${product.img}" alt="${product.name}" class="h-[180px] object-contain rounded-lg" />
        </div>
    
        <!-- Nội dung sản phẩm -->
        <div class="p-4 text-purple-900 space-y-2">
          <h3 class="text-lg font-bold">${product.name}</h3>
          <p class="text-sm"><strong>Price:</strong> $${product.price}</p>
          <p class="text-sm"><strong>Screen:</strong> ${product.screen}</p>
          <p class="text-sm"><strong>Back Cam:</strong> ${product.backCamera}</p>
          <p class="text-sm"><strong>Front Cam:</strong> ${product.frontCamera}</p>
          <p class="text-sm italic text-gray-700">${product.desc}</p>
    
          <!-- Type -->
          <p class="text-xs inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full font-medium">
            ${product.type}
          </p>
    
          <!-- Nút giỏ hàng -->
          <div class="pt-3">
            <button class="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full text-sm transition">
              <i class="fas fa-cart-plus"></i> Add to Cart
            </button>
          </div>
        </div>
      </div>
    `;
    
    }
  
    getId("tblDanhSachSP").innerHTML = content;
  };

  const getListProduct = () => {
    getId("loader").style.display = "block";
    service.getListProductApi()
      .then((result) => {
        allProducts = result.data; 
        renderListProduct(allProducts);
        getId("loader").style.display = "none";
      })
      .catch((error) => {
        getId("loader").style.display = "none";
        console.log(error);
      });
  };
  
getListProduct();

getId("brandFilter").addEventListener("change", (e) => {
    const selectedType = e.target.value.toLowerCase();
  
    const filtered =
      selectedType === "all"
        ? allProducts
        : allProducts.filter(p => p.type.toLowerCase() === selectedType);
  
    renderListProduct(filtered);
    console.log("All Products:", allProducts);
  console.log("Selected Brand:", selectedType);
  console.log("Filtered:", filtered);  

  });
  