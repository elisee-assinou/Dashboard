import React from 'react';

function ImageComponent(props) {
    return (
        <img src={ props.url} width="150px" />
    );
}

export default ImageComponent;