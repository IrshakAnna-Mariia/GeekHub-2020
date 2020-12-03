import React from 'react';

export default function Table(props) {
    let {columns, rows, cell, data} = props;
    const alpha = ' abcdefghijklmnopqrstuvwxyz';
    let th = [];
    let tr = [];
    let td = [];

    for (let i = 0; i<=columns; i++){
        th[i] = <th key={alpha[i].toUpperCase()}>{alpha[i].toUpperCase()}</th>;
    }

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            td[j]= <td><input
                type="text"
                name={alpha[j + 1] + (i + 1)}
            /></td>;
        }
        tr[i]= <tr>
            <th>{i + 1}</th>
            {td.map(onCell => (
                onCell
            ))}
        </tr>;
    }

    function inputValue() {
        const nameOfCell = cell.split("");
        const numberOfColumn = alpha.indexOf(nameOfCell[0]);
        const numberOfRow = Number(nameOfCell[1]);

        for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < data[0].length; j++) {
                td[numberOfColumn - 1 + j] = <td><input
                    type="text"
                    name={alpha[numberOfColumn + j] + (numberOfColumn + j)}
                    value={data[i][j]}
                /></td>;
            }
            tr[numberOfRow-1+i] = <tr>
                <th>{numberOfRow+i}</th>
                {td.map(onCell => (
                    onCell
                ))}
            </tr>;
        }
    }
    if (!(data === undefined)){inputValue()};

    return (
        <table>
            <thead>
            <tr>
                {th}
            </tr>
            </thead>

            <tbody>
            {tr}
            </tbody>
        </table>
    );
};