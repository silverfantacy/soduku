import React, { useState, useEffect } from 'react';
import { Input } from '@material-ui/core';

import './assets/sass/App.scss';

const basic_data = [1,2,3,4,5,6,7,8,9]

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
    // 數獨Data發生改變時觸發
    
    return () => {

    }
  }, [])

  create()

  // 生成9個區域
  function renderLi() {
    return soduku.map((array, index) => {
      return <li key={index}>{renderInput(array, index)}</li>
    })
  }

  // 生成區域內的9個格子
  function renderInput(array, area) {
    return array.map((e, index) => {
      return <Input key={`${area}-${index}`} color="secondary" type="number" onChange={setNum} inputProps={{ min: 1, max: 9, maxLength: 1, 'data-area': area, 'data-index': index }} value={e || ''} error={checkNum(array, area, e, index)} />
    })
  }

  // 填入數字
  function setNum(event) {
    // console.log('set', event.target.dataset.area)
    // console.log('value', event.target.value)
    let area = event.target.dataset.area
    let index = event.target.dataset.index
    let new_suduku = JSON.parse(JSON.stringify(soduku))

    if (event.target.value.length > 1) {
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

  // 判斷數字是否在9宮格、行、列內，是否重複
  function checkNum(array, area, e, index) {
    // array=>當下array，area=>當下區域位置，e=>當下的數字， index=>當下的位置

    // 沒有填的排除
    if (e === 0) {
      return false
    }


    // 9宮格判斷
    let checkSame = array.filter((item, idx) => {
      return item === e
    })
    // console.log('checkSame', checkSame)
    // 9宮格判斷

    // 列判斷
    let this_row_area;
    switch (area) {
      case 0:
      case 1:
      case 2:
        this_row_area = [0,1,2]
        break;
      case 3:
      case 4:
      case 5:
        this_row_area = [3,4,5]
        break;
      case 6:
      case 7:
      case 8:
        this_row_area = [6,7,8]
        break;
      default:
        break;
    }
    
    let this_row;
    switch (index) {
      case 0:
      case 1:
      case 2:
        this_row = [0,1,2]
        break;
      case 3:
      case 4:
      case 5:
        this_row = [3,4,5]
        break;
      case 6:
      case 7:
      case 8:
        this_row = [6,7,8]
        break;
      default:
        break;
    }
    // console.log('this_row_area', this_row_area)
    // console.log('this_row', this_row)
    let new_suduku = JSON.parse(JSON.stringify(soduku))
    let new_row = []
    // console.log('new_suduku', new_suduku)
    this_row_area.forEach(i => {
      this_row.forEach(j=>{
        new_row.push(new_suduku[i][j])
      })
    });
    // console.log('這列有的數字',new_row)
    let checkRow = new_row.filter((item, idx) => {
      return item === e
    })
    console.log('checkRow', checkRow)
    // 列判斷

    // 行判斷
    let this_col_area;
    switch (area) {
      case 0:
      case 3:
      case 6:
        this_col_area = [0, 3, 6]
        break;
      case 1:
      case 4:
      case 7:
        this_col_area = [1, 4, 7]
        break;
      case 2:
      case 5:
      case 8:
        this_col_area = [2, 5, 8]
        break;
      default:
        break;
    }

    let this_col;
    switch (index) {
      case 0:
      case 3:
      case 6:
        this_col = [0, 3, 6]
        break;
      case 1:
      case 4:
      case 7:
        this_col = [1, 4, 7]
        break;
      case 2:
      case 5:
      case 8:
        this_col = [2, 5, 8]
        break;
      default:
        break;
    }
    // console.log('this_col_area', this_col_area)
    // console.log('this_col', this_col)
    let new_col = []
    // console.log('new_suduku', new_suduku)
    this_col_area.forEach(i => {
      this_col.forEach(j => {
        new_col.push(new_suduku[i][j])
      })
    });
    // console.log('這列有的數字',new_col)
    let checkCol = new_col.filter((item, idx) => {
      return item === e
    })
    // console.log('checkCol', checkCol)
    // 行判斷

    // 如果有任何一個重複就標記error
    if (checkSame.length > 1 || checkRow.length > 1 || checkCol.length > 1) {
      return true
    }
  }

  // 創建數獨
  function create() {
    let new_arr = JSON.parse(JSON.stringify(soduku))
    // console.log('new_arr', new_arr)
    
    // let randomNub = 1 + (Math.floor(Math.random() * 10));
    // console.log('randomNub', randomNub)
    new_arr.forEach((i,iIndx)=>{
      // i.forEach((j,jIndx)=>{
        
        let use_data = JSON.parse(JSON.stringify(basic_data))
        let a = use_data.length
        let temp
        let new_suduku = []
        while ( a > 0) {
          let tmp_data = use_data
          // console.log('while tmp_data', tmp_data)
          // console.log('while a',a)
          let randomNub = (Math.floor(Math.random() * tmp_data.length)+1);
          // console.log('while randomNub', randomNub)
          temp = tmp_data[randomNub-1]
          // console.log('while temp', temp)
          // console.log('indeOf =>', tmp_data.indexOf(temp))
          tmp_data = JSON.parse(JSON.stringify(tmp_data.splice(tmp_data.indexOf(temp),1)))
          // console.log('use_data end =>', tmp_data)
          new_suduku.push(temp)
          a--
        }
      // console.log('new_suduku',new_suduku)
      new_arr[iIndx] = new_suduku
    })
    console.log('new_arr end =>', new_arr)
    // setSuduku(new_arr)
  }

  // getRandomArrayElements(basic_data, 1)

  function getRandomArrayElements(arr, count) {
    var shuffled = arr.slice(0), i = arr.length, min = i - count, temp, index;
    console.log('shuffled', shuffled, 'i', i, 'min', min)
    while (i-- > min) {
      index = Math.floor((i + 1) * Math.random());
      temp = shuffled[index];
      shuffled[index] = shuffled[i];
      shuffled[i] = temp;
    }

    console.log('shuffled end', shuffled.slice(min), 'min', min)
    return shuffled.slice(min);
  }

  function randomNub() {
    //產生隨機數 0到count不包含count的隨機數
    return 1 + (Math.floor(Math.random() * 9));
  }

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
