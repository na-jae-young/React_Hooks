/* eslint-disable @typescript-eslint/no-unused-vars */
import React,{useState,useEffect,useRef} from 'react';
import logo from './logo.svg';
import './App.css';
///////////////////////////////////////////////////////////////////////////////////////////////////useInput 
//state 값과 조건 함수를 받아서 input 객체에 넣어 연결한다. 
const useInput = (initialValue:string,validator:Function) => {
  const [value,setValue] = useState(initialValue);
  const onChange = (event:any) => {
    const {target:{value}} = event;
    let willUpdate = true;
    if(typeof validator === "function"){
      willUpdate = validator(value)
    }
    if(willUpdate){
      setValue(value)
    }
  };
  return {value,onChange};
}
////////////////////////////////////////////////////////////////////////////////////////////////// useTabs//
const contents = [
  {
    tab:"Section1",
    content:"I'm the content of The Section1"
  },
  {
    tab:"Section2",
    content:"I'm the content of The Section2"
  }
]
const useTabs = (initialTab:number, allTabs:Array<any>)=>{
  //if(!allTabs || !Array.isArray(allTabs)){return;}

  const [ currentIndex , setCurrentIndex ] = useState(initialTab)
  
  return {
    currentItem: allTabs[currentIndex],
    changeItem: setCurrentIndex
  }
}
///////////////////////////////////////////////////////////////////////////////////////////////////seTitle
const useTitle = (initialTitle:string) => { 
  const [title,setTitle] = useState(initialTitle);
  const updateTitle = () => {
    const htmlTitle:any  = document.querySelector("title")
    htmlTitle.innerText = title
  }
  useEffect(updateTitle,[title])
  return setTitle
}


///////////////////////////////////////////////////////////////////////////////////////////////////
function App() {

  const check_email = (value:string) => !(value.includes("@")) // @ 포함안함   useInput
  const maxLen = (value:string) =>  value.length < 10 
  const name = useInput("Mr.", check_email)

  const {currentItem ,changeItem}= useTabs(0,contents) //useTabs

  const titleUpdate = useTitle("Loading....")   //useTitle
  setTimeout(()=>{titleUpdate("Home")},5000)

  const potato:any = useRef();  // useRef   연동 할때 사용 and id로 활용 
  const check_potato = () =>{ setTimeout(()=> {potato.current.focus(); console.log(potato.current)}, 5000)}
  useEffect(check_potato,[])

  
  return (
    <div className='App'>

      <div>
        <h2>useInput</h2>
        <input placeholder='name' {...name}></input>
      </div>

      <div>
        <h2>useTabs</h2>
        {contents.map((section,index) => (
        <button onClick={()=>{changeItem(index)}}>{section.tab}</button>
        ))}
        <div>{currentItem.content}</div>
      </div>

      <div>
          <input ref={potato} placeholder="lala" />
      </div>

    </div>
  );
}

export default App;
