
function generarMenu() {
    const menuNav = document.getElementById("menu-container");
    const parentUl = document.createElement("ul");
    parentUl.id = "parent-ul";

    // Menu se está imporatndo en el index, entonces puedo usarlo.
    menu.forEach((elm, index) => {
        console.log('elm parent -> ', elm.parent);

        const menuLi = document.createElement("li");
        menuLi.id = "parent-li" // + "." + index;
        menuLi.innerHTML = elm.parent;

        if (elm.children.length > 0) {
            iterateChildren(elm.children, index, menuLi);
        }

        parentUl.appendChild(menuLi);  
    });



    menuNav.appendChild(parentUl);
}

function iterateChildren(children, index, menuLi) {
    const child = document.createElement("ul");
    child.id = "child-parent";
    children.forEach((elm, i) => {
        console.log('children -> ' + index + ' -> ', elm.parent);
        const childLi = document.createElement("li");
        childLi.id = "child-li";
        childLi.innerHTML = elm.parent;

        if(elm.children.length > 0) {
            const menuLiChildren = document.createElement("li");
            menuLiChildren.id = "child-li";
            menuLiChildren.innerHTML = elm.parent;
            iterateChildren(elm.children, i, menuLiChildren);
            child.appendChild(menuLiChildren);
        } else {
            child.appendChild(childLi);

        }
    });

    menuLi.appendChild(child);
}


function logOut() {
    window.localStorage.setItem("loggedIn", false);
    window.open("https://ericmguzmanc.github.io/Lab-Prog-3/loginApp/", "_self");
  }

// function generarMenu(){
// const menu = document.querySelector(".menu");
// const index;
// const index1;
// const index2;

//     for (index in menuOptions){
        
//         var liParent = document.createElement("li");
        
//         liParent.append(menuOptions[index].name);
        

//         var ulfirstChild=document.createElement("ul");
//         ulfirstChild.className="desplegar";
//         for (index1 in menuOptions[index].sub) {
            
//             liParent.appendChild(ulfirstChild);
//             var list=document.createElement("li");
//             ulfirstChild.appendChild(list);
//             list.append(menuOptions[index].sub[index1].name);

//             var listul=document.createElement("ul");
//             listul.className="desplegarSub";
//             for (index2 in menuOptions[index].sub[index1].sub1) {
//                 list.appendChild(listul);
//                 var ul1=document.createElement("li");
//                 listul.appendChild(ul1);
//                 ul1.append(menuOptions[index].sub[index1].sub1[index2].name);
        
//             }

//         }
    
        
//         menu.append(liParent);
//     }
// }