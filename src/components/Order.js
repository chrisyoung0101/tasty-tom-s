import React from 'react';
import PropTypes from 'prop-types';
import { formatPrice} from '../helpers';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

//note how we are using/declaring the same variables in renderOrder() & render().  Is this because they are only 
//available locally? 

class Order extends React.Component {

    static propTypes = {
        tomatoes: PropTypes.object,
        order: PropTypes.object,
        removeFromOrder: PropTypes.func
    };

    //we put this function outside our render() because render() was getting hefty
    //orderIds.map() will call this function... looks like 
    renderOrder = key => {
        const tomato = this.props.tomatoes[key];
        const count = this.props.order[key];
        const isAvailable = tomato && tomato.status === "available";
        //take the properties of the <CSSTransition> and put them in a variable so they both get updated at the same time. 
        const transitionOptions = {
                classNames:'order',
                key:key,
                timeout:{ enter: 250, exit: 250 }
        };
        // make sure tomato is loaded before we continue... lag in firebase
        // if there is no tomato... render nothing
        if(!tomato) return null;
        //if !isAvailable is true then...
        if (!isAvailable) {
            return (
                <CSSTransition {...transitionOptions}>
                    <li key={key}>
                        Sorry, {tomato ? tomato.name : 'tomato'} is no longer available
                    </li>
                </CSSTransition> 
            );
        }
        //otherwise...
        return (
            <CSSTransition {...transitionOptions}>
            {/*use key={key} for unique identifier*/}
            {/*wrapping elements in <span> allows us to grab on to them and use CSS... I think*/}
            <li key={key}>
                <span>
                <TransitionGroup component='span' className='count'>
                    <CSSTransition
                        classNames='count'
                        key={count}
                        timeout={{ enter: 500, exit: 500 }}
                    >
                        <span>{count}</span>
                    </CSSTransition>
                </TransitionGroup>
                    ea &nbsp; {tomato.name} &nbsp;
                    {formatPrice(count * tomato.price)}
                    <button onClick={() => this.props.removeFromOrder(key)}>&times;</button>
                </span>
            </li>
            </CSSTransition>
        );
    };
    

    render() {
        //{/* We passed down order state & tomatoes state via props. */}
        //{/* We use Object.keys() to get our order state into an array that we can render */}
        const orderIds = Object.keys(this.props.order);
        //{/* reduce() requires a starting number which is why we use 0 */}
        const total = orderIds.reduce((prevTotal, key) => {
            const tomato = this.props.tomatoes[key];
            const count = this.props.order[key];
            //{/* for isAvailable to be true, current tomato must be available and tomato.status must equal available  */}
            const isAvailable = tomato && tomato.status === "available";
            if (isAvailable) {
                return prevTotal + count * tomato.price;
            }
            return prevTotal;
        }, 0);
        return (
            <div className="order-wrap">
                <h2>Order</h2>
                {/* use map() to loop over all order keys and return each order.key.  Each time map() hits an item in 
                  the orderIds array it will render it.  key is the identifier here.  */}
                <TransitionGroup component="ul" className="order">
                    {orderIds.map(this.renderOrder)}
                </TransitionGroup>
                <div className="total">
                    Total: 
                    {/* use formatPrice() to change cents to $ */}
                    <strong>{formatPrice(total)}</strong>
                </div>
            </div>
        );
    }
}

export default Order;