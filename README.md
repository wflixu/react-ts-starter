# react-ts-starter

一个 react redux react-redux react-router typescript 的脚手架

开发

npm i

npm run start

构建

npm run build

测试

npm run test

yarn add redux react-redux react-router

yarn add @types/history @types/react-redux @types/react-router @types/redux-actions @types/webpack @types/webpack-env -D

yarn add typescript tslint @types/react @types/react-dom --dev

yarn add react react-dom
yarn add tslint-react tslint-config-prettier --dev

yarn add webpack webpack-cli webpack-dev-server ts-loader -D

npm i typescript tslint @types/react @types/react-dom tslint-react tslint-config-prettier webpack webpack-cli webpack-dev-server ts-loader -D

npm i react react-dom -S

npm i css-loader style-loader less-loader less html-webpack-plugin clean-webpack-plugin -D

## Router

npm i @types/react-router-dom -D

##URLSearchParams
npm i url-search-params-polyfill -D

## animated transitions

npm i react-transition-group -S

npm i @types/react-transition-group -D

## chap 8

npm i redux react-redux redux-thunk

npm i @types/react-redux @types/redux-thunk -D

# question

## chap1

1. boolean sring number undefined null

2. boolean

3. type alias 不能 extends implement 继承

4. new Product('Table',700)

5. es5

6. --allowJS

7. elint.json => rules => "no-console":true

## chap2

1. drawPoint(...point)

2.

function drawPoint (...args:number[]){

}

3. function drawPoint (x:number,y:number,z?:number){}

4.

5)

## chap3

1. "no-console":false,
   "no-debugger":false,
2. ?

3. public static defaultProps

4. doItVisivle &&

5. onclick = {this.handleClick} private hanleClick = ()=>

6. setSate()

7. no
8. componentDidMount

9. componentWillUnMount

10.

interface IState{
count:number;
}
class Count extends React.Component<{},IState>{
constructor(props:{}){
super(props);
this.state = {
count:10,
}
}
private handleClick = ()=>{
this.setState({
count:this.state.count+1
})
}
public render (){
return(
<div className="count">
<span>{this.state.count}</span>
<button onClick={this.handleClick}>add</button>
</div>
)
}
}

11.

# chap4

1. yes
2. yes
3. exact
4.

## chap5
1. 
interface ICourseMark { courseName: string; grade: 'A'|'B'|'C'|'D'; }

2. 

3. 
4. type StageUnion =  keyof Stage;

5.  type GradeMap = {
    [P in Grade]:string
}


## chapter 6

1. this.props.children


