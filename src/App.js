import React, { Component } from 'react';
import './App.css';
import { ethers } from 'ethers';
import Web3Provider from 'web3-react';
import MintToken from './Components/MintToken/MintToken';
import { Connectors } from 'web3-react';
import FortmaticApi from "fortmatic";
import contracts from './Contracts';
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
    transferAmount: null,
    formControls: {
      erc721Address: null,
      tokenId: null,
      paymentAddress: null,
      taxAddress: null,
      erc20Supply: null,
      erc20Name: null,
      erc20Symbol: null,
      erc20Decimals: null,
      minShares: null,
      taxRate: null
    }
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

  formControlHandler = async (event, name) => {
    let formControlsInstance = {...this.state.formControls};
    formControlsInstance[name] = event.target.value;
    
    this.setState({
      formControls: formControlsInstance
  })
  }

  lockTokenHandler = async (context) => {
    console.log(this.state.formCont);
    console.log(context);
    let erc721Address = this.state.formControls.erc721Address;
    let tokenId = this.state.formControls.tokenId;
    let paymentAddress = this.state.formControls.paymentAddress.toString();
    let taxAddress = this.state.formControls.taxAddress.toString();
    let erc20Supply = this.state.formControls.erc20Supply;
    let erc20Name = this.state.formControls.erc20Name;
    let erc20Symbol = this.state.formControls.erc20Symbol;
    let erc20Decimals = this.state.formControls.erc20Decimals;
    let minShares = JSON.stringify(this.state.formControls.minShares * Math.pow(10, this.state.formControls.erc20Decimals));
    let taxRate = this.state.formControls.taxRate;

    let addressesToUse = [paymentAddress, taxAddress];
    console.log('hi');
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
    let dummy721Contract = new ethers.Contract(erc721Address, contracts.dummy721.ABI, context.library.getSigner());
    await dummy721Contract['safeTransferFrom(address,address,uint256,bytes)'](context.account, contracts.tokenizeCore.address, tokenId, _data, {gasLimit: 5000000});
    let tokenizeCoreContract = new ethers.Contract(contracts.tokenizeCore.address, contracts.tokenizeCore.ABI, context.library.getSigner());
    await tokenizeCoreContract.once("receivedToken", (res) => {
      console.log("Token ID: " + res.toNumber());
    });
    await tokenizeCoreContract.once("lockingToken", (res) => {
      this.setState({atcAddress: res});
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
    
    const {InjectedConnector, NetworkOnlyConnector, FortmaticConnector, LedgerConnector} = Connectors;
    const MetaMask = new InjectedConnector({ supportedNetworks: [ 4 ] });

    const Ledger = new LedgerConnector({
      supportedNetworkURLs,
      defaultNetwork
    });

    const Fortmatic = new FortmaticConnector({
      api: FortmaticApi,
      apiKey: 'pk_test_13A1FD4E48D9438E',
      logoutOnDeactivation: false
    });

    const connectors = {MetaMask, Ledger, Fortmatic};
    let tokenId;
    if(this.state.tokenId !== null){
      tokenId = (
        <p>{"Your demo Token ID is: " + this.state.tokenId}</p>
      );
    }
    let atcAddress;
    if(this.state.atcAddress !== null){
      atcAddress = (
        <p>{"Asset Tokenization Contract Address: " + this.state.atcAddress}</p>
      )
    }

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
            {tokenId}

          <br />
          
          <GetDai
            clicked={this.getDaiHandler}
          /> 
          <br />
          <br />
           <LockForm
            // prepopulated='abc'
            clicked={this.lockTokenHandler}
            changed={this.formControlHandler}
           />
          {atcAddress}

          <br />

          <AllowDai
            changed={this.allowDaiChangeHandler}
            clicked={this.allowDaiClickHandler}
          />
          <br />
          <SetHarberger
            valChanged={this.harbergerValueChangeHandler}
            durChanged={this.harbergerDurationChangeHandler}
            clicked={this.setHarbergerClickHandler}
          />
          <br />
          <TakeTokens
            changed={this.takeTokensChangeHandler}
            clicked={this.takeTokensClickHandler}
          />
          <br />
          <GetHarberger
            clicked={this.getHarbergerClickHandler}
            changed={this.getHarbergerChangeHandler}
          />
          <br />
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