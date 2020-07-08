import React, { useState, useEffect } from 'react';
import { Input } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
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
  const [isLoading, setisLoading] = useState(true)
  // console.log('soduku', soduku)

  useEffect(() => {
    // 數獨Data發生改變時觸發
    // setisLoading(true)
    console.log('useEffect')
    // create()
    setisLoading(false)
    return () => {

    }
  }, [])

  // 填入數字
  function setNum(event) {
    // console.log('set', event.target.dataset.area)
    // console.log('value', event.target.value)
    let area = event.target.dataset.area
    let index = event.target.dataset.index
    let new_suduku = JSON.parse(JSON.stringify(soduku))

    if (event.target.value.length > 1) {
      if (event.target.value[0] === 0) {
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
  function create() {
    
    clean()
    let new_arr = JSON.parse(JSON.stringify(blank_arr))

    new_arr[0] = randomArr()
    new_arr[4] = randomArr()
    new_arr[8] = randomArr()
    setSuduku(new_arr)
    loopArr(new_arr, 1)
  }

  function loopArr(new_arr, this_area) {
    console.log('開始loop的區域=>', this_area)
    for (let iIndex = this_area; iIndex < new_arr.length; iIndex++) {
      
      let i = new_arr[iIndex]
      if (iIndex === 0 || iIndex === 4 || iIndex === 8) {
        continue
        // 排除固定區域
      } else {
        console.log(`====目前是第 ${iIndex} 區====`)
        // 放入loop出來的數字
        new_arr = loopNum(i, iIndex, new_arr)
        // 寫入 new_arr
        // new_arr = temp_calcArr

        // 正式寫入
        setSuduku(new_arr)
      }
    }
  }

  function loopNum(i, iIndex, new_arr) {
    let rowGroup_arr = rowGroup(i, iIndex, new_arr)
    let colGroup_arr = colGroup(i, iIndex, new_arr)
    // console.log('目前列row有的數字',rowGroup(i, iIndex, new_arr))
    // console.log('目前行col有的數字',colGroup(i, iIndex, new_arr))

    let calcArr = new_arr
    // console.log('calcArr', calcArr)

    // 循環填入9宮格
    for (let j = 0; j < 9; j++) {
      // console.log('calcArr[iIndex][j]', calcArr[iIndex][j])
      if (calcArr[iIndex][j] === 0) {
        let used_num = [...(new Set([...rowGroup_arr[j], ...colGroup_arr[j], ...i]))]
        // console.log(`${iIndex}區域${j}位置已使用的數字集合`,used_num);


        let use_num = JSON.parse(JSON.stringify(basic_data)).filter(e => {
          return used_num.indexOf(e) === -1
        })
        console.log(`${iIndex}-${j}位置可使用的數字集合`, use_num);

        // 如果可以用的數字為0，則3組數字重填
        if (use_num.length === 0) {
          // if (j % 3 === 0) {
          //   j = j
          // } else if (j % 3 === 1) {
          //   j = Math.floor(j / 3) - 1
          // }
          console.log('重填=>', iIndex)
          // 重填整個區塊
          // calcArr[iIndex] = [0, 0, 0, 0, 0, 0, 0, 0, 0]
          // calcArr[iIndex] = [0, 0, 0, 0, 0, 0, 0, 0, 0]
          // // loopNum(calcArr[iIndex], iIndex, calcArr)
          // loopArr(calcArr, iIndex-1)
          // break
          // 如果這個array完全沒數字可填則，loopArr上一個
          // if (j === 0) {
          let reset = iIndex - 1
          if (reset === 4) {
            // 排除固定區域
            reset = iIndex - 2
          } else if (reset === 0) {
            reset = 1
          }
          calcArr[reset] = [0, 0, 0, 0, 0, 0, 0, 0, 0]
          calcArr[iIndex] = [0, 0, 0, 0, 0, 0, 0, 0, 0]
          loopArr(calcArr, reset)
          break
          // calcArr[reset] = [0, 0, 0, 0, 0, 0, 0, 0, 0]
          // calcArr[iIndex] = [0, 0, 0, 0, 0, 0, 0, 0, 0]
          // loopNum(i, reset, calcArr)
          // break
          // } else {
          //   calcArr[iIndex] = [0, 0, 0, 0, 0, 0, 0, 0, 0]
          //   loopNum(i, iIndex, calcArr)
          //   break
          // }
        }

        // 隨機取得一個數字
        let randomNub = (Math.floor(Math.random() * (use_num.length)));
        // console.log('randomNub', randomNub, use_num[randomNub])

        // 通過驗證則寫入 calcArr
        if (!checkNumError(i, iIndex, use_num[randomNub], j, calcArr)) {
          // 通過驗證則寫入 calcArr
          calcArr[iIndex][j] = use_num[randomNub]
          console.log('填入', calcArr[iIndex][j])
        } else {
          // 驗證失敗 重新loopNum
          loopNum(i, iIndex, new_arr)
          break
        }
        console.log('最後結果calcArr', calcArr);
      }
    }

    return calcArr
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
    console.log('reset')
    setSuduku(blank_arr)
    // await create()
    setisLoading(true)
    create()
    setisLoading(false)
  }

  function clean() {
    console.log('clean')
    setSuduku(blank_arr)
  }


  function rowGroup(i, iIndex, new_arr) {
    let rowGroup = []
    i.forEach((j, jIndex) => {
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
      let new_suduku = new_arr || JSON.parse(JSON.stringify(soduku))
      let new_row = []
      // console.log('new_suduku', new_suduku)
      this_row_area.forEach(x => {
        this_row.forEach(y => {
          new_row.push(new_suduku[x][y])
        })
      });
      // console.log('this_row_area', this_row_area);
      // console.log('new_row', new_row);

      rowGroup.push(new_row)
    })
    return rowGroup
  }

  function colGroup(i, iIndex, new_arr) {
    let colGroup = []
    i.forEach((j, jIndex) => {
      let this_col_area;
      switch (iIndex) {
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
      switch (jIndex) {
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
      let new_suduku = new_arr || JSON.parse(JSON.stringify(soduku))
      let new_col = []
      // console.log('new_suduku', new_suduku)
      this_col_area.forEach(x => {
        this_col.forEach(y => {
          new_col.push(new_suduku[x][y])
        })
      });
      // console.log('this_col_area', this_col_area);
      // console.log('new_col', new_col);
      colGroup.push(new_col)

    })
    return colGroup
  }

  const classes = useStyles();

  return (
    <div className="App">
      <main className="App-main">
        {/* <div className="loading_block"><CircularProgress color="secondary" /></div> */}
        {
          isLoading
            ? <div className="loading_block"><CircularProgress color="secondary" /></div>
            : <ul className="sd">
                {
                soduku.map((area, areaindex) => 
                      <li key={areaindex}>
                        {
                          area.map((item, itemIndex) => 
                            <Input key={`${areaindex}-${itemIndex}`} color="secondary" type="number" onChange={setNum} inputProps={{ min: 1, max: 9, maxLength: 1, 'data-area': areaindex, 'data-index': itemIndex }} value={item || ''} error={checkNumError(area, areaindex, item, itemIndex)} />
                          )
                        }  
                      </li>
                  )
                }
              </ul>
        }
        <div className={classes.root}>
          <Button variant="contained" size="small" onClick={() => { reset() }}>
            重新生產
          </Button>
          <Button variant="contained" color="secondary" size="small" onClick={() => { clean() }}>
            清空
          </Button>
        </div>
      </main>
    </div>
  );
}

export default App;
