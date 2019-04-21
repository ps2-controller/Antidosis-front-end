import React, { useEffect } from 'react';
import { useWeb3Context } from 'web3-react';
import styles from './MintToken.module.css';
import globalStyles from './../../Assets/global-styles/bootstrap.min.module.css';
import cx from 'classnames';

const mintToken = (props) => {
    const context = useWeb3Context();

    return(
        <button
            onClick={() => {props.clicked(context)}}
            className={cx(styles.bottomPadding)}
        >Mint Demo ERC 721 Token</button>

    )
}

export default mintToken;