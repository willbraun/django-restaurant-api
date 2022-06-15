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
    let table;

    if (items) {
        const tableRows = items.map((item, i) => (
            <tr key={i}>
                <td>{item.title}</td>
                <td>{item.quantity}</td>
            </tr>
        ))

        table = (
            <table>
                <thead>
                    <tr>
                        <th>Menu Item</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {tableRows}
                </tbody>
            </table>
        )
    }


    return (
        <article className="admin-order">
            <div className="left">
                <p>{data.customerName}</p>
                {table}
                <label htmlFor="completed">Completed</label>
                <input type="checkbox" id="completed" defaultChecked={state.completed} onChange={(e) => updateOrder({...state, completed: e.target.checked})}/>
                <label htmlFor="cancelled">Cancelled</label>
                <input type="checkbox" id="cancelled" defaultChecked={state.cancelled} onChange={(e) => updateOrder({...state, cancelled: e.target.checked})}/> 
            </div>
        </article>
    )
}

export default AdminOrder;