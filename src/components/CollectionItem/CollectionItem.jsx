import React, { Component } from 'react';
import { connect } from 'react-redux';

//MATERIAL-UI IMPORTS
import CancelIcon from '@material-ui/icons/Cancel';

class CollectionItem extends Component {

    render() {
        return (
            <div key={this.props.watch.id} className="Poster">
                <img
                    alt={this.props.watch.title}
                    src={`https://image.tmdb.org/t/p/w92/${this.props.watch.poster}`}
                />
                <br />
                <CancelIcon/>
            </div>
        );
    }
}

export default connect()(CollectionItem);