import React from 'react';
import loading from "../../../assets/yuji.gif"

import './styles.scss';

interface Props {
    text: string,
}

function LoaderDefault(props: Props) {

    const {text} = props;

    return (
        <div className='default-loader'>
            <img alt="yuji" src={loading} style={{width:100}}/>
            <div className='loading-text'>

                {text}
            </div>
        </div>
    )
}

export default LoaderDefault;