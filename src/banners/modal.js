import React, { Component } from 'react'
import { Modal, Button } from 'antd';
import {
    Form,
    Input,
    Checkbox,
    Select,
    DatePicker,
    Col, Row,
    Upload, message
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { graphql } from 'react-apollo';
import createBanner from '../mutations/create-banner';
import updateBanner from '../mutations/edit-banner';
import fetchBannerById from '../queries/fetch-banner-id';
import moment from 'moment';
let formData = [{
    serve: [],
    screen: []
}];
const dateFormat = 'YYYY/MM/DD';
const componentSize = 'small';
class ModalComp extends Component {


    imageArProps = {
        name: 'file',
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        headers: {
            authorization: 'authorization-text',
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
                formData.image_ar = info.file.name;
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };
    imageEnProps = {
        name: 'file',
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        headers: {
            authorization: 'authorization-text',
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
                formData.image_en = info.file.name;
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };
    checkOnChange = (e) => {
        if (e.target.checked) {
            if (e.target.name === 'now' || e.target.name === 'later') {

                formData['serve'].push(e.target.name)

            } else if (e.target.name === 'home' || e.target.name === 'inner') {
                formData['screen'].push(e.target.name)
            } else if (e.target.name === 'active') {
                formData['active'] = (e.target.checked)
            }
        } else {
            if (e.target.name === 'now' || e.target.name === 'later') {

                formData.serve = formData.serve.filter(item => { return item !== e.target.name })

            } else if (e.target.name === 'home' || e.target.name === 'inner') {
                formData.screen = formData.screen.filter(item => { return item !== e.target.name })
            } else if (e.target.name === 'active') {
                formData.active = (e.target.checked)
            }

        }
    }
    endDateOnChange = (date) => {
        formData.end_date = date.format('YYYY-MM-DDTHH:mm:ssZ');
        console.log(date.format('YYYY-MM-DDTHH:mm:ssZ'))

    }
    startDateOnChange = (date) => {
        formData.start_date = date.format('YYYY-MM-DDTHH:mm:ssZ');

    }
    handleSelectChange = (value) => {
        formData.redirection = value;
    }
    handleOk = () => {

        if (this.props.type === 'add') {
            console.log(formData)
            this.props.createBanner({
                variables: { data: [formData] },

            }).then(() => {
                this.props.handleCancel()
            })

        }
        else if (this.props.type === 'edit') {
            console.log(this.props)
            delete formData.id;
            delete formData.__typename;
            this.props.updateBanner({
                variables: { id: this.props.id, input: formData }
            }).then(() => {
                this.props.handleCancel();
            })
        }


    };
    render() {



        if (this.props.data.loading === true) return <div />
        if (this.props.type === 'edit') {
            formData = this.props.data.getBannerById;
        } else {
            formData = {
                serve: [],
                screen: [],
                start_date: new Date(),
                end_date: new Date(),
                active: false
            }
        }
        return (
            <div>
                <Modal
                    title="Add New Banner"
                    visible={this.props.visible}
                    onCancel={this.props.handleCancel}
                    onOk={this.handleOk}
                    width='50%'
                >
                    <div>
                        <Form
                            labelCol={{ span: 6 }}
                            wrapperCol={{ span: 18 }}
                            layout="horizontal"
                            initialValues={{ size: componentSize }}
                            size={componentSize}
                        >
                            <Row>
                                <Col span={24}><label>Serve</label></Col>
                                <Col span={24}>
                                    <Row>
                                        <Col span={12}>
                                            <Checkbox onChange={this.checkOnChange} name="now" defaultChecked={formData && formData.serve[0] === 'now' ? true : false}>Now</Checkbox>

                                        </Col>
                                        <Col span={12}>
                                            <Checkbox onChange={this.checkOnChange} name="later" defaultChecked={formData && formData.serve[1] === 'later' ? true : false} >later</Checkbox>
                                        </Col>

                                    </Row>

                                </Col>
                            </Row>
                            <Row>
                                <Col span={24}><label>Screen</label></Col>
                                <Col span={24}>
                                    <Row>
                                        <Col span={12}>
                                            <Checkbox onChange={this.checkOnChange} name="home" defaultChecked={formData && formData.screen[0] === 'home' ? true : false} >Home</Checkbox>
                                        </Col>
                                        <Col span={12}>
                                            <Checkbox onChange={this.checkOnChange} name="inner" defaultChecked={formData && formData.screen[1] === 'inner' ? true : false} >Inner</Checkbox>
                                        </Col>

                                    </Row>

                                </Col>
                            </Row>
                            <Row>
                                <Col span={12}>
                                    <Row>
                                        <Col span={6}>
                                            <label>ImageAr</label>
                                        </Col>
                                        <Col span={18}>
                                            <Upload {...this.imageArProps}>
                                                <Button>
                                                    <UploadOutlined /> Click to Upload
                                                </Button>
                                            </Upload>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col span={12}>
                                    <Row>
                                        <Col span={6}>
                                            <label>ImageAr</label>
                                        </Col>
                                        <Col span={18}>
                                            <Upload {...this.imageEnProps}>
                                                <Button>
                                                    <UploadOutlined /> Click to Upload
                                                </Button>
                                            </Upload>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12}>

                                    <Form.Item label="nameAr" value="inline" >
                                        <Input defaultValue={formData.name_ar} onChange={(e) => {
                                            formData.name_ar = e.target.value
                                        }} />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="nameEn" value="inline" span={12}>
                                        <Input defaultValue={formData.name_en} onChange={(e) => {
                                            formData.name_en = e.target.value
                                        }} />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={24}><label>Date</label></Col>
                                <Col span={24}>
                                    <Row>
                                        <Col span={12}>
                                            <Form.Item label="Start Date">
                                                <DatePicker defaultValue={moment(formData.start_date, dateFormat)} format={dateFormat} onChange={this.startDateOnChange} style={{ width: '100%' }} />
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label="End Date">
                                                <DatePicker defaultValue={moment(formData.end_date, dateFormat)} onChange={this.endDateOnChange} style={{ width: '100%' }} />
                                            </Form.Item>
                                        </Col>

                                    </Row>

                                </Col>
                            </Row>
                            <Row>
                                <Col span={24}><label>Active</label></Col>
                                <Col span={24}>
                                    <Row>
                                        <Col span={12}>
                                            <Checkbox defaultChecked={formData.active} onChange={this.checkOnChange} name="active">Active</Checkbox>
                                        </Col>

                                    </Row>

                                </Col>
                            </Row>

                            <Row>
                                <Col span={4}><label>Select Category</label></Col>
                                <Col span={20}>
                                    <Select style={{ width: ' 100% ' }} onChange={this.handleSelectChange} defaultValue={formData.redirection ? formData.redirection : ""}>
                                        <Select.Option value="not_redirecting">not_redirecting</Select.Option>
                                        <Select.Option value="specific_category">specific_category</Select.Option>
                                        <Select.Option value="specific_sub">specific_sub</Select.Option>
                                        <Select.Option value="specific_coupon">specific_coupon</Select.Option>

                                    </Select>
                                </Col>

                            </Row>
                        </Form>
                    </div>
                </Modal>
            </div>
        )
    }





}

export default graphql(updateBanner,
    {
        name: 'updateBanner',
        options: {
            refetchQueries: ['fetchBanners']

        }
    }
)
    (graphql(fetchBannerById, {
        options: (props) => { return { variables: { id: props.id } } }
    })(graphql(createBanner, {
        name: 'createBanner',
        options: {
            refetchQueries: ['fetchBanners']

        }
    })(ModalComp)));