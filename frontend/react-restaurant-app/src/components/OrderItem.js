import plus from './../images/circle-plus-solid.svg'
import minus from './../images/circle-minus-solid.svg'
import trashCanIcon from './../images/trash-solid.svg';

const OrderItem = ({title, price, id, quantity, imgSrc, imgAlt, removeItem, increaseQuantity, decreaseQuantity}) => {

    return (
        <article className="order-item">
            <div className="img-box-order">
                <img src={imgSrc} alt={imgAlt} />
            </div>
            <div className="order-content">
                <p>{title}</p>
                <div className="price-and-selector">
                    <p>{`$${(parseFloat(price) * quantity).toFixed(2)}`}</p>
                    <div className="quantity-select">
                        <button type="button" onClick={() => decreaseQuantity(id)}>
                            <img src={minus} alt="minus sign icon" />
                        </button>
                        <p>{quantity}</p>
                        <button type="button" onClick={() => increaseQuantity(id)}>
                            <img src={plus} alt="plus sign icon" />
                        </button>
                    </div>
                </div>
            </div>
            <button className="trash-can" type="button" onClick={() => removeItem(id)}>
                <img src={trashCanIcon} alt="trash can icon" />
            </button>
        </article>
    )
}

export default OrderItem;