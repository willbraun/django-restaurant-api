import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import AdminOrder from './AdminOrder';

function handleError(err) {
	console.warn(err);
}

const AdminOrderList = () => {
    const [orderList, setOrderList] = useState([]);

    useEffect(() => {
		const getOrders = async () => {
			const response = await fetch('/api_v1/orders/').catch(handleError);
			
			if (!response.ok) {
				throw new Error('Network response was not ok!');
			}

			const data = await response.json()
            data.forEach(item => item.uid = uuidv4());

			setOrderList(data);
		}

		getOrders();
	}, [])

    const orderListRender = orderList.map(order => <AdminOrder key={order.uid} {...order}/>);
    

    return (
        <section>
            <h2>Orders</h2>
            {orderListRender}
        </section>
    )
}

export default AdminOrderList;