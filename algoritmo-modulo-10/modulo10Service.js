class modulo10Service {
  
  instance = null

  constructor() {
    this.url = '';// url del api a enviar request

    // Singleton para javavscript
    if (!this.instance) {
      this.instance = this;
    }

    return this.instance;
  }

  validarModulo10(error, valorCedula) {
    // este sería el request al api para validar el modulo10
    return new Promise((resolve, reject) => {
      let add1 = 0;
      let total = 0;
      let res = [];
      let pos = 2;
      res = Array.from(valorCedula);
      
      error.style.display = 'none';
      let elemento=0;
      
      for (let i = 0; i < res.length; i++) {
        if (pos==1) {
          pos=2;
        }
        else if(pos==2){
          pos=1;
        }
        
        elemento = res[i]*pos;
        
        if((elemento/2)>=5){
          let primerDigito = '';
          let segundoDigito = '';
          
          primerDigito = elemento.toString().charAt(0);
          segundoDigito = elemento.toString().charAt(1);
          add1 = parseInt(segundoDigito) + parseInt(primerDigito);
        } else{
          add1 = parseInt(elemento);
        }
        
        total = total + add1;
        let modulo = total % 10;
        var lastNumber = 10 - modulo;
      }
    
      resolve(lastNumber);
    });
  }

}