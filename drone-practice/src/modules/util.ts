const util = {
  success: (status: number, message: string, data?: any) => {
    return {
      status,
      message,
      data,
    };
  },
  fail: (status: number, message: string, data?: any) => {
    return {
      status,
      message,
    };
  },
};

export default util;
