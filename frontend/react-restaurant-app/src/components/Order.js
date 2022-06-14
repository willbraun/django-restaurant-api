import OrderItem from './OrderItem';

const Order = ({state, removeItem, increaseQuantity, decreaseQuantity}) => {

    const orders = state.selection.map(order => <OrderItem key={order.id} {...order} removeItem={removeItem} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity}/>);
    const total = state.selection.reduce((acc, i) => acc + (i.price * i.quantity), 0).toFixed(2);

    const replaceLocaleStorage = (array) => {
        localStorage.clear();
        array.forEach((item, i) => localStorage.setItem(i, JSON.stringify(item)))
    }

    return (
        <section className="order">
            <div className="order-area">
                {orders}
            </div>
            <button className="checkout" type="button" onClick={() => replaceLocaleStorage(state.selection)}>
                <div>Checkout</div>
                <div>{`$${total}`}</div>
            </button>
        </section>
    )
}

export default Order;