import {api} from '../consts.js';

const Countries = {0: "Russia", 1:"Ukraine", 2:"USA", 3:"Greece"}
const Months = {
    1:"January", 2:"February", 3:"March", 4:"April",
    5:"May", 6:"June", 7:"June", 8:"August", 9:"September",
    10:"October", 11:"November", 12:"December",}

const setDate = function (date) {
    let parsedDate = date.split('-')
    return Months[parsedDate[1].replace('0','')] + ' ' + + parsedDate[2] + ', ' + parsedDate[0]
}

function getProfile(userId){
    let username = document.getElementById("username")
    let email = document.getElementById("email")
    let birthdate = document.getElementById("birthdate")
    let country = document.getElementById("country")
    fetch(`${api}/profile/getProfile?userId=${userId}`, {
        headers : {
            'Authorization': `Bearer ${getToken()}`
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            username.innerText = data["username"]
            email.innerText = data["email"]
            birthdate.innerText = setDate(data["birthday"])
            country.innerText = Countries[data["country"]]
        })
        .catch(console.log)
}

function getPremium(userId){
    fetch(`${api}/profile/user_premium/${userId}`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            return data
        })
        .catch(console.log)
    return null
}

function onLoad(){
    fetch(api + "/auth/validate_token", {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${getToken()}`
        }
    }).then(response => response.json()).then(data => {
        getProfile(data["id"])
        let premium = getPremium(data["id"])
        if(premium != null){
            document.querySelector("#plan")
                .appendChild(new PlanCard(data["name"], data["description"], data["userCount"], data["price"], true)
                    .render())
        }
        else
            document.querySelector("#plan")
                .appendChild(new PlanCard("Free", "Free Spotify" , 1, 0, true)
                    .render())
                
    })
    
}

$( document ).ready(onLoad)
$(".overview").click(function (){
    $( document ).ajaxStop(onLoad);
});