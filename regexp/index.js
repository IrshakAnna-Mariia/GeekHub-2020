document.querySelector('#user-form').addEventListener('submit', function (e) {
    e.preventDefault();
    var fullName = document.querySelector('[name="full_name"]');
    var email = document.querySelector('[name="email"]');
    var password = document.querySelector('[name="password"]');

    var regexpOfFullName = /^[а-щА-ЩЬьЮюЯяЇїІіЄєҐґ]+\s+[а-щА-ЩЬьЮюЯяЇїІіЄєҐґ]+\s+[а-щА-ЩЬьЮюЯяЇїІіЄєҐґ]+$/;
    var regexpOfEmail = /^[a-zA-Z0-9-][a-zA-Z.0-9-]*[a-zA-Z0-9-]@[a-zA-Z0-9-][a-zA-Z.0-9-]*\.[a-zA-Z0-9-]+$/;
    var regexpOfPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]{8,}$/;

    fullName.style.backgroundColor = regexpOfFullName.test(fullName.value)?'#c2e0c6':'#f9d0c4';
    email.style.backgroundColor = regexpOfEmail.test(email.value)?'#c2e0c6':'#f9d0c4';
    password.style.backgroundColor = regexpOfPassword.test(password.value)?'#c2e0c6':'#f9d0c4';

});

document.querySelector('[data-show="preview"]').addEventListener('click', function () {
    document.querySelector('#preview').innerHTML = "";
    const strongWords = /\+\+(.*?)\+\+/g;
    const iWords = /--(.*?)--/g;
    const imgSrc = /\(https:\/\/(.*?)((\.jpg\))|(\.png\)))/g;
    const aHref = /https:\/\/(.*?)\.(.*?)[^a-zA-Z0-9_./$%&#!@*-]/g;
    let description = document.querySelector('#description').value;

    description = description + " ";
    description = description.replaceAll(strongWords, "<strong>$&</strong>");
    description = description.replaceAll(/\+\+/g,"");
    description = description.replaceAll(iWords, "<i>$&</i>");
    description = description.replaceAll(/--/g,"");
    description = description.replaceAll(imgSrc,"<img src=" + "\"" +"$&"+"\"" + "/>");
    //description = description.replaceAll(imgScr2,"<img src=" + "\"" +"$&"+"\"" + "/>");
    description = description.replaceAll(/\(https:/g, "https:");
    description = description.replaceAll(/\.jpg\)/g, ".jpg");
    description = description.replaceAll(/\.png\)/g, ".png")

    if(aHref.test(description)) {
        var dummyVariable = description.match(aHref);
        for (var i = 0; i < dummyVariable.length; i++) {
            var dummyVariableNew = [];
            var splitVariable = [];
            dummyVariableNew[i] = dummyVariable[i].substring(0, dummyVariable[i].length - 1);
            splitVariable = dummyVariable[i].split('');
                if (/(\.jpg)|(\.png)/.test(dummyVariableNew[i]) === false) {
                    if (splitVariable[splitVariable.length - 2] === '.') {
                        dummyVariableNew[i] = dummyVariableNew[i].substring(0, dummyVariableNew[i].length - 1);
                        description = description.replace(dummyVariable[i], "<a href =" + "\"" + dummyVariableNew[i] + "\"" + ">" + dummyVariableNew[i] + "</a>" + splitVariable[splitVariable.length - 2] + splitVariable[splitVariable.length - 1]);
                    }
                    description = description.replace(dummyVariable[i], "<a href =" + "\"" + dummyVariableNew[i] + "\"" + ">" + dummyVariableNew[i] + "</a>" + splitVariable[splitVariable.length - 1]);
            }
            splitVariable = [];
        }
    }
    document.querySelector('#preview').innerHTML = description.substring(0,description.length-1);

});

document.querySelectorAll('[data-show="description"], [data-show="preview"]').forEach(function (event) {
    event.addEventListener('click',function () {
        var active = document.getElementsByClassName("active");
        active[0].className = active[0].className.replace(" active", "");
        this.className+=" active";
    })
});

document.querySelectorAll('[data-show]').forEach(function (button) {
    button.addEventListener('click', function (e) {
        document.querySelector('#description').classList.add('d-none');
        document.querySelector('#preview').classList.add('d-none');

        document.querySelector('#' + e.currentTarget.getAttribute('data-show')).classList.remove('d-none');
    });
});
