import {api} from '../consts.js';

function setChange(userId, premiumId){
    const change_btn = document.getElementById('change')
    let formData = new FormData()
    formData.append('userId', userId)
    formData.append('premiumId', premiumId)
    document.addEventListener("click", function (){
        fetch(`${api}/profile/changePremium`, {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(console.log
            )
            .catch(console.log)
        window.location.href = 'Plans'
    })
}

function getPremium(premiumId){
    
    fetch(`${api}/profile/premiums`)
        .then(response => response.json())
        .then(data => {
            data.map(plan =>{
                if(plan["id"] == premiumId){
                    document.querySelector("#new-plan")
                        .appendChild(new PlanCard(plan["id"], plan["name"], plan["description"], plan["userCount"], plan["price"], true)
                            .render())
                }
            })
        })
}

function onLoad(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const premiumId = urlParams.get('planId')
    fetch(api + "/auth/validate_token", {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${getToken()}`
        }
    })
        .then(response => response.json())
        .then(data =>{
        getPremium(premiumId)
        console.log(data["id"])
        setChange(data["id"], premiumId)
    })
    
}
$( document ).ready(onLoad)