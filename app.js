const container = document.getElementById('root')
const ajax = new XMLHttpRequest();
const content = document.createElement('div');
const NEWS_URL = 'https://api.hnpwa.com/v0/news/1.json'; // 바뀔 수 있는 데이터는 빼서 선언해준다
const CONTENT_URL = 'https://api.hnpwa.com/v0/item/@id.json'

function getData(url) {
    ajax.open('GET', url, false);
    ajax.send();

    return JSON.parse(ajax.response);
    // 호출하는 주소가 다르다! >> 달라지는 부분은 parameter로 처리. 
}



const newsFeed = getData(NEWS_URL);
const ul = document.createElement('ul');


window.addEventListener('hashchange', function(){
    console.log('동작!');
    const id = location.hash.substr(1); //이후의 값만 출력해준다
    
    const newsContents = getData(CONTENT_URL.replace('@id', id))
    const title = document.createElement('h1');
    
    title.innerHTML = newsContents.title
    
    content.appendChild(title);
    console.log(newsContents);
});


for (let i = 0; i < 10; i++) {
    const tempDiv = document.createElement('div');  
    const li = document.createElement('li');
   
 
    tempDiv.innerHTML = `
    <li>
        <a href = "#${newsFeed[i].id}">
            ${newsFeed[i].title} [$${newsFeed[i].comments_count}]
        </a>
    </li>
    `   
    ul.appendChild(tempDiv.firstElementChild); 
}

container.appendChild(ul);
container.appendChild(content);