참고 - [velopert님 리액트 Hooks 완벽 정복하기](https://velog.io/@velopert/react-hooks#2.3-%EB%92%B7%EC%A0%95%EB%A6%AC-%ED%95%98%EA%B8%B0).

## Hooks 정리

Hooks? 리액트에 새로 도입된 기능!

Hooks의 주인공은? 함수형 컴포넌트

 "함수형 컴포넌트의 영역을 확대" 했다는 것이다!  
(함수형 컴포넌트에서 할 수 있는 작업이 더 많아졌다)


----

1. useState<br>
: 가장 기본적인 Hook. 함수형 컴포넌트도 state관리가 가능해졌다.
가변적인 상태 관리를 이 Hook을 사용하면 된다.

Info.js
```
import React, { useState } from 'react';

const Info = () => {
    /* 
    useState 함수는 하나의 state값만 관리!
    컴포넌트에서 다수의 state를 관리하려면 아래와 같이 여러 번 사용하자!

    아래는 array의 비구조화 할당!
    */
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');

  const onChangeName = e => {
    setName(e.target.value);
  };

  const onChangeNickname = e => {
    setNickname(e.target.value);
  };

  return (
    <div>
      <div>
        <input value={name} onChange={onChangeName} />
        <input value={nickname} onChange={onChangeNickname} />
      </div>
      <div>
        <div>
          <b>이름:</b> {name}
        </div>
        <div>
          <b>닉네임: </b>
          {nickname}
        </div>
      </div>
    </div>
  );
};

export default Info;
```
useState Hook을 보면 Info의 기본값을 초기화.
- array의 첫번 째 원소는 state값
- array의 두번 째 원소는 state를 설정하는 함수. 

이 함수(setNmae())에 파라미터(name)를 넣어 호출함면 전달받은 파라미터로 값이 바뀌고 컴포넌트는 리렌더링


---
2. useEffect<br>
: 리액트 컴포넌트가 렌더링 될 떼마다 특정한 작업을 수행하도록 설정하는 Hook이다.
( componentDidMount + componentDidUpdate를 합친 형태랄까? )

Info.js
```
import React, { useState, useEffect } from "react";

const Info = () => {
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");

  useEffect(() => {
    console.log("렌더링 완료!");
    console.log({
      name,
      nickname
    });
  });

  const onChangeName = event => {
    setName(event.target.value);
  };

  const onChangeNickname = event => {
    setNickname(event.target.value);
  };

  return (
    <div>
      <div>
        <input value={name} onChange={onChangeName} />
        <input value={nickname} onChange={onChangeNickname} />
      </div>
      <div>
        <div>
          <b>이름:</b> {name}
        </div>
        <div>
          <b>닉네임: </b>
          {nickname}
        </div>
      </div>
    </div>
  );
};

export default Info;

```

useEffect는 기본적으로 렌더링 직후마다 실행되며 <br>
두 번째 파라미터 배열에 무얼 넣느냐에 따라 실행 조건이 달라진다

-   상황1. 컴포넌트가 마운트 될 때만 실행하려면?<br>
    -> 함수의 두번 째 파라미터로 빈 array를 넣어주면 된다
    ```
    useEffect(() => {
        console.log("렌더링 완료!");
        console.log({
            name,
            nickname
        });
    }, []);
    ```

-  상황2. 특정 값만 업데이트 하고 싶으면?<br>
   ->  역시 두번 째 파라미터로 전달되는 array 안에 검사할 값을 넣으면 됨

   ```
    useEffect(() => {
        console.log(name);  
    }, [name])
   ```
   <br>

---

3.useContext<br>
: useContext Hook을 사용하면 함수형 컴포넌트에서 Context를 더 쉽게 사용할 수 있다.

ContextSample.js
```
import React,{ createContext, useContext } from "react";

//  전역적으로 사용할 context 설정
const ThemeContext = createContext("black");

const ContextSample = () => {
  // 전역적으로 context사용
  const theme = useContext(ThemeContext);
  const style = {
    width: "25px",
    height: "25px",
    background: theme
  };
  return <div style={style}></div>;
};

export default ContextSample;
```
<br>

---
4.useMemo<br>
: 함수형 컴포넌트 내부에서 발생하는 연산을 최적화할 수 있습니다.

Average.js
```
import React, { useState, useMemo } from "react";

const getAverage = numbers => {
  console.log("평균값 계산중..");
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((a, b) => a + b);
  return sum / numbers.length;
};

const Average = () => {
  const [list, setList] = useState([]);
  const [number, setNumber] = useState("");

  const onChange = e => {
    setNumber(e.target.value);
  };
  const onInsert = e => {
    const nextList = list.concat(parseInt(number));
    setList(nextList);
    setNumber("");
  };

  const avg = useMemo(() => getAverage(list), [list]);

  return (
    <div>
      <input value={number} onChange={onChange} />
      <button onClick={onInsert}>등록</button>
      <ul>
        {list.map((value, index) => (
          <li key={index}>{value}</li>
        ))}
      </ul>
      <div>
        <b>평균 값:</b> {avg}
      </div>
    </div>
  );
};

export default Average;

```





