import React from "react";
import "../styles/footer.scss";
import Facebook from "../assets/icons/facebook.png";
import Instagram from "../assets/icons/instagram.png";

const Footer = (props) => {
  return (
    <>
      <div className="Footer">
        <div>
          <div className="logo" onClick={() => props.navigateTo("home")}>
            <p>The</p>
            <img
              src={
                "https://firebasestorage.googleapis.com/v0/b/toytoy-bd37c.appspot.com/o/images%2Ftoytoy.png?alt=media&token=112e5b90-5390-4dbb-b9b3-0aca0b942e86"
              }
              alt=""
            />
            <p>Library</p>
          </div>
        </div>
        <div>
          <p className="heading">Links</p>

          <div onClick={()=>props.navigateTo('home')}>Home</div>
          <div onClick={()=>props.navigateTo('toy')}>Toys</div>
          <div onClick={()=>props.navigateTo('book')}>Books</div>
          <div onClick={()=>props.navigateTo('PLP')}>All Products</div>
          <div onClick={()=>props.navigateTo('profile')}>Profile</div>
          <p className="heading">Company</p>
          <div onClick={()=>props.navigateTo('aboutus')}>About Us</div>
          <div onClick={()=>props.navigateTo('contactus')}>Contact Us</div>
          <div onClick={()=>props.navigateTo('privacy')}>Privacy</div>
        </div>

        <div>
          <p className="heading">Support</p>

          <div onClick={()=>props.navigateTo('terms')}>Terms & Conditions</div>
          <div onClick={()=>props.navigateTo('returnrefund')}>Return/Refund</div>
          <div onClick={()=>props.navigateTo('cancellation')}>Cancellation Policy</div>
        </div>
        <div>
          <p className="heading">Connect with us</p>
          <div className="social">
            <div>
              <a href="fb.com/toytoylibrary">
                <img src={Facebook} alt="" />
              </a>
            </div>
            <div>
              <a href="Instagram.com/toytoylibrary">
                <img src={Instagram} alt="" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="Footer1 Footer">
        2021 Toy Toy Library, All Rights Reserved. Developed and maintained with
        ❤️ by{" "}
        <a target="_blank" href="https://www.linkedin.com/in/adityasatnur/">
          Aditya Satnur
        </a>{" "}
        in 🇮🇳.
      </div>
    </>
  );
};
export default Footer;
