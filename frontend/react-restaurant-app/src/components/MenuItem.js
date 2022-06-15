const MenuItem = ({title, description, price, imgSrc, addItem}) => {

    return (
        <article className="menu-item">
            <div className="img-box">
                <img src={imgSrc} alt={title} />
            </div>
            <div className="content-box">
                <h3 className="item-name">{title}</h3>
                <p className="desc">{description}</p>
                <div className="bottom">
                    <p className="price">{`$${price.toString()}`}</p>
                    <button type="button" className="btn btn-primary" onClick={() => addItem({title, description, price, imgSrc})}>+ Add</button>
                </div>
            </div>
            
        </article>
    )
}

export default MenuItem;