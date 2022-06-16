import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import AdminMenuItem from './AdminMenuItem';

function handleError(err) {
	console.warn(err);
}

const AdminMenuList = ({state, updatePage, updateMenuItemList}) => {

    useEffect(() => {
		const getMenuItems = async () => {
			const response = await fetch('/api_v1/foods/admin/').catch(handleError);
			
			if (!response.ok) {
				throw new Error('Network response was not ok!');
			}

			const data = await response.json()
            data.forEach(item => item.uid = uuidv4());

			updateMenuItemList(data);
		}

		getMenuItems();
	}, [])

    const menuItemListRender = state.menuItemList.map(menuItem => <AdminMenuItem key={menuItem.uid} {...menuItem}/>);

    return (
        <section>
            <div className="menu-items-bar">
                <h2>Menu Items</h2>
                <button type="button" className="btn btn-primary add-menu-item-button" onClick={() => updatePage('add-menu-item-form')}>+ Add Menu Item</button>    
            </div>
            {menuItemListRender}
        </section>
    )
}

export default AdminMenuList;