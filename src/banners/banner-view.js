import React, { Component } from 'react'
import { Link } from 'react-dom'
import TableComp from '../components/tabels'
import { Row, Col } from 'antd';
import query from '../queries/fetchBanners'
import { graphql } from 'react-apollo';
import deleteBanner from '../mutations/delete-banner'
import ModalComp from './modal'
import Sort from './sort'

class BannerView extends Component {

    constructor() {

        super();

        this.state = {
            isModalOpen: false,
            isSortModalOpen: false,
            modalType: '',
            id: ''
        }

        this.columns = [
            {
                title: 'NameAr',
                dataIndex: 'NameAr',
                key: 'NameAr',
            },
            {
                title: 'NameEn',
                dataIndex: 'NameEn',
                key: 'NameEn',
            },
            {
                title: 'ImageAr',
                dataIndex: 'ImageAr',
                key: 'ImageAr',
            },
            {
                title: 'ImageEn',
                dataIndex: 'ImageEn',
                key: 'ImageEn',
            },
            {
                title: 'Type',
                dataIndex: 'Type',
                key: 'Type',
            },
            {
                title: 'Serve',
                dataIndex: 'Serve',
                key: 'Serve',
                render: Serve => (
                    Serve.map(serveType => {
                        return (
                            <span className="banner-serve" key={serveType}>{serveType}</span>
                        )
                    })
                )
            },
            {
                title: 'Start date and time',
                dataIndex: 'Start_date',
                key: 'Start_date',
            },
            {
                title: 'End date and time',
                dataIndex: 'End_date',
                key: 'End_date',
            },
            {
                title: 'Actions',
                dataIndex: 'Actions',
                key: 'Actions',
                render: (Actions, record) => (

                    Actions.map((action) => {
                        if (action === 'delete') {
                            return (<button className="banner-actions" key={action} onClick={() => this.handleDelete(record.key)}>{action}</button>)
                        } else {
                            return (<button className="banner-actions" key={action} onClick={() => this.handleEdit(record.key)}>{action}</button>)
                        }

                    })

                )
            }
        ];
    }
    fetchBannersData = () => {
        this.data = [];
        if (this.props.data) {
            this.props.data.banners.map((data) => {
                this.data.push({
                    key: data.id,
                    NameAr: data.name_ar,
                    NameEn: data.name_en,
                    ImageAr: data.image_ar,
                    ImageEn: data.image_en,
                    Type: data.redirection,
                    Serve: data.serve,
                    Start_date: new Intl.DateTimeFormat("en-GB", {
                        year: "numeric",
                        month: "long",
                        day: "2-digit"
                    }).format(new Date(data.start_date)),
                    End_date: new Intl.DateTimeFormat("en-GB", {
                        year: "numeric",
                        month: "long",
                        day: "2-digit"
                    }).format(new Date(data.end_date)),
                    Actions: ['delete', 'edit']

                })
            })
        }
    }
    handleDelete = (id) => {
        this.props.mutate({ variables: { id } }).then(() => {
            this.props.data.refetch();
        });
    }
    handleEdit(id) {
        this.setState({ isModalOpen: true, modalType: 'edit', id: id })
    }
    addBanners() {
        this.setState({ isModalOpen: true, modalType: 'add' })
    }
    sortBanners() {
        this.setState({ isSortModalOpen: true })
    }
    render() {
        if (this.props.data.loading) { return <div>Loading...</div>; }
        if (this.props.data.error) { return <div>{this.props.data.error.message}...</div>; }
        this.fetchBannersData()
        return (
            <div>
              {this.state.isSortModalOpen&&  <Sort visible={this.state.isSortModalOpen} handleCancel={() => {
                    this.setState({
                        isSortModalOpen: false
                    })
                }} ></Sort>}
                <Row>
                    <Col span={6} offset={18}>
                        <Row>
                            <Col span={18}> <button className="Sort-btn" onClick={() => {
                                this.addBanners()
                            }}>Add New Banner</button></Col>
                            <Col span={6}> <button className="Sort-btn" onClick={() => {
                                this.sortBanners()
                            }}>Sort</button></Col>
                        </Row>

                    </Col>
                </Row>

                <TableComp column={this.columns} data={this.data} />
                {this.state.isModalOpen && <ModalComp {...this.props} id={this.state.id ? this.state.id : ''} type={this.state.modalType} visible={this.state.isModalOpen} handleCancel={() => {
                    this.setState({
                        isModalOpen: false
                    })
                }} />}
            </div>
        )
    }
}

export default graphql(deleteBanner)(graphql(query)(BannerView));