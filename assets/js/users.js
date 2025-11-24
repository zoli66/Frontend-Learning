document.addEventListener("DOMContentLoaded", function () {
  var elems = document.querySelectorAll(".collapsible");
  var instances = M.Collapsible.init(elems, {});
});

// const addUserButton = document.getElementById("add_user_button");
// addUserButton.addEventListener("click", () => {
//   document.querySelector(".add-user-modal").classList.add("show");
//   document.querySelector(".add-user-modal-back").classList.remove("dis-none");
// });
// document
//   .querySelector(".add-user-modal-back")
//   .addEventListener("click", (e) => {
//     document.querySelector(".add-user-modal").classList.remove("show");
//     e.target.classList.add("dis-none");
//   });

// fetch("https://jsonplaceholder.typicode.com/users")
//   .then((response) => response.json())
//   .then((json) => {
//     console.log(json);
//     let html = "";
//     let htmlMedAndLow = "";
//     for (var user of json) {
//       html += `<tr>
//               <td>${user.id}</td>
//               <td>${user.username}</td>
//               <td>${user.email}</td>
//               <td>${user.address.city}, ${user.address.street}</td>
//               <td>
//                 <i class="material-icons red-text m-l-5 m-r-5"
//                   >delete_forever</i
//                 >
//                 <i class="material-icons orange-text darken-2 m-l-5 m-r-5"
//                   >edit</i
//                 >
//               </td>
//             </tr>`;
//     }
//     document.querySelector(".desktop-table-body").innerHTML = html;
//   });
