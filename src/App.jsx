import React, { useState, useEffect } from 'react';
import { Input } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import './assets/sass/App.scss';

const blank_arr = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0]
]
const basic_data = [1, 2, 3, 4, 5, 6, 7, 8, 9]

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));


function App() {
  const [soduku, setSuduku] = useState(blank_arr)
  // console.log('soduku', soduku)

  useEffect(() => {
    // 數獨Data發生改變時觸發
    create()
    return () => {

    }
  }, [])

  // 生成9個區域
  function renderLi() {
    return soduku.map((array, index) => {
      return <li key={index}>{renderInput(array, index)}</li>
    })
  }

  // 生成區域內的9個格子
  function renderInput(array, area) {
    return array.map((e, index) => {
      return <Input key={`${area}-${index}`} color="secondary" type="number" onChange={setNum} inputProps={{ min: 1, max: 9, maxLength: 1, 'data-area': area, 'data-index': index }} value={e || ''} error={checkNumError(array, area, e, index)} />
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
  }

  // 判斷數字是否在9宮格、行、列內，是否重複
  function checkNumError(array, area, e, index, new_arr) {
    // array=>當下array，area=>當下區域位置，e=>當下的數字， index=>當下的位置
    // console.log('array, area, e, index', array, area, e, index)
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
        this_row_area = [0, 1, 2]
        break;
      case 3:
      case 4:
      case 5:
        this_row_area = [3, 4, 5]
        break;
      case 6:
      case 7:
      case 8:
        this_row_area = [6, 7, 8]
        break;
      default:
        break;
    }

    let this_row;
    switch (index) {
      case 0:
      case 1:
      case 2:
        this_row = [0, 1, 2]
        break;
      case 3:
      case 4:
      case 5:
        this_row = [3, 4, 5]
        break;
      case 6:
      case 7:
      case 8:
        this_row = [6, 7, 8]
        break;
      default:
        break;
    }
    // console.log('this_row_area', this_row_area)
    // console.log('this_row', this_row)
    let new_suduku = new_arr || JSON.parse(JSON.stringify(soduku))
    let new_row = []
    // console.log('new_suduku', new_suduku)
    this_row_area.forEach(i => {
      this_row.forEach(j => {
        new_row.push(new_suduku[i][j])
      })
    });
    // console.log('這列有的數字',new_row)
    let checkRow = new_row.filter((item, idx) => {
      return item === e
    })

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
    } else {
      return false
    }
  }

  // 創建數獨
  async function create() {
    let new_arr = JSON.parse(JSON.stringify(blank_arr))
    // console.log('new_arr', new_arr)

    // let randomNub = 1 + (Math.floor(Math.random() * 10));
    // console.log('randomNub', randomNub)
    new_arr[0] = randomArr()
    new_arr[4] = randomArr()
    new_arr[8] = randomArr()
    console.log('new_arr 1st =>', new_arr)
    setSuduku(new_arr)
    await new_arr.forEach((i, iIndex) => {
      if (iIndex === 0 || iIndex === 3 || iIndex ===6) {
        return
      }
      // 大規則

      // 列判斷
      let used_data = []
      
      i.forEach((j,jIndex) => {
        let this_row_area;
        switch (iIndex) {
          case 0:
          case 1:
          case 2:
            this_row_area = [0, 1, 2]
            break;
          case 3:
          case 4:
          case 5:
            this_row_area = [3, 4, 5]
            break;
          case 6:
          case 7:
          case 8:
            this_row_area = [6, 7, 8]
            break;
          default:
            break;
        }

        let this_row;
        switch (jIndex) {
          case 0:
          case 1:
          case 2:
            this_row = [0, 1, 2]
            break;
          case 3:
          case 4:
          case 5:
            this_row = [3, 4, 5]
            break;
          case 6:
          case 7:
          case 8:
            this_row = [6, 7, 8]
            break;
          default:
            break;
        }
        // console.log('this_row_area', this_row_area)
        // console.log('this_row', this_row)
        let new_suduku = new_arr || JSON.parse(JSON.stringify(soduku))
        let new_row = []
        // console.log('new_suduku', new_suduku)
        this_row_area.forEach(x => {
          this_row.forEach(y => {
            new_row.push(new_suduku[x][y])
          })
        });
        used_data = new_row

        console.log('目前有的數字',new_row);
      })

      let use_data = JSON.parse(JSON.stringify(basic_data)).filter(e=> {
        if(e !== 0) {
          return used_data.indexOf(e) === -1
        }
      })

      // let use_data = JSON.parse(JSON.stringify(basic_data))
      let a = use_data.length
      console.log('use_data', use_data,a);
      let temp
      let new_suduku = []

      while (a > 0) {
        let tmp_data = use_data
        // console.log('while tmp_data', tmp_data)
        // console.log('while a',a)
        let randomNub = (Math.floor(Math.random() * tmp_data.length) + 1);
        // console.log('while randomNub', randomNub)
        temp = tmp_data[randomNub - 1]
        // console.log('while temp', temp)
        // console.log('indeOf =>', tmp_data.indexOf(temp))
        tmp_data = JSON.parse(JSON.stringify(tmp_data.splice(tmp_data.indexOf(temp), 1)))
        // console.log('use_data end =>', tmp_data)

        let index = 9 - a
        new_suduku[index] = (temp)
        a--
      }
      console.log('new_suduku', new_suduku);

      
      // 大規則
      // new_arr[iIndex] = randomArr()
      console.log('new_arr end =>', new_arr)

      // setSuduku(new_arr)
    })
  }

  function randomArr() {
    let use_data = JSON.parse(JSON.stringify(basic_data))
    let a = use_data.length
    let temp
    let new_suduku = []

    while (a > 0) {
      let tmp_data = use_data
      // console.log('while tmp_data', tmp_data)
      // console.log('while a',a)
      let randomNub = (Math.floor(Math.random() * tmp_data.length) + 1);
      // console.log('while randomNub', randomNub)
      temp = tmp_data[randomNub - 1]
      // console.log('while temp', temp)
      // console.log('indeOf =>', tmp_data.indexOf(temp))
      tmp_data = JSON.parse(JSON.stringify(tmp_data.splice(tmp_data.indexOf(temp), 1)))
      // console.log('use_data end =>', tmp_data)

      let index = 9 - a
      new_suduku[index] = (temp)
      a--
    }
    // console.log('new_suduku',new_suduku)

    return new_suduku
  }

  function reset() {
    setSuduku(blank_arr)
  }

  const classes = useStyles();

  return (
    <div className="App">
      <main className="App-main">
        <ul className="sd">
          {renderLi()}
        </ul>

        <div className={classes.root}>
          <Button variant="contained" size="small" onClick={() => { create() }}>
            重新生產
          </Button>
          <Button variant="contained" color="secondary" size="small" onClick={() => { reset() }}>
            清空
          </Button>
        </div>
      </main>
    </div>
  );
}

export default App;
