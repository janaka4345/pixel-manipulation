import "./App.css";
/*
*CONSIDER THE PIXEL DENSITY OF THE DEVICE  . NEED TO FIX FOR DIFFERENT DEVICES
*/
import Canvas from "./components/Canvas";//image  pixels -pixel rain-blue print
import Canvas1 from "./components/Canvas1";//image  pixels -pixel rain-blue print
import Canvas2 from "./components/Canvas2";//reveal image with pixel moving
import Canvas3 from "./components/Canvas3";//pixel rain
import Canvas4 from "./components/Canvas4";//brigtnes individual  pixel move thanos dust
function App(){
  return (
    <>
       {/* <Canvas />   */}
       {/* <Canvas1/> */}
       {/* <Canvas2/> */}
       {/* <Canvas3/> */}
       <Canvas4/>
      
    </>
  );
}

export default App;
