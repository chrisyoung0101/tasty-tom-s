import React from 'react';
import PropTypes from 'prop-types';

const Header = (props) => (
        <header className="top">
            <h1>Tasty Tom's </h1>
            <h5> Heirloom Tomato Plant Shop </h5>
            <p> 
            True heirloom plants raised organically at our farm.
            <br/>
             Delivered to your door! </p>
            <h3 className="tagline">
                <span>{props.tagline}</span>
            </h3>
        </header>
        );
Header.propTypes = {
    tagline: PropTypes.string.isRequired
};

export default Header;