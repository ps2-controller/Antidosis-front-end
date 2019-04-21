import React, { Component } from 'react';
import './App.css';
import { ethers } from 'ethers';
import Web3Provider from 'web3-react';
import MintToken from './Components/MintToken/MintToken'
import { Connectors } from 'web3-react'
import contracts from './Contracts'
import Connect from './Components/Connect';
import LockForm from './Components/LockForm/LockForm';
import GetDai from './Components/GetDai/GetDai';
import AllowDai from './Components/AllowDai/AllowDai';
import SetHarberger from './Components/SetHarberger/SetHarberger';
import TakeTokens from './Components/TakeTokens/TakeTokens';
import GetHarberger from './Components/GetHarberger/GetHarberger';
import TransferTokens from './Components/TransferTokens/TransferTokens';


class App extends Component {
  state = {
    context: null,
    tokenId: null,
    atcAddress: null,
    setHarbergerValues: {
      userValue: null,
      userDuration: null
    },
    getHarbergerValues: null,
    tokensToTake: null,
    formControls: null,
    getHarbergerAddress: null,
    transferFrom: null,
    transferAmount: null
  }

  connectHandler = (context) =>{
    this.setState({context: context})
  }

  mintTokenHandler = async (context) => {
    let dummy721Contract = new ethers.Contract(contracts.dummy721.address, contracts.dummy721.ABI, context.library.getSigner());
    await dummy721Contract.functions.mintUniqueTokenTo(context.account);
    await dummy721Contract.once('minted', (res) => {
      this.setState({tokenId: res.toNumber()});
    });
  }
  lockTokenHandler = async (formControls) => {
    this.setState({formControls: formControls});
    let erc721Address = formControls.erc721Address.value;
    let tokenId = formControls.tokenId.value;
    let paymentAddress = formControls.paymentAddress.value.toString();
    let taxAddress = formControls.taxAddress.value.toString();
    let erc20Supply = formControls.erc20Supply.value;
    let erc20Name = formControls.erc20Name.value;
    let erc20Symbol = formControls.erc20Symbol.value;
    let erc20Decimals = formControls.erc20Decimals.value;
    let minShares = JSON.stringify(formControls.minShares.value * Math.pow(10, formControls.erc20Decimals.value));
    let taxRate = formControls.taxRate.value;

    let addressesToUse = [paymentAddress, taxAddress];
    let _data = await ethers.utils.defaultAbiCoder.encode(
      [
        'address[2] memory', 
        'uint256', 
        'string memory', 
        'string memory', 
        'uint8', 
        'uint256', 
        'uint256'
      ],
      [
        addressesToUse, 
        erc20Supply, 
        erc20Name, 
        erc20Symbol, 
        erc20Decimals, 
        minShares, 
        taxRate
      ]);
    let dummy721Contract = new ethers.Contract(erc721Address, contracts.dummy721.ABI, this.state.context.library.getSigner());
    await dummy721Contract['safeTransferFrom(address,address,uint256,bytes)'](this.state.context.account, contracts.tokenizeCore.address, tokenId, _data, {gasLimit: 5000000});
    let tokenizeCoreContract = new ethers.Contract(contracts.tokenizeCore.address, contracts.tokenizeCore.ABI, this.state.context.library.getSigner());
    await tokenizeCoreContract.once("receivedToken", (res) => {
      console.log("Token ID: " + res.toNumber());
    });
    await tokenizeCoreContract.once("lockingToken", (res) => {
      console.log(res);
    });
    await tokenizeCoreContract.once("newAssetTokenizationContractCreated", (res) => {
      console.log("Asset Tokenization Contract Address: " + res);
    });
  }

  getDaiHandler = async (context) => {
    let daiContract = new ethers.Contract(contracts.dai.address, contracts.dai.ABI, context.library.getSigner())
    await daiContract.functions.createTokens(context.account, ethers.utils.bigNumberify("10000000000000000000000000"));
    await daiContract.balanceOf(context.account).toString();
    await daiContract.once("tokenFaucet", (res) => {
      console.log(res.toString())
    }) ;
  }

  allowDaiChangeHandler = (event) => {
    this.setState({atcAddress: event.target.value});

  }

  allowDaiClickHandler = async (context) => {
    let daiContract = new ethers.Contract(contracts.dai.address, contracts.dai.ABI, context.library.getSigner())
    await daiContract.approve(this.state.atcAddress, (ethers.utils.bigNumberify('115792089237316195423570985008687907853269984665640564039457584007913129639935')));
    await this.getAllowance(context);
  }

  getAllowance = async (context) => {
    let daiContract = new ethers.Contract(contracts.dai.address, contracts.dai.ABI, context.library.getSigner())
      await daiContract.balanceOf(context.account);
  }

  harbergerValueChangeHandler = (event) => {
    this.setState({setHarbergerValues: {userValue: event.target.value, userDuration: this.state.setHarbergerValues.userDuration}});
  }

  harbergerDurationChangeHandler = (event) => {
    this.setState({setHarbergerValues: {userValue: this.state.setHarbergerValues.userValue, userDuration: event.target.value}});
  }

  setHarbergerClickHandler = async (context) => {
    let atcContract = new ethers.Contract(this.state.atcAddress, contracts.assetTokenization.ABI, context.library.getSigner());
    await atcContract.functions.setHarberger(this.state.setHarbergerValues.userValue, this.state.setHarbergerValues.userDuration);
  }

  getHarbergerChangeHandler = async (event) => {
    this.setState({getHarbergerAddress: event.target.value});
  }

  getHarbergerClickHandler = async (context) => {
    let atcContract = new ethers.Contract(this.state.atcAddress, contracts.assetTokenization.ABI, context.library.getSigner());
    console.log(await atcContract.harbergerSetByUser(this.state.getHarbergerAddress));
  }

  takeTokensChangeHandler = (event) => {
    this.setState({tokensToTake: event.target.value});
  }

  takeTokensClickHandler = async (context) => {
    console.log(this.state.atcAddress);
    let atcContract = new ethers.Contract(this.state.atcAddress, contracts.assetTokenization.ABI, context.library.getSigner());
    console.log(atcContract);
    console.log(context.account);
    console.log(this.state.tokensToTake);
    await atcContract.transferFrom(this.state.atcAddress, context.account, this.state.tokensToTake);
    await atcContract.once('worksChecker', (res) => {
      console.log(res.toString());
    });
    await atcContract.once('testTransfer', (res) => {
      console.log(res.toString());
    });

  }

  transferFromChangeHandler = async (event) => {
    this.setState({transferFrom: event.target.value});
  }

  transferAmountChangeHandler = async (event) => {
    this.setState({transferAmount: event.target.value})
  }

  transferClickHandler = async (context) => {
    let atcContract = new ethers.Contract(this.state.atcAddress, contracts.assetTokenization.ABI, context.library.getSigner());
    await atcContract.transferFrom(this.state.transferFrom, context.account, this.state.transferAmount);
    await atcContract.once('worksChecker', (res) => {
      console.log(res.toString());
    });
    await atcContract.once('testTransfer', (res) => {
      console.log(res.toString());
    });
  }


  
  render() {
    const defaultNetwork = 4;
    const supportedNetworkURLs =  {4: 'rinkeby.infura.io/v3/4faf52f5e97a401ea7a59c628d8fa02e'};
    
    const {InjectedConnector, LedgerConnector} = Connectors;
    const MetaMask = new InjectedConnector({ supportedNetworks: [ 4 ] });

    const Ledger = new LedgerConnector({
      supportedNetworkURLs,
      defaultNetwork
    });
    const connectors = {MetaMask, Ledger};

    if(this.state.context === null){
      return(
        <Web3Provider
        connectors = {connectors}
        libraryName={'ethers.js'}
        >
        <Connect
          clicked={this.connectHandler}
          connection={connectors}
        />
        
        </Web3Provider>
      )
    } else {
      return (
        <Web3Provider
        connectors = {connectors}
        libraryName={'ethers.js'}
        >
          <MintToken
            clicked={this.mintTokenHandler}/>
          <p>{this.state.tokenId}</p>
          <GetDai
            clicked={this.getDaiHandler}
          /> 
          <LockForm
            prepopulated='abc'
            click={this.lockTokenHandler}
          />
          <AllowDai
            changed={this.allowDaiChangeHandler}
            clicked={this.allowDaiClickHandler}
          />
          <SetHarberger
            valChanged={this.harbergerValueChangeHandler}
            durChanged={this.harbergerDurationChangeHandler}
            clicked={this.setHarbergerClickHandler}
          />
          <TakeTokens
            changed={this.takeTokensChangeHandler}
            clicked={this.takeTokensClickHandler}
          />
          <GetHarberger
            clicked={this.getHarbergerClickHandler}
            changed={this.getHarbergerChangeHandler}
          />

          <TransferTokens
            fromChanged={this.transferFromChangeHandler}
            amountChanged={this.transferAmountChangeHandler}
            clicked={this.transferClickHandler}
          />
        </Web3Provider>
      )
    }
  }
}

export default App;