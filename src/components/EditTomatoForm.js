import React from 'react';
import PropTypes from 'prop-types';

class EditTomatoForm extends React.Component {
    static propTypes = {
        tomato: PropTypes.shape({
            image: PropTypes.string,
            name: PropTypes.string,
            desc: PropTypes.string,
            status: PropTypes.string,
            price: PropTypes.number
        }),
        index: PropTypes.string,
        updateTomato: PropTypes.func
    };

    handleChange = (event) => {
        console.log(event.currentTarget.value);
        //update the tomato
        //1. Take a copy of the current tomato
        // we send everything that needs to be changed/updated to updatedTomato(). 
        const updatedTomato = { 
            ...this.props.tomato,
            //take a copy of the current tomato and overwrite with what changed
            //event.currentTarget.name is the name of the input
            //event.currentTarget.value holds the value the user typed in the input
            [event.currentTarget.name]: [event.currentTarget.value] 
        };
        this.props.updateTomato(this.props.index, updatedTomato);

        console.log(updatedTomato, 'I am updatedTomato');
    };
    render() {
        return (
            <div className="tomato-edit">
            {/* this.props.tomato.whatever lives in state */}
                <input type="text" name="name" onChange={this.handleChange} value={this.props.tomato.name}  />
                <input type="text" name="price" onChange={this.handleChange} value={this.props.tomato.price} />
                <select type="text" name="status" onChange={this.handleChange} value={this.props.tomato.status}>
                    <option onChange={this.handleChange} value="available">In Stock!</option>
                    <option onChange={this.handleChange} value="unavailable">Sold Out!</option>
                </select>
                <textarea name="desc" onChange={this.handleChange}  value={this.props.tomato.desc}/>
                <input type="text" name="image" onChange={this.handleChange} value={this.props.tomato.image}/>
                {/* We use the key to target the tomato we want to delete.  key is being passed down as index. */}
                <button onClick={() => this.props.deleteTomato(this.props.index)}>Remove Tomato</button>
            </div>
        );
    }
}

export default EditTomatoForm;