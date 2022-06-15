import { useState, useEffect } from 'react';
import AdminOrder from './AdminOrder';

function handleError(err) {
	console.warn(err);
}

const AdminOrderList = () => {
    const [orderList, setOrderList] = useState([]);

    // map over order list to create list of AdminOrders

    useEffect(() => {
		const getOrders = async () => {
			const response = await fetch('/api_v1/orders/').catch(handleError);
			
			if (!response.ok) {
				throw new Error('Network response was not ok!');
			}

			const data = await response.json()
			setOrderList(data);
		}

		getOrders();
	}, [])

    const testOrder = orderList[0].map(order => <AdminOrder {...order}/>);

    return (
        <section>
            <h2>Orders</h2>
            {testOrder}
        </section>
    )
}

export default AdminOrderList;