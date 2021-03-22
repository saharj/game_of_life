import React, { useEffect, useState } from 'react';

export interface Props {
    count: number
}

const Grids: React.FC<Props> = (props) => {
    const [squareCount, setSquareCount] = useState(5);
    const [width, setWidth] = useState(78);

    useEffect(() => {
        setSquareCount(props.count * props.count);
        setWidth(420 / props.count - 2);
    }, [props.count])

    return (
        <div>
            <div className="grids">
                {[...Array(squareCount)].map(i => {
                    return <div key={i} className="square" style={{ "width": width, "height": width }}></div>
                })}
            </div>
            <div className="actions">
                <button>Play</button>
                <button>Pause</button>
                <button>Stop</button>
            </div>
        </div>
    );
}

export default Grids;
