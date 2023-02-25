import React, { useState } from 'react'
import './jogo.css'
const Jogo = () => {
    const [turn, SetTurn] = useState('X');
    const [cells, setCells] = useState(Array(9).fill(''));
    const [vencedor, setVencedor] = useState('');
    const [perdedores, setperdedores] = useState('');
    const haVencedor = (squares) => {
        let combos = {
            meio: [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
            ],
            cima: [
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
            ],
            diagonal: [
                [0, 4, 8],
                [2, 4, 6],
            ]

        };
        for (let combo in combos) {

            combos[combo].forEach(patern => {
                if (
                    squares[patern[0]] === '' ||
                    squares[patern[1]] === '' ||
                    squares[patern[2]] === ''
                ) {

                } else if (
                    squares[patern[0]] === squares[patern[1]] &&
                    squares[patern[1]] === squares[patern[2]]) {
                    setVencedor(squares[patern[0]]);
                }

            });
        }
        let i, vazio = 0;

        for (i = 0; i <= 8; i++) {
            if (cells[i] !== '') {
                continue;
            }
             else {
                vazio++;

            }
        }
        if(vazio ==1){
            setperdedores(true);
        }
        vazio =0;

    }

     
    const handleClick = (num) => {
        let squares = [...cells];
        if (cells[num] !== '') {
            alert('Não pode clicar aqui!');
            return;
        }
        if (turn === 'X') {
            squares[num] = 'X';
            SetTurn('O')
        } else {
            squares[num] = 'O';
            SetTurn('X');
        }
        haVencedor(squares)
        setCells(squares);
       
        

    };
  
    const Restart = () => {
        setVencedor(null);
        setCells(Array(9).fill(''));
        setperdedores(false);
    };

    const Cell = ({ num }) => {
        return <td onClick={() => handleClick(num)}>{cells[num]}</td>
         
    };


    return (
        <div className='container'>
            <h1> JOGO DA VELHA</h1>
            <table>
                <h2> Jogador {turn} </h2>
                
                <tbody>
                    <tr>
                        <Cell num={0} />
                        <Cell num={1} />
                        <Cell num={2} />
                    </tr>
                    <tr>
                        <Cell num={3} />
                        <Cell num={4} />
                        <Cell num={5} />
                    </tr>
                    <tr>
                        <Cell num={6} />
                        <Cell num={7} />
                        <Cell num={8} />
                    </tr>
                </tbody>
            </table>
            {vencedor && [
                <>
                    <h2>{vencedor} é o vencedor!</h2>
                    <button onClick={() => Restart()}>Novo Jogo</button>
                </>
            ] || perdedores && [
                <>
                    <h2>EMPATE!</h2>
                    <button onClick={() => Restart()}>Novo Jogo</button>
                </>
            ]}
           <div></div>
        </div>
    )
}

export default Jogo