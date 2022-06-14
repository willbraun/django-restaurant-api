import Cookies from 'js-cookie';
import OrderItem from './OrderItem';

function handleError(err) {
	console.warn(err);
}

const Order = ({state, removeItem, increaseQuantity, decreaseQuantity}) => {

    const orders = state.selection.map(order => <OrderItem key={order.id} {...order} removeItem={removeItem} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity}/>);
    const total = state.selection.reduce((acc, i) => acc + (i.price * i.quantity), 0).toFixed(2);

    // const replaceLocaleStorage = (array) => {
    //     localStorage.clear();
    //     array.forEach((item, i) => localStorage.setItem(i, JSON.stringify(item)))
    // }

    const addOrder = async (array, total) => {
		
        const customerName = 'test';

        // const items = array.map(item => {'title': item.title, 'quantity': item.quantity})

		const order = {
			customerName: customerName,
            items: items,
            total: total,
		}

		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'X-CSRFToken': Cookies.get('csrftoken'),
			},
			body: JSON.stringify(order),
		}

		const response = await fetch('/api_v1/orders/', options).catch(handleError);
		
		if(!response.ok) {
			throw new Error('Network response was not ok!');
		}
	}

    return (
        <section className="order">
            <div className="order-area">
                {orders}
            </div>
            <button className="checkout" type="button" onClick={() => addOrder(state.selection, total)}>
                <div>Checkout</div>
                <div>{`$${total}`}</div>
            </button>
        </section>
    )
}

export default Order;