// let uploads = null
// let announcements = null
// let aboutInfos = null
// let uploadImages = [];
// //console.log(announcements);
// // let aboutInfos = null;
// let categories = null;
// let notices = null;
// let hostels = null;
// let functionaries = null;
// let ordinances = null;
// let links = null;
// let forms = null;
let cnt1 = 0,
  cnt2 = 0,
  cnt3 = 0,
  cnt4 = 0,
  cnt5 = 0,
  cnt6 = 0,
  cnt7 = 0;
function categoryEmbedding(categories, id) {
  let parentDiv = document.getElementById(id);
  parentDiv.innerHTML = "";
  let htmlString = "";
  //myFunction2(${category.name.toUpperCase()})
  if (categories) {
    categories.forEach((category) => {
      htmlString = "";
      htmlString += `
            <a class=" px-2 md:px-0 " style="text-decoration: none; color: inherit;"> <button
                    class="cta act bg-gray-200 border-0 py-1  px-3 md:px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
                    onClick="myFunction2('${category.name.toUpperCase()}')">
                   ${category.name.toUpperCase()}
                </button></a>`;
      parentDiv.innerHTML += htmlString;
    });
  }

  htmlString = `  <a class=" px-2 md:px-0 " style="text-decoration: none; color: inherit;"> <button
                        class="cta act bg-gray-200 border-0 py-1  px-3 md:px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
                        onClick="myFunction2('')">
                        Clear All
                        <span class="ml-2"><i class="fas fa-times"></i></span>
                    </button></a>`;
  parentDiv.innerHTML += htmlString;
}

// async function fetchAPIHome()
// {
//      const res = await fetch("http://localhost:8080/hab");
//      const data = await res.json();

//        // console.log(res);
//         //console.log(data);
//         uploads=data.categories;
//         announcements = data.announcements;
//         aboutInfos = data.aboutInfos;
//         // console.log(categories);
//          //console.log(notices);
//         const container = document.querySelector("#notices");
//         let parentDiv = document.getElementById("div_notice");
//         //console.log(container);
//         if( !notices || notices.length===0)
//         {let htmlString="";
//             htmlString = `<h1>No Notices To Show!</h1>`
//             parentDiv.innerHTML = htmlString;
//         }
//         else{

//             // console.log(parentDiv);
//             // console.log("haha");
//             notices.forEach(notice=>{
//                 let htmlString="";
//               htmlString = `<div class="p-4 lg:w-1/2 md:w-full to-search-in-notices" >
//               <div class="notice_card flex border-2 rounded-lg border-gray-200 bg-white border-opacity-50 p-8 sm:flex-row flex-col"
//                   style="box-shadow: 0px 0.3px 0.9px rgba(0, 0, 0, 0.1), 0px 1.6px 3.6px rgba(0, 0, 0, 0.13);">

//                   <div class="flex-grow">
//                       <div class="flex justify-between">
//                           <h2  class="tracking-widest text-xs title-font font-medium text-blue-500 mb-1">

//                              ${notice.category.toUpperCase()}
//                           </h2>

//                           <h2
//                           class="tracking-widest text-xs title-font font-medium text-blue-500 mb-1">
//                            ${notice.creation.substring(0,4)+'/'+(notice.creation.substring(5,7))+'/'+notice.creation.substring(8,10)}

//                       </h2>

//                       </div>

//                       <h2  class="text-gray-900 text-lg title-font font-bold mb-3">
//                           ${notice.title}
//                       </h2>
//                       <p id="four" class="leading-relaxed text-base">
//                          ${notice.description}
//                       </p><br>

//                       <button
//                           class="inline-flex text-white bg-red-500 border-0 py-1 px-4 focus:outline-none hover:bg-red-600 rounded"
//                           style=" color:white">`
//                            if(notice.path.indexOf("https://")==-1) {
//                              htmlString+=  `<a href=/hab/notices/${notice.id} target="_blank">VIEW
//                                   PDF</a>`
//                               } else {
//                                 htmlString+=`<a href=${notice.path} target="_blank">VIEW LINK</a>
// `                                }

// htmlString+=   `</button>
//                   </div>
//               </div>
//           </div>`
//             parentDiv.innerHTML+=htmlString; })

//         }

// }

async function fetchAPINotices(BASEURL) {
  let parentDiv = document.getElementById("div_notice");
  if (cnt1 === 0) {
    cnt6 = 0;
    ++cnt1;
    console.log(BASEURL);
    const res = await fetch(`${BASEURL}/hab/notices`);
    const data = await res.json();

    // console.log(res);
    //console.log(data);
    categories = data.categories;
    notices = data.notices;
    categoryEmbedding(categories, "cat");
    // console.log(categories);
    //console.log(notices);
    const container = document.querySelector("#notices");
    //console.log(container);
    if (!notices || notices.length === 0) {
      let htmlString = "";
      let yn = parentDiv.parentElement.parentElement.parentElement;
      yn.style.justifyContent = "center";
      htmlString = `<h1>No Notices To Show!</h1>`;
      parentDiv.innerHTML = htmlString;
    } else {
      // console.log(parentDiv);
      // console.log("haha");
      notices.forEach((notice) => {
        let htmlString = "";
        htmlString = `<div class="p-4 lg:w-1/2 md:w-full to-search-in-notices" >
              <div class="notice_card flex border-2 rounded-lg border-gray-200 bg-white border-opacity-50 p-8 sm:flex-row flex-col"
                  style="box-shadow: 0px 0.3px 0.9px rgba(0, 0, 0, 0.1), 0px 1.6px 3.6px rgba(0, 0, 0, 0.13);">
                  <div class="flex-grow">
                      <div class="flex justify-between">
                          <h2  class="tracking-widest text-xs title-font font-medium text-blue-500 mb-1">
                               
                             ${notice.category.toUpperCase()}
                          </h2>
                          <h2 
                          class="tracking-widest text-xs title-font font-medium text-blue-500 mb-1">
                           ${notice.creation.substring(0, 4) +
          "/" +
          notice.creation.substring(5, 7) +
          "/" +
          notice.creation.substring(8, 10)
          }
                              
                      </h2>
                          
                      </div>
                      <h2  class="text-gray-900 text-lg title-font font-bold mb-3">
                          ${notice.title}
                      </h2>
                      <p id="four" class="leading-relaxed text-base">
                         ${notice.description}
                      </p><br>
                      <button
                          class="inline-flex text-white bg-red-500 border-0 py-1 px-4 focus:outline-none hover:bg-red-600 rounded"
                          style=" color:white">`;
        if (notice.path.indexOf("https://") == -1) {
          //    console.log(notice.id);
          htmlString += `<a href=/hab/notices/${notice._id} target="_blank">VIEW
                                  PDF</a>`;
        } else {
          htmlString += `<a href=${notice.path} target="_blank">VIEW LINK</a>
`;
        }

        htmlString += `</button>
                  </div>
              </div>
          </div>`;
        parentDiv.innerHTML += htmlString;
      });
    }
  }
}

async function fetchAPIForms(BASEURL) {
  let parentDiv = document.getElementById("div_forms");
  if (cnt2 == 0) {
    cnt6 = 0;
    ++cnt2;
    const res = await fetch(`${BASEURL}/hab/forms`);
    const data = await res.json();

    // console.log(res);
    //console.log(data);
    categories = data.categories;
    forms = data.forms;
    categoryEmbedding(categories, "cat2");
    //console.log(categories);
    // console.log(forms);
    const container = document.querySelector("#forms");

    //console.log(container);
    if (!forms || forms.length === 0) {
      let htmlString = "";
      let yn = parentDiv.parentElement.parentElement.parentElement;
      yn.style.justifyContent = "center";
      htmlString = `<h1>No Forms To Show</h1>`;
      parentDiv.innerHTML = htmlString;
    } else {
      // console.log(parentDiv);
      // console.log("haha");
      forms.forEach((form) => {
        //  console.log("haha");
        let htmlString = "";
        htmlString = `
                    <div class="p-4 lg:w-1/2 md:w-full to-search-in">
                        <div class="form_card flex border-2 rounded-lg border-gray-200 bg-white border-opacity-50 p-8 sm:flex-row flex-col"
                            style="box-shadow: 0px 0.3px 0.9px rgba(0, 0, 0, 0.1), 0px 1.6px 3.6px rgba(0, 0, 0, 0.13);">
                            <div class="flex-grow">
                                <div class="flex justify-between">
                                    <h2
                                        class="tracking-widest text-xs title-font font-medium text-blue-600 mb-1 ">
                                        ${form.category.toUpperCase()} 
                                    </h2>
                                    <h2
                                        class="tracking-widest text-xs title-font font-medium text-blue-500 mb-1">
                                         ${form.creation.substring(0, 4) +
          "/" +
          form.creation.substring(5, 7) +
          "/" +
          form.creation.substring(8, 10)
          }
                                            
                                    </h2>
                                </div>
                                <h2 class="text-gray-900 text-lg title-font mb-3 font-bold">
                                     ${form.title}
                                </h2>
                                <p class="leading-relaxed text-base">
                                    ${form.description}
                                </p><br>
                                <button
                                    class="inline-flex text-white bg-red-500 border-0 py-1 px-4 focus:outline-none hover:bg-red-600 rounded"
                                    style=" color:white">`;
        if (form.path.indexOf("https://") == -1) {
          htmlString += `<a href="/hab/forms/${form._id}" target="_blank">View PDF</a>`;
        } else {
          htmlString += `<a href=${form.path} target="_blank">View Link</a>`;
        }

        htmlString += `</button>
                            </div>
                        </div>
                    </div>`;

        parentDiv.innerHTML += htmlString;
      });
    }
  }
}

async function fetchAPIHostels(BASEURL) {
  if (cnt3 == 0) {
    ++cnt3;
    const res = await fetch(`${BASEURL}/hab/hostels`);
    const data = await res.json();

    // console.log(res);
    // console.log(data);
    hostels = data;

    // console.log(categories);
    //console.log(hostels);
    const container = document.querySelector("#hostels");
    let parentDiv = document.getElementById("div_hostels");

    if (hostels) {
      hostels.forEach((hostel) => {
        let htmlString = "";
        htmlString += `<div class="profileCard h-auto m-4 bg-white rounded-md"
                    style="box-shadow: 0px 0.3px 0.9px rgba(0, 0, 0, 0.1), 0px 1.6px 3.6px rgba(0, 0, 0, 0.13);width: 350px;">
                    <div
                        class="box-border pointer-events-none border-8 border-white w-full h-48 bg-gray-100 rounded-md">
                        <img alt="hostel" class="rounded-md w-full h-48 md:mr-2 sm:mb-0 mb-4 object-cover"
                            src="uploads/hostel/${hostel.pic}">
                    </div>
                    <div class="box-border px-3 pt-3 pb-2 ">
                        <div class=" md:bottom-14 bottom-4 md:-right-16 z-10">
                            <h2 class="text-gray-900 text-lg title-font font-medium mb-2 ">
                                ${hostel.name} Hostel
                            </h2>
                            <p class="mb-4 ">
                                 ${hostel.description.length > 70
            ? hostel.description.substring(0, 70) +
            "..."
            : hostel.description
          } 
                            </p>
                            <button style=" color:white"
                                class="inline-flex text-white bg-red-500 border-0 py-1 px-4 focus:outline-none hover:bg-red-600 rounded">
                                <a href="/hab/hostels/${hostel.name
          }">View More</a>
                            </button>
                        </div>
                        <!-- <p class="pt-0.5 pb-1 text-sm font-normal text-gray-600">twitter_handle</p> -->
                    </div>
                </div>`;
        parentDiv.innerHTML += htmlString;
      });
    }
    if (!hostels || hostels.length == 0) {
      //console.log("haha");
      let htmlString = "";
      let yn = parentDiv.parentElement.parentElement.parentElement;
      yn.style.justifyContent = "center";
      htmlString += `<h1 style="text-align : center;">No Hostels To Show</h1>`;
      parentDiv.innerHTML += htmlString;
    }
  }
}

async function fetchAPIFunctionaries(BASEURL) {
  const res = await fetch(`${BASEURL}/hab/functionaries`);
  const data = await res.json();

  // console.log(res);
  // console.log(data);
  functionaries = data;
  // console.log(categories);
  //console.log(functionaries);
  const container = document.querySelector("#management");
  let parentDiv = document.getElementById("div_functionaries");

  //console.log(container);
  if (!functionaries || functionaries.length === 0) {
    let htmlString = "";
    let yn = parentDiv.parentElement.parentElement.parentElement;
    yn.style.justifyContent = "center";
    htmlString = `<h1>No functionaries To Show</h1>`;
    parentDiv.innerHTML = htmlString;
  }

  // console.log(parentDiv);
  // console.log("haha");
  else {
    functionaries.forEach((functionary) => {
      parentDiv.innerHTML = ""
      let htmlString = "";
      htmlString = ` <div class="profileCard h-auto m-4 bg-white rounded-sm"
                    style="box-shadow: 0px 0.3px 0.9px rgba(0, 0, 0, 0.1), 0px 1.6px 3.6px rgba(0, 0, 0, 0.13);width: 300px;">
                    <div class="box-border pointer-events-none border-8 border-white w-full h-64 bg-gray-100">
                        <img src="${functionary.pic}" alt="" class="h-full w-full object-contain rounded-sm">
                    </div>
                    <div class="box-border pointer-events-none px-3 pt-1 pb-2">
                        <p class="text-xl font-semibold">
                            ${functionary.name}
                        </p>
                        <p class="py-0.5 text-sm font-normal text-gray-600">
                            ${functionary.post}
                        </p>
                        <p class="py-1 text-sm font-normal text-gray-600">
                            <i class="fas fa-phone-alt mr-2"></i>${functionary.contact[0]}
                        </p>
                        <p class="py-0.5 text-sm font-normal text-gray-600 border-t">
                            <i class="fas fa-at mr-2"></i>${functionary.contact[1]}
                        </p>
                        <!-- <p class="pt-0.5 pb-1 text-sm font-normal text-gray-600">twitter_handle</p> -->
                    </div>
                </div>
               
                    `;
      parentDiv.innerHTML += htmlString;
    });
  }
}

async function fetchAPIOrdinance(BASEURL) {
  if (cnt4 == 0) {
    cnt6 = 0;
    ++cnt4;
    const res = await fetch(`${BASEURL}/hab/ordinances`);
    const data = await res.json();

    // console.log(res);
    // console.log(data);
    ordinances = data.ordinances;
    categories = data.category;
    categoryEmbedding(categories, "cat3");
    //console.log(categories);
    // console.log(ordinances);
    const container = document.querySelector("#ordinance");
    let parentDiv = document.getElementById("div_ordinances");

    //console.log(container);
    if (!ordinances || ordinances.length === 0) {
      let htmlString = "";
      let yn = parentDiv.parentElement.parentElement.parentElement;
      yn.style.justifyContent = "center";
      htmlString = `<h1>No ordinances To Show</h1>`;
      parentDiv.innerHTML = htmlString;
    }

    // console.log(parentDiv);
    // console.log("haha");
    else {
      ordinances.forEach((ordinance) => {
        let htmlString = "";
        htmlString = `
                    <div class="p-4 lg:w-1/2 md:w-full to-search-in">
                        <div class="notice_card flex border-2 rounded-lg border-gray-200 bg-white border-opacity-50 p-8 sm:flex-row flex-col"
                            style="box-shadow: 0px 0.3px 0.9px rgba(0, 0, 0, 0.1), 0px 1.6px 3.6px rgba(0, 0, 0, 0.13);">
                            <div class="flex-grow">
                                <div class="flex justify-between">
                                    <h2
                                        class="tracking-widest text-xs title-font font-medium text-blue-600 mb-1 ">
                                        ${ordinance.category &&
          ordinance.category.toUpperCase()
          }
                                    </h2>
                                    <h2
                                        class="tracking-widest text-xs title-font font-medium text-blue-500 mb-1">
                                        ${ordinance.creation.substring(0, 4) +
          "/" +
          ordinance.creation.substring(5, 7) +
          "/" +
          ordinance.creation.substring(8, 10)
          }
                                            
                                    </h2>
                                </div>
                                <h2 class="text-gray-900 text-lg title-font mb-3 font-bold">
                                    ${ordinance.title}
                                </h2>
                                <p class="leading-relaxed text-base">
                                    ${ordinance.description}
                                </p><br>
                                <button
                                    class="inline-flex text-white bg-red-500 border-0 py-1 px-4 focus:outline-none hover:bg-red-600 rounded"
                                    style=" color:white">`;
        if (ordinance.path.indexOf("https://") == -1) {
          htmlString += `<a href="/hab/ordinances/${ordinance._id}" target="_blank">View
                                            Link</a>`;
        } else {
          htmlString += `<a href="${ordinance.path}" target="_blank">View PDF</a>`;
        }

        htmlString += ` </button>
                            </div>
                        </div>
                    </div>`;

        parentDiv.innerHTML += htmlString;
      });
    }
  }
}

async function fetchAPIUtils(BASEURL) {
  if (cnt5 == 0) {
    ++cnt5;
    const res = await fetch(`${BASEURL}/hab/utilities`);
    const data = await res.json();

    // console.log(res);
    // console.log(data);
    links = data;

    // console.log(categories);
    //console.log(links);
    const container = document.querySelector("#utils");
    let parentDiv = document.getElementById("div_utils");
    if (!links || links.length == 0) {
      // console.log("haha");
      let htmlString = "";
      htmlString += `<h1 style = "text-align : center;">No Utilities To Show</h1>`;
      parentDiv.innerHTML += htmlString;
    }
    var i = 0;
    if (links) {
      links.forEach((link) => {
        ++i;
        let htmlString = "";
        htmlString += `<button
                  class="
                    h-auto
                    my-5
                    p-3
                    bg-white
                    rounded-sm
                    w-full
                    text-left
                    collapsible
                    flex
                    justify-between
                    
                  "
                  style="
                    box-shadow: 0px 0.3px 0.9px rgba(0, 0, 0, 0.1),
                      0px 1.6px 3.6px rgba(0, 0, 0, 0.13);
                  "
                  onClick="toggleList(${i})"
                >
                  <span> ${link.name} </span>
            
                  <span>
                    <div class="fa fa-chevron-up rotate down" id="toggleSVG${i}"></div>
                  </span>
                </button>
                <div class="cnt" style="display: none;" id="toggleDiv${i}">
                  <ul class="list-disc pl-5">`;

        link.sublinks.forEach((sublink) => {
          htmlString += `
                    <li class="py-1" X>`;
          if (sublink.url.indexOf("https://") == -1) {
            htmlString += `<a
                        href="/hab/links/${link._id}/${sublink._id}"
                        target="_blank"
                        class="hover:text-blue-600"
                        >${sublink.name}</a
                      >`;
          } else {
            htmlString += `<a
                        href="${sublink.url}"
                        target="_blank"
                        class="hover:text-blue-600"
                      >
                        ${sublink.name} </a
                      >`;
          }
          htmlString += ` </li>
                    <hr style="border-color: rgb(224, 224, 224)" />`;
        });
        htmlString += `  </ul>
                </div>`;
        parentDiv.innerHTML += htmlString;
      });
    }
    // console.log(parentDiv.innerHTML);
  }
}
function toggleList(i) {
  var x = document.getElementById(`toggleDiv${i}`);
  var y = document.getElementById(`toggleSVG${i}`);
  // console.log(y);
  if (x.style.display === "none") {
    x.style.display = "block";
    // console.log(y.className);
    y.className.baseVal = "svg-inline--fa fa-chevron-up fa-w-14 rotate";
  } else {
    x.style.display = "none";
    y.className.baseVal = "svg-inline--fa fa-chevron-up fa-w-14 rotate down";
  }
}
