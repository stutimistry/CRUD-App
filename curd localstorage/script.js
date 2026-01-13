let id = "";
const input = document.getElementById('input');
const submitbtn = document.getElementById('submitbtn');
const clearAllbtn = document.getElementById('clearAllbtn');

document.addEventListener("DOMContentLoaded", displaydata);

submitbtn.addEventListener("click", (e) => {
    e.preventDefault();
    managedata();
});

function managedata() {
    let inputdata = input.value.trim();
    if (inputdata === "") {
        alert("Please enter a name");
        return;
    }

    let arr = JSON.parse(localStorage.getItem('names')) || [];

    if (id === "") {
        arr.push(inputdata);
    } else {
        arr[id] = inputdata;
        id = "";
    }

    localStorage.setItem('names', JSON.stringify(arr));
    input.value = "";
    displaydata();
}

function displaydata() {
    let arr = JSON.parse(localStorage.getItem('names')) || [];
    let tabledata = "";

    arr.forEach((name, index) => {
        tabledata += `
                    <tr>
                        <td>${index + 1}</td>
                        <td>${name}</td>
                        <td>
                            <button class="action-btn edit" onclick="editdata(${index})">Edit</button>
                            <button class="action-btn delete" onclick="deletedata(${index})">Delete</button>
                        </td>
                    </tr>
                `;
    });

    document.getElementById('tablebody').innerHTML = tabledata;
}

function editdata(index) {
    let arr = JSON.parse(localStorage.getItem('names'));
    input.value = arr[index];
    id = index;
}

function deletedata(index) {
    let arr = JSON.parse(localStorage.getItem('names'));
    arr.splice(index, 1);
    localStorage.setItem('names', JSON.stringify(arr));
    displaydata();
}
clearAllbtn.addEventListener("click", () => {
    localStorage.removeItem('names');
    displaydata();
});
