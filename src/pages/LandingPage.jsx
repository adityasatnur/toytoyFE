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
  const plans = useRef(null);
  const executeScroll = () => plans.current.scrollIntoView();
  useEffect(() => {
    if (history.location.state && history.location.state.fromPlans) {
      history.push({
        state: { fromPlans: false },
      });
      executeScroll();
    }
  }, [history.location.state]);
  const navigateToPlp = (filt) => {
    history.push({
      pathname: "/PLP",
      state: { filteredData: filt },
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
          image: "",
          _id: "Plan1",
        };
        break;
      case "Plan2":
        itemData = {
          name: "Blossom Plan 2 Month Expiry",
          cost: 2400,
          image: "",
          _id: "Plan2",
        };
        break;
      case "Plan3":
        itemData = {
          name: "Garden Plan 3 Month Expiry",
          cost: 2700,
          image: "",
          _id: "Plan3",
        };
        break;
    }
    history.push({
      pathname: "/checkout",
      state: { plans: itemData },
    });
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
        <Slider {...settings}>
          {props.items.map((item) => {
            item.popular && item.type === "toy" && (
              <div>
                <div className="carousel-product">
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
        <Slider {...settings}>
          {props.items.map((item) => {
            item.popular && item.type === "book" && (
              <div>
                <div className="carousel-product">
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
            <p>Duration: 1 Month</p>
            <p>
              Price: <span className="highlight">500</span>
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
            <p>No Deposit</p>
            <button onClick={() => goToCheckout("Plan3")}>Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LandingPage;
