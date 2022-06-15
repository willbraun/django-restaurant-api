import { useState } from 'react'

const AdminOrder = ({data, completed, cancelled}) => {
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
            </div>
        </article>
    )
}

export default AdminOrder;