import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import AdminMenuItem from './AdminMenuItem';

function handleError(err) {
	console.warn(err);
}

const AdminMenuList = () => {
    const [menuItemList, setMenuItemList] = useState([]);

    useEffect(() => {
		const getMenuItems = async () => {
			const response = await fetch('/api_v1/foods/admin/').catch(handleError);
			
			if (!response.ok) {
				throw new Error('Network response was not ok!');
			}

			const data = await response.json()
            data.forEach(item => item.uid = uuidv4());

			setMenuItemList(data);
		}

		getMenuItems();
	}, [])

    const menuItemListRender = menuItemList.map(menuItem => <AdminMenuItem key={menuItem.uid} {...menuItem}/>);

    return (
        <section>
            <h2>Menu Items</h2>
            {menuItemListRender}
        </section>
    )
}

export default AdminMenuList;