'use strict';

var menuOptions=[
       
            {name:"Mantenimiento",sub:[
               {name:"Catalogo de Cuentas"},
               {name:"Entradas de Diario"}
             
            ]

            },
            {name:"Reportes",sub:[
                {name:"Estado Financiero",sub1:[
                    {name:"Estado de Situacion Financiera"},
                    {name:"Estado de Flujo de Efectivo"},
                    ]},
                {name:"Movimiento de cuentas"}
             ]},
            {name:"Consultas"},
            {name:"Utilitarios"}
            
];
function menuGenerator(){
var menu=document.querySelector(".menu");
var index,index1,index2;
var submenus;

for (index in menuOptions){
    
    var liParent = document.createElement("li");
    
    liParent.append(menuOptions[index].name);
    

    var ulfirstChild=document.createElement("ul");
    ulfirstChild.className="desplegar";
    for (index1 in menuOptions[index].sub) {
        
        liParent.appendChild(ulfirstChild);
        var list=document.createElement("li");
        ulfirstChild.appendChild(list);
        list.append(menuOptions[index].sub[index1].name);

        var listul=document.createElement("ul");
        listul.className="desplegarSub";
        for (index2 in menuOptions[index].sub[index1].sub1) {
            list.appendChild(listul);
            var ul1=document.createElement("li");
            listul.appendChild(ul1);
            ul1.append(menuOptions[index].sub[index1].sub1[index2].name);
    
        }

    }
   
    
 //   }
  //  p.append(menuOptions[index].sub[index]);
   // p.append(menuOptions[index].sub[index].name);
    menu.append(liParent);
}
}
//document.write(menuOptions.name);