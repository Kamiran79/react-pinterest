import boardData from './boardsData';
import pinData from './pinsData';

const totallyRemoveBoard = (boardId) => new Promise((resolve, reject) => {
  boardData.deleteBoard(boardId)
    .then(() => {
      pinData.getPinsByBoardId(boardId).then((pins) => {
        pins.forEach((pin) => {
          pinData.deletePin(pin.id);
        });
        resolve();
      });
    })
    .catch((err) => reject(err));
});

export default { totallyRemoveBoard };
