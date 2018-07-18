import React from 'react';
import PropTypes from 'prop-types';
import { formatPrice } from '../helpers';

class Tomato extends React.Component {
    //static allows us to declare PropTypes for all the tomatoes
    static propTypes = {
        details: PropTypes.shape({
        image: PropTypes.string,
        name: PropTypes.string,
        desc: PropTypes.string,
        status: PropTypes.string,
        price: PropTypes.number
        }),
        addToOrder: PropTypes.func
    };

    render() {
        //use ES6 destructuring to set multitple variables.  Ex. {image} is now set to {this.props.details.image}.  
        //Now we can simply type image instead of this.props.details.image. 
        const { image, name, price, desc, status } = this.props.details;
        //set a variable where status is equal to available.
        const isAvailable = status === "available";
        return (
            <li className="menu-tomato">
                <img src={image} alt={name}/>
                <h3 className='tomato-name'>
                    {name}
                    {/* we import formatPrice() and wrap price in this function */}
                    <span className='price'>{formatPrice(price)}</span>
                </h3>
                <p>{desc}</p>
                    {/* when status is not true or unavailable flip on disabled attribute & kick in CSS */}
                    {/* we use addToOrder() that lives on App.js inline because we are just using once here */}
                <button disabled={!isAvailable} onClick={() => this.props.addToOrder(this.props.index)}>
                    {/* ternerary operator : when true say "Add To Order" otherwiese say "Sold Out" */}
                    {isAvailable ? "Add To Order" : "Sold Out"}
                </button>
            </li>
        );
    }
}

export default Tomato;