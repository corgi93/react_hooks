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