import { useState } from 'react';
import AddMenuItem from './AddMenuItem';
import AdminMenuList from './AdminMenuList';
import AdminOrderList from './AdminOrderList';

const Admin = () => {
    const [state, setState] = useState({
        adminPage: 'orders',
        menuItemList: [],
    })

    const displayAdminPage = (page) => {
        if (page === 'orders') {
            return <AdminOrderList />;
        }
        else if (page === 'menu-items') {
            return <AdminMenuList state={state} updatePage={updatePage} updateMenuItemList={updateMenuItemList}/>;
        }
        else if (page === 'add-menu-item-form') {
            return <AddMenuItem updatePage={updatePage} addItemToMenu={addItemToMenu}/>;
        }
        else {
            return (
                <p>Error, that page doesn't exist</p>
            )
        }
    }

    const updatePage = (newPage) => {
        setState({...state, adminPage: newPage});
    };

    const updateMenuItemList = (newList) => {
        setState({...state, menuItemList: newList});
    }

    const addItemToMenu = (newMenuItem) => {
        setState({...state, menuItemList: state.menuItemList.push(newMenuItem)});
    }

    return (
        <>
            <aside className="admin-sidebar">
                <button type="button" className="admin-orders-button" onClick={() => updatePage('orders')}>Orders</button>
				<button type="button" className="admin-menu-items-button" onClick={() => updatePage('menu-items')}>Menu Items</button>
			</aside>
			<main className="admin-main">
                {displayAdminPage(state.adminPage)}
			</main>
        </>
    )
}

export default Admin;