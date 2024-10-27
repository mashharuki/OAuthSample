/**
 * 単純なレスポンスを返却するシンプルなLambda関数
 * @param {*} event 
 * @returns 
 */
exports.handler = async (event) => {
    // TODO implement
    const response = {
        statusCode: 200,
        body: JSON.stringify('AWSで学ぶ！OAuth入門講座へようこそ！'),
    };
    return response;
};