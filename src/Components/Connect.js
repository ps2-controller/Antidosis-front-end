import React, { useState } from 'react';
import { useWeb3Context } from 'web3-react';
import globalStyles from './../Assets/global-styles/bootstrap.min.module.css';
import cx from 'classnames';

const connect = (props) => {
    const context = useWeb3Context();
    console.log(props.connection)
    let connection = Object.keys(props.connection).map(connectorName => (
        <button
        key={connectorName}
        onClick={() => {
            context.setConnector(connectorName)
            props.clicked();
        }}

    > Connect with {connectorName}
    </button>
    ))

    return(
    connection
    )
}

export default connect;