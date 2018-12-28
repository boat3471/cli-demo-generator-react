import React from 'react';
import ReactDOM from 'react-dom';
import '../styles/pages/demo.scss';

class App extends React.Component {
    render() {
        return (
            <h1 style={{color: 'red'}}>1231</h1>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById('app'));
