class Formulario {

  constructor(valido, campos) {
    this.valido = valido || false;
    this.campos = campos || [...this.initForm()];
  }

  initForm() {
    return [ 
      new Campo('nombreCompleto', true, ''),
      new Campo('empresaDondeLabora', true, ''),
      new Campo('cargo', true, ''),
      new Campo('telefonoMovil', true, ''),
      new Campo('telefonoHogar', false, ''),
      new Campo('emailInstitucional', true, ''),
      new Campo('emailEmpresa', false, ''),
    ];
  }

  agregarValorACampo(campoId, valor) {
    const campoIndex = this.obtenerIndiceCampo(campoId)
    if (campoIndex > -1) {
      this.campos[campoIndex].value = valor;
      this.campos[campoIndex].valid = (valor != '' && valor != null) || (this.campos[campoIndex].required == false) ? true : false;
    }
    console.log(this.campos[campoIndex]);
  }

  obtenerIndiceCampo = campoId => this.campos.findIndex(elm => elm.campoId == campoId);
  
  esFormularioValido = () => !(this.campos.some(campo => campo.valid == false)); 

  obtenerCamposInvalidos = () => this.campos.filter(campo => campo.valid == false);

  limpiar = () => this.campos.forEach(campo => document.getElementById(campo.campoId).value = '');
  
  camposToString = () => this.campos.map(campo => [document.getElementById(campo.campoId+'Label').innerHTML, campo.value]);

}
