
// acctive button





// this is load data form api 

const load_data =(data,s)=>{
    if(s=="sort")
    {
        fetch(`https://openapi.programming-hero.com/api/videos/category/${data}`)
    .then(response => response.json())
    .then(data => {
        data.data.sort((a, b) => {
            let viewa = parseInt(a.others.views);
            let viewb = parseInt(b.others.views);
            return viewb - viewa;
        });
        display_all_data(data.data);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
        
    } 
    else
    {
        try{
            fetch(`https://openapi.programming-hero.com/api/videos/category/${data}`).then((response)=> response.json()).then((data)=>display_all_data(data.data));
        }
        catch{
            err=>{
                console.log(err);
            }
        }
    }  
};
const display_all_data=(data)=>{
    const all_data=data;
    console.log(all_data);
    console.log(all_data.length);
    const show_container=document.getElementById("show-container") 
    show_container.innerHTML="";
    if(all_data.length!=0)
    {
        all_data.forEach((video)=>{
            // console.log(video);
            // time set 
            const time =time_set(video.others.posted_date)
            // verified
            const val= verify(video.authors[0].verified)


            const card=document.createElement("div");
            card.classList.add("box");
            card.innerHTML=`
            <div class="banner d-flex align-items-end flex-column"style="background-image: url(${video.thumbnail});">
            <h6 class="mt-auto p-2">${time}</h6>  
            </div>
            <div class="d-flex  justify-content-center p-1">
            <img class="profile-img" src="${video.authors[0].profile_picture}" alt="picture">
            <div>
                <p style="text-align: center;"> <b>${video.title}</b></p>
                <div class="d-flex">
                    <h6 style="margin-right: 10px;">${video.authors[0].profile_name}</h6>
                    <i class="fa-solid fa-certificate" ${val}"></i>
                </div>
                <div class="d-flex">
                    <h6>${video.others.views}</h6>
                </div>
            </div>
           </div>
            `;
            show_container.appendChild(card);
        });
         
    }
    else
    {
        const card =document.createElement("div");
        card.innerHTML=`
        <div class="text-center p-5">
        <img src="./image/Icon.png" alt="">
        <h1><b> Oops!! Sorry, There is no
            content here</b></h1>
         </div>
        `;
        show_container.appendChild(card);     
    }
};
// calculate hour and time 

function time_set(second){
    if(second==0)
    {
        return "";
    }
    else
    {
       let secon =parseInt(second);
       let hours = Math.floor(secon / 3600);
       let rs = secon % 3600;
       let minutes = Math.floor(rs / 60);
       let s = rs%60;
       if(hours>0)
       {
        return hours+":"+minutes+":"+s;
       }
       else
        {
          return minutes+":"+s;
        }
    }
}


// verified account

function verify(val)
{
    if(val == true)
    {
        return 'style="color: #3ec7fb;"';
    }
    else
    {
        return 'style="color: #202124;"';
    }
}






