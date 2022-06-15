import plus from './../images/circle-plus-solid.svg'
import minus from './../images/circle-minus-solid.svg'
import trashCanIcon from './../images/trash-solid.svg';

const OrderItem = ({title, price, uid, quantity, imgSrc, removeItem, increaseQuantity, decreaseQuantity}) => {

    return (
        <article className="order-item">
            <div className="img-box-order">
                <img src={imgSrc} alt={title} />
            </div>
            <div className="order-content">
                <p>{title}</p>
                <div className="price-and-selector">
                    <p>{`$${(parseFloat(price) * quantity).toFixed(2)}`}</p>
                    <div className="quantity-select">
                        <button type="button" onClick={() => decreaseQuantity(uid)}>
                            <img src={minus} alt="minus sign icon" />
                        </button>
                        <p>{quantity}</p>
                        <button type="button" onClick={() => increaseQuantity(uid)}>
                            <img src={plus} alt="plus sign icon" />
                        </button>
                    </div>
                </div>
            </div>
            <button className="trash-can" type="button" onClick={() => removeItem(uid)}>
                <img src={trashCanIcon} alt="trash can icon" />
            </button>
        </article>
    )
}

export default OrderItem;