import React from "react";
import { v4 as uuidv4 } from "uuid";
import { Spinner } from "reactstrap";
import env from "react-dotenv";
import axios from "axios";
import Picker from "emoji-picker-react";
import { io } from "socket.io-client";

import store from "../../store/index.js";
import "./chat.css";
var app_mode = env.MODE ? env.MODE: 'development'
var default_url = app_mode == 'production'? "https://api.mistershoppie.com/" : "https://api.keralashoppie.com/";
const api_url =env.API_URL?env.API_URL: default_url;
// env.API_URL? env.API_URL : 'http://localhost:8000/api/v1/'
// const api_url = 'http://localhost:5002/';
// const AUTH_PARMS = {'id':16, token: 'PL8JtlGm6qNiyxaCdSdgtKbq4YR5C2cACjRkwmCfhdsDFxB8K5Ku9cfAXBCI', clientId: 'tutelle'};
// const socket = io('http://localhost:3001/', { transports: ['websocket', 'polling', 'flashsocket'],
//    query: "id= " + JSON.stringify(AUTH_PARMS)});

const socket = io(
  api_url+"sockets",
  // const socket = io("https://api.keralashoppie.com/sockets",
  {
    transports: ["websocket", "polling", "flashsocket"],
    path: "/pm-sockets/",
    auth: {
      token: "my-value",
    },
    query: {
      auth_token:
        "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiY2FiNWQwMTllNjA1YTgyZWJkMjJlYmM4YjhlNzViNTVlZmE0MDEwOWQ5NmZkZGMxZDNjN2Q0N2Y2MjM5MmM4MzBhNzFlM2Q0YmQzMjYyMTUiLCJpYXQiOjE2MzI5ODI0ODMuNjMwMjg3LCJuYmYiOjE2MzI5ODI0ODMuNjMwMjkxLCJleHAiOjE2NjQ1MTg0ODMuNjIyNTQxLCJzdWIiOiIxNiIsInNjb3BlcyI6W119.brRDVvfM_X_mZRQNrqpCh_DzdtGSEJTXxwMZrjf7BUVwTh_JBz0QUE3Ll71WZZUYzmNxB-IPI-AXSeMpCEQkie4VG-Ogol7zPslpx3edVu96IiBpsDLAqV0FKsxlCpTeM6esWV-GRjST4our-cc3QjwX_alujHmKmolR8BvFqRBzAqkVUQsLNFjIwlgMeJ9f0onVCTct0EhHhugXdSbRmJCdwhspOr_JP3JHF4ccT54OkUl20xT8AK8F8S0K0ud8R10CvXT41iPpICgviNb_8fcbBCpxjTJOzRTaAKtAyo5Nzg4zSPR_isO7x4aSzEpPNnHRJPyfCxabNpMm4f_xPFctlOlmBqVoZ49dH-HDLzHh2-ZnpKyALWbD86sZ8Ao-djBHAY_omXsyz8eI6HY_3tz5TC25g4YhGvJoHxXPqJf6dEBriXnw_SSzFmIRmskKvunRZTnVnhZXXkYSkf7kkhNyYCpzBUGCstmuev68-kwCPQrk_kEZ2CDo73djBQ1_sqi8A8JNQomf5H-CkGKMQ7fmqSq_z8m-GGsHzKn2tB97sYYuD165bKJms348LOVGbOdUvAhB6j9aPphp1bpLFkpMCyYycAxbOA61vD-o-4xlm8fEDCbSkvSOTn4AH2r7WF-FXX5ENdpqfnUEbJyZHyMLexFlso22RGbM_FUO5N4",
      user_role_id: 15,
    },
  }
);

class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imoji_flag: false,
      text: "",
      auth_user_id: 9,
      messages: [
        {
          to_user_id: 1,
          from_user_id: 2,
          message:
            " Hi, ഒരു കിലോ പഞ്ചസാര വേണമല്ലോ. address  തരാം , വീട്ടിൽ എത്തിക്കാമോ ? 😄",
        },
        {
          to_user_id: 2,
          from_user_id: 1,
          message: "okay i will arrange",
        },
      ],
      chatlist: [],
      language: store.getState().user.language,
      selected_user: {},
      messageList: [],
    };
    this.messagesEnd = React.createRef();
    this.inputFile = React.createRef();
  }
  componentDidMount() {
    socket.on("connect", (data) => {
      console.log("key1"); // "G5p5..."
    });
    //   socket.emit("commented", 'dataaaaa');
    socket.emit("getChatlist", this.state.auth_user_id, "vendor");
    socket.on("commented", (data) => {
      console.log("dddd", data);
    });
    socket.on("chatlist", (data) => {
      console.log("chat list", data);
      this.setState({ chatlist: data.data });
    });

    socket.on("messagelist", (data) => {
      console.log("message list", data);
      this.setState({ messageList: data.data });
    });
    socket.on("notificationRes", (data) => {
      console.log("notificationRes", data);
    });
    socket.on("messageRes", (data) => {
      console.log("messageRes", data);
    });
  }
  storeName = (name) => {
    try {
      return name[this.state.language];
    } catch (error) {
      console.log(name, error);
      return name;
    }
  };
  selectUser = (e, user) => {
    e.preventDefault();
    console.log("getMessagelist", user.user_id, this.state.auth_user_id);
    socket.emit("getMessagelist", user.user_id, this.state.auth_user_id);

    this.setState({ selected_user: user });
  };
  handleChange = (event) => {
    const value = event.target.value;
    this.setState({ text: value });
  };
  onEmojiClick = (event, emojiObject) => {
    var msg = this.state.text;
    msg = msg + " " + emojiObject.emoji;
    this.setState({ text: msg });
  };
  laodImogi = () => {
    this.setState({ imoji_flag: !this.state.imoji_flag });
  };
  sendMessage = () => {
    var user = this.state.selected_user;
    var msg = {
      toUserId: user.user_id,
      fromUserId: this.state.auth_user_id,
      message: this.state.text,
      type: "text",
      fileFormat: "",
      filePath: "",
      // time: new moment().format("hh:mm A"),
      // date: new moment().format("Y-MM-D")
    };
    console.log(msg);
    var msg_string = JSON.stringify(msg);
    let messages = this.state.messageList;
    messages.push(msg);
    this.setState({ messageList: messages, text: "" });
    socket.emit("sendWebMessage", msg_string);
    this.scrollToBottom();
  };
  createMsgObj = (type, fileFormat, message) => {
    return {
      type: type,
      fileFormat: fileFormat,
      filePath: "",
      fromUserId: this.user_id,
      toUserId: this.cChat.id,
      toSocketId: this.cChat.socket_id,
      message: message,
      // time: new moment().format("hh:mm A"),
      // date: new moment().format("Y-MM-D")
    };
  };
  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  };
  loadFile = (e) => {
    e.preventDefault();
    this.inputFile.current.click();
  };
  handleFileUpload = (e) => {
    e.preventDefault();
    var file = e.target.files[0];
    var reader = new FileReader();
    // Closure to capture the file information.
    reader.onload = ((theFile) => {
      return (e) => {
        var binaryData = e.target.result;
        //Converting Binary Data to base 64
        var base64String = window.btoa(binaryData);
        //showing file converted to base64
        console.log(base64String);
        var msg = {
          toUserId: 1,
          fromUserId: 1,
          message: this.state.text,
          has_image: true,
          image_url: "data:image/jpeg;base64," + base64String,
          loading: false,
        };
        let messages = this.state.messages;
        messages.push(msg);
        this.setState({ messages: messages, text: "" });
        this.scrollToBottom();
      };
    })(file);
    reader.readAsBinaryString(file);
  };
  download = (e, url) => {
    var element = document.createElement("a");
    var file = new Blob([url], { type: "image/*" });
    element.href = URL.createObjectURL(file);
    element.download = "image.jpg";
    element.click();
  };
  render() {
    return (
      <div className="row">
        <div className="col-4">
          <div className="users-container">
            <div className="chat-search-box">
              <div className="input-group">
                <input className="form-control" placeholder="Search" />
                <div className="input-group-btn">
                  <button type="button" className="btn btn-secondary">
                    <i className="fa fa-search"></i>
                  </button>
                </div>
              </div>
            </div>
            <ul className="users">
              {this.state.chatlist.map((chat) => (
                <li
                  className={
                    this.state.selected_user == chat
                      ? "person active-user"
                      : "person"
                  }
                  data-chat="person1"
                  onClick={(e) => this.selectUser(e, chat)}
                >
                  <div className="user">
                    <img
                      src={
                        chat.image_url
                          ? chat.image_url
                          : "https://www.bootdey.com/img/Content/avatar/avatar1.png"
                      }
                      alt="Retail Admin"
                    />
                    <span
                      className={
                        chat.online == 1 ? "status online" : "status offline"
                      }
                    ></span>
                  </div>
                  <p className="name-time">
                    <span className="name">{this.storeName(chat.name)}</span>
                    {/* <span className="time">15/02/2019</span> */}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="col-8">
          <section className="msger">
            <header className="msger-header">
              <div className="msger-header-title">
                <i className="fas fa-comment-alt"></i>{" "}
                {this.storeName(this.state.selected_user.name)}
              </div>
              <div className="msger-header-options">
                <span>
                  <i className="fas fa-cog"></i>
                </span>
              </div>
            </header>

            <main className="msger-chat">
              {this.state.messageList.map((value, key) => (
                <div
                  className={
                    value.fromUserId == this.state.auth_user_id
                      ? "msg right-msg"
                      : "msg left-msg"
                  }
                >
                  <div className="msg-bubble">
                    <div className="msg-text">
                      {value.has_image ? (
                        <div>
                          {value.has_image ? (
                            <img
                              src={value.image_url}
                              style={{ height: "20vh" }}
                            />
                          ) : (
                            ""
                          )}
                          {value.loading ? (
                            <div class="centered">
                              <Spinner color="success" />
                            </div>
                          ) : (
                            <a
                              onClick={(e) => this.download(e, value.image_url)}
                            >
                              {" "}
                              <i class="fa fa-download" aria-hidden="true" />
                            </a>
                          )}
                        </div>
                      ) : (
                        ""
                      )}

                      {value.message}
                    </div>
                    <div className="msg-info">
                      <div className="msg-info-time">12:45</div>
                    </div>
                  </div>
                </div>
              ))}

              {/* <div className="msg left-msg">
                
        
                <div className="msg-bubble">
                
        
                <div className="msg-text">
                     ഒരു കിലോ പഞ്ചസാര വേണമല്ലോ. 
                </div>
                <div className="msg-info">
                    <div><a className="btn btn-sm btn-warning btn-chat-order"><i className="fa fa-check" /> order</a>
                    <a className="btn btn-sm btn-warning btn-chat-order"><i className="fa fa-times" /> order</a></div>
                    
                    <div className="msg-info-time">12:45</div>
                </div>
                </div>
            </div> */}
              <div
                style={{ float: "left", clear: "both" }}
                ref={(el) => {
                  this.messagesEnd = el;
                }}
              ></div>
              {/* <div className="msg left-msg">
                
        
                <div className="msg-bubble">
                
        
                <div className="msg-text">
                    Hi, ഒരു കിലോ പഞ്ചസാര വേണമല്ലോ. address  തരാം , വീട്ടിൽ എത്തിക്കാമോ ? 😄
                </div>
                <div className="msg-info">
                    <div className="msg-info-time">12:45</div>
                </div>
                </div>
            </div>
        
            <div className="msg right-msg">
               
        
                <div className="msg-bubble">
               
        
                <div className="msg-text">
                    You can change your name in JS section!
                </div>
                <div className="msg-info">
                    <div className="msg-info-time">12:46</div>
                </div>
                </div>
            </div> */}
            </main>
            {this.state.imoji_flag ? (
              <div className="imoji">
                <Picker
                  onEmojiClick={this.onEmojiClick}
                  pickerStyle={{ width: "100%" }}
                />
              </div>
            ) : (
              ""
            )}

            <form className="msger-inputarea">
              <input
                type="text"
                className="msger-input"
                placeholder="Enter your message..."
                onChange={this.handleChange}
                value={this.state.text}
              />
              <input
                type="file"
                id="file"
                ref={this.inputFile}
                accept="image/*"
                style={{ display: "none" }}
                onChange={this.handleFileUpload}
              />
              <button
                type="submit"
                className="msger-send-btn "
                onClick={this.laodImogi}
              >
                😄
              </button>
              <a
                className=" btn-sm btn-success btn-chat-order"
                href="#"
                onClick={this.loadFile}
              >
                <i className="fa fa-paperclip" />{" "}
              </a>
              <button
                type="submit"
                className="msger-send-btn"
                onClick={this.sendMessage}
              >
                Send
              </button>
              <button
                type="submit"
                className="msger-send-btn"
                onClick={this.sendMessage}
              >
                Order
              </button>
            </form>
          </section>
        </div>
      </div>
    );
  }
}

export default Chat;
