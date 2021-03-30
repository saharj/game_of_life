import React, { useEffect, useState } from 'react';
import { nextLife, createMatrix } from "../utils/util";
import useInterval from "./useInterval";

const Grids: React.FC = () => {
    const [width, setWidth] = useState(78);
    const [height, setHeight] = useState(78);
    const [checked, setChecked] = useState<string[]>([]);
    const [matrix, setMatrix] = useState<number[][]>([[]]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [delay, setDelay] = useState<number>(1000);
    const [row, setRow] = useState(25);
    const [col, setCol] = useState(25);

    useEffect(() => {
        setWidth(420 / col - 2);
        setHeight(420 / row - 2);
    }, [row, col]);

    useEffect(() => {
        // Make sure createMatrix is called after props are passed
        if (width !== 78) {
            setMatrix(createMatrix(col, row, checked));
        }
    }, [checked, col, row, width]);

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
            setChecked(nextLife(matrix, col, row));
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

    const onClear = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        setIsPlaying(false);
        setChecked([]);
        setMatrix(createMatrix(col, row, []));
    }

    const onSizeClick = (r: number, c: number) => {
        setRow(r);
        setCol(c);
    }

    const onSpeedChange = (speed: string) => {
        if (speed === "fast") {
            if (delay > 210) {
                setDelay(delay - 200);
            } else {
                setDelay(200);
            }
        } else {
            if (delay < 5000) {
                setDelay(delay + 300);
            } else {
                setDelay(5000);
            }
        }
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
                {row && [...Array(row)].map((value: undefined, r: number) => {
                    return [...Array(col)].map((value: undefined, c: number) => {
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
                <button className="clear" onClick={onClear}>clear</button>
                <button className="size" onClick={() => onSizeClick(25, 25)}>25x25</button>
                <button className="size" onClick={() => onSizeClick(30, 30)}>30x30</button>
                <button className="size" onClick={() => onSizeClick(35, 35)}>35x35</button>
                <div className="speed">
                    <button className="slow" onClick={() => onSpeedChange("slow")}>Slower</button>
                    <button className="fast" onClick={() => onSpeedChange("fast")}>Faster</button>
                </div>
            </div>
        </div>
    );
}

export default Grids;
