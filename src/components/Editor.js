import React, { useEffect } from 'react';

import MonacoEditor from '@uiw/react-monacoeditor';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

import './Editor.css';

export default function Editor() {
    const [value, setValue] = React.useState('');
    const [responseContent, setResponseContent] = React.useState('');
    const [inProgress, setInProgress] = React.useState(false);
    const [link, setLink] = React.useState('');
    const { currentUID } = useAuth();

    const { addScore, getScores } = useAuth();

    function handleChange(newValue, event) {
        setValue(newValue);
    }

    useEffect(() => {
        if (currentUID) {
            setLink("/view/" + currentUID);
        }
    }, [currentUID]);

    async function handleSubmit(event) {
        event.preventDefault();

        setInProgress(true);
        setResponseContent('');

        await getScores().then(res => {
            let scores = res.score

            let code = value;
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
                    const ratingScore = parseFloat(rating.substring(rating.indexOf("Your code has been rated at ") + 28, rating.indexOf("/10")));
                    setResponseContent(response);
                    try {
                        addScore(scores + "," + ratingScore);
                    }
                    catch (error) {
                        console.log(error)
                    }
                    setInProgress(false);
                })
        });   
    }

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
                    onChange={handleChange}
                />
                <input type="submit" value="Submit" className="btn btn-primary mt-3 mb-3 mx-auto" disabled={inProgress} onClick={handleSubmit} />
                <Link to={link} className="mb-5">
                    <button className="btn btn-primary w-100">
                        Click here to view your scores!
                    </button>
                </Link>
                <div id="result">
                    {responseContent}
                </div>
            </div>
        </div>
    )
}
