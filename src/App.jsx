import React, { useState, useEffect} from 'react';
import { Input } from '@material-ui/core';

import './assets/sass/App.scss';

function App() {
  const [soduku, setSuduku] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]
  ])
  // console.log('soduku', soduku)

  useEffect(() => {
    // checkNum()
    return () => {

    }
  }, [soduku])

  function renderLi() {
    return soduku.map((array,index) => {
      return <li key={index}>{renderInput(array, index)}</li>
    })
  }

  function renderInput(array, area) {
    return array.map((e,index) => {
      return <Input key={`${area}-${index}`} color="secondary" type="number" onChange={setNum} inputProps={{ min: 1, max: 9, maxLength: 1, 'data-area': area, 'data-index': index }} value={e || ''} error={checkNum(array, e, index)}/>
    })
  }

  function setNum(event) {
    // console.log('set', event.target.dataset.area)
    // console.log('value', event.target.value)
    let area = event.target.dataset.area
    let index = event.target.dataset.index
    let new_suduku = JSON.parse(JSON.stringify(soduku))

    if (event.target.value.length> 1) {
      if (event.target.value[0] == 0) {
        event.target.value = event.target.value[1]
      } else {
        event.target.value = event.target.value[0]
      }
    }
    // console.log('soduku 的位置', new_suduku[area][index])
    new_suduku[area][index] = Number(event.target.value)
    setSuduku(new_suduku)
    // console.log('最後的soduku',soduku)
    // checkNum(area)
  }

  function checkNum(array ,e , index) {
    // console.log('array', array)

    // 沒有填的排除
    if(e===0) {
      return false
    } else {
      // 如果9格有與自己位置不相同的相同數字， 
      if(array.indexOf(e) !== index) {
        return true
      }
      // 如果同行有與自己位置不相同的相同數字
      let rowArea;
      switch (array) {
        case 0:
        case 1:
        case 2:
          rowArea = [0,1,2]
          break;
        case 3:
        case 4:
        case 5:
          rowArea = [3,4,5]
          break;
        case 6:
        case 7:
        case 8:
          rowArea = [6,7,8]
          break;
      
        default:
          break;
      }
      return false
    }

  }

  function XXX(array,board) {
    //首先跑每一列的迴圈
    for (let i = 0; i < 9; i++) {
      /*宣告兩個物件，objH是列，objV是行，
      用來紀錄出現過的值*/
      let objH = {}, objV = {}
      //跑每一行的迴圈
      for (let j = 0; j < 9; j++) {
        //把目前位置的值放進cur1及cur2中
        let cur1 = board[i][j], cur2 = board[j][i];
        /*判斷是不是.，如果是有數字的話，
        就去判斷先前有沒有出現過這個數字，如果沒出現就把它記錄下來，
        這樣如果接下來有相同數字，就會有值，會直接回傳false*/
        if (cur1 !== '.') {
          if (objH[cur1]) return false;
          objH[cur1] = 1;
        }
        //行的也像列一樣做判斷處理
        if (cur2 !== '.') {
          if (objV[cur2]) return false;
          objV[cur2] = 1;
        }
      }
    }
    //判斷完行和列，接著再來判斷九宮格的部分
    for (let i = 0; i < 9; i++) {
      /*宣告用來紀錄值的物件obj，以及用來判斷行和列位置的m1和m2，
      m1會是000333666 m2是036036036，m1是行、m2是列，
      所以每列(m1)會跑三次，每次會都從(m2)第0行取到第2行、3取到6、6再取到8，
      跑完m1在直接跳到位置三第四行，繼續跑迴圈，
      由上而下、由左至右的跑每個九宮格。*/
      let obj = {}, m1 = Math.floor(i / 3) * 3, m2 = (i % 3) * 3;
      for (let j = 0; j < 3; j++) {
        for (let k = 0; k < 3; k++) {
          //用迴圈取九宮格的數字，並把目前的數字放進cur中
          let cur = board[m1 + j][m2 + k];
          /*判斷是不是.，如果是有數字的話，
          就去判斷先前有沒有出現過這個數字，如果沒出現就把它記錄下來，
          這樣如果接下來有相同數字，就會有值，會直接回傳false*/
          if (cur !== '.') {
            if (obj[cur]) return false;
            obj[cur] = 1;
          }
        }
      }
    }
    //全部跑完如果都沒回傳false代表是正確的題目，所以最後回傳true
    return true;
  };

  return (
    <div className="App">
      <main className="App-main">
        <ul className="sd">
          {renderLi()}
        </ul>
      </main>
    </div>
  );
}

export default App;
