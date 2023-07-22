import { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Reviews.css";
import user1 from "../../assets/images/user1.png";
import user2 from "../../assets/images/user2.png";

function repeatArray(array, times) {
  let result = [];
  for(let i = 0; i < times; i++) {
    result = result.concat(array);
  }
  return result;
}

const reviewsBase = [
  {
    img: user1,
    name: "Екатерина Вальнова",
    text: "Доброжелательные подсказки на всех этапах помогут правильно заполнить поля и без затруднений купить авиа или ж/д билет, даже если вы заказываете онлайн билет впервые.",
  },
  {
    img: user2,
    name: "Евгений Стрыкало",
    text: "СМС-сопровождение до посадки Сразу после оплаты ж/д билетов и за 3 часа до отправления мы пришлем вам СМС-напоминание о поездке.",
  },
];

let reviews = repeatArray(reviewsBase, 5);

function chunkArray(array, chunkSize) {
  const result = [];
  for (let i = 0; i < array.length; i += chunkSize)
    result.push(array.slice(i, i + chunkSize));
  return result;
}

export default function Reviews() {
  const reviewsPages = chunkArray(reviews, 2);

  const settings = {
    dots: true,
    customPaging: (i) => <div className="custom-dot"></div>,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <section className="reviews wrapper" id="reviews">
      <h2 className="reviews__title">Отзывы</h2>
      <div className="reviews__content">
        <Slider {...settings}>
          {reviewsPages.map((page, pageIndex) => (
            <div className="reviews__page" key={`review-page-${pageIndex}`}>
              {page.map((review, reviewIndex) => (
                <div
                  className="review"
                  key={`review-${pageIndex}-${reviewIndex}`}
                >
                  <img
                    className="review__img"
                    src={review.img}
                    alt={`Review from ${review.name}`}
                  />
                  <div className="review__text-container">
                    <h3 className="review__name">{review.name}</h3>
                    <p className="review__text">{review.text}</p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}
