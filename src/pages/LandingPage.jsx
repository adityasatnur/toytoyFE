import React, { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "../styles/landingPage.scss";
import HowitWorksDesktop from "../assets/images/howitworksdesktop.jpg";
import HowitWorksMobile from "../assets/images/howitworksmobile.jpg";
import Garden from "../assets/images/garden.jpeg";
import Seed from "../assets/images/seed.jpeg";
import Blossom from "../assets/images/blossom.jpeg";
import iconPrev from "../assets/icons/prev.svg";
import iconNext from "../assets/icons/next.svg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import itemModel from "../../../toytoyBE/itemModel";
import axios from "axios";
import { PORT } from "../serverConfig";
import {post} from '../functions/paytmFunctions';

let pinCodes = [
  "411004",
  "411035",
  "411046",
  "411003",
  "411051",
  "411007",
  "411027",
  "411002",
  "411045",
  "411007",
  "411021",
  "411042",
  "411026",
  "411039",
  "411038",
  "411037",
  "411020",
  "411001",
  "411031",
  "411019",
  "411033",
  "411005",
  "411012",
  "411004",
  "411043",
  "411015",
  "411041",
  "411015",
  "411001",
  "411014",
  "411003",
  "411038",
  "411004",
  "411007",
  "411042",
  "411016",
  "411028",
  "411016",
  "411042",
  "411003",
  "411028 ",
  "411013",
  "411032",
  "411026",
  "411057",
  "411033",
  "411017",
  "411002",
  "411052",
  "411034",
  "411011",
  "411046",
  "411003",
  "411048",
  "411030",
  "411019",
  "411011",
  "411018",
  "411016",
  "411060",
  "411036",
  "411048",
  "411008",
  "411045",
  "411001",
  "411002",
  "411041",
  "411030",
  "411052",
  "411018",
  "411044",
  "411009",
  "411061",
  "411017",
  "411018 ",
  "411033",
  "411001",
  "411002 ",
  "411020 ",
  "411030",
  "411011",
  "411002",
  "411030",
  "411005",
  "411027",
  "411028",
  "411030",
  "411016",
  "411005",
  "411023",
  "411002",
  "411041",
  "411022",
  "411021",
  "411042",
  "411014",
  "411014",
  "411015",
  "411057",
  "411058",
  "411040",
  "411044",
  "411006",
];
import { pinCodesWithRates } from "../functions/pincodes";

function NextArrow(props) {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <img src={iconNext} alt="" />
    </div>
  );
}

function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <img src={iconPrev} alt="" />
    </div>
  );
}

const LandingPage = (props) => {
  const settings = {
    dots: false,
    arrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },

      {
        breakpoint: 550,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  const history = useHistory();
  const [pin, setPin] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isDeliverable, setIsDeliverable] = useState(null);
  const [deliveryCharges, setDeliveryCharges] = useState(0);
  const [qty, setQty] = useState(1);
  const plans = useRef(null);
  const executeScroll = () => plans.current.scrollIntoView();
  const [popularToys, setPopularToys] = useState([]);
  const [popularBooks, setPopularBooks] = useState([]);
  const [buyingOptions, setBuyingOptions] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  useEffect(() => {
    if (history.location.state && history.location.state.fromPlans) {
      history.push({
        state: { ...history.location.state, fromPlans: false },
      });
      executeScroll();
    }
    if (props.items) {
      let books = props.items.filter(
        (item) => item.popular === true && item.type === "book"
      );
      setPopularBooks(books);
      let toys = props.items.filter(
        (item) => item.popular === true && item.type === "toy"
      );
      setPopularToys(toys);
    }
  }, [history.location.state, props.items]);
  const navigateToPlp = (filt) => {
    history.push({
      pathname: "/PLP",
      state: { filteredData: filt },
    });
  };
  const setQuantity = (e) => {
    let qty = e.target.value;
    setQty(qty);
  };
  const routeToPDP = (item) => {
    history.push({
      pathname: "/PDP",
      state: { item: item },
    });
  };
  const inputChange = (e) => {
    let inputVal = e.target.value;
    if (pinCodesWithRates[inputVal]) {
      setDeliveryCharges(pinCodesWithRates[inputVal]);
    }else{
      setDeliveryCharges(0);

    }
    
  };
  const redirectToPaytm = () => {
    let data = {
      credits: qty,
      amount: (deliveryCharges*qty),
      userId: props.userData._id,

    };
    axios
      .post(`${PORT}/api/buyCredits`, data)
      .then((res) => {
        var information = {
          //action:`https://securegw-stage.paytm.in/theia/api/v1/showPaymentPage?mid=${res.data.mid}&orderId=${res.data.orderId}`,
          action: `https://securegw.paytm.in/theia/api/v1/showPaymentPage?mid=${res.data.mid}&orderId=${res.data.orderId}`,
          params: res,
        };
        post(information);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const pinCodeChecker = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    if (pin.length === 6 && pinCodes.find((el) => el === pin)) {
      setIsDeliverable(true);
    } else setIsDeliverable(false);
  };
  const goToCheckout = (plan) => {
    let itemData = {};
    switch (plan) {
      case "Plan1":
        itemData = {
          name: "Seed Plan 1 Month Expiry",
          cost: 1500,
          image: Seed,
          _id: "Plan1",
        };
        break;
      case "Plan2":
        itemData = {
          name: "Blossom Plan 3 Month Expiry",
          cost: 2400,
          image: Blossom,
          _id: "Plan2",
        };
        break;
      case "Plan3":
        itemData = {
          name: "Garden Plan 6 Month Expiry",
          cost: 2700,
          image: Garden,
          _id: "Plan3",
        };
        break;
    }
    debugger;
    localStorage.setItem("plans", JSON.stringify(itemData));
    history.push({
      pathname: "/checkout",
    });
  };
  const showBuyingOptions = () => {
    setBuyingOptions(true);
  };
  const pinType = (e) => {
    setPin(e.target.value);
  };
  return (
    <div className="LandingPage">
      <div className="brandBanner">
        <div className="pinCheck">
          <p>
            Welcome to <span>The ToyToy Library</span>
          </p>
          <p>
            Keep your kids off the screens and bring them to real life play with
            The ToyToy Library, Get new Toys and Books every week on rental
            basis.
          </p>
          <p>
            Excited?? Check your <b>pincode</b> for eligibilty:{" "}
          </p>
          <form action="" onSubmit={pinCodeChecker}>
            <input type="text" maxLength="6" onChange={pinType} maxLength={6} />
            <input type="submit" value="Search" />
          </form>
          {formSubmitted ? (
            isDeliverable ? (
              <p className="congrats">Congrats, you are Eligible.</p>
            ) : (
              <p className="sorry">
                Sorry, we dont deliver to your area.
                <br /> We'll be serving your region soon.
              </p>
            )
          ) : null}
        </div>
        <div className="illustrator1"></div>
      </div>
      <div className="homepageCarousel">
        <div className="header">Popular Toys</div>
        {popularToys && popularToys.length && (
          <Slider {...settings}>
            {popularToys.map((item) => {
              return (
                <div>
                  <div
                    className="carousel-product"
                    onClick={() => routeToPDP(item)}
                  >
                    <div>
                      <div
                        style={{ backgroundImage: `url(${item.image})` }}
                      ></div>
                      <p>{item.name}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </Slider>
        )}
      </div>
      <div className="credits">
        <div>
          <p>Use each Credit for every Delivery for rented items.</p>
          <button onClick={showBuyingOptions}>Buy Credits</button>
          {buyingOptions && (
            <>
              <div className="row">
                <label htmlFor="name">
                  Pin Code <span className="star">*</span>
                </label>
                <input
                  name="pinCode"
                  type="text"
                  defaultValue={props.userData && props.userData.pinCode}
                  onChange={inputChange}
                  minLength="6"
                  maxLength="6"
                />
              </div>
              <div>
                Credits = {deliveryCharges}&#8377; X{" "}
                <input type="number" defaultValue={1} onChange={setQuantity} />{" "}
                = {deliveryCharges * qty}&#8377;
              </div>
              {deliveryCharges * qty > 0 && (
                <button onClick={redirectToPaytm}>Pay Now</button>
              )}
            </>
          )}
        </div>
        <div>
          Your Credits: <span>{(props.userData && props.userData.credits)?props.userData.credits: 0}</span>
        </div>
      </div>
      <div className="howItWorks">
        <p>How it works!</p>
        <img
          src={window.innerWidth > 600 ? HowitWorksDesktop : HowitWorksMobile}
          alt=""
        />
      </div>
      <div className="homepageCarousel">
        <div className="header">Popular Books</div>
        {popularBooks && popularBooks.length && (
          <Slider {...settings}>
            {popularBooks.map((item) => {
              return (
                <div>
                  <div
                    className="carousel-product"
                    onClick={() => routeToPDP(item)}
                  >
                    <div>
                      <div
                        style={{ backgroundImage: `url(${item.image})` }}
                      ></div>
                      <p>{item.name}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </Slider>
        )}
      </div>
      <div className="infoBanners toys">
        <div>
          <div>
            <p>Toys</p>
            Select from variety of 500+ handpicked toys from top brands for all
            age groups, which will keep your kid off digital screens and have a
            wonderful real play experience for hours. <br /> Also you get some
            Me-Time while your kid develops some real skills.
          </div>
          <button onClick={() => navigateToPlp("toy")}>
            Go to Toys Section
          </button>
        </div>
        <div></div>
      </div>
      <div className="infoBanners books">
        <div>
          <div>
            <p>Books</p>
            How about some stories!!! At ToyToy, we provide the best books from
            different categories selected by experts. These books are full
            package of entertainment with the great learnings and knowledge for
            your kid. <br />
            So, what are you waiting for?
          </div>
          <button onClick={() => navigateToPlp("book")}>
            {" "}
            Go to Books Section
          </button>
        </div>
        <div></div>
      </div>
      <div className="infoBanners buyout">
        <div>
          <div>
            <p>Purchase</p>
            Liked our toys so much that you want to make them yours forever?
            Yes, we also provide a buying option. Choose from a wide variety of
            products to buy from our site delivered directly to your home.
            <br />
            Isn't that interesting? Click button and check the stuff available
            to buyout.
          </div>
          <button onClick={() => navigateToPlp("buyout")}>
            Go to Buyout Section
          </button>
        </div>

        <div></div>
        {/* <img src={} alt=""/> */}
      </div>

      <div className="pricing" ref={plans}>
        <p>Our Plans</p>
        <div>
          <div className="pricing-item">
            <img src={Seed} alt="" />
            <h3>Seed</h3>
            <p>
              Duration: <span className="highlight">1</span> Month
            </p>
            <p>
              Price: <span className="highlight">500</span>
            </p>
            <p>
              Free Credits: <span className="highlight">0</span>
            </p>
            <p>Deposit: 1000</p>
            <button onClick={() => goToCheckout("Plan1")}>Buy Now</button>
          </div>
          <div className="pricing-item">
            <img src={Blossom} alt="" />
            <h3>Blossom</h3>
            <p>
              Duration: <span className="highlight">3</span> Months
            </p>
            <p>
              Price: <span className="highlight">1400</span>
            </p>
            <p>
              Free Credits: <span className="highlight">1</span>
            </p>
            <p>Deposit: 1000</p>
            <button onClick={() => goToCheckout("Plan2")}>Buy Now</button>
          </div>
          <div className="pricing-item">
            <img src={Garden} alt="" />
            <h3>Garden</h3>
            <p>
              Duration: <span className="highlight">6</span> Months
            </p>
            <p>
              Price: <span className="highlight">2700</span>
            </p>
            <p>
              Free Credits: <span className="highlight">3</span>
            </p>
            <p>No Deposit</p>
            <button onClick={() => goToCheckout("Plan3")}>Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LandingPage;
