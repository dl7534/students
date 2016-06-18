      
if(localStorage.students){
    	var students=JSON.parse(localStorage.students);
      
    }else{
        var students=[
    {id:1001,name:'ding',sex:'男',age:'20',jiguan:'山西'}

    ]
    localStorage.setItem = JSON.stringify('students',JSON.stringify(students));	

    }
    var tbody=document.querySelector(".tbody");
    var add=document.querySelector(".add");
    var del=document.querySelector('.del')

    var shuju=function(){
      tbody.innerHTML='';
    for(var i in students){
    	var d=students[i];
    	var el=document.createElement('tr');
      el.setAttribute('data-id',d.id)
    	el.innerHTML='<td data-role="id">'+d.id+'</td><td data-role="name">'+d.name+'</td><td data-role="sex">'+d.sex+'</td><td data-role="age">'+d.age+'</td><td data-role="jiguan">'+d.jiguan+'</td><td><input type="checkbox" value="'+d.id+'" class="ck"></td><td><span class="edit">编辑</span><span class="remove" data='+d.id+'>删除</span></td>';
    	tbody.appendChild(el)  
    	}
    }
    shuju();
  
  
    add.onclick=function(){
    	
        var xuehao=(students.length)?(parseInt(students[students.length-1].id+1)):10001;
        var stu={id:xuehao,name:'',sex:'',age:'',jiguan:''};
        students.push(stu);
        localStorage.students=JSON.stringify(students)
    	var el=document.createElement('tr');
      // el.setAttribute('data-id',stu.id)
    	el.innerHTML='<td data-role="id">'+stu.id+'</td><td data-role="name">'+stu.name+'</td><td data-role="sex">'+stu.sex+'</td><td data-role="age">'+stu.age+'</td><td data-role="jiguan">'+stu.jiguan+'</td><td><input type="checkbox" value="'+stu.id+'" class="ck"></td><td><span class="edit">编辑</span><span class="remove" data='+stu.id+'>删除</span></td>';

    	tbody.appendChild(el)
    }

    del.onclick=function(){
      var els = tbody.querySelectorAll('input[type=checkbox]');   
      for (var i=0;i<els.length;i++){
        var el = els[i];
        if(el.checked){
            tbody.removeChild(el.parentElement.parentElement)
            deleteitem(el.value);          
        }
      }
    }
    deleteitem=function(id){
      id = Number(id);
      var newStudents=[];
      for(var i in students){
        var d=students[i];
        if(d.id!==id){
        newStudents.push(d)
        }
      }
      students=newStudents;
      localStorage.setItem = JSON.stringify('students',JSON.stringify(students));
      }

    
      tbody.onclick=function(e){
          var el=e.target;
          if(el.nodeName==='TD'){
              if(tbody.querySelector('.editing')){
               toggleEdit(tbody.querySelector('.editing'));
            }
               toggleEdit(el.parentElement)
          }
        if(el.classList.contains('ck')){
           var els=tbody.querySelectorAll('.ck')
           for(var i=0,j=0;i<els.length;i++){
            if(els[i].checked){
               j++;
            }
           }
           if(j===students.length){
            checktoggle.checked=true;
           }else{
             checktoggle.checked=false;
           }
        }
     }

       var toggleEdit=function(tr){
            var  els = tr.querySelectorAll('td[data-role]');
            if(tr.classList.contains('editing')){
              for(var i=0;i<els.length;i++){
                  var el=els[i];
                  var tmp=el.querySelector('input').value
                  el.innerHTML = tmp;                    
              }   
                  tr.classList.remove('editing');        
            }else{
              for(var i=0;i<els.length;i++){
                  var el=els[i];
                  var tmp=el.innerHTML;
                  el.innerHTML = '<input type="text" value='+tmp+'>'                 
              }
              // els[0].querySelector('input').focus();  
                  tr.classList.add('editing');
            }
          }  
     
      //点击按钮的全选和全部取消
      var checktoggle=document.querySelector('.check');
      checktoggle.onclick=function(e){
          var els=tbody.querySelectorAll('input[type=checkbox]');
          for(var i=0;i<els.length;i++){
            var el=els[i];
            el.checked=this.checked;
          }
      }

      


        var timeId;
        tbody.onkeyup=function(e){
           var el=e.target;
           var bianhao=Number(el.parentElement.parentElement.getAttribute('data-id'))
           var k=el.parentElement.getAttribute('data-role');
          
           var v=el.value;
            clearTimeout(timeId);
            timeId=setTimeout(function(){
                updatestudents(bianhao,k,v);
            },10);
             
         }
         var updatestudents=function(bianhao,k,v){
             bianhao=parseInt(bianhao);
             for(var i=0;i<students.length;i++){
                if(students[i].id===bianhao){
                    students[i][k]=v;
                }
            localStorage.setItem('students',JSON.stringify(students));
             }
             console.table(students)
         }
 

     ///////点击表格头部排序
     var thead = document.querySelector('.table thead')
     console.log()
     thead.onclick=function(e){
         var el=e.target;
         if(el.nodeName=='TD'){
         var sortKey = el.getAttribute('data-role');
         
         var state=(el.getAttribute('flag')==='true')?true:false;
         el.setAttribute('flag',!state);
         students = students.sort(function(x,y){
          return  state ? (x[sortKey] < y[sortKey]):
                          (x[sortKey] > y[sortKey]);
         })
         shuju();
         }
        
     }
