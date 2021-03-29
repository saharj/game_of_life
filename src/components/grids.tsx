import React, { useEffect, useState } from 'react';
import { nextLife, createMatrix } from "../utils/util";
import useInterval from "./useInterval";

export interface Props {
    row: number
    col: number
}

const Grids: React.FC<Props> = (props) => {
    const [width, setWidth] = useState(78);
    const [height, setHeight] = useState(78);
    const [checked, setChecked] = useState<string[]>([]);
    const [matrix, setMatrix] = useState<number[][]>([[]]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [delay, setDelay] = useState<number>(1500);

    useEffect(() => {
        setWidth(420 / props.col - 2);
        setHeight(420 / props.row - 2);
    }, [props.row, props.col])

    useEffect(() => {
        // Make sure createMatrix is called after props are passed
        if (width !== 78) {
            setMatrix(createMatrix(props.col, props.row, checked));
        }
    }, [props, checked, width])

    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        const squareId = e.currentTarget && e.currentTarget.id;
        if (checked.length > 0 && checked.includes(squareId)) {
            console.log(squareId);
            setChecked(checked.filter(item => item !== squareId));
        } else {
            setChecked([...checked, squareId]);
        }
    }

    const onPlay = (e: React.MouseEvent<HTMLElement>) => {
        if (matrix.length > 1) {
            setIsPlaying(true);
        }
    }

    const repeat = () => {
        if (checked.length > 0) {
            setChecked(nextLife(matrix, props.col, props.row));
        }
    }

    useInterval(
        repeat,
        // Delay in milliseconds or null to stop it
        isPlaying ? delay : null,
    )

    const onPause = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        setIsPlaying(false);
    }

    const squareStyle: any = (id: string) => {
        let bg: string = "#eee";
        if (checked.length > 0 && checked.includes(id)) {
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
                <button className="stop" onClick={onPause}>Stop</button>
                <button className="clear">clear</button>
                <button className="size">25x25</button>
                <button className="size">30x30</button>
                <button className="size">35x35</button>
            </div>
        </div>
    );
}

export default Grids;
