import { useState } from 'react'
import Cookies from 'js-cookie';

const AdminMenuItem = ({id, title, description, price, imgSrc, active}) => {


    return (
        <article className="menu-item">
            <div className="img-box">
                <img src={imgSrc} alt={title} />
            </div>
            <div className="content-box">
                <h3 className="item-name">{title}</h3>
                <p className="desc">{description}</p>
                <p>{active ? 'Active' : 'Inactive'}</p>
                <div className="bottom">
                    <p className="price">{`$${price.toString()}`}</p>
                    <button type="button" className="btn btn-primary">Edit</button>
                </div>
            </div>
            
        </article>
    )
}

export default AdminMenuItem;