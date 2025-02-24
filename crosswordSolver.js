function crosswordSolver(emptypuzll,words){
    if (check_empty_puzzle(emptypuzll)){
        return 'Error'
    }
   
    return "puzzle is safe"
}

function check_empty_puzzle(emptypuzll){
    let regex = /^[0-9.\n]+$/g
    return regex.test(emptypuzll) ? false : true
}

console.log(crosswordSolver("000021555.\n"))