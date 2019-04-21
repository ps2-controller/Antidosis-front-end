import React from 'react';
import { useWeb3Context } from 'web3-react';
import styles from './TakeTokens.module.css';
import globalStyles from './../../Assets/global-styles/bootstrap.min.module.css';
import cx from 'classnames';

const takeTokens = (props) => {
    const context = useWeb3Context();

    return(
        <React.Fragment>
            <label>
                Amount
            </label>
            <input 
                onChange={(event) => {props.changed(event)}}
            />
            <button
                className={cx(globalStyles.btn, globalStyles['btn-primary'], styles.takeTokensButton)}
                onClick={() => {props.clicked(context)}}>   
                Take Token Shares
            </button>
        </React.Fragment>
    )
}

export default takeTokens;