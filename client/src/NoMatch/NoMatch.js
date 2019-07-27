import React from 'react';

var NoMatch = (props) => {
    return(
        <div>
            <h3>No match for <code>{props.location.pathname}</code></h3>
        </div>
    );
}

export default NoMatch;