import React, {Component} from 'react';
import Icon from './Icon';
import * as actions from '../actions/actions';
import _b from 'bem-cn';
import {Map as IMap, fromJS} from 'immutable';

const block = _b('LocationSelect');

class Autocomplete extends Component {
    render() {
        const {locationSearch, onMouseDown, onItemClick} = this.props;
        return <div className={block('autocomplete')} onMouseDown={onMouseDown}>
            {locationSearch.map((loc, index) =>
                <div key={index} className={block('autocompleteItem')} onClick={()=> onItemClick(index)}>
                    {`${loc.get('city')}, ${loc.get('country')}`}
                </div>).toJS()}
        </div>;
    }
}

export class LocationSelect extends Component {
    constructor(...args) {
        super(...args);

        this.state = {
            isFocused: false,
            viewMode: true
        };
        this.isFocusLost = true;
    }

    onFocus() {
        this.setState({isFocused: true});
    }

    onBlur() {
        if (this.isFocusLost) {
            this.setState({isFocused: false});
            this.setState({viewMode: true});
        } else {
            this.refs.input.focus();
        }

        this.isFocusLost = true;
    }

    onMouseDown() {
        this.isFocusLost = false;
    }

    onChange(event) {
        this.props.onInputChange(event.target.value);
    }

    toEditMode() {
        const onRender = () => this.refs.input.focus();
        this.setState({viewMode: false}, onRender);
    }

    onItemClick(location) {
        this.setState({viewMode: true});
        this.props.onLocationSelect(location);
    }

    onLocationSelect(location) {

    }

    render() {
        const {locationInput, location} = this.props;

        if (this.state.viewMode) {
            return <button className={block('placeButton')} onClick={this.toEditMode.bind(this)}>
                {location.get('city')}, {location.get('country')}
                <Icon name="chevron" className={block('chevron')}/>
            </button>;
        }

        return <div className={block()}>
            <input type="text"
                   ref="input"
                   className={block('input')}
                   onChange={this.onChange.bind(this)}
                   value={locationInput}
                   onFocus={this.onFocus.bind(this)}
                   onBlur={this.onBlur.bind(this)}
            />
            {this.renderAutocomplete()}
        </div>;
    }

    renderAutocomplete() {
        if (this.state.isFocused)
            return <Autocomplete {...this.props}
                onMouseDown={this.onMouseDown.bind(this)}
                onItemClick={this.onItemClick.bind(this)}
            />;

        return null;
    }
}