import React from 'react';
import { useWeb3Context } from 'web3-react';

const getDai = (props) => {
    const context = useWeb3Context();

    return(
        <button
            onClick={() => {props.clicked(context)}}
        >Get Dai</button>
    )
}

export default getDai;