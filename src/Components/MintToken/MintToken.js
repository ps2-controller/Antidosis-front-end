import React, { useEffect } from 'react';
import { useWeb3Context } from 'web3-react'

const mintToken = (props) => {
    const context = useWeb3Context();
    useEffect(() => {
        context.setConnector("MetaMask", false, 4);
    })


    return(
        <button
            onClick={() => {props.clicked(context)}}
        >Mint Demo ERC 721 Token</button>

    )
}

export default mintToken;