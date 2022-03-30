import {Component, ElementRef, ViewEncapsulation} from '@angular/core';
import {delay} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  title = 'table-game';
  gameIsStarted: boolean = false

  public gameData = [
    [1,2,3,4],
    [5,6,7,8],
    [9,10,11,12],
    [13,14,15,-1]
  ]
  time: number = 0;
  timer: any;
  gameWon: number = 0;
  counter: number = 0;

  // detect arrow up down left right press and move the items in gameData matrix
  moveDown() {
    this.counter++;
    let moved = false;
    for (let i = 0; i < this.gameData.length; i++) {
      for (let j = 0; j < this.gameData[i].length; j++) {
        if (this.gameData[i][j] == -1) {
          if (i > 0) {
            this.checkDownWinState(i, j);
            this.gameData[i][j] = this.gameData[i - 1][j];
            this.gameData[i - 1][j] = -1;
            this.checkIncreaseWinState(i - 1, j);
            moved = true;
          }
        }
      }
    }
    if (moved) {
      this.checkWin();
    }
  }
  moveUp() {
    this.counter++;
    let moved = false;
    for (let i = this.gameData.length - 1; i >= 0; i--) {
      for (let j = this.gameData[i].length - 1; j >= 0; j--) {
        if (this.gameData[i][j] == -1) {
          if (i < this.gameData.length - 1) {
            this.checkDownWinState(i, j);
            this.gameData[i][j] = this.gameData[i + 1][j];
            this.gameData[i + 1][j] = -1;
            this.checkIncreaseWinState(i + 1, j);
            moved = true;
          }
        }
      }
    }
    if (moved) {
      this.checkWin();
    }
  }
  moveRight() {
    this.counter++;
    let moved = false;
    for (let i = 0; i < this.gameData.length; i++) {
      for (let j = 0; j < this.gameData[i].length; j++) {
        if (this.gameData[i][j] == -1) {
          if (j > 0) {
            this.checkDownWinState(i, j);
            this.gameData[i][j] = this.gameData[i][j - 1];
            this.gameData[i][j - 1] = -1;
            this.checkIncreaseWinState(i, j - 1);
            moved = true;
          }
        }
      }
    }
    if (moved) {
      this.checkWin();
    }
  }
  moveLeft() {
    this.counter++;
    let moved = false;
    for (let i = this.gameData.length - 1; i >= 0; i--) {
      for (let j = this.gameData[i].length - 1; j >= 0; j--) {
        if (this.gameData[i][j] == -1) {
          if (j < this.gameData[i].length - 1) {
            this.checkDownWinState(i, j);
            this.gameData[i][j] = this.gameData[i][j + 1];
            this.gameData[i][j + 1] = -1;
            // check if gameWon state increases or not
            this.checkIncreaseWinState(i, j + 1);
            moved = true;
          }
        }
      }
    }
    if (moved) {
      this.checkWin();
    }
  }

  keyDown(event: KeyboardEvent) {
    if (event.keyCode == 38 && this.gameIsStarted) {
      this.moveUp();
    }
    if (event.keyCode == 40 && this.gameIsStarted) {
      this.moveDown();
    }
    if (event.keyCode == 37 && this.gameIsStarted) {
      this.moveLeft();
    }
    if (event.keyCode == 39 && this.gameIsStarted) {
      this.moveRight();
    }
  }

  // functions to check win state increased or decreased after each move
  checkDownWinState(i:number,j:number) {
    if (this.gameData[i][j] === j + 1 + (4 * i)) this.gameWon--;
  }
  checkIncreaseWinState(i:number,j:number) {
    if (this.gameData[i][j] === j + 1 + (4 * i)) this.gameWon++;
  }

  onCellClick(rowIndex: number, cellIndex: number, event: any) {
    if (this.gameData[rowIndex - 1] && this.gameData[rowIndex - 1][cellIndex]) {
      if (this.gameData[rowIndex - 1][cellIndex] == -1) {
        event.target.style.transform = "translateY(-150px)";
        event.target.classList.add("cell--move");
        setTimeout(() => {
          event.target.classList.remove("cell--move");
          event.target.style.transform = null;
          this.checkDownWinState(rowIndex, cellIndex);
          this.gameData[rowIndex - 1][cellIndex] = this.gameData[rowIndex][cellIndex];
          this.checkIncreaseWinState(rowIndex - 1, cellIndex);
          this.gameData[rowIndex][cellIndex] = -1;
          this.counter++;
        }, 210)
      }
    }
    if (this.gameData[rowIndex + 1] && this.gameData[rowIndex + 1][cellIndex]) {
      if (this.gameData[rowIndex + 1][cellIndex] == -1) {
        event.target.style.transform = "translateY(150px)";
        event.target.classList.add("cell--move");
        setTimeout(() => {
          event.target.classList.remove("cell--move");
          event.target.style.transform = null;
          this.checkDownWinState(rowIndex, cellIndex);
          this.gameData[rowIndex + 1][cellIndex] = this.gameData[rowIndex][cellIndex];
          this.checkIncreaseWinState(rowIndex + 1, cellIndex);
          this.gameData[rowIndex][cellIndex] = -1;
          this.counter++;
        }, 210)
      }
    }
    if (this.gameData[rowIndex][cellIndex - 1]) {
      if (this.gameData[rowIndex ][cellIndex - 1] == -1) {
        event.target.style.transform = "translateX(-150px)";
        event.target.classList.add("cell--move");
        setTimeout(() => {
          event.target.classList.remove("cell--move");
          event.target.style.transform = null;
          this.checkDownWinState(rowIndex, cellIndex);
          this.gameData[rowIndex][cellIndex - 1] = this.gameData[rowIndex][cellIndex];
          this.checkIncreaseWinState(rowIndex, cellIndex - 1);
          this.gameData[rowIndex][cellIndex] = -1;
          this.counter++;
        }, 210)
      }
    }
    if (this.gameData[rowIndex][cellIndex + 1]) {
      if (this.gameData[rowIndex ][cellIndex + 1] == -1) {
        event.target.style.transform = "translateX(150px)";
        event.target.classList.add("cell--move");
        setTimeout(() => {
          event.target.classList.remove("cell--move");
          event.target.style.transform = null;
          this.checkDownWinState(rowIndex, cellIndex);
          this.gameData[rowIndex][cellIndex + 1] = this.gameData[rowIndex][cellIndex];
          this.checkIncreaseWinState(rowIndex, cellIndex + 1);
          this.gameData[rowIndex][cellIndex] = -1;
          this.counter++;
        }, 200)
      }
    }
    this.checkWin();
  }

  startGame() {
    let tempArr: number[] = [];
    for (let i=0;i<16;++i) tempArr[i]=i;

    this.shuffle(tempArr);

    let i = 0;
    this.gameWon = 0;
    this.gameData.forEach(value => {
      for(let j = 0; j < value.length; j++) {
        if(tempArr[i] == 0) {
          value[j] = -1
        } else {
          value[j] = tempArr[i];
          if (value[j] === i + 1) {
            this.gameWon++;
          }
        }
        i++;
      }
    })

    this.counter = 0;
    this.time = 0;
    if (this.timer) clearInterval(this.timer);
    this.timer = setInterval(() => this.time++, 1000)
    this.gameIsStarted = true;
  }

  shuffle(array: Array<number>) {
    let tmp, current, top = array.length;
    if(top) while(--top) {
      current = Math.floor(Math.random() * (top + 1));
      tmp = array[current];
      array[current] = array[top];
      array[top] = tmp;
    }
    return array;
  }

  private checkWin() {
    if (this.gameWon === 15) clearInterval(this.timer);
  }
}
