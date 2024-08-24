const btn_open=document.getElementById('btn-open');

const btn_close=document.getElementById('btn-close');
const modal_container=document.getElementById('modal-container');
btn_open.addEventListener('click', ()=>{
    modal_container.classList.add('show');
});

btn_close.addEventListener('click', ()=>{
    modal_container.classList.remove('show');
});

var coursesApi ='http://localhost:3000/posts'
function start(){
    getCourses(function(courses){
        renderCourses(courses);
    });
    handleCreateForm();
}
start();
function getCourses(callback){
    fetch(coursesApi)
        .then(function(response) {
            return response.json();
        })
        .then(callback);
}
function createCourse(data,callback){
    var options = {
        method :'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(data)
    };
    fetch(coursesApi,options)
        .then(function(response){
            response.json();
        })
        .then(callback);
}
function deleteCourse(id){
    var options = {
        method :'DELETE',
        // body:JSON.stringify(data),
        headers:{
            'Content-Type':'application/json'
        }
    };
    fetch(coursesApi+ '/' +id,options)
        .then(function(response){
            response.json();
        })
        .then(function(){
            getCourses(renderCourses);
        });
}
function renderCourses(courses){
    var listCoursesBlock = document.querySelector('#list-courses');
    var htmls = courses.map(function(course){
        return `
        <div id="table">
            <div class="check-box">${course.id}</div>
            <div class="table-item1">
                <strong style="margin-right:50px;">${course.name}</strong>
            </div>
            <div class="table-item2">
                <strong style="margin-right:100px;">${course.time}</strong>
            </div>
            <div class="table-item3">
                <strong style="margin-right:90px;">${course.mode}</strong>
            </div>
            <div id="table-item4">
                <strong style="margin-right:70px;">${course.class}</strong>
            </div>
            <div class="table-item5">
                <strong><button style="margin-left: 10px;" onclick="deleteCourse(${course.id})">Xóa</button></strong>
            </div>
        </div>
        `;
    });
    listCoursesBlock.innerHTML = htmls.join('')
}
function handleCreateForm(){
    var createBtn = document.querySelector('#create');
    createBtn.onclick = function(){
        var id = document.querySelector('input[name ="id"]').value;
        var name = document.querySelector('input[name ="name"]').value;
        var time = document.querySelector('input[name ="time"]').value;
        var mode = document.querySelector('select[name="mode"]');
        var class1 = document.querySelector('input[name ="class"]').value;
        var formData ={
            name :name,
            id:id,
            time:time,
            mode:mode,
            class:class1

        };
        
        createCourse(formData,function(){
            getCourses(renderCourses);
        });
    }
}