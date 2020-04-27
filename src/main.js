import React from 'react';
import BannerView from './banners/banner-view';
import './App.css';
import { Row, Col } from 'antd';
import ErrorBoundary from './error-boundries/error';
function Main() {
    return (
        <div className="App" >
            <Row>
                <Col span={20} offset={2}>
                    <ErrorBoundary>
                        <BannerView />
                    </ErrorBoundary>
                </Col>
            </Row>
        </div>
    );
}
export default Main;