import socketClient from 'socket.io-client';
import { updateGames } from '../store/gamesReducer';
import { updateGame } from '../store/gameReducer';
import { updateAction } from '../store/actionsReducer';
import { updateAttacker } from '../store/attackerReducer';
import { updateVariables } from '../store/variableReducer';
import { updateAttackerGlobal } from '../store/attackerGlobalReducer';
import { updateBlocker } from '../store/blockerReducer';
import { updateDescart } from '../store/descartCardReducer';
import { updateResult } from '../store/resultReducer';

let socket;

// const SERVER = 'http://localhost:5000'
const SERVER = 'https://coup-server-hls8.onrender.com'


export const init = (dispatch) => {
    socket = socketClient(SERVER);
    
    socket.on('gameCreated', (data) => {
        dispatch(updateGames(data));
    });

    // emitGetGame
    socket.on('getGame', (data) => {
        let dataGame = data;
        const myUser = data?.gamer.filter(
            (g) => g.connectionId === socket.id
        );
        const otherUsers = data?.gamer.filter(
            (g) => g.connectionId !== socket.id
        );
        
        dataGame.gamer = otherUsers
        dataGame.myUser = myUser[0]

        dispatch(updateGame(dataGame));

        dispatch(updateAction());
    });

    socket.on('attacked', (data) => {
        dispatch(updateAttacker(data));
    });
    
    socket.on('coup', (data) => {
        //dispatch(updateCoup(data));
        dispatch(updateVariables({ action: 'coup', attackedBy: data.attackedBy }));
    });

    socket.on('attackedGlobal', (data) => {
        dispatch(updateAttackerGlobal(data));
    });

    socket.on('blocked', (data) => {
        dispatch(updateBlocker(data));
        dispatch(updateAction());
    });

    socket.on('lostCard', () => {
        dispatch(updateVariables({ action: 'lostCard' }));
    });
    
    socket.on('descartOneCard', (data) => {
        dispatch(updateDescart(data));
    });

    socket.on('lostGame', (data) => {
        dispatch(updateResult('lost'));
    });

    socket.on('win', (data) => {
        dispatch(updateResult('win'));
    });

    socket.on('actionOtherUser', (data) => {
        dispatch(updateAction({ msg: data }));
    });
    
}

export const emitOpenGame = (username, idGame) => {
    socket.emit('createGame', { username: username, idGame });
}

export const emitDeleteGame = (username, idGame) => {
    socket.emit('deleteGame', { username, idGame });
}

export const emitGetGames = () => {
    socket.emit('getGames');
}

export const emitGetGame = (idGame, username) => {
    socket.emit('getGame', { idGame, username });
}

export const emitJoinGame = (username, idGame) => {
    socket.emit('joinGame', { username, idGame });
}

export const emitStartGame = (idGame) => {
    socket.emit('startGame', { idGame });
}

// FUNTIONS GAME
export const emitTakeMoney = (idGame, username) => {
    socket.emit('takeMoney', { idGame, username });
}

export const emitUseCard = (card, idGame, username, attacker) => {
    socket.emit('useCard', { card, idGame, username, attacker});
}
// Embajador y Duque
export const emitUseCardGlobal = (card, idGame, attacker) => {
    socket.emit('useCardGlobal', { card, idGame, attacker});
}
export const emitReturnCardAmbassador = (data) => {
    socket.emit('useReturnCardAmbassador',  data );
}


export const emitBlockCard = (card, idGame, attacker, blocker) => {
    socket.emit('blockCard', { card, idGame, attacker, blocker});
}
export const emitAllow = (idGame, attacked, attackedBy, card) => {
    socket.emit('allow', { idGame, attacked, attackedBy, card});
}

export const emitAllowBlock = (idGame, attacked, attackedBy, card) => {
    socket.emit('allowBlock', { idGame, attacked, attackedBy, card});
}
export const emitLostCard = (idGame, loser) => {
    socket.emit('lostCard', { idGame, loser});
}
export const emitLostCardSelected = (idGame, loser, card) => {
    socket.emit('lostCardSelected', { idGame, loser, card});
}

export const emitLostGame = (idGame, loser) => {
    socket.emit('endGame', { idGame, loser });
}
export const emitBlockAttackGlobal = (idGame) => {
    socket.emit('blockCardAttackGlobal', { idGame });
}

export const getSocket = () => {
    return socket.id
}
