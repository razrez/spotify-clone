import {api} from './consts.js';

export default async function getData(url) {
    try{
        return await fetch(`${api}/${url} `, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IkI3Mzc1RUNFMEU5MEZGODg0MDg0Q0UzNjk4QzlBMjFBRDJCQjkzQTgiLCJ4NXQiOiJ0emRlemc2UV80aEFoTTQybU1taUd0SzdrNmciLCJ0eXAiOiJhdCtqd3QifQ.eyJzdWIiOiI1ZjM0MTMwYy0yZWQ5LTRjODMtYTYwMC1lNDc0ZThmNDhiYWMiLCJuYW1lIjoidXNlcjAxQGdtYWlsLmNvbSIsImVtYWlsIjoidXNlcjAxQGdtYWlsLmNvbSIsInJvbGUiOiJVc2VyIiwib2lfYXVfaWQiOiI5YTM4MTBhNC01OWE3LTQwY2UtYjg1Zi1hZDNhZTU2NTlkZDQiLCJvaV90a25faWQiOiIzMTc1MDE2Ny0yOTAxLTQyZGItOWM0Yi0wMTczZDExOTQ3NjkiLCJzY29wZSI6Im9mZmxpbmVfYWNjZXNzIiwiZXhwIjoxNjU0MTAxMDM1LCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo3MDMwLyIsImlhdCI6MTY1NDA5NzQzNX0.Q-MywB9R9Bfjms4I8vQXaMRgVUitOtuH8WIpPDBRD-aTPk1O2vskhljyQ_9iC9HyxEhoqTFVzZMTunC8hdIxAC4D3FZYuPJpzpH7wQKxxlGuwGgesD3IUXGm9-NvqghOeSicpQRXnXTN2nfqjrXfpzdmym2jKbw4AA8Mxenl5hc0wkoWbGZaem_MpbyzT4N9URPQH2-RDxYEII1cPvFup20EU2-KeZxmVN3zSbnUdODRUXXabYorHktTtLLWqSdG3dg066Ogn7TM0Yzwz3e8VAhprcuO5N6sV59li0yVuh6CH-j4gztNcHtduTZ453QuvKzoiFGtsqd4iRT_Cp5XGA`
            }
        })
            .then(response => response.json())
            .then(res => res)
            .catch(console.log)
    }
    catch (e) {
        console.log(e)
    }
};