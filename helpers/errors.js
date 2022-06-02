class GoIt26NodeError extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class ValidationError extends GoIt26NodeError {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class WrongParametersError extends GoIt26NodeError {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

module.exports = {
  ValidationError,
  WrongParametersError,
  GoIt26NodeError,
};
