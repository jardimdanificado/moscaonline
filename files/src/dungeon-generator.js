/**
* https://github.com/Em-Ant/dungeon-generator
* -----------------------------------------------
* DUNGEON MAP GENERATOR v0.1 by EmAnt - 2016
* -----------------------------------------------
* !! WARNING:
*   Development version.
*   NO INPUT DATA VALIDATION INCLUDED.
* -----------------------------------------------
*
* It adds a Global Object 'DungeonGenerator', which has a
* function memeber 'generate'.
*
* Usage:
*
* {Array[Array[{Object} Cell]]} floorMap =
*   DungeonGenerator.generate({Object} Config);
*
* @param {Object} Config - configuration object
*
* Config = {
*   rows: default 31 - better if odd,
*   cols: default 51 - better if odd,
*   minRoomSize: default 3 - odd only,
*   maxRoomSize: default 7 - odd only,
*   padding: map padding - default 2,
*   rooms: expected rooms - default 15
*   maxAttempts: max attempts placing rooms - default 500
* }
*
* @return {Array[Array[{Object} Cell]]} - Matrix of cell objects
*
* Cell = {
*   cellType : 'wall' or 'empty',
* }
*/

let DungeonGenerator = (function(){

  let MAXSIZE, MINSIZE, ROWS, COLS, BORDER,
      ATTEMPTS, WALL='W', EMPTY='E', ROOMS;

  function isNotOverlapping(floorMap, room) {
    let status = true;
    for (let i = room.row - 1; i < room.row + room.h + 1  ; i++ ) {
      for (let j = room.col-1; j < room.col + room.w +1; j++) {
        if (floorMap[i][j] !== WALL) {
            status = false;
            break;
        }
      }
    }
    return status;
  }

  function linkStraightH(floorMap, r1, r2){
    let inc = r1.col < r2.col ? 1 : -1;
    for (let i = r1.col; i !== r2.col; i+=inc) {
      floorMap[r1.row][i] = EMPTY;
    }
  };

  function linkStraightV(floorMap, r1, r2){
    let inc = r1.row < r2.row ? 1 : -1;
    for (let i = r1.row; i !== r2.row; i+=inc) {
      floorMap[i][r1.col] = EMPTY;
    }
  };

  function link2Steps(floorMap, r1, r2) {
    let flipCoin = Math.floor(Math.random()*2);
    // TOP LEFT
    if(r1.row > r2.row && r1.col > r2.col) {
      if (flipCoin) {
        // Vertical then horizontal hallway
        for (let i = r1.row-1; i >= r2.row + r2.h-1; i--)
          floorMap[i][r1.col] = EMPTY;
        for (let i = r1.col-1;  i >= r2.col + r2.w; i--)
          floorMap[r2.row+r2.h-1][i] = EMPTY;
      } else {
        // H First
        for (let i = r1.col-1; i >= r2.col + r2.w-1; i--)
          floorMap[r1.row][i] = EMPTY;
        for (let i = r1.row-1;  i >= r2.row + r2.h; i--)
          floorMap[i][r2.col+r2.w-1] = EMPTY;
      }
    // TOP RIGHT
    } else if(r1.row > r2.row && r1.col < r2.col) {
      if (flipCoin) {
        // V First
        for (let i = r1.row-1; i >= r2.row + r2.h-1; i--)
          floorMap[i][r1.col+r1.w-1] = EMPTY;
        for (let i = r1.col + r1.w;  i < r2.col; i++)
          floorMap[r2.row+r2.h-1][i] = EMPTY;
      } else {
        // H First
        for (let i = r1.col + r1.w; i <= r2.col; i++)
          floorMap[r1.row][i] = EMPTY;
        for (let i = r1.row-1;  i >= r2.row + r2.h; i--)
          floorMap[i][r2.col] = EMPTY;

      }
    } else {
      // r2 is not above r1
      return false;
    }
    return true;
  };

  function linkRooms(floorMap, r1, r2) {
    if (r1.row >= r2.row && r1.row < r2.row + r2.h) {
      linkStraightH(floorMap, r1, r2);
    } else if (r2.row >= r1.row && r2.row < r1.row + r1.h) {
      linkStraightH(floorMap, r2, r1);
    } else if (r1.col >= r2.col && r1.col < r2.col + r2.w) {
      linkStraightV(floorMap, r1, r2);
    } else if (r2.col >= r1.col && r2.col < r1.col + r1.w) {
      linkStraightV(floorMap, r2, r1);
    } else {
      if(!link2Steps(floorMap, r1, r2)) // if r2 is not on top
        link2Steps(floorMap, r2, r1);   // r1 is on top
    }
  }

  function randomEvenOdd (min, max) {
      if(max === min) return max;
      return min + Math.floor(Math.random()*Math.floor((max - min)/2 +1))*2;
  };

  function addRoom(floorMap) {
    let out = undefined;
    let h = randomEvenOdd(MINSIZE, MAXSIZE);
    let w = randomEvenOdd(MINSIZE, MAXSIZE);
    let room = {
      h: h,
      w: w,
      row: randomEvenOdd(0, ROWS-h-2*BORDER) + BORDER,
      col: randomEvenOdd(0, COLS-w-2*BORDER) + BORDER,
    };

    if (isNotOverlapping(floorMap, room)){
      for (let i = room.row; i < room.row + room.h; i++) {
        for (let j = room.col; j < room.col + room.w; j++) {
          floorMap[i][j] = EMPTY;
        }
      }
      out = room;
    }
    return out;
  };

  let DungeonGenerator = {
    generate: function(config) {

      let cfg = config ? config : {};

      ROWS = cfg.rows || 31;
      COLS = cfg.cols || 51;
      MAXSIZE = cfg.maxRoomSize || 7;
      MINSIZE= cfg.minRoomSize || 3;
      BORDER = cfg.padding || 2;
      ATTEMPTS = cfg.maxAttempts || 500;
      ROOMS = cfg.rooms || 15;

      let floorMap = [];
      for (let i = 0; i < ROWS; i++) {
        let r = [];
        for (let j = 0; j < COLS; j++) {
          r.push(WALL);
        }
        floorMap.push(r);
      }

      let roomsToLink = [];
      let roomsLinked = [];
      let i = 0;
      let r = 0;
      while (i < ATTEMPTS && r < ROOMS){
        let newRooom = addRoom(floorMap);
        if(newRooom) {
          roomsToLink.push(newRooom);
          r++;
        }
        i++;
      }

      function distance(a, b) {
        let d2 = (b.row-a.row)^2 + (b.col-a.col)^2;
        return Math.sqrt(d2);
      };

      roomsLinked.push(roomsToLink.pop());
      while(roomsToLink.length) {
        let r1 = roomsLinked[roomsLinked.length - 1];
        let r2 = roomsToLink.sort(function (a,b){
          if (distance(r1,a) < distance(r1,b)) return 1;
          if (distance(r1,a) > distance(r1,b)) return -1;
          return 0;
        }).pop();
        linkRooms(floorMap,r1,r2);
        roomsLinked.push(r2);
        r1 = r2;
      }
      return floorMap.map(function(row,i){
        return row.map(function(cell, j){
          return cell === WALL ? 1 : 0;
        })
      })
    }
  };
  return DungeonGenerator;
})();

export let generate = DungeonGenerator.generate
