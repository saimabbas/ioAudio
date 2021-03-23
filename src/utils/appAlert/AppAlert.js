import { message, } from 'antd';

export const Alertsuccess = (msg) => {
  message.success(msg);
};

export const Alerterror = (msg) => {
  message.error(msg);
};

export const Alertwarning = (msg) => {
  message.warning(msg);
};