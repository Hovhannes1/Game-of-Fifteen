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

  clickOnCell(rowIndex: number, cellIndex: number, event: any) {
    if (this.gameData[rowIndex - 1] && this.gameData[rowIndex - 1][cellIndex]) {
      if (this.gameData[rowIndex - 1][cellIndex] == -1) {
        event.target.style.transform = "translateY(-150px)";
        event.target.classList.add("cell--move");
        setTimeout(() => {
          event.target.classList.remove("cell--move");
          event.target.style.transform = null;
          if (this.gameData[rowIndex][cellIndex] === cellIndex + 1 + (4 * rowIndex)) this.gameWon--;
          this.gameData[rowIndex - 1][cellIndex] = this.gameData[rowIndex][cellIndex];
          if (this.gameData[rowIndex - 1][cellIndex] === cellIndex + 1 + 4 * (rowIndex - 1)) this.gameWon++;
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
          if (this.gameData[rowIndex][cellIndex] === cellIndex + 1 + (4 * rowIndex)) this.gameWon--;
          this.gameData[rowIndex + 1][cellIndex] = this.gameData[rowIndex][cellIndex];
          if (this.gameData[rowIndex + 1][cellIndex] === cellIndex + 1 + 4 * (rowIndex + 1)) this.gameWon++;
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
          if (this.gameData[rowIndex][cellIndex] === cellIndex + 1 + (4 * rowIndex)) this.gameWon--;
          this.gameData[rowIndex][cellIndex - 1] = this.gameData[rowIndex][cellIndex];
          if (this.gameData[rowIndex][cellIndex - 1] === cellIndex + (4 * rowIndex)) this.gameWon++;
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
          if (this.gameData[rowIndex][cellIndex] === cellIndex + 1 + (4 * rowIndex)) this.gameWon--;
          this.gameData[rowIndex][cellIndex + 1] = this.gameData[rowIndex][cellIndex];
          if (this.gameData[rowIndex][cellIndex + 1] === cellIndex + 2 + (4 * rowIndex)) this.gameWon++;
          this.gameData[rowIndex][cellIndex] = -1;
          this.counter++;
        }, 200)
      }
    }
    if (this.gameWon === 15) clearInterval(this.timer);
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
}
