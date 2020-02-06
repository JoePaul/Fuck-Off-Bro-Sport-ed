import React from 'react';

import axios from 'axios';
import './main.css'
import Select from "@material-ui/core/Select/Select";

class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            index: 654,
            chosenTeamName: '',
            loading: true,
            allTeams:["AIK", "HV71", "Frölunda", "MODO", "Malmö"]
        }
    }

    componentDidMount() {
        this.makeRequest();
    }

    makeRequest = async () => {
        this.setState({loading: true})
        const url = `http://xkcd.com/${this.state.index}/info.0.json`;
        
        axios.get(url).then(res => {
            console.log("Result: ", res);
            this.setState({ comicImg: res.data.img, loading: false });
        });

    };

    /**
     * When the dropdown changes, the chosen team is saved to the state variable 'chosenTeamName'
     */
    handleChange = (e) => {
        this.setState({chosenTeamName: e.target.value})
    };

    /**
     * Creates the dropdown with all the teams saved in the state variable 'allTeams'
     */
    getTeamsDropdown = () => {
        return (
            <div>
                <Select
                    onChange={this.handleChange}
                    value={this.state.chosenTeamName}
                    className="selectStyle"
                >
                    {this.state.allTeams.map((team) => <option key={team} value={team}>{team}</option>)}
                </Select>
            </div>
        )
    };

    /**
     * TODO Sends insult to chosen person about their team's losses
     */
    sendTeamInsult = () => {
        console.log("Hej")
    };

    /**
     * Creates button which calls the 'sendteamInsult' method
     * @returns {*}
     */
    getButtonForSendingInsult = () => {
        return (<button onClick={this.sendTeamInsult} className="buttonStyle">Skicka!</button>)
    };


    render() {
        return (
            <div className="container">
                <label>Hur gick det för ditt lag??</label>
                {this.getTeamsDropdown()}
                {this.getButtonForSendingInsult()}
            </div>
        )
    }
}

export default Main;