var siteNameInput = document.getElementById("name");
var siteUrlInput = document.getElementById("url");
var submitBtnInput = document.getElementById("btn");
var tableBody = document.getElementById("tableRow");
var webSiteArray = [];

(function () {
  if (localStorage.getItem("sites") != null)
    webSiteArray = JSON.parse(localStorage.getItem("sites"));
  display(webSiteArray);
})();
submitBtnInput.onclick = function () {
    if(validateUrl())
  {addSite();
  display(webSiteArray);
  clearForm();}
};

function addSite() {
  var webSite = {
    name: siteNameInput.value,
    url: siteUrlInput.value,
  };
  webSiteArray.push(webSite);
  localStorage.setItem("sites", JSON.stringify(webSiteArray));
  display(webSiteArray);
}

function display(array) {
  var box = "";
  for (var i = 0; i < array.length; i++) {
    box += ` <tr class="text-center">
<td class="fw-medium">${i + 1}</td>
<td class="fw-medium">${array[i].name}</td>
<td><a href="${
      array[i].url
    }" target="_blank" type="button" class="btn btn-success" id="btnVisit"><i class="fa-regular fa-eye"></i> Visit</a></td>
<td><button class="btn btn-danger text-white" onclick="deleteItem(${i})"><i class="fa-solid fa-trash-can"></i> DELETE</button></td>
</tr> `;
  }
  tableBody.innerHTML = box;
}

function clearForm() {
  siteNameInput.value = "";
  siteUrlInput.value = "";
}

function deleteItem(index) {
  webSiteArray.splice(index, 1);
  localStorage.setItem("sites", JSON.stringify(webSiteArray));
  display(webSiteArray);
}



function validateUrl() {
    var Regex = /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/;
    var url = siteUrlInput.value;
    if (!Regex.test(url)) {
        alert("Website URL not match");
        return false;
    }
    return true;
}