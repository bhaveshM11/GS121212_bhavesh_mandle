
import './App.css'
import Header from "./components/Header";
import Tabs from "./components/Tabs"

declare global {
  interface Window {
    dataLayer: Record<string, any>[];
  }
}

function App() {

  const handleClick = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    console.log("Clicked")
     // Simulate successful login
     const userId = "test123";
     const method = "test_method";
 
     // Push login event to GTM dataLayer
     window.dataLayer = window.dataLayer || [];
     window.dataLayer.push({
       event: "user_login",
       userId: userId,
       method: method,
     });
 
     console.log("Login event pushed to dataLayer");
  }
  return (
    <>
      <Header/>
      <button onClick={(e)=>handleClick(e)}> GTM Track Login Button</button>
      <Tabs/>
    </>
  )
}

export default App
