'use strict';

const button = document.querySelectorAll('.button'),
    modal = document.querySelector('.modal'),
    modalCross = document.querySelector('.modal__cross'),
    overlay = document.querySelector('.overlay');


console.log(button);
const openModal =()=>{
    modal.classList.remove('hiden');
    overlay.classList.remove('hiden');
};

const closeModal =()=>{
    modal.classList.add('hiden')
    overlay.classList.add('hiden');
}

for (let i=0; i<button.length; i++){
    button[i].addEventListener('click', openModal);
}

//button.addEventListener("click", openModal);
modalCross.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);
document.addEventListener('keydown', (event) => {
    if (event.code === 'Escape') {
        closeModal();
    };
});


function validateEmail(email) { 
    let reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return reg.test(email);
}

$(document).ready(function() {
    $("#contact").submit(function() { return false; });
    $("#send").on("click", function(){
    let emailval  = $("#email").val();
    let namevl  = $("#name").val();
    let phonevl  = $("#phone").val();
    let msgval    = $("#msg").val();
    let msglen    = msgval.length;
    let mailvalid = validateEmail(emailval);

    if(mailvalid == false) {
        $("#email").addClass("error");
    }
    else if(mailvalid == true){
        $("#email").removeClass("error");
    }
if(mailvalid == false) {
        $("#name").addClass("error");
    }
    else if(mailvalid == true){
        $("#name").removeClass("error");
    }
    if(mailvalid == false) {
        $("#phone").addClass("error");
    }
    else if(mailvalid == true){
        $("#phone").removeClass("error");
    }
    if(msglen < 4) {
        $("#msg").addClass("error");
    }
    else if(msglen >= 4){
        $("#msg").removeClass("error");
    }
    
    if(mailvalid == true && msglen >= 4) {
        // если обе проверки пройдены
        // сначала мы скрываем кнопку отправки
        $("#send").replaceWith("<em>отправка...</em>");
        $.ajax({
        type: 'POST',
        url: 'sendmessage.php',
        data: $("#contact").serialize(),
        success: function(data) {
        if(data == "true") {
            $("#contact").fadeOut("fast", function(){
                $(this).before("<p><strong>Успешно! Ваше сообщение отправлено  :)</strong></p>");
                setTimeout("$.fancybox.close()", 1000);
            });
            }
        }
        });
    }
    });
});


/*
По факту я бы делал форму обратной связи через соотвествующие плагины, на wordpress - contactForm - 7,
на Битрикс - Форма обратной связи - простой конструктор веб-форм.
Тут я её подключил через ajax запрос по готовому решению с гугл, письма не приходят нужно ковырять настройки почты и почтового сервера.
*/