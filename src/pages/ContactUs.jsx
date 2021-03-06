import React,{ useEffect} from "react";
import '../styles/Documentation.scss'

const ContactUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <div className="Documentation">
      <div className="heading">Contact Us</div>
      <div className="sub-heading">For any queries or questions please email us on toytoylibrary@gmail.com OR call/whatsapp us on +919359232953</div>
      </div>
  )}
  export default ContactUs;