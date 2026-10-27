import {useEffect, useState} from "react";

function App() {
    // 외부에서 데이터를 받아다가 화면에 출력하는 프로그램
    // 초기 랜더링 -> 데이터를 외부에 받아오고 -> 받아온 데이터를 가공
    //            -> 데이터 저장 -> 화면을 갱신

    // 데이터를 저장하기 위한 공간, 변수이거나 state  => state를 이용해야함
    const [coins, setCoins] = useState([]);

    useEffect(() => {
        // 외부에서 데이터를 받아와서 coins에 저장하는 일을
        // 초기 렌더링이 끈탄 직후에 실행해줘야 함  => sueEffect를 쓰는 것

        // 해야 되는 일을 useEffect 안의 함수에 적는데,
        // 그 일이 하필 외부에서 데이터를 받아오는 "비둘기 함수인 fetch임

        // 비둘기 함수는 3가지 작성법이 있는 데, 그 중 하나는
        // 데이터가 도착되었을 떄 행해야 하는 일을 작성하는 then()과
        // 데이터가 도착되지 못했을 때, 오류가 났을 때 해야 하는 일을 작성하는 catch()로 구성

        // .then(함수) : fetch()가 완료되면 실행되는 함수를 적어줘야 함 => .then() 매서드 체인을 통해 여러 개를 적어줄 수 있음
        // .catch(함수) : fetch가 실패하면 실행되는 함수를 적어줘여 함 => .catch는 한 번만 적어줄 수 있음

        // fetch() 함수는 순수 자바스크립트 (javascript 내장 함수) -> import가 없음
        fetch("https: //api.upbit.com/v1/market/all")
            // .then((방금 전 실행한 기능의 결과값 ) => {})
            .then((response) => {
                // 결과값만으로 response를 가지고, 무엇을 할 것인지를 기재
                // string으로 온 결과값을 우리가 데이터로서 사용할 수 있는 "객체"형식으로 바꿔서 반환해야 함
                return response.json();
            })
            .then((json) => {
                // 첫 번째 then의 결과인 "가공된 객체 형식의 목록"이 json이라는 매개 변수에 들어옴
                // 그걸 가지고 우리가 만든 state의 coins에 저장
                setCoins(json);
            })
            // .catch((실패한 내용에 대한 분석값) => {} )
            .catch((error) => {
                console.log(error);
            })

    }, []);


    return (<>
        <div style={{padding: "20px"}}>
            <h1>업비트 코인 목록 ({coins.length}개)</h1>
            <hr/>
            <select style={{padding: "8px", fontSize: 16, minWidth: "200px"}}>
            </select>
        </div>
    </>);
}

export default App;