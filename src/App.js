import React, { Component } from 'react';
import web3 from './web3';
import ballot from './ballot';
import logo from './logo.svg';
// import './App.css';


class App extends Component{

  state = {
    proposal: '',
    choice1: '',
    choice2: '',
    states: '',
    name: '',
  };

  async componentDidMount() {
    const proposal = await ballot.methods.proposal().call();
    const choice1 = await ballot.methods.choice1().call();
    const choice2 = await ballot.methods.choice2().call();
    const states = await ballot.methods.state().call();
    const choice1Votes = await ballot.methods.choice1Votes().call();
    const choice2Votes = await ballot.methods.choice2Votes().call();
    const result = await ballot.methods.result().call();
    this.setState({ proposal, choice1, choice2, states, choice1Votes, choice2Votes, result });
  }

  async startVote() {
    const acc = await web3.eth.getAccounts();
    const account = acc[0];
    const txn = await ballot.methods.startVoting().send({ from: account });

  }

  addVoter = async () => {
    const acc = await web3.eth.getAccounts();
    const account = acc[0];

    const txn = await ballot.methods.addVoter(this.state.name).send({from: account});
  }

  doVoteChoice1 = async () => {
    const acc = await web3.eth.getAccounts();
    const account = acc[0];
    const txn = await ballot.methods.castVote(true).send({from: account});
  }

  doVoteChoice2 = async () => {
    const acc = await web3.eth.getAccounts();
    const account = acc[0];
    const txn = await ballot.methods.castVote(false).send({from: account});
  }

  endVote = async () => {
    const acc = await web3.eth.getAccounts();
    const account = acc[0];
    const txn = await ballot.methods.endVoting().send({from: account});
  }


  render() {
    return (
      <div>
        <h2>Voting Contract</h2>
        <p>This contract to vote for {this.state.proposal} </p>
        <p>Choice1 {this.state.choice1} </p>
        <p>Choice1Votes {this.state.choice1Votes} </p>
        <p>Choice2 {this.state.choice2} </p>
        <p>Choice2Votes {this.state.choice2Votes} </p>
        <p>State {this.state.states} </p>

        <button onClick={this.startVote}>Start Voting</button>

        <p>Name</p><input value={this.state.name} onChange={ e => this.setState({name:e.target.value})}></input>
        <button onClick={this.addVoter}>Add a voter</button>

        <br/>
        <br/>
        <br/>
        <button onClick={this.doVoteChoice1}>{this.state.choice1}</button>
        <button onClick={this.doVoteChoice2}>{this.state.choice2}</button>

        <br></br>
        <button onClick={this.endVote}>Stop Voting</button>
        <br></br>

        <p>Winner {this.state.result} </p>
      </div>
    );
  }
}

export default App;
