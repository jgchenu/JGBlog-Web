import api from '@/lib/api'
import {
  message
} from "antd";

//action
const LOGOUT = "user/logout";
const LOAD_DATA = "user/loadData";
const initState = {
  avatar: "",
  userName: ""
};

//action type
//更新个人信息
function infoData(data) {
  return {
    type: LOAD_DATA,
    payload: data
  };
}

export function user(state = initState, action) {
  switch (action.type) {
    case LOAD_DATA:
      return {
        ...state,
        ...action.payload
      };
    case LOGOUT:
    default:
      return initState;
  }
}

//保存登录数据
export function login(data) {
  message.success(data.message, 1);
  localStorage.setItem("token", data.token);
  localStorage.setItem("token_exp", Date.now() + 24 * 60 * 60 * 1000);
  return infoData(data)
}
//登出清除
export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("token_exp");
  return {
    type: LOGOUT
  };
}
//获取个人信息
export function getInfo() {
  return async (dispatch) => {
    const res = await api.userInfo();
    if (res.data.code === 0) {
      dispatch(infoData(res.data.data));
    } else {
      message.warn(res.data.message, 1);
    }
  };
}
//更新用户信息
export function updateAvatar(data) {
  message.success("更新头像成功", 1);
  return infoData(data)
}