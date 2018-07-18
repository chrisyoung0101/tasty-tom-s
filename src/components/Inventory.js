import React from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import AddTomatoForm from './AddTomatoForm';
import EditTomatoForm from './EditTomatoForm';
import Login from './Login';
import base, { firebaseApp } from '../base';

class Inventory extends React.Component {
    static propTypes = {
        tomatoes: PropTypes.object,
        updateTomato: PropTypes.func,
        deleteTomato: PropTypes.func,
        loadSampleTomatoes: PropTypes.func
    };

    state = {
        uid: null,
        owner: null
    };

    //if we refresh the page, check if we are already logged in. If so, keep us logged in and the inventory 
    //component rendered
    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if(user) {
                this.authHandler({ user });
            }
        })
    }

    //`authHandler` is a payload of data about the user 
    //`store` = data about the store
    //`authHandler` = data about the user 
    authHandler = async authData => {
        //1. Look up the current store in the firebase database.
        //     `await` will store the store in a variable...??? 
        //     `{ context: this}` is an object full of data used by fetch()
        const store = await base.fetch(this.props.storeId, { context: this});
        console.log('this is the store:', store);
        //2. Claim the store if there is no owner
        if (!store.owner) {
            //if store.owner doesn't exist, save it as our store
            //post() will push this data to firebase for us
            await base.post(`${this.props.storeId}/owner`, {
                data: authData.user.uid
            })
        }
        //3. Set the state of the inventory component to reflect the current user
        this.setState({
            uid: authData.user.uid,
            //checks if the currently logged in user `authDat.user.uid` is the same as the `store.owner`.  
            //If so, allow them to manage the store.
            owner: store.owner || authData.user.uid
        })
        console.log('this is the data about the user:', authData);
    };


    authenticate = (provider) => {
        //create a new `authProvider`
        const authProvider = new firebase.auth[`${provider}AuthProvider`]();
        firebaseApp
            .auth()//brings us back firebase's connection to auth()
            .signInWithPopup(authProvider)//pass in the newly created `authProvider` 
            .then(this.authHandler);//if the promise is fulfilled, execute `this.authHandler`, I think...
                                    //then() comes from Promise.then() 
    };

    //logout the user and set state of uid to null
    logout = async () => {
        console.log('Logging out!');
        await firebase.auth().signOut();
        this.setState({ uid: null });
    }


    render() {
        const logout = <button onClick={this.logout}>Log Out!</button>



        //1. Check if the user is logged in : 
        //  If there `!this.state.uid` is true, render the <Login /> button
        if (!this.state.uid) {
            return <Login authenticate={this.authenticate} />;
        };

        //2. check if they are not the owner of the current store :
        if (this.state.uid !== this.state.owner) {
            return  <div>
                    <p>Sorry, you're not the Store Owner!</p>
                    {logout}
                    </div>
        }
        // if there is a logged in user (I think), render <Inventory />
        return (
        <div className="inventory">
           <h2>Inventory</h2>
           {logout}
            {/*Turn this.props.tomatoes into an array then map over the array*/}
            {/*tomatoes is state.  pass down the key of each tomato via props as tomato*/}
           {Object.keys(this.props.tomatoes).map(key => (
               <EditTomatoForm 
                    key={key}  
                    index={key}
                    tomato={this.props.tomatoes[key]} 
                    updateTomato={this.props.updateTomato}
                    deleteTomato={this.props.deleteTomato}
                /> 
           ))}
           {/* this.props.addTomato is referencing addTomato() on App.js via Inventory.  This method should now show 
              in React DevTools via props */}
           <AddTomatoForm addTomato={this.props.addTomato} />
           {/* loadSampleTomatoes() lives on App.js.  We passed it via props. */}
           <button onClick={this.props.loadSampleTomatoes}>Load Tomato Samples</button>
        </div>
        );
    }
}

export default Inventory;
