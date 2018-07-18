import React from "react";
import PropTypes from 'prop-types';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleTomatoes from '../sample-tomatoes';
import Tomato from './Tomato';
import base from '../base';

class App extends React.Component {
    //we create state here so that it can be passed down to all child components.  This is why we create App.js. 
    //note: the state & methods that update state should all live together on one component
    state = {
        tomatoes: {},
        order: {}
    };

    static propTypes = {
        match: PropTypes.object
    };
    
    //wait until App is on the page then sync up App & firebase
    //this is all we need to sync our state to firebase 
    //this will 'save' our tomatoes if we were to refresh... not the order 
    componentDidMount() {
        //we destructure this.props.match.params.storeId to params.storeId
        const { params } = this.props.match;
        //1. reinstate local storage ... because componentDidUpdate() triggers a blank object? yes no? :
        //looks like localStorageRef is our order state if we console.log()
        const localStorageRef = localStorage.getItem(params.storeId);
        if (localStorageRef) {
            this.setState({ order: JSON.parse(localStorageRef) });
        }
        //this.ref refers a ref from firebase
        //use syncState to sync with name of the store.  
        //Why the store? Because we don't need the entire database of all the other stores.  
        //We can use just the name of the store we want and then get/see the data of that particular store.  
        //this.props.match.params.storeId is where the name of the store lives
        this.ref = base.syncState(`${params.storeId}/tomatoes`, {
            context: this,
            state: 'tomatoes'
        });
    };

    //we use below to store order state in localStorage
    //setItem(key(store name), value(order state? yes no? ))
    //convert object we are passing to a string with JSON.stringify()
    componentDidUpdate() {
        console.log(this.state.order);
        localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order));
    }

    //We will use below to clean up data as users move around the app 
    componentWillUnmount() {
        base.removeBinding(this.ref);
    }
    
    //we are calling this function on AddTomatoForm using props.  It gets passed via props to inventory then 
    //from inventory to AddTomatoForm.
    addTomato = tomato => {
        //1. Take a copy of the exisiting state so we don't have to mutate it.
        const tomatoes = { ...this.state.tomatoes };
        //2. Add our tomato to the tomatoes variable (why called variable?  looks like an empty object to me.) 
        //while giving it a unique key using a time stamp using Date.now
        tomatoes[`tomato${Date.now()}`] = tomato; 
        //3. use setState() to overwrite state with a new copy of state aka the state that changed now gets 
        //updated by React.  Note, in ES6, if your property and your value have the same name, as in `fishes` 
        //above, you can just pass `fishes` like below : 
        this.setState({ tomatoes });
    };

    loadSampleTomatoes = () => {
        // we update state by overwriting tomatoes with sampleTomatoes
        this.setState({ tomatoes: sampleTomatoes });
    }

    addToOrder = key => {
        // 1. take a copy of state
        const order = {...this.state.order}
        // 2. If the specific tomato aka order[key] exists add 1 otherwise just return 1
        order[key] = order[key] + 1 || 1;
        // 3. Call setState to update our state object
        this.setState({ order });
    };
    //this is used in the little 'x' delete item button on order
    //where is it grabbing key from as the argument? 
    removeFromOrder = key => {
        // 1. take a copy of state
        const order = {...this.state.order}
        // 2. remove that item from order
        delete order[key];
        // 3. Call setState to update our state object
        this.setState({ order });
    };
    // basically, the arguments take in the updated tomato or any changes made by the user through any of our 
    //inputs on EditTomatoForm.js ... something about using key but not 100% sure.
    updateTomato = (key, updatedTomato) => {
        // 1. Take a copy of the current state
        const tomatoes = { ...this.state.tomatoes };
        // 2. Update that state
        tomatoes[key] = updatedTomato;
        // 3. Set that to state
        this.setState({ tomatoes });
    }; 
    //removes selected tomato from state not to mention from menu, order & inventory. 
    deleteTomato = key => {
        // 1. take a copy of state
        const tomatoes = { ...this.state.tomatoes };
        // 2. update the state
        tomatoes[key] = null;
        // 3. update state
        this.setState({ tomatoes });
    };

    render() {
        return(
            <div className='home-grown'>
                <div className="menu">
                    <Header className='tagline' tagline="Best Flavor &#183; Non-GMO &#183; Super Duper!" />
                    <br/>
                    <ul className="tomatoes">
                    {/* tomatoes lives in state which is an object.  Use Object.keys() to get the keys of tomatoes
                     returned in an array. Next we chain .map() which will loop over all the key & return each key 
                    in a <p>.  Give each <p> element a unique identofier with key={key}.  By setting the prop details 
                    (we named this prop) to {this.state.tomatoes[key]} we are able to get the state of tomatoes from App.js 
                     to Tomato.js. */}
                        {Object.keys(this.state.tomatoes).map(key => (
                            <Tomato 
                                //Props
                                //Confusion! React has a built-in prop called key.  This requires a unique identifier which 
                                //in this case is the key of a specific tomato.
                                //We need to access the key of a tomato inside tomato. Here we pass it down with props with 
                                //prop name index.  Since the prop name key is already taken we chose index
                                key={key}
                                index={key}
                                details={this.state.tomatoes[key]}
                                addToOrder={this.addToOrder}
                                />
                            ))}
                        
                    </ul>
                </div>
                <Order 
                tomatoes={this.state.tomatoes} 
                order={this.state.order} 
                removeFromOrder={this.removeFromOrder}
                />
                {/* ref addTomato points to addTomato method on App.js.  We can use this because it was declared with 
                        an arrow function */}
                 {/* `this` refers to App.js. loadSampleTomatoes() lives on App.js.  We have added a prop called 
                        loadSampleTomatoes. This is how we pass the function loadSampleTomatoes() down to Inventory.js 
                            via props     */}
                <Inventory 
                    addTomato={this.addTomato} 
                    updateTomato={this.updateTomato}
                    deleteTomato={this.deleteTomato} 
                    loadSampleTomatoes={this.loadSampleTomatoes}
                    tomatoes = {this.state.tomatoes} 
                    storeId = {this.props.match.params.storeId}
                />
            </div>
        );
    }
}

export default App;


