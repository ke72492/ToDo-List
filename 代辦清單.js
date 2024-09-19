const itemInput = document.querySelector('#item-input');
const addBtn = document.querySelector('#add-btn');
const list = document.querySelector('.list');
const count = document.querySelector('#count');
const clearAllBtn = document.querySelector('#clear-all-btn');
const allBtn = document.querySelector('#all');
const unDoneBtn = document.querySelector('#undone');
const doneBtn = document.querySelector('#done');
const doneInputs = document.querySelectorAll('#done-input');

let matter = [];
// setStorage();
matter = getSorage();
if (matter == null) {
    matter = [];
}

let isFix = false;
let editIndex = 0;

render();

addBtn.addEventListener('click', function () {

    if (itemInput.value !== '') {
        if (isFix) {
            matter[editIndex] = { describe: itemInput.value, done: matter[editIndex].done };

            isFix = false;
        }
        else {
            matter.push({ describe: itemInput.value, done: false });

        }
        render();
        itemInput.value = '';
        this.textContent = '新增';
        listenerClick();
        setStorage();

    }
    else {
        alert('請填寫事項');
    }
});

clearAllBtn.addEventListener('click', function () {
    matter = [];
    render();
    setStorage();
});

function listenerClick() {

    // matter = getSorage();

    const doneInputs = document.querySelectorAll('.done-input');

    for (let i = 0; i < doneInputs.length; i++) {
        doneInputs[i].addEventListener('change', function () {
            if (doneInputs[i].checked) {
                for (let j = 0; j < matter.length; j++) {
                    if (matter[j].describe === doneInputs[i].nextElementSibling.textContent) {
                        matter[j].done = true;
                    }
                };

            }
            else if (!doneInputs[i].checked) {
                for (let k = 0; k < matter.length; k++) {
                    if (matter[k].describe === doneInputs[i].nextElementSibling.textContent) {
                        matter[k].done = false;
                    }
                };
            }
            countMatter();
            console.log(matter);
            setStorage();
        });
    }

}

allBtn.addEventListener('click', function () {
    // matter = getSorage();

    let content = '';
    for (let i = 0; i < matter.length; i++) {
        content += `<li class="item">
        <label class="checkbox">
          <input type="checkbox" class="done-input" ${matter[i].done ? 'checked' : ''}>
          <span class="content">${matter[i].describe}</span>
        </label>
        <button type="button" class="edit-btn" title="編輯項目" aria-label="編輯項目按鈕">X</button>
        <button type="button" class="delete-btn" title="刪除項目" aria-label="刪除項目按鈕">X</button>
      </li>`;
    };
    list.innerHTML = content;

    addEdit();
    addDelete();
    countMatter();
    listenerClick();

    allBtn.classList.add('active');
    unDoneBtn.classList.remove('active');
    doneBtn.classList.remove('active');
});

unDoneBtn.addEventListener('click', function () {
    // matter = getSorage();

    console.log(matter);
    let content = '';
    for (let i = 0; i < matter.length; i++) {
        if (matter[i].done === false) {
            content += `<li class="item">
        <label class="checkbox">
          <input type="checkbox" class="done-input" ${matter[i].done ? 'checked' : ''}>
          <span class="content">${matter[i].describe}</span>
        </label>
        <button type="button" class="edit-btn" title="編輯項目" aria-label="編輯項目按鈕">X</button>
        <button type="button" class="delete-btn" title="刪除項目" aria-label="刪除項目按鈕">X</button>
      </li>`;
        }
    };
    list.innerHTML = content;
    count.textContent = matter.length;



    addEdit();
    addDelete();
    listenerClick();
    countMatter();


    allBtn.classList.remove('active');
    unDoneBtn.classList.add('active');
    doneBtn.classList.remove('active');
});

doneBtn.addEventListener('click', function () {
    // matter = getSorage();

    let content = '';
    for (let i = 0; i < matter.length; i++) {
        if (matter[i].done === true) {
            content += `<li class="item">
        <label class="checkbox">
          <input type="checkbox" class="done-input" ${matter[i].done ? 'checked' : ''}>
          <span class="content">${matter[i].describe}</span>
        </label>
        <button type="button" class="edit-btn" title="編輯項目" aria-label="編輯項目按鈕">X</button>
        <button type="button" class="delete-btn" title="刪除項目" aria-label="刪除項目按鈕">X</button>
      </li>`;
        }
    };
    list.innerHTML = content;

    addEdit();
    addDelete();
    countMatter();
    listenerClick();

    allBtn.classList.remove('active');
    unDoneBtn.classList.remove('active');
    doneBtn.classList.add('active');
});

function render() {
    // matter = getSorage();

    let content = '';
    for (let i = 0; i < matter.length; i++) {
        content += `<li class="item">
        <label class="checkbox">
          <input type="checkbox" class="done-input" ${matter[i].done ? 'checked' : ''}>
          <span class="content">${matter[i].describe}</span>
        </label>
        <button type="button" class="edit-btn" title="編輯項目" aria-label="編輯項目按鈕">X</button>
        <button type="button" class="delete-btn" title="刪除項目" aria-label="刪除項目按鈕">X</button>
      </li>`;
    };

    list.innerHTML = content;

    listenerClick();
    countMatter();
    addEdit();
    addDelete();

    allBtn.classList.add('active');
    unDoneBtn.classList.remove('active');
    doneBtn.classList.remove('active');

};

function addEdit() {
    const editBtns = document.querySelectorAll('.edit-btn');
    editBtns.forEach(function (editBtn, index) {
        editBtn.addEventListener('click', function () {
            itemInput.value = matter[index].describe;
            addBtn.textContent = '修改';
            isFix = true;
            editIndex = index;
        });
    });
};

function addDelete() {
    const deleteBtns = document.querySelectorAll('.delete-btn');
    deleteBtns.forEach(function (deleteBtn, index) {
        deleteBtn.addEventListener('click', function () {
            matter.splice(index, 1);
            render();
            countMatter();
            setStorage();
        });
    });
};

function countMatter() {

    let countMatter = 0;
    for (let i = 0; i < matter.length; i++) {
        if (matter[i].done === false) {
            countMatter++;
        }
    }
    count.textContent = countMatter;
}

function setStorage() {
    sessionStorage.setItem('object', JSON.stringify(matter));
};

function getSorage() {
    const jsonStorage = sessionStorage.getItem('object');
    return JSON.parse(jsonStorage);
}