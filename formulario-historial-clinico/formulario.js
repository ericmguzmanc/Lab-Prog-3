class Formulario {

  familiares = [];
  condicicones = [];
  internamientos = [];

  constructor(valido, campos) {
    this.valido = valido || false;
    this.campos = campos || [...this.initForm()];
  }

  initForm() {
    return [ 
      new Campo('nombre', true, ''),
      new Campo('apellido', true, ''),
      new Campo('edad', true, ''),
      new Campo('sexo', true, ''),
      new Campo('email', false, ''),
      new Campo('nacionalidad', true, ''),
      new Campo('direccion', false, ''),
      new Campo('provincia', false, ''),
      new Campo('familiares', false, []),
      new Campo('condiciones', false, []),
      new Campo('internamientos', false, []),
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

  agregarFamiliar(familiar) {
    const familiaresIndex = this.obtenerIndiceCampo('familiares');
    if (familiaresIndex > -1) {
      this.campos[familiaresIndex].value = [...this.campos[familiaresIndex].value, familiar];
    }
  }

  getFamiliares(){
    const familiaresIndex = this.obtenerIndiceCampo('familiares');
    return this.campos[familiaresIndex].value;
  }

  agregarCondicion(condicion) {
    const condiciones = this.obtenerIndiceCampo('condiciones');
    if (condiciones > -1) {
      this.campos[condiciones].value = [...this.campos[condiciones].value, condicion];
    }
  }

  agregarInternamiento(internamiento) {
    const internamientos = this.obtenerIndiceCampo('internamientos');
    if (internamientos > -1) {
      this.campos[internamientos].value = [...this.campos[internamientos].value, internamiento];
    }
  }

  deleteRow(row, campo) {
    const campoIndex = this.obtenerIndiceCampo(campo);
    this.campos[campoIndex].value.splice(row, 1);
  }

  getArrayCount = campo => {
    const campoIndex = this.obtenerIndiceCampo(campo);
    return this.campos[campoIndex].value.length;
  }
  

}
