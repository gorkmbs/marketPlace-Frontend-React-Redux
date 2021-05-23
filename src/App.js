import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./Navbar";
import Home from "./Home";
import Login from "./Login";
import Error from "./Error";
import Register from "./Register";
import Animals from "./reactComponents/Animals";
import Profile from "./reactComponents/Profile";
import "./app.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PostAnimal from "./reactComponents/PostAnimal";
import OtherUsers from "./reactComponents/OtherUsers";
import HomeUser from "./reactComponents/HomeUser";
import Goodbye from "./reactComponents/Goodbye";
import Lottery from "./reactComponents/Lottery";
import Videos from "./reactComponents/Videos";
import Musics from "./reactComponents/Musics";
import DailyVideos from "./reactComponents/DailyVideos";
import UserProfile from "./reactComponents/OtherUserProfile";
import Messaging from "./reactComponents/Messaging";
import MyMessages from "./reactComponents/MyMessages";
import LotteryResults from "./reactComponents/LotteryResults";

const axios = require("axios");
const Cookie = require("js-cookie");
// const base64url = require("base64url");

const urlServer = "https://tamzirtapoz.herokuapp.com";
//const urlServer = "http://localhost:5000";

function App() {
  const [rechapta, setRechapta] = useState(false); // true for implementation false for deploy
  const [login, setLogin] = useState(false);
  const [togleButton, setTogleButton] = useState(true);
  const [admin, setAdmin] = useState(false);
  const [token, setToken] = useState("");
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [color, setColor] = useState("rgb(0,0,0)");
  const [comingMessages, setComingMessages] = useState([]);

  // const [currentp, setcurrentp] = useState("/");

  // const CurrentContext = React.createContext();
  // if (login) {
  //   setId(
  //     JSON.parse(
  //       base64url.decode(
  //         Cookie.get("Authorization").split(" ")[1].split(".")[1]
  //       )
  //     ).sub
  //   );
  // }

  const controlAuth = (token) => {
    axios({
      method: "post",
      url: urlServer + "/users/protected",
      headers: { Authorization: token },
    })
      .then(function (response) {
        // handle success
        setLogin(response.data.success);
        setName(response.data.name);
        setId(response.data.id);
        setColor(response.data.color);
        setAdmin(response.data.admin);
        Cookie.set("Info", response.data.name, {
          expires: 2,
          sameSite: "Lax",
          secure: true,
        });
        Cookie.set("Authorization", response.data.token, {
          expires: 2,
          sameSite: "Lax",
          secure: true,
        });
      })
      .catch(function (error) {
        // handle error
        //console.log(error);
      })
      .then(function () {
        // always executed
      });
  };
  useEffect(() => {
    setToken(Cookie.get("Authorization"));
    // setName(Cookie.get("Info"));

    console.log("Authorization");
    if (token === "" || token === undefined) {
      setLogin(false);
    } else {
      // console.log(token);
      controlAuth(token);
    }
    return () => {};
    // eslint-disable-next-line
  }, [token]);

  return (
    <>
      <Router>
        <div className="container-fluid m-0 p-0 backside">
          <Navbar
            id={id}
            login={login}
            token={token}
            urlServer={urlServer}
            setLogin={setLogin}
            togleButton={togleButton}
            setTogleButton={setTogleButton}
            name={name}
            color={color}
            setColor={setColor}
            comingMessages={comingMessages}
            setComingMessages={setComingMessages}
          />
          <Switch>
            <Route exact path="/">
              <Home login={login} />
            </Route>
            <Route exact path="/goodbye">
              <Goodbye login={login} />
            </Route>
            <Route exact path="/homeuser">
              <HomeUser name={name} login={login} />
            </Route>
            <Route path="/login">
              <Login
                setToken={setToken}
                login={login}
                setLogin={setLogin}
                urlServer={urlServer}
                rechapta={rechapta}
                setRechapta={setRechapta}
              />
            </Route>
            <Route path="/animals">
              <Animals
                login={login}
                urlServer={urlServer}
                id={id}
                token={token}
                lookingProfile="false"
                myId={id}
              />
            </Route>
            <Route exact path="/lottery">
              <Lottery
                login={login}
                urlServer={urlServer}
                token={token}
                admin={admin}
              />
            </Route>
            <Route path="/lottery/results">
              <LotteryResults
                login={login}
                urlServer={urlServer}
                token={token}
              />
            </Route>
            <Route path="/animal/post">
              <PostAnimal login={login} urlServer={urlServer} token={token} />
            </Route>
            <Route path="/register">
              <Register
                name={name}
                setName={setName}
                setToken={setToken}
                login={login}
                setLogin={setLogin}
                urlServer={urlServer}
                rechapta={rechapta}
                setRechapta={setRechapta}
              />
            </Route>
            <Route
              path="/profile/:id"
              children={
                <Profile
                  name={name}
                  login={login}
                  urlServer={urlServer}
                  token={token}
                  color={color}
                  setColor={setColor}
                />
              }
            ></Route>
            <Route
              path="/userprofile/:username"
              children={
                <UserProfile
                  name={name}
                  login={login}
                  urlServer={urlServer}
                  token={token}
                  myId={id}
                />
              }
            ></Route>
            <Route
              path="/messaging/:otherId"
              children={
                <Messaging
                  name={name}
                  login={login}
                  urlServer={urlServer}
                  token={token}
                  id={id}
                  comingMessages={comingMessages}
                  setComingMessages={setComingMessages}
                />
              }
            ></Route>
            <Route path="/messages">
              <MyMessages
                login={login}
                comingMessages={comingMessages}
                urlServer={urlServer}
                token={token}
                id={id}
              />
            </Route>
            <Route path="/users/other">
              <OtherUsers
                login={login}
                urlServer={urlServer}
                token={token}
                id={id}
              />
            </Route>

            <Route exact path="/videos">
              <Videos login={login} urlServer={urlServer} token={token} />
            </Route>
            <Route path="/videos/music">
              <Musics
                login={login}
                urlServer={urlServer}
                token={token}
                id={id}
              />
            </Route>
            <Route path="/videos/daily">
              <DailyVideos
                login={login}
                urlServer={urlServer}
                token={token}
                id={id}
              />
            </Route>
            <Route path="*">
              <Error />
            </Route>
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;
