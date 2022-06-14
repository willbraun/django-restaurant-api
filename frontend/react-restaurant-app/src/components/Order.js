import Cookies from 'js-cookie';
import OrderItem from './OrderItem';

const handleError = err => {
	console.warn(err);
}

const showOnlyAllowed = obj => {
    const allowedProperties = ['title', 'quantity'];
    const allKeys = Object.keys(obj);
    const result = allKeys.reduce((next, key) => {
        if (allowedProperties.includes(key)) {
            return { ...next, [key]: obj[key] };
        } 
        else {
            return next;
        }
        
    }, {})
    return result
}

const Order = ({state, removeItem, increaseQuantity, decreaseQuantity}) => {

    const orders = state.selection.map(order => <OrderItem key={order.id} {...order} removeItem={removeItem} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity}/>);
    const total = state.selection.reduce((acc, i) => acc + (parseFloat(i.price) * i.quantity), 0).toFixed(2);

    const addOrder = async (selections, total) => {
		
        const customerName = 'test';

        const items = selections.map(item => showOnlyAllowed(item))

		const order = {
			data: {
                customerName: customerName,
                items: items,
                total: total,
            }
		}

		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'X-CSRFToken': Cookies.get('csrftoken'),
			},
			body: JSON.stringify(order),
		}
        console.log(options.body)
		const response = await fetch('/api_v1/orders/', options).catch(handleError);
		console.log(response)
		if(!response.ok) {
			throw new Error('Network response was not ok!');
		}
	}

    return (
        <section className="order">
            <div className="order-area">
                {orders}
            </div>
            <form className="checkout-form">
                <label htmlFor="customerName"></label>
                <input type="text" id="customerName" placeholder="Please enter your name..." required></input>
                <button type="submit" onClick={() => addOrder(state.selection, total)}>
                    <div>Checkout</div>
                    <div>{`$${total}`}</div>
                </button>
            </form>
            
        </section>
    )
}

export default Order;