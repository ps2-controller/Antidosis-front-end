import React, {Component} from 'react';
import styles from './LockForm.module.css';
import globalStyles from './../../Assets/global-styles/bootstrap.min.module.css';
import cx from 'classnames';
import { useWeb3Context } from 'web3-react';

const lockForm = (props) => {
    const context = useWeb3Context();

    return(
        <div className={cx(globalStyles.container)}>
            <form>
                <div className={cx(globalStyles.row)}>
                    <div className={cx(globalStyles.col)}>
                        <label>
                        ERC-721 Contract

                        </label>
                        <input
                        className={cx(globalStyles.pb-2)}
                        // prepopulated={props.prepopulated}
                        type="text"
                        name="erc721Address"
                        onChange={(event) => {props.changed(event, 'erc721Address')}}
                        />
                    </div>
                    <div className={cx(globalStyles.col)}>
                        <label>
                        ERC-721 Token Id
                        </label>
                        <input
                        // prepopulated={this.props.prepopulated}
                        type="text"
                        name="tokenId"
                        onChange={(event) => {props.changed(event, 'tokenId')}}
                        />
                    </div>
                </div>
                <div className={cx(globalStyles.row)}>
                    <div className={cx(globalStyles.col)}>
                        <label>
                            Payment Address
                        </label>
                    <div className={cx(globalStyles.col)}>
                        <input
                            type="text"
                            name="paymentAddress"
                            onChange={(event) => {props.changed(event, 'paymentAddress')}}
                        />
                    </div>
                    </div>
                    <div className={cx(globalStyles.col)}>                        <label>
                            Tax Address
                        </label>
                        <input
                            type="text"
                            name="taxAddress"
                            onChange={(event) => {props.changed(event, 'taxAddress')}}
                        />
                    </div>
                </div>
                <div className={cx(globalStyles.row)}>
                    <div className={cx(globalStyles.col)}>  
                        <label>
                            ERC-20 Supply  
                        </label>
                        <input
                            type="text"
                            name="erc20Supply"
                            onChange={(event) => {props.changed(event, 'erc20Supply')}}
                        />
                    </div>
                    <div className={cx(globalStyles.col)}>  
                        <label>
                            ERC-20 Name
                        </label>
                        <input
                            type="text"
                            name="erc20Name"
                            onChange={(event) => {props.changed(event, 'erc20Name')}}
                        />
                    </div>
                </div>
                <div className={cx(globalStyles.row)}>
                    <div className={cx(globalStyles.col)}> 
                        <label>
                            ERC-20 Symbol
                        </label>
                        <input
                            type="text"
                            name="erc20Symbol"
                            onChange={(event) => {props.changed(event, 'erc20Symbol')}}
                        />
                    </div>
                    <div className={cx(globalStyles.col)}> 
                        <label>
                            ERC-20 Decimals
                        </label>
                        <input
                            type="text"
                            name="erc20Decimals"
                            onChange={(event) => {props.changed(event, 'erc20Decimals')}}
                        />
                    </div>
                </div>
                <div className={cx(globalStyles.row)}>
                    <div className={cx(globalStyles.col)}> 
                        <label>
                            Minimum Shares
                        </label>
                        <input
                            type="text"
                            name="minShares"
                            onChange={(event) => {props.changed(event, 'minShares')}}
                        />
                    </div>
                    <div className={cx(globalStyles.col)}>
                        <label>
                            Token Tax Rate
                        </label>
                        <input
                            type="text"
                            name="taxRate" 
                            onChange={(event) => {props.changed(event, 'taxRate')}}
                        />
                    </div>
                </div>
            </form>
            <div className={cx(globalStyles.container)}>
            <button
                className={cx(globalStyles.btn, globalStyles['btn-primary'], styles.formSubmitButton)}
                onClick={() => {props.clicked(context)}}
            >
                Submit
            </button>
            </div>
        </div>

    )
}

export default lockForm;