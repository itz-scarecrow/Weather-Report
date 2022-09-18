const arr = [];
var countryData = {};
fetch("https://restcountries.com/v2/all")
  .then((data) => data.json())
 .then((response) => {
    console.log(response);
    for(let i = 0; i < response.length; i++)
    {
      countryData = {
        capital: response[i].capital,
        countryName: response[i].name,
        flag: response[i].flags.png
      };
      arr[i] = (countryData);
      
    }
    });
  var head=document.createElement("div");
  head.className="navbar"
  var heading=document.createElement("h1");
  heading.innerHTML="Weather Report";
  head.appendChild(heading);
  document.body.appendChild(head);
  var mainDiv=document.createElement("div");
  mainDiv.className="grid-container"
  setTimeout(() => {
    for (let i = 0; i < arr.length; i++) {

        // main div tag

        var div = document.createElement("div");
        div.className = "card";

        //Image tag

        var img = document.createElement("img");
        img.className = "card-img-top";
        img.src = arr[i].flag;
        img.alt=" ";

        //div1 tag        

        var div1 = document.createElement("div");
        div1.className = "card-body";
        div1.id = "div1"+i;

        //h5, p, button tags

        var h5 = document.createElement("h5");
        var p = document.createElement("p");
        var btn = document.createElement("button");
        btn.className = "btn btn-primary";
        btn.id = "btn"+i;
        btn.type = "button";
        btn.innerHTML = "Check Weather";
        h5.className = "card-title";
        p.className = "card-text";
        p.innerHTML = `Country Name: ${arr[i].countryName}`;
        h5.innerHTML = `Capital: ${arr[i].capital ? arr[i].capital : "Data Not Available"}`;

        //Child appendings


        div1.appendChild(h5);
        div1.appendChild(p);
        div1.appendChild(btn);
        div.appendChild(img);
        div.appendChild(div1);
        mainDiv.appendChild(div);
        document.body.appendChild(mainDiv);

        //onClick function

        document.getElementById(btn.id).onclick = function(){var a = div.id;checkWeather("https://api.openweathermap.org/data/2.5/weather?q="+arr[i].capital+"&appid=5706167397bb7f1209b49a2cb30aa1df", this.id, i)};

    }
  }, 2000);

 // fetching weather details
  function checkWeather(url, id, i){
    fetch(url)
            .then((urlResponse) => urlResponse.json().then((res) => {
                document.getElementById(id).style.display = "none";
                // if we get response
                if(!res.message){
                    console.log(id);
                    var pW = document.createElement("p");
                    var pW1 = document.createElement("p");
                    var imgW = document.createElement("img");
                    var div2=document.createElement("div");
                    imgW.src = `http://openweathermap.org/img/wn/${res.weather[0].icon}@2x.png`;
                    imgW.className = "WImg";
                    pW.innerHTML = res.weather[0].main;
                    pW1.innerHTML = `Temperature: ${res.main.temp}`;
                    div2.className="adj";
                    div2.appendChild(pW);
                    div2.appendChild(imgW);
                    document.getElementById("div1"+i).appendChild(div2);
                    document.getElementById("div1"+i).appendChild(pW1);
                }
                // if we didn't get response
                else{
                    var pW = document.createElement("p");
                    pW.innerHTML = "Data Not Found";
                    document.getElementById("div1"+id.substr(3)).appendChild(pW);
                }
            })).catch((error) => {
              // handle the error
              console.log(error);
            });    
  }

