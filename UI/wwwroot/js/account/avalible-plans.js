import {api} from '../consts.js';

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

function getAvailablePremiums(){
    fetch(`${api}/profile/premiums`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            data.map(plan =>{
                document.querySelector("#plans")
                    .appendChild(new PlanCard(plan["name"], plan["description"], plan["userCount"], plan["price"], false)
                        .render())
            })
        })
}


function onLoad(){
    fetch(api + "/auth/validate_token", {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${getToken()}`
        }
    }).then(response => response.json())
        .then(data =>{
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
    getAvailablePremiums()
}

$( document ).ready(onLoad)
/*
$(".plans").click(function (){
    $( document ).ajaxStop(onLoad);
});*/
