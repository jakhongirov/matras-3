import "./Product.scss";
import { useEffect, useState } from "react";
import Shop from "../../assets/shop";
import zoomIn from "../../images/zoom_in.png";

const Product = ({ product, setModal, setModal2, setPr: setProduct }) => {

  function clickHandler(e) {
    setModal(e.target.dataset.id);
  }

  function productHandler(e) {
    setProduct(e.target.attributes.getNamedItem("data-id").value);
    setModal2(true);
  }

  return (
    <li className="products-list__item">
      <button onClick={clickHandler} data-id={product.prod_id}  className="product__zoom-btn product__zoom-btn2">
            <img data-id={product.prod_id} src={zoomIn} alt="" />
          </button>
      <div className="products-list__wr">
        <div className="product__btn-wr">
          {product.prod_new && product.prod_stock ? (
            <>
              <p className="product__isnew ">Yangi mahsulot</p>
              <p className="product__isnew product__sale product__twopart">
                Aksiya
              </p>
            </>
          ) : product.prod_new ? (
            <p className="product__isnew">Yangi mahsulot</p>
          ) : product.prod_stock ? (
            <p className="product__isnew product__sale">Aksiya</p>
          ) : (
            <p className="product__helloworld"></p>
          )}
          
        </div>
        <img src={product.prod_image[0]} className="product__mainim" alt="" />
      </div>
      <div className="products-list__wrapper">
        <h3 className="product__name">{product.prod_name}</h3>
        <ul className="product__detail">
          <li>
            <p className="product__detail-name">Yuklanma</p>
            <p className="product__detail-info">
              <span className="product__detail-number">{product.prod_weight} </span>
              kg
            </p>
          </li>
          <li>
            <p className="product__detail-name">Kafolat</p>
            <p className="product__detail-info">
              <span className="product__detail-number">
                {`${product.prod_warrant} `}
              </span>
              yil
            </p>
          </li>
          <li>
            <p className="product__detail-name">O’lchami</p>
            <p className="product__detail-info">
              <span className="product__detail-number">
                {product.prod_size}
              </span>
            </p>
          </li>
          <li>
            <p className="product__detail-name">Sig’imi</p>
            <p className="product__detail-info">
              <span className="product__detail-number">
                {`${product.prod_capacity} `}
              </span>
              kishilik
            </p>
          </li>
        </ul>
        <p className="product__info">{product.prod_desc}</p>
        <p className="product__price-name">Narxi</p>
        {product.prod_stock ? (
          <p className="product__detail-info product__detail-info2">
            <span className="product__outline">
              {product.prod_stock ? product.prod_price : null} <span className="product__sum"> so’m</span>
            </span>
            <span className="product__detail-number"> {product.prod_stock ? product.prod_stock : null}</span>
            so’m
          </p>
        ) : (
          <p className="product__detail-info">
            <span className="product__detail-number">{!product.prod_stock ? product.prod_price : null}</span>
            so’m
          </p>
        )}
        <button
          className="product__button"
          data-id={product.prod_id}
          onClick={productHandler}
        >
          Buyurtma berish <Shop />
        </button>
      </div>
    </li>
  );
};

export default Product;
