import { useState } from 'react'
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

    const [customerName, setCustomerName] = useState('');

    const orders = state.selection.map(order => <OrderItem key={order.id} {...order} removeItem={removeItem} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity}/>);
    const total = state.selection.reduce((acc, i) => acc + (parseFloat(i.price) * i.quantity), 0).toFixed(2);

    const order = {
        data: {
            customerName: customerName,
            items: state.selection.map(item => showOnlyAllowed(item)),
            total: total,
        }
    }

    const addOrder = async (order) => {

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

    const submitForm = (e) => {
        e.preventDefault();
        addOrder(order);
        setCustomerName('');
        e.target.reset();
    }

    return (
        <section className="order">
            <div className="order-area">
                {orders}
            </div>
            <form className="checkout-form" onSubmit={submitForm}>
                <label htmlFor="customerName"></label>
                <input type="text" id="customerName" placeholder="Please enter your name..." required onChange={(e) => setCustomerName(e.target.value)}></input>
                <button type="submit">
                    <div>Checkout</div>
                    <div>{`$${total}`}</div>
                </button>
            </form>
            
        </section>
    )
}

export default Order;