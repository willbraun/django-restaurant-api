import { useState } from 'react';

const AddMenuItem = ({updatePage, addItemToMenu}) => {
    
    const start = {
        title: '',
        description: '',
        price: '',
        imgSrc: '', 
        active: true,
    }

    // research imgSrc, how to upload from ui
    
    const [state, setState] = useState(start);

    // function to post menu item, add to state at the end

    const handleSubmit = (e) => {
        e.preventDefault();
        addItemToMenu(state);
        updatePage('menu-items');
        setState(start);
    }

    return (
        <section className="add-menu-item-section">
            <form className="add-menu-item-form" onSubmit={handleSubmit}>
                <div className="form-row">
                    <label htmlFor="title">Title</label>
                    <input type="text" id="title" required onChange={(e) => setState({...state, title: e.target.value})}/>
                </div>
            </form>
        </section>
    )
}

export default AddMenuItem;