import { useState } from 'react'
import Cookies from 'js-cookie';

function handleError(err) {
	console.warn(err);
}

const AdminOrder = ({id, data, completed, cancelled}) => {
    const [state, setState] = useState({
        id: id,
        data: data,
        completed: completed,
        cancelled: cancelled,
    })
    
    const updateOrder = async (newState) => {

		const options = {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				'X-CSRFToken': Cookies.get('csrftoken'),
			},
			body: JSON.stringify(newState),
		}

		const response = await fetch(`/api_v1/orders/${state.id}/`, options).catch(handleError);
		
		if(!response.ok) {
			throw new Error('Network response was not ok!');
		}

        const data = await response.json();
        console.log(data);
        setState(data);

	}
    
    const items = data.items;
    if(!items) {
		return <div>Fetching data...</div>
	}

    const tableRows = items.map((item, i) => (
        <tr key={i}>
            <td>{item.title}</td>
            <td>{item.quantity}</td>
        </tr>
    ))

    const table = (
        <table>
            <thead>
                <tr>
                    <th className="bold">Menu Item</th>
                    <th className="bold">Quantity</th>
                </tr>
            </thead>
            <tbody>
                {tableRows}
            </tbody>
        </table>
    )


    return (
        <article className="admin-order">
            <div className="left">
                <p className="customer-name">Customer: <span className="bold">{data.customerName}</span></p>
                {table}
            </div>
            <div className="right">
                <p className="order-price">Total: <span className="bold">${data.total}</span></p>
                <div>
                    <label htmlFor="completed">Completed</label>
                    <input type="checkbox" id="completed" defaultChecked={state.completed} onChange={(e) => updateOrder({...state, completed: e.target.checked})}/>
                </div>
                <div>
                    <label htmlFor="cancelled">Cancelled</label>
                    <input type="checkbox" id="cancelled" defaultChecked={state.cancelled} onChange={(e) => updateOrder({...state, cancelled: e.target.checked})}/> 
                </div>
            </div>
        </article>
    )
}

export default AdminOrder;