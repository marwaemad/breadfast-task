import React, { Component } from 'react'
import SortableComponent from '../components/list-sort'
import { Modal } from 'antd';
import bannersWithRank from '../queries/fetch-banners-rank'
import { graphql } from 'react-apollo';
import { connect } from 'react-redux'
import sortBanner from '../mutations/sort-banner'

class Sort extends Component {
    handleOk = () => {
        console.log(this.props.updatedBanners)
        this.props.mutate({ variables: { data: this.props.updatedBanners } }).then(() => {
            this.props.handleCancel()
        })

    }
    render() {
        if (this.props.loading) return (<div>......loading</div>)
        return (
            <div>
                <div>
                    <Modal
                        title="Sort Banners"
                        visible={this.props.visible}
                        onCancel={this.props.handleCancel}
                        onOk={this.handleOk}
                        width='50%'
                    >
                        {this.props.data.validBannersForUser && <SortableComponent bannersList={this.props.data.validBannersForUser}{...this.props}></SortableComponent>}
                    </Modal>
                </div>
            </div>)


    }
}
const mapStateToProps = (state) => {
    return {
        updatedBanners: state.updatedBanners
    }
}


export default connect(mapStateToProps)(graphql(sortBanner)(graphql(bannersWithRank)(Sort)));