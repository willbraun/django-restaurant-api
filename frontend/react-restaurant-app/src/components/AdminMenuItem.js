import { useState } from 'react'
import Cookies from 'js-cookie';

const handleError = err => {
	console.warn(err);
}

const AdminMenuItem = ({id, title, description, price, imgSrc, active, editMenuItem}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [state, setState] = useState({
        title: title,
        description: description,
        price: price,
        imgSrc: imgSrc,
        active: active,
    })

    const resetState = () => {
        setState({
            title: title,
            description: description,
            price: price,
            imgSrc: imgSrc,
            active: active,
        })
    }

    const saveEditMenuItem = async (editedItem) => {
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': Cookies.get('csrftoken'),
            },
            body: JSON.stringify(editedItem),
        }

        const response = await fetch(`/api_v1/foods/${id}/`, options).catch(handleError);

        if(!response.ok) {
            throw new Error('Network response was not ok!');
        }

        const data = await response.json();

        editMenuItem(data);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        saveEditMenuItem({...state, id: id});
        setIsEditing(false);
    }

    const previewHTML = (
        <article className="menu-item">
            <div className="img-box">
                <img src={imgSrc} alt={title} />
            </div>
            <div className="content-box">
                <h3 className="item-name">{title}</h3>
                <p className="desc">{description}</p>
                <div className="active">
                    <label htmlFor='active'>Active</label>
                    <input type="checkbox" id='active' defaultChecked={state.active} disabled/>
                </div>
                <div className="bottom">
                    <p className="price">{`$${price.toString()}`}</p>
                    <button type="button" className="btn btn-primary" onClick={() => setIsEditing(true)}>Edit</button>
                </div>
            </div>
        </article>
    )

    const editHTML = (
        <article className="menu-item">
            <div className="img-box">
                <img src={imgSrc} alt={title} />
            </div>
            {/* Do image upload here also */}
            <form className="content-box" onSubmit={handleSubmit}>
                <label htmlFor='edit-title'></label>
                <input type="text" id='edit-title' value={state.title} required placeholder="Title..." onChange={(e) => setState({...state, title: e.target.value})}/>
                
                <label htmlFor='edit-desc'></label>
                <input type="text" id='edit-desc' value={state.description} required placeholder="Description..." onChange={(e) => setState({...state, description: e.target.value})}/>

                <div className="active">
                    <label htmlFor='edit-active'>Active</label>
                    <input type="checkbox" id='edit-active' defaultChecked={state.active} onChange={(e) => setState({...state, active: e.target.value})}/>
                </div>

                <div className="bottom">
                    <div className="edit-price-row">
                        <label htmlFor="edit-price">$</label>
                        <input type="text" id="edit-price" value={state.price} required placeholder="Price..." onChange={(e) => setState({...state, price: e.target.value})}/>
                    </div>
                    <button type="button" className="btn btn-secondary cancel" onClick={() => {resetState(); setIsEditing(false)}}>Cancel</button>
                    <button type="submit" className="btn btn-success save">Save</button>
                </div>
            </form>
        </article>
    )
    

    return (
        <>
        {isEditing ? editHTML : previewHTML}
        </>
    )
}

export default AdminMenuItem;