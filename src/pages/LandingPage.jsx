import React from "react";
import { useHistory } from "react-router-dom";
import "../styles/landingPage.scss";
import HowitWorksDesktop from "../assets/images/howitworksdesktop.jpg";
import HowitWorksMobile from "../assets/images/howitworksmobile.jpg";
import iconPrev from "../assets/icons/prev.svg";
import iconNext from "../assets/icons/next.svg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

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

const LandingPage = () => {
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

  const navigateToPlp = (filt) => {
    history.push({
      pathname: "/PLP",
      state: { filteredData: filt },
    });
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
          <form action="">
            <input type="text" maxLength="6" />
            <input type="submit" value="Search" />
          </form>
          <p className="congrats">Congrats, you are Eligible.</p>
          <p className="sorry">
            Sorry, we dont deliver to your area.
            <br /> We'll be serving your region soon.
          </p>
        </div>
        <div className="illustrator1"></div>
      </div>
      <div className="homepageCarousel">
        <div className="header">Popular Toys</div>
        <Slider {...settings}>
          <div>
            <div className="carousel-product">
              <div>
                <div
                  style={{ backgroundImage: `url(${HowitWorksMobile})` }}
                ></div>
                <p>lorem ipsum</p>
              </div>
            </div>
          </div>
          <div>
            <div className="carousel-product">
              <div>
                <div
                  style={{ backgroundImage: `url(${HowitWorksMobile})` }}
                ></div>
                <p>lorem ipsum</p>
              </div>
            </div>
          </div>
          <div>
            <div className="carousel-product">
              <div>
                <div
                  style={{ backgroundImage: `url(${HowitWorksMobile})` }}
                ></div>
                <p>lorem ipsum</p>
              </div>
            </div>
          </div>
          <div>
            <div className="carousel-product">
              <div>
                <div
                  style={{ backgroundImage: `url(${HowitWorksMobile})` }}
                ></div>
                <p>lorem ipsum</p>
              </div>
            </div>
          </div>
          <div>
            <div className="carousel-product">
              <div>
                <div
                  style={{ backgroundImage: `url(${HowitWorksMobile})` }}
                ></div>
                <p>lorem ipsum</p>
              </div>
            </div>
          </div>
          <div>
            <div className="carousel-product">
              <div>
                <div
                  style={{ backgroundImage: `url(${HowitWorksMobile})` }}
                ></div>
                <p>lorem ipsum</p>
              </div>
            </div>
          </div>
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
          <div>
            <div className="carousel-product">
              <div>
                <div
                  style={{ backgroundImage: `url(${HowitWorksMobile})` }}
                ></div>
                <p>lorem ipsum</p>
              </div>
            </div>
          </div>
          <div>
            <div className="carousel-product">
              <div>
                <div
                  style={{ backgroundImage: `url(${HowitWorksMobile})` }}
                ></div>
                <p>lorem ipsum</p>
              </div>
            </div>
          </div>
          <div>
            <div className="carousel-product">
              <div>
                <div
                  style={{ backgroundImage: `url(${HowitWorksMobile})` }}
                ></div>
                <p>lorem ipsum</p>
              </div>
            </div>
          </div>
          <div>
            <div className="carousel-product">
              <div>
                <div
                  style={{ backgroundImage: `url(${HowitWorksMobile})` }}
                ></div>
                <p>lorem ipsum</p>
              </div>
            </div>
          </div>
          <div>
            <div className="carousel-product">
              <div>
                <div
                  style={{ backgroundImage: `url(${HowitWorksMobile})` }}
                ></div>
                <p>lorem ipsum</p>
              </div>
            </div>
          </div>
          <div>
            <div className="carousel-product">
              <div>
                <div
                  style={{ backgroundImage: `url(${HowitWorksMobile})` }}
                ></div>
                <p>lorem ipsum</p>
              </div>
            </div>
          </div>
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
            Isn't
            that interesting?
            Click button and check the stuff available to buyout.
          </div>
          <button onClick={() => navigateToPlp("buyout")}>
            Go to Buyout Section
          </button>
        </div>

        <div></div>
        {/* <img src={} alt=""/> */}
      </div>
    </div>
  );
};
export default LandingPage;
