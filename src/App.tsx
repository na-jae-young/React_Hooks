/* eslint-disable no-restricted-globals */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React,{useState,useEffect,useRef} from 'react';
import logo from './logo.svg';
import './App.css';
///////////////////////////////////////////////////////////////////////////////////////////////////useInput 
//state 값과 조건 함수를 받아서 input 객체에 넣어 연결한다. 
const useInput = (initialValue:string,validator:Function) => {
  const [value,setValue] = useState(initialValue);
  const onChange = (event:React.ChangeEvent<HTMLInputElement>) => {
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
const useTabs = (initialTab:number, allTabs:Array<any>)=>{   // index 가 바뀌면 함수 다시 시작 하기때문에 
  //if(!allTabs || !Array.isArray(allTabs)){return;}

  const [ currentIndex , setCurrentIndex ] = useState(initialTab)
  
  return {
    currentItem: allTabs[currentIndex],
    changeItem: setCurrentIndex
  }
}
///////////////////////////////////////////////////////////////////////////////////////////////////useTitle
const useTitle = (initialTitle:string) => { 
  const [title,setTitle] = useState(initialTitle);
  const updateTitle = () => {
    const htmlTitle= document.querySelector("title") 
    if(htmlTitle){
      htmlTitle.innerText = title
    }
  }
  useEffect(updateTitle,[title])
  return setTitle
}
//////////////////////////////////////////////////////////////////////////////////////////////////////useConfirm
const useConfirm = (message:string = "" , onConfirm:any , onCancel:any ) => {
  if(!onConfirm || typeof onConfirm !== "function"){
    return;
  }
  if(!onCancel || typeof onCancel !== "function"){
    return;
  }
  const confirmAction = ()=>{
    if(confirm(message)){
      onConfirm();
    }else{
      onCancel();
    }
  };
  return confirmAction;
}

///////////////////////////////////////////////////////////////////////////////////////////////////
function App() {

  const check_email = (value:string) => !(value.includes("@")) // @ 포함안함   useInput
  const maxLen = (value:string) =>  value.length < 10 
  const name = useInput("Mr.", check_email)

  const {currentItem ,changeItem}= useTabs(0,contents) //useTabs

  const titleUpdate = useTitle("Loading....")   //useTitle
  setTimeout(()=>{titleUpdate("Home")},5000)

  const potato = useRef<HTMLInputElement>(null);  // input객체의 ref 값에 넣어줌으로써 potato는 input객체가 된다. 
  /* useRef   연동 할때 사용 and id로 활용   useRef로 저장된 값은  State로 저장된 값과 다르게 수정되어도 렌더링 되지않는다. 
  렌더링 시 값의 변화가 생기면 안될때 사용 초기화되지도 않고 변하지도 않는다 . */

  const check_potato = () =>{ setTimeout(()=> {if(potato.current){potato.current.focus(); console.log(potato.current)}}, 5000)}
  useEffect(check_potato,[])


  const deleteWorld = () => {console.log("Deleting the world....")}  //useConfirm
  const abort = () => {console.log('Aborted')}
  const confirmDelet = useConfirm("R U SURE?",deleteWorld,abort)

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
          <h2>useRef</h2>
          <input ref={potato} placeholder="lala" />
      </div>
      
      <div>
        <h2>useConfirm</h2>
        <button onClick={confirmDelet}>Delete</button>
      </div>
    </div>
  );
}

export default App;
