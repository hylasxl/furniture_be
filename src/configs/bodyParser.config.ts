import bodyParser from 'body-parser';

const bodyParserJsonMiddleware = bodyParser.json();
const bodyParserUrlencodedMiddleware = bodyParser.urlencoded({ extended: true });

export { bodyParserJsonMiddleware, bodyParserUrlencodedMiddleware };
