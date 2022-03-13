import React from 'react';
import './MainArea.css';

import MonacoEditor from '@uiw/react-monacoeditor';

export default class MainArea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            respo: '',
        };
    }

    handleChange = (newValue, event) => {
        this.setState({ value: newValue });
    }

    handleSubmit = (event) => {
        event.preventDefault();

        this.setState({
            respo: '',
        });

        let code = this.state.value;
        /* Escape all backslashes in code */
        code = code.replace(/\\/g, "\\\\");
        /* Escape all quotes in code */
        code = code.replace(/'/g, "\\'");
        code = code.replace(/"/g, "\\\"");
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
        fetch('https://plump-linen-binder.glitch.me/code', reqOptions)
            .then(res => res.json())
            .then(res => {
                response = res.code
                const rating = response.substring(response.indexOf("Your code has been rated"))
                response = response.substring(0, response.indexOf(",------------------"))
                response = response.substring(19 + 33)
                const regex = /,(?![^()]*\))/
                response = response.split(regex).map(str =>
                    <details>
                        <summary>
                            {str.substring(15, 15 + str.substring(15).indexOf('('))}
                        </summary>
                        {str.substring(15 + str.substring(15).indexOf('('))}
                    </details>
                )
                response.push(<p>{rating}</p>)
                this.setState({
                    respo: response
                })
            })
        this.inProgress = false;
    }

    render() {
        return (
            <div className="form-container">
                <div className="form-group">
                    <MonacoEditor
                        language="python"
                        height="50vh"
                        width="90vw"
                        value="print('Hello World')"
                        options={{
                            theme: 'vs-dark',
                        }}
                        onChange={this.handleChange.bind(this)}
                    />
                    <input type="submit" value="Submit" className="btn btn-primary mt-3 mb-5 mx-auto" onClick={this.handleSubmit} />
                    <div id="result">
                        {this.state.respo}
                    </div>
                </div>
            </div>
        )
    }
}
