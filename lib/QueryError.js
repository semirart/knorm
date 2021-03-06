const KnormError = require('./KnormError');
const { lowerCase } = require('lodash');

class QueryError extends KnormError {
  constructor({ error, query }) {
    super({ error, query });

    this.query = query;

    if (error instanceof Error) {
      this.originalError = error;
    }
  }

  formatMessage({ error, query }) {
    let message = `${query.model.name}: `;

    if (error instanceof Error) {
      const hyphenIndex = error.message.lastIndexOf('- ');
      message +=
        hyphenIndex > -1
          ? error.message.substring(hyphenIndex + 2)
          : error.message;
    } else {
      message += lowerCase(this.constructor.name).replace(' error', '');
    }

    return message;
  }
}

module.exports = QueryError;
