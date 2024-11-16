import { Provider } from "react-redux";
import { Body } from "./components/Body";
import Login from "./components/Login";
import appStore from "./utils/appStore";

function App() {
  return (
    <div>
      <Provider store={appStore}>
        <Body />
      </Provider>
    </div>
  );
}

export default App;
