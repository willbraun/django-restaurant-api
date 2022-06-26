import { useState } from 'react'
import Cookies from 'js-cookie';

const handleError = err => {
	console.warn(err);
}

const AdminMenuItem = ({id, title, description, price, imgSrc, active, editMenuItem}) => {
    const defaultState = {
        title: title,
        description: description,
        price: price,
        imgSrc: imgSrc,
        active: active,
    }
    
    const [isEditing, setIsEditing] = useState(false);
    const [preview, setPreview] = useState(imgSrc);
    const [state, setState] = useState(defaultState)

    const resetStates = () => {
        setIsEditing(false);
        setPreview(imgSrc);
        setState(defaultState);
    }

    const handleImage = (e) => {
        const file = e.target.files[0];
        setState({...state, imgSrc: file});

        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result);
        }

        reader.readAsDataURL(file);
    }

    const saveEditMenuItem = async (editedItem) => {
        const formData = new FormData();
        Object.entries(editedItem).forEach(entry => {
            if (entry[1] !== defaultState[entry[0]]) {
                formData.append(entry[0], entry[1]);
            }
        });
        
        const options = {
            method: 'PATCH',
            headers: {
                'X-CSRFToken': Cookies.get('csrftoken'),
            },
            body: formData,
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
        resetStates();
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
                <img src={preview} alt={title} />
                <button type="button" className="btn">Edit</button>
            </div>
            <form className="content-box" onSubmit={handleSubmit}>
                <label htmlFor='edit-title'></label>
                <input type="text" id='edit-title' value={state.title} required placeholder="Title..." onChange={(e) => setState({...state, title: e.target.value})}/>
                
                <label htmlFor='edit-desc'></label>
                <input type="text" id='edit-desc' value={state.description} required placeholder="Description..." onChange={(e) => setState({...state, description: e.target.value})}/>

                <div className="middle">
                    <div>
                        <label htmlFor="image">Upload Image</label>
                        <input type="file" id="image" onChange={handleImage}/>
                    </div>
                    <div className="active">
                        <label htmlFor='edit-active'>Active</label>
                        <input type="checkbox" id='edit-active' defaultChecked={state.active} onChange={(e) => setState({...state, active: e.target.value})}/>
                    </div>
                </div>

                <div className="bottom">
                    <div className="edit-price-row">
                        <label htmlFor="edit-price">$</label>
                        <input type="text" id="edit-price" value={state.price} required placeholder="Price..." onChange={(e) => setState({...state, price: e.target.value})}/>
                    </div>
                    <button type="button" className="btn btn-secondary cancel" onClick={() => {resetStates()}}>Cancel</button>
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