// starter code: example of numbers and bet amounts
const MIN_NUMBER = 1               
const MAX_NUMBER = 10              
const BET_AMOUNTS = [0,1,5,10,20]
const WINNING_NUMBERS = [1,2,3]        

// initial value of the jackpot
let JACKPOT = 0                 
let selectedNumbers = []
let selectedAmt = 0
let purchasedTicketsList = []
const CheckResult = ()=>{
    if(purchasedTicketsList.length>0){
        let mostRecentTicket = purchasedTicketsList[purchasedTicketsList.length-1]
        let youWon = false

        let arr1 = mostRecentTicket.ticketSelectedNo
        let arr2 = WINNING_NUMBERS

        
        let exist = [false, false, false]
        for(let j=0; j<3;j++){
            let n = arr1[j]
            for(let k=0; k<3;k++){
                if(n === arr2[k]){
                    exist[j] = true;
                    break;
                }
            }    
        }

        if(exist[0] && exist[1] && exist[2]){
            youWon = true
        }
        document.getElementById('winning-number').innerHTML = `${WINNING_NUMBERS}`
        if(youWon){
            alert('You WON $'+JACKPOT)
        }else{
            alert('YOU LOSS')
        }
        resetAll() 
    }
}

const validToBuyTicket =()=>{
    if(selectedAmt>0 && selectedNumbers.length===3){
        document.getElementById('btn-buy-ticket').classList.remove('inactive')
        document.getElementById('btn-buy-ticket').disabled = false
    }else{
        document.getElementById('btn-buy-ticket').classList.add('inactive')
        document.getElementById('btn-buy-ticket').disabled = true
    }
}
const resetAll=()=>{
    reset()
    JACKPOT = 0
    document.getElementById('jackpot').innerHTML = JACKPOT
    purchasedTicketsList = []
    const ticketContainer = document.getElementById('purchased-tickets-container')
    ticketContainer.innerHTML = ''
}
const reset=()=>{
    //reset selectedNumber, selectedAmt, disabled buttons
    selectedNumbers = []
    selectedAmt = 0
    let totalBetAmt =  document.getElementById('total-amt')
    totalBetAmt.innerHTML = selectedAmt
    let numberButtons = document.querySelectorAll('.noBtn')
    for(let i=0; i<numberButtons.length; i++){
        numberButtons[i].disabled = false;
    }
    
    validToBuyTicket()
}
const checkValidTicket=()=>{
    if(purchasedTicketsList.length===0){ return true; }
    for(let i=0; i<purchasedTicketsList.length; i++){
        let ticket = purchasedTicketsList[i]
        let arr1 = selectedNumbers
        let arr2 = ticket.ticketSelectedNo

        
        let exist = [false, false, false]
        for(let j=0; j<3;j++){
            let n = arr1[j]
            for(let k=0; k<3;k++){
                if(n === arr2[k]){
                    exist[j] = true;
                    break;
                }
            }    
        }

        if(exist[0] && exist[1] && exist[2]){
            return false
        }
    }
    return true;
}
const updateBetAmount = ()=>{
    let tempAmount = event.target.value
    let amount = parseInt(tempAmount.substring(1))
    if(amount === 0){
        selectedAmt = 0
    }else{
        selectedAmt += amount
    }
    //update total bet amount
    let totalBetAmt =  document.getElementById('total-amt')
    totalBetAmt.innerHTML = selectedAmt
    validToBuyTicket()
}
const updateBetNumbers = ()=>{
    const currBtn = event.target
    let val = currBtn.value
    if(selectedNumbers.length<3){
        selectedNumbers.push(parseInt(val))
        currBtn.disabled = true
        console.log(selectedNumbers);
    }
    validToBuyTicket()
}
const updateTicketList = ()=>{
   
    if(checkValidTicket()){
        purchasedTicketsList.push(
            {
                ticketNo: purchasedTicketsList.length+1,
                ticketSelectedNo : selectedNumbers,
                ticketBetAmount : selectedAmt
            })
            console.log('here',purchasedTicketsList);
        //ticket list update
        const ticketContainer = document.getElementById('purchased-tickets-container')
        ticketContainer.innerHTML = ''
        for(let i=0; i<purchasedTicketsList.length; i++){
            let ticket = purchasedTicketsList[i]
            let  ticketDiv  = document.createElement('div')
            ticketDiv.classList.add('ticket')
            ticketDiv.innerHTML = `<h4>Ticket#${ticket.ticketNo}</h4>
            <p>Selected Number:${ticket.ticketSelectedNo}</p>`
            ticketContainer.appendChild(ticketDiv)
        }

    //update jackpot
    JACKPOT = 0
    for(let i=0; i<purchasedTicketsList.length; i++){
        let ticket = purchasedTicketsList[i]
        JACKPOT += ticket.ticketBetAmount
    }
    document.getElementById('jackpot').innerHTML = JACKPOT

    }else{
        alert('These selected numbers already taken!')
    }

    reset()   
}

const pageLoaded = () => {
    console.log("page loaded")
    // populate the UI with the bet amounts    
    let betAmountContainer = document.getElementById('bet-amounts-container')
    for(let i=0; i<BET_AMOUNTS.length; i++){
        let input  = document.createElement('input')
        input.type = 'button'
        input.value = `$${BET_AMOUNTS[i]}`
        input.classList.add('betAmountBtn')
        betAmountContainer.appendChild(input)
    }

    let betButtons = document.querySelectorAll('.betAmountBtn')
    for(let i=0; i<betButtons.length; i++){
        betButtons[i].addEventListener('click', updateBetAmount)
    }
      
    // populate the UI with the number choices
    let numContainer =  document.getElementById('numbers-container')

    for(let i=MIN_NUMBER; i<MAX_NUMBER; i++){
        let input  = document.createElement('input')
        input.type = 'button'
        input.value = i
        input.classList.add('noBtn')
        numContainer.appendChild(input)
    }   
    let numberButtons = document.querySelectorAll('.noBtn')
    for(let i=0; i<numberButtons.length; i++){
        numberButtons[i].addEventListener('click', updateBetNumbers)
    }

    //Buy Ticket handling

    const buyTicketBtn =  document.getElementById('btn-buy-ticket')
    buyTicketBtn.addEventListener('click',updateTicketList)


    //Checking Winner

    const checkWinnerBtn = document.getElementById('btn-check-winner')
    checkWinnerBtn.addEventListener('click',CheckResult)

}



// ------------
// event listeners
// ------------
document.addEventListener("DOMContentLoaded", pageLoaded)   

