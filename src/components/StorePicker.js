import React from 'react';
import PropTypes from 'prop-types';
import { getFunName } from '../helpers';

class StorePicker extends React.Component {
    //See Note 20 for explanation of constructor method or ES6 method.
    //We want to bind methods created in this component to the instance or `this` of the component.  
    //We will use ES6 syntax to make the bind.
    myInput = React.createRef();

    static propTypes = {
        history: PropTypes.object
    };

    goToStore = (event) => {
        // 1. Stop the form from submitting
        event.preventDefault();
        // 2. get the text from that input
        const storeName = this.myInput.value.value;
        // 3. Change the page to /store/whatever-they-entered
        this.props.history.push(`/store/${storeName}`);
    };
    render() {
        console.log(this);
        return (
                <form className="store-selector" onSubmit={this.goToStore}>
        {/*NOTE: `Love Apple shows when storepicker is rendered. However `Tasty Tom's is written below. ?? */}
                    <h2 className='berk'>Tasty Tom's</h2>
                    <h2>Heirloom Tomatoes</h2>
                    <input 
                    type="text" 
                    ref={this.myInput}
                    required 
                    placeholder="Store Name"
                    defaultValue={getFunName()}
                    />
                    <button type="submit">Enter Store</button>
                </form> 
        );
    }

}

export default StorePicker;