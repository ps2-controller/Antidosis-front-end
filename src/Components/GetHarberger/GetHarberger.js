import React from 'react';
import { useWeb3Context } from 'web3-react'

const getHarberger = (props) => {
    const context = useWeb3Context();

    return(
        <React.Fragment>
        <label>
            Address to check
        </label>
        <input
            onChange={(event) => props.changed(event)}
        />
        <button
            onClick={() => {props.clicked(context)}}
        >Get Harberger Values</button>
        </React.Fragment>

    )
}

export default getHarberger;