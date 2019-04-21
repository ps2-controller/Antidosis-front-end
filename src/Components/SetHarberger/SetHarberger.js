import React from 'react';
import { useWeb3Context } from 'web3-react';

const setHarberger = (props) => {
    const context = useWeb3Context();


    return(
        <React.Fragment>
        <label>
            Harberger Valuation
        </label>
        <input
            name="harbergerValue"
            onChange={(event) => {props.valChanged(event)}}
        />
        <label>
            Harberger Duration
        </label>
        <input
            name="harbergerValue"
            onChange={(event) => {props.durChanged(event)}}
        />
        <button
            onClick={() => {props.clicked(context)}}
        >Set Harberger Values
        </button>
        </React.Fragment>
    )
}

export default setHarberger;