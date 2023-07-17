import { Link } from "react-router-dom";
import { useState } from "react";
import "./Footer.css";

import youtubeIcon from "../../assets/icons/youtube.svg";
import linkedinIcon from "../../assets/icons/linkedin.svg";
import googlePlusIcon from "../../assets/icons/google-plus.svg";
import facebookIcon from "../../assets/icons/facebook.svg";
import twitterIcon from "../../assets/icons/twitter.svg";
import arrowUpIcon from "../../assets/icons/arrow-up.svg";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Отправлено");
  };

  const handleInputChange = (event) => {
    setEmail(event.target.value);
  };

  return (
    <footer className="footer wrapper">
      <div className="footer__container">
        <div className="footer__contact">
          <h3 className="footer__title">Свяжитесь с нами</h3>
          <ul className="footer__contact-list">
            <li className="footer__contact-item">
              <a
                href="tel:+78000000000"
                className="footer__link footer__link--phone"
              >
                8 (800) 000 00 00
              </a>
            </li>
            <li className="footer__contact-item">
              <a
                href="mailto:inbox@mail.ru"
                className="footer__link footer__link--email"
              >
                inbox@mail.ru
              </a>
            </li>
            <li className="footer__contact-item">
              <a
                href="skype:tu.train.tickets?сhat"
                className="footer__link footer__link--skype"
              >
                tu.train.tickets
              </a>
            </li>
            <li className="footer__contact-item">
              <a
                href="https://yandex.ru/maps/-/CCUjZ0dbsC"
                className="footer__link footer__link--address"
                target="_blank" rel="noreferrer"
              >
                <span className="footer__link-text">г. Москва</span>
                <span className="footer__link-text">ул. Московская 27-35</span>
                <span className="footer__link-text">555 555</span>
              </a>
            </li>
          </ul>
        </div>
        <form className="footer__form" onSubmit={handleSubmit}>
          <h3 className="footer__title">Подписка</h3>
          <fieldset className="footer__fieldset">
            <legend className="footer__legend">Будьте в курсе событий</legend>
            <input
              type="email"
              className="footer__input form-input"
              placeholder="email"
              value={email}
              onChange={handleInputChange}
            />
            <button
              className="footer__button"
              type="submit"
              onClick={handleSubmit}
            >
              Отправить
            </button>
          </fieldset>
        </form>
        <div className="footer__social">
          <h3 className="footer__title">Подписывайтесь на нас</h3>
          <ul className="footer__social-list">
            <li className="footer__social-item">
              <a
                href="https://www.youtube.com/"
                className="footer__social-link"
                target="_blank"
                rel="noreferrer"
              >
                <img src={youtubeIcon} alt="youtube" />
              </a>
            </li>
            <li className="footer__social-item">
              <a
                href="https://www.linkedin.com/"
                className="footer__social-link"
                target="_blank"
                rel="noreferrer"
              >
                <img src={linkedinIcon} alt="linkedin" />
              </a>
            </li>
            <li className="footer__social-item">
              <a
                href="https://www.plus.google.com/"
                className="footer__social-link"
                target="_blank"
                rel="noreferrer"
              >
                <img src={googlePlusIcon} alt="google plus" />
              </a>
            </li>
            <li className="footer__social-item">
              <a
                href="https://www.facebook.com/"
                className="footer__social-link"
                target="_blank"
                rel="noreferrer"
              >
                <img src={facebookIcon} alt="facebook" />
              </a>
            </li>
            <li className="footer__social-item">
              <a
                href="https://www.twitter.com/"
                className="footer__social-link"
                target="_blank"
                rel="noreferrer"
              >
                <img src={twitterIcon} alt="twitter" />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer__nav">
        <ul className="footer__nav-list">
          <li className="footer__nav-item">
            <Link to="/" className="footer__nav-logo"
             >Лого</Link>
          </li>
          <li className="footer__nav-item">
            <a href="#header" className="footer__nav-link">
              <img src={arrowUpIcon} alt="arrow up" />
            </a>
          </li>
          <li className="footer__nav-item">
            <a href="#" className="footer__nav-link">
              2018 WEB
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
