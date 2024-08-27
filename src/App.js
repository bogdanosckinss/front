import AuthForm from "./Auth/AuthForm";
import {Provider} from "react-redux";
import {store} from "./store";
import Upload from "./Content/Upload";

function App() {
  return (
      <Provider store={store}>
          <div className="App">
              <AuthForm/>
              <Upload />
          </div>
      </Provider>
  );
}

export default App;
