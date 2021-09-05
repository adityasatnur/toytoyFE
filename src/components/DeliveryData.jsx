import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Profile.scss";
import { PORT } from "../serverConfig";
import { pinCodesWithRates } from "../functions/pincodes";

const DeliveryData = ({
  userData,
  redirecToPaytm,
  total,
  rentedItemsPresent,
  setPinCode,
}) => {
  const [formData, setFormData] = useState({});
  const [userUpdatedMessage, setUserUpdatedMessage] = useState(null);
  const [deliveryCharges, setDeliveryCharges] = useState(
    pinCodesWithRates[userData.userPincode]
  );
  useEffect(() => {
    let pinCode = formData.pinCode ? formData.pinCode : userData.userPinCode;
    setDeliveryCharges(pinCodesWithRates[pinCode]);
    setPinCode(formData.pinCode ? formData.pinCode : userData.userPinCode);
    localStorage.setItem(
      "pinCode",
      formData.pinCode ? formData.pinCode : userData.userPinCode
    );
  }, [formData.pinCode]);
  const inputChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    let form = { ...formData, [name]: value };
    setFormData(form);
  };
  const updateProfile = async (e) => {
    e.preventDefault();
    let data = {
      email: userData.userEmail,
      phoneNumber: formData.phoneNumber
        ? formData.phoneNumber
        : userData.userPhoneNumber,
      address: formData.address ? formData.address : userData.userAddress,
      pinCode: formData.pinCode ? formData.pinCode : userData.userPinCode,
    };
    await axios
      .post(`${PORT}/api/updateUserData`, data, {
        headers: {
          // 'Content-Type': 'application/plain',
        },
      })
      .then((res) => {
        if (res.status === 400) {
          console.log(res);
        }
        if (res.status === 200) {
          console.log(res);
          redirecToPaytm();
        }
        // setUserUpdatedMessage(res.data.user);
      });
  };
  return (
    <div className="Profile">
      <form action="" onSubmit={updateProfile}>
        <div className="row">
          <label htmlFor="name">Name</label>
          <input type="text" defaultValue={userData.userName} disabled />
        </div>
        <div className="row">
          <label htmlFor="name">Email</label>
          <input type="text" defaultValue={userData.userEmail} disabled />
        </div>
        <div className="row">
          <label htmlFor="name">
            Phone Number <span className="star">*</span>
          </label>
          <input
            name="phoneNumber"
            type="text"
            minLength="10"
            maxLength="10"
            defaultValue={userData.userPhoneNumber}
            onChange={inputChange}
          />
        </div>
        <div className="row">
          <label htmlFor="name">
            Full Home Address <span className="star">*</span>
          </label>
          <input
            name="address"
            type="text"
            defaultValue={userData.userAddress}
            onChange={inputChange}
          />
        </div>
        <div className="row">
          <label htmlFor="name">
            Pin Code <span className="star">*</span>
          </label>
          <input
            name="pinCode"
            type="text"
            defaultValue={userData.userPincode}
            onChange={inputChange}
            minLength="6"
            maxLength="6"
          />
        </div>

        {deliveryCharges ? (
          <div className="row">
            <label></label>Delivery Charges ={" "}
            {total == 0 ? 0 : total > 799 ? 0 : deliveryCharges}
          </div>
        ) : (
          <div className="row">
            <label></label> Not Delivered to this Pincode
          </div>
        )}
        {rentedItemsPresent && (
          <div className="row">
            <label></label> Credits :{" "}
            {userData.credits > 0
              ? "1"
              : `You Dont own any credits. 1 Credit Charges = ${
                  deliveryCharges ? deliveryCharges : "Pincode not Deliverable"
                }`}
          </div>
        )}
        <div className="row">
          <input
            type="submit"
            value={userUpdatedMessage ? "Payment Done" : "Pay Now"}
            style={{ background: userUpdatedMessage && "#50b061" }}
            disabled={false}
          />
        </div>
      </form>
      <div>{userUpdatedMessage && userUpdatedMessage}</div>
    </div>
  );
};

export default DeliveryData;
