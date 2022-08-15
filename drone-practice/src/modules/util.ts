const util = {
    success: (message: string, data?: any) => {
        return {
            message,
            data,
        };
    },
    fail: (message: string, data?: any) => {
        return {
            message,
        };
    },
};

export default util;