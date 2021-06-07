import React from "react";
import { useHistory } from "react-router-dom";
import "../styles/ProductDetailsPage.scss";

const ProductDetailsPage = (props) => {
  const history = useHistory();
  const itemData = history.location.state.item;
  return (
    <div className="ProductDetailsPage">
        <div className="ProductDetailsPage-imageBox">

            <img src={itemData.image} alt="" />
        </div>
      <div className="ProductDetailsPage-rightBox">
          <div className="item-name">{itemData.name}</div>
            {/* <div className="item-type">{itemData.type}</div> */}
            <div className="item-toySet">{itemData.toySet}</div>
      </div>
    </div>
  );
};
export default ProductDetailsPage;
