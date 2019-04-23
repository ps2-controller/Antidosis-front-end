import React from 'react';
import { useWeb3Context } from 'web3-react';
import styles from './TransferTokens.module.css';
import globalStyles from './../../Assets/global-styles/bootstrap.min.module.css';
import cx from 'classnames';

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
        <br />
        <label>
            Amount to buy
        </label>
        <input
            onChange={(event) => props.amountChanged(event)}
        />
        <button
            className={cx(globalStyles.btn, globalStyles['btn-secondary'], styles.transferTokensButton)}
            onClick={() => {props.clicked(context)}}
        >Buy Tokens</button>
        <br />
        <br />
        </React.Fragment>

    )
}

export default transferTokens;