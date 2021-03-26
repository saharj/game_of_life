import React, { useEffect, useState } from 'react';
import { nextLife, createMatrix, updateMatrix } from "../utils/util";

export interface Props {
    row: number
    col: number
}

const Grids: React.FC<Props> = (props) => {
    const [width, setWidth] = useState(78);
    const [height, setHeight] = useState(78);
    const [checked, setChecked] = useState(["10-8", "10-9", "10-10", "3-8", "3-6", "3-7", "4-7", "5-7", "6-8", "7-9"]);
    const [matrix, setMatrix] = useState([[0]]);

    useEffect(() => {
        setWidth(420 / props.col - 2);
        setHeight(420 / props.row - 2);
        setMatrix(createMatrix(props.col, props.row));
    }, [props.row, props.col])

    useEffect(() => {
        if (width !== 78) {
            setMatrix(updateMatrix(matrix, checked));
        }
    }, [matrix, checked, width])

    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
        const squareId = e.currentTarget.id;
        if (checked.includes(squareId)) {
            setChecked(checked.filter(item => item !== squareId));
        } else {
            setChecked([...checked, squareId])
        }
    }

    const onPlay = (e: React.MouseEvent<HTMLElement>) => {
        if (matrix.length > 1) {
            setChecked(nextLife(matrix, props.col, props.row));
        }
    }

    const onPause = (e: React.MouseEvent<HTMLElement>) => {
        console.log("Paused");
    }

    const squareStyle: any = (id: string) => {
        let bg: string = "ccc";
        if (checked.includes(id)) {
            bg = "rgb(86 102 140)";
        }
        return {
            "width": width,
            "height": height,
            "backgroundColor": bg
        };
    }

    return (
        <div className="wrapper">
            <div className="grids">
                {props.row && [...Array(props.row)].map((value: undefined, r: number) => {
                    return [...Array(props.col)].map((value: undefined, c: number) => {
                        const id: string = r.toString() + "-" + c.toString();
                        return (
                            <div
                                key={id}
                                id={id}
                                className="square"
                                style={squareStyle(id)}
                                onClick={handleClick}
                            ></div>
                        );
                    });
                })}
            </div>
            <div className="actions">
                <button className="play" onClick={onPlay}>Play</button>
                <button className="pause" onClick={onPause}>Pause</button>
                <button className="stop">Stop</button>
                <button className="size">25x25</button>
                <button className="size">30x30</button>
                <button className="size">35x35</button>
            </div>
        </div>
    );
}

export default Grids;
