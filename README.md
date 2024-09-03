### 1.求和案例——redux精简版
        （1）去除Count组件自身的状态
        （2）src下建立：
                -redux 
                    -store.js
                    -count_reducer.js
        （3）store.js
                1）引入redux中的createStore函数，创建一个store
                2）createStore调用时要传入一个为其服务的reducer
                3）记得暴露store对象
        （4）count_reducer.js
                1）reducer的本质是一个函数，接收preState，action，返回加工后的状态
                2）reducer有两个作用：初始化状态，加工状态
                3）reducer被第一次调用时，是store自动触发的，传递的perState是underfined
        （5）在index.js中监测store中状态的变化，一旦发生变化重新渲染<App/>，
                备注：redux只负责管理状态，至于状态的改变驱动着页面的展示，要靠我们自己写。 
### 2.求和案例——redux完整版
        新增文件：
            1.count_action.js专门用于创建action对象
            2.constant.js 放置容易写错的type值

### 3.求和案例——redux异步action版
        （1）明确：延迟的动作不想交给组件自身，想交给action
        （2）何时需要异步action：想要对状态进行操作，但是具体的数据靠异步任务返回
        （3）具体编码
                1）npm i redux-thunk，并配置在store中
                2）创建action的函数不再返回一般对象，而是一个函数，该函数中写异步任务
                3）异步任务有结果后，分发一个同步的action去真正操作数据
        （4）备注：异步action不是必须要写的，完全可以自己等待异步任务的结果了再去分发同步action

### 4.求和案例——react-redux基本使用
        （1）明确两个概念：
                1）UI组件：不能使用任何redux的api，只负责页面的呈现、交互等
                2）容器组件：负责和redux通信，将结果交给UI组件
        （2）如何创建一个容器组件——靠react-redux的connect函数
                connect(mapStateToProps,mapDispatchToProps)(UI组件)
                    - mapStateToProps：映射状态，返回值是一个对象
                    - mapDispatchToProps：映射操作状态的方法，返回值是一个对象
        （3）备注1：容器组件中的store是靠props传进去的，而不是在容器组件中直接引入
        （4）备注2：mapDispatchToProps也可以是一个对象

### 5.求和案例——react-redux优化
        （1）容器组件和UI组件整合成一个文件
        （2）无需自己给容器组件传递store，给<App></App>包裹一个<Provider store={store}></Provider>即可
        （3）使用了react-redux后也不再自己检测redux中状态的改变了，容器组件可以自动完成这个工作
        （4）mapDispatchToProps也可以简单的写成一个对象
        （5）一个组件要和redux“打交道”要经过哪几步？
                1）定义好UI组件————不暴露
                2）引入connect生成一个容器组件，并暴露，语法如下：
                        connect(
                                ({state=>key:value}),   //映射状态
                                (key:xxxxAction)   //映射操作状态的方法
                        )(UI组件)
                3）在UI组件中通过props读取和操作状态
        
### 6.求和案例——react-redux数据共享版
        （1）定义一个Person组件，和Count组件通过redux共享数据
        （2）为Person组件编写：reducer、action，配置constant常量
        （3）重点：Person的reducer和Count的reducer要使用combineReducers进行合并，合并后的总状态是一个对象！！！
        （4）交给store的是总reducer，最后注意在组件中取出状态的时候，记得“取到位”


## 对SPA的理解 
        1.单页面Web应用，单页面多组件
        2.整个应用只有一个完整的页面
        3.点击页面中的链接不会刷新页面，只会做页面的局部更新
        4.数据都需要通过Ajax请求获取，并在前端异步展现

## 路由的基本使用
        1.明确好界面中的导航区、展示区
        2.导航区的a标签改为Link标签
                <Link to='/xxx'></Link>
        3.展示区写Route标签进行路由的匹配
                <Route path='/xxx' component={Demo}></Route>
        4.<App/>的最外层包裹了一个<BrowserRouter></BrowserRouter>,全局配置一个路由器，用来进行路由的传递

## 路由组件与一般组件
        1.写法不同：
                一般组件：<Demo/>
                路由组件：<Route path='/demo' component={Demo}>
        2.存放位置不同：
                一般组件：components
                路由组件：pages
        3.接收到的props不同：
                一般组件：写组件标签时传递了什么，就能收到什么
                路由组件：接收到三个固定的属性
                        history：
                                go:ƒ go(n)
                                goBack:ƒ goBack()
                                goForward:ƒ goForward()
                                push: ƒ push(path, state)
                                replace: ƒ replace(path, state)
                        location:
                                pathname: "/home"
                                search: ""
                                state: undefined
                        match: 
                                params: {}
                                path:"/home"
                                url: "/home"

## NavLink与封装NavLink
        1.NavLink可以实现路由链接的高亮，通过activeClassName指定样式名
        2.标签体内容是一个特殊的标签属性
        3.通过props.children可以获取标签体内容

## Switch的使用
        1.通常情况下，path和component是一一对应的关系
        2.Switch可以提高路由匹配效率（单一匹配）,匹配到对应组件后不再向下匹配

## 解决多级路径刷新页面样式丢失的问题
        1.public/inde.html 中 引入样式时不写./ 写 / （常用）
        2.public/inde.html 中 引入样式时不写./ 写 %PUBLIC_URL% （常用）  但只适用于React脚手架项目
        3.使用HashRouter

## 路由的严格匹配与模糊匹配
        1.默认使用的是模糊匹配，（简单记：‘输入的路径’必须包含要 ‘匹配的路径’ ，且顺序要一直，放在首位）
        2.开启严格匹配:<Route exact={true} path='/about' component={About} />
        3.严格匹配不要随便开启，需要再开，有些时候开启会导致无法继续匹配二级路由

## Redirect的使用
        1.一般写在所有路由注册的最下方，当所有路由都无法匹配时，跳转到Redirect指定的路由
        2.具体编码：
            <Switch>
                <Route path='/about' component={About} />
                <Route path='/home' component={Home} />
                <Redirect to='/about'/>
            </Switch>

## 嵌套路由
        1.注册子路由时要写上父路由的path值
        2.路由的匹配是按照注册路由的顺序进行的

## 向路由组件传递参数
        1.params参数
                路由链接(携带参数)： <Link to=`/home/message/detail/tom/18`>详情</Link>
                注册路由(声明接收)：<Route path='/home/message/detail/:name/:age' component={Detail}></Route>
                接收参数：const {name,age} = props.match.params
        2.search参数
                路由链接(携带参数)：<Link to=`/home/message/detail/?name=${item.name}&age=${item.age}`>详情</Link>
                注册路由(无需声明接收，正常注册路由即可)： <Route path='/home/message/detail' component={Detail}></Route>
                接收参数：const { search } = props.location
                备注：获取到的search是urlencoded编码字符串，需要借助querystring解析
        3. state参数
                路由链接(携带参数)：<Link to={{path:'/home/message/detail',state:{name:'tom',age:18}}}>详情</Link>
                注册路由(无需声明接收，正常注册路由即可)： <Route path='/home/message/detail' component={Detail}></Route>
                接收参数：const { name,age } = props.location.state
                备注：刷新也可以保存住参数

## 编程式路由导航
        借助props.history对象上的API操作路由前进、后退、跳转
                props.history.push()
                props.history.replace()
                props.history.go()
                props.history.back()
                props.history.goForward()
        
## withRouter
        withRouter可以加工一般组件，让一般组件具备路由组件所特有的API
        withRouter的返回值是一个新组件

## BrowserRouter与HashRouter的区别
        1.底层原理不一样：
               BrowserRouter用的是H5的history API，不兼容IE9以下版本 
               HashRouter使用的是URL的哈希值
        2.url表现形式不一样：
                BrowserRouter的路径中没有#，例如localhost:8000/demo/test
                HashRouter的路径中包含#，例如localhost:8000/#/demo/test
        3.刷新后对路由state参数的影响
                BrowserRouter没有任何影响，因为state保存在history对象中
                HashRouter刷新后会导致路由state参数的丢失！！！
        4.备注：HashRouter可以用于解决一些路径错误相关的问题


ReactRouter6更新内容

## 注册路由
        component={Detail}改为element={<Detail/>}

## Routes
        相同点：Routes与Switch用法一致，作用一致都是为了解决匹配时的效率问题，
        不同点：在Router5中Switch可写可不写，但在Router6中必须加Routes

## 重定向
        <Route path='/' element={<Navigate to='/home'/>} ></Route>
        Navigate只要渲染就会引起视图的切换

## NavLink高亮效果
        Router5使用NavLink自带高亮效果，通过activeClassName指定高亮样式
        Router6使用isActive判断是否高亮，添加样式类名
        <NavLink
            to="login"
            className={({ isActive }) => {
                console.log('home', isActive)
                return isActive ? 'base one' : 'base'
            }}
        >login</NavLink>

        /*
   	默认情况下，当Home的子组件匹配成功，Home的导航也会高亮，
   	当NavLink上添加了end属性后，若Home的子组件匹配成功，则Home的导航没有高亮效果。
        */
        <NavLink to="home" end >home</NavLink>

## useRoutes
        根据路由表生成对应的路由规则const element = useRoutes([
                {
                        path: '/about',
                        element: <About />
                },
                {
                        path: '/home',
                        element: <Home />
                },
                {
                        path: '/',
                        element: <Navigate to='/home' />
                }
        ])
        注册路由根据路由表生成{element}
        {element}代替
        <Route path='/about' element={<About/>}></Route>
                <Route path='/home' element={<Home/>} ></Route>
                <Route path='/' element={<Navigate to='/home'/>} ></Route>
        </Routes>

## 嵌套路由
        直接在路由表中声明
        {
                path: '/home',
                element: <Home />,
                children:[
                        {
                                path: 'news',
                                element: <News />, 
                        },
                        {
                                path: 'message',
                                element: <Message />, 
                        },
                        {
                                path: '',
                                element: <Navigate to='/home/message' /> //二级路由重定向
                        }
                ]
        },
        路由链接
        <NavLink className="list-group-item" to='news'>News</NavLink>
        指定路由组件呈现的位置
        <Outlet></Outlet>

        在父路由链接添加end属性可以去掉父级高亮效果
        <NavLink className='list-group-item' end to='/home'>Home</NavLink>

## 向路由组件传递参数
        1.params参数
                携带参数：<Link to={`detail/${item.id}/${item.title}/${item.content}`}>{item.title}</Link>
                声明接收：路由表中 path: 'detail/:id/:title/:content',
                接收参数(两种方式)：
                        1.使用useParams()
                                const {id,title,content} = useParams()
                        2.使用useMatch()(不常用)
                                const {params:{id,title,content}}= useMatch("/home/message/detail/
                                :id/:title/:content");
        2.search参数
                携带参数：<Link to={`detail?id=${item.id}&item=${item.title}&content=${item.content}`}>{item.title}</Link>
                声明接收：路由表中不需要声明接收
                接收参数(两种方式)：
                        1.使用useSearchParams()
                                const [search,setSearch] = useSearchParams()
                                const id = search.get('id')
                                const title = search.get('title')
                                const content = search.get('content')
                        2.使用useLocation()(不常用)
                                const search = useLocation()   //需通过queryString进行解析
        3.state参数
                携带参数：<Link
                           to='detail'
                                state={{
                                id: item.id,
                                title: item.title,
                                content: item.content
                                }}
                           >{item.title}</Link>
                声明接收：路由表中不需要声明接收
                接收参数：使用useLocation()
                        const {state:{id,title,content}} = useLocation()

## 编程式路由
        使用useNavigate(),无需使用withRouter

        const navigate = useNavigate()
        navigate(1)  //前进1
        navigate(-1)  //后退1
        navigate('/home/message/detail', {
            replace: false,
            state: {
                id: '006', 
                title:'lix', 
                content: 'lixiang'
            }
        })   //传值

## useInRouterContext()  
        作用：如果组件在 `<Router>` 的上下文中呈现，则 `useInRouterContext` 钩子返回 true，否则返回 false。
             可以判断出当前组件是否是路由组件

## useNavigationType()
        1. 作用：返回当前的导航类型（用户是如何来到当前页面的）。
        2. 返回值：`POP`、`PUSH`、`REPLACE`。
        3. 备注：`POP`是指在浏览器中直接打开了这个路由组件（刷新页面）。

## useOutlet()
        1. 作用：用来呈现当前组件中渲染的嵌套路由。
        2. 示例代码：

        ```jsx
        const result = useOutlet()
        console.log(result)
        // 如果嵌套路由没有挂载,则result为null
        // 如果嵌套路由已经挂载,则展示嵌套的路由对象
        ```

## useResolvedPath()
        作用：给定一个 URL值，解析其中的：path、search、hash值。

# React Router 6 快速上手

## 1.概述

1. React Router 以三个不同的包发布到 npm 上，它们分别为：

   1. react-router: 路由的核心库，提供了很多的：组件、钩子。
   2. <strong style="color:#dd4d40">**react-router-dom:**</strong > <strong style="color:#dd4d40">包含react-router所有内容，并添加一些专门用于 DOM 的组件，例如 `<BrowserRouter>`等 </strong>。
   3. react-router-native: 包括react-router所有内容，并添加一些专门用于ReactNative的API，例如:`<NativeRouter>`等。

2. 与React Router 5.x 版本相比，改变了什么？

   1. 内置组件的变化：移除`<Switch/>` ，新增 `<Routes/>`等。

   2. 语法的变化：`component={About}` 变为 `element={<About/>}`等。

   5. 新增多个hook：`useParams`、`useNavigate`、`useMatch`等。

   7. <strong style="color:#dd4d40">官方明确推荐函数式组件了！！！</strong>

      ......

## 2.Component

### 1. `<BrowserRouter>`

1. 说明：`<BrowserRouter> `用于包裹整个应用。

2. 示例代码：

   ```jsx
   import React from "react";
   import ReactDOM from "react-dom";
   import { BrowserRouter } from "react-router-dom";
   
   ReactDOM.render(
     <BrowserRouter>
       {/* 整体结构（通常为App组件） */}
     </BrowserRouter>,root
   );
   ```

### 2. `<HashRouter>`

1. 说明：作用与`<BrowserRouter>`一样，但`<HashRouter>`修改的是地址栏的hash值。
2. 备注：6.x版本中`<HashRouter>`、`<BrowserRouter> ` 的用法与 5.x 相同。

### 3. `<Routes/> 与 <Route/>`

1. v6版本中移出了先前的`<Switch>`，引入了新的替代者：`<Routes>`。

2. `<Routes>` 和 `<Route>`要配合使用，且必须要用`<Routes>`包裹`<Route>`。

3. `<Route>` 相当于一个 if 语句，如果其路径与当前 URL 匹配，则呈现其对应的组件。

4.  `<Route caseSensitive>` 属性用于指定：匹配时是否区分大小写（默认为 false）。

5. 当URL发生变化时，`<Routes> `都会查看其所有子` <Route>` 元素以找到最佳匹配并呈现组件 。

6.  `<Route>` 也可以嵌套使用，且可配合`useRoutes()`配置 “路由表” ，但需要通过 `<Outlet>` 组件来渲染其子路由。

7. 示例代码：

   ```jsx
   <Routes>
       /*path属性用于定义路径，element属性用于定义当前路径所对应的组件*/
       <Route path="/login" element={<Login />}></Route>
   
   		/*用于定义嵌套路由，home是一级路由，对应的路径/home*/
       <Route path="home" element={<Home />}>
          /*test1 和 test2 是二级路由,对应的路径是/home/test1 或 /home/test2*/
         <Route path="test1" element={<Test/>}></Route>
         <Route path="test2" element={<Test2/>}></Route>
   		</Route>
   	
   		//Route也可以不写element属性, 这时就是用于展示嵌套的路由 .所对应的路径是/users/xxx
       <Route path="users">
          <Route path="xxx" element={<Demo />} />
       </Route>
   </Routes>
   ```

### 4. `<Link>`

1. 作用: 修改URL，且不发送网络请求（路由链接）。

2. 注意: 外侧需要用`<BrowserRouter>`或`<HashRouter>`包裹。

3. 示例代码：

   ```jsx
   import { Link } from "react-router-dom";
   
   function Test() {
     return (
       <div>
       	<Link to="/路径">按钮</Link>
       </div>
     );
   }
   ```

### 5. `<NavLink>`

1. 作用: 与`<Link>`组件类似，且可实现导航的“高亮”效果。

2. 示例代码：

   ```jsx
   // 注意: NavLink默认类名是active，下面是指定自定义的class
   
   //自定义样式
   <NavLink
       to="login"
       className={({ isActive }) => {
           console.log('home', isActive)
           return isActive ? 'base one' : 'base'
       }}
   >login</NavLink>
   
   /*
   	默认情况下，当Home的子组件匹配成功，Home的导航也会高亮，
   	当NavLink上添加了end属性后，若Home的子组件匹配成功，则Home的导航没有高亮效果。
   */
   <NavLink to="home" end >home</NavLink>
   ```

### 6. `<Navigate>`

1. 作用：只要`<Navigate>`组件被渲染，就会修改路径，切换视图。

2. `replace`属性用于控制跳转模式（push 或 replace，默认是push）。

3. 示例代码：

   ```jsx
   import React,{useState} from 'react'
   import {Navigate} from 'react-router-dom'
   
   export default function Home() {
   	const [sum,setSum] = useState(1)
   	return (
   		<div>
   			<h3>我是Home的内容</h3>
   			{/* 根据sum的值决定是否切换视图 */}
   			{sum === 1 ? <h4>sum的值为{sum}</h4> : <Navigate to="/about" replace={true}/>}
   			<button onClick={()=>setSum(2)}>点我将sum变为2</button>
   		</div>
   	)
   }
   ```

### 7. `<Outlet>`

1. 当`<Route>`产生嵌套时，渲染其对应的后续子路由。

2. 示例代码：

   ```jsx
   //根据路由表生成对应的路由规则
   const element = useRoutes([
     {
       path:'/about',
       element:<About/>
     },
     {
       path:'/home',
       element:<Home/>,
       children:[
         {
           path:'news',
           element:<News/>
         },
         {
           path:'message',
           element:<Message/>,
         }
       ]
     }
   ])
   
   //Home.js
   import React from 'react'
   import {NavLink,Outlet} from 'react-router-dom'
   
   export default function Home() {
   	return (
   		<div>
   			<h2>Home组件内容</h2>
   			<div>
   				<ul className="nav nav-tabs">
   					<li>
   						<NavLink className="list-group-item" to="news">News</NavLink>
   					</li>
   					<li>
   						<NavLink className="list-group-item" to="message">Message</NavLink>
   					</li>
   				</ul>
   				{/* 指定路由组件呈现的位置 */}
   				<Outlet />
   			</div>
   		</div>
   	)
   }
   
   ```

## 3.Hooks

### 1. useRoutes()

1. 作用：根据路由表，动态创建`<Routes>`和`<Route>`。

2. 示例代码：

   ```jsx
   //路由表配置：src/routes/index.js
   import About from '../pages/About'
   import Home from '../pages/Home'
   import {Navigate} from 'react-router-dom'
   
   export default [
   	{
   		path:'/about',
   		element:<About/>
   	},
   	{
   		path:'/home',
   		element:<Home/>
   	},
   	{
   		path:'/',
   		element:<Navigate to="/about"/>
   	}
   ]
   
   //App.jsx
   import React from 'react'
   import {NavLink,useRoutes} from 'react-router-dom'
   import routes from './routes'
   
   export default function App() {
   	//根据路由表生成对应的路由规则
   	const element = useRoutes(routes)
   	return (
   		<div>
   			......
         {/* 注册路由 */}
         {element}
   		  ......
   		</div>
   	)
   }
   
   ```

### 2. useNavigate()

1. 作用：返回一个函数用来实现编程式导航。

2. 示例代码：

   ```jsx
   import React from 'react'
   import {useNavigate} from 'react-router-dom'
   
   export default function Demo() {
     const navigate = useNavigate()
     const handle = () => {
       //第一种使用方式：指定具体的路径
       navigate('/login', {
         replace: false,
         state: {a:1, b:2}
       }) 
       //第二种使用方式：传入数值进行前进或后退，类似于5.x中的 history.go()方法
       navigate(-1)
     }
     
     return (
       <div>
         <button onClick={handle}>按钮</button>
       </div>
     )
   }
   ```

### 3. useParams()

1. 作用：回当前匹配路由的`params`参数，类似于5.x中的`match.params`。

2. 示例代码：

   ```jsx
   import React from 'react';
   import { Routes, Route, useParams } from 'react-router-dom';
   import User from './pages/User.jsx'
   
   function ProfilePage() {
     // 获取URL中携带过来的params参数
     let { id } = useParams();
   }
   
   function App() {
     return (
       <Routes>
         <Route path="users/:id" element={<User />}/>
       </Routes>
     );
   }
   ```

### 4. useSearchParams()

1. 作用：用于读取和修改当前位置的 URL 中的查询字符串。

2. 返回一个包含两个值的数组，内容分别为：当前的seaech参数、更新search的函数。

3. 示例代码：

   ```jsx
   import React from 'react'
   import {useSearchParams} from 'react-router-dom'
   
   export default function Detail() {
   	const [search,setSearch] = useSearchParams()
   	const id = search.get('id')
   	const title = search.get('title')
   	const content = search.get('content')
   	return (
   		<ul>
   			<li>
   				<button onClick={()=>setSearch('id=008&title=哈哈&content=嘻嘻')}>点我更新一下收到的search参数</button>
   			</li>
   			<li>消息编号：{id}</li>
   			<li>消息标题：{title}</li>
   			<li>消息内容：{content}</li>
   		</ul>
   	)
   }
   
   ```

### 5. useLocation()

1. 作用：获取当前 location 信息，对标5.x中的路由组件的`location`属性。

2. 示例代码：

   ```jsx
   import React from 'react'
   import {useLocation} from 'react-router-dom'
   
   export default function Detail() {
   	const x = useLocation()
   	console.log('@',x)
     // x就是location对象: 
   	/*
   		{
         hash: "",
         key: "ah9nv6sz",
         pathname: "/login",
         search: "?name=zs&age=18",
         state: {a: 1, b: 2}
       }
   	*/
   	return (
   		<ul>
   			<li>消息编号：{id}</li>
   			<li>消息标题：{title}</li>
   			<li>消息内容：{content}</li>
   		</ul>
   	)
   }
   
     
   
   
   ```

### 6. useMatch()

1. 作用：返回当前匹配信息，对标5.x中的路由组件的`match`属性。

2. 示例代码：

   ```jsx
   <Route path="/login/:page/:pageSize" element={<Login />}/>
   <NavLink to="/login/1/10">登录</NavLink>
   
   export default function Login() {
     const match = useMatch('/login/:x/:y')
     console.log(match) //输出match对象
     //match对象内容如下：
     /*
     	{
         params: {x: '1', y: '10'}
         pathname: "/LoGin/1/10"  
         pathnameBase: "/LoGin/1/10"
         pattern: {
         	path: '/login/:x/:y', 
         	caseSensitive: false, 
         	end: false
         }
       }
     */
     return (
     	<div>
         <h1>Login</h1>
       </div>
     )
   }
   ```

### 7. useInRouterContext()

​			作用：如果组件在 `<Router>` 的上下文中呈现，则 `useInRouterContext` 钩子返回 true，否则返回 false。

### 8. useNavigationType()

1. 作用：返回当前的导航类型（用户是如何来到当前页面的）。
2. 返回值：`POP`、`PUSH`、`REPLACE`。
3. 备注：`POP`是指在浏览器中直接打开了这个路由组件（刷新页面）。

### 9. useOutlet()

1. 作用：用来呈现当前组件中渲染的嵌套路由。

2. 示例代码：

   ```jsx
   const result = useOutlet()
   console.log(result)
   // 如果嵌套路由没有挂载,则result为null
   // 如果嵌套路由已经挂载,则展示嵌套的路由对象
   ```

### 10.useResolvedPath()

1. 作用：给定一个 URL值，解析其中的：path、search、hash值。

