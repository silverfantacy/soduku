import React, { useState, useEffect } from 'react';
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
    return soduku.map((array, index) => {
      return <li key={index}>{renderInput(array, index)}</li>
    })
  }

  function renderInput(array, area) {
    return array.map((e, index) => {
      return <Input key={`${area}-${index}`} color="secondary" type="number" onChange={setNum} inputProps={{ min: 1, max: 9, maxLength: 1, 'data-area': area, 'data-index': index }} value={e || ''} error={checkNum(array, area, e, index)} />
    })
  }

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

  function checkNum(array, area, e, index) {
    // array=>當下array，area=>當下區域位置，e=>當下的數字， index=>當下的位置
    // console.log('array', array)

    // 沒有填的排除
    if (e === 0) {
      return false
    }


    // 如果9格有與自己位置不相同的相同數字， 
    let checkSame = array.filter((item, idx) => {
      return item === e
    })
    // console.log('checkSame', checkSame)
    if (checkSame.length > 1) {
      return true
    }
    // return false
    // 如果9格有與自己位置不相同的相同數字， 

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
    if (checkRow.length > 1) {
      return true
    }
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
      case 1:
      case 2:
        this_col = [0, 1, 2]
        break;
      case 3:
      case 4:
      case 5:
        this_col = [3, 4, 5]
        break;
      case 6:
      case 7:
      case 8:
        this_col = [6, 7, 8]
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
    let checkcol = new_col.filter((item, idx) => {
      return item === e
    })
    console.log('checkcol', checkcol)
    if (checkcol.length > 1) {
      return true
    }
    // 行判斷
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
