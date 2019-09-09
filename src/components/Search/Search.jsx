import React, { Component } from 'react';
import { connect } from 'react-redux';

//COMPONENT IMPORTS
import SearchForm from '../SearchForm/SearchForm';

class Search extends Component {
    render() {
        return (
            <div>
                <SearchForm />
            </div>
        );
    }
}

export default connect()(Search);