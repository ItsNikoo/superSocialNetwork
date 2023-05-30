let mainpage = document.querySelector('.news');

let route = `D:/Sites/PORTFOLIO/twitter`;

let api = new API();

let messager = document.querySelector('.event-title-messager');
let register_button = document.querySelector('.register-button');
let register_label = document.querySelector('.register-login');
let register_password_label = document.querySelector('.register-password');
let out = document.querySelector('.outlog-button');
let available = document.querySelector('.available');
let profile = document.querySelector('.profile-image');
let mypage_button = document.querySelector('#mypage');
let news_button = document.querySelector('#news');
let profile_followers = document.querySelector('#profile-followers');
localStorage.setItem('accessGranted',false);


let USERNAME = 'niko';
let PASSWORD = '1234';

async function renderNews(){
    let data = await api.loadProducts();
    register();
    outlog();
    if(data[0].isdeveloper){
        profile.src = data[0].image;
        for(let i = 1; i < data.length;i++){
            let node = document.createElement(`div`);
            node.classList.add("post");
            if(data[i].liked){
                node.innerHTML += `                    
                    <div class="username">
                            <div class="name">
                                ${data[i].user}
                            </div>
                            <div class="verify">
                                <img class="verify-image" src="verify.png" alt="">
                            </div>
                            <div class="surname">
                                @${data[i].username}
                                </div>
                        </div>
                                <div class="text">
                                    ${data[i].text}
                                </div>
                                <div class="statistics">
                                    <div class="stat">
                                        <button class = "test" href="">
                                            <img class="stat-image-like " src="like-active.png" alt="">
                                        </button>
                                        <p class="stat-text">${data[i].likes}</p>
                                    </div>

                                    <div class="stat">
                                       <button class="test">
                                           <img class="stat-image" src="comm.png" alt="">
                                       </button>
                                        <p class="stat-text">0</p>
                                    </div>

                                    <div class="stat">
                                       <img class="stat-image" src="shown.png" alt="">
                                        <p class="stat-text">${data[i].shown}</p>
                                    </div>
                                </div>` 
            }
            else{
                node.innerHTML += `                    
                    <div class="username">
                            <div class="name">
                                ${data[i].user}
                            </div>
                            <div class="verify">
                                <img class="verify-image" src="verify.png" alt="">
                            </div>
                            <div class="surname">
                                @${data[i].username}
                                </div>
                        </div>
                                <div class="text">
                                    ${data[i].text}
                                </div>
                                <div class="statistics">
                                    <div class="stat">
                                        <button class = "test" href="">
                                            <img class="stat-image-like " src="like.png" alt="">
                                        </button>
                                        <p class="stat-text">${data[i].likes}</p>
                                    </div>

                                    <div class="stat">
                                       <button class="test">
                                           <img class="stat-image" src="comm.png" alt="">
                                       </button>
                                        <p class="stat-text">0</p>
                                    </div>

                                    <div class="stat">
                                       <img class="stat-image" src="shown.png" alt="">
                                        <p class="stat-text">${data[i].shown}</p>
                                    </div>
                                </div>` 
            }
            let like = node.querySelector('.stat-image-like');
            let likelabel = node.querySelector('.stat-text');

            like.addEventListener('click',async function() {
                await api.likeMessage(data[i].id, !data[i].liked);
                if(data[i].liked == false){
                    like.src = "like-active.png";
                    data[i].likes++;
                    likelabel.innerHTML = data[i].likes;
                    data[i].liked = true;
                    await api.PostLikes(i,data[i].likes);
                    
                }
                else{
                    like.src = "like.png";
                    data[i].likes--;
                    likelabel.innerHTML = data[i].likes;
                    data[i].liked = false;
                    await api.PostLikes(i,data[i].likes);
                }
            });
            mainpage.insertBefore(node,mainpage.firstChild);
        }
        mypage_button.addEventListener('click',async function(){
                renderProfile();
             });            
            news_button.addEventListener('click', async function(){
                location.reload();
            });
        available.classList.add("nott");
    console.log(data[0].isdeveloper);
    }
    else{
        mainpage.classList.add("not");
    }
};    
        
async function renderProfile(){
    let data = await api.loadProducts();
                mainpage.innerHTML = '';
                let page = document.createElement(`div`);
                page.classList.add("profile-page");
                 page.innerHTML = `
                   <div class="first-panel">
                    <div class="profile-general">
                        <div class="profile-name">
                        ${data[0].user}
                    <img class="verify-image-profile" src="verify.png" alt="">
                    </div>
                    <div class="profile-username">
                        @${data[0].username}
                    </div>
                    <div class="profile-stats">
                        <div id='profile-followers' class="profilestats profile-followers">
                            подписчиков:${data[0].followers}
                        </div>
                        <div class="profilestats profile-likes">
                            лайков:${data[0].likes}
                        </div>
                        <div class="profilestats profile-shown">
                            просмотров:${data[0].shown}
                        </div>
                    </div>
                    `
                 mainpage.append(page);
                
                
}

function register(){
    register_button.addEventListener('click',async function(){
        if(register_label.value === USERNAME && register_password_label.value === PASSWORD ){
            localStorage.setItem('accessGranted','true');
            access = true;
            await api.developerStatus(true);
            location.reload();
        }
        else{
            localStorage.setItem("accessGranted",'false');
            access = false;
            await api.developerStatus(false);
            location.reload();
        }
    });
}
function outlog(){
    out.addEventListener('click',async function(){
        await api.developerStatus(false);
        location.reload();
    });
}



//register();
renderNews();

function deletes(){
    mainpage.innerHTML = '';
}

let button = document.querySelector('.send');
let textarea = document.querySelector('.input');

button.addEventListener(`click`, async () => {
    let text = textarea.value;
    
    let data = await api.loadProducts();

    await api.sendMessage(text, 'ItsNiko','niko');
    deletes();
    renderNews();

    textarea.value = ``;
});