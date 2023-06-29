import { faCartShopping, faCheck } from "@fortawesome/free-solid-svg-icons";
import styles from "./home.module.scss";
import classNames from "classnames/bind";
import shoes from "../../Data/shoes.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../../Data/nike.png";
import { Link } from "react-router-dom";
import { useState } from "react";

const cx=classNames.bind(styles)
function Home() {
  var jsonData = localStorage.getItem("data_cart");
  var data = JSON.parse(jsonData);
  const [dataCart, setDataCart] = useState(data);
  const [products, setProducts] = useState(shoes.shoes);
  const addCart = (id) => {
    
    var result ;
    if(dataCart)
    {
        result  = [...dataCart];
    }

    var newCart = products[id];
    newCart.quantity = 1;
    if (data) {
      data.push(newCart);
    } else {
      data = [newCart];
    }
    const jsonNewData = JSON.stringify(data);
    localStorage.setItem("data_cart", jsonNewData);
    if (result) {
      result.push(newCart);
    } else {
      result = [newCart];
    }

    setDataCart(result);
  };
  const checkInCart = (id) => {
    if (dataCart) {
      for (let i = 0; i < dataCart.length; i++) {
        if (dataCart[i].id === id) {
          return true;
        }
      }
      return false;
    } else {
      return false;
    }
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("inner")}>
        <img src={logo} className={cx("logo_nike")} alt="logo_nike" />
        <div className={cx("circle_top")}></div>
        <div className={cx("header")}>
          <div className={cx("title_header")}>Our Products</div>
          <Link className={cx("wrapper_cart")} to="/cart">
            <FontAwesomeIcon className={cx("icon_cart")} icon={faCartShopping} />
           {dataCart&&dataCart.length>0&&<div className={cx("number_cart")}>{dataCart.length}</div>}
          </Link>
        </div>
        <div className={cx("list_product")}>
          {products.map((shoe, index) => (
            <div className={cx("item_product")} key={shoe.id}>
              <img
                src={shoe.image}
                style={{
                  backgroundColor: shoe.color,
                }}
                alt="image_item"
                className={cx("image_product")}
              />
              <h3 className={cx("name_product")}>{shoe.name} </h3>
              <p className={cx("description_product")}>{shoe.description}</p>
              <div className={cx("price_add")}>
                <span className={cx("price")}>${shoe.price}</span>
                {checkInCart(shoe.id) ? (
                  <div className={cx("added_cart")}><FontAwesomeIcon className={cx("icon_check")} icon={faCheck}/></div>
                ) : (
                  <button className={cx("add_cart")} onClick={() => addCart(index)}>
                    ADD TO CART
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
