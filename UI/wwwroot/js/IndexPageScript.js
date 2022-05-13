let token = "eyJhbGciOiJSU0EtT0FFUCIsImVuYyI6IkEyNTZDQkMtSFM1MTIiLCJraWQiOiI1RkNFQzc5QzE1NDUzNUJGMUU3RkQ0NTYzRjU1RTU4MzdCQkZFNEEwIiwidHlwIjoiYXQrand0In0.ZqE5mPZFi8gJT9jy9wT882EOApAzK92mtb3mVKiEM5wEOJ6Pm1vHDV4wJG6wi0hnpEHH0NzseLqKXpVbZxpA3MP7ThhbZ8ZhQuaxQYz3VzH17_mnlsziXf8KZhSaRp_CxztgU7J188TT4881llDqFKOD4LonJQb47lR9IfwG4sHRCGDtIAoBkL2EQ_pwZkZ3QXV86eCanOruw-FO6AEdXJZj26ksUoSX6dPPChsgGqsJ8WrBwOU_mJD3-LoSPYI-ji8uDsUCZmzdBP55te5RQ2CGtBEjVvwXPqK3OxOHZgpdJuXppbOR9Qv_tavWFig2hBeNVshsRpQZlTsZWGGTNw.le2DgnL5soAukE84uUxoLg.ODTfb7HdMhbh_RA-d2ikPVF5QGG4KKJehp5dck9Lz-Bu8tJxvBLTIeimaCXYc_LqZW4Jwhj4bYUGTKyW6RSe6PFVE4U5_XXAIcKLjTz5VyaRV3bfcMEfn2SEx6_IH0wbsuLU7iPgY97nrCD8_IjfH76XsNzkaki919nOEInNvV0pi0-SmjyI5iHrIJiDzDOZkGKygdaEwKgP99mrCX24AUuQbgxoa7VhNN4Rs13U64j5NCbQdge9c3CEnJkYojr_4rzfY1juBMGxU54CiSb_GQDTwA4MjRWweaZR-h7Rtu0sqUoCSWrN2wg0DH5d_b3axyLGejCFw3r2va6no0EtoWC51ytjDkj1CDcbr-mdHztZc9SyIrmy0-2rSjLuPlI8NfTbrYLeRT3P5WMN02Qabj4L5Ng0yZRB-zZaiosWInjU0PTtdVqEiHZ3FgLiaOGT-YtV0J6FitiQJZURboVlpXSpu3yYgp2HYlqgPpb1nXc2YslFzmdutNGHMpzwGi2Wf2K4YlV1nnVfJ8trcu6hjTkhkII2tv8ws5Xek-NNFKMmyI7Oh01QeCTHYooiRpGwZMJWY_mA_yl26LWX87Pk57DnUlGsui8PeTFbYXbejiB1_g3JD7VmusvsYE7EMzEBYY82mbWyvhEpoEOdlIDBdBGl4S8ELSyIzuLsx-2FHTvfDgIA3IwinrdN8WbsmlSW2MWc1l6R3ak434Z5lRKJqagpCWuJGMQGE9Lh8PPeICxtD0MMvf4r08NvE-10D-kF9o4WDxJ6_NPPhCnUi058sKBkGnCNlklMAZw5cKiG4JBCQcCgE5PYJrOK77i4h_BN1amGkkU3J9f-9gLMT9yXWnzelVvJMVfNk1BtHHae4zFzOdptjBtPeUfmovGzx2grBHkK-9of8s1s2OgWIye2xcelQsI9bp2VIPEnT-xpWjrSBwBbZ4CDPhg-Rx1KS_9SVB_oA1ySzIfkcUO2PWpIS3VK1alsUPpjTAx-8GCEGFSzCM-bFW0X2XMHyXsJX2uwOTUSadGWNYyMNVtMfe5k61pSDTknOxSUt9Zo7dd0fqQ.8lcAXAsx1Nn0lsOFLtDs-EB3f0jlTYSF6P790V5RG84";
function load (){
    let container = document.querySelector("#content");
    fetch(apiHost + "/playlists/random?count=2",{
        method: "GET",
        headers : {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => response.json())
        .then((data) => {
            data.map((playlist) => {
                console.log(playlist);
                container
                    .appendChild(new PlaylistCard(playlist.ImgSrc, playlist.Title, playlist.PlaylistType, playlist.Id)
                        .render());

            });
        });
}
$(document).ready(load);
