import { useState, useEffect } from 'react';
import Admin from './components/Admin';
import MenuList from './components/MenuList';
import Order from './components/Order';
import tennisBall from './images/tennis_ball.png'
import cartIcon from './images/cart-shopping-solid.svg'
import './App.css';

function handleError(err) {
	console.warn(err);
}

function App() {
	const [state, setState] = useState({
        menuItems: [],
		selection: [],
        uid: 0,
		showOrderMobile: false,
		showAdminView: false,
    });

	useEffect(() => {
		const getMenuItems = async () => {
			const response = await fetch('/api_v1/foods/').catch(handleError);
			
			if (!response.ok) {
				throw new Error('Network response was not ok!');
			}

			const data = await response.json()
			setState({...state, menuItems: data, uid: data.length});
		}

		getMenuItems()
	}, [])

	const addItem = (item) => {
		const newId = state.uid + 1;
		item.id = newId;

		const newList = state.selection;

		if (!newList.map(existing => existing.title).includes(item.title)) {
			item.quantity = 1;
			newList.push(item);
		}
		else {
			const index = newList.findIndex(existing => existing.title === item.title);
			newList[index].quantity++;
		}

		setState({...state, selection: newList, uid: newId})
	};

	const removeItem = (id) => {
		const newList = state.selection;
		const index = newList.findIndex(item => item.id === id);
		newList.splice(index, 1);
		setState({...state, selection: newList});
	}

	const increaseQuantity = (id) => {
		const newList = state.selection;
		const index = newList.findIndex(item => item.id === id);
		newList[index].quantity++;
		setState({...state, selection: newList});
	}

	const decreaseQuantity = (id) => {
		const newList = state.selection;
		const index = newList.findIndex(item => item.id === id);
		newList[index].quantity === 1 ? removeItem(id) : newList[index].quantity--;
		setState({...state, selection: newList});
	}

	const toggleOrderMobile = () => {
		setState({...state, showOrderMobile: !state.showOrderMobile})
	}

	const clearSelection = () => {
		setState({...state, selection: []})
	}

	const setAdminView = (bool) => {
		setState({...state, showAdminView: bool})
	}

	const totalQuantity = state.selection.reduce((acc, i) => acc + i.quantity, 0);
	
	const header = (
		<header>
			<button type="button" onClick={() => setAdminView(false)}>Customer</button>
			<button type="button" onClick={() => setAdminView(true)}>Admin</button>
			<img src={tennisBall} alt="tennis ball" />
			<h1>Love-All Ice Cream</h1>
			<button className="cart-button" onClick={() => toggleOrderMobile()}>
				<img className="cart-icon" src={cartIcon} alt="cart icon" />
				<p className="count">{totalQuantity}</p>
			</button>
		</header>
	)

	const customerView = (
		<>
			<main className="menu-list-box">
				<h2>Menu</h2>
				<MenuList menuItems={state.menuItems} addItem={addItem}/>
			</main>
			<aside className={`order-box${state.showOrderMobile ? ' show-order': ''}`}>
				<h2>Order</h2>
				<Order state={state} removeItem={removeItem} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity} clearSelection={clearSelection}/>
			</aside>
		</>
		)

	return (
    	<div className="App">
			{header}
			{state.showAdminView ? <Admin /> : customerView}
    	</div>
  	);
}

export default App;
