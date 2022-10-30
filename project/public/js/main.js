const submitBtn = document.getElementById('submitBtn');
const cityName = document.getElementById('cityName');

const city_name = document.getElementById('city_name');
const temp_status = document.getElementById('temp_status');
const temp_real_val = document.getElementById('temp_real_val');

const datahide = document.querySelector('.middle_layer');
const day = document.getElementById('day');

const getInfo = async(event)=>{
    event.preventDefault();
    let cityVal = cityName.value;
    
    if(cityVal === ""){
      city_name.innerText = `Please write the name before search`;
    
      datahide.classList.add("data_hide");
    }else{
         try{
             let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=ea911b3d0e75bd6eec06693d2f0b8b66`;
             const response = await fetch(url);
             const data = await response.json();
             const arrData = [data];
             
             city_name.innerText =`${ arrData[0].name},${ arrData[0].sys.country}`;
             temp_real_val.innerText = arrData[0].main.temp;
             const tempMood = arrData[0].weather[0].main;
      

              //condition to check sunny or cloudy
            if (tempMood == "Clear") {
              temp_status.innerHTML =
                  "<i class='fas  fa-sun' style='color: #eccc68;'></i>";
              } else if (tempMood == "Clouds") {
              temp_status.innerHTML =
                  "<i class='fas  fa-cloud' style='color: #f1f2f6;'></i>";
              } else if (tempMood == "Rain") {
              temp_status.innerHTML =
                  "<i class='fas  fa-cloud-rain' style='color: #a4b0be;'></i>";
              } else {
              temp_status.innerHTML =
                  "<i class='fas  fa-sun' style='color:#eccc68;'></i>";
  
              }

              const getCurrentDay=()=>{
                let weekday = new Array(7);
                weekday[0] = 'Sunday';
                weekday[1] = 'Monday';
                weekday[2] = 'Tuesday';
                weekday[3] = 'Wednesday';
                weekday[4] = 'Thursday';
                weekday[5] = 'Friday';
                weekday[6] = 'Saturday';

                let currentTime = new Date();
                let days = weekday[currentTime.getDay()];

                day.innerText = days;

              };

              const getCuurentTime = ()=>{
                var months=[
                    'Jan',
                    'Feb',
                    'Mar',
                    'Apr',
                    'May',
                    'Jun',
                    'Jul',
                    'Aug',
                    'Sep',
                    'Oct',
                    'Nov',
                    'Dec'
                ];

                var now = new Date();
                var hours = now.getHours();
                var mins = now.getMinutes();

                var months = months[now.getMonth()+1];
                var date = now.getDate();

                var period='am';
                if(hours >11){
                    period = 'pm';
                    if(hours>12) hours -= 12;
                }
                if(mins <10){
                    mins = '0' + mins;
                }

                return `${months} ${date}`;
              }

              datahide.classList.remove('data_hide');
              cityVal = "";
             
             
      
      
            }catch{
                cityVal = " ";
                datahide.classList.add("data_hide");
            city_name.innerText = `Please write the name before search`;
            console.log('please add the proper city name');
        }
    }
}

submitBtn.addEventListener('click',getInfo);