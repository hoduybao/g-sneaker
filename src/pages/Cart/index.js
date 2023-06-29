import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../../Data/nike.png";
import styles from "./Cart.module.scss";
import classNames from "classnames/bind";

import { faMinus, faPlus, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
const cx = classNames.bind(styles);
function Cart() {
  var jsonData = localStorage.getItem("data_cart");
  var data = JSON.parse(jsonData);
  console.log(data);
  const [listCart, setListCart] = useState(data);

  const totalPrice = (listProduct) => {
    return listProduct.reduce((accumulator, product) => {
      return accumulator + product.price*product.quantity;
    }, 0).toFixed(2);
  };
  const [total, setTotal] = useState(() => {
    return totalPrice(data);
  });
  const plusQuantity = (id) => {
    var product = [...listCart];
    product[id].quantity = product[id].quantity + 1;
    const jsonNewData = JSON.stringify(product);
    localStorage.setItem("data_cart", jsonNewData);
    
    setListCart(product);
    setTotal(()=>{
      return totalPrice(product);
    })
  };
  const minusQuantity = (id) => {
    var product = [...listCart];
    product[id].quantity = product[id].quantity - 1;
    if (product[id].quantity === 0) {
      product.splice(id, 1);
    }
    const jsonNewData = JSON.stringify(product);
    localStorage.setItem("data_cart", jsonNewData);
    setListCart(product);
    setTotal(()=>{
      return totalPrice(product);
    })
  };

  const removeProduct = (id) => {
    var product = [...listCart];
    // xóa phần từ
    product.splice(id, 1);
    const jsonNewData = JSON.stringify(product);
    localStorage.setItem("data_cart", jsonNewData);
    setListCart(product);
    setTotal(()=>{
      return totalPrice(product);
    })
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("inner")}>
        <img src={logo} className={cx("logo_nike")} alt="logo_nike" />
        <div className={cx("circle_top")}></div>
        <div className={cx("header_hide")}></div>

        <div className={cx("header")}>
          <div className={cx("title_header")}>Your cart</div>
          <div className={cx("total_cart")}>{listCart && listCart.length > 0 ? "$"+ total : "$0.00"}</div>
        </div>

        <div className={cx("list_cart")}>
          {listCart && listCart.length > 0 ? (
            listCart.map((product, index) => (
              <div className={cx("item")}>
                <img
                  src={product.image}
                  style={{
                    backgroundColor: product.color,
                  }}
                  alt="image_product"
                  className={cx("image_product")}
                />
                <div className={cx("infor_product")}>
                  <div className={cx("name_product")}>{product.name} </div>
                  <div className={cx("price")}>${product.price}</div>
                  <div className={cx("wrapper_quantity")}>
                    <span
                      className={cx("plus")}
                      onClick={() => {
                        plusQuantity(index);
                      }}
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </span>
                    <span className={cx("quantity")}>{product.quantity}</span>
                    <span
                      className={cx("minus")}
                      onClick={() => {
                        minusQuantity(index);
                      }}
                    >
                      <FontAwesomeIcon icon={faMinus} />
                    </span>
                  </div>
                  <div
                    className={cx("trash")}
                    onClick={() => removeProduct(index)}
                  >
                    <FontAwesomeIcon icon={faTrashCan} />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div>Your cart is empty.</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;
