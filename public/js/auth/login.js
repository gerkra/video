document.addEventListener("DOMContentLoaded", function (event) {
    var loginForm = document.getElementById('login-form');

    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();
        e.stopPropagation();

        var login = document.querySelectorAll("[name='login']")[0].value;
        var password = document.querySelectorAll("[name='password']")[0].value;

        if (!login & !password) {
            return;
        }

        if (!login) {
            return;
        }

        if (!password) {
            return;
        }

        var xhr = new XMLHttpRequest();
        var data = {login: login, password: password};

        xhr.onreadystatechange = function () {
            if (xhr.readyState != 4) return;

            if (xhr.status != 200) {
                alert(xhr.status + ': ' + xhr.statusText);
            } else {
                alert(xhr.responseText);
            }

        };

        xhr.open('POST', 'login', true);
        xhr.send(data);

        console.log(login + ' ' + password);
    });
});