pragma solidity 0.6.2;

contract Vote {
    struct Voter {
        string name;
        bool voted;
    }

    enum State {
        Created,
        Voting,
        Ended
    }

    string public proposal;
    string public choice1;
    string public choice2;
    string public result;
    uint256 public choice1Votes;
    uint256 public choice2Votes;

    State public state;

    address public ballotOfficialAddress;

    mapping(address => Voter) public voterList;

    constructor(
        string memory _proposal,
        string memory _choice1,
        string memory _choice2
    ) public {
        proposal = _proposal;
        choice1 = _choice1;
        choice2 = _choice2;
        ballotOfficialAddress = msg.sender;
        state = State.Created;
    }

    modifier isOfficial() {
        require(msg.sender == ballotOfficialAddress, "Not authorized");
        _;
    }

    modifier isState(State _state) {
        require(state == _state, "Wrong state in contract");
        _;
    }

    function addVoter(string memory _name) public isState(State.Created) {
        Voter memory _voter;
        _voter.name = _name;

        voterList[msg.sender] = _voter;
    }

    function startVoting() public isOfficial {
        state = State.Voting;
    }

    // if choice - true - vote to choice1 otherwise choice2
    function castVote(bool choice) public isState(State.Voting) {
        Voter storage voter = voterList[msg.sender];
        require(bytes(voter.name).length > 0, "Not registered as a voter");
        require(!voter.voted, "Voter has already voted");

        if (choice) {
            choice1Votes++;
        } else {
            choice2Votes++;
        }

        voter.voted = true;
    }

    function endVoting() public isOfficial {
        state = State.Ended;
        if (choice1Votes > choice2Votes) {
            result = choice1;
        } else if (choice1Votes == choice2Votes) {
            result = "TIE";
        } else {
            result = choice2;
        }
    }
}
