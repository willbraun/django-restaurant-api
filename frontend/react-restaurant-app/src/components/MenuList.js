// import DATA from './../data.js'
import MenuItem from "./MenuItem";

const MenuList = ({menuItems, addItem}) => {

    const items = menuItems.map((entry,i) => <MenuItem key={i} {...entry} addItem={addItem}/>)

    return (
        <section className="menu-list">
            {items}
        </section>
    )
}

export default MenuList;