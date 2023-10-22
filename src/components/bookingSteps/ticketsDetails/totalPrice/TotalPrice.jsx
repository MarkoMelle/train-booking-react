import './TotalPrice.css'

export default function TotalPrice({ price = {
   adult: 5840,
   children: 1920,
} }) {
   return (
      <div className="total-price">
         <div className="total-price__wrapper">
            <div className="total-price__title">Итого</div>
            <div className="total-price__price">{price.adult + price.children}
            </div>
         </div>
      </div>
   );
}