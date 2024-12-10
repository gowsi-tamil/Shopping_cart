exports.formatResponse = (success, data, message = null) => {
    return {
        success,
        data: success ? data : null,
        message: success ? null : message,
    };
};
