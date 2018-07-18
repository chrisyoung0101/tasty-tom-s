import React from 'react';
import PropTypes from 'prop-types';

class AddTomatoForm extends React.Component {
    //use React.createRef(); to create a reference to each element.  
    //We can point to a specific ref and ask for the value of that ref like in 
    //nameRef. this.nameRef.value.value will point to the value the user entered.
    nameRef = React.createRef();
    priceRef = React.createRef();
    statusRef = React.createRef();
    descRef = React.createRef();
    imageRef = React.createRef();

    static propTypes = {
        addFish: PropTypes.func
    };


    createTomato = event => {
        // 1. Stop form from submitting
        event.preventDefault();
        //Here we create an object with all the data entered by the user
        const tomato = {
            name: this.nameRef.value.value,
            //use parseFloat() to convert string to a number
            price: parseFloat(this.priceRef.value.value),
            status: this.statusRef.value.value,
            desc: this.descRef.value.value,
            image: this.imageRef.value.value
        }
        //addTomato() lives on App.js
        this.props.addTomato(tomato);
        // refresh the form.  Note: `event.currentTarget` is the form of AddTomatoForm. 
        event.currentTarget.reset();
    };

    render() {
        return (
            <form className="tomato-edit" onSubmit={this.createTomato}>
                <input name="name" ref={this.nameRef}  type="text" placeholder="Name" />
                <input name="price" ref={this.priceRef}  type="text" placeholder="Price"/>
                <select name="status" ref={this.statusRef}  >
                    <option value="available">In Stock!</option>
                    <option value="unavailable">Sold Out!</option>
                </select>

                <textarea name="desc" ref={this.descRef} placeholder="Desc" />
                <input name='image' ref={this.imageRef} type="text" placeholder="Image" />
                <button type='submit'>+ Add Tomato</button>
            </form>
        );
    }
}

export default AddTomatoForm;



