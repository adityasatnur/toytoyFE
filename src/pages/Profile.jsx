import React, { useState } from "react";
import axios from "axios";
import "../styles/Profile.scss";
import { PORT } from "../serverConfig";
const Profile = ({ userData }) => {
  const [formData, setFormData] = useState({});
  const [userUpdatedMessage, setUserUpdatedMessage] = useState(null);
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
      kidName: formData.kidName ? formData.kidName : userData.userKidName,
      kidSchoolName: formData.kidSchoolName
        ? formData.kidSchoolName
        : userData.userKidSchool,
      address: formData.address ? formData.address : userData.userAddress,
      pinCode: formData.pinCode ? formData.pinCode : userData.userPinCode,
      referredBy: formData.referredBy
        ? formData.referredBy
        : userData.ReferredBy,
    };
    debugger;
    await axios
      .post(`${PORT}/api/updateUserData`, data, {
        headers: {
          // 'Content-Type': 'application/plain',
        },
      })
      .then((res) => {
          if(res.status===400){
              console.log(res)
          }
          if(res.status===200){
            console.log(res)
        }
        setUserUpdatedMessage(res.data.user);
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
            minLength='10'
            maxLength='10'
            defaultValue={userData.userPhoneNumber}
            onChange={inputChange}
          />
        </div>
        <div className="row">
          <label htmlFor="name">Kid's Name</label>
          <input
            name="kidName"
            type="text"
            defaultValue={userData.userKidName}
            onChange={inputChange}
          />
        </div>
        <div className="row">
          <label htmlFor="name">Kid's School Name</label>
          <input
            name="kidSchoolName"
            type="text"
            defaultValue={userData.userKidSchool}
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
            minLength='6'
            maxLength='6'
          />
        </div>
        <div className="row">
          <label htmlFor="name">Referred By</label>
          <input
            name="referredBy"
            type="text"
            defaultValue={userData.ReferredBy}
            onChange={inputChange}
            disabled
          />
        </div>

        <div className="row">
          <p>Your Subscription Details</p>
          <p>{userData.userPlanType}</p>
        </div>
        <div className="row">
          <p> Subscription End Date</p>
          <p>{userData.userSubscriptionEndDate}</p>
        </div>
        <div className="row">
          <input
            type="submit"
            value={userUpdatedMessage ? "Updated" : "Update"}
            style={{ background: userUpdatedMessage && "#50b061" }}
          />
        </div>
      </form>
      <div>{userUpdatedMessage && userUpdatedMessage}</div>
    </div>
  );
};

export default Profile;
