var siteName = document.getElementById('sn');
var siteUrl = document.getElementById('su');
var siteNameInvalid = document.getElementById('siteNameInvalid');
var siteURLInvalid = document.getElementById('siteURLInvalid');
var submit = document.getElementById('submit');
var siteText = document.getElementById('siteName');
var deleteAllBtn = document.getElementById('deleteAll');
var tbody = document.getElementById('tbody')

var allSites = [];

if (localStorage.getItem('siteDetails') != null) {
    allSites = JSON.parse(localStorage.getItem('siteDetails'));
    displayTheData();
}

function addElement() {
    var sites = {
        name: siteName.value,
        url: siteUrl.value,
    }
    if ( siteName.value === '' || siteUrl.value === ''  ) {
        siteNameInvalid.style.display = 'block';
        siteURLInvalid.style.display = 'block';
    } else {
        allSites.push(sites);
        siteNameInvalid.style.display = 'none';
        siteURLInvalid.style.display = 'none';
        localStorage.setItem('siteDetails', JSON.stringify(allSites));
        clearForm();
        displayTheData();
    }
}

function clearForm() {
    siteName.value = '';
    siteUrl.value = '';
}

function displayTheData() {
    var siteCollection = '';
    for (var i = 0; i < allSites.length; i++) {
        siteCollection += `
        <tr>
            <td>
                    <div class="d-flex justify-content-between align-items-center">
                        <p id="siteName">${allSites[i].name}</p>
                        <div class="buttons">
                            <button class="btn btn-danger">
                                <a href="https://www.${allSites[i].url}.com" target="_blank" class="text-decoration-none text-white">visit</a>
                            </button>
                            <button class="btn btn-danger" onclick="deleteElement(${i})">delete</button>
                        </div>
                    </div>
            </td>
        </tr>
        `
    }
    tbody.innerHTML = siteCollection + `
    <tr>
        <td>
            <button class="btn btn-dark mt-5" onclick="deleteAll()" id="deleteAll">Delete All</button>
        </td>
    </tr>
`;  
}

function deleteAll() {
    siteName.value = '';
    siteUrl.value = '';
    allSites.splice(0);
    localStorage.clear();
    displayTheData();
    tbody.innerHTML = '';
}

function deleteElement(index) {
    allSites.splice(index, 1);
    localStorage.setItem('siteDetails', JSON.stringify(allSites));
    displayTheData();
    
}