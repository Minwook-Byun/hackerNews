# hackerNews (2021.10.31 - 
 FastCampus 프론트엔드 아카데미 실습을 클론 코딩해보는 프로젝트였습니다 

## 배운점 

김민태님의 ♻️ 리팩토링 기법과 코드 작성 습관을 많이 배울 수 있었다. 

### DOM API 사용 줄이기 ♻️
DOM API를 많이 사용하다 구조가 복잡해지면 코드를 다 읽어보지 않고서는 구조를 보기가 어려워진다

```
   li.innerHTML = `<a href="#${newsFeed[i].id}">
    ${newsFeed[i].title} [${newsFeed[i].comments_count}]
    </a>`;
    
    // (원래는 a도 createElement로 만들어 줬었다! 그런 코드를 아래와 같이 수정할 수 있다. 
```


```
//tempDiv의 경우에는 DOM을 사용하기 위해 만든 임시 div
    tempDiv.innerHTML = `
    <li>
        <a href = "#${newsFeed[i].id}">
            ${newsFeed[i].title} [$${newsFeed[i].comments_count}]
        </a>
    </li> 
```
### firstElementChild ♻️
훨씬 더 인스펙터의 HTML 구조와 유사해진다. 그런데 li를 추가할 때 단순히 li만 추가해서는 안 된다. 
tempDiv의 첫번째 요소를 추가해주면 되는데 그 때 사용하는 것이 바로 요 firstElementChild이다. 
```
// ul.appendChild(li);
    ul.appendChild(tempDiv.firstElementChild); //li만 어떻게 넣어줄까. 
```

### 같은 원천을 가진 것들은 묶어주기 ♻️ 
```
document.getElementById('root').appendChild(ul)
document.getElementById('root').appendChild(content)

```
위와 같은 코드를 이전의 나의 코드에서 많이 찾아볼 수 있었다! 같은 요소에 추가해주고 있는데도 계속 저런 방식으로 추가를 해주는 것이다. 
그러나 만약 root를 바꾸고 또 이게 하나의 파일이 아니라 컴포턴트 단위로 파일이 달라지고 import해오는 상황이라면 다 바꿔줘야 한다. (경험有)
그렇기 때문에 하나의 원천에 추가할 경우에는 이 부분을 묶어서 처리해주자 

```
container.appendChild(ul);
container.appendChild(content);
```
간단하게 느껴지지만 중요한 습관이라고 느껴졌다. 

### 데이터를 묶을 때는 객체, 동작을 묶을 때는 함수! ♻️
`
ajax.open('GET', NEWS_URL , false); //false : 동기적으로 처리하겠다는 뜻 
ajax.send();

// ajax를통해 가져오면, 개발자 도구의 network - XHR 에서 확인할 수 있다. 
const newsFeed = JSON.parse(ajax.response);
`
앞선 코드를 보면, 이런 부분이 많이 보인다. 그리고 앞으로 요청을 할 일이 더 많아지면 매번 이 부분을 반복적으로 사용해야 한다. 그렇기 때문에 함수로 선언해주자. 

```
function getData(url) {
    ajax.open('GET', url, false);
    ajax.send();

    return JSON.parse(ajax.response);
    // 호출하는 주소가 다르다! >> 달라지는 부분은 parameter로 처리. 
}

```
이를 사용하면 
`
    // ajax.open('GET', , false); //replace 값을 변경시켜준다 
    // ajax.send(); //다시 보내주고

    // const newsContents = JSON.parse(ajax.response);
`
이런 코드들이 
`
 const newsContents = getData(CONTENT_URL.replace('@id', id))
`
요렇게 가독성 좋게 바뀔 수 있다. 

<hr/>

