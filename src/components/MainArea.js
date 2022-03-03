import React from 'react';
import './MainArea.css';

export default class MainArea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            respo: ''
        };
    }

    handleChange = (event) => {
        this.setState({ value: event.target.value });
    }

    handleSubmit = (event) => {
        console.clear()
        event.preventDefault();
        let code = this.state.value;
        /* Escape all quotes in code */
        code = code.replace(/'/g, "\\'");
        code = code.replace(/"/g, "\\\"");
        /* Escape all backslashes in code */
        code = code.replace(/\\/g, "\\\\");
        /* Escape all newlines in code */
        code = code.replace(/\n/g, "\\n");
        /* Escape all tabs in code */
        code = code.replace(/\t/g, "\\t");
        /* Escape all carriage returns in code */
        code = code.replace(/\r/g, "\\r");
        /* Escape all linefeeds in code */
        code = code.replace(/\f/g, "\\f");

        const reqOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                code: code,
            }),
        }

        let response = ''
        fetch('https://cors-anywhere.herokuapp.com/https://pinnate-industrious-study.glitch.me/code', reqOptions)
            .then(res => res.json())
            .then(res => {
                response = res.code
                const regex = /,(?![^()]*\))/
                response = response.split(regex).map(str => <p>{str}</p>)
                this.setState({
                    respo: response
                })
            })
    }

    render() {
        return (
            <div className="form-container">
                <div className="form-group">
                    <label htmlFor="textbox">Paste your python code below</label>
                    <textarea type="text" className="form-control" id="textbox" value={this.state.value} onChange={this.handleChange} rows="15" />
                    <input type="submit" value="Submit" className="btn btn-primary mt-3 mb-5 mx-auto" onClick={this.handleSubmit} />
                    <p id="result">
                        {this.state.respo}
                    </p>
                </div>
            </div>
        )
    }
}
