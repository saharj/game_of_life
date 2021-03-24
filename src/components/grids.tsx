import React, { useEffect, useState } from 'react';
import { nextLife, createMatrix } from "../utils/util";

export interface Props {
    row: number
    col: number
}

const Grids: React.FC<Props> = (props) => {
    const [width, setWidth] = useState(78);
    const [height, setHeight] = useState(78);
    const [checked, setChecked] = useState(["10-10", "3-8"]);
    const [matrix, setMatrix] = useState([[0]]);

    useEffect(() => {
        setWidth(420 / props.col - 2);
        setHeight(420 / props.row - 2);
        setMatrix(createMatrix(5, 5, ["0-1", "0-2", "1-2", "1-3", "2-1", "2-2"]));
    }, [props.row, props.col])

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
            setChecked(nextLife(matrix, 5, 5));
        }
    }

    const squareStyle: any = (id: string) => {
        let bg: string = "white";
        if (checked.includes(id)) {
            bg = "red";
        }
        return {
            "width": width,
            "height": height,
            "backgroundColor": bg
        };
    }

    return (
        <div>
            <div className="grids">
                {props.row && [...Array(props.row)].map((value: undefined, r: number) => {
                    return [...Array(props.col)].map((value: undefined, c: number) => {
                        const id: string = r.toString() + "-" + c.toString();
                        return (
                            <div
                                // Adding "a" in the middle to make sure the key is always unique
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
                <button onClick={onPlay}>Play</button>
                <button>Pause</button>
                <button>Stop</button>
            </div>
        </div>
    );
}

export default Grids;
