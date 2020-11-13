class Campo {
  constructor(campoId, required, value, valid) {
    this.campoId = campoId || '';
    this.required = required || false;
    this.value = value || '';
    this.valid = valid || false;
  }
}