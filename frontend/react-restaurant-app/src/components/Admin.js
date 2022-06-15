import { useState } from 'react';
import AdminMenuList from './AdminMenuList';
import AdminOrderList from './AdminOrderList';

const Admin = () => {
    const [adminPage, setAdminPage] = useState('orders')

    const displayAdminPage = (page) => {
        if (page === 'orders') {
            return <AdminOrderList />;
        }
        else if (page === 'menu-items') {
            return <AdminMenuList/>;
        }
        else {
            return (
                <p>Error, that page doesn't exist</p>
            )
        }
    }

    return (
        <>
            <aside className="admin-sidebar">
                <button type="button" className="admin-orders-button" onClick={() => setAdminPage('orders')}>Orders</button>
				<button type="button" className="admin-menu-items-button" onClick={() => setAdminPage('menu-items')}>Menu Items</button>
			</aside>
			<main className="admin-main">
                {displayAdminPage(adminPage)}
			</main>
        </>
    )
}

export default Admin;