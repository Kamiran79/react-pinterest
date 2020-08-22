import boardData from './boardsData';
import pinData from './pinsData';

const totallyRemoveBoard = (boardId) => new Promise((resolve, reject) => {
  console.warn('remove start ', boardId);
  boardData.deleteBoard(boardId)
    .then(() => {
      // get all mycoMushrooms with mushroomId
      pinData.getPinsByBoardId(boardId).then((pins) => {
        pins.forEach((pin) => {
          pinData.deletePin(pin.id);
        });
        resolve();
      });
      // delete each of tho mycoMushrooms
    })
    .catch((err) => reject(err));
});

export default { totallyRemoveBoard };
