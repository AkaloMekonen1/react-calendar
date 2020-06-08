import React from 'react';
import ReactDOM from 'react-dom';
import Calendar from './components/Calendar'


const App=()=>{
    return(
        <div>
          <Calendar />
        </div>
    )
}

ReactDOM.render( <App /> ,document.getElementById('root'))

