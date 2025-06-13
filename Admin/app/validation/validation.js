import {getId} from "./../controllers/main.js"
class Validation{
    checkName(value, idNoti) {
        if (value.trim() === "") {
          getId(idNoti).innerHTML = "(*) Vui lòng nhập tên sản phẩm!";
          getId(idNoti).style.display = "block";
          return false;
        } else if (value.trim().length < 3) {
          getId(idNoti).innerHTML = "(*) Tên sản phẩm phải có ít nhất 3 ký tự!";
          getId(idNoti).style.display = "block";
          return false;
        }
        getId(idNoti).innerHTML = "";
        getId(idNoti).style.display = "none";
        return true;
      }
    
      checkPrice(value, idNoti) {
        if (value === "") {
          getId(idNoti).innerHTML = "(*) Vui lòng nhập giá!";
          getId(idNoti).style.display = "block";
          return false;
        } else if (isNaN(value) || Number(value) <= 0) {
          getId(idNoti).innerHTML = "(*) Giá phải là số lớn hơn 0!";
          getId(idNoti).style.display = "block";
          return false;
        }
        getId(idNoti).innerHTML = "";
        getId(idNoti).style.display = "none";
        return true;
      }
    
      checkScreen(value, idNoti) {
        if (value.trim() === "") {
          getId(idNoti).innerHTML = "(*) Vui lòng nhập thông tin màn hình!";
          getId(idNoti).style.display = "block";
          return false;
        } else if (!value.toLowerCase().includes("screen")) {
          getId(idNoti).innerHTML = "(*) Thông tin màn hình phải chứa từ 'screen'!";
          getId(idNoti).style.display = "block";
          return false;
        }
        getId(idNoti).innerHTML = "";
        getId(idNoti).style.display = "none";
        return true;
      }
    
      checkCamera(value, idNoti, label = "camera") {
        if (value.trim() === "") {
          getId(idNoti).innerHTML = `(*) Vui lòng nhập thông tin ${label}!`;
          getId(idNoti).style.display = "block";
          return false;
        } else if (!value.toLowerCase().includes("mp")) {
          getId(idNoti).innerHTML = `(*) Thông tin ${label} phải có đơn vị 'MP'!`;
          getId(idNoti).style.display = "block";
          return false;
        }
        getId(idNoti).innerHTML = "";
        getId(idNoti).style.display = "none";
        return true;
      }
    
      checkImgURL(value, idNoti) {
        const regex = /^(https?:\/\/.*\.(png|jpg|jpeg|gif|webp))$/i;
        if (value.trim() === "") {
          getId(idNoti).innerHTML = "(*) Vui lòng nhập URL hình ảnh!";
          getId(idNoti).style.display = "block";
          return false;
        } else if (!regex.test(value)) {
          getId(idNoti).innerHTML = "(*) URL hình ảnh không hợp lệ!";
          getId(idNoti).style.display = "block";
          return false;
        }
        getId(idNoti).innerHTML = "";
        getId(idNoti).style.display = "none";
        return true;
      }
    
      checkDescription(value, idNoti) {
        if (value.trim() === "") {
          getId(idNoti).innerHTML = "(*) Vui lòng nhập mô tả!";
          getId(idNoti).style.display = "block";
          return false;
        }
        getId(idNoti).innerHTML = "";
        getId(idNoti).style.display = "none";
        return true;
      }
    
      checkType(value, idNoti) {
        if (value.trim() === "") {
          getId(idNoti).innerHTML = "(*) Vui lòng nhập loại sản phẩm!";
          getId(idNoti).style.display = "block";
          return false;
        }
        getId(idNoti).innerHTML = "";
        getId(idNoti).style.display = "none";
        return true;
      }
    }

export default Validation;