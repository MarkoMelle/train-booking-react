import "./HowItWorks.css";
import desktopImg from "../../../assets/images/desktop.png";
import officeImg from "../../../assets/images/office.png";
import earth from "../../../assets/images/earth.png";

export default function HowItWorks() {
  const block = "how-it-works";
  return (
    <div className={`${block} wrapper`} id="how-it-works">
      <div className={`${block}__title`}>
        <h2 className={`${block}__title-text`}>Как это работает</h2>
        <a href="#" className={`${block}__title-link`}>
          Узнать больше
        </a>
      </div>
      <div className={`${block}__content`}>
        <div className="how-it-works__content-item">
          <img
            className={`${block}__content-item-img`}
            src={desktopImg}
            alt="desktop logo"
          />
          <p className={`${block}__content-item-text`}>
            Удобный заказ на сайте
          </p>
        </div>
        <div className={`${block}__content-item`}>
          <img
            className={`${block}__content-item-img`}
            src={officeImg}
            alt="office logo"
          />
          <p className={`${block}__content-item-text`}>
            Нет необходимости ехать в офис
          </p>
        </div>
        <div className={`${block}__content-item`}>
          <img
            className={`${block}__content-item-img`}
            src={earth}
            alt="earth logo"
          />
          <p className={`${block}__content-item-text`}>
            Огромный выбор направлений
          </p>
        </div>
      </div>
    </div>
  );
}
