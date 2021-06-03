const gameBoard = document.querySelector('.gameboard');
const restartButton = document.querySelector('.restart');
const player = document.querySelector('.player');
const modal = document.querySelector('.modal');
class Gobang {
    constructor() {
        this.initial();
        this.score = { white: 0, black: 0 };
        restartButton.addEventListener('click', this.restart)
    }

    initial() {
        this.goLocation = Array(361);
        this.player = { turn: 'black' };
        player.childNodes[1].classList.add(this.player.turn);
        modal.textContent="";
        for (let i = 1; i < 362; i++) {
            let div = document.createElement('div');
            div.classList.add('loc');
            div.classList.add(`mark${i}`);
            const dotLocation = [61, 67, 73, 175, 181, 187, 289, 295, 301];
            if (dotLocation.includes(i)) {
                let blackDot = document.createElement('div');
                blackDot.classList.add('blackdot');
                div.insertAdjacentElement('afterbegin', blackDot);
            }
            gameBoard.insertAdjacentElement('beforeend', div);
            div.addEventListener('click', this.play.bind(this, div, i))
        }
    }

    restart = () => {
        document.querySelectorAll('.loc').forEach(el => el.remove());
        document.querySelector('.modal').classList.remove('show');
        player.childNodes[1].classList.toggle('black');
        this.initial();
    }

    play = (div, i) => {
        if (this.goLocation[i]) return
        let circle = document.createElement('div');
        circle.classList.add(this.player.turn);
        this.goLocation[i] = this.player.turn;
        div.insertAdjacentElement('afterbegin', circle);
        const check = this.checkWinner(i, this.player.turn);
        if (check) {
            modal.classList.add('show');
            modal.textContent = `${this.player.turn} WIN`.toUpperCase();
            this.score[this.player.turn]++;
            document.querySelector(`.${this.player.turn}_score`).textContent= `${this.player.turn.toUpperCase()} SCORE:${this.score[this.player.turn]}`;
            return
        }
        player.childNodes[1].classList.remove(this.player.turn);
        this.player.turn = this.player.turn === 'white' ? 'black' : 'white';
        player.childNodes[1].classList.add(this.player.turn);



    }


    checkWinner(i, player) {
        const winArr = [1, 18, 19, 20]
        const score = [];
        winArr.forEach(el => {
            let chain = 1;
            let prev = i - el;
            let next = i + el;
            while ((this.goLocation[prev] === player || this.goLocation[next] === player) && chain < 5) {
                if (this.goLocation[prev]) {
                    chain++;
                    prev -= el;
                } else {
                    prev = undefined
                }
                if (this.goLocation[next]) {
                    chain++;
                    next += el;
                } else {
                    next = undefined
                }
            }
            score.push(chain)
        })
        if (score.includes(5)) return player;
        return null
    }






}

const GO = new Gobang();

