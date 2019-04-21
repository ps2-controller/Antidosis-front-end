import React, {Component} from 'react';
import styles from './LockForm.module.css';
import globalStyles from './../../Assets/global-styles/bootstrap.min.module.css';
import cx from 'classnames';

class LockForm extends Component {
    state = {
        formControls: {
            erc721Address: {
                value:''
            },
            tokenId: {
                value:''
            },
            paymentAddress: {
                value:''
            },
            taxAddress: {
                value:''
            },
            erc20Supply: {
                value:''
            },
            erc20Name: {
                value:''
            },
            erc20Symbol: {
                value:''
            },
            erc20Decimals: {
                value:''
            },
            minShares: {
                value:''
            },
            taxRate: {
                value:''
            }
        }
    }

    changeHandler = (event) => {
         const name = event.target.name;
         const value = event.target.value;
         this.setState({
             formControls: {
                 ...this.state.formControls,
                 [name]: {
                     ...this.state.formControls[name],
                     value
                 }
             }
         })
    }

    render(){
        return <div className={cx(globalStyles.container)}>
            <form>
                <div className={cx(globalStyles.row)}>
                    <div className={cx(globalStyles.col)}>
                        <label>
                        ERC-721 Contract

                        </label>
                        <input
                        className={cx(globalStyles.pb-2)}
                        prepopulated={this.props.prepopulated}
                        type="text"
                        name="erc721Address"
                        value={this.state.formControls.erc721Address.value} 
                        onChange={this.changeHandler}
                        />
                    </div>
                    <div className={cx(globalStyles.col)}>
                        <label>
                        ERC-721 Token Id
                        </label>
                        <input
                        prepopulated={this.props.prepopulated}
                        type="text"
                        name="tokenId"
                        value={this.state.formControls.tokenId.value} 
                        onChange={this.changeHandler}
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
                            value={this.state.formControls.paymentAddress.value} 
                            onChange={this.changeHandler}
                        />
                    </div>
                    </div>
                    <div className={cx(globalStyles.col)}>                        <label>
                            Tax Address
                        </label>
                        <input
                            type="text"
                            name="taxAddress"
                            value={this.state.formControls.taxAddress.value} 
                            onChange={this.changeHandler}
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
                            value={this.state.formControls.erc20Supply.value} 
                            onChange={this.changeHandler}
                        />
                    </div>
                    <div className={cx(globalStyles.col)}>  
                        <label>
                            ERC-20 Name
                        </label>
                        <input
                            type="text"
                            name="erc20Name"
                            value={this.state.formControls.erc20Name.value} 
                            onChange={this.changeHandler}
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
                            value={this.state.formControls.erc20Symbol.value} 
                            onChange={this.changeHandler}
                        />
                    </div>
                    <div className={cx(globalStyles.col)}> 
                        <label>
                            ERC-20 Decimals
                        </label>
                        <input
                            type="text"
                            name="erc20Decimals"
                            value={this.state.formControls.erc20Decimals.value} 
                            onChange={this.changeHandler}
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
                            value={this.state.formControls.minShares.value} 
                            onChange={this.changeHandler}
                        />
                    </div>
                    <div className={cx(globalStyles.col)}>
                        <label>
                            Token Tax Rate
                        </label>
                        <input
                            type="text"
                            name="taxRate"
                            value={this.state.formControls.taxRate.value} 
                            onChange={this.changeHandler}
                        />
                    </div>
                </div>
            </form>
            <div className={cx(globalStyles.container)}>
            <button
                className={cx(globalStyles.btn, globalStyles['btn-primary'], styles.formSubmitButton)}
                onClick={() => {this.props.click(this.state.formControls)}}
            >
                Submit
            </button>
            </div>
        </div>
    }
}

export default LockForm;