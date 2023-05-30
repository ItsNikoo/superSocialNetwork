class API{
    constructor(){
        this.endpoint = `https://6423117e77e7062b3e2a39bf.mockapi.io/`;
    }
    
    async loadProducts(){
        let response = await fetch(this.endpoint + `/messages`);
        let data = await response.json();

        return data;
    }
    
    async sendMessage(text,user,username){
        let response = await fetch(this.endpoint + '/messages', {
            method: 'POST',
            body: JSON.stringify({
                text: text,
                username: username,
                likes: 0,
                shown: 1,
                user: user
            }),
            headers:{
                'Content-type' : 'application/json'
            }
        });
        let data = await response.json();
        console.log(data);
    }
    async PostLikes(i,likess){
        let response = await fetch(this.endpoint + `/messages/${i}`, {
            method: 'PUT',
            body: JSON.stringify({
                likes: likess
            }),
            headers:{
                'Content-type' : 'application/json'
            }
    })
    }
    async deleteNews(id){
        let response = await fetch(this.endpoint + `/messages/${id}`, {
            method: 'DELETE'
        });
    }
    async likeMessage(id, like){
        let response = await fetch(this.endpoint + `/messages/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                liked: like
            }),
            headers:{
                'Content-type' : 'application/json'
            }
    })
        }
    async developerStatus(developer){
        let response = await fetch(this.endpoint + `/messages/${0}`, {
            method: 'PUT',
            body: JSON.stringify({
                isdeveloper: developer
            }),
            headers:{
                'Content-type' : 'application/json'
            }
    })
    }
    async PlusFollower(followers){
        let response = await fetch(this.endpoint + `/messages/${0}`, {
            method: 'PUT',
            body: JSON.stringify({
                followers: followers
            }),
            headers:{
                'Content-type' : 'application/json'
            }
    })
    }
    async statusVerified(id, status){
        let response = await fetch(this.endpoint + `/messages/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                verified: status
            }),
            headers:{
                'Content-type' : 'application/json'
            }
    })
    }
}
