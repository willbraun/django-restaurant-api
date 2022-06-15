import MenuItem from "./MenuItem";

const MenuList = ({menuItems, addItem}) => {

    const items = menuItems.map(entry => <MenuItem key={entry.uid} {...entry} addItem={addItem}/>)

    return (
        <section className="menu-list">
            {items}
        </section>
    )
}

export default MenuList;