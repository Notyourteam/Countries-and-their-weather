const url = "https://restcountries.com/v2/all"
let getdata = (url) =>{
    fetch(url)
    .then((data)=>data.json())
    .then((response)=>{renderfunc(response)})
}
getdata(url)
let renderfunc = (dataGlobal)=>{

    var Cname = dataGlobal.map(d => {
        return {
          "name": d.name,
          "img": d.flags.png,
          "cap": d.capital
        }
      })


    console.log(Cname)
      let user_input = [
        {CountryName:"", Flag:"",Weather:""},
      ];

      // create the table head

      function table_head(table, data) {
        let thead = table.createTHead();
        let row = thead.insertRow();
        for (let key of data) {
          let th = document.createElement("th");
          let text = document.createTextNode(key);
          th.appendChild(text);
          row.appendChild(th);
        }
      }

      // function to create the table

      function create_table(table, data) {
        for (let element of data) {
          let row = table.insertRow();
          for (key in element) {
            if(key=="name")
            {
                let cell = row.insertCell();
                let text = document.createTextNode(element[key]);
                cell.appendChild(text);
            }
            else if(key=="img"){
                let cell = row.insertCell();
                const img = document.createElement("img");
                img.src = element[key];
                cell.appendChild(img);
            }
            else{
                let cell2 = row.insertCell();
                let div = document.createElement("div");
                let button = document.createElement("BUTTON");
                let text = document.createTextNode("Button");
                button.appendChild(text);
                //function to check for weather
                button.className = "btn btn-light"
                button.addEventListener('click', async function handleClick(event) {
                    button.style.visibility = "hidden"
                    const url2 = `https://api.openweathermap.org/data/2.5/weather?q=${element[key]}&appid=7ae326a7b1cfa067b29e76c1850b3397`
                    fetch(url2)
                    .then((data)=>data.json())
                    .then((response)=>{
                        let txt = document.createTextNode("sky: "+response.weather[0].main)
                        let txt2 = document.createTextNode(", feels like: "+Math.floor(parseInt(response.main.feels_like)-273.15)+"°C")
                        console.log(response)
                        div.appendChild(txt)
                        div.appendChild(txt2)
                        var iconID = response.weather[0].icon
                        var iconurl = `http://openweathermap.org/img/wn/${iconID}@2x.png`
                        var icon = document.createElement("img");
                        icon.src = iconurl
                        div.appendChild(icon)
                    })
                    .catch(()=>{
                      let txt = document.createTextNode("not found")
                      div.appendChild(txt)
                    })
                  });
                div.appendChild(button)
                div.setAttribute('id',`${element[key]}`)
                cell2.appendChild(div);
            }
          }
        }
      }

      let table = document.querySelector("table");
      let data = Object.keys(user_input[0]);
      table_head(table, data);
      create_table(table, Cname);

}