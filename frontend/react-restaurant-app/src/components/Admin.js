import { useState } from 'react'

const Admin = () => {
    const [adminPage, setAdminPage] = useState('orders')

    const displayAdminPage = (page) => {
        if (page === 'orders') {
            return adminOrdersView;
        }
        else if (page === 'menu-items') {
            return adminMenuItemsView;
        }
        else {
            return (
                <>Error</>
            )
        }
    
    }

    const adminOrdersView = (
        <>
            <h2>Orders</h2>
        </>
    )

    const adminMenuItemsView = (
        <>
            <h2>Menu Items</h2>
        </>
    )

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