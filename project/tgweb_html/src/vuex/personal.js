const state = {
    gameActive: 0,
    balance:localStorage.userinfo && JSON.parse(localStorage.userinfo).balance
}

const datas = {
    state,
    mutations: {
        reselutGame(state, num) {
            state.gameActive = num;
        }
    }
}


export default datas;
