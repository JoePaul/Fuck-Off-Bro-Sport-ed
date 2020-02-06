import React from 'react';

import axios from 'axios';
import Button from '@material-ui/core/Button'; //https://material-ui.com/
import './comic.css'
import { CircularProgress } from '@material-ui/core';

class Comic extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            index: 654,
            comicImg: '',
            loading: true,
        }
    }

    componentDidMount() {
        this.makeRequest();
    }

    getRandomIndex() {
        let randomIndex = Math.floor(Math.random() * 1000);
        this.setState({ index: randomIndex });
    }

    makeRequest = async () => {
        this.setState({loading: true})
        const url = `http://xkcd.com/${this.state.index}/info.0.json`;
        
        axios.get(url).then(res => {
            console.log("Result: ", res);
            this.setState({ comicImg: res.data.img, loading: false });
        });

    }

    getRandomComic = () => {
        this.getRandomIndex();
        this.makeRequest();
    }

    render() {
        return (
            <div className="container">
                <Button className="button" variant="contained" color="primary" onClick={this.getRandomComic}>Random comic</Button>
                <div className="comic-container">
                    {this.state.loading ? <CircularProgress /> : <img src={this.state.comicImg}></img>}
                </div>
            </div>
        )
    }
}

export default Comic;