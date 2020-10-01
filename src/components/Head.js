import React from 'react';
import {Helmet} from 'react-helmet';

class Head extends React.Component {
    render() {
        return (
            <div>
                <Helmet>
                    <title>Net Status</title>
                    <meta name="apple-mobile-web-app-capable" content="yes"/>
                    <meta name="apple-mobile-web-app-status-bar-style" content="black"/>
                    <meta name="mobile-web-app-capable" content="yes"/>
                    <meta name="description" content="NetStatus"/>
                    <meta name="theme-color" content="#000"/>
                </Helmet>
            </div>
        );
    }
}

export default Head;
