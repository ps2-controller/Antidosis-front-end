import React from 'react';
import { useWeb3Context } from 'web3-react';
import styles from './AllowDai.module.css';
import globalStyles from './../../Assets/global-styles/bootstrap.min.module.css'

const allowDai = (props) => {
    const context = useWeb3Context();

    return(
        <React.Fragment>
        <label>
            Asset Tokenization Contract Address
        </label>
        <input
            name="atcAddress"
            onChange={(event) => {props.changed(event)}}
        />
        <button
            className={styles.Button}
            onClick={() => {props.clicked(context)}}
        >Set Dai Allowance</button>
        </React.Fragment>
    )
}

export default allowDai;