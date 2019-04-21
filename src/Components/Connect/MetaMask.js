import React, { useEffect } from 'react';
import { useWeb3Context } from 'web3-react';


const connection = (props) => {
    connectorHandler = () => {
        
    }

    return(
        <React.Fragment>
        <button
            onClick={() => {props.clicked("MetaMask")}}
        >MetaMask</button>
        <button
        onClick={() => {props.clicked("Ledger")}}
    >Ledger</button>
    </React.Fragment>

    )
}

export default connection;