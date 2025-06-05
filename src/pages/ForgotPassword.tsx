// import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Swal from "sweetalert2";
import { Link } from 'react-router-dom';

// Define the settings for the slider
interface SliderSettings {
  slidesToShow: number;
  dots: boolean;
  infinite: boolean;
  autoplay: boolean;
  autoplaySpeed: number;
  arrows: boolean;
  slidesToScroll: number;
}

const ForgotPassword: React.FC = () => {
  const handleForgotPassword = (): void => {
    // Your forgot password logic here, calling the ForgotPassword function
    Swal.fire("Password Reset Link Sent!", "Check your email", "success");
  };

  const sliderSettings: SliderSettings = {
    slidesToShow: 1,
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    slidesToScroll: 1,
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();  // Prevent form submission (no actual API call)
  };

  return (
    <div className="login-page">
      <div id="LoaderDiv" style={{ opacity: 0.6, position: "fixed", zIndex: 9999999999 }}></div>

      <header className="main-header" style={{ display: "none" }}>
        <div className="container">
          <div className="logo">
            <img
              src="../../Content/SuperAdmin/images/logo-new.png"
              alt="logo"
              className="main-logo w-6"
            />
          </div>
        </div>
      </header>

      <div className="login_wrap">
        <div className="container-fluid">
          <div className="wraps-center row flex-xl-row flex-lg-row flex-md-row flex-sm-row flex-column-reverse">

            {/* Left Section - Form */}
            <div className="col-md-6 col-lg-6 col-sm-6 col-12 px-0">
              <div className="login_wraps-form">
                  <span>
                    <img
                      src="../../Content/SuperAdmin/images/logo-new.png"
                      alt="logo"
                      className="main-logo w-6"
                    />                  
                    </span>
                <h1 className="text-center mt-2">
                    Forgot Password?{" "}
                </h1>

                <form className="form_login" onSubmit={handleSubmit}>
                  <div className="form-group form_login-inpts">
                    <label style={{ fontWeight: 600 }}>Enter your registered email</label>
                    <input
                      type="text"
                      className="form-control text_wraps-input"
                      id="txtEmail"
                      name="txtEmail"
                      placeholder="Email"
                      autoComplete="off"
                      style={{ textTransform: "lowercase" }}
                    />
                    <div id="email_error_ForgotPassword" className="errorsClass"></div>
                  </div>

                  <div className="form-group">
                    <div className="sb-checkbox">
                      <label className="form-check-label">
                        <a href="2.ForgotPassword.html">
                        <Link to="/restaurant/login">
                          <span className="wrap-remember">Back To Login</span>
                        </Link>
                        </a>
                      </label>
                    </div>
                  </div>

                  <button type="button" className="btn btn-primary wrap_submit-signin" onClick={handleForgotPassword}>
                    Submit
                  </button>
                </form>
              </div>
            </div>

            {/* Right Section - Carousel */}
            <div className="col-md-6 col-lg-6 col-sm-6 col-12 px-0" style={{ padding: 0 }}>
              <Slider {...sliderSettings} className="carousel">
                <div>
                  <img src="../../Content/SuperAdmin/images/loginwrap.jpg" alt="login-image" className="login_image" />
                </div>
                <div>
                  <img src="../../Content/SuperAdmin/images/firstraps.jpg" alt="login-image" className="login_image" />
                </div>
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
