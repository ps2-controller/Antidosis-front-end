import React from 'react';
import { useWeb3Context } from 'web3-react'

const transferTokens = (props) => {
    const context = useWeb3Context();

    return(
        <React.Fragment>
        <label>
            Address to buy tokens from
        </label>
        <input
            onChange={(event) => props.fromChanged(event)}
        />
        <label>
            Amount to buy
        </label>
        <input
            onChange={(event) => props.amountChanged(event)}
        />
        <button
            onClick={() => {props.clicked(context)}}
        >Buy Tokens</button>
        </React.Fragment>

    )
}

export default transferTokens;