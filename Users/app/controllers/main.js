
import ProductService from "./../services/product-services.js";
import Cart from "./../models/cart.js";

const service = new ProductService();
export const getId = (id) => document.getElementById(id);


let allProducts = [];
let listCart = []; // khởi tạo mảng listCart

const lISTstoredCart = localStorage.getItem("cart");
listCart = lISTstoredCart ? JSON.parse(lISTstoredCart) : []; // lấy dữ liệu từ local stogare cập nhật vào mảng

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
          <button data-id="${product.id}" class="add-to-cart-btn flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full text-sm transition">
            <i class="fas fa-cart-plus"></i> Add to Cart
          </button>
        </div>
      </div>
    </div>
  `;
  
  }

  getId("tblDanhSachSP").innerHTML = content;
  
  document.querySelectorAll(".add-to-cart-btn").forEach(button => { 
    button.addEventListener("click", (e) => { // thêm event click nút add to cart sau khi load dom render danh sách xong
      const id = e.target.closest("button").getAttribute("data-id");
      const product = allProducts.find(p => p.id == id);
      if (product) {
        addToCart(product);
        // alert(`Đã thêm ${product.name} vào giỏ hàng.`);
        updateCartDisplay();
      }
    });
  });
};

const renderCart = () => { // YÊU CẦU 8
  let content = "";
  for (let i = 0; i < listCart.length; i++) {
    const item = listCart[i];
    const total = item.price * item.quantity;

    content += `
      <tr class="hover:bg-gray-50 transition">
        <td class="px-4 py-3">
          <img src="${item.img}" alt="${item.name}" class="h-16 w-16 object-contain rounded-md shadow-sm" />
        </td>
        <td class="px-4 py-3 font-semibold text-gray-800">${item.name}</td>
        <td class="px-4 py-3 text-gray-700">$${item.price}</td>
        <td class="px-4 py-3 text-center">
          <button class="decrease-btn px-2 font-bold text-lg" data-id="${item.id}">-</button>
          ${item.quantity}
          <button class="increase-btn px-2 font-bold text-lg" data-id="${item.id}">+</button>
        </td>
        <td class="px-4 py-3 text-green-600 font-semibold">$${total.toFixed(2)}</td>
        <td class="px-4 py-3">
          <button class="remove-btn text-red-600 hover:underline" data-id="${item.id}">Xóa</button>
        </td>
      </tr>
    `;
  }

  getId("cartBody").innerHTML = content;

  cartBody.querySelectorAll(".increase-btn").forEach(button => {
    button.addEventListener("click", () => { // thêm sự kiện cho nút tăng YÊU CẦU 9
      const id = button.getAttribute("data-id");
      const item = listCart.find(p => p.id === id);
      if (item) {
        item.quantity++;
        // gọi lại hàm render -> cập nhật lại local stogare -> cập nhật lại số lượng giỏ hàng
        renderCart();
        localStorage.setItem("cart", JSON.stringify(listCart)); // YÊU CẦU 11 lưu giỏ hàng vào local stogare
        updateCartDisplay();
      }
    });
  });

  cartBody.querySelectorAll(".decrease-btn").forEach(button => {
    button.addEventListener("click", () => { // thêm sự kiện cho nút giảm YÊU CẦU 9
      const id = button.getAttribute("data-id");
      const item = listCart.find(p => p.id === id);
      if (item) {
        if (item.quantity > 1) {
          item.quantity--;
        } else {
          listCart = listCart.filter(p => p.id !== id);
        }
        // gọi lại hàm render -> cập nhật lại local stogare -> cập nhật lại số lượng giỏ hàng
        renderCart();
        localStorage.setItem("cart", JSON.stringify(listCart)); // YÊU CẦU 11 lưu giỏ hàng vào local stogare
        updateCartDisplay();
      }
    });
  });

  cartBody.querySelectorAll(".remove-btn").forEach(button => {
    button.addEventListener("click", () => { // thêm sự kiện cho nút xóa YÊU CẦU 13
      const id = button.getAttribute("data-id");
      listCart = listCart.filter(p => p.id !== id);
      // gọi lại hàm render -> cập nhật lại local stogare -> cập nhật lại số lượng giỏ hàng
      renderCart();
      localStorage.setItem("cart", JSON.stringify(listCart)); // YÊU CẦU 11 lưu giỏ hàng vào local stogare
      updateCartDisplay();
    });
  });

  const total = listCart.reduce((sum, item) => sum + item.price * item.quantity, 0); // YÊU CẦU 10 IN RA TỔNG TIỀN
  const totalEl = document.getElementById("totalMoney");
  totalEl.textContent = `$${total.toFixed(2)}`;
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
renderCart(); //gọi hàm render dữ liệu giỏ hàng từ mảng listCart

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

getId("payBtn").addEventListener("click", () => { // gán sự kiện cho nút thanh toán
  if (listCart.length === 0) {
    alert("Giỏ hàng đang trống. Không thể thanh toán!");
    return;
  }

  listCart = [];
  localStorage.setItem("cart", JSON.stringify(listCart)); // YÊU CẦU 11
  renderCart();
  updateCartDisplay();

  alert("Đã thanh toán thành công !!");
});

const addToCart = (product) => {
  const checkItemInlist = listCart.find(item => item.id === product.id);
  if (checkItemInlist) { // nếu đã có trong mảng thì + quantity thêm 1, nếu không có thì khởi tạo đối tượng và push vào mảng (YÊU CẦU 7)
    checkItemInlist.quantity++;
  } else {
    const cartItem = new Cart(product.id, product.name, product.price, product.img, 1); // ko thêm trực tiếp vào mảng, mà cần phải khởi tạo đối tượng trước (YÊU CẦU 6)
    listCart.push(cartItem); //sau đó mới push vào mảng
  }
  localStorage.setItem("cart", JSON.stringify(listCart)); // YÊU CẦU 11 lưu giỏ hàng vào local stogare
  renderCart(); // khi thêm sản phẩm vào giỏ hàng thì sẽ render sản phẩm ra thẻ html và đã bị ẩn đi, khi người dùng ấn vào thẻ a id=openCartBtn thì sẽ hiện form giỏ hàng ra
};

const updateCartDisplay = () => {
  let count = 0;
  count = listCart.reduce((total, item) => total + item.quantity, 0); // tính tổng số lượng trong giỏ hàng
  const cartCountEl = getId("cartCount");
  if (cartCountEl) {
    cartCountEl.textContent = count; // cập nhật lại số lượng giỏ hàng
  }
};



updateCartDisplay();
  