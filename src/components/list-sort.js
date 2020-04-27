import React, { Component } from 'react';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import arrayMove from 'array-move';
import {connect} from 'react-redux'
let updatedItems = []
const SortableItem = SortableElement(({ value }) => (
    <li tabIndex={0}>{value}</li>
));

const SortableList = SortableContainer(({ items }) => {
    return (
        <ul>
            {items.map((value, index) => (
                <SortableItem key={`item-${value}`} index={index} value={value} />
            ))}
        </ul>
    );
});

class SortableComponent extends Component {
    state = {
        items: []

    };
    constructor(props) {
        super(props)

        props.bannersList.forEach(element => {
            this.state.items.push(element.name_en)

        });
        console.log(this.state.items)


    }
  
    onSortEnd = ({ oldIndex, newIndex }) => {
        this.setState(({ items }) => ({
            items: arrayMove(items, oldIndex, newIndex),
        }));

        updatedItems = [];
        this.props.bannersList.forEach(banner => {
            this.state.items.find((item, index) => {
                if (banner.name_en === item) {
                    let element = {};
                    element['id'] = banner.id;
                    element['rank'] = index;
                    updatedItems.push(element)
                }
                return
            })
        })
        this.props.updateRank(updatedItems)
        console.log(this.props.updatedBanners)


    };
    render() {


        return <SortableList items={this.state.items} onSortEnd={this.onSortEnd} />;



    }
}
const mapStateToProps = (state) => {
    return {
        updatedBanners: state.updatedBanners
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        updateRank: (banners) => {
            dispatch({
                type: 'SORT',
                updatedBanners: banners
            })
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(SortableComponent)
